const {
  di: {
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
    START_X: 70,
    START_Y: 70,
    WIDTH: 300,
    HEIGHT: 500,
    BIG_HEIGHT: 180,
  },
  // 장치 영역 (Device Area)
  DA: {
    WIDTH: 300,
    HEIGHT: 500,
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
        height: 1100,
        backgroundInfo: {
          backgroundPosition: [0, 0],
        },
      },
      svgModelResourceList: [
        {
          id: 'waterWay',
          type: 'line',
          elementDrawInfo: { width: 25, color: 'red', opacity: 1 },
          textStyleInfo: { color: '' },
        },
        /* *************       Place        ***************** */
        {
          id: 'sensorArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SA.WIDTH,
            height: ms.SA.HEIGHT,
            color: '#dbe4ff',
            opacity: 1,
          },
          textStyleInfo: { color: '', fontSize: 40, axisScale: [0.5, -0.07] },
        },
        {
          id: 'deviceArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.DA.WIDTH,
            height: ms.DA.HEIGHT,
            color: '#dbe4ff',
            opacity: 1,
          },
          textStyleInfo: { color: '', fontSize: 40, axisScale: [0.5, -0.07] },
        },
        /* *************       Device        ***************** */
        {
          id: 'valve',
          type: 'rect',
          elementDrawInfo: {
            width: ms.DA.WIDTH * 0.8,
            height: ms.DA.HEIGHT * 0.15,
            color: ['#a3a3a3', '#22fb00'],
            opacity: 1,
            strokeInfo: {
              width: 0.7,
              color: '#000',
            },
          },
          textStyleInfo: { fontSize: 28 },
        },
        {
          id: 'compressor',
          type: 'rect',
          elementDrawInfo: {
            width: ms.DA.WIDTH * 0.8,
            height: ms.DA.HEIGHT * 0.15,
            color: ['#e3fafc', '#3bc9db'],
            opacity: 1,
            strokeInfo: {
              width: 0.7,
              color: '#000',
            },
          },
          textStyleInfo: { fontSize: 28 },
        },
        /* *************       Sensor        ***************** */
        {
          id: 'pressure',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SA.WIDTH * 0.8,
            height: ms.SA.HEIGHT * 0.15,
            color: '#f0f0f0',
            opacity: 1,
            strokeInfo: {
              width: 0.7,
              color: '#000',
            },
          },
          textStyleInfo: { fontSize: 28 },
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
          type: 'python-shell',
          subType: '',
          host: 'path',
          port: '',
        },
      },
    ],
    dpcConstructorList: [
      {
        dpcId: 'DPC_001',
        protocol_info: {
          mainCategory: 'NiDaqmx',
          subCategory: 'ai_voltage_sw_timed',
          cmdExecTimeoutMs: 1000 * 2,
        },
      },
      {
        dpcId: 'DPC_002',
        protocol_info: {
          mainCategory: 'NiDaqmx',
          subCategory: 'do_sw_timed',
          cmdExecTimeoutMs: 1000 * 2,
        },
      },
    ],
    dataLoggerStructureList: [
      {
        target_prefix: 'D_NiDaqmx',
        target_name: 'NI-DAQmx',
        dataLoggerDeviceList: [
          {
            serial_number: 1,
            target_code: '001',
            target_name: 'NI-DAQmx 9185',
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            nodeList: [''],
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
        operationStatusList: [
          ['CLOSE', 'CLOSING'],
          ['OPEN', 'OPENING'],
        ],
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
        operationStatusList: [['CLOSE', 'CLOSING'], ['OPEN', 'OPENING'], ['FOLD'], ['UNFOLD']],
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
        description: '절대 압력',
        data_unit: 'bar',
        operationStatusList: [['CLOSE', 'CLOSING'], ['OPEN', 'OPENING'], ['FOLD'], ['UNFOLD']],
        defList: [
          {
            target_id: 'tank_pressure',
            target_prefix: 'BAR',
            nodeList: [
              {
                target_code: 'A',
                target_name: '탱크 압력 A',
                data_logger_index: 0,
                svgNodePosOpt: {
                  resourceId: 'pressure',
                  axisScale: [0.5, 0.1],
                },
              },
              {
                target_code: 'B',
                target_name: '탱크 압력 B',
                data_logger_index: 1,
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
            target_name: '계측 영역',
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
            target_name: '제어 영역',
            target_prefix: 'DA',
            placeList: [
              {
                nodeList: ['V_1', 'V_2', 'V_3', 'CP'],
                svgPositionInfo: {
                  resourceId: 'deviceArea',
                  point: [ms.SA.START_X + ms.SA.WIDTH + 70, ms.SA.START_Y],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  controlInfo: {
    setCmdList: [
      {
        cmdId: 'closeAllDevice',
        cmdName: '모든 장치 정지',
        falseNodeList: ['V_1', 'V_2', 'V_3', 'CP'],
      },
      {
        cmdId: 'closeValve',
        cmdName: '모든 밸브 폐쇄',
        falseNodeList: ['V_1', 'V_2', 'V_3'],
      },
      {
        cmdId: 'systemOn',
        cmdName: '시스템 On',
        trueNodeList: ['V_1'],
        falseNodeList: ['V_2', 'V_3', 'CP'],
      },
    ],
    scenarioCmdList: [
      {
        scenarioId: 'systemOn',
        scenarioName: '시스템 가동',
        scenarioList: [
          {
            wrapCmdFormat: reqWrapCmdFormat.SINGLE,
            singleControlType: 0,
            singleNodeId: ['V_2', 'V_3', 'CP'],
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
                  nodeId: 'BAR_B',
                  goalValue: 4,
                  goalRange: goalDataRange.UPPER,
                },
              ],
            },
          },
        ],
      },
      {
        scenarioId: 'airSystem',
        scenarioName: '에어 시스템',
        scenarioCount: 2,
        scenarioList: [
          {
            wrapCmdFormat: reqWrapCmdFormat.SET,
            setCmdId: 'closeValve',
          },
          {
            wrapCmdFormat: reqWrapCmdFormat.SINGLE,
            singleNodeId: 'CP',
            // 컴프레샤 가동
            singleControlSetValue: 1,
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
              limitTimeSec: 60,
              goalDataList: [
                {
                  nodeId: 'BAR_B',
                  goalValue: 3,
                  goalRange: goalDataRange.LOWER,
                },
              ],
            },
          },
        ],
      },
    ],
  },
  configInfo: {
    deviceCmdList: [
      {
        deviceCmdName: '밸브 제어',
        applyDeviceList: ['valve'],
        dCmdScenarioInfo: {
          scenarioMsg: '제어 동작을 선택하세요.',
          confirmList: [
            {
              enName: 'Close',
              krName: '닫음',
              controlValue: 0,
            },
            {
              enName: 'Open',
              krName: '열음',
              controlValue: 1,
            },
          ],
        },
      },
      {
        deviceCmdName: '공기 압축기 제어',
        applyDeviceList: ['compressor'],
        dCmdScenarioInfo: {
          scenarioMsg: '제어 동작을 선택하세요.',
          confirmList: [
            {
              enName: 'Off',
              krName: '정지',
              controlValue: 0,
            },
            {
              enName: 'On',
              krName: '동작',
              controlValue: 1,
            },
          ],
        },
      },
    ],
  },
};

module.exports = map;
