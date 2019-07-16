const _ = require('lodash');
const { BU } = require('base-util-jh');

class SolarPowerCalc {
  constructor(map, waterlevel) {
    const testInfo = this.collectInfo(waterlevel);

    const solarDeclination = this.calcSolarDeclination(testInfo.date);
    const pds = this.calcPossibleDurationSunshine(testInfo.latitude, solarDeclination);
    const pdsScalage = this.calcPdsScalage(testInfo.cloud);
    const ds = this.calcDurationSunshine(pds, pdsScalage);
    const solarRadiation = this.calcSolarRadiation(pds, ds, testInfo.latitude, solarDeclination);
    const solarPower = this.calcSolarPower(solarRadiation, testInfo.moduleCapacity);

    const waterEvaporation = this.calcWaterEvaporation(
      testInfo.moduleWide,
      pds,
      testInfo.windSpeed,
    );
    const efficiency = this.calcEfficiency(
      testInfo.waterLevel,
      testInfo.airTemperature,
      waterEvaporation,
      testInfo.modulewide,
    );

    testInfo.solarPower = _.multiply(solarPower, efficiency);

    BU.CLI('다음날 발전 예측 ', testInfo);
  }

  // FIXME: 이름 생각
  // TODO: 발전 예측에 필요한 정보 객체 생성
  collectInfo(waterlevel) {
    // TODO: 기상청 데이터 수집
    // TODO: map에서 모듈크기, 장소 수집

    const test = {
      date: new Date().addDays(1),
      cloud: 4,
      latitude: 35.053004,
      moduleCapacity: 6000,
      moduleWide: 38,
      windSpeed: 1,
      waterLevel: waterlevel,
      airTemperature: 20,
      solarPower: 0,
    };

    return test;
  }

  /**
   * 태양 적위 계산 -> 23.5*xsin((월-3)*30 + (일-21))
   * @param {Date} date 날짜
   */
  calcSolarDeclination(date) {
    const month = date.getMonth(); // 월
    const day = date.getDate();
    // 일
    // 태양적위 계산
    const solarDeclination = _.multiply(
      23.5,
      Math.sin(this.convertToRadian(_.add(_.multiply(month - 3, 30), day - 21))),
    );

    return solarDeclination;
  }

  /**
   * 각도를 라디안으로 변환 -> 각도*원주율/180
   * @param {num} angle 각도
   * @example 45도 -> 0.78라디안
   */
  convertToRadian(angle) {
    //
    return _.multiply(angle, _.divide(3.14, 180));
  }

  /**
   * 가조시간(h) 계산 -> (24/원주율)*arccos(-tan(위도)*tan(태양적위))
   * 가조시간(h) : 일출에서 일몰까지의 시간
   * @param {num} latitude 위도 (각도)
   * @param {num} solarDeclination 태양적위 (각도)
   */
  calcPossibleDurationSunshine(latitude, solarDeclination) {
    const radianLatitude = this.convertToRadian(latitude); // 변환된 위도(라디안)
    const radianSolarDeclination = this.convertToRadian(solarDeclination); // 변환된 태양적위(라디안)

    const tanLatitude = Math.tan(radianLatitude); // tan(위도(라디안))
    const tanSolarDeclination = Math.tan(radianSolarDeclination); // tan(태양적위(라디안))

    return _.multiply(_.divide(24, 3.14), Math.acos(-_.multiply(tanLatitude, tanSolarDeclination)));
  }

  /**
   * 운량에 따른 가조시간(h) 감소율 계산 (pds : possibleDurationSunshine) -> 90.5-0.6*운량^2.2
   * @param {num} cloud 운량 (0~10)
   */
  calcPdsScalage(cloud) {
    return 90.5 - _.multiply(0.6, Math.pow(cloud, 2.2));
  }

  /**
   * 일조시간(h) 계산 -> 가조시간(h)*(가조시간(h) 감소율/100)
   * 일조시간(h) : 태양의 직사광선이 지표를 비추는 시간
   * @param {num} pds 가조시간(h) (possible duration of sunshine)
   * @param {num} pdsScalage  가조시간 감소율 (%)
   */
  calcDurationSunshine(pds, pdsScalage) {
    return _.multiply(pds, _.divide(pdsScalage, 100));
  }

  /**
   *  일사량(Wh/m^2) 계산
   * -> (0.18 +0.55(일조시간(h)/가조시간(h)))*37.6*(accos(-tan(위도)tan(태양적위))*sin(위도)sin(태양적위)+cos(위도)cos(태양적위)sin(accos(-tan(위도)tan(태양적위))))
   * @param {num} pds 가조시간(h)
   * @param {num} ds 일조시간(h)
   * @param {num} latitude 위도 (각도)
   * @param {num} solarDeclination 태양적위 (각도)
   */
  calcSolarRadiation(pds, ds, latitude, solarDeclination) {
    const radianLatitude = this.convertToRadian(latitude); // 위도 라디안 변환
    const radianSolarDeclination = this.convertToRadian(solarDeclination); // 태양적위 라디안 변환
    const w = Math.acos(_.multiply(-Math.tan(radianLatitude), Math.tan(radianSolarDeclination)));
    // FIXME: 변수명 변경
    // 대기 밖 일사량 계산
    const outsideSolarRadiation = _.multiply(
      37.6,
      _.add(
        _.multiply(w, _.multiply(Math.sin(radianLatitude), Math.sin(radianSolarDeclination))),
        _.multiply(
          _.multiply(Math.cos(radianLatitude), Math.cos(radianSolarDeclination)),
          Math.sin(w),
        ),
      ),
    );

    // 일사량(MJ/m^2) 계산
    const solarRadiation = _.multiply(
      _.add(0.18, _.multiply(0.55, _.divide(ds, pds))),
      outsideSolarRadiation,
    );

    // 단위를 MJ -> Wh 로 변환 후 반환
    // return _.divide(solarRadiation * 1000000, 3600);
    return _.divide(_.multiply(solarRadiation, 1000000), 3600);
  }

  /**
   * 일일 발전량(Wh) 계산
   * @param {num} solarRadiation 일사량 (Wh/m^2)
   * @param {num} moduleCapacity  모듈 총 발전 용량 (W)
   */
  calcSolarPower(solarRadiation, moduleCapacity) {
    const moduleDesignFactor = 0.8;
    // 모듈 설계 계수 : 모듈 설계 특성으로 인해 손상되는 발전량 평균적인 계수

    // 발전량(Wh) 계산
    return _.divide(
      _.multiply(solarRadiation, _.multiply(moduleDesignFactor, moduleCapacity)),
      1000,
    );
  }

  /**
   *
   * @param {*} moduleWide
   * @param {*} psd
   * @param {*} windSpeed
   */
  calcWaterEvaporation(moduleWide, psd, windSpeed) {
    const numerator = _.multiply(
      _.multiply(1.4, Math.pow(windSpeed, 0.78)),
      _.multiply(Math.pow(18, 2 / 3), moduleWide * 15.477),
    );
    const denominator = 82.05 * (100 + 273.15);

    const waterEvaporationMinute = _.divide(numerator, denominator);

    return waterEvaporationMinute * psd * 60;
  }

  /**
   *
   * @param {*} waterLevel
   * @param {*} airTemperature
   * @param {*} waterEvaporation
   * @param {*} moduleWide
   */
  calcEfficiency(waterLevel, airTemperature, waterEvaporation, moduleWide) {
    const waterLevelLoss = Math.pow(0.98, waterLevel);
    const airMass = _.multiply(moduleWide, 1.293);
    const temperatureDiffrence = _.divide(waterEvaporation, airMass) * 2.2;
    const reducedTemperature = _.subtract(airTemperature, temperatureDiffrence);

    return _.subtract(waterLevelLoss, _.divide(-0.004977, reducedTemperature)) + 0.0767;
  }
}

module.exports = SolarPowerCalc;
