const {
  di: {
    dcmConfigModel: {
      nodeDataType: { BLOCK, TROUBLE, NONE },
    },
  },
} = require('../../../module');

/**
 * @type {mDeviceMap}
 */
const map = {
  drawInfo: {
    frame: {
      mapInfo: {
        width: 1500,
        height: 1000,
        backgroundInfo: {
          backgroundData: '',
          backgroundPosition: [4, 0],
        },
      },
      svgModelResourceList: [
        {
          id: 'solarEvaporationBlock',
          type: 'rect',
          elementDrawInfo: { width: 340, height: 80, color: '#abe3e1', opacity: 0 },
          textStyleInfo: { color: 'white', fontSize: 10 },
        },
        {
          id: 'normalEvaporationBlock_A',
          type: 'rect',
          elementDrawInfo: { width: 300, height: 650, color: '#bd8f3a', opacity: 0 },
          textStyleInfo: { color: 'white', fontSize: 10 },
        },
        {
          id: 'normalEvaporationBlock_B',
          type: 'rect',
          elementDrawInfo: { width: 150, height: 650, color: '#bd8f3a', opacity: 0 },
          textStyleInfo: { color: 'white', fontSize: 10 },
        },
        {
          id: 'normalCrystalizingBlock',
          type: 'rect',
          elementDrawInfo: { width: 160, height: 200, color: '#988224', opacity: 0 },
          textStyleInfo: { color: 'white', fontSize: 10 },
        },
        {
          id: 'reservoir_A',
          type: 'rect',
          elementDrawInfo: { width: 110, height: 780, color: 'blue', opacity: 0 },
          textStyleInfo: { color: 'white', fontSize: 10 },
        },
        {
          id: 'reservoir_B',
          type: 'rect',
          elementDrawInfo: { width: 180, height: 90, color: 'blue', opacity: 0 },
          textStyleInfo: { color: 'white', fontSize: 10 },
        },
        {
          id: 'drainage',
          type: 'rect',
          elementDrawInfo: { width: 80, height: 90, color: 'skyblue', opacity: 0 },
          textStyleInfo: { color: 'white', fontSize: 10 },
        },
        {
          id: 'brineWarehouse_A',
          type: 'rect',
          elementDrawInfo: { width: 130, height: 700, color: '#90b4dd', opacity: 0 },
          textStyleInfo: { color: 'white', fontSize: 10 },
        },
        {
          id: 'brineWarehouse_B',
          type: 'rect',
          elementDrawInfo: { width: 200, height: 80, color: '#90b4dd', opacity: 0 },
          textStyleInfo: { color: 'white', fontSize: 10 },
        },
        {
          id: 'brineWarehouse_C',
          type: 'rect',
          elementDrawInfo: { width: 120, height: 80, color: '#90b4dd', opacity: 0 },
          textStyleInfo: { color: 'white', fontSize: 10 },
        },
        {
          id: 'brineWarehouse_D',
          type: 'rect',
          elementDrawInfo: { width: 100, height: 110, color: '#90b4dd', opacity: 0 },
          textStyleInfo: { color: 'white', fontSize: 10 },
        },
        {
          id: 'sea',
          type: 'rect',
          elementDrawInfo: { width: 50, height: 780, color: 'skyblue', opacity: 0 },
          textStyleInfo: { color: 'black', fontSize: 10 },
        },
        {
          id: 'container',
          type: 'rect',
          elementDrawInfo: { width: 100, height: 100, color: '#34495e', opacity: 0 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'waterWay',
          type: 'line',
          elementDrawInfo: { width: 25, color: '#b2b2b2', opacity: 0 },
          textStyleInfo: { color: 'white', fontSize: 10 },
        },
        {
          id: 'waterWay_B',
          type: 'line',
          elementDrawInfo: { width: 25, color: '#4c7a89', opacity: 0 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'peWaterWay',
          type: 'line',
          elementDrawInfo: { width: 25, color: '#108760', opacity: 0 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'pipeLine_A',
          type: 'line',
          elementDrawInfo: { width: 10, color: '#ff9a00', opacity: 0 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'pipeLine_B',
          type: 'line',
          elementDrawInfo: { width: 10, color: '#7513a1', opacity: 0 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'waterDoor',
          type: 'rect',
          elementDrawInfo: {
            width: 30,
            height: 30,
            color: ['#a3a3a3', '#b45b95', '#dc1d1f'],
            opacity: 0,
          },
          textStyleInfo: { color: '', fontSize: 5, leading: '1.8em' },
        },
        {
          id: 'gateValve',
          type: 'rect',
          elementDrawInfo: {
            width: 30,
            height: 30,
            color: ['#a3a3a3', 'yellow', '#dc1d1f'],
            opacity: 0,
          },
          textStyleInfo: { color: '', fontSize: 4, leading: '2.5em' },
        },
        {
          id: 'overPump',
          type: 'circle',
          elementDrawInfo: {
            width: 35,
            height: 35,
            radius: 35,
            color: ['#a3a3a3', '#22fb00', '#dc1d1f'],
            opacity: 0,
            leading: '10em',
          },
          textStyleInfo: { color: '', fontSize: 6 },
        },
        {
          id: 'underPump',
          type: 'circle',
          elementDrawInfo: {
            width: 27,
            height: 27,
            radius: 27,
            color: ['#a3a3a3', '#8b24b0', '#dc1d1f'],
            opacity: 0,
          },
          textStyleInfo: { color: '', fontSize: 6 },
        },
        {
          id: 'outlet',
          type: 'circle',
          elementDrawInfo: { width: 10, height: 10, radius: 10, color: 'black', opacity: 0 },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'salinity',
          type: 'rect',
          elementDrawInfo: { width: 45, height: 25, color: '#f0f0f0', opacity: 0 },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'moduleRearTemperature',
          type: 'rect',
          elementDrawInfo: { width: 45, height: 25, color: '#f0f0f0', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'waterLevel',
          type: 'rect',
          elementDrawInfo: {
            width: 45,
            height: 25,
            color: '#f0f0f0',
            opacity: 1,
          },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'systemArea',
          type: 'rect',
          elementDrawInfo: { width: 355, height: 185, color: 'pink', opacity: 0 },
          textStyleInfo: { color: 'blue', fontSize: 10 },
        },
        {
          id: 'brineTemperature',
          type: 'rect',
          elementDrawInfo: { width: 45, height: 25, color: '#f0f0f0', opacity: 0 },
          textStyleInfo: { color: '', fontSize: 8 },
        },
      ],
    },
    positionInfo: {
      svgPlaceList: [
        {
          placeId: 'salternBlock',
          defList: [
            {
              id: 'SEB_1',
              name: '증발지_1',
              resourceId: 'solarEvaporationBlock',
              point: [220, 10],
            },
            {
              id: 'SEB_2',
              name: '증발지_2',
              resourceId: 'solarEvaporationBlock',
              point: [220, 100],
            },
            {
              id: 'SEB_3',
              name: '증발지_3',
              resourceId: 'solarEvaporationBlock',
              point: [220, 215],
            },
            {
              id: 'SEB_4',
              name: '증발지_4',
              resourceId: 'solarEvaporationBlock',
              point: [220, 305],
            },
            {
              id: 'SEB_5',
              name: '증발지_5',
              resourceId: 'solarEvaporationBlock',
              point: [220, 415],
            },
            {
              id: 'SEB_6',
              name: '증발지_6',
              resourceId: 'solarEvaporationBlock',
              point: [220, 505],
            },
            {
              id: 'SEB_7',
              name: '증발지_7',
              resourceId: 'solarEvaporationBlock',
              point: [220, 620],
            },
            {
              id: 'SEB_8',
              name: '증발지_8',
              resourceId: 'solarEvaporationBlock',
              point: [220, 710],
            },
            {
              id: 'NEB_1',
              name: '일반 증발지_1',
              resourceId: 'normalEvaporationBlock_A',
              point: [910, 10],
            },
            {
              id: 'NEB_2',
              name: '일반 증발지_2',
              resourceId: 'normalEvaporationBlock_B',
              point: [750, 10],
            },
            {
              id: 'NCB',
              name: '결정지',
              resourceId: 'normalCrystalizingBlock',
              point: [10, 10],
            },
            {
              id: 'SYSTEM_1',
              name: '',
              resourceId: 'systemArea',
              point: [210, 10],
            },
            {
              id: 'SYSTEM_2',
              name: '',
              resourceId: 'systemArea',
              point: [210, 215],
            },
            {
              id: 'SYSTEM_3',
              name: '',
              resourceId: 'systemArea',
              point: [210, 415],
            },
            {
              id: 'SYSTEM_4',
              name: '',
              resourceId: 'systemArea',
              point: [210, 622],
            },
          ],
        },
        {
          placeId: 'brineWarehouse',
          defList: [
            {
              id: 'BW_1',
              name: '해주_1',
              resourceId: 'brineWarehouse_A',
              point: [590, 10],
            },
            {
              id: 'BW_2',
              name: '해주_2',
              resourceId: 'brineWarehouse_D',
              point: [70, 280],
            },
          ],
        },
        {
          placeId: 'reservoir',
          defList: [
            {
              id: 'RV',
              name: '저수지',
              resourceId: 'reservoir_A',
              point: [1240, 10],
            },
          ],
        },
        {
          placeId: 'sea',
          defList: [
            {
              id: 'SEA',
              name: '바다',
              resourceId: 'sea',
              point: [1360, 10],
            },
          ],
        },
        {
          placeId: 'controlRoom',
          defList: [
            {
              id: 'controlRoom',
              name: '통제실',
              resourceId: 'container',
              point: [10, 600],
            },
          ],
        },
        {
          placeId: 'waterWay',
          defList: [],
        },
        {
          placeId: 'pipeLine',
          defList: [],
        },
      ],
      svgNodeList: [],
    },
  },
  setInfo: {
    mainInfo: { main_seq: 2, uuid: 'bbbbb' },
    dccConstructorList: [],
    dpcConstructorList: [],
    repeatNodeList: [],
    dataLoggerStructureList: [],
    nodeStructureList: [
      // 수중 태양광 데이터
      {
        target_id: 'temp',
        target_name: '온도',
        is_sensor: 1,
        data_unit: '℃',
        description: '섭씨',
        defList: [
          {
            target_id: 'moduleRearTemperature',
            target_prefix: 'MRT',
            target_name: '모듈 뒷면 온도',
            description: null,
            nodeList: [
              { target_code: '001', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '002', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '003', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '004', axisScale: [0, 0], moveScale: [0, 0] },
            ],
          },
        ],
      },
      {
        target_id: 'salinity',
        target_name: '염도',
        is_sensor: 1,
        data_unit: '%',
        defList: [
          {
            target_id: 'salinity',
            target_prefix: 'S',
            target_name: '염도',
            description: null,
            nodeList: [
              { target_code: '001', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '002', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '003', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '004', axisScale: [0, 0], moveScale: [0, 0] },
            ],
          },
        ],
      },
      {
        target_id: 'waterLevel',
        target_name: '수위',
        is_sensor: 1,
        data_unit: 'cm',
        defList: [
          {
            target_id: 'waterLevel',
            target_prefix: 'WL',
            target_name: '수위',
            nodeList: [
              { target_code: '001', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '002', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '003', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '004', axisScale: [0, 0], moveScale: [0, 0] },
            ],
          },
        ],
      },
      {
        target_id: 'kW',
        target_name: '전력량',
        is_sensor: 1,
        is_submit_api: 0,
        save_db_type: BLOCK,
        data_unit: 'kW',
        description: '1 킬로와트(기호 kW)는 1 초 동안의 1,000 줄(N·m)에 해당하는 일률의 SI 단위',
        defList: [
          {
            target_id: 'powerGridKw',
            target_name: '인버터 현재 전력',
            target_prefix: 'IVT_PW_G_KW',
            description: 'Power',
            repeatId: 'RE_NODE_IVT',
            nodeList: [
              { target_code: '001', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '002', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '003', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '004', axisScale: [0, 0], moveScale: [0, 0] },
            ],
          },
        ],
      },
    ],
  },
  relationInfo: {
    placeRelationList: [
      {
        target_id: 'salternBlock',
        target_name: '염판',
        description: null,
        defList: [
          {
            target_id: 'systemArea',
            target_prefix: 'SYSTEM',
            target_name: '시스템',
            placeList: [
              {
                target_code: '1',
                nodeList: ['WL_001', 'S_001', 'MRT_001', 'IVT_PW_G_KW_001'],
                depth: 5,
                place_info: {
                  thresholdConfigList: [],
                  placeSize: {},
                },
              },
              {
                target_code: '2',
                nodeList: ['WL_002', 'S_002', 'MRT_002', 'IVT_PW_G_KW_002'],
                depth: 5,
                place_info: {
                  thresholdConfigList: [],
                  placeSize: {},
                },
              },
              {
                target_code: '3',
                nodeList: ['WL_003', 'S_003', 'MRT_003', 'IVT_PW_G_KW_003'],
                depth: 5,
                place_info: {
                  thresholdConfigList: [],
                  placeSize: {},
                },
              },
              {
                target_code: '4',
                nodeList: ['WL_004', 'S_004', 'MRT_004', 'IVT_PW_G_KW_004'],
                depth: 5,
                place_info: {
                  thresholdConfigList: [],
                  placeSize: {},
                },
              },
            ],
          },
        ],
      },
    ],
    smartSalternInfo: {},
    svgResourceConnectionList: [
      { targetIdList: ['WL_001', 'WL_002', 'WL_003', 'WL_004'], resourceIdList: ['waterLevel'] },
      { targetIdList: ['S_001', 'S_002', 'S_003', 'S_004'], resourceIdList: ['waterLevel'] },
      {
        targetIdList: ['MRT_001', 'MRT_002', 'MRT_003', 'MRT_004'],
        resourceIdList: ['moduleRearTemperature'],
      },
      {
        targetIdList: ['IVT_PW_G_KW_001', 'IVT_PW_G_KW_002', 'IVT_PW_G_KW_003', 'IVT_PW_G_KW_004'],
        resourceIdList: ['moduleRearTemperature'],
      },
    ],
    hiddenTextSvgModelResourceIdList: [],
  },
  controlInfo: {
    flowCmdList: [],
    setCmdList: [],
    scenarioCmdList: [],
    tempControlList: [{ cmdName: '', trueList: [], falseList: [] }],
  },
};

module.exports = map;
