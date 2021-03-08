// Solar Thermal Plant
const CM = require('../../../common');

const {
  di: {
    dmmModel: { mmSvgBtnClass },
    dcmConfigModel: {
      nodeDataType: { SENSOR, BLOCK, TROUBLE, NONE },
      goalDataRange: gDR,
      reqDeviceControlType: reqDCT,
    },
    dccFlagModel: { controllerParserType: CPT },
  },
} = require('../../../module');

const mapSize = {
  width: 400,
  height: 300,
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
  UPS: {
    width: mapSize.width * 0.5,
    height: mapSize.height * 0.8,
  },
};

/** @type {mDeviceMap} */
const map = {
  drawInfo: {
    frame: {
      mapInfo: {
        width: ms.SIZE.width,
        height: ms.SIZE.height,
      },
      svgModelResourceList: [
        /* *************       Place        ***************** */
        {
          id: 'ups_area',
          type: 'rect',
          elementDrawInfo: {
            width: ms.UPS.width,
            height: ms.UPS.height,
            color: 'url(#bg-green-1)',
            opacity: 1,
            filterInfo: {
              filter: 'url(#dropShadow)',
            },
          },
        },
        /* *************       Device        ***************** */
        {
          id: 'waterDoor',
          type: 'rect',
          elementDrawInfo: {
            width: 50,
            height: 50,
            color: ['url(#bg-gray-1)', 'url(#bg-green-1)'],
            strokeInfo: {
              width: 0.7,
              color: '#555',
            },
            svgClass: [mmSvgBtnClass.lightGray, mmSvgBtnClass.orange],
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: { fontSize: 8 },
        },
        {
          id: 'pump',
          type: 'circle',
          elementDrawInfo: {
            radius: 25,
            color: ['#a3a3a3', '#22fb00'],
            svgClass: [mmSvgBtnClass.lightGray, mmSvgBtnClass.blue],
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: { fontSize: 8 },
        },
        /* *************       Table        ***************** */
        {
          id: 'tblSensorCase3',
          type: 'rect',
          elementDrawInfo: {
            width: ms.UPS.width * 0.6,
            height: ms.UPS.height * 0.6,
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
            width: ms.SIZE.width * 0.4,
            height: ms.SIZE.height * 0.4,
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
      ],
    },
    positionInfo: {},
  },
  setInfo: {
    mainInfo: {
      uuid: 'sector_001',
    },
    dccConstructorList: [
      {
        dccId: 'DCC_ZB_001',
        dccName: '지그비 데이터로거',
        connect_info: {
          // host: 'http://naver.com',
          type: 'socket',
          subType: '',
          port: 15300,
        },
        // connect_info: { type: 'zigbee', subType: 'xbee', baudRate: 9600, port: 'COM6' },
      },
      {
        dccId: 'DCC_INV_001',
        dccName: '인버터 데이터로거',
        connect_info: { type: 'socket', subType: '', port: 15301 },
        // connect_info: {
        //   type: 'serial',
        //   subType: 'parser',
        //   baudRate: 9600,
        //   port: 'COM3',
        //   addConfigInfo: {
        //     parser: 'delimiterParser',
        //     option: Buffer.from([0x04]),
        //   },
        // },
      },
    ],
    dpcConstructorList: [
      {
        dpcId: 'DPC_ZB_001',
        protocol_info: { mainCategory: 'UPSAS', subCategory: 'smRooftop' },
      },
      {
        dpcId: 'DPC_INV_001',
        protocol_info: { mainCategory: 'Inverter', subCategory: 'das_1.3' },
      },
    ],
    repeatNodeList: [
      {
        repeatId: 'RE_NODE_INV',
        repeatCategory: 'node',
        nodeList: [
          {
            target_code: '001',
            target_name: 'SM 옥상 태양광 (3kW 급)',
          },
        ],
      },
      {
        repeatId: 'RE_PREFIX_INV',
        repeatCategory: 'prefix',
        nodeList: [
          'INV_PV_V',
          'INV_PV_A',
          'INV_PV_KW',
          'INV_G_RS_V',
          'INV_G_ST_V',
          'INV_G_TR_V',
          'INV_G_R_A',
          'INV_G_S_A',
          'INV_G_T_A',
          'INV_G_L_F',
          'INV_PW_PV_KW',
          'INV_PW_G_KW',
          'INV_PW_C_KWH',
          'INV_TRB',
        ],
      },
    ],
    dataLoggerStructureList: [
      {
        target_prefix: 'D_G',
        target_name: '수문 DL',
        dataLoggerDeviceList: [
          {
            serial_number: '0013A20040E58A22',
            target_code: '001',
            dccId: 'DCC_ZB_001',
            dpcId: 'DPC_ZB_001',
            nodeList: ['WD'],
          },
        ],
      },
      {
        target_prefix: 'D_P',
        target_name: '펌프 DL',
        dataLoggerDeviceList: [
          {
            serial_number: '0013A20040E58A21',
            target_code: '001',
            target_name: '펌프 제어반',
            dccId: 'DCC_ZB_001',
            dpcId: 'DPC_ZB_001',
            nodeList: ['P'],
          },
        ],
      },
      {
        target_prefix: 'D_INV',
        target_name: '인버터 DL',
        dataLoggerDeviceList: [
          {
            target_name: 'A (3kW 급)',
            serial_number: '001',
            target_code: '001',
            dccId: 'DCC_INV_001',
            dpcId: 'DPC_INV_001',
            repeatId: 'RE_PREFIX_INV',
          },
        ],
      },
    ],
    nodeStructureList: [
      /* *********             DEVICE             ********* */
      {
        target_id: 'pump',
        target_name: '펌프',
        is_sensor: 0,
        svgViewInfo: {
          thresholdList: [['OFF'], ['ON']],
        },
        defList: [
          {
            target_id: 'pump',
            target_prefix: 'P',
            target_name: '펌프',
            nodeList: [
              {
                svgNodePosOpt: {
                  resourceId: 'pump',
                  axisScale: [0.5, 0],
                },
              },
            ],
          },
        ],
      },
      {
        target_id: 'waterDoor',
        target_name: '수문',
        is_sensor: 0,
        svgViewInfo: {
          thresholdList: [['CLOSE'], ['OPEN']],
        },
        defList: [
          {
            target_id: 'waterDoor',
            target_prefix: 'WD',
            nodeList: [
              {
                svgNodePosOpt: {
                  resourceId: 'waterDoor',
                  axisScale: [0.5, 1],
                },
              },
            ],
          },
        ],
      },
      /* *********             PCS             ********* */
      {
        target_id: 'vol',
        target_name: '전압',
        is_sensor: 2,
        is_submit_api: 0,
        save_db_type: BLOCK,
        data_unit: 'V',
        description: null,
        defList: [
          {
            target_id: 'pvVol',
            target_name: '인버터 PV 전압',
            target_prefix: 'INV_PV_V',
            repeatId: 'RE_NODE_INV',
          },
          {
            target_id: 'gridRsVol',
            target_name: 'RS 선간 전압',
            target_prefix: 'INV_G_RS_V',
            is_submit_api: 1,
            nodeList: [
              {
                target_code: '001',
                target_name: '계통 전압',
                svgNodePosOpt: {
                  placeId: 'AREA_INV',
                  tblIndex: 0,
                },
              },
            ],
          },
        ],
      },
      {
        target_id: 'amp',
        target_name: '전류',
        is_sensor: 2,
        is_submit_api: 0,
        save_db_type: BLOCK,
        data_unit: 'A',
        description: null,
        defList: [
          {
            target_id: 'pvAmp',
            target_name: '인버터 PV 전류',
            target_prefix: 'INV_PV_A',
            repeatId: 'RE_NODE_INV',
          },
          {
            target_id: 'gridRAmp',
            target_name: '인버터 R상 전류',
            target_prefix: 'INV_G_R_A',
            is_submit_api: 1,
            nodeList: [
              {
                target_code: '001',
                target_name: '계통 전류',
                svgNodePosOpt: {
                  placeId: 'AREA_INV',
                  tblIndex: 1,
                },
              },
            ],
          },
        ],
      },
      {
        target_id: 'kW',
        target_name: '전력량',
        is_sensor: 2,
        is_submit_api: 0,
        save_db_type: BLOCK,
        data_unit: 'kW',
        description:
          '1 킬로와트(기호 kW)는 1 초 동안의 1,000 줄(N·m)에 해당하는 일률의 SI 단위',
        defList: [
          {
            target_id: 'pvKw',
            target_name: '인버터 PV 출력',
            target_prefix: 'INV_PV_KW',
            description: 'PV',
            repeatId: 'RE_NODE_INV',
          },
          {
            target_id: 'powerGridKw',
            target_name: '인버터 현재 전력',
            target_prefix: 'INV_PW_G_KW',
            description: 'Power',
            is_submit_api: 1,
            nodeList: [
              {
                target_code: '001',
                target_name: '출력',
                svgNodePosOpt: {
                  placeId: 'AREA_INV',
                  tblIndex: 2,
                },
              },
            ],
          },
        ],
      },
      {
        target_id: 'kWh',
        target_name: '전력량',
        is_sensor: 2,
        is_submit_api: 1,
        save_db_type: BLOCK,
        data_unit: 'kWh',
        description: '시간당 에너지 단위, 1 kW의 일률로 1 시간 동안 하는 일의 양',
        defList: [
          {
            target_id: 'powerDailyKwh',
            target_name: '인버터 하루 발전량',
            target_prefix: 'INV_PW_D_KWH',
            description: 'Daily Power Generation',
            repeatId: 'RE_NODE_INV',
          },
          {
            target_id: 'powerCpKwh',
            target_name: '인버터 누적 발전량',
            target_prefix: 'INV_PW_C_KWH',
            description: 'Cumulative Power Generation',
            nodeList: [
              {
                target_code: '001',
                target_name: '발전량',
                svgNodePosOpt: {
                  placeId: 'AREA_INV',
                  tblIndex: 3,
                },
              },
            ],
          },
        ],
      },
      {
        target_id: 'powerFactor',
        target_name: '역률',
        is_sensor: 2,
        is_submit_api: 0,
        save_db_type: BLOCK,
        data_unit: '%',
        defList: [
          {
            target_id: 'powerPf',
            target_name: '역률',
            target_prefix: 'INV_PW_PF',
            repeatId: 'RE_NODE_INV',
          },
        ],
      },
      {
        target_id: 'frequency',
        target_name: '주파수',
        is_sensor: 2,
        is_submit_api: 0,
        save_db_type: BLOCK,
        data_unit: 'Hz',
        defList: [
          {
            target_id: 'gridLf',
            target_name: '계통 주파수',
            target_prefix: 'INV_G_L_F',
            repeatId: 'RE_NODE_INV',
          },
        ],
      },
      {
        target_id: 'trouble',
        target_name: '오류 목록',
        is_sensor: 2,
        is_submit_api: 0,
        save_db_type: TROUBLE,
        description: '장치에서 보내오는 이상 데이터',
        defList: [
          {
            target_id: 'operTroubleList',
            target_name: '인버터 에러',
            target_prefix: 'INV_TRB',
            repeatId: 'RE_NODE_INV',
          },
        ],
      },
    ],
  },
  relationInfo: {
    placeRelationList: [
      {
        target_id: 'inverter',
        target_name: '인버터',
        description: '인버터를 설치한 공간',
        defList: [
          {
            target_id: 'inverter',
            target_prefix: 'P_INV',
            placeList: [
              {
                target_code: '001',
                target_name: '1(I)',
                chart_color: '#c92a2a',
                chart_sort_rank: 1,
                repeatId: 'RE_PREFIX_INV',
              },
            ],
          },
        ],
      },
      // 수중 태양광 장소
      {
        target_id: 'upsBlock',
        target_name: '수중태양광',
        defList: [
          {
            target_id: 'upsBlock',
            target_prefix: 'AREA_UPSB',
            placeList: [
              {
                nodeList: ['WD', 'P'],
                svgPositionInfo: {
                  resourceId: 'ups_area',
                  point: convertPlacePosition(0.25, 0.1),
                },
              },
            ],
          },
        ],
      },
      // 인버터 테이블 장소
      {
        target_id: 'invArea',
        target_name: '발전 정보',
        defList: [
          {
            target_id: 'invArea',
            target_prefix: 'AREA_INV',
            placeList: [
              {
                // nodeList: [],
                nodeList: [
                  'INV_G_RS_V_001',
                  'INV_G_R_A_001',
                  'INV_PW_G_KW_001',
                  'INV_PW_C_KWH_001',
                ],
                svgPositionInfo: {
                  resourceId: 'tblSensorCase4',
                  point: convertPlacePosition(0.3, 0.3),
                },
              },
            ],
          },
        ],
      },
    ],
  },
  controlInfo: {
    singleCmdList: [
      {
        applyDeviceList: ['pump'],
        singleMidCateCmdInfo: {
          scenarioMsg: '펌프 동작을 선택하세요.',
          subCmdList: [
            {
              enName: 'Off',
              krName: '정지',
              controlValue: reqDCT.FALSE,
            },
            {
              enName: 'On',
              krName: '동작',
              controlValue: reqDCT.TRUE,
            },
          ],
        },
      },
      {
        applyDeviceList: ['waterDoor'],
        singleMidCateCmdInfo: {
          scenarioMsg: '동작을 선택하세요.',
          subCmdList: [
            {
              enName: 'Close',
              krName: '폐쇄',
              controlValue: reqDCT.FALSE,
            },
            {
              enName: 'Open',
              krName: '개방',
              controlValue: reqDCT.TRUE,
            },
          ],
        },
      },
    ],
  },
};

module.exports = map;
