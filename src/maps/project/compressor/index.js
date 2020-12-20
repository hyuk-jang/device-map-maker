const {
  di: {
    dmmModel: { mmSvgBtnClass },
    dcmConfigModel: {
      nodeDataType: { BLOCK, TROUBLE, NONE },
      goalDataRange,
      reqWrapCmdFormat,
      textAnchorType,
    },
  },
} = require('../../../module');

// Map Size 정보
const ms = {
  // 센서 영역 (Sensor Area)
  SA: {
    START_X: 60,
    START_Y: 50,
    WIDTH: 200,
    HEIGHT: 440,
    WIDTH_INTERVAL: 50,
    BIG_HEIGHT: 180,
  },
  // 장치 영역 (Device Area)
  DA: {
    WIDTH: 200,
    HEIGHT: 440,
    INTERVAL: 30,
  },
};

/**
 * @type {mDeviceMap}
 */
const map = {
  drawInfo: {
    frame: {
      mapInfo: {
        width: 800,
        height: 510,
        backgroundInfo: {
          backgroundPosition: [0, 0],
        },
      },
      svgModelResourceList: [
        /* *************       Place        ***************** */
        {
          id: 'sensorArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SA.WIDTH,
            height: ms.SA.HEIGHT,
            color: 'url(#bg-gray-1)',
            filterInfo: {
              filter: 'url(#dropShadow)',
            },
          },
          textStyleInfo: { color: 'orange', fontSize: 25, axisScale: [0.5, -0.05] },
        },
        {
          id: 'deviceArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.DA.WIDTH,
            height: ms.DA.HEIGHT,
            color: 'url(#bg-sky-1)',
            filterInfo: {
              filter: 'url(#dropShadow)',
            },
          },
          textStyleInfo: { color: 'orange', fontSize: 25, axisScale: [0.5, -0.05] },
        },
        {
          id: 'commandArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.DA.WIDTH,
            height: ms.DA.HEIGHT,
            color: 'url(#bg-sky-2)',
            filterInfo: {
              filter: 'url(#dropShadow)',
            },
          },
          textStyleInfo: { color: 'orange', fontSize: 25, axisScale: [0.5, -0.05] },
        },
        /* *************       Device        ***************** */
        {
          id: 'valve',
          type: 'rect',
          elementDrawInfo: {
            width: ms.DA.WIDTH * 0.8,
            height: ms.DA.HEIGHT * 0.15,
            svgClass: [mmSvgBtnClass.lightGray, mmSvgBtnClass.green],
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: { fontSize: 20 },
        },
        {
          id: 'compressor',
          type: 'rect',
          elementDrawInfo: {
            width: ms.DA.WIDTH * 0.8,
            height: ms.DA.HEIGHT * 0.15,
            svgClass: [mmSvgBtnClass.lightGray, mmSvgBtnClass.blue],
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: { fontSize: 20 },
        },
        /* *************       Command        ***************** */
        {
          id: 'cmdBtn',
          type: 'rect',
          elementDrawInfo: {
            width: ms.DA.WIDTH * 0.8,
            height: ms.DA.HEIGHT * 0.15,
            svgClass: [mmSvgBtnClass.lightGray, mmSvgBtnClass.orange],
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: { fontSize: 20 },
        },
        /* *************       Sensor        ***************** */
        {
          id: 'pressure',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SA.WIDTH * 0.8,
            height: ms.SA.HEIGHT * 0.15,
            svgClass: [mmSvgBtnClass.white],
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: { fontSize: 20 },
        },
      ],
    },
    positionInfo: {
      svgPlaceList: [],
      svgNodeList: [],
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
            parser: 'delimiterParser',
            option: Buffer.from('04', 'hex'),
          },
          host: 'localhost',
          port: 9999,
        },
      },
    ],
    dpcConstructorList: [
      {
        dpcId: 'DPC_001',
        protocol_info: {
          mainCategory: 'NI',
          subCategory: 'cDaq',
          cmdExecTimeoutMs: 1000 * 5,
          protocolOptionInfo: {
            hasTrackingData: true,
          },
          option: {
            ni: {
              slotModelType: '9201',
            },
          },
        },
      },
      {
        dpcId: 'DPC_002',
        protocol_info: {
          mainCategory: 'NI',
          subCategory: 'cDaq',
          cmdExecTimeoutMs: 1000 * 5,
          protocolOptionInfo: {
            hasTrackingData: true,
          },
          option: {
            ni: {
              slotModelType: '9482',
            },
          },
        },
      },
    ],
    dataLoggerStructureList: [
      {
        target_prefix: 'D_NI',
        target_name: 'NI-DAQmx',
        dataLoggerDeviceList: [
          {
            // Slot Serial
            serial_number: '01EED6EF',
            // cDaq Serial
            subDeviceId: '01EE8DE7',
            target_code: '001',
            target_name: 'NI 9201',
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            nodeList: ['BAR_A', 'BAR_B'],
          },
          {
            // Slot Serial
            serial_number: '01EE1809',
            // cDaq Serial
            subDeviceId: '01EE8DE7',
            target_code: '002',
            target_name: 'NI 9482 컴프레셔',
            dccId: 'DCC_001',
            dpcId: 'DPC_002',
            nodeList: ['CP'],
          },
          {
            // Slot Serial
            serial_number: '01EE1869',
            // cDaq Serial
            subDeviceId: '01EE8DE7',
            target_code: '003',
            target_name: 'NI 9482 밸브',
            dccId: 'DCC_001',
            dpcId: 'DPC_002',
            nodeList: ['V_1', 'V_2', 'V_3'],
          },
        ],
      },
    ],
    nodeStructureList: [
      /* *********             Device             ********* */
      {
        target_id: 'valve',
        target_name: '밸브',
        is_sensor: 0,
        is_submit_api: 1,
        description: '개방 밸브',
        defList: [
          {
            target_id: 'valve',
            target_prefix: 'V',
            target_name: '밸브',
            nodeList: [
              {
                target_code: '1',
                target_name: '해수 공급 밸브',
                data_logger_index: 0,
                data_index: 0,
                svgNodePosOpt: {
                  resourceId: 'valve',
                  axisScale: [0.5, 0.1],
                  moveScale: [0, 0],
                },
              },
              {
                target_code: '2',
                target_name: '상시 개방 밸브 A',
                data_logger_index: 1,
                data_index: 1,
                svgNodePosOpt: {
                  resourceId: 'valve',
                  axisScale: [0.5, 0.37],
                  moveScale: [0, 0],
                },
              },
              {
                target_code: '3',
                target_name: '상시 개방 밸브 B',
                data_logger_index: 2,
                data_index: 2,
                svgNodePosOpt: {
                  resourceId: 'valve',
                  axisScale: [0.5, 0.63],
                  moveScale: [0, 0],
                },
              },
            ],
          },
        ],
      },
      {
        target_id: 'compressor',
        target_name: '컴프레셔',
        is_sensor: 0,
        defList: [
          {
            target_id: 'compressor',
            target_prefix: 'CP',
            target_name: '컴프레셔',
            nodeList: [
              {
                // target_code: '001',
                target_name: '공기 압축기',
                data_logger_index: 0,
                data_index: 0,
                svgNodePosOpt: {
                  resourceId: 'compressor',
                  axisScale: [0.5, 0.9],
                  moveScale: [0, 0],
                },
              },
            ],
          },
        ],
      },
      /* *********             Sensor             ********* */
      {
        target_id: 'pressure',
        target_name: '압력 센서',
        is_sensor: 1,
        description: '압력',
        data_unit: 'bar',
        defList: [
          {
            target_id: 'absPressure',
            target_prefix: 'BAR',
            target_name: '절대 압력',
            nodeList: [
              {
                target_code: 'A',
                target_name: '탱크 압력 A',
                data_logger_index: 0,
                data_index: 0,
                node_type: 'PXM309',
                svgNodePosOpt: {
                  resourceId: 'pressure',
                  axisScale: [0.5, 0.1],
                },
              },
              {
                target_code: 'B',
                target_name: '탱크 압력 B',
                data_logger_index: 1,
                data_index: 1,
                node_type: 'PXM309',
                svgNodePosOpt: {
                  resourceId: 'pressure',
                  axisScale: [0.5, 0.37],
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
        target_id: 'Area',
        target_name: '장치 영역',
        defList: [
          {
            target_id: 'sensorArea',
            target_name: '센서',
            target_prefix: 'SA',
            placeList: [
              {
                nodeList: ['BAR_A', 'BAR_B'],
                svgPositionInfo: {
                  resourceId: 'sensorArea',
                  point: [ms.SA.START_X, ms.SA.START_Y],
                },
              },
            ],
          },
          {
            target_id: 'deviceArea',
            target_name: '단일 제어',
            target_prefix: 'DA',
            placeList: [
              {
                nodeList: ['V_1', 'V_2', 'V_3', 'CP'],
                svgPositionInfo: {
                  resourceId: 'deviceArea',
                  point: [
                    ms.SA.START_X + ms.SA.WIDTH + ms.SA.WIDTH_INTERVAL,
                    ms.SA.START_Y,
                  ],
                },
              },
            ],
          },
          {
            target_id: 'commandArea',
            target_name: '명령 제어',
            target_prefix: 'CA',
            placeList: [
              {
                svgPositionInfo: {
                  resourceId: 'commandArea',
                  point: [
                    ms.SA.START_X + (ms.SA.WIDTH + ms.SA.WIDTH_INTERVAL) * 2,
                    ms.SA.START_Y,
                  ],
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
        singleCmdName: '밸브 제어',
        applyDeviceList: ['valve'],
        singleMidCateCmdInfo: {
          scenarioMsg: '제어 동작을 선택하세요.',
          subCmdList: [
            {
              enName: 'Open',
              krName: '열림',
              controlValue: 1,
            },
            {
              enName: 'Close',
              krName: '닫힘',
              controlValue: 0,
            },
          ],
        },
      },
      {
        singleCmdName: '공기 압축기 제어',
        applyDeviceList: ['compressor'],
        singleMidCateCmdInfo: {
          scenarioMsg: '제어 동작을 선택하세요.',
          subCmdList: [
            {
              enName: 'On',
              krName: '동작',
              controlValue: 1,
            },
            {
              enName: 'Off',
              krName: '정지',
              controlValue: 0,
            },
          ],
        },
      },
    ],
    setCmdList: [],
    scenarioCmdList: [
      {
        cmdId: 'systemOn',
        cmdName: '시스템 가동',
        svgNodePosOpt: {
          placeId: 'CA',
          resourceId: 'cmdBtn',
          axisScale: [0.5, 0.1],
        },
        scenarioList: [
          {
            wrapCmdFormat: reqWrapCmdFormat.SINGLE,
            singleControlType: 0,
            singleNodeId: 'V_2',
          },
          {
            wrapCmdFormat: reqWrapCmdFormat.SINGLE,
            singleControlType: 0,
            singleNodeId: ['V_3', 'CP'],
          },
          {
            wrapCmdFormat: reqWrapCmdFormat.SINGLE,
            singleControlType: 0,
            singleNodeId: 'CP',
          },
          {
            wrapCmdFormat: reqWrapCmdFormat.SINGLE,
            singleControlType: 1,
            singleNodeId: 'V_1',
            wrapCmdGoalInfo: {
              limitTimeSec: 60,
              // FIXME: 압력센서 1번과 2번의 압력차가 3Bar 이슈 처리 필요
              goalDataList: [
                {
                  // nodeId: 'BAR_B',
                  goalValue: 3,
                  goalRange: goalDataRange.UPPER,
                  expressInfo: {
                    nodeList: ['BAR_A', 'BAR_B'],
                    expression: 'BAR_B - BAR_A',
                  },
                },
              ],
            },
          },
        ],
      },
      {
        cmdId: 'airSystem',
        cmdName: '에어 시스템',
        scenarioCount: 2,
        svgNodePosOpt: {
          placeId: 'CA',
          resourceId: 'cmdBtn',
          axisScale: [0.5, 0.37],
        },
        scenarioList: [
          {
            wrapCmdFormat: reqWrapCmdFormat.SINGLE,
            singleControlType: 0,
            singleNodeId: 'V_1',
          },
          {
            wrapCmdFormat: reqWrapCmdFormat.SINGLE,
            singleControlType: 0,
            singleNodeId: 'V_2',
          },
          {
            wrapCmdFormat: reqWrapCmdFormat.SINGLE,
            singleControlType: 0,
            singleNodeId: 'V_3',
          },
          {
            wrapCmdFormat: reqWrapCmdFormat.SINGLE,
            singleNodeId: 'CP',
            // 컴프레샤 가동
            singleControlType: 1,
            wrapCmdGoalInfo: {
              // 제한 시간
              limitTimeSec: 60,
              goalDataList: [
                // 압력 센서 2번째 값이 7Bar 이상이 될때까지
                {
                  nodeId: 'BAR_B',
                  goalValue: 7,
                  goalRange: goalDataRange.UPPER,
                },
              ],
            },
          },
          {
            wrapCmdFormat: reqWrapCmdFormat.SINGLE,
            singleNodeId: 'V_3',
            singleControlType: 1,
            wrapCmdGoalInfo: {
              limitTimeSec: 3,
              goalDataList: [
                {
                  nodeId: 'BAR_B',
                  goalValue: 3,
                  goalRange: goalDataRange.LOWER,
                },
              ],
            },
          },
          // 타이밍 10초를 기달리기 위하여 임시로 줌
          {
            wrapCmdFormat: reqWrapCmdFormat.SINGLE,
            singleNodeId: 'V_3',
            singleControlType: 0,
            wrapCmdGoalInfo: {
              limitTimeSec: 10,
            },
          },
        ],
      },
    ],
  },
};

module.exports = map;
