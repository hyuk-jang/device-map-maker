const _ = require('lodash');
const { expect } = require('chai');
const { BU } = require('base-util-jh');
const SolarPowerCalc = require('../src/SolarPowerCalc');

describe('◆ 발전량 예측에 필요한 함수 단일 테스트', () => {
  it('태양위도 계산', async () => {
    const date = new Date(); // 오늘 날짜

    const solarDeclination = SolarPowerCalc.prototype.calcSolarDeclination(date);
    // BU.CLI(solarDeclination);
  });

  it('가조시간 계산', async () => {
    const latitude = 35.053004; // 현경면 위도
    const solarDeclination = 23.26892055551607; // 6월 13일

    const pds = SolarPowerCalc.prototype.calcPossibleDurationSunshine(latitude, solarDeclination);
    // BU.CLI(pds);
  });

  it('가조시간 감소율 계산', async () => {
    const clound = 7; // 운량

    const pdsScalage = SolarPowerCalc.prototype.calcPdsScalage(clound);
    // BU.CLI(pdsScalage);
  });

  it('일조시간 계산', async () => {
    const pds = 14; // 가조시간
    const pdsScalage = 90; // 가조시간 감소율

    const ds = SolarPowerCalc.prototype.calcDurationSunshine(pds, pdsScalage);
    // BU.CLI(ds);
  });

  it('일사량 계산', async () => {
    const pds = 14; // 가조시간
    const ds = 11; // 일조시간
    const latitude = 35.053004; // 위도
    const solarDeclination = 23.26892055551607; // 6월 13일

    const solarRadiation = SolarPowerCalc.prototype.calcSolarRadiation(
      pds,
      ds,
      latitude,
      solarDeclination,
    );
    // BU.CLI(solarRadiation);
  });
  it('일일 발전량 계산', async () => {
    const solarRadiation = 7000; // 일사량
    const moduleCapacity = 6000; // 모듈 총 발전 용량
    const solarPower = SolarPowerCalc.prototype.calcSolarPower(solarRadiation, moduleCapacity);
    // BU.CLI(solarPower);
  });
  it('하루 증발량 계산', async done => {
    const moduleWide = 38; // 모듈 넓이
    const pds = 12; // 가조시간
    const windSpeed = 2; // 풍속

    const waterEvaporation = SolarPowerCalc.prototype.calcWaterEvaporation(
      moduleWide,
      pds,
      windSpeed,
    );
    // BU.CLI(waterEvaporation)

    done();
  });
  it('발전 증감을 요소를 적용한 효율 계산', async done => {
    const waterLevel = 3;
    const airTemperature = 10;
    const waterEvaporation = 300;
    const moduleWide = 38;

    const efficiency = SolarPowerCalc.prototype.calcEfficiency(
      waterLevel,
      airTemperature,
      waterEvaporation,
      moduleWide,
    );
    // BU.CLI(efficiency)

    done();
  });
});
describe('◆ 발전량 예측 테스트', () => {
  // TODO: 맵적용?
  const waterLevel = 4;
  const solarPowerCalc = new SolarPowerCalc('', waterLevel);
});
