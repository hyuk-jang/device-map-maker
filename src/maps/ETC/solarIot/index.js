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

// Map Size 정보
const ms = {
  // 센서 (SenSor)
  DA: {
    START_X: 100,
    START_Y: 50,
    WIDTH: 800,
    HEIGHT: 100,
    BIG_WIDTH: 200,
    INTERVAL: 20,
  },
  SS: {
    WIDTH: 100,
    BIG_WIDTH: 200,
    INTERVAL: 20,
  },
  SIDE: {
    WIDTH: 130,
    PUMP_HEIGHT: 180,
    CMD_HEIGHT: 600,
    CMD_START_AXIS: 0.08,
    CMD_INTREVAL_RATE: 0.125,
  },
};

/**
 * @type {mDeviceMap}
 */
const map = {
  drawInfo: {
    frame: {
      mapInfo: {
        height: 200,
        width: 1000,
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
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
        },
        /* *************       Device        ***************** */
        {
          id: 'cmdBtn',
          type: 'rect',
          elementDrawInfo: {
            width: ms.DA.WIDTH * 0.18,
            height: ms.DA.HEIGHT * 0.8,
            svgClass: [mmSvgBtnClass.lightGray, mmSvgBtnClass.orange, mmSvgBtnClass.red],
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: { fontSize: 15 },
        },
        {
          id: 'sensor',
          type: 'rect',
          elementDrawInfo: {
            width: ms.DA.WIDTH * 0.18,
            height: ms.DA.HEIGHT * 0.8,
            color: '#f0f0f0',
            strokeInfo: {
              width: 0.7,
              color: '#000',
            },
          },
          textStyleInfo: {
            color: '',
            dataColor: '',
            fontSize: 15,
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
          host: '192.168.0.153',
          port: 15300,
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
          host: '192.168.0.153',
          port: 15301,
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
          host: '192.168.0.153',
          port: 15302,
          // port: 'COM3',
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
            dccId: 'DCC_003',
            dpcId: 'DPC_002',
            target_code: '003',
            nodeList: ['B_P'],
          },
        ],
      },
    ],
    nodeStructureList: [
      {
        target_id: 'battery',
        target_name: '배터리',
        data_unit: '%',
        is_sensor: 1,
        defList: [
          {
            target_id: 'percentBattery',
            target_name: '배터리 용량',
            target_prefix: 'B_P',
            nodeList: [
              {
                target_code: '',
                svgNodePosOpt: {
                  resourceId: 'sensor',
                  axisScale: [0.1, 0.5],
                  moveScale: [0, 0],
                },
              },
            ],
          },
        ],
      },
      {
        target_id: 'relay',
        target_name: '릴레이',
        is_sensor: 0,
        defList: [
          {
            target_id: 'relay',
            target_name: '릴레이',
            target_prefix: 'R',
            nodeList: [
              {
                target_code: '1',
                target_name: 'Lv.1',
                data_logger_index: 0,
                data_index: 1,
                svgNodePosOpt: {
                  resourceId: 'cmdBtn',
                  axisScale: [0.366, 0.5],
                },
              },
              {
                target_code: '2',
                target_name: 'Lv.2',
                data_logger_index: 1,
                data_index: 2,
                svgNodePosOpt: {
                  resourceId: 'cmdBtn',
                  axisScale: [0.63, 0.5],
                },
              },
              {
                target_code: '4',
                target_name: 'Lv.4',
                data_logger_index: 1,
                data_index: 2,
                svgNodePosOpt: {
                  resourceId: 'cmdBtn',
                  axisScale: [0.9, 0.5],
                },
              },
              {
                target_code: '3',
                target_name: 'Lv.3',
                data_logger_index: 0,
                data_index: 1,
                svgNodePosOpt: {
                  resourceId: 'cmdBtn',
                  axisScale: [0.9, 0.5],
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
        target_id: 'deviceArea',
        target_name: '장치 영역',
        defList: [
          {
            target_id: 'deviceArea',
            target_prefix: 'DA',
            placeList: [
              {
                nodeList: ['R_1', 'R_2', 'R_3', 'R_4', 'B_P'],
                svgPositionInfo: {
                  resourceId: 'deviceArea',
                  point: [ms.DA.START_X, ms.DA.START_Y],
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
        applyDeviceList: ['relay'],
        singleCmdName: '릴레이',
        singleMidCateCmdInfo: {
          scenarioMsg: '제어 동작을 선택하세요.',
          subCmdList: [
            {
              enName: 'On',
              krName: '동작',
              controlValue: reqDCT.TRUE,
            },
            {
              enName: 'Off',
              krName: '정지',
              controlValue: reqDCT.FALSE,
            },
          ],
        },
      },
    ],
  },
};

module.exports = map;
