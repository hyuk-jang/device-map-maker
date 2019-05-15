const {
  BLOCK,
  TROUBLE,
  NONE,
} = require('../../../../../default-intelligence').dcmConfigModel.nodeDataType;

/**
 * @type {mDeviceMap}
 */
const map = {
  drawInfo: {
    frame: {
      // FIXME:
      mapInfo: {
        width: 4000,
        height: 5000,
        backgroundInfo: {
          backgroundData: '',
          backgroundPosition: [0, 0],
        },
      },
      svgModelResourceList: [
        // FIXME:
        {
          id: 'solarEvaporationBlock',
          type: 'rect',
          elementDrawInfo: { width: 200, height: 700, color: '#abe3e1', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'normalEvaporationBlock_A',
          type: 'rect',
          elementDrawInfo: { width: 1860, height: 800, color: '#bd8f3a', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'normalEvaporationBlock_B',
          type: 'rect',
          elementDrawInfo: { width: 1860, height: 600, color: '#bd8f3a', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'normalCrystalizingBlock',
          type: 'rect',
          elementDrawInfo: { width: 500, height: 400, color: '#988224', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'reservoir_A',
          type: 'rect',
          elementDrawInfo: { width: 2600, height: 300, color: 'blue', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'reservoir_B',
          type: 'rect',
          elementDrawInfo: { width: 500, height: 300, color: 'blue', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'jago',
          type: 'rect',
          elementDrawInfo: { width: 200, height: 120, color: 'skyblue', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'brineWarehouse_A',
          type: 'rect',
          elementDrawInfo: { width: 680, height: 180, color: '#90b4dd', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'brineWarehouse_B',
          type: 'rect',
          elementDrawInfo: { width: 470, height: 180, color: '#90b4dd', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'brineWarehouse_C',
          type: 'rect',
          elementDrawInfo: { width: 250, height: 180, color: '#90b4dd', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'brineWarehouse_D',
          type: 'rect',
          elementDrawInfo: { width: 270, height: 180, color: '#90b4dd', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'sea',
          type: 'rect',
          elementDrawInfo: { width: 3980, height: 100, color: 'skyblue', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'waterWay',
          type: 'line',
          elementDrawInfo: { width: 60, color: 'gray', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'peWaterWay',
          type: 'line',
          elementDrawInfo: { width: 60, color: '#108760', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        // FIXME: 물을 빼는 파이프 인데 수로로 일단 적어둔다.
        {
          id: 'outWaterWay',
          type: 'line',
          elementDrawInfo: { width: 0, color: '', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        // FIXME: 사람이 다니는길인데 수로로 하고 이미지만 다르게 한다.
        {
          id: 'load',
          type: 'line',
          elementDrawInfo: { width: 60, color: '#96764f', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'pipe_A',
          type: 'line',
          elementDrawInfo: { width: 0, color: '', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'pipe_B',
          type: 'line',
          elementDrawInfo: { width: 0, color: '', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'pipe_C',
          type: 'line',
          elementDrawInfo: { width: 0, color: '', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        // FIXME:node
        {
          id: 'waterDoor',
          type: 'rect',
          elementDrawInfo: { width: 50, height: 50, color: '#b45b95', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'valve',
          type: 'polygon',
          elementDrawInfo: { width: 30, height: 30, color: 'yellow', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        // FIXME: 필요없지 않나? 있는지 모르겠다?
        {
          id: 'gateValve',
          type: 'polygon',
          elementDrawInfo: { width: 0, height: 0, color: '', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'underPump',
          type: 'circle',
          elementDrawInfo: { width: 50, height: 50, radius: 50, color: 'red', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'overPump',
          type: 'circle',
          elementDrawInfo: { radius: 0, color: '', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        {
          id: 'output',
          type: 'circle',
          elementDrawInfo: { radius: 0, color: '', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
        // 센서
        {
          id: 'sensor',
          type: 'rect',
          elementDrawInfo: { width: 0, height: 0, color: '', opacity: 1 },
          textStyleInfo: {
            color: '',
          },
        },
      ],
    },
    positionInfo: {
      // TODO:
      svgPlaceList: [
        {
          placeId: 'salternBlock',
          defList: [
            {
              id: 'SEB_1',
              name: '증발지_1',
              resourceId: 'solarEvaporationBlock',
              point: [250, 2510],
            },
            {
              id: 'SEB_2',
              name: '증발지_2',
              resourceId: 'solarEvaporationBlock',
              point: [510, 2510],
            },
            {
              id: 'SEB_3',
              name: '증발지_3',
              resourceId: 'solarEvaporationBlock',
              point: [780, 2510],
            },
            {
              id: 'SEB_4',
              name: '증발지_4',
              resourceId: 'solarEvaporationBlock',
              point: [1050, 2510],
            },
            {
              id: 'SEB_5',
              name: '증발지_5',
              resourceId: 'solarEvaporationBlock',
              point: [1320, 2510],
            },
            {
              id: 'SEB_6',
              name: '증발지_6',
              resourceId: 'solarEvaporationBlock',
              point: [1590, 2510],
            },
            {
              id: 'SEB_7',
              name: '증발지_7',
              resourceId: 'solarEvaporationBlock',
              point: [1860, 2510],
            },
            {
              id: 'SEB_8',
              name: '증발지_8',
              resourceId: 'solarEvaporationBlock',
              point: [2130, 2510],
            },
            {
              id: 'NEB_1',
              name: '증발지_일반1',
              resourceId: 'normalEvaporationBlock_A',
              point: [130, 610],
            },
            {
              id: 'NEB_2',
              name: '증발지_일반2',
              resourceId: 'normalEvaporationBlock_B',
              point: [130, 1480],
            },
            {
              id: 'NCB',
              name: '결정지',
              resourceId: 'normalCrystalizingBlock',
              point: [130, 3400],
            },
          ],
        },
        {
          placeId: 'brineWarehouse',
          defList: [
            { id: 'BW_1', name: '해주_1', resourceId: 'brineWarehouse_A', point: [200, 2210] },
            { id: 'BW_2', name: '해주_2', resourceId: 'brineWarehouse_B', point: [930, 2210] },
            { id: 'BW_3', name: '해주_3', resourceId: 'brineWarehouse_C', point: [1450, 2210] },
            { id: 'BW_4', name: '해주_4', resourceId: 'brineWarehouse_C', point: [1740, 2210] },
            { id: 'BW_5', name: '해주_5', resourceId: 'brineWarehouse_D', point: [750, 3450] },
            { id: 'BW_6', name: '해주_6', resourceId: 'brineWarehouse_D', point: [1050, 3450] },
          ],
        },
        {
          placeId: 'reservoir',
          defList: [
            { id: 'RV_1', name: '저수조_1', resourceId: 'reservoir_A', point: [10, 170] },
            { id: 'RV_2', name: '저수조_2', resourceId: 'reservoir_B', point: [3490, 170] },
          ],
        },
        {
          placeId: 'sea',
          defList: [
            { id: 'SEA', name: '바다', resourceId: 'sea', point: [10, 0] },
            { id: 'JG', name: '자고', resourceId: 'sideReservoir', point: [2620, 350] },
          ],
        },
        // FIXME:
        {
          placeId: 'waterWay',
          defList: [
            {
              id: 'WW_001',
              name: '수로_001',
              resourceId: 'waterWay',
              point: [10, 520, 2850, 520],
            },
            {
              id: 'WW_002',
              name: '수로_002',
              resourceId: 'waterWay',
              point: [40, 530, 50, 4000],
            },
            {
              id: 'WW_003',
              name: '수로_003',
              resourceId: 'waterWay',
              point: [2820, 530, 2810, 4000],
            },
            {
              id: 'WW_004',
              name: '수로_004',
              resourceId: 'waterWay',
              point: [70, 2470, 2400, 2470],
            },
            {
              id: 'WW_005',
              name: '수로_005',
              resourceId: 'waterWay',
              point: [2400, 2440, 2400, 3300],
            },
            {
              id: 'WW_006',
              name: '수로_006',
              resourceId: 'waterWay',
              point: [70, 3260, 2840, 3260],
            },
            {
              id: 'WW_007',
              name: '수로_007',
              resourceId: 'waterWay',
              point: [20, 4000, 2840, 4000],
            },
            {
              id: 'WW_008',
              name: '수로_008',
              resourceId: 'load',
              point: [70, 580, 2790, 580],
            },
            {
              id: 'WW_009',
              name: '수로_009',
              resourceId: 'load',
              point: [90, 1450, 2790, 1450],
            },
            {
              id: 'WW_010',
              name: '수로_010',
              resourceId: 'load',
              point: [90, 2120, 2790, 2120],
            },
            {
              id: 'WW_011',
              name: '수로_011',
              resourceId: 'load',
              point: [100, 560, 100, 2150],
            },
            {
              id: 'WW_012',
              name: '수로_012',
              resourceId: 'load',
              point: [2030, 560, 2030, 2395],
            },
            {
              id: 'WW_013',
              name: '수로_013',
              resourceId: 'load',
              point: [75, 3320, 2785, 3320],
            },
            {
              id: 'WW_014',
              name: '수로_014',
              resourceId: 'peWaterWay',
              point: [75, 2150, 310, 2150],
            },
          ],
        },
      ],
      svgNodeList: [],
    },
  },
  setInfo: {
    mainInfo: { main_seq: 0, uuid: '' },
    dccConstructorList: [{}],
    dpcConstructorList: [{}],
    repeatNodeList: [{}],
    dataLoggerStructureList: [{}],
    nodeStructureList: [
      {
        target_id: 'temp',
        target_name: '온도',
        is_sensor: 1,
        data_unit: '℃',
        description: '섭씨',
        defList: [
          {
            target_id: 'moduleFrontTemperature',
            target_prefix: 'MFT',
            target_name: '모듈 앞면 온도',
            description: null,
            nodeList: [],
          },
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
              { target_code: '005', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '006', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '007', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '008', axisScale: [0, 0], moveScale: [0, 0] },
            ],
          },
        ],
      },
      {
        target_id: 'salinity',
        target_name: '염도',
        is_sensor: 1,
        data_unit: '%',
        description: null,
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
              { target_code: '005', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '006', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '007', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '008', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '009', axisScale: [0, 0], moveScale: [0, 0] },
            ],
          },
        ],
      },
      {
        target_id: 'waterLevel',
        target_name: '수위',
        is_sensor: 1,
        data_unit: 'cm',
        description: null,
        defList: [
          {
            target_id: 'waterLevel',
            target_prefix: 'WL',
            target_name: '수위',
            description: null,
            nodeList: [
              { target_code: '001', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '002', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '003', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '004', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '005', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '006', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '007', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '008', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '009', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '010', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '011', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '012', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '013', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '014', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '015', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '016', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '017', axisScale: [0, 0], moveScale: [0, 0] },
            ],
          },
        ],
      },
      {
        target_id: 'waterDoor',
        target_name: '수문',
        is_sensor: 0,
        data_unit: null,
        description: null,
        defList: [
          {
            target_id: 'waterDoor',
            target_prefix: 'WD',
            target_name: '수문',
            description: null,
            nodeList: [
              { target_code: '001', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '002', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '003', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '004', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '005', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '006', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '007', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '008', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '009', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '010', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '011', axisScale: [0, 0], moveScale: [0, 0] },
            ],
          },
        ],
      },
      {
        target_id: 'valve',
        target_name: '밸브',
        is_sensor: 0,
        data_unit: null,
        description: null,
        defList: [
          {
            target_id: 'valve',
            target_prefix: 'V',
            target_name: '밸브',
            description: null,
            nodeList: [
              { target_code: '001', axisScale: [0, 0], moveScale: [1, 0] },
              { target_code: '002', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '003', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '004', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '005', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '006', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '007', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '008', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '009', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '010', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '011', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '012', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '013', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '014', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '015', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '016', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '017', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '018', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '019', axisScale: [0, 0], moveScale: [0, 0] },
            ],
          },
        ],
      },
      {
        target_id: 'pump',
        target_name: '펌프',
        is_sensor: 0,
        data_unit: null,
        description: null,
        defList: [
          {
            target_id: 'pump',
            target_prefix: 'P',
            target_name: '펌프',
            description: null,
            nodeList: [
              { target_code: '001', axisScale: [0, 0], moveScale: [3, 0] },
              { target_code: '002', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '003', axisScale: [0, 0], moveScale: [1, 0] },
              { target_code: '004', axisScale: [0, 0], moveScale: [2, 0] },
              { target_code: '005', axisScale: [0, 0], moveScale: [3, 0] },
              { target_code: '007', axisScale: [0, 0], moveScale: [4, 0] },
              { target_code: '008', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '009', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '010', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '011', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '012', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '013', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '014', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '015', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '016', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '017', axisScale: [0, 0], moveScale: [0, 0] },
            ],
          },
        ],
      },
      {
        target_id: 'outlet',
        target_name: '배출구',
        is_sensor: -1,
        save_db_type: NONE,
        data_unit: null,
        description: null,
        defList: [
          {
            target_id: 'outlet',
            target_prefix: 'O',
            target_name: '배출구',
            description: null,
            nodeList: [
              { target_code: '001', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '002', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '003', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '004', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '005', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '006', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '007', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '008', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '009', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '010', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '011', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '012', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '013', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '014', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '015', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '016', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '017', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '018', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '019', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '020', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '021', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '022', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '023', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '024', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '025', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '026', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '027', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '028', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '029', axisScale: [0, 0], moveScale: [0, 0] },
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
            target_id: 'solarEvaporationBlock',
            target_prefix: 'SEB',
            target_name: '수중 태양광 발전 증발지',
            placeList: [
              {
                target_code: '1',
                // TODO:
                nodeList: [],
                depth: 0,
                place_info: {},
              },
              {
                target_code: '2',
                // TODO:
                nodeList: [],
                depth: 0,
                place_info: {},
              },
              {
                target_code: '3',
                // TODO:
                nodeList: [],
                depth: 0,
                place_info: {},
              },
              {
                target_code: '4',
                // TODO:
                nodeList: [],
                depth: 0,
                place_info: {},
              },
              {
                target_code: '5',
                // TODO:
                nodeList: [],
                depth: 0,
                place_info: {},
              },
              {
                target_code: '6',
                // TODO:
                nodeList: [],
                depth: 0,
                place_info: {},
              },
              {
                target_code: '7',
                // TODO:
                nodeList: [],
                depth: 0,
                place_info: {},
              },
              {
                target_code: '8',
                // TODO:
                nodeList: [],
                depth: 0,
                place_info: {},
              },
            ],
          },
          {
            target_id: 'normalEvaporationBlock',
            target_prefix: 'NEB',
            target_name: '일반 증발지',
            placeList: [
              {
                target_code: '일반1',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '일반2',
                // TODO:
                nodeList: [],
                depth: 0,
              },
            ],
          },
          {
            target_id: 'normalCrystalizingBlock',
            target_prefix: 'NCB',
            target_name: '일반 결정지',
            placeList: [
              {
                target_code: '',
                // TODO:
                nodeList: [],
                depth: 0,
                place_info: {},
              },
            ],
          },
        ],
      },
      {
        target_id: 'brineWarehouse',
        target_name: '해주',
        description: null,
        defList: [
          {
            target_id: 'brineWarehouse',
            target_prefix: 'BW',
            target_name: '해주',
            placeList: [
              {
                target_code: '1',
                // TODO:
                nodeList: [],
                depth: 0,
                place_info: {},
              },
              {
                target_code: '2',
                // TODO:
                nodeList: [],
                depth: 0,
                place_info: {},
              },
              {
                target_code: '3',
                // TODO:
                nodeList: [],
                depth: 0,
                place_info: {},
              },
              {
                target_code: '4',
                // TODO:
                nodeList: ['P_002', 'P_002', 'P_003', 'P_004', 'P_005'],
                depth: 0,
                place_info: {},
              },
              {
                target_code: '5',
                // TODO:
                nodeList: [],
                depth: 0,
                place_info: {},
              },
              {
                target_code: '6',
                // TODO:
                nodeList: [],
                depth: 0,
                place_info: {},
              },
            ],
          },
        ],
      },
      {
        target_id: 'reservoir',
        target_name: '저수조',
        description: null,
        defList: [
          {
            target_id: 'reservoir',
            target_prefix: 'RV',
            target_name: '저수조',
            placeList: [
              {
                target_code: '1',
                // TODO:
                nodeList: [],
                depth: 0,
                place_info: {},
              },
              {
                target_code: '2',
                // TODO:
                nodeList: [],
                depth: 0,
                place_info: {},
              },
            ],
          },
        ],
      },
      {
        target_id: 'sea',
        target_name: '바다',
        description: null,
        defList: [
          {
            target_id: 'sea',
            target_prefix: 'SEA',
            target_name: '바다',
            placeList: [
              {
                target_code: '',
                depth: 0,
                // TODO:
                nodeList: [],
                place_info: {},
              },
            ],
          },
        ],
      },
      {
        target_id: 'waterWay',
        target_name: '수로',
        description: null,
        defList: [
          {
            target_id: 'waterWay',
            target_prefix: 'WW',
            target_name: '수로',
            // FIXME: 좀많은가? 수정가능성 있음
            placeList: [
              {
                target_code: '001',
                // TODO:
                nodeList: ['WD_001', 'V_001', 'P_001'],
                depth: 0,
              },
              {
                target_code: '002',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '003',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '004',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '005',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '006',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '007',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '008',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '009',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '010',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '011',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '012',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '013',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '014',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '015',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '016',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '017',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '018',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '019',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '020',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '021',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '022',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '023',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '024',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '025',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '026',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '027',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '028',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '029',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '030',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '031',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '032',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '033',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '034',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '035',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '036',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '037',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '038',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '039',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '040',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '041',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '042',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '043',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              {
                target_code: '044',
                // TODO:
                nodeList: [],
                depth: 0,
              },
              // TODO: 센서류 작성 해야함
            ],
          },
        ],
      },
      {
        target_id: 'pipeLine',
        target_name: '파이프',
        description: null,
        defList: [
          {
            target_id: 'pipeLine',
            target_prefix: 'PL',
            target_name: '파이프',
            placeList: [
              { target_code: '001', nodeList: [] },
              { target_code: '002', nodeList: [] },
              { target_code: '003', nodeList: [] },
              { target_code: '004', nodeList: [] },
              { target_code: '005', nodeList: [] },
              { target_code: '006', nodeList: [] },
              { target_code: '007', nodeList: [] },
              { target_code: '008', nodeList: [] },
              { target_code: '009', nodeList: [] },
              { target_code: '010', nodeList: [] },
              { target_code: '011', nodeList: [] },
              { target_code: '012', nodeList: [] },
              { target_code: '013', nodeList: [] },
              { target_code: '014', nodeList: [] },
              { target_code: '015', nodeList: [] },
              { target_code: '016', nodeList: [] },
              { target_code: '017', nodeList: [] },
              { target_code: '018', nodeList: [] },
              { target_code: '019', nodeList: [] },
              { target_code: '020', nodeList: [] },
              { target_code: '021', nodeList: [] },
              { target_code: '022', nodeList: [] },
              { target_code: '023', nodeList: [] },
              { target_code: '024', nodeList: [] },
              { target_code: '025', nodeList: [] },
              { target_code: '026', nodeList: [] },
              { target_code: '027', nodeList: [] },
              { target_code: '028', nodeList: [] },
              { target_code: '029', nodeList: [] },
              { target_code: '030', nodeList: [] },
              { target_code: '031', nodeList: [] },
              { target_code: '032', nodeList: [] },
              { target_code: '033', nodeList: [] },
              { target_code: '034', nodeList: [] },
              { target_code: '035', nodeList: [] },
              { target_code: '036', nodeList: [] },
              { target_code: '037', nodeList: [] },
              { target_code: '038', nodeList: [] },
              { target_code: '039', nodeList: [] },
              { target_code: '040', nodeList: [] },
              { target_code: '041', nodeList: [] },
            ],
          },
        ],
      },
    ],
    smartSalternInfo: {
      pipeConnectionRelationList: [
        // TODO:
        { currNode: '', parentNodes: [], childNodes: [''] },
      ],
    },
    // FIXME: resourceId를 왜 list 처리했는지 모르겠다?
    svgResourceConnectionList: [
      {
        targetIdList: ['SEB_1', 'SEB_2', 'SEB_3', 'SEB_4', 'SEB_5', 'SEB_6', 'SEB_7', 'SEB_8'],
        resourceIdList: ['solarEvaporationBlock'],
      },
      {
        targetIdList: ['NEB_1'],
        resourceIdList: ['normalEvaporationBlock_A'],
      },
      {
        targetIdList: ['NEB_2'],
        resourceIdList: ['normalEvaporationBlock_B'],
      },
      {
        targetIdList: ['NCB'],
        resourceIdList: ['normalCrystalizingBlock'],
      },
      {
        targetIdList: ['RV_1'],
        resourceIdList: ['reservoir_A'],
      },
      {
        targetIdList: ['RV_2'],
        resourceIdList: ['reservoir_B'],
      },
      {
        targetIdList: ['BW_1'],
        resourceIdList: ['brineWarehouse_A'],
      },
      {
        targetIdList: ['BW_2'],
        resourceIdList: ['brineWarehouse_B'],
      },
      {
        targetIdList: ['BW_3', 'BW_4'],
        resourceIdList: ['brineWarehouse_C'],
      },
      {
        targetIdList: ['BW_5', 'BW_6'],
        resourceIdList: ['brineWarehouse_D'],
      },
      // 회색수로
      {
        targetIdList: ['WW_001', 'WW_002', 'WW_003', 'WW_004', 'WW_005', 'WW_006', 'WW_007'],
        resourceIdList: ['waterWay'],
      },
      // load갈색 수로
      {
        targetIdList: ['WW_008', 'WW_009', 'WW_010', 'WW_011', 'WW_012', 'WW_013'],
        resourceIdList: ['load'],
      },
      // pe 수로
      {
        targetIdList: [
          'WW_014',
          'WW_015',
          'WW_016',
          'WW_017',
          'WW_018',
          'WW_019',
          'WW_020',
          'WW_021',
          'WW_022',
          'WW_023',
          'WW_024',
          'WW_025',
        ],
        resourceIdList: ['peWaterWay'],
      },
      // out 수로
      {
        targetIdList: [
          'WW_026',
          'WW_027',
          'WW_028',
          'WW_029',
          'WW_030',
          'WW_031',
          'WW_032',
          'WW_033',
          'WW_034',
          'WW_035',
          'WW_036',
          'WW_037',
          'WW_038',
          'WW_039',
          'WW_040',
          'WW_041',
          'WW_042',
          'WW_043',
          'WW_044',
          'WW_045',
        ],
        resourceIdList: ['outWaterWay'],
      },
      // 파이프 주황
      {
        targetIdList: [
          'PL_001',
          'PL_002',
          'PL_003',
          'PL_004',
          'PL_005',
          'PL_006',
          'PL_007',
          'PL_008',
          'PL_009',
          'PL_010',
          'PL_011',
          'PL_012',
          'PL_013',
          'PL_014',
          'PL_015',
          'PL_016',
          'PL_017',
          'PL_018',
          'PL_019',
          'PL_020',
          'PL_021',
          'PL_022',
          'PL_023',
          'PL_024',
          'PL_025',
          'PL_026',
          'PL_027',
          'PL_028',
        ],
        resourceIdList: ['pipe_A'],
      },
      // 파이프 파랑
      {
        targetIdList: [
          'PL_029',
          'PL_030',
          'PL_031',
          'PL_032',
          'PL_033',
          'PL_034',
          'PL_035',
          'PL_036',
          'PL_037',
        ],
        resourceIdList: ['pipe_B'],
      },
      // 파이프 갈색
      {
        targetIdList: ['PL_038', 'PL_039', 'PL_040', 'PL_041'],
        resourceIdList: ['pipe_C'],
      },
      {
        targetIdList: [
          'V_001',
          'V_002',
          'V_003',
          'V_004',
          'V_005',
          'V_006',
          'V_007',
          'V_008',
          'V_009',
          'V_010',
          'V_011',
          'V_012',
          'V_013',
          'V_014',
          'V_015',
          'V_016',
          'V_017',
          'V_018',
          'V_019',
        ],
        resourceIdList: ['valve'],
      },
      // 수중 펌프
      {
        targetIdList: [
          'P_001',
          'P_002',
          'P_003',
          'P_004',
          'P_005',
          'P_006',
          'P_007',
          'P_008',
          'P_009',
          'P_010',
          'P_011',
          'P_012',
          'P_013',
        ],
        resourceIdList: ['underPump'],
      },
      // 양수 펌프
      {
        targetIdList: ['P_014', 'P_015', 'P_016', 'P_017'],
        resourceIdList: ['overPump'],
      },
      {
        targetIdList: [
          'WD_001',
          'WD_002',
          'WD_003',
          'WD_004',
          'WD_005',
          'WD_006',
          'WD_007',
          'WD_008',
          'WD_009',
          'WD_010',
          'WD_011',
        ],
        resourceIdList: ['waterDoor'],
      },
      {
        targetIdList: [
          'O_001',
          'O_002',
          'O_003',
          'O_004',
          'O_005',
          'O_006',
          'O_007',
          'O_008',
          'O_009',
          'O_010',
          'O_011',
          'O_012',
          'O_013',
          'O_014',
          'O_015',
          'O_016',
          'O_017',
          'O_018',
          'O_019',
          'O_020',
          'O_021',
          'O_022',
          'O_023',
          'O_024',
          'O_025',
          'O_026',
          'O_027',
          'O_028',
          'O_029',
        ],
        resourceIdList: ['output'],
      },
      // TODO: 센서 이미지 관계 나중에 잡아줘야함
    ],
    // FIXME: 마지막 작업
    hiddenTextSvgModelResourceIdList: [],
  },
  controlInfo: {
    flowCmdList: [
      {
        srcPlaceId: '',
        destList: [
          {
            destPlaceId: '',
            trueNodeList: [],
            falseNodeList: [],
          },
        ],
      },
    ],
    setCmdList: [
      {
        cmdId: '',
        trueNodeList: [],
        falseNodeList: [],
      },
    ],
    tempControlList: [{ cmdName: '', trueList: [], falseList: [] }],
  },
};

module.exports = map;
