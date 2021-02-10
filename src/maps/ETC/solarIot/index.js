const _ = require('lodash');

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
    PADDING: 0.03,
  },
};

const deviceAxisXs = Array(5)
  .fill(0)
  .map((value, index, arr) => {
    const {
      DA: { PADDING },
    } = ms;
    const remainWidth = 1 - PADDING * 2;
    const widthIntervalAxisX = remainWidth / (arr.length - 1);

    return _.chain(widthIntervalAxisX)
      .multiply(index)
      .thru(v => v + PADDING)
      .round(3)
      .value();
  });

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
            opacity: 1,
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
            width: ms.DA.WIDTH * 0.17,
            height: ms.DA.HEIGHT * 0.8,
            svgClass: [mmSvgBtnClass.lightGray, mmSvgBtnClass.orange, mmSvgBtnClass.blue],
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
            width: ms.DA.WIDTH * 0.17,
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
      uuid: 'sector_003',
    },
    dccConstructorList: [
      {
        dccId: 'DCC_001',
        connect_info: {
          type: 'socket',
          subType: 'parser',
          addConfigInfo: {
            // parser: CPT.socket.BYTE_LENGTH,
            // option: 8,
            parser: CPT.socket.READ_LINE,
            option: Buffer.from(',OK\u0000'),
          },
          hasOnDataClose: true,
          host: '192.168.0.158',
          port: 15800,
        },
      },
      {
        dccId: 'DCC_003',
        connect_info: {
          type: 'socket',
          subType: 'parser',
          addConfigInfo: {
            parser: CPT.socket.READ_LINE,
            option: Buffer.from(',OK\u0000'),
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
          subCategory: 'Kincony',
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
        target_prefix: 'D_KIN',
        target_name: '릴레이 로거(Kincony)',
        dataLoggerDeviceList: [
          {
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            target_code: '001',
            target_name: 'Lv.1 ~ Lv.4',
            nodeList: ['R_1', 'R_2', 'R_3', 'R_4'],
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
                svgNodePosOpt: {
                  resourceId: 'sensor',
                  axisScale: [deviceAxisXs[0], 0.5],
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
        svgViewInfo: {
          thresholdList: [['OFF'], ['ON']],
        },
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
                  axisScale: [deviceAxisXs[1], 0.5],
                },
              },
              {
                target_code: '2',
                target_name: 'Lv.2',
                data_logger_index: 1,
                data_index: 2,
                svgNodePosOpt: {
                  resourceId: 'cmdBtn',
                  axisScale: [deviceAxisXs[2], 0.5],
                },
              },
              {
                target_code: '3',
                target_name: 'Lv.3',
                data_logger_index: 2,
                data_index: 3,
                svgNodePosOpt: {
                  resourceId: 'cmdBtn',
                  axisScale: [deviceAxisXs[3], 0.5],
                },
              },
              {
                target_code: '4',
                target_name: 'Lv.4',
                data_logger_index: 3,
                data_index: 4,
                svgNodePosOpt: {
                  resourceId: 'cmdBtn',
                  axisScale: [deviceAxisXs[4], 0.5],
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
                target_code: '001',
                nodeList: ['R_1', 'B_P'],
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'percentBattery',
                      upperLimitValue: { value: 40 },
                      lowerLimitValue: { value: 25 },
                    },
                  ],
                },
                svgPositionInfo: {
                  resourceId: 'deviceArea',
                  point: [ms.DA.START_X, ms.DA.START_Y],
                },
              },
              {
                target_code: '002',
                nodeList: ['R_2', 'B_P'],
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'percentBattery',
                      upperLimitValue: { value: 50 },
                      lowerLimitValue: { value: 40 },
                    },
                  ],
                },
                svgPositionInfo: {
                  resourceId: 'deviceArea',
                  point: [ms.DA.START_X, ms.DA.START_Y],
                },
              },
              {
                target_code: '003',
                nodeList: ['R_3', 'B_P'],
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'percentBattery',
                      upperLimitValue: { value: 60 },
                      lowerLimitValue: { value: 50 },
                    },
                  ],
                },
                svgPositionInfo: {
                  resourceId: 'deviceArea',
                  point: [ms.DA.START_X, ms.DA.START_Y],
                },
              },
              {
                target_code: '004',
                nodeList: ['R_4', 'B_P'],
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'percentBattery',
                      upperLimitValue: { value: 70 },
                      lowerLimitValue: { value: 60 },
                    },
                  ],
                },
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
        cmdName: '모든 장치 정지',
        trueNodeList: [],
        falseNodeList: ['R_1', 'R_2', 'R_3', 'R_4'],
      },
      {
        cmdId: 'onUpToLv1',
        cmdName: 'Lv.1까지 동작',
        trueNodeList: ['R_1'],
        falseNodeList: ['R_2', 'R_3', 'R_4'],
      },
      {
        cmdId: 'onUpToLv2',
        cmdName: 'Lv.2까지 동작',
        trueNodeList: ['R_1', 'R_2'],
        falseNodeList: ['R_3', 'R_4'],
      },
      {
        cmdId: 'onUpToLv3',
        cmdName: 'Lv.3까지 동작',
        trueNodeList: ['R_1', 'R_2', 'R_3'],
        falseNodeList: ['R_4'],
      },
      {
        cmdId: 'onUpToLv4',
        cmdName: 'Lv.4까지 동작',
        trueNodeList: ['R_1', 'R_2', 'R_3', 'R_4'],
        falseNodeList: [],
      },
    ],
  },
};

module.exports = map;
