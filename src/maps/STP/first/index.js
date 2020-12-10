// Solar Thermal Plant
const _ = require('lodash');

const { BU } = require('base-util-jh');

const CM = require('../../../common');

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
  DA: {
    START_X: 100,
    START_Y: 50,
    WIDTH: mapSize.width * 0.05,
    HEIGHT: mapSize.height * 0.07,
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
            opacity: 0.6,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: {
            isHiddenTitle: 1,
          },
        },
        {
          id: 'tblAlarmCase3',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SIZE.width * 0.11,
            height: ms.SIZE.height * 0.2,
            opacity: 0.5,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
            insideInfo: CM.insideAlarmTemplate1({
              rowsCount: 4,
              shareRate: 0.2,
              dataAnchor: 'start',
            }),
          },
        },
        {
          id: 'tblAlarmCase3x3',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SIZE.width * 0.11,
            height: ms.SIZE.height * 0.18,
            opacity: 0.5,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
            insideInfo: CM.insideSensorTemplate1({
              rowsCount: 3,
              shareRate: 0.2,
              vStrokeScale: 0.5,
              dataAnchor: CM.anchor.middle,
            }),
          },
        },
        {
          id: 'tblSensorCase2',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SIZE.width * 0.11,
            height: ms.SIZE.height * 0.12,
            opacity: 0.5,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
            insideInfo: CM.insideSensorTemplate1({
              rowsCount: 2,
              shareRate: 0.34,
              vStrokeScale: 0.6,
            }),
          },
        },
        {
          id: 'tblSensorCase3',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SIZE.width * 0.11,
            height: ms.SIZE.height * 0.16,
            opacity: 0.5,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
            insideInfo: CM.insideSensorTemplate1({
              rowsCount: 3,
              shareRate: 0.25,
              vStrokeScale: 0.45,
            }),
          },
        },
        {
          id: 'tblSensorCase4',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SIZE.width * 0.11,
            height: ms.SIZE.height * 0.2,
            opacity: 0.5,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
            insideInfo: CM.insideSensorTemplate1({
              rowsCount: 4,
              shareRate: 0.2,
              vStrokeScale: 0.45,
            }),
          },
        },
        {
          id: 'tblSensorCase6',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SIZE.width * 0.11,
            height: ms.SIZE.height * 0.28,
            opacity: 0.5,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
            insideInfo: CM.insideSensorTemplate1({
              rowsCount: 6,
              shareRate: 0.143,
              vStrokeScale: 0.45,
            }),
          },
        },
        {
          id: 'tblSensorCase7',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SIZE.width * 0.11,
            height: ms.SIZE.height * 0.32,
            opacity: 0.5,
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
            insideInfo: CM.insideSensorTemplate1({
              rowsCount: 7,
              shareRate: 0.125,
              vStrokeScale: 0.45,
            }),
          },
        },
        /* *************       Device        ***************** */
        {
          id: 'cmdBtn',
          type: 'rect',
          elementDrawInfo: {
            width: ms.DA.WIDTH,
            height: ms.DA.HEIGHT,
            opacity: 0.5,
            color: ['gray', 'green'],
            // color: ['url(#bg-gray-1)', 'url(#bg-green-1)', 'url(#bg-sky-2)'],
            errColor: 'red',
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
            insideInfo: CM.insideBtnTemplate1({
              shareRate: 0.5,
              dataAnchor: 'middle',
            }),
          },
          textStyleInfo: { fontSize: 15 },
        },
        /* *************       Sensor        ***************** */
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
            anchor: CM.anchor.middle,
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
            anchor: CM.anchor.middle,
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
                target_name: '오일펌프 1',
                data_logger_index: 1,
                note: 'D16',
                svgNodePosOpt: {
                  tblIndex: 0,
                },
              },
              {
                target_code: '2',
                target_name: '오일펌프 2',
                data_logger_index: 0,
                note: 'D14',
                svgNodePosOpt: {
                  tblIndex: 1,
                },
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
                target_name: '밸브 피드백',
                data_logger_index: 0,
                note: 'D12 오일탱크 1',
                svgNodePosOpt: {
                  placeId: 'AREA_OT_1',
                  tblIndex: 0,
                },
              },
              {
                target_code: '2',
                target_name: '밸브 피드백',
                data_logger_index: 1,
                note: 'D13 오일탱크 2',
                svgNodePosOpt: {
                  placeId: 'AREA_OT_2',
                  tblIndex: 0,
                },
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
                target_name: '밸브 피드백',
                note: 'D11 집열기 밸브',
                svgNodePosOpt: {
                  placeId: 'AREA_PTC',
                  tblIndex: 0,
                },
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
                target_name: '밸브 피드백',
                note: 'D10 스팀발생기 밸브',
                svgNodePosOpt: {
                  placeId: 'AREA_SG',
                  tblIndex: 0,
                },
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
                target_name: '누계 유량',
                note: 'D100',
                svgNodePosOpt: {
                  placeId: 'AREA_SG',
                  tblIndex: 3,
                },
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
                target_name: '누계 유량',
                note: 'D604',
                svgNodePosOpt: {
                  tblIndex: 4,
                },
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
                target_name: '순시 유량',
                note: 'D102',
                svgNodePosOpt: {
                  placeId: 'AREA_SG',
                  tblIndex: 4,
                },
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
                target_name: '순시 유량',
                note: 'D600',
                svgNodePosOpt: {
                  tblIndex: 3,
                },
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
                target_name: '유량 방향',
                note: 'D602',
                svgNodePosOpt: {
                  tblIndex: 5,
                },
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
                target_name: '주파수',
                note: 'D612 파이프 주파수',
                svgNodePosOpt: {
                  tblIndex: 2,
                },
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
                target_name: '조도',
                note: 'D20 환경 조도',
                svgNodePosOpt: {
                  tblIndex: 2,
                },
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
                target_name: '압력',
                note: 'D18',
                svgNodePosOpt: {
                  placeId: 'AREA_SG',
                  tblIndex: 5,
                },
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
                svgNodePosOpt: {
                  tblIndex: 1,
                },
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
                target_name: '일사량',
                note: 'D500',
                svgNodePosOpt: {
                  tblIndex: 1,
                },
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
                target_name: '온도',
                note: 'D30 환경 온도',
                svgNodePosOpt: {
                  tblIndex: 0,
                },
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
                target_name: '입구 온도',
                data_logger_index: 0,
                note: 'D22 집열기 입구 온도',
                svgNodePosOpt: {
                  placeId: 'AREA_PTC',
                  tblIndex: 1,
                },
              },
              {
                target_code: '2',
                target_name: '출구 온도',
                data_logger_index: 1,
                note: 'D24 집열기 출구 온도',
                svgNodePosOpt: {
                  placeId: 'AREA_PTC',
                  tblIndex: 2,
                },
              },
              {
                target_code: '3',
                target_name: '오일 탱크 온도',
                data_logger_index: 2,
                note: 'D26 오일 탱크 1',
                svgNodePosOpt: {
                  placeId: 'AREA_OT_1',
                  tblIndex: 1,
                },
              },
              {
                target_code: '4',
                target_name: '오일 탱크 온도',
                data_logger_index: 3,
                note: 'D28 오일 탱크 2',
                svgNodePosOpt: {
                  placeId: 'AREA_OT_2',
                  tblIndex: 1,
                },
              },
              {
                target_code: '5',
                target_name: '입구 온도',
                data_logger_index: 4,
                note: 'D32 증기발생기 입구 온도',
                svgNodePosOpt: {
                  placeId: 'AREA_SG',
                  tblIndex: 1,
                },
              },
              {
                target_code: '6',
                target_name: '내부 온도',
                data_logger_index: 5,
                note: 'D34 증기발생기 온도',
                svgNodePosOpt: {
                  placeId: 'AREA_SG',
                  tblIndex: 2,
                },
              },
            ],
          },
          {
            target_id: 'tempSteam',
            target_name: '스팀 온도',
            target_prefix: 'TEM_STE',
            nodeList: [
              {
                target_name: '출구 온도',
                data_logger_index: 0,
                note: 'D608 증기발생기 출구 온도',
                svgNodePosOpt: {
                  tblIndex: 0,
                },
              },
            ],
          },
          {
            target_id: 'tempUnit',
            target_name: '단위 온도',
            target_prefix: 'TEM_UNI',
            nodeList: [
              {
                target_name: '단위',
                note: 'D614',
                svgNodePosOpt: {
                  tblIndex: 6,
                },
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
            target_name: '시스템 동작',
            target_prefix: 'INF_SYOP',
            nodeList: [
              {
                note: 'M72(0: Off, 1: On)',
                svgNodePosOpt: {
                  tblIndex: 0,
                },
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
                svgNodePosOpt: {
                  tblIndex: 1,
                },
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
                svgNodePosOpt: {
                  tblIndex: 2,
                },
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
                  tblIndex: 0,
                },
              },
              {
                target_code: '2',
                target_name: '2#오일탱크 열저장 설정 요구에 부합됨',
                data_logger_index: 1,
                note: 'M117',
                svgNodePosOpt: {
                  tblIndex: 1,
                },
              },
              {
                target_code: '3',
                target_name: '1#탱크가 열방출 허용 온도에 도달함',
                data_logger_index: 2,
                note: 'M118',
                svgNodePosOpt: {
                  tblIndex: 2,
                },
              },
              {
                target_code: '4',
                target_name: '2#탱크가 열방출 허용 온도에 도달함',
                data_logger_index: 3,
                note: 'M119',
                svgNodePosOpt: {
                  tblIndex: 3,
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
                svgNodePosOpt: {
                  tblIndex: 0,
                },
              },
              {
                target_code: '2',
                target_name: '열저장탱크 열저장모드 운행',
                data_logger_index: 1,
                note: 'M124',
                svgNodePosOpt: {
                  tblIndex: 1,
                },
              },
              {
                target_code: '3',
                target_name: '열저장탱크 열방출모드 운행',
                data_logger_index: 2,
                note: 'M125',
                svgNodePosOpt: {
                  tblIndex: 2,
                },
              },
              {
                target_code: '4',
                target_name: '우선적 열저장모드 운행',
                data_logger_index: 3,
                note: 'M126',
                svgNodePosOpt: {
                  tblIndex: 3,
                },
              },
            ],
          },
        ],
      },
      // Device
      {
        target_id: 'pump',
        is_sensor: 2,
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
                svgNodePosOpt: {
                  resourceId: 'cmdBtn',
                },
              },
              {
                target_code: '2',
                data_logger_index: 1,
                note: 'M71',
                svgNodePosOpt: {
                  resourceId: 'cmdBtn',
                },
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
                svgNodePosOpt: {
                  resourceId: 'cmdBtn',
                },
              },
            ],
          },
        ],
      },
      {
        target_id: 'ptc',
        is_sensor: 0,
        defList: [
          {
            target_id: 'ptc',
            target_prefix: 'PTC',
            target_name: 'PTC 집광기',
            nodeList: [
              {
                note: 'M73',
                svgNodePosOpt: {
                  placeId: 'AREA_PTC_OPE',
                  resourceId: 'cmdBtn',
                },
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
                  resourceId: 'tblAlarmCase3',
                  point: convertPlacePosition(0.85, 0.6),
                },
              },
              {
                target_code: 'STE',
                target_name: '작동 모드',
                nodeList: ['MOD_STE_1', 'MOD_STE_2', 'MOD_STE_3', 'MOD_STE_4'],
                svgPositionInfo: {
                  resourceId: 'tblAlarmCase3',
                  point: convertPlacePosition(0.85, 0.35),
                },
              },
            ],
          },
          {
            target_id: 'base',
            target_name: '기본 정보',
            target_prefix: 'AREA_ALA_BASE',
            placeList: [
              {
                nodeList: ['INF_SYMO', 'INF_SKY', 'INF_SYOP'],
                svgPositionInfo: {
                  resourceId: 'tblAlarmCase3x3',
                  point: convertPlacePosition(0.85, 0.1),
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
                nodeList: ['IRR_ENV', 'SOL_ENV_1', 'TEM_ENV'],
                svgPositionInfo: {
                  resourceId: 'tblSensorCase3',
                  point: convertPlacePosition(0.68, 0.45),
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
                target_name: '오일펌프 전류',
                nodeList: ['AMP_OP_1', 'AMP_OP_2'],
                svgPositionInfo: {
                  resourceId: 'tblSensorCase2',
                  point: convertPlacePosition(0.4, 0.1),
                },
              },
              {
                target_code: '1',
                target_name: '오일펌프 1',
                nodeList: ['PUM_OIL_1'],
                svgPositionInfo: {
                  resourceId: 'deviceArea',
                  point: convertPlacePosition(0.6, 0.1),
                },
              },
              {
                target_code: '2',
                target_name: '오일펌프 2',
                nodeList: ['PUM_OIL_2'],
                svgPositionInfo: {
                  resourceId: 'deviceArea',
                  point: convertPlacePosition(0.6, 0.25),
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
            target_name: '오일탱크',
            target_prefix: 'AREA_OT',
            placeList: [
              {
                target_code: '1',
                nodeList: ['TEM_OIL_3', 'FDVA_OT_1'],
                svgPositionInfo: {
                  resourceId: 'tblSensorCase2',
                  point: convertPlacePosition(0.25, 0.45),
                },
              },
              {
                target_code: '2',
                nodeList: ['TEM_OIL_4', 'FDVA_OT_2'],
                svgPositionInfo: {
                  resourceId: 'tblSensorCase2',
                  point: convertPlacePosition(0.25, 0.6),
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
                svgPositionInfo: {
                  resourceId: 'tblSensorCase3',
                  point: convertPlacePosition(0.55, 0.45),
                },
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
                  point: convertPlacePosition(0.71, 0.25),
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
                nodeList: [
                  'FDVA_SG',
                  'TEM_OIL_5',
                  'TEM_OIL_6',
                  'FRCU_SG',
                  'FRIN_SG',
                  'PRGA_SG',
                ],
                svgPositionInfo: {
                  resourceId: 'tblSensorCase6',
                  point: convertPlacePosition(0.07, 0.4),
                },
              },
            ],
          },
          // {
          //   target_id: 'sgInletArea',
          //   target_prefix: 'AREA_SG_IN',
          //   placeList: [
          //     {
          //       target_name: '스팀발생기 입구',
          //       // nodeList: ['TEM_OIL_5', 'FDVA_SG'],
          //       // svgPositionInfo: {
          //       //   resourceId: 'tblSensorCase2',
          //       //   point: convertPlacePosition(0.185, 0.25),
          //       // },
          //     },
          //   ],
          // },
          {
            target_id: 'sgOutletArea',
            target_name: '스팀발생기 출구',
            target_prefix: 'AREA_SG_OUT',
            placeList: [
              {
                nodeList: [
                  'TEM_STE',
                  'PRGA_PIP',
                  'FRE_PIP',
                  'FRIN_PIP',
                  'FRCU_PIP',
                  'FRIN_PIOP',
                  'TEM_UNI',
                ],
                svgPositionInfo: {
                  resourceId: 'tblSensorCase7',
                  point: convertPlacePosition(0.05, 0.05),
                },
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
                  point: convertPlacePosition(0.1, 0.72),
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
        applyDeviceList: ['pumpSw'],
        singleCmdName: '펌프',
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