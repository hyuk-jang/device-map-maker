// Solar Thermal Plant
const _ = require('lodash');

const { BU } = require('base-util-jh');

const {
  di: {
    dmmModel: { mmSvgBtnClass },
    dcmConfigModel: {
      nodeDataType: { BLOCK, TROUBLE, NONE },
      reqDeviceControlType: reqDCT,
    },
    dccFlagModel: { controllerParserType: CPT },
  },
} = require('../../../module');

const pvTransPatternInfo = {
  patternSize: [10, 10],
  patternList: [
    {
      patternType: 'image',
      fill: '/out/cell',
      size: [10, 10],
      opacity: 0.8,
    },
  ],
};

const mapPath = '/out/defaultMap';
// const mapPath = '';

const mapSize = {
  width: 1280,
  height: 600,
};

const mapPosition = [0, 0];

const convertPlacePosition = (xRate, yRate) => {
  const [x, y] = mapPosition;
  return [mapSize.width * xRate - x, mapSize.height * yRate - y];
};

// Map Size 정보
const ms = {
  // 센서 (SenSor)
  SIZE: mapSize,
  AREA_S: {
    WIDTH: mapSize.width * 0.12,
    HEIGHT: mapSize.height * 0.1,
  },
  PTC: {
    WIDTH: mapSize.width * 0.1,
    HEIGHT: mapSize.height * 0.1,
  },
  PTC_ENV: {
    WIDTH: mapSize.width * 0.1,
    HEIGHT: mapSize.height * 0.3,
  },
  OT: {
    WIDTH: mapSize.width * 0.1,
    HEIGHT: mapSize.height * 0.1,
  },
  SG: {
    WIDTH: mapSize.width * 0.1,
    HEIGHT: mapSize.height * 0.2,
  },
  SW: {
    WIDTH: mapSize.width * 0.7,
    HEIGHT: mapSize.height * 0.1,
  },
  ALARM: {
    WIDTH: mapSize.width * 0.12,
    HEIGHT: mapSize.height * 0.7,
  },
  POS: {
    PTC: [mapSize.width * 0.7, mapSize.height * 0.2],
    PTC_ENV: [mapSize.width * 0.6, mapSize.height * 0.45],
    OP: [mapSize.width * 0.5, mapSize.height * 0.2],
    OT1: [mapSize.width * 0.25, mapSize.height * 0.45],
    OT2: [mapSize.width * 0.25, mapSize.height * 0.6],
    SG: [mapSize.width * 0.1, mapSize.height * 0.3],
    ALARM: [mapSize.width * 0.85, mapSize.height * 0.2],
    DA: {
      OP1: [mapSize.width * 0.6, mapSize.height * 0.3],
      OP2: [mapSize.width * 0.65, mapSize.height * 0.3],
      PTC: [mapSize.width * 0.75, mapSize.height * 0.35],
      SW: [mapSize.width * 0.15, mapSize.height * 0.85],
    },
  },
  DA: {
    START_X: 100,
    START_Y: 50,
    WIDTH: mapSize.width * 0.05,
    HEIGHT: mapSize.height * 0.1,
    BIG_WIDTH: 200,
    INTERVAL: 20,
    PADDING: 0.03,
  },
};

/**
 * @type {mDeviceMap}
 */
const map = {
  drawInfo: {
    frame: {
      mapInfo: {
        width: ms.SIZE.width,
        height: ms.SIZE.height,
        backgroundInfo: {
          backgroundData: mapPath,
          backgroundPosition: mapPosition,
        },
      },
      svgModelResourceList: [
        /* *************       Place        ***************** */
        {
          id: 'deviceArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.DA.WIDTH,
            height: ms.DA.HEIGHT,
            color: ['url(#bg-sky-1)'],
            opacity: 0.7,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
        },
        {
          id: 'smallArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.AREA_S.WIDTH,
            height: ms.AREA_S.HEIGHT,
            color: ['url(#bg-black-1)'],
            opacity: 0.7,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: {
            color: 'white',
            axisScale: [0.5, 0],
            moveScale: [0, 1],
            fontSize: 12,
          },
        },
        {
          id: 'middleArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.AREA_S.WIDTH,
            height: ms.AREA_S.HEIGHT * 1.5,
            color: ['url(#bg-black-1)'],
            opacity: 0.7,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: {
            color: 'white',
            titleInfo: {
              lineColor: 'red',
            },
            axisScale: [0.5, 0],
            moveScale: [0, 1],
            fontSize: 12,
          },
        },

        {
          id: 'ptcArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.PTC.WIDTH,
            height: ms.PTC.HEIGHT,
            color: ['url(#bg-black-1)'],
            opacity: 0.7,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: {
            color: 'white',
            axisScale: [0.5, 0],
            moveScale: [0, 1],
            fontSize: 12,
          },
        },
        {
          id: 'ptcEnvArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.PTC_ENV.WIDTH,
            height: ms.PTC_ENV.HEIGHT,
            color: ['url(#bg-black-1)'],
            opacity: 0.7,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: {
            color: 'white',
            axisScale: [0.5, 0],
            moveScale: [0, 1],
            fontSize: 12,
          },
        },
        {
          id: 'otArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.OT.WIDTH,
            height: ms.OT.HEIGHT,
            color: ['url(#bg-black-1)'],
            opacity: 0.7,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: {
            color: 'white',
            axisScale: [0.5, 0],
            moveScale: [0, 1],
            fontSize: 12,
          },
        },
        {
          id: 'sgArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SG.WIDTH,
            height: ms.SG.HEIGHT,
            color: ['url(#bg-black-1)'],
            opacity: 0.7,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: {
            color: 'white',
            axisScale: [0.5, 0],
            moveScale: [0, 1],
            fontSize: 12,
          },
        },
        {
          id: 'swArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SW.WIDTH,
            height: ms.SW.HEIGHT,
            color: ['url(#bg-black-1)'],
            opacity: 0.7,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: {
            color: 'white',
            axisScale: [0.5, 0],
            moveScale: [0, 1],
            fontSize: 12,
          },
        },
        {
          id: 'alarmArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.ALARM.WIDTH,
            height: ms.ALARM.HEIGHT,
            color: ['url(#bg-black-1)'],
            opacity: 0.7,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: {
            color: 'white',
            axisScale: [0.5, 0],
            moveScale: [0, 1],
            fontSize: 12,
          },
        },
        /* *************       Device        ***************** */
        {
          id: 'cmdBtn',
          type: 'rect',
          elementDrawInfo: {
            width: ms.DA.WIDTH * 0.17,
            height: ms.DA.HEIGHT * 0.8,
            svgClass: [mmSvgBtnClass.lightGray, mmSvgBtnClass.orange, mmSvgBtnClass.red],
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: { fontSize: 15 },
        },
        /* *************       Sensor        ***************** */
        {
          id: 'tableSensor',
          type: 'rect',
          elementDrawInfo: {
            width: ms.AREA_S.WIDTH,
            height: 10,
            color: '#f0f0f0',
            opacity: 0,
            // strokeInfo: {
            //   width: 0.7,
            //   color: '#000',
            // },
          },
          textStyleInfo: {
            isTitleWrap: 0,
            // anchor: 0,
            // isHiddenTitle: 1,

            color: 'white',
            dataColor: 'red',
            fontSize: 10,
          },
        },
        {
          id: 'tableHiddenSensor',
          type: 'rect',
          elementDrawInfo: {
            width: ms.AREA_S.WIDTH,
            height: (ms.AREA_S.HEIGHT * 1.5) / 4,
            color: 'blue',
            opacity: 0,
            // strokeInfo: {
            //   width: 0.7,
            //   color: '#000',
            // },
          },
          textStyleInfo: {
            // isTitleWrap: 1,
            isHiddenTitle: 1,
            anchor: 1,
            axisScale: [0.5, 0.5],
            // baseline: 'top',
            color: 'white',
            dataColor: 'white',
            fontSize: 10,
          },
        },
        {
          id: 'sensor',
          type: 'rect',
          elementDrawInfo: {
            width: ms.DA.WIDTH * 0.17,
            height: ms.DA.HEIGHT * 0.8,
            color: '#f0f0f0',
            strokeInfo: {
              width: 0.7,
              color: '#000',
            },
          },
          textStyleInfo: {
            color: 'white',
            dataColor: '',
            fontSize: 10,
          },
        },
        {
          id: 'sensorOdd',
          type: 'rect',
          elementDrawInfo: {
            width: ms.AREA_S.WIDTH,
            height: (ms.AREA_S.HEIGHT * 1.5) / 4,
            color: 'orange',
            opacity: 0.3,
          },
          textStyleInfo: {
            // isTitleWrap: 1,
            isHiddenTitle: 1,
            anchor: 1,
            axisScale: [0.5, 0.5],
            // baseline: 'top',
            color: 'white',
            dataColor: 'white',
            fontSize: 10,
          },
        },
        {
          id: 'sensorEven',
          type: 'rect',
          elementDrawInfo: {
            width: ms.AREA_S.WIDTH,
            height: (ms.AREA_S.HEIGHT * 1.5) / 4,
            color: 'white',
            errColor: 'white',
            opacity: 0.3,
          },
          textStyleInfo: {
            // isTitleWrap: 1,
            isHiddenTitle: 1,
            anchor: 1,
            axisScale: [0.5, 0.5],
            // baseline: 'top',
            color: 'white',
            dataColor: 'white',
            fontSize: 10,
          },
        },
      ],
    },
  },
  setInfo: {
    mainInfo: {
      uuid: 'sector_001',
    },
    dccConstructorList: [
      {
        dccId: 'DCC_001',
        connect_info: {
          type: 'socket',
          subType: 'parser',
          addConfigInfo: {
            parser: CPT.socket.BYTE_LENGTH,
            option: 8,
          },
          hasOnDataClose: true,
          host: '192.168.0.158',
          port: 15800,
        },
      },
      {
        dccId: 'DCC_002',
        connect_info: {
          type: 'socket',
          subType: 'parser',
          addConfigInfo: {
            parser: CPT.socket.BYTE_LENGTH,
            option: 8,
          },
          hasOnDataClose: true,
          host: '192.168.0.158',
          port: 15801,
        },
      },
      {
        dccId: 'DCC_003',
        connect_info: {
          type: 'socket',
          subType: 'parser',
          addConfigInfo: {
            parser: CPT.socket.DELIMITER,
            option: Buffer.from('03', 'hex'),
          },
          host: '192.168.0.158',
          // port: 15802,
          port: 'COM3',
        },
      },
      {
        dccId: 'DCC_004',
        connect_info: {
          type: 'socket',
          subType: 'parser',
          addConfigInfo: {
            parser: CPT.socket.DELIMITER,
            option: Buffer.from('03', 'hex'),
          },
          host: '192.168.0.158',
          port: 15803,
        },
      },
    ],
    dpcConstructorList: [
      {
        dpcId: 'DPC_001',
        protocol_info: {
          mainCategory: 'ETC',
          subCategory: 'JK_NR_2',
        },
      },
      {
        dpcId: 'DPC_002',
        protocol_info: {
          mainCategory: 'ETC',
          subCategory: 'BatSm',
        },
      },
    ],
    dataLoggerStructureList: [
      {
        target_prefix: 'D_JK',
        target_name: '릴레이 로거(JK_NR_2)',
        dataLoggerDeviceList: [
          {
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            target_code: '001',
            target_name: 'Lv.1 ~ Lv.2',
            nodeList: ['R_1', 'R_2'],
          },
          {
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            target_code: '002',
            target_name: 'Lv.3 ~ Lv.4',
            nodeList: ['R_3', 'R_4'],
          },
        ],
      },
      {
        target_prefix: 'D_B_P',
        target_name: '배터리 로거',
        dataLoggerDeviceList: [
          {
            dccId: 'DCC_004',
            dpcId: 'DPC_002',
            target_code: '003',
            nodeList: ['B_P'],
          },
        ],
      },
    ],
    nodeStructureList: [
      {
        target_id: 'amp',
        target_name: '전류',
        data_unit: 'A',
        defList: [
          {
            // Amp Oil Pump
            target_id: 'ampOp',
            target_name: '오일 펌프 전류',
            target_prefix: 'AMP_OP',
            nodeList: [
              {
                target_code: '1',
                // target_name: '오일펌프 1',
                data_logger_index: 1,
                note: 'D16',
                // svgNodePosOpt: {
                //   resourceId: 'tableSensor',
                //   axisScale: [0.5, 0.5],
                // },
              },
              {
                target_code: '2',
                target_name: '오일펌프 2',
                data_logger_index: 0,
                note: 'D14',
                // svgNodePosOpt: {
                //   resourceId: 'tableSensor',
                //   axisScale: [0, 0.8],
                // },
              },
            ],
          },
        ],
      },
      {
        // Feedback Valve
        target_id: 'fdValve',
        target_name: '밸브 피드백',
        data_unit: '%',
        defList: [
          {
            // Feedback Valve Oil Tank
            target_id: 'fdValveOt',
            target_name: '오일 탱크 밸브 피드백',
            target_prefix: 'FDVA_OT',
            nodeList: [
              {
                target_code: '1',
                target_name: '오일탱크 1 밸브',
                data_logger_index: 0,
                note: 'D12',
              },
              {
                target_code: '2',
                target_name: '오일탱크 2 밸브',
                data_logger_index: 1,
                note: 'D13',
              },
            ],
          },
          {
            // Feedback Valve PTC
            target_id: 'fdValvePtc',
            target_name: '집열기 밸브 피드백',
            target_prefix: 'FDVA_PTC',
            nodeList: [
              {
                target_name: '집열기 밸브',
                note: 'D11',
              },
            ],
          },
          {
            // Feedback Valve Steam Generator
            target_id: 'fdValveSg',
            target_name: '증기 발생기 밸브 피드백',
            target_prefix: 'FDVA_SG',
            nodeList: [
              {
                target_name: '스팀발생기 밸브',
                note: 'D10',
              },
            ],
          },
        ],
      },
      {
        // Flow Rate Cumulative
        target_id: 'frCum',
        target_name: '누계 유량',
        data_unit: '㎥/h',
        defList: [
          {
            // Flow Rate Cumulative Steam Generator
            target_id: 'frCumSg',
            target_name: '증기 누계 유량',
            target_prefix: 'FRCU_SG',
            nodeList: [
              {
                note: 'D100',
              },
            ],
          },
          {
            // Flow Rate Cumulative Pipe
            target_id: 'frCumPipe',
            target_name: '파이프 누계 유량',
            target_prefix: 'FRCU_PIP',
            nodeList: [
              {
                note: 'D604',
              },
            ],
          },
        ],
      },
      {
        // Flow Rate Instantaneous
        target_id: 'frIns',
        target_name: '순시 유량',
        data_unit: '㎥/m',
        defList: [
          {
            // Flow Rate Instantaneous Steam Generator
            target_id: 'frInsSg',
            target_name: '증기 순시 유량',
            target_prefix: 'FRIN_SG',
            nodeList: [
              {
                note: 'D102',
              },
            ],
          },
          {
            // Flow Rate Instantaneous Pipe
            target_id: 'frInsPipe',
            target_name: '파이프 순시 유량',
            target_prefix: 'FRIN_PIP',
            nodeList: [
              {
                note: 'D600',
              },
            ],
          },
          {
            // Flow Rate Instantaneous Pipe Operation
            target_id: 'frInsPipeOper',
            target_name: '파이프 순시 유량 방향',
            target_prefix: 'FRIN_PIOP',
            nodeList: [
              {
                note: 'D602',
              },
            ],
          },
        ],
      },
      {
        target_id: 'frequency',
        target_name: '주파수',
        data_unit: '㎏/㎝',
        defList: [
          {
            target_id: 'frequencyPipe',
            target_name: '파이프 주파수',
            target_prefix: 'FRE_PIP',
            nodeList: [
              {
                note: 'D612',
              },
            ],
          },
        ],
      },
      {
        target_id: 'irradiance',
        target_name: '조도',
        data_unit: 'KLUX',
        defList: [
          {
            target_id: 'irradianceEnv',
            target_name: '환경 조도',
            target_prefix: 'IRR_ENV',
            nodeList: [
              {
                note: 'D20',
              },
            ],
          },
        ],
      },
      {
        target_id: 'pressureGauge',
        target_name: '게이지 압력',
        data_unit: 'bar',
        defList: [
          {
            // Pressure Gauge Steam Generator
            target_id: 'pressureGaugeSg',
            target_name: '증기 발생기 압력',
            target_prefix: 'PRGA_SG',
            nodeList: [
              {
                note: 'D18',
              },
            ],
          },
          {
            // Pressure Gauge Pipe
            target_id: 'pressureGaugePipe',
            target_name: '파이프 압력',
            target_prefix: 'PRGA_PIP',
            nodeList: [
              {
                note: 'D610',
              },
            ],
          },
        ],
      },
      {
        target_id: 'solar',
        target_name: '일사량',
        data_unit: 'W/m²',
        description: '1평방 미터당 조사되는 일사에너지의 양이 1W',
        defList: [
          {
            target_id: 'solarEnv',
            target_name: '환경 일사량',
            target_prefix: 'SOL_ENV',
            nodeList: [
              {
                target_code: '1',
                note: 'D500',
              },
              {
                target_code: '2',
                note: 'D502',
              },
            ],
          },
        ],
      },

      {
        target_id: 'temp',
        target_name: '온도',
        data_unit: '℃',
        description: '섭씨',
        defList: [
          {
            target_id: 'tempEnv',
            target_name: '환경 온도',
            target_prefix: 'TEM_ENV',
            nodeList: [
              {
                note: 'D30',
              },
            ],
          },
          {
            target_id: 'tempOil',
            target_name: '오일 온도',
            target_prefix: 'TEM_OIL',
            nodeList: [
              {
                target_code: '1',
                target_name: '집열기 진입 온도',
                data_logger_index: 0,
                note: 'D22',
              },
              {
                target_code: '2',
                target_name: '집열기 출구 온도',
                data_logger_index: 1,
                note: 'D24',
              },
              {
                target_code: '3',
                target_name: '오일 탱크 1 온도',
                data_logger_index: 2,
                note: 'D26',
              },
              {
                target_code: '4',
                target_name: '오일 탱크 2 온도',
                data_logger_index: 3,
                note: 'D28',
              },
              {
                target_code: '5',
                target_name: '증기발생기 입구 온도',
                data_logger_index: 4,
                note: 'D32',
              },
              {
                target_code: '6',
                target_name: '증기발생기 온도',
                data_logger_index: 5,
                note: 'D34',
              },
            ],
          },
          {
            target_id: 'tempSteam',
            target_name: '스팀 온도',
            target_prefix: 'TEM_STE',
            nodeList: [
              {
                target_code: '1',
                target_name: '증기발생기 스팀 온도',
                data_logger_index: 0,
                note: 'D24',
              },
              {
                target_code: '2',
                target_name: '증기발생기 출구 온도',
                data_logger_index: 0,
                note: 'D608',
              },
            ],
          },
          {
            target_id: 'tempUnit',
            target_name: '단위 온도',
            target_prefix: 'TEM_UNI',
            nodeList: [
              {
                note: 'D614',
              },
            ],
          },
        ],
      },
      // *************  Modbus Read Coil
      {
        target_id: 'info',
        target_name: '정보',
        is_sensor: '1',
        defList: [
          {
            // Mode System Operation
            target_id: 'infoSysOper',
            target_name: '시스템 동작 상태',
            target_prefix: 'INF_SYOP',
            nodeList: [
              {
                note: 'M72(0: Off, 1: On)',
              },
            ],
          },
          {
            // Mode System Operation
            target_id: 'infoSky',
            target_name: '날씨',
            target_prefix: 'INF_SKY',
            nodeList: [
              {
                note: 'M75(0: 흐린 날씨, 1: 맑은 날씨)',
              },
            ],
          },
          {
            // Mode Use Oil Pump
            target_id: 'infoUseOp',
            target_name: '오일 펌프 사용 유무',
            target_prefix: 'INF_USOP',
            nodeList: [
              {
                note: 'M122(0: OP2, 1: OP1)',
              },
            ],
          },
          {
            // Mode Use Oil Pump
            target_id: 'infoSysMode',
            target_name: '운영 모드',
            target_prefix: 'INF_SYMO',
            nodeList: [
              {
                note: 'D2330(0: 로컬, 1: 타이머, 2: 원격)',
              },
            ],
          },
        ],
      },
      {
        target_id: 'mode',
        defList: [
          {
            target_id: 'modeOt',
            target_name: '탱크 모드',
            target_prefix: 'MOD_OT',
            nodeList: [
              {
                target_code: '1',
                target_name: '1#오일탱크 열저장 설정 요구에 부합됨',
                data_logger_index: 0,
                note: 'M116',
                svgNodePosOpt: {
                  resourceId: 'tableHiddenSensor',
                  axisScale: [0.5, 0],
                },
              },
              {
                target_code: '2',
                target_name: '2#오일탱크 열저장 설정 요구에 부합됨',
                data_logger_index: 1,
                note: 'M117',
                svgNodePosOpt: {
                  resourceId: 'sensorOdd',
                  axisScale: [0.5, 0.333],
                },
              },
              {
                target_code: '3',
                target_name: '1#탱크가 열방출 허용 온도에 도달함',
                data_logger_index: 2,
                note: 'M118',
                svgNodePosOpt: {
                  resourceId: 'sensorEven',
                  axisScale: [0.5, 0.666],
                },
              },
              {
                target_code: '4',
                target_name: '2#탱크가 열방출 허용 온도에 도달함',
                data_logger_index: 3,
                note: 'M119',
                svgNodePosOpt: {
                  resourceId: 'tableHiddenSensor',
                  axisScale: [0.1, 1],
                },
              },
            ],
          },
          {
            target_id: 'modeSteam',
            target_name: '증기 모드',
            target_prefix: 'MOD_STE',
            nodeList: [
              {
                target_code: '1',
                target_name: '증기 직접 공급 모드 운행',
                data_logger_index: 0,
                note: 'M123',
              },
              {
                target_code: '2',
                target_name: '열저장탱크 열저장모드 운행',
                data_logger_index: 1,
                note: 'M124',
              },
              {
                target_code: '3',
                target_name: '열저장탱크 열방출모드 운행',
                data_logger_index: 2,
                note: 'M125',
              },
              {
                target_code: '4',
                target_name: '우선적 열저장모드 운행',
                data_logger_index: 3,
                note: 'M126',
              },
            ],
          },
        ],
      },
      // Device
      {
        target_id: 'pump',
        defList: [
          {
            target_id: 'pumpOil',
            target_name: '오일 펌프',
            target_prefix: 'PUM_OIL',
            nodeList: [
              {
                target_code: '1',
                data_logger_index: 0,
                note: 'M70',
              },
              {
                target_code: '2',
                data_logger_index: 1,
                note: 'M71',
              },
            ],
          },
          {
            // Pump Supply Water
            target_id: 'pumpSw',
            target_name: '보충 펌프',
            target_prefix: 'PUM_SW',
            nodeList: [
              {
                note: 'M74',
              },
            ],
          },
        ],
      },
      {
        target_id: 'ptc',
        defList: [
          {
            target_id: 'ptc',
            target_prefix: 'PTC',
            nodeList: [
              {
                note: 'M73',
              },
            ],
          },
        ],
      },
    ],
  },
  relationInfo: {
    placeRelationList: [
      {
        target_id: 'alarmArea',
        target_name: '알람',
        defList: [
          {
            target_id: 'mode',
            target_name: '모드',
            target_prefix: 'AREA_ALA_MOD',
            placeList: [
              {
                target_code: 'OT',
                target_name: '탱크 모드',
                nodeList: ['MOD_OT_1', 'MOD_OT_2', 'MOD_OT_3', 'MOD_OT_4'],
                svgPositionInfo: {
                  resourceId: 'middleArea',
                  point: convertPlacePosition(0.8, 0.8),
                },
              },
              {
                target_code: 'STE',
                target_name: '증기 직접 공급 모드',
                nodeList: ['MOD_STE_1', 'MOD_STE_2', 'MOD_STE_3', 'MOD_STE_4'],
                svgPositionInfo: {
                  resourceId: 'smallArea',
                  point: [mapSize.width * 0.8, mapSize.height * 0.6],
                },
              },
            ],
          },
          {
            target_id: 'env',
            target_name: '날씨 상태',
            target_prefix: 'AREA_ALA_ENV',
            placeList: [
              {
                nodeList: ['INF_SKY'],
                svgPositionInfo: {
                  resourceId: 'smallArea',
                  point: [mapSize.width * 0.8, mapSize.height * 0.4],
                },
              },
            ],
          },
          {
            target_id: 'system',
            target_name: '시스템 상태',
            target_prefix: 'AREA_ALA_SYS',
            placeList: [
              {
                target_code: 'MOD',
                target_name: '운영 모드',
                nodeList: ['INF_SYMO'],
                svgPositionInfo: {
                  resourceId: 'smallArea',
                  point: [mapSize.width * 0.8, mapSize.height * 0.2],
                },
              },
              {
                target_code: 'OPER',
                target_name: '시스템 동작 상태',
                nodeList: ['INF_SYOP'],
                svgPositionInfo: {
                  resourceId: 'smallArea',
                  point: [mapSize.width * 0.8, mapSize.height * 0],
                },
              },
            ],
          },
        ],
      },

      {
        target_id: 'envArea',
        target_name: '환경',
        defList: [
          {
            target_id: 'env',
            target_prefix: 'AREA_ENV',
            placeList: [
              {
                nodeList: ['IRR_ENV', 'SOL_ENV_1', 'SOL_ENV_2', 'TEM_ENV'],
                svgPositionInfo: {
                  resourceId: 'ptcEnvArea',
                  point: ms.POS.PTC_ENV,
                },
              },
            ],
          },
        ],
      },
      {
        target_id: 'opArea',
        target_name: '오일펌프',
        defList: [
          {
            target_id: 'opArea',
            target_prefix: 'AREA_OP',
            placeList: [
              {
                target_code: '0',
                nodeList: ['AMP_OP_1', 'AMP_OP_2'],
                svgPositionInfo: {
                  resourceId: 'smallArea',
                  point: ms.POS.OP,
                },
              },
              {
                target_code: '1',
                target_name: '오일펌프 1',
                nodeList: ['PUM_OIL_1'],
                svgPositionInfo: {
                  resourceId: 'deviceArea',
                  point: ms.POS.DA.OP1,
                },
              },
              {
                target_code: '2',
                target_name: '오일펌프 2',
                nodeList: ['PUM_OIL_2'],
                svgPositionInfo: {
                  resourceId: 'deviceArea',
                  point: ms.POS.DA.OP2,
                },
              },
            ],
          },
        ],
      },
      {
        target_id: 'otArea',
        target_name: '오일탱크',
        defList: [
          {
            target_id: 'otArea',
            target_nameL: '오일탱크',
            target_prefix: 'AREA_OT',
            placeList: [
              {
                target_code: '1',
                nodeList: ['TEM_OIL_3', 'FDVA_OT_1'],
                svgPositionInfo: {
                  resourceId: 'otArea',
                  point: ms.POS.OT1,
                },
              },
              {
                target_code: '2',
                nodeList: ['TEM_OIL_4', 'FDVA_OT_2'],
                svgPositionInfo: {
                  resourceId: 'otArea',
                  point: ms.POS.OT2,
                },
              },
            ],
          },
          {
            target_id: 'otAreaInlet',
            target_name: '오일탱크 입구',
            target_prefix: 'AREA_OT_IN',
          },
          {
            target_id: 'otAreaOutlet',
            target_name: '오일탱크 출구',
            target_prefix: 'AREA_OT_OUT',
          },
        ],
      },
      {
        target_id: 'ptcArea',
        target_name: '집열기',
        defList: [
          {
            target_id: 'ptcArea',
            target_name: '집열기',
            target_prefix: 'AREA_PTC',
            placeList: [
              {
                nodeList: ['FDVA_PTC', 'TEM_OIL_1', 'TEM_OIL_2'],
              },
            ],
          },
          {
            target_id: 'ptcInletArea',
            target_name: '집열기 입구',
            target_prefix: 'AREA_PTC_IN',
          },
          {
            target_id: 'ptcOutletArea',
            target_name: '집열기 출구',
            target_prefix: 'AREA_PTC_OUT',
          },
          {
            target_id: 'ptcOperArea',
            target_name: '집광기 작동 상태',
            target_prefix: 'AREA_PTC_OPE',
            placeList: [
              {
                nodeList: ['PTC'],
                svgPositionInfo: {
                  resourceId: 'deviceArea',
                  point: ms.POS.DA.PTC,
                },
              },
            ],
          },
        ],
      },
      {
        target_id: 'sgArea',
        target_name: '스팀발생기',
        defList: [
          {
            target_id: 'sgArea',
            target_prefix: 'AREA_SG',
            placeList: [
              {
                target_name: '스팀발생기',
                nodeList: ['FRCU_SG', 'FRIN_SG', 'PRGA_SG', 'TEM_OIL_6'],
                svgPositionInfo: {
                  resourceId: 'sgArea',
                  point: ms.POS.SG,
                },
              },
            ],
          },
          {
            target_id: 'sgInletArea',
            target_name: '스팀발생기 입구',
            target_prefix: 'AREA_SG_IN',
            nodeList: ['TEM_OIL_5', 'FDVA_SG'],
          },
          {
            target_id: 'sgOutletArea',
            target_name: '스팀발생기 출구',
            target_prefix: 'AREA_SG_OUT',
            placeList: [
              {
                nodeList: [
                  'FRCU_PIP',
                  'FRE_PIP',
                  'FRIN_PIP',
                  'PRGA_PIP',
                  'FRIN_PIOP',
                  'TEM_STE_2',
                  'TEM_UNI',
                ],
              },
            ],
          },
        ],
      },
      {
        target_id: 'swArea',
        target_name: '보충 급수',
        defList: [
          {
            target_id: 'swPumpOperArea',
            target_name: '보충펌프 작동 상태',
            target_prefix: 'AREA_SW',
            placeList: [
              {
                nodeList: ['PUM_SW'],
                svgPositionInfo: {
                  resourceId: 'deviceArea',
                  point: ms.POS.DA.SW,
                },
              },
            ],
          },
        ],
      },
    ],
    convertRelationList: [
      {
        nDefId: 'operStsMode',
        convertInfo: {
          0: '로컬모드 운행중',
          1: '타이머모드 운행중',
          2: '원격모드 운행중',
        },
      },
      {
        nDefId: 'isModeSysOper',
        convertInfo: {
          0: '시스템 OFF',
          1: '시스템 ON',
        },
      },
    ],
  },
  controlInfo: {
    singleCmdList: [
      {
        applyDeviceList: ['relay'],
        singleCmdName: '릴레이',
        singleMidCateCmdInfo: {
          scenarioMsg: '제어 동작을 선택하세요.',
          subCmdList: [
            {
              enName: 'ON',
              krName: '동작',
              controlValue: reqDCT.TRUE,
            },
            {
              enName: 'OFF',
              krName: '정지',
              controlValue: reqDCT.FALSE,
            },
          ],
        },
      },
    ],
    setCmdList: [
      {
        cmdId: 'closeAllDevice',
        cmdName: '모든 장치 닫기',
        trueNodeList: [],
        falseNodeList: ['R_1', 'R_2', 'R_3', 'R_4'],
      },
      {
        cmdId: 'onUpToLv1',
        cmdName: 'Lv.1까지 가동',
        trueNodeList: ['R_1'],
        falseNodeList: ['R_2', 'R_3', 'R_4'],
      },
      {
        cmdId: 'onUpToLv2',
        cmdName: 'Lv.2까지 가동',
        trueNodeList: ['R_1', 'R_2'],
        falseNodeList: ['R_3', 'R_4'],
      },
      {
        cmdId: 'onUpToLv3',
        cmdName: 'Lv.3까지 가동',
        trueNodeList: ['R_1', 'R_2', 'R_3'],
        falseNodeList: ['R_4'],
      },
      {
        cmdId: 'onUpToLv4',
        cmdName: 'Lv.4까지 가동',
        trueNodeList: ['R_1', 'R_2', 'R_3', 'R_4'],
        falseNodeList: [],
      },
    ],
  },
};

module.exports = map;
