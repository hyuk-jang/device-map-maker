/**
 * @type {mDeviceMap}
 */
const map = {
  drawInfo: {
    frame: {
      mapSize: {
        width: 2000,
        height: 2000,
      },
      svgModelResourceList: [
        {
          id: 'timeArea',
          type: 'rect',
          elementDrawInfo: {
            width: 350,
            height: 50,
            color: '#667e99',
          },
        },
        {
          id: 'time',
          type: 'rect',
          elementDrawInfo: {
            width: 100,
            radius: 5,
            height: 40,
            opacity: 0,
            color: '#dfdfdf',
          },
        },
        {
          id: 'accDataPlace',
          type: 'rect',
          elementDrawInfo: {
            width: 480,
            height: 60,
            color: '#d9534f',
          },
        },
        {
          id: 'sensorPlace',
          type: 'rect',
          elementDrawInfo: {
            width: 370,
            height: 60,
            color: '#5cb85c',
          },
        },
        {
          id: 'sensor_A',
          type: 'rect',
          elementDrawInfo: {
            width: 100,
            height: 40,
            radius: 5,
            opacity: 1,
            color: '#dfdfdf',
          },
        },
        {
          id: 'sensor_B',
          type: 'rect',
          elementDrawInfo: {
            width: 200,
            height: 43,
            radius: 5,
            opacity: 1,
            color: '#dfdfdf',
          },
        },
      ],
    },
    positionInfo: {
      svgPlaceList: [
        {
          placeId: 'dataPlace',
          defList: [
            {
              id: 'CGT_P_1',
              name: '집광기 입구온도',
              resourceId: 'sensorPlace',
              point: [200, 1280],
            },
            {
              id: 'COT_P_1',
              name: '집광기 출구온도',
              resourceId: 'sensorPlace',
              point: [850, 570],
            },
            {
              id: 'HMST_P_1',
              name: '열매체 공급온도',
              resourceId: 'sensorPlace',
              point: [1150, 700],
            },
            {
              id: 'SAP_P_1',
              name: '태양열 누적 생산',
              resourceId: 'accDataPlace',
              point: [1500, 465],
            },
            {
              id: 'TAPP_P_1',
              name: '터빈 누적 생산전력',
              resourceId: 'accDataPlace',
              point: [1500, 525],
            },
            {
              id: 'STP_P_1',
              name: '스팀터빈 발전량',
              resourceId: 'sensorPlace',
              point: [1450, 800],
            },
            {
              id: 'CT_P_1',
              name: '현재 시간',
              resourceId: 'timeArea',
              point: [900, 455],
            },
            {
              id: 'UT_P_1',
              name: '갱신 시간',
              resourceId: 'timeArea',
              point: [900, 500],
            },
          ],
        },
      ],
      svgNodeList: [],
    },
  },
  setInfo: {
    mainInfo: { main_seq: 1, uuid: 'aaaaa' },
    dccConstructorList: [],
    dpcConstructorList: [],
    dataLoggerStructureList: [],
    nodeStructureList: [
      {
        target_id: 'time',
        target_name: '시분초',
        is_sensor: 1,
        data_unit: '',
        description: '시간',
        defList: [
          {
            target_id: 'currentTime',
            target_prefix: 'CT',
            target_name: '현재 시간',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axisScale: [1, 0],
                moveScale: [0, 0],
              },
            ],
          },
          {
            target_id: 'updateTime',
            target_prefix: 'UT',
            target_name: '갱신 시간',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axisScale: [1, 0],
                moveScale: [0, 0],
              },
            ],
          },
        ],
      },
      {
        target_id: 'power',
        target_name: '전력',
        is_sensor: 1,
        data_unit: 'kW',
        description: '키로와트',
        defList: [
          {
            target_id: 'solarAccProduction',
            target_prefix: 'SAP',
            target_name: '태양열 누적 생산',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axisScale: [0.6, 0],
                moveScale: [0, 0],
              },
            ],
          },
          {
            target_id: 'steamTurbinePower',
            target_prefix: 'STP',
            target_name: '스팀 터빈 발전량',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axisScale: [1.2, 0],
                moveScale: [0, 0],
              },
            ],
          },
        ],
      },
      {
        target_id: 'calorie',
        target_name: '열량',
        is_sensor: 1,
        data_unit: 'Mkcal',
        description: '메가키로칼로리',
        defList: [
          {
            target_id: 'turbinAccProductionPower',
            target_prefix: 'TAPP',
            target_name: '터빈 누적 생산 전력',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axisScale: [0.6, 0],
                moveScale: [0, 0],
              },
            ],
          },
        ],
      },
      {
        target_id: 'temp',
        target_name: '온도',
        is_sensor: 1,
        data_unit: '℃',
        description: '섭씨',
        defList: [
          {
            target_id: 'condensingGateTemperature',
            target_prefix: 'CGT',
            target_name: '집광기 입구온도',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axisScale: [1.2, 0],
                moveScale: [0, 0],
              },
            ],
          },
          {
            target_id: 'condensingOutletTemperature',
            target_prefix: 'COT',
            target_name: '집광기 출구온도',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axisScale: [1.2, 0],
                moveScale: [0, 0],
              },
            ],
          },
          {
            target_id: 'heatMediumSupplyTemperature',
            target_prefix: 'HMST',
            target_name: '열매체 공급온도',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axisScale: [1.2, 0],
                moveScale: [0, 0],
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
        target_id: 'dataPlace',
        target_name: '데이터장소',
        description: null,
        defList: [
          {
            target_id: 'condensingGateTempPlace',
            target_prefix: 'CGT_P',
            target_name: '집광기 입구온도',
            placeList: [
              {
                target_code: '1',
                nodeList: ['CGT_001'],
              },
            ],
          },
          {
            target_id: 'condensingOutletTempPlace',
            target_prefix: 'COT_P',
            target_name: '집광기 출구온도',
            placeList: [
              {
                target_code: '1',
                nodeList: ['COT_001'],
              },
            ],
          },
          {
            target_id: 'heatMediumSupplyTempPlace',
            target_prefix: 'HMST_P',
            target_name: '열매체 공급온도',
            placeList: [
              {
                target_code: '1',
                nodeList: ['HMST_001'],
              },
            ],
          },
          {
            target_id: 'solarAccProductionPlace',
            target_prefix: 'SAP_P',
            target_name: '태양열 누적 생산',
            placeList: [
              {
                target_code: '1',
                nodeList: ['SAP_001'],
              },
            ],
          },
          {
            target_id: 'turbinAccProductionPowerPlace',
            target_prefix: 'TAPP_P',
            target_name: '터빈 누적 생산 전력',
            placeList: [
              {
                target_code: '1',
                nodeList: ['TAPP_001'],
              },
            ],
          },
          {
            target_id: 'steamTurbinePowerPlace',
            target_prefix: 'STP_P',
            target_name: '스팀 터빈 발전량',
            placeList: [
              {
                target_code: '1',
                nodeList: ['STP_001'],
              },
            ],
          },
          {
            target_id: 'currentTimePlace',
            target_prefix: 'CT_P_1',
            target_name: '현재 시간',
            placeList: [
              {
                target_id: '1',
                nodeList: ['CT_001'],
              },
            ],
          },
          {
            target_id: 'updateTimePlace',
            target_prefix: 'UT_P_1',
            target_name: '갱신 시간',
            placeList: [
              {
                target_id: '1',
                nodeList: ['UT_001'],
              },
            ],
          },
        ],
      },
    ],
    svgResourceConnectionList: [
      {
        targetIdList: ['CGT_P_1', 'COT_P_1', 'HMST_P_1', 'STP_P_1'],
        resourceIdList: ['sensorPlace'],
      },
      {
        targetIdList: ['SAP_P_1', 'TAPP_P_1'],
        resourceIdList: ['accDataPlace'],
      },
      {
        targetIdList: ['CGT_001', 'COT_001', 'HMST_001', 'STP_001'],
        resourceIdList: ['sensor_A'],
      },
      {
        targetIdList: ['SAP_001', 'TAPP_001'],
        resourceIdList: ['sensor_B'],
      },
      {
        targetIdList: ['CT_001', 'UT_001'],
        resourceIdList: ['time'],
      },
      {
        targetIdList: ['UT_P_1', 'CT_P_1'],
        resourceIdList: ['timeArea'],
      },
    ],
    nameExclusionList: [
      'CGT_001',
      'COT_001',
      'HMST_001',
      'STP_001',
      'SAP_001',
      'TAPP_001',
      'CT_001',
      'UT_001',
    ],
  },
  controlInfo: {},
};
module.exports = map;
