const {
  dcmConfigModel: {
    reqWrapCmdType: reqWCT,
    reqWrapCmdFormat: reqWCF,
    reqDeviceControlType: reqDCT,
    goalDataRange: goalDR,
    nodeDataType: { BLOCK, TROUBLE, NONE },
  },
} = require('../../../../../default-intelligence');

/**
 * @type {mDeviceMap}
 */
const map = {
  drawInfo: {
    frame: {
      mapInfo: {
        width: 3000,
        height: 2000,
        backgroundInfo: {
          backgroundData: '',
          backgroundPosition: [0, 0],
        },
      },
      svgModelResourceList: [
        {
          id: 'solarEvaporationBlock',
          type: 'rect',
          elementDrawInfo: { width: 80, height: 280, color: '#abe3e1', opacity: 0 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        {
          id: 'normalEvaporationBlock_A',
          type: 'rect',
          elementDrawInfo: { width: 770, height: 330, color: '#bd8f3a', opacity: 0 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        {
          id: 'normalEvaporationBlock_B',
          type: 'rect',
          elementDrawInfo: { width: 770, height: 240, color: '#bd8f3a', opacity: 0 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        {
          id: 'normalCrystalizingBlock',
          type: 'rect',
          elementDrawInfo: { width: 200, height: 160, color: '#988224', opacity: 0 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        {
          id: 'reservoir_A',
          type: 'rect',
          elementDrawInfo: { width: 1040, height: 120, color: 'blue', opacity: 0 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        {
          id: 'reservoir_B',
          type: 'rect',
          elementDrawInfo: { width: 200, height: 120, color: 'blue', opacity: 1 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        {
          id: 'drainage',
          type: 'rect',
          elementDrawInfo: { width: 80, height: 120, color: 'skyblue', opacity: 0 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        {
          id: 'brineWarehouse_A',
          type: 'rect',
          elementDrawInfo: { width: 280, height: 80, color: '#90b4dd', opacity: 0 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        {
          id: 'brineWarehouse_B',
          type: 'rect',
          elementDrawInfo: { width: 200, height: 80, color: '#90b4dd', opacity: 0 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        {
          id: 'brineWarehouse_C',
          type: 'rect',
          elementDrawInfo: { width: 120, height: 80, color: '#90b4dd', opacity: 0 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        {
          id: 'brineWarehouse_D',
          type: 'rect',
          elementDrawInfo: { width: 110, height: 80, color: '#90b4dd', opacity: 0 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        {
          id: 'sea',
          type: 'rect',
          elementDrawInfo: { width: 1600, height: 40, color: 'skyblue', opacity: 1 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        {
          id: 'waterWay',
          type: 'line',
          elementDrawInfo: { width: 25, color: '#b2b2b2', opacity: 0 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        {
          id: 'waterWay_B',
          type: 'line',
          elementDrawInfo: { width: 25, color: '#4c7a89', opacity: 0 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        {
          id: 'peWaterWay',
          type: 'line',
          elementDrawInfo: { width: 25, color: '#108760', opacity: 0 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        // 주황
        {
          id: 'pipeLine_A',
          type: 'line',
          elementDrawInfo: { width: 10, color: '#ff9a00', opacity: 0 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        // 진보라
        {
          id: 'pipeLine_B',
          type: 'line',
          elementDrawInfo: { width: 10, color: '#7513a1', opacity: 0 },
          textStyleInfo: {
            color: '',
            fontSize: 10,
          },
        },
        {
          id: 'waterDoor',
          type: 'rect',
          elementDrawInfo: {
            width: 30,
            height: 30,
            color: ['#a3a3a3', '#b45b95', '#dc1d1f'],
            opacity: 1,
          },
          textStyleInfo: {
            color: '',
            fontSize: 5,
            leading: '1.8em',
          },
        },
        {
          id: 'gateValve',
          type: 'rect',
          elementDrawInfo: {
            width: 30,
            height: 30,
            color: ['#a3a3a3', 'yellow', '#dc1d1f'],
            opacity: 1,
          },
          textStyleInfo: {
            color: '',
            fontSize: 4,
            leading: '2.5em',
          },
        },
        {
          id: 'overPump',
          type: 'circle',
          elementDrawInfo: {
            width: 35,
            height: 35,
            radius: 35,
            color: ['#a3a3a3', '#22fb00', '#dc1d1f'],
            opacity: 1,
            leading: '10em',
          },
          textStyleInfo: {
            color: '',
            fontSize: 6,
          },
        },
        {
          id: 'underPump',
          type: 'circle',
          elementDrawInfo: {
            width: 27,
            height: 27,
            radius: 27,
            color: ['#a3a3a3', '#8b24b0', '#dc1d1f'],
            opacity: 1,
          },
          textStyleInfo: {
            color: '',
            fontSize: 6,
          },
        },
        {
          id: 'outlet',
          type: 'circle',
          elementDrawInfo: { width: 10, height: 10, radius: 10, color: 'black', opacity: 1 },
          textStyleInfo: {
            color: '',
            fontSize: 8,
          },
        },
        // 센서
        {
          id: 'salinity',
          type: 'rect',
          elementDrawInfo: { width: 45, height: 25, color: '#f0f0f0', opacity: 1 },
          textStyleInfo: {
            color: '',
            fontSize: 8,
          },
        },
        {
          id: 'moduleRearTemperature',
          type: 'rect',
          elementDrawInfo: { width: 45, height: 25, color: '#f0f0f0', opacity: 1 },
          textStyleInfo: {
            color: '',
            fontSize: 5,
          },
        },
        {
          id: 'waterLevel',
          type: 'rect',
          elementDrawInfo: { width: 45, height: 25, color: '#f0f0f0', opacity: 1 },
          textStyleInfo: {
            color: '',
            fontSize: 8,
          },
        },
        {
          id: 'brineTemperature',
          type: 'rect',
          elementDrawInfo: { width: 45, height: 25, color: '#f0f0f0', opacity: 1 },
          textStyleInfo: {
            color: '',
            fontSize: 8,
          },
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
              point: [250, 1110],
            },
            {
              id: 'SEB_2',
              name: '증발지_2',
              resourceId: 'solarEvaporationBlock',
              point: [355, 1110],
            },
            {
              id: 'SEB_3',
              name: '증발지_3',
              resourceId: 'solarEvaporationBlock',
              point: [460, 1110],
            },
            {
              id: 'SEB_4',
              name: '증발지_4',
              resourceId: 'solarEvaporationBlock',
              point: [570, 1110],
            },
            {
              id: 'SEB_5',
              name: '증발지_5',
              resourceId: 'solarEvaporationBlock',
              point: [680, 1110],
            },
            {
              id: 'SEB_6',
              name: '증발지_6',
              resourceId: 'solarEvaporationBlock',
              point: [790, 1110],
            },
            {
              id: 'SEB_7',
              name: '증발지_7',
              resourceId: 'solarEvaporationBlock',
              point: [890, 1110],
            },
            {
              id: 'SEB_8',
              name: '증발지_8',
              resourceId: 'solarEvaporationBlock',
              point: [1000, 1110],
            },
            {
              id: 'NEB_1',
              name: '일반 증발지_1',
              resourceId: 'normalEvaporationBlock_A',
              point: [200, 235],
            },
            {
              id: 'NEB_2',
              name: '일반 증발지_2',
              resourceId: 'normalEvaporationBlock_B',
              point: [200, 580],
            },
            {
              id: 'NCB',
              name: '결정지',
              resourceId: 'normalCrystalizingBlock',
              point: [200, 1430],
            },
          ],
        },
        {
          placeId: 'brineWarehouse',
          defList: [
            { id: 'BW_1', name: '해주_1', resourceId: 'brineWarehouse_A', point: [220, 880] },
            { id: 'BW_2', name: '해주_2', resourceId: 'brineWarehouse_B', point: [510, 880] },
            { id: 'BW_3', name: '해주_3', resourceId: 'brineWarehouse_C', point: [720, 880] },
            { id: 'BW_4', name: '해주_4', resourceId: 'brineWarehouse_C', point: [850, 880] },
            { id: 'BW_5', name: '해주_5', resourceId: 'brineWarehouse_D', point: [445, 1450] },
            { id: 'BW_6', name: '해주_6', resourceId: 'brineWarehouse_D', point: [570, 1450] },
          ],
        },
        {
          placeId: 'reservoir',
          defList: [
            { id: 'RV_1', name: '저수지_1', resourceId: 'reservoir_A', point: [170, 80] },
            { id: 'RV_2', name: '저수지_2', resourceId: 'reservoir_B', point: [1570, 80] },
          ],
        },
        {
          placeId: 'sea',
          defList: [
            { id: 'SEA', name: '바다', resourceId: 'sea', point: [170, 10] },
            { id: 'D', name: '배수지', resourceId: 'drainage', point: [1220, 80] },
          ],
        },
        {
          placeId: 'waterWay',
          defList: [
            {
              id: 'WW_001',
              name: '수로_001',
              resourceId: 'waterWay',
              point: [170, 220, 1305, 220],
            },
            {
              id: 'WW_002',
              name: '수로_002',
              resourceId: 'waterWay',
              point: [182, 220, 182, 1750],
            },
            {
              id: 'WW_003',
              name: '수로_003',
              resourceId: 'waterWay',
              point: [1293, 220, 1293, 1750],
            },
            {
              id: 'WW_004',
              name: '수로_004',
              resourceId: 'waterWay',
              point: [170, 1085, 1125, 1085],
            },
            {
              id: 'WW_005',
              name: '수로_005',
              resourceId: 'waterWay',
              point: [1113, 1085, 1113, 1410],
            },
            {
              id: 'WW_006',
              name: '수로_006',
              resourceId: 'waterWay',
              point: [170, 1410, 1305, 1410],
            },
            {
              id: 'WW_007',
              name: '수로_007',
              resourceId: 'waterWay',
              point: [170, 1738, 1305, 1738],
            },
            // {
            //   id: 'WW_008',
            //   name: '수로_008',
            //   resourceId: 'peWaterWay',
            //   point: [70, 2100, 230, 2100],
            // },
            {
              id: 'WW_009',
              name: '수로_009',
              resourceId: 'peWaterWay',
              point: [485, 820, 485, 850],
            },
            {
              id: 'WW_010',
              name: '수로_010',
              resourceId: 'peWaterWay',
              point: [485, 850, 485, 890],
            },
            {
              id: 'WW_011',
              name: '수로_011',
              resourceId: 'peWaterWay',
              point: [485, 850, 530, 850],
            },
            {
              id: 'WW_012',
              name: '수로_012',
              resourceId: 'peWaterWay',
              point: [530, 820, 530, 850],
            },
            {
              id: 'WW_013',
              name: '수로_013',
              resourceId: 'peWaterWay',
              point: [530, 850, 530, 890],
            },
            {
              id: 'WW_014',
              name: '수로_014',
              resourceId: 'peWaterWay',
              point: [400, 1480, 425, 1480],
            },
            {
              id: 'WW_015',
              name: '수로_015',
              resourceId: 'peWaterWay',
              point: [425, 1480, 450, 1480],
            },
            {
              id: 'WW_016',
              name: '수로_016',
              resourceId: 'peWaterWay',
              point: [425, 1480, 425, 1420],
            },
            {
              id: 'WW_017',
              name: '수로_017',
              resourceId: 'waterWay_B',
              point: [540, 960, 540, 1030],
            },
            {
              id: 'WW_018',
              name: '수로_018',
              resourceId: 'waterWay_B',
              point: [830, 960, 830, 1030],
            },
            {
              id: 'WW_019',
              name: '수로_019',
              resourceId: 'waterWay_B',
              point: [930, 960, 930, 1030],
            },
            {
              id: 'WW_020',
              name: '수로_020',
              resourceId: 'waterWay_B',
              point: [280, 1035, 1050, 1035],
            },
            {
              id: 'WW_021',
              name: '수로_021',
              resourceId: 'waterWay_B',
              point: [292, 1050, 292, 1110],
            },
            {
              id: 'WW_022',
              name: '수로_022',
              resourceId: 'waterWay_B',
              point: [300, 1085, 350, 1085],
            },
            {
              id: 'WW_023',
              name: '수로_023',
              resourceId: 'waterWay_B',
              point: [390, 1050, 390, 1110],
            },
            {
              id: 'WW_024',
              name: '수로_024',
              resourceId: 'waterWay_B',
              point: [400, 1085, 460, 1085],
            },
            {
              id: 'WW_025',
              name: '수로_025',
              resourceId: 'waterWay_B',
              point: [488, 1050, 488, 1110],
            },
            {
              id: 'WW_026',
              name: '수로_026',
              resourceId: 'waterWay_B',
              point: [500, 1085, 560, 1085],
            },
            {
              id: 'WW_027',
              name: '수로_027',
              resourceId: 'waterWay_B',
              point: [605, 1050, 605, 1110],
            },
            {
              id: 'WW_028',
              name: '수로_028',
              resourceId: 'waterWay_B',
              point: [610, 1085, 670, 1085],
            },
            {
              id: 'WW_029',
              name: '수로_029',
              resourceId: 'waterWay_B',
              point: [715, 1050, 715, 1110],
            },
            {
              id: 'WW_030',
              name: '수로_030',
              resourceId: 'waterWay_B',
              point: [720, 1085, 770, 1085],
            },
            {
              id: 'WW_031',
              name: '수로_031',
              resourceId: 'waterWay_B',
              point: [815, 1050, 815, 1110],
            },
            {
              id: 'WW_032',
              name: '수로_032',
              resourceId: 'waterWay_B',
              point: [830, 1085, 860, 1085],
            },
            {
              id: 'WW_033',
              name: '수로_033',
              resourceId: 'waterWay_B',
              point: [925, 1050, 925, 1110],
            },
            {
              id: 'WW_034',
              name: '수로_034',
              resourceId: 'waterWay_B',
              point: [935, 1085, 990, 1085],
            },
            {
              id: 'WW_035',
              name: '수로_035',
              resourceId: 'waterWay_B',
              point: [1040, 1050, 1040, 1110],
            },
            {
              id: 'WW_036',
              name: '수로_036',
              resourceId: 'waterWay_B',
              point: [1050, 1085, 1100, 1085],
            },
          ],
        },
        {
          placeId: 'pipeLine',
          defList: [
            // {
            //   id: 'PL_001',
            //   name: '파이프_001',
            //   resourceId: 'pipeLine_A',
            //   point: [130, 50, 130, 170],
            // },
            // {
            //   id: 'PL_002',
            //   name: '파이프_002',
            //   resourceId: 'pipeLine_A',
            //   point: [2780, 180, 2780, 100],
            // },
            {
              id: 'PL_003',
              name: '파이프_003',
              resourceId: 'pipeLine_A',
              point: [940, 240, 940, 200],
            },
            {
              id: 'PL_004',
              name: '파이프_004',
              resourceId: 'pipeLine_A',
              point: [360, 880, 360, 810],
            },
            {
              id: 'PL_005',
              name: '파이프_005',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_006',
              name: '파이프_006',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_007',
              name: '파이프_007',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_008',
              name: '파이프_008',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_009',
              name: '파이프_009',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_010',
              name: '파이프_010',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_011',
              name: '파이프_011',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_012',
              name: '파이프_012',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_013',
              name: '파이프_013',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_014',
              name: '파이프_014',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_015',
              name: '파이프_015',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_016',
              name: '파이프_016',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_017',
              name: '파이프_017',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_018',
              name: '파이프_018',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_019',
              name: '파이프_019',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_020',
              name: '파이프_020',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_021',
              name: '파이프_021',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_022',
              name: '파이프_022',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_023',
              name: '파이프_023',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_024',
              name: '파이프_024',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_025',
              name: '파이프_025',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_026',
              name: '파이프_026',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_027',
              name: '파이프_027',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_028',
              name: '파이프_028',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_029',
              name: '파이프_029',
              resourceId: 'pipeLine_B',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_030',
              name: '파이프_030',
              resourceId: 'pipeLine_B',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_031',
              name: '파이프_031',
              resourceId: 'pipeLine_B',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_032',
              name: '파이프_032',
              resourceId: 'pipeLine_B',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_033',
              name: '파이프_033',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_034',
              name: '파이프_034',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
            {
              id: 'PL_035',
              name: '파이프_035',
              resourceId: 'pipeLine_A',
              point: [0, 0, 0, 0],
            },
          ],
        },
      ],
      svgNodeList: [],
    },
  },
  setInfo: {
    mainInfo: { main_seq: 2, uuid: 'bbbbb' },
    dccConstructorList: [
      {
        dccId: 'DCC_TEST_001',
        dccName: '테스트 용',
        connect_info: { type: 'socket', subType: '', host: 'localhost', port: 9000 },
      },
      {
        dccId: 'DCC_SSCS_001',
        dccName: '수중 태양광 장치 로거',
        connect_info: {
          type: 'zigbee',
          subType: 'xbee',
          baudRate: 9600,
          port: 'COM2',
          retryChance: 5,
        },
      },
      {
        dccId: 'DCC_CNT_001',
        dccName: '접속반 로거 A',
        connect_info: { type: 'modbus', subType: 'rtu', baudRate: 9600, port: 'COM5' },
      },
      {
        dccId: 'DCC_CNT_002',
        dccName: '접속반 로거 B',
        connect_info: { type: 'modbus', subType: 'rtu', baudRate: 9600, port: 'COM6' },
      },
      {
        dccId: 'DCC_CNT_003',
        dccName: '접속반 로거 C',
        connect_info: { type: 'modbus', subType: 'rtu', baudRate: 9600, port: 'COM7' },
      },
      {
        dccId: 'DCC_CNT_004',
        dccName: '접속반 로거 D',
        connect_info: { type: 'modbus', subType: 'rtu', baudRate: 9600, port: 'COM8' },
      },
      {
        dccId: 'DCC_IVT_001',
        dccName: '인버터 로거 A',
        connect_info: {
          type: 'serial',
          subType: 'parser',
          baudRate: 9600,
          port: 'COM11',
          addConfigInfo: {
            parser: 'delimiterParser',
            option: Buffer.from([0x04]),
          },
        },
      },
      {
        dccId: 'DCC_IVT_002',
        dccName: '인버터 로거 B',
        connect_info: {
          type: 'serial',
          subType: 'parser',
          baudRate: 9600,
          port: 'COM12',
          addConfigInfo: {
            parser: 'delimiterParser',
            option: Buffer.from([0x04]),
          },
        },
      },
      {
        dccId: 'DCC_IVT_003',
        dccName: '인버터 로거 C',
        connect_info: {
          type: 'serial',
          subType: 'parser',
          baudRate: 9600,
          port: 'COM13',
          addConfigInfo: {
            parser: 'delimiterParser',
            option: Buffer.from([0x04]),
          },
        },
      },
      {
        dccId: 'DCC_IVT_004',
        dccName: '인버터 로거 D',
        connect_info: {
          type: 'serial',
          subType: 'parser',
          baudRate: 9600,
          port: 'COM14',
          addConfigInfo: {
            parser: 'delimiterParser',
            option: Buffer.from([0x04]),
          },
        },
      },
    ],
    dpcConstructorList: [
      { dpcId: 'DPC_001', protocol_info: { mainCategory: 'UPSAS', subCategory: 'xbee' } },
      { dpcId: 'DPC_002', protocol_info: { mainCategory: 'UPSAS', subCategory: 'muan100kW' } },
      {
        dpcId: 'DPC_IVT_001',
        protocol_info: { mainCategory: 'Inverter', subCategory: 'hexPowerTriple' },
      },
      { dpcId: 'DPC_CNT_001', protocol_info: { mainCategory: 'Sensor', subCategory: 'CNT_dm_v1' } },
      {
        dpcId: 'DPC_CNT_002',
        protocol_info: { mainCategory: 'Sensor', subCategory: 'CNT_DK_v2.2' },
      },
    ],
    repeatNodeList: [
      {
        repeatId: 'RE_NODE_IVT',
        repeatCategory: 'node',
        nodeList: [
          {
            target_code: '001',
            target_name: '무안 100kW A (25kW 급)',
          },
          {
            target_code: '002',
            target_name: '무안 100kW B (25kW 급)',
          },
          {
            target_code: '003',
            target_name: '무안 100kW C (25kW 급)',
          },
          {
            target_code: '004',
            target_name: '무안 100kW D (25kW 급)',
          },
        ],
      },
      {
        repeatId: 'RE_PREFIX_IVT',
        repeatCategory: 'prefix',
        nodeList: [
          'IVT_PV_V',
          'IVT_PV_A',
          'IVT_PV_KW',
          'IVT_G_RS_V',
          'IVT_G_ST_V',
          'IVT_G_TR_V',
          'IVT_G_R_A',
          'IVT_G_S_A',
          'IVT_G_T_A',
          'IVT_G_L_F',
          'IVT_PW_PV_KW',
          'IVT_PW_G_KW',
          'IVT_PW_C_KWH',
          'IVT_TRB',
        ],
      },
      {
        repeatId: 'RE_NODE_CNT',
        repeatCategory: 'node',
        nodeList: [
          {
            target_code: '001',
            target_name: '무안 100kW A (25kW 급)',
          },
          {
            target_code: '002',
            target_name: '무안 100kW B (25kW 급)',
          },
          {
            target_code: '003',
            target_name: '무안 100kW C (25kW 급)',
          },
          {
            target_code: '004',
            target_name: '무안 100kW D (25kW 급)',
          },
        ],
      },
      {
        repeatId: 'RE_PREFIX_CNT',
        repeatCategory: 'prefix',
        nodeList: [
          'CNT_A_1CH',
          'CNT_V_1CH',
          'CNT_A_2CH',
          'CNT_V_2CH',
          'CNT_A_3CH',
          'CNT_V_3CH',
          'CNT_A_4CH',
          'CNT_V_4CH',
          'CNT_A_5CH',
          'CNT_V_5CH',
          'CNT_A_6CH',
          'CNT_V_6CH',
        ],
      },
    ],
    dataLoggerStructureList: [
      // 0001~
      {
        target_prefix: 'D_G',
        target_name: '수문 DL',
        dataLoggerDeviceList: [
          {
            serial_number: '0013A20040F70001',
            target_code: '001',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WD_001'],
          },
          {
            serial_number: '0013A20040F70002',
            target_code: '002',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WD_002'],
          },
          {
            serial_number: '0013A20040F70003',
            target_code: '003',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WD_003'],
          },
          {
            serial_number: '0013A20040F70004',
            target_code: '004',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WD_004'],
          },
          {
            serial_number: '0013A20040F70005',
            target_code: '005',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WD_005'],
          },
          {
            serial_number: '0013A20040F70006',
            target_code: '006',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WD_006'],
          },
          {
            serial_number: '0013A20040F70007',
            target_code: '007',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WD_007'],
          },
          {
            serial_number: '0013A20040F70008',
            target_code: '008',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WD_008'],
          },
        ],
      },
      // 0101 ~
      {
        target_prefix: 'D_GV',
        target_name: '게이트형 밸브',
        dataLoggerDeviceList: [
          {
            serial_number: '0013A20040F70101',
            target_code: '101',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_101'],
          },
          {
            serial_number: '0013A20040F70102',
            target_code: '102',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_102'],
          },
          {
            serial_number: '0013A20040F70103',
            target_code: '103',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_103'],
          },
          {
            serial_number: '0013A20040F70104',
            target_code: '104',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_104'],
          },
          {
            serial_number: '0013A20040F70105',
            target_code: '105',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_105'],
          },
          {
            serial_number: '0013A20040F70106',
            target_code: '106',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_106', 'S_002', 'WL_009', 'MRT_001', 'BT_001'],
          },
          {
            serial_number: '0013A20040F70107',
            target_code: '107',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_107'],
          },
          {
            serial_number: '0013A20040F70108',
            target_code: '108',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_108', 'S_003', 'WL_010', 'MRT_002'],
          },
          {
            serial_number: '0013A20040F70109',
            target_code: '109',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_109'],
          },
          {
            serial_number: '0013A20040F70110',
            target_code: '110',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_110', 'S_004', 'WL_011', 'MRT_003'],
          },
          {
            serial_number: '0013A20040F70111',
            target_code: '111',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_111'],
          },
          {
            serial_number: '0013A20040F70112',
            target_code: '112',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_112', 'S_005', 'WL_012', 'MRT_004'],
          },
          {
            serial_number: '0013A20040F70113',
            target_code: '113',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_113'],
          },
          {
            serial_number: '0013A20040F70114',
            target_code: '114',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_114', 'S_006', 'WL_013', 'MRT_005'],
          },
          {
            serial_number: '0013A20040F70115',
            target_code: '115',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_115'],
          },
          {
            serial_number: '0013A20040F70116',
            target_code: '116',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_116', 'S_007', 'WL_014', 'MRT_006'],
          },
          {
            serial_number: '0013A20040F70117',
            target_code: '117',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_117'],
          },
          {
            serial_number: '0013A20040F70118',
            target_code: '118',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_118', 'S_008', 'WL_015', 'MRT_007'],
          },
          {
            serial_number: '0013A20040F70119',
            target_code: '119',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_119'],
          },
          {
            serial_number: '0013A20040F70120',
            target_code: '120',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['GV_120', 'S_009', 'WL_016', 'MRT_008'],
          },
        ],
      },
      // 2001 ~
      {
        target_prefix: 'D_P',
        target_name: '펌프 DL',
        dataLoggerDeviceList: [
          {
            serial_number: '0013A20040F72001',
            target_code: '001',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['P_001'],
          },
          {
            serial_number: '0013A20040F72002',
            target_code: '002',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['P_002'],
          },
          {
            serial_number: '0013A20040F72003',
            target_code: '003',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['P_003'],
          },
          {
            serial_number: '0013A20040F72004',
            target_code: '004',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['P_004'],
          },
          {
            serial_number: '0013A20040F72005',
            target_code: '005',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['P_005'],
          },
          {
            serial_number: '0013A20040F72006',
            target_code: '006',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['P_006'],
          },
          {
            serial_number: '0013A20040F72007',
            target_code: '007',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['P_007'],
          },
          {
            serial_number: '0013A20040F72008',
            target_code: '008',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['P_008'],
          },
          {
            serial_number: '0013A20040F72009',
            target_code: '009',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['P_009'],
          },
          {
            serial_number: '0013A20040F72010',
            target_code: '010',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['P_010'],
          },
          {
            serial_number: '0013A20040F72011',
            target_code: '011',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['P_011'],
          },
          {
            serial_number: '0013A20040F72012',
            target_code: '012',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['P_012'],
          },
          {
            serial_number: '0013A20040F72013',
            target_code: '013',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['P_013'],
          },
        ],
      },
      // 1001 ~
      {
        target_prefix: 'D_S',
        target_name: '센서 ',
        dataLoggerDeviceList: [
          {
            serial_number: '0013A20040F71001',
            target_code: '001',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WL_001'],
          },
          {
            serial_number: '0013A20040F71002',
            target_code: '002',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WL_002'],
          },
          {
            serial_number: '0013A20040F71003',
            target_code: '003',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WL_003'],
          },
          {
            serial_number: '0013A20040F71004',
            target_code: '004',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['S_001', 'WL_004'],
          },
          {
            serial_number: '0013A20040F71005',
            target_code: '005',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WL_005'],
          },
          {
            serial_number: '0013A20040F71006',
            target_code: '006',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WL_006'],
          },
          {
            serial_number: '0013A20040F71007',
            target_code: '007',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WL_007'],
          },
          {
            serial_number: '0013A20040F71008',
            target_code: '008',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WL_008'],
          },
          {
            serial_number: '0013A20040F71009',
            target_code: '009',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WL_017'],
          },
          {
            serial_number: '0013A20040F71010',
            target_code: '010',
            isAddSerialNumberToDCC: false,
            dccId: 'DCC_SSCS_001',
            dpcId: 'DPC_002',
            nodeList: ['WL_018'],
          },
        ],
      },
      // TODO: 지략
      // FIXME: 접속반
      {
        target_prefix: 'D_IVT',
        target_name: '인버터 DL',
        dataLoggerDeviceList: [
          {
            target_name: 'A (25kW 급)',
            serial_number: '001',
            target_code: '001',
            dccId: 'DCC_IVT_001',
            dpcId: 'DPC_IVT_001',
            repeatId: 'RE_PREFIX_IVT',
          },
          {
            target_name: 'B (25kW 급)',
            serial_number: '002',
            target_code: '002',
            dccId: 'DCC_IVT_002',
            dpcId: 'DPC_IVT_001',
            repeatId: 'RE_PREFIX_IVT',
          },
          {
            target_name: 'C (25kW 급)',
            serial_number: '003',
            target_code: '003',
            dccId: 'DCC_IVT_003',
            dpcId: 'DPC_IVT_001',
            repeatId: 'RE_PREFIX_IVT',
          },
          {
            target_name: 'D (25kW 급)',
            serial_number: '004',
            target_code: '004',
            dccId: 'DCC_IVT_004',
            dpcId: 'DPC_IVT_001',
            repeatId: 'RE_PREFIX_IVT',
          },
        ],
      },
      {
        target_prefix: 'D_CNT',
        target_name: '접속반',
        dataLoggerDeviceList: [
          {
            serial_number: 1,
            target_code: '001',
            dccId: 'DCC_CNT_001',
            dpcId: 'DPC_CNT_002',
            repeatId: 'RE_PREFIX_CNT',
          },
          {
            serial_number: 2,
            target_code: '002',
            dccId: 'DCC_CNT_002',
            dpcId: 'DPC_CNT_002',
            repeatId: 'RE_PREFIX_CNT',
          },
          {
            serial_number: 3,
            target_code: '003',
            dccId: 'DCC_CNT_003',
            dpcId: 'DPC_CNT_002',
            repeatId: 'RE_PREFIX_CNT',
          },
          {
            serial_number: 4,
            target_code: '004',
            dccId: 'DCC_CNT_004',
            dpcId: 'DPC_CNT_002',
            repeatId: 'RE_PREFIX_CNT',
          },
        ],
      },
    ],
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
            target_id: 'brineTemperature',
            target_prefix: 'BT',
            target_name: '염수 온도',
            nodeList: [{ target_code: '001', axisScale: [0, 0], moveScale: [-1, 0] }],
          },
          {
            target_id: 'moduleRearTemperature',
            target_prefix: 'MRT',
            target_name: '모듈 뒷면 온도',
            description: null,
            nodeList: [
              { target_code: '001', axisScale: [0, 0], moveScale: [1, -2] },
              { target_code: '002', axisScale: [0, 0], moveScale: [1, -2] },
              { target_code: '003', axisScale: [0, 0], moveScale: [1, -2] },
              { target_code: '004', axisScale: [0, 0], moveScale: [1, -2] },
              { target_code: '005', axisScale: [0, 0], moveScale: [1, -2] },
              { target_code: '006', axisScale: [0, 0], moveScale: [1, -2] },
              { target_code: '007', axisScale: [0, 0], moveScale: [1, -2] },
              { target_code: '008', axisScale: [0, 0], moveScale: [1, -2] },
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
              { target_code: '002', axisScale: [0, 0], moveScale: [1, -3] },
              { target_code: '003', axisScale: [0, 0], moveScale: [1, -3] },
              { target_code: '004', axisScale: [0, 0], moveScale: [1, -3] },
              { target_code: '005', axisScale: [0, 0], moveScale: [1, -3] },
              { target_code: '006', axisScale: [0, 0], moveScale: [1, -3] },
              { target_code: '007', axisScale: [0, 0], moveScale: [1, -3] },
              { target_code: '008', axisScale: [0, 0], moveScale: [1, -3] },
              { target_code: '009', axisScale: [0, 0], moveScale: [1, -3] },
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
              { target_code: '005', axisScale: [0, 0], moveScale: [0, 2] },
              { target_code: '006', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '007', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '008', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '009', axisScale: [0, 0], moveScale: [-1, -1.5] },
              { target_code: '010', axisScale: [0, 0], moveScale: [-1, -1.5] },
              { target_code: '011', axisScale: [0, 0], moveScale: [-1, -1.5] },
              { target_code: '012', axisScale: [0, 0], moveScale: [-1, -1.5] },
              { target_code: '013', axisScale: [0, 0], moveScale: [-1, -1.5] },
              { target_code: '014', axisScale: [0, 0], moveScale: [-1, -1.5] },
              { target_code: '015', axisScale: [0, 0], moveScale: [-1, -1.5] },
              { target_code: '016', axisScale: [0, 0], moveScale: [-1, -1.5] },
              { target_code: '017', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '018', axisScale: [0, 0], moveScale: [0, 0] },
            ],
          },
        ],
      },
      {
        target_id: 'waterDoor',
        target_name: '수문',
        is_sensor: 0,
        defList: [
          {
            target_id: 'waterDoor',
            target_prefix: 'WD',
            target_name: '수문',
            nodeList: [
              { target_code: '001', axisScale: [0, 1], moveScale: [0, 0] },
              { target_code: '002', axisScale: [0, 1], moveScale: [2.4, 0.7] },
              { target_code: '003', axisScale: [0.5, 1], moveScale: [3.4, 0.7] },
              { target_code: '004', axisScale: [0, 1], moveScale: [0, 0] },
              { target_code: '005', axisScale: [1, 0], moveScale: [0, 0] },
              { target_code: '006', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '007', axisScale: [1, 0], moveScale: [0.25, -0.1] },
              { target_code: '008', axisScale: [0, 0], moveScale: [-0.1, -0.8] },
            ],
          },
        ],
      },
      {
        target_id: 'valve',
        target_name: '밸브',
        is_sensor: 0,
        defList: [
          {
            target_id: 'gateValve',
            target_prefix: 'GV',
            target_name: '수문 용 밸브',
            description: '파이프 관에 연결된 밸브, 직경 100A PVC 용 밸브',
            nodeList: [
              { target_code: '101', axisScale: [0, 0], moveScale: [-0.1, -0.2] },
              { target_code: '102', axisScale: [0, 0], moveScale: [-0.1, -0.2] },
              { target_code: '103', axisScale: [0, 0], moveScale: [-0.1, -0.2] },
              { target_code: '104', axisScale: [1, 0], moveScale: [-9, 0] },
              { target_code: '105', axisScale: [0, 0], moveScale: [-0.1, 0.5] },
              { target_code: '106', axisScale: [1, 0], moveScale: [0, 0] },
              { target_code: '107', axisScale: [0, 0], moveScale: [-0.1, 0.5] },
              { target_code: '108', axisScale: [1, 0], moveScale: [0, 0] },
              { target_code: '109', axisScale: [0, 0], moveScale: [-0.1, 0.5] },
              { target_code: '110', axisScale: [1, 0], moveScale: [0, 0] },
              { target_code: '111', axisScale: [0, 0], moveScale: [-0.1, 0.5] },
              { target_code: '112', axisScale: [1, 0], moveScale: [0, 0] },
              { target_code: '113', axisScale: [0, 0], moveScale: [-0.1, 0.5] },
              { target_code: '114', axisScale: [1, 0], moveScale: [0, 0] },
              { target_code: '115', axisScale: [0, 0], moveScale: [-0.1, 0.5] },
              { target_code: '116', axisScale: [1, 0], moveScale: [0, 0] },
              { target_code: '117', axisScale: [0, 0], moveScale: [-0.1, 0.5] },
              { target_code: '118', axisScale: [1, 0], moveScale: [0, 0] },
              { target_code: '119', axisScale: [0, 0], moveScale: [-0.1, 0.5] },
              { target_code: '120', axisScale: [1, 0], moveScale: [0, 0] },
            ],
          },
        ],
      },
      {
        target_id: 'pump',
        target_name: '펌프',
        is_sensor: 0,
        defList: [
          {
            target_id: 'pump',
            target_prefix: 'P',
            target_name: '펌프',
            nodeList: [
              { target_code: '001', axisScale: [1, 1], moveScale: [-7.2, 0] },
              { target_code: '002', axisScale: [0, 1], moveScale: [0, 0] },
              { target_code: '003', axisScale: [0.5, 0], moveScale: [0, 0] },
              { target_code: '004', axisScale: [0, 1], moveScale: [1.7, 0] },
              { target_code: '005', axisScale: [0, 1], moveScale: [2.9, 0] },
              { target_code: '006', axisScale: [0, 1], moveScale: [4.1, 0] },
              { target_code: '007', axisScale: [0, 1], moveScale: [5.2, 0] },
              { target_code: '008', axisScale: [1, 1], moveScale: [0, 0] },
              { target_code: '009', axisScale: [0, 1], moveScale: [-0.1, 0] },
              { target_code: '010', axisScale: [0, 1], moveScale: [1.1, 0] },
              { target_code: '011', axisScale: [0, 1], moveScale: [2.3, 0] },
              { target_code: '012', axisScale: [0, 1], moveScale: [0.3, 0] },
              { target_code: '013', axisScale: [0, 1], moveScale: [0, 0] },
            ],
          },
        ],
      },
      {
        target_id: 'outlet',
        target_name: '배출구',
        is_sensor: -1,
        save_db_type: NONE,
        description: '펌프의 배수구를 표현하기 위한 SVG 용 Element',
        defList: [
          {
            target_id: 'outlet',
            target_prefix: 'O',
            target_name: '배출구',
            nodeList: [
              { target_code: '001', axisScale: [1, 1], moveScale: [-2, 0] },
              { target_code: '002', axisScale: [1, 0], moveScale: [-2.4, 0] },
              { target_code: '003', axisScale: [0.2, 1], moveScale: [0.4, 0] },
              { target_code: '004', axisScale: [1, 0], moveScale: [-1.2, 0] },
              { target_code: '005', axisScale: [1, 0], moveScale: [-1.2, 0] },
              { target_code: '006', axisScale: [1, 0], moveScale: [-1.8, 0] },
              { target_code: '007', axisScale: [1, 0], moveScale: [-1.7, 0] },
              { target_code: '008', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '009', axisScale: [0, 0], moveScale: [0, 0] },
              { target_code: '010', axisScale: [0, 0], moveScale: [0.5, 0] },
              { target_code: '011', axisScale: [0, 0], moveScale: [1, 0] },
              { target_code: '012', axisScale: [1, 0.5], moveScale: [0, 1.2] },
              { target_code: '013', axisScale: [1, 0], moveScale: [-0.2, 0] },
            ],
          },
        ],
      },
      {
        target_id: 'groundRelay',
        target_name: '지락 계전기',
        is_sensor: 1,
        defList: [
          {
            target_id: 'isConnectorGroundRelay',
            target_prefix: 'CGR',
            target_name: '접속반 지락 계전기',
            nodeList: [],
          },
        ],
      },
      // FIXME: 전류, 전압
      {
        target_id: 'vol',
        target_name: '전압',
        is_sensor: 2,
        save_db_type: BLOCK,
        data_unit: 'V',
        description: null,
        defList: [
          {
            target_id: 'volCh1',
            target_name: '접속반 1 CH 전압',
            target_prefix: 'CNT_V_1CH',
            repeatId: 'RE_NODE_CNT',
          },
          {
            target_id: 'volCh2',
            target_name: '접속반 2 CH 전압',
            target_prefix: 'CNT_V_2CH',
            repeatId: 'RE_NODE_CNT',
          },
          {
            target_id: 'volCh3',
            target_name: '접속반 3 CH 전압',
            target_prefix: 'CNT_V_3CH',
            repeatId: 'RE_NODE_CNT',
          },
          {
            target_id: 'volCh4',
            target_name: '접속반 4 CH 전압',
            target_prefix: 'CNT_V_4CH',
            repeatId: 'RE_NODE_CNT',
          },
          {
            target_id: 'volCh5',
            target_name: '접속반 5 CH 전압',
            target_prefix: 'CNT_V_5CH',
            repeatId: 'RE_NODE_CNT',
          },
          {
            target_id: 'volCh6',
            target_name: '접속반 6 CH 전압',
            target_prefix: 'CNT_V_6CH',
            repeatId: 'RE_NODE_CNT',
          },
          {
            target_id: 'pvVol',
            target_name: '인버터 PV 전압',
            target_prefix: 'IVT_PV_V',
            repeatId: 'RE_NODE_IVT',
          },
          {
            target_id: 'gridRsVol',
            target_name: 'RS 선간 전압',
            target_prefix: 'IVT_G_RS_V',
            repeatId: 'RE_NODE_IVT',
          },
          {
            target_id: 'gridStVol',
            target_name: 'ST 선간 전압',
            target_prefix: 'IVT_G_ST_V',
            repeatId: 'RE_NODE_IVT',
          },
          {
            target_id: 'gridTrVol',
            target_name: 'TR 선간 전압',
            target_prefix: 'IVT_G_TR_V',
            repeatId: 'RE_NODE_IVT',
          },
        ],
      },
      {
        target_id: 'amp',
        target_name: '전류',
        is_sensor: 2,
        save_db_type: BLOCK,
        data_unit: 'A',
        description: null,
        defList: [
          {
            target_id: 'ampCh1',
            target_name: '접속반 1 CH 전류',
            target_prefix: 'CNT_A_1CH',
            repeatId: 'RE_NODE_CNT',
          },
          {
            target_id: 'ampCh2',
            target_name: '접속반 2 CH 전류',
            target_prefix: 'CNT_A_2CH',
            repeatId: 'RE_NODE_CNT',
          },
          {
            target_id: 'ampCh3',
            target_name: '접속반 3 CH 전류',
            target_prefix: 'CNT_A_3CH',
            repeatId: 'RE_NODE_CNT',
          },
          {
            target_id: 'ampCh4',
            target_name: '접속반 4 CH 전류',
            target_prefix: 'CNT_A_4CH',
            repeatId: 'RE_NODE_CNT',
          },
          {
            target_id: 'ampCh5',
            target_name: '접속반 5 CH 전류',
            target_prefix: 'CNT_A_5CH',
            repeatId: 'RE_NODE_CNT',
          },
          {
            target_id: 'ampCh6',
            target_name: '접속반 6 CH 전류',
            target_prefix: 'CNT_A_6CH',
            repeatId: 'RE_NODE_CNT',
          },
          {
            target_id: 'pvAmp',
            target_name: '인버터 PV 전류',
            target_prefix: 'IVT_PV_A',
            repeatId: 'RE_NODE_IVT',
          },
          {
            target_id: 'gridRAmp',
            target_name: '인버터 R상 전류',
            target_prefix: 'IVT_G_R_A',
            repeatId: 'RE_NODE_IVT',
          },
          {
            target_id: 'gridSAmp',
            target_name: '인버터 S상 전류',
            target_prefix: 'IVT_G_S_A',
            repeatId: 'RE_NODE_IVT',
          },
          {
            target_id: 'gridTAmp',
            target_name: '인버터 T상 전류',
            target_prefix: 'IVT_G_T_A',
            repeatId: 'RE_NODE_IVT',
          },
        ],
      },
      {
        target_id: 'kW',
        target_name: '전력량',
        is_sensor: 2,
        save_db_type: BLOCK,
        data_unit: 'kW',
        description: '1 킬로와트(기호 kW)는 1 초 동안의 1,000 줄(N·m)에 해당하는 일률의 SI 단위',
        defList: [
          {
            target_id: 'pvKw',
            target_name: '인버터 PV 출력',
            target_prefix: 'IVT_PV_KW',
            description: 'PV',
            repeatId: 'RE_NODE_IVT',
          },
          {
            target_id: 'powerGridKw',
            target_name: '인버터 현재 전력',
            target_prefix: 'IVT_PW_G_KW',
            description: 'Power',
            repeatId: 'RE_NODE_IVT',
          },
        ],
      },
      {
        target_id: 'kWh',
        target_name: '전력량',
        is_sensor: 2,
        save_db_type: BLOCK,
        data_unit: 'kWh',
        description: '시간당 에너지 단위, 1 kW의 일률로 1 시간 동안 하는 일의 양',
        defList: [
          {
            target_id: 'powerDailyKwh',
            target_name: '인버터 하루 발전량',
            target_prefix: 'IVT_PW_D_KWH',
            repeatId: 'RE_NODE_IVT',
          },
          {
            target_id: 'powerCpKwh',
            target_name: '인버터 누적 발전량',
            target_prefix: 'IVT_PW_C_KWH',
            description: 'Cumulative Power Generation',
            repeatId: 'RE_NODE_IVT',
          },
        ],
      },
      {
        target_id: 'frequency',
        target_name: '주파수',
        is_sensor: 2,
        save_db_type: BLOCK,
        data_unit: 'Hz',
        defList: [
          {
            target_id: 'gridLf',
            target_name: '계통 주파수',
            target_prefix: 'IVT_G_L_F',
            repeatId: 'RE_NODE_IVT',
          },
        ],
      },
      {
        target_id: 'trouble',
        target_name: '오류 목록',
        is_sensor: 2,
        save_db_type: TROUBLE,
        description: '장치에서 보내오는 이상 데이터',
        defList: [
          {
            target_id: 'operTroubleList',
            target_name: '인버터 에러',
            target_prefix: 'IVT_TRB',
            repeatId: 'RE_NODE_IVT',
          },
        ],
      },
    ],
  },
  relationInfo: {
    placeRelationList: [
      // 인버터 / 접속반 장소
      {
        target_id: 'inverter',
        target_name: '인버터',
        description: '인버터를 설치한 공간',
        defList: [
          {
            target_id: 'inverter',
            target_prefix: 'P_IVT',
            placeList: [
              {
                target_code: '001',
                target_name: 'SK 쏠라 (25kW 급)',
                chart_color: '#212529',
                chart_sort_rank: 1,
                repeatId: 'RE_PREFIX_IVT',
              },
              {
                target_code: '002',
                target_name: '쏠라 테크 A (25kW 급)',
                chart_color: '#fcc2d7',
                chart_sort_rank: 2,
                repeatId: 'RE_PREFIX_IVT',
              },
              {
                target_code: '003',
                target_name: '쏠라 테크 B (25kW 급)',
                chart_color: '#d0bfff',
                chart_sort_rank: 3,
                repeatId: 'RE_PREFIX_IVT',
              },
              {
                target_code: '004',
                target_name: '쏠라 테크 C (25kW 급)',
                chart_color: '#99e9f2',
                chart_sort_rank: 4,
                repeatId: 'RE_PREFIX_IVT',
              },
            ],
          },
        ],
      },
      {
        target_id: 'connector',
        target_name: '접속반',
        defList: [
          {
            target_id: 'connector',
            target_prefix: 'P_CNT',
            placeList: [
              {
                target_code: '001',
                target_name: 'SK 쏠라 (25kW 급)',
                chart_sort_rank: 1,
                chart_color: '#212529',
                repeatId: 'RE_PREFIX_CNT',
              },
              {
                target_code: '002',
                target_name: '쏠라테크 A (25kW 급)',
                chart_color: '#fcc2d7',
                chart_sort_rank: 2,
                repeatId: 'RE_PREFIX_CNT',
              },
              {
                target_code: '003',
                target_name: '쏠라테크 B (25kW 급)',
                chart_color: '#d0bfff',
                chart_sort_rank: 3,
                repeatId: 'RE_PREFIX_CNT',
              },
              {
                target_code: '004',
                target_name: '쏠라테크 C (25kW 급)',
                chart_color: '#99e9f2',
                chart_sort_rank: 4,
                repeatId: 'RE_PREFIX_CNT',
              },
            ],
          },
        ],
      },
      // 수중 태양광 장소
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
                nodeList: ['S_002', 'WL_009', 'MRT_001', 'BT_001', 'O_004'],
                depth: 5,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 10,
                        isCall: false,
                      },
                      upperLimitValue: {
                        value: 7,
                        isCall: false,
                      },
                      setValue: {
                        value: 5,
                      },
                      lowerLimitValue: {
                        value: 2.9,
                        isCall: true,
                      },
                      minValue: {
                        value: 1,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_2'],
                      putPlaceRankList: ['BW_2', 'SEA'],
                    },
                    {
                      ndId: 'salinity',
                      upperLimitValue: {
                        value: 10.5,
                        isCall: false,
                        isGroup: true,
                      },
                      putPlaceRankList: ['BW_3', 'BW_2'],
                      groupPlaceList: ['SEB_1', 'SEB_2', 'SEB_3', 'SEB_4', 'SEB_5'],
                    },
                    {
                      ndId: 'moduleRearTemperature',
                      upperLimitValue: {
                        value: 40,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_2'],
                      putPlaceRankList: ['BW_2'],
                    },
                  ],
                  placeSize: { width: 356, height: 2800, depth: 15 },
                },
              },
              {
                target_code: '2',
                nodeList: ['S_003', 'WL_010', 'MRT_002', 'O_005'],
                depth: 5,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 10,
                        isCall: false,
                      },
                      upperLimitValue: {
                        value: 7,
                        isCall: false,
                      },
                      setValue: {
                        value: 5,
                      },
                      lowerLimitValue: {
                        value: 2.9,
                        isCall: true,
                      },
                      minValue: {
                        value: 1,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_2'],
                      putPlaceRankList: ['BW_2', 'SEA'],
                    },
                    {
                      ndId: 'salinity',
                      upperLimitValue: {
                        value: 10.5,
                        isCall: false,
                        isGroup: true,
                      },
                      putPlaceRankList: ['BW_3', 'BW_2'],
                      groupPlaceList: ['SEB_1', 'SEB_2', 'SEB_3', 'SEB_4', 'SEB_5'],
                    },
                    {
                      ndId: 'moduleRearTemperature',
                      upperLimitValue: {
                        value: 40,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_2'],
                      putPlaceRankList: ['BW_2'],
                    },
                  ],
                  placeSize: { width: 356, height: 2800, depth: 15 },
                },
              },
              {
                target_code: '3',
                nodeList: ['S_004', 'WL_011', 'MRT_003', 'O_006'],
                depth: 5,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 10,
                        isCall: false,
                      },
                      upperLimitValue: {
                        value: 7,
                        isCall: false,
                      },
                      setValue: {
                        value: 5,
                      },
                      lowerLimitValue: {
                        value: 2.9,
                        isCall: true,
                      },
                      minValue: {
                        value: 1,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_2'],
                      putPlaceRankList: ['BW_2', 'SEA'],
                    },
                    {
                      ndId: 'salinity',
                      upperLimitValue: {
                        value: 10.5,
                        isCall: false,
                        isGroup: true,
                      },
                      putPlaceRankList: ['BW_3', 'BW_2'],
                      groupPlaceList: ['SEB_1', 'SEB_2', 'SEB_3', 'SEB_4', 'SEB_5'],
                    },
                    {
                      ndId: 'moduleRearTemperature',
                      upperLimitValue: {
                        value: 40,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_2'],
                      putPlaceRankList: ['BW_2'],
                    },
                  ],
                  placeSize: { width: 356, height: 2800, depth: 15 },
                },
              },
              {
                target_code: '4',
                nodeList: ['S_005', 'WL_012', 'MRT_004', 'O_007'],
                depth: 5,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 10,
                        isCall: false,
                      },
                      upperLimitValue: {
                        value: 7,
                        isCall: false,
                      },
                      setValue: {
                        value: 5,
                      },
                      lowerLimitValue: {
                        value: 2.9,
                        isCall: true,
                      },
                      minValue: {
                        value: 1,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_2'],
                      putPlaceRankList: ['BW_2', 'SEA'],
                    },
                    {
                      ndId: 'salinity',
                      upperLimitValue: {
                        value: 10.5,
                        isCall: false,
                        isGroup: true,
                      },
                      putPlaceRankList: ['BW_3', 'BW_2'],
                      groupPlaceList: ['SEB_1', 'SEB_2', 'SEB_3', 'SEB_4', 'SEB_5'],
                    },
                    {
                      ndId: 'moduleRearTemperature',
                      upperLimitValue: {
                        value: 40,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_2'],
                      putPlaceRankList: ['BW_2'],
                    },
                  ],
                  placeSize: { width: 356, height: 2800, depth: 15 },
                },
              },
              {
                target_code: '5',
                nodeList: ['S_006', 'WL_013', 'MRT_005', 'O_008'],
                depth: 5,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 10,
                        isCall: false,
                      },
                      upperLimitValue: {
                        value: 7,
                        isCall: false,
                      },
                      setValue: {
                        value: 5,
                      },
                      lowerLimitValue: {
                        value: 2.9,
                        isCall: true,
                      },
                      minValue: {
                        value: 1,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_2'],
                      putPlaceRankList: ['BW_2', 'SEA'],
                    },
                    {
                      ndId: 'salinity',
                      upperLimitValue: {
                        value: 10.5,
                        isCall: false,
                        isGroup: true,
                      },
                      putPlaceRankList: ['BW_3', 'BW_2'],
                      groupPlaceList: ['SEB_1', 'SEB_2', 'SEB_3', 'SEB_4', 'SEB_5'],
                    },
                    {
                      ndId: 'moduleRearTemperature',
                      upperLimitValue: {
                        value: 40,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_2'],
                      putPlaceRankList: ['BW_2'],
                    },
                  ],
                  placeSize: { width: 356, height: 2800, depth: 15 },
                },
              },
              {
                target_code: '6',
                nodeList: ['S_007', 'WL_014', 'MRT_006', 'O_009'],
                depth: 5,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 10,
                        isCall: false,
                      },
                      upperLimitValue: {
                        value: 7,
                        isCall: false,
                      },
                      setValue: {
                        value: 5,
                      },
                      lowerLimitValue: {
                        value: 2.9,
                        isCall: true,
                      },
                      minValue: {
                        value: 1,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_3'],
                      putPlaceRankList: ['BW_3', 'SEA'],
                    },
                    {
                      ndId: 'salinity',
                      upperLimitValue: {
                        value: 18,
                        isCall: false,
                        isGroup: true,
                      },
                      putPlaceRankList: ['BW_4', 'BW_3'],
                      groupPlaceList: ['SEB_6', 'SEB_7', 'SEB_8'],
                    },
                    {
                      ndId: 'moduleRearTemperature',
                      upperLimitValue: {
                        value: 40,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_3'],
                      putPlaceRankList: ['BW_3'],
                    },
                  ],
                  placeSize: { width: 356, height: 2800, depth: 15 },
                },
              },
              {
                target_code: '7',
                nodeList: ['S_008', 'WL_015', 'MRT_007', 'O_010'],
                depth: 5,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 10,
                        isCall: false,
                      },
                      upperLimitValue: {
                        value: 7,
                        isCall: false,
                      },
                      setValue: {
                        value: 5,
                      },
                      lowerLimitValue: {
                        value: 2.9,
                        isCall: true,
                      },
                      minValue: {
                        value: 1,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_3'],
                      putPlaceRankList: ['BW_3', 'SEA'],
                    },
                    {
                      ndId: 'salinity',
                      upperLimitValue: {
                        value: 18,
                        isCall: false,
                        isGroup: true,
                      },
                      putPlaceRankList: ['BW_4', 'BW_3'],
                      groupPlaceList: ['SEB_6', 'SEB_7', 'SEB_8'],
                    },
                    {
                      ndId: 'moduleRearTemperature',
                      upperLimitValue: {
                        value: 40,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_3'],
                      putPlaceRankList: ['BW_3'],
                    },
                  ],
                  placeSize: { width: 356, height: 2800, depth: 15 },
                },
              },
              {
                target_code: '8',
                nodeList: ['S_009', 'WL_016', 'MRT_008', 'O_011'],
                depth: 5,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 10,
                        isCall: false,
                      },
                      upperLimitValue: {
                        value: 7,
                        isCall: false,
                      },
                      setValue: {
                        value: 5,
                      },
                      lowerLimitValue: {
                        value: 2.9,
                        isCall: true,
                      },
                      minValue: {
                        value: 1,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_3'],
                      putPlaceRankList: ['BW_3', 'SEA'],
                    },
                    {
                      ndId: 'salinity',
                      upperLimitValue: {
                        value: 18,
                        isCall: false,
                        isGroup: true,
                      },
                      putPlaceRankList: ['BW_4', 'BW_3'],
                      groupPlaceList: ['SEB_6', 'SEB_7', 'SEB_8'],
                    },
                    {
                      ndId: 'moduleRearTemperature',
                      upperLimitValue: {
                        value: 40,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_3'],
                      putPlaceRankList: ['BW_3'],
                    },
                  ],
                  placeSize: { width: 356, height: 2800, depth: 15 },
                },
              },
            ],
          },
          {
            target_id: 'normalEvaporationBlock',
            target_prefix: 'NEB',
            target_name: '일반 증발지',
            placeList: [
              {
                target_code: '1',
                nodeList: ['WD_001', 'WD_002', 'WD_003', 'WL_003', 'O_002'],
                depth: 5,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 20,
                      },
                      setValue: {
                        value: 10,
                      },
                      lowerLimitValue: {
                        value: 3,
                        isCall: true,
                      },
                      minValue: {
                        value: 2,
                        isCall: true,
                      },
                      callPlaceRankList: ['RV_1'],
                      putPlaceRankList: ['NEB_2'],
                    },
                  ],
                  placeSize: { width: 2500, height: 2000, depth: 20 },
                },
              },
              {
                target_code: '2',
                nodeList: ['WD_002', 'WD_003', 'WD_004', 'S_001', 'WL_004', 'O_003'],
                depth: 4,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 20,
                      },
                      setValue: {
                        value: 12,
                      },
                      lowerLimitValue: {
                        value: 3,
                        isCall: true,
                      },
                      minValue: {
                        value: 2,
                        isCall: true,
                      },
                      callPlaceRankList: ['BW_1', 'NEB_1'],
                      putPlaceRankList: ['BW_1', 'SEA'],
                    },
                    {
                      ndId: 'salinity',
                      upperLimitValue: {
                        value: 6,
                        isCall: false,
                      },
                      putPlaceRankList: ['BW_2', 'BW_1'],
                    },
                  ],
                  placeSize: { width: 2500, height: 1000, depth: 20 },
                },
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
                nodeList: ['WL_017', 'O_012'],
                depth: 0,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 10,
                      },
                      setValue: {
                        value: 5,
                      },
                      minValue: {
                        value: 1,
                      },
                      callPlaceRankList: ['BW_5'],
                      putPlaceRankList: ['BW_5', 'SEA'],
                    },
                  ],
                  placeSize: { width: 800, height: 1000, depth: 20 },
                },
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
                nodeList: ['WD_005', 'P_003', 'WL_005'],
                depth: -1,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 150,
                      },
                      minValue: {
                        value: 10,
                      },
                      callPlaceRankList: ['NEB_2'],
                      putPlaceRankList: ['NEB_2'],
                    },
                  ],
                  placeSize: { width: 1200, height: 300, depth: 150 },
                },
              },
              {
                target_code: '2',
                nodeList: ['WD_006', 'P_004', 'P_005', 'P_006', 'P_007', 'P_008', 'WL_006'],
                depth: -1,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 150,
                      },
                      minValue: {
                        value: 10,
                      },
                      callPlaceRankList: ['NEB_2'],
                      putPlaceRankList: ['SEB_1', 'SEB_2', 'SEB_3', 'SEB_4', 'SEB_5'],
                    },
                  ],
                  placeSize: { width: 900, height: 300, depth: 150 },
                },
              },
              {
                target_code: '3',
                nodeList: ['P_009', 'P_010', 'P_011', 'WL_007'],
                depth: -1,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 150,
                      },
                      minValue: {
                        value: 10,
                      },
                      callPlaceRankList: [['SEB_1', 'SEB_2', 'SEB_3', 'SEB_4', 'SEB_5']],
                      putPlaceRankList: ['SEB_6', 'SEB_7', 'SEB_8'],
                    },
                  ],
                  placeSize: { width: 400, height: 300, depth: 150 },
                },
              },
              {
                target_code: '4',
                nodeList: ['P_012', 'WL_008'],
                depth: -1,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 150,
                      },
                      minValue: {
                        value: 10,
                      },
                      callPlaceRankList: [['SEB_6', 'SEB_7', 'SEB_8']],
                      putPlaceRankList: ['BW_5'],
                    },
                  ],
                  placeSize: { width: 400, height: 300, depth: 150 },
                },
              },
              {
                target_code: '5',
                nodeList: ['P_013', 'WL_018', 'O_013'],
                depth: -1,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 150,
                      },
                      minValue: {
                        value: 10,
                      },
                      callPlaceRankList: ['BW_5'],
                      putPlaceRankList: ['NCB_1'],
                    },
                  ],
                  placeSize: { width: 500, height: 300, depth: 150 },
                },
              },
              {
                target_code: '6',
                nodeList: [],
                depth: -1,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 150,
                      },
                      minValue: {
                        value: 10,
                      },
                      callPlaceRankList: [],
                      putPlaceRankList: [],
                    },
                  ],
                  placeSize: { width: 500, height: 300, depth: 150 },
                },
              },
            ],
          },
        ],
      },
      {
        target_id: 'reservoir',
        target_name: '저수지',
        description: null,
        defList: [
          {
            target_id: 'reservoir',
            target_prefix: 'RV',
            target_name: '저수지',
            placeList: [
              {
                target_code: '1',
                nodeList: ['P_001', 'WL_001', 'O_001'],
                depth: -1,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 200,
                      },
                      minValue: { value: 10 },
                      callPlaceRankList: ['RV_2'],
                      putPlaceRankList: ['NEB_1'],
                    },
                  ],
                  placeSize: { width: 4800, height: 570, depth: 200 },
                },
              },
              {
                target_code: '2',
                nodeList: ['P_002', 'WL_002'],
                depth: -1,
                place_info: {
                  thresholdConfigList: [
                    {
                      ndId: 'waterLevel',
                      maxValue: {
                        value: 200,
                      },
                      minValue: {
                        value: 10,
                      },
                      callPlaceRankList: [],
                      putPlaceRankList: ['RV_1'],
                    },
                  ],
                  placeSize: { width: 4800, height: 570, depth: 200 },
                },
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
                depth: -1,
                nodeList: [],
                place_info: {},
              },
            ],
          },
        ],
      },
      {
        target_id: 'drainage',
        target_name: '배수지',
        description: null,
        defList: [
          {
            target_id: 'drainage',
            target_prefix: 'D',
            target_name: '배수지',
            placeList: [
              {
                target_code: '',
                depth: -1,
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
            placeList: [
              {
                target_code: '001',
                nodeList: [],
                depth: 0.2,
              },
              {
                target_code: '002',
                nodeList: [],
                depth: 0.3,
              },
              {
                target_code: '003',
                nodeList: [],
                depth: 0.3,
              },
              {
                target_code: '004',
                nodeList: [],
                depth: 0.6,
              },
              {
                target_code: '005',
                nodeList: [],
                depth: 0.5,
              },
              {
                target_code: '006',
                nodeList: [],
                depth: 0.4,
              },
              {
                target_code: '007',
                nodeList: [],
                depth: 0.5,
              },
              //   {
              //     target_code: '008',
              //     nodeList: ['WD_005'],
              //     depth: 0.4,
              //   },
              {
                target_code: '009',
                nodeList: [],
                depth: 0.5,
              },
              {
                target_code: '010',
                nodeList: ['WD_005'],
                depth: 0.3,
              },
              {
                target_code: '011',
                nodeList: ['WD_005'],
                depth: 0.4,
              },
              {
                target_code: '012',
                nodeList: [],
                depth: 0.5,
              },
              {
                target_code: '013',
                nodeList: ['WD_006'],
                depth: 0.3,
              },
              {
                target_code: '014',
                nodeList: [],
                depth: 0.8,
              },
              {
                target_code: '015',
                nodeList: ['WD_007'],
                depth: 0.8,
              },
              {
                target_code: '016',
                nodeList: ['WD_008'],
                depth: 0.7,
              },
              {
                target_code: '017',
                nodeList: ['GV_101'],
                depth: 0.5,
              },
              {
                target_code: '018',
                nodeList: ['GV_102'],
                depth: 0.5,
              },
              {
                target_code: '019',
                nodeList: ['GV_103'],
                depth: 0.5,
              },
              {
                target_code: '020',
                nodeList: ['GV_104'],
                depth: 0.6,
              },
              {
                target_code: '021',
                nodeList: ['GV_105'],
                depth: 0.8,
              },
              {
                target_code: '022',
                nodeList: ['GV_106'],
                depth: 0.7,
              },
              {
                target_code: '023',
                nodeList: ['GV_107'],
                depth: 0.8,
              },
              {
                target_code: '024',
                nodeList: ['GV_108'],
                depth: 0.7,
              },
              {
                target_code: '025',
                nodeList: ['GV_109'],
                depth: 0.8,
              },
              {
                target_code: '026',
                nodeList: ['GV_110'],
                depth: 0.7,
              },
              {
                target_code: '027',
                nodeList: ['GV_111'],
                depth: 0.8,
              },
              {
                target_code: '028',
                nodeList: ['GV_112'],
                depth: 0.7,
              },
              {
                target_code: '029',
                nodeList: ['GV_113'],
                depth: 0.8,
              },
              {
                target_code: '030',
                nodeList: ['GV_114'],
                depth: 0.7,
              },
              {
                target_code: '031',
                nodeList: ['GV_115'],
                depth: 0.8,
              },
              {
                target_code: '032',
                nodeList: ['GV_116'],
                depth: 0.7,
              },
              {
                target_code: '033',
                nodeList: ['GV_117'],
                depth: 0.8,
              },
              {
                target_code: '034',
                nodeList: ['GV_118'],
                depth: 0.7,
              },
              {
                target_code: '035',
                nodeList: ['GV_119'],
                depth: 0.8,
              },
              {
                target_code: '036',
                nodeList: ['GV_120'],
                depth: 0.7,
              },
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
              //   { target_code: '001', nodeList: ['P_001', 'O_001'] },
              //   { target_code: '002', nodeList: ['P_002'] },
              { target_code: '003', nodeList: ['P_001', 'O_002'] },
              { target_code: '004', nodeList: ['P_003', 'O_003'] },
              { target_code: '005', nodeList: ['P_004'] },
              { target_code: '006', nodeList: [] },
              { target_code: '007', nodeList: ['O_004'] },
              { target_code: '008', nodeList: ['P_005'] },
              { target_code: '009', nodeList: [] },
              { target_code: '010', nodeList: ['O_005'] },
              { target_code: '011', nodeList: ['P_006'] },
              { target_code: '012', nodeList: [] },
              { target_code: '013', nodeList: ['O_006'] },
              { target_code: '014', nodeList: ['P_007'] },
              { target_code: '015', nodeList: [] },
              { target_code: '016', nodeList: ['O_007'] },
              { target_code: '017', nodeList: ['P_008'] },
              { target_code: '018', nodeList: [] },
              { target_code: '019', nodeList: ['O_008'] },
              { target_code: '020', nodeList: ['P_009'] },
              { target_code: '021', nodeList: [] },
              { target_code: '022', nodeList: ['O_009'] },
              { target_code: '023', nodeList: ['P_010'] },
              { target_code: '024', nodeList: [] },
              { target_code: '025', nodeList: ['O_010'] },
              { target_code: '026', nodeList: ['P_011'] },
              { target_code: '027', nodeList: [] },
              { target_code: '028', nodeList: ['O_011'] },
              { target_code: '029', nodeList: ['P_012'] },
              { target_code: '030', nodeList: [] },
              { target_code: '031', nodeList: ['O_013'] },
              { target_code: '032', nodeList: ['P_013', 'O_012'] },
              { target_code: '033', nodeList: ['P_002'] },
              { target_code: '034', nodeList: [] },
              { target_code: '035', nodeList: ['O_001'] },
            ],
          },
        ],
      },
    ],
    smartSalternInfo: {
      pipeConnectionRelationList: [
        { currNode: 'P_001', parentNodes: [], childNodes: ['O_002'] },
        { currNode: 'P_002', parentNodes: [], childNodes: ['O_001'] },
        { currNode: 'P_003', parentNodes: [], childNodes: ['O_003'] },
        { currNode: 'P_004', parentNodes: [], childNodes: ['O_004'] },
        { currNode: 'P_005', parentNodes: [], childNodes: ['O_005'] },
        { currNode: 'P_006', parentNodes: [], childNodes: ['O_006'] },
        { currNode: 'P_007', parentNodes: [], childNodes: ['O_007'] },
        { currNode: 'P_008', parentNodes: [], childNodes: ['O_008'] },
        { currNode: 'P_009', parentNodes: [], childNodes: ['O_009'] },
        { currNode: 'P_010', parentNodes: [], childNodes: ['O_010'] },
        { currNode: 'P_011', parentNodes: [], childNodes: ['O_011'] },
        { currNode: 'P_012', parentNodes: [], childNodes: ['O_013'] },
        { currNode: 'P_013', parentNodes: [], childNodes: ['O_012'] },
      ],
    },
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
        targetIdList: ['D'],
        resourceIdList: ['drainage'],
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
      // pe 수로
      {
        targetIdList: [
          'WW_008',
          'WW_009',
          'WW_010',
          'WW_011',
          'WW_012',
          'WW_013',
          'WW_014',
          'WW_015',
          'WW_016',
          'WW_017',
          'WW_018',
          'WW_019',
        ],
        resourceIdList: ['peWaterWay'],
      },
      // 해주 모듈 사이 수로
      {
        targetIdList: [
          'WW_020',
          'WW_021',
          'WW_022',
          'WW_023',
          'WW_024',
          'WW_025',
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
        ],
        resourceIdList: ['waterWay_B'],
      },
      // 파이프 주황
      {
        targetIdList: [
          // 'PL_001',
          // 'PL_002',
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
          'PL_032',
          'PL_033',
          'PL_034',
          'PL_035',
        ],
        resourceIdList: ['pipeLine_A'],
      },
      //  파이프  보라
      {
        targetIdList: ['PL_029', 'PL_030', 'PL_031'],
        resourceIdList: ['pipeLine_B'],
      },
      // 수중 펌프
      {
        targetIdList: [
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
        targetIdList: ['P_001', 'P_002', 'P_003'],
        resourceIdList: ['overPump'],
      },
      {
        targetIdList: [
          'GV_101',
          'GV_102',
          'GV_103',
          'GV_104',
          'GV_105',
          'GV_106',
          'GV_107',
          'GV_108',
          'GV_109',
          'GV_110',
          'GV_111',
          'GV_112',
          'GV_113',
          'GV_114',
          'GV_115',
          'GV_116',
          'GV_117',
          'GV_118',
          'GV_119',
          'GV_120',
        ],
        resourceIdList: ['gateValve'],
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
        ],
        resourceIdList: ['outlet'],
      },
      {
        targetIdList: [
          'S_001',
          'S_002',
          'S_003',
          'S_004',
          'S_005',
          'S_006',
          'S_007',
          'S_008',
          'S_009',
        ],
        resourceIdList: ['salinity'],
      },
      {
        targetIdList: [
          'MRT_001',
          'MRT_002',
          'MRT_003',
          'MRT_004',
          'MRT_005',
          'MRT_006',
          'MRT_007',
          'MRT_008',
        ],
        resourceIdList: ['moduleRearTemperature'],
      },
      {
        targetIdList: [
          'WL_001',
          'WL_002',
          'WL_003',
          'WL_004',
          'WL_005',
          'WL_006',
          'WL_007',
          'WL_008',
          'WL_009',
          'WL_010',
          'WL_011',
          'WL_012',
          'WL_013',
          'WL_014',
          'WL_015',
          'WL_016',
          'WL_017',
          'WL_018',
        ],
        resourceIdList: ['waterLevel'],
      },
      {
        targetIdList: ['BT_001'],
        resourceIdList: ['brineTemperature'],
      },
    ],
    // hiddenTextSvgModelResourceIdList: [],
    hiddenTextSvgModelResourceIdList: ['pipeLine', 'outlet', 'waterWay'],
  },
  controlInfo: {
    flowCmdList: [
      // 바다 > 저수지
      // 저수지1 > 증발지 1
      {
        srcPlaceId: 'RV_1',
        destList: [
          {
            destPlaceId: 'NEB_1',
            trueNodeList: ['P_001'],
            falseNodeList: ['WD_001', 'WD_002', 'WD_003'],
          },
        ],
      },
      // 저수지2 > 저수지1
      {
        srcPlaceId: 'RV_2',
        destList: [
          {
            destPlaceId: 'RV_1',
            trueNodeList: ['P_002'],
            falseNodeList: [],
          },
        ],
      },

      // 증발지 1 > 증발지 2, 바다
      {
        srcPlaceId: 'NEB_1',
        destList: [
          {
            destPlaceId: 'NEB_2',
            trueNodeList: ['WD_002', 'WD_003'],
            falseNodeList: ['WD_001', 'WD_004', 'WD_005', 'WD_006'],
          },
          {
            destPlaceId: 'SEA',
            trueNodeList: ['WD_001'],
            falseNodeList: ['WD_002', 'WD_003'],
          },
        ],
      },
      // 증발지 2 > 해주 1, 2, 바다
      {
        srcPlaceId: 'NEB_2',
        destList: [
          {
            destPlaceId: 'BW_1',
            trueNodeList: ['WD_005'],
            falseNodeList: ['WD_004', 'WD_006'],
          },
          {
            destPlaceId: 'BW_2',
            trueNodeList: ['WD_006'],
            falseNodeList: ['WD_004', 'WD_005'],
          },
          {
            destPlaceId: 'SEA',
            trueNodeList: ['WD_004'],
            falseNodeList: ['WD_005', 'WD_006'],
          },
        ],
      },
      // 수중 태양광 증발지 1 > 해주 2, 3, 바다
      {
        srcPlaceId: 'SEB_1',
        destList: [
          {
            destPlaceId: 'BW_2',
            trueNodeList: ['GV_101', 'GV_105'],
            falseNodeList: ['GV_106', 'GV_104'],
          },
          {
            destPlaceId: 'BW_3',
            trueNodeList: ['GV_102', 'GV_104', 'GV_105'],
            falseNodeList: ['GV_106', 'GV_101', 'GV_103'],
          },
          {
            destPlaceId: 'SEA',
            trueNodeList: ['GV_106'],
            falseNodeList: ['GV_105'],
          },
        ],
      },
      // 수중 태양광 증발지 2 > 해주 2, 3, 바다
      {
        srcPlaceId: 'SEB_2',
        destList: [
          {
            destPlaceId: 'BW_2',
            trueNodeList: ['GV_101', 'GV_107'],
            falseNodeList: ['GV_108', 'GV_104'],
          },
          {
            destPlaceId: 'BW_3',
            trueNodeList: ['GV_102', 'GV_104', 'GV_107'],
            falseNodeList: ['GV_108', 'GV_101', 'GV_103'],
          },
          {
            destPlaceId: 'SEA',
            trueNodeList: ['GV_108'],
            falseNodeList: ['GV_107'],
          },
        ],
      },
      // 수중 태양광 증발지 3 > 해주 2, 3, 바다
      {
        srcPlaceId: 'SEB_3',
        destList: [
          {
            destPlaceId: 'BW_2',
            trueNodeList: ['GV_101', 'GV_109'],
            falseNodeList: ['GV_110', 'GV_104'],
          },
          {
            destPlaceId: 'BW_3',
            trueNodeList: ['GV_102', 'GV_104', 'GV_109'],
            falseNodeList: ['GV_110', 'GV_101', 'GV_103'],
          },
          {
            destPlaceId: 'SEA',
            trueNodeList: ['GV_110'],
            falseNodeList: ['GV_109'],
          },
        ],
      },
      // 수중 태양광 증발지 4 > 해주 2, 3, 바다
      {
        srcPlaceId: 'SEB_4',
        destList: [
          {
            destPlaceId: 'BW_2',
            trueNodeList: ['GV_101', 'GV_111'],
            falseNodeList: ['GV_112', 'GV_104'],
          },
          {
            destPlaceId: 'BW_3',
            trueNodeList: ['GV_102', 'GV_104', 'GV_111'],
            falseNodeList: ['GV_112', 'GV_101', 'GV_103'],
          },
          {
            destPlaceId: 'SEA',
            trueNodeList: ['GV_112'],
            falseNodeList: ['GV_111'],
          },
        ],
      },
      // 수중 태양광 증발지 5 > 해주 2, 3, 바다
      {
        srcPlaceId: 'SEB_5',
        destList: [
          {
            destPlaceId: 'BW_2',
            trueNodeList: ['GV_101', 'GV_113'],
            falseNodeList: ['GV_114', 'GV_104'],
          },
          {
            destPlaceId: 'BW_3',
            trueNodeList: ['GV_102', 'GV_104', 'GV_113'],
            falseNodeList: ['GV_114', 'GV_101', 'GV_103'],
          },
          {
            destPlaceId: 'SEA',
            trueNodeList: ['GV_114'],
            falseNodeList: ['GV_113'],
          },
        ],
      },
      // 수중 태양광 증발지 6 > 해주 3, 4, 바다
      {
        srcPlaceId: 'SEB_6',
        destList: [
          {
            destPlaceId: 'BW_3',
            trueNodeList: ['GV_102', 'GV_115'],
            falseNodeList: ['GV_116', 'GV_104', 'GV_103'],
          },
          {
            destPlaceId: 'BW_4',
            trueNodeList: ['GV_103', 'GV_115'],
            falseNodeList: ['GV_116', 'GV_104', 'GV_102'],
          },
          {
            destPlaceId: 'SEA',
            trueNodeList: ['GV_116'],
            falseNodeList: ['GV_115'],
          },
        ],
      },
      // 수중 태양광 증발지 7 > 해주 3, 4, 바다
      {
        srcPlaceId: 'SEB_7',
        destList: [
          {
            destPlaceId: 'BW_3',
            trueNodeList: ['GV_102', 'GV_117'],
            falseNodeList: ['GV_118', 'GV_104', 'GV_103'],
          },
          {
            destPlaceId: 'BW_4',
            trueNodeList: ['GV_103', 'GV_117'],
            falseNodeList: ['GV_118', 'GV_104', 'GV_102'],
          },
          {
            destPlaceId: 'SEA',
            trueNodeList: ['GV_118'],
            falseNodeList: ['GV_117'],
          },
        ],
      },
      // 수중 태양광 증발지 8 > 해주 3, 4, 바다
      {
        srcPlaceId: 'SEB_8',
        destList: [
          {
            destPlaceId: 'BW_3',
            trueNodeList: ['GV_102', 'GV_119'],
            falseNodeList: ['GV_120', 'GV_104', 'GV_103'],
          },
          {
            destPlaceId: 'BW_4',
            trueNodeList: ['GV_103', 'GV_119'],
            falseNodeList: ['GV_120', 'GV_104', 'GV_102'],
          },
          {
            destPlaceId: 'SEA',
            trueNodeList: ['GV_120'],
            falseNodeList: ['GV_119'],
          },
        ],
      },
      // 결정지 > 해주 5, 바다
      {
        srcPlaceId: 'NCB',
        destList: [
          {
            destPlaceId: 'BW_5',
            trueNodeList: ['WD_007'],
            falseNodeList: ['WD_008'],
          },
          {
            destPlaceId: 'SEA',
            trueNodeList: ['WD_008'],
            falseNodeList: ['WD_007'],
          },
        ],
      },
      // 해주 1 > 증발지 2
      {
        srcPlaceId: 'BW_1',
        destList: [
          {
            destPlaceId: 'NEB_2',
            trueNodeList: ['P_003'],
            falseNodeList: ['WD_004', 'WD_005', 'WD_006'],
          },
        ],
      },
      // 해주 2 > 수중 태양광 증발지 1, 2, 3, 4, 5
      {
        srcPlaceId: 'BW_2',
        destList: [
          {
            destPlaceId: 'SEB_1',
            trueNodeList: ['P_004'],
            falseNodeList: ['GV_105', 'GV_106'],
          },
          {
            destPlaceId: 'SEB_2',
            trueNodeList: ['P_005'],
            falseNodeList: ['GV_107', 'GV_108'],
          },
          {
            destPlaceId: 'SEB_3',
            trueNodeList: ['P_006'],
            falseNodeList: ['GV_109', 'GV_110'],
          },
          {
            destPlaceId: 'SEB_4',
            trueNodeList: ['P_007'],
            falseNodeList: ['GV_111', 'GV_112'],
          },
          {
            destPlaceId: 'SEB_5',
            trueNodeList: ['P_008'],
            falseNodeList: ['GV_113', 'GV_114'],
          },
          {
            destPlaceId: 'SEB_ONE',
            destPlaceName: '수중 태양광 증발지 그룹 1',
            trueNodeList: ['P_004', 'P_005', 'P_006', 'P_007', 'P_008'],
            falseNodeList: [
              'GV_105',
              'GV_106',
              'GV_107',
              'GV_108',
              'GV_109',
              'GV_110',
              'GV_111',
              'GV_112',
              'GV_113',
              'GV_114',
            ],
          },
        ],
      },
      // 해주 3 > 수중 태양광 증발지 6, 7, 8
      {
        srcPlaceId: 'BW_3',
        destList: [
          {
            destPlaceId: 'SEB_6',
            trueNodeList: ['P_009'],
            falseNodeList: ['GV_115', 'GV_116'],
          },
          {
            destPlaceId: 'SEB_7',
            trueNodeList: ['P_010'],
            falseNodeList: ['GV_117', 'GV_118'],
          },
          {
            destPlaceId: 'SEB_8',
            trueNodeList: ['P_011'],
            falseNodeList: ['GV_119', 'GV_120'],
          },
          {
            destPlaceId: 'SEB_TWO',
            destPlaceName: '수중 태양광 증발지 그룹 2',
            trueNodeList: ['P_009', 'P_010', 'P_011'],
            falseNodeList: ['GV_115', 'GV_116', 'GV_117', 'GV_118', 'GV_119', 'GV_120'],
          },
        ],
      },
      // 해주 4 > 해주 5
      {
        srcPlaceId: 'BW_4',
        destList: [
          {
            destPlaceId: 'BW_5',
            trueNodeList: ['P_012'],
            falseNodeList: [],
          },
        ],
      },
      // 해주 5 > 결정지
      {
        srcPlaceId: 'BW_5',
        destList: [
          {
            destPlaceId: 'NCB',
            trueNodeList: ['P_013'],
            falseNodeList: ['WD_007', 'WD_008'],
          },
        ],
      },
      // ************ 장소 그룹 ***************
      // 수중 태양광 증발지 그룹 1 > 해주 2, 3, 바다
      {
        srcPlaceId: 'SEB_ONE',
        srcPlaceName: '수중 태양광 증발지 그룹 1',
        destList: [
          {
            destPlaceId: 'BW_2',
            trueNodeList: ['GV_101', 'GV_105', 'GV_107', 'GV_109', 'GV_111', 'GV_113'],
            falseNodeList: ['GV_104', 'GV_106', 'GV_108', 'GV_110', 'GV_112', 'GV_114'],
          },
          {
            destPlaceId: 'BW_3',
            trueNodeList: ['GV_102', 'GV_104', 'GV_105', 'GV_107', 'GV_109', 'GV_111', 'GV_113'],
            falseNodeList: ['GV_101', 'GV_103', 'GV_106', 'GV_108', 'GV_110', 'GV_112', 'GV_114'],
          },
          {
            destPlaceId: 'SEA',
            trueNodeList: ['GV_106', 'GV_108', 'GV_110', 'GV_112', 'GV_114'],
            falseNodeList: ['GV_105', 'GV_107', 'GV_109', 'GV_111', 'GV_113'],
          },
        ],
      },
      // 수중 태양광 증발지 그룹 2 > 해주 2, 3, 바다
      {
        srcPlaceId: 'SEB_TWO',
        srcPlaceName: '수중 태양광 증발지 그룹 2',
        destList: [
          {
            destPlaceId: 'BW_3',
            trueNodeList: ['GV_102', 'GV_115', 'GV_117', 'GV_119'],
            falseNodeList: ['GV_103', 'GV_104', 'GV_116', 'GV_118', 'GV_120'],
          },
          {
            destPlaceId: 'BW_4',
            trueNodeList: ['GV_103', 'GV_115', 'GV_117', 'GV_119'],
            falseNodeList: ['GV_102', 'GV_104', 'GV_116', 'GV_118', 'GV_120'],
          },
          {
            destPlaceId: 'SEA',
            trueNodeList: ['GV_116', 'GV_118', 'GV_120'],
            falseNodeList: ['GV_115', 'GV_117', 'GV_119'],
          },
        ],
      },
    ],
    setCmdList: [
      {
        cmdId: 'closeAllDevice',
        trueNodeList: [],
        falseNodeList: [
          'GV_101',
          'GV_102',
          'GV_103',
          'GV_104',
          'GV_105',
          'GV_106',
          'GV_107',
          'GV_108',
          'GV_109',
          'GV_110',
          'GV_111',
          'GV_112',
          'GV_113',
          'GV_114',
          'GV_115',
          'GV_116',
          'GV_117',
          'GV_118',
          'GV_119',
          'GV_120',
          'WD_001',
          'WD_002',
          'WD_003',
          'WD_004',
          'WD_005',
          'WD_006',
          'WD_007',
          'WD_008',
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
      },
      {
        cmdId: 'rainMode',
        trueNodeList: [
          'GV_106',
          'GV_108',
          'GV_110',
          'GV_112',
          'GV_114',
          'GV_116',
          'GV_118',
          'GV_120',
          'WD_001',
          'WD_004',
          'WD_008',
        ],
        falseNodeList: [
          'GV_101',
          'GV_102',
          'GV_103',
          'GV_104',
          'GV_105',
          'GV_107',
          'GV_109',
          'GV_111',
          'GV_113',
          'GV_115',
          'GV_117',
          'GV_119',
          'WD_002',
          'WD_003',
          'WD_005',
          'WD_006',
          'WD_007',
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
      },
    ],
    scenarioCmdList: [
      {
        scenarioId: 'rainMode',
        scenarioList: [
          // 모든 장치 닫기
          {
            wrapCmdFormat: reqWCF.SET,
            wrapCmdType: reqWCT.CONTROL,
            setCmdId: 'closeAllDevice',
          },
          // 염수 대피
          [
            // 결정지 염수 이동
            [
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CONTROL,
                wrapCmdGoalInfo: {
                  goalDataList: [
                    {
                      nodeId: 'WL_017',
                      goalValue: 1,
                      goalRange: goalDR.LOWER,
                    },
                  ],
                },
                flowSrcPlaceId: 'NCB',
                flowDestPlaceId: 'BW_5',
              },
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CONTROL,
                flowSrcPlaceId: 'NCB',
                flowDestPlaceId: 'SEA',
              },
            ],
            // 수중 태양광 증발지 그룹 2 염수 이동
            [
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CONTROL,
                wrapCmdGoalInfo: {
                  goalDataList: [
                    {
                      nodeId: 'WL_014',
                      goalValue: 2,
                      goalRange: goalDR.LOWER,
                    },
                    {
                      nodeId: 'WL_015',
                      goalValue: 2,
                      goalRange: goalDR.LOWER,
                    },
                    {
                      nodeId: 'WL_016',
                      goalValue: 2,
                      goalRange: goalDR.LOWER,
                    },
                  ],
                },
                flowSrcPlaceId: 'SEB_TWO',
                flowDestPlaceId: 'BW_3',
              },
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CONTROL,
                flowSrcPlaceId: 'SEB_TWO',
                flowDestPlaceId: 'SEA',
              },
            ],
            // 수중 태양광 증발지 그룹 1 염수 이동
            [
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CONTROL,
                wrapCmdGoalInfo: {
                  goalDataList: [
                    {
                      nodeId: 'WL_009',
                      goalValue: 2,
                      goalRange: goalDR.LOWER,
                    },
                    {
                      nodeId: 'WL_010',
                      goalValue: 2,
                      goalRange: goalDR.LOWER,
                    },
                    {
                      nodeId: 'WL_011',
                      goalValue: 2,
                      goalRange: goalDR.LOWER,
                    },
                    {
                      nodeId: 'WL_012',
                      goalValue: 2,
                      goalRange: goalDR.LOWER,
                    },
                    {
                      nodeId: 'WL_013',
                      goalValue: 2,
                      goalRange: goalDR.LOWER,
                    },
                  ],
                },
                flowSrcPlaceId: 'SEB_ONE',
                flowDestPlaceId: 'BW_2',
              },
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CONTROL,
                flowSrcPlaceId: 'SEB_ONE',
                flowDestPlaceId: 'SEA',
              },
            ],
            // 일반 증발지 2 염수 이동
            [
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CONTROL,
                wrapCmdGoalInfo: {
                  goalDataList: [
                    {
                      nodeId: 'WL_004',
                      goalValue: 2,
                      goalRange: goalDR.LOWER,
                    },
                  ],
                },
                flowSrcPlaceId: 'NEB_2',
                flowDestPlaceId: 'BW_1',
              },
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CONTROL,
                flowSrcPlaceId: 'NEB_2',
                flowDestPlaceId: 'SEA',
              },
            ],
            // 일반 증발지 1 염수 이동
            {
              wrapCmdFormat: reqWCF.FLOW,
              wrapCmdType: reqWCT.CONTROL,
              flowSrcPlaceId: 'NEB_1',
              flowDestPlaceId: 'SEA',
            },
          ],
          // 바다로 ~
          {
            wrapCmdFormat: reqWCF.SET,
            wrapCmdType: reqWCT.CONTROL,
            setCmdId: 'rainMode',
          },
        ],
      },
      {
        scenarioId: 'normalFlowScenario',
        scenarioList: [
          // 모든 장치 닫기
          {
            wrapCmdFormat: reqWCF.SET,
            wrapCmdType: reqWCT.CONTROL,
            setCmdId: 'closeAllDevice',
          },
          // 저수지 2 > 저수지 1 염수 이동
          [
            [
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CONTROL,
                wrapCmdGoalInfo: {
                  limitTimeSec: 9,
                },
                flowSrcPlaceId: 'RV_2',
                flowDestPlaceId: 'RV_1',
              },
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CANCEL,
                flowSrcPlaceId: 'RV_2',
                flowDestPlaceId: 'RV_1',
              },
            ],
          ],
          // 저수지 1 > 일반 증발지 1, 2 염수 이동 및 염도 이동
          [
            [
              // 저수지 1 > 일반 증발지 1, 2 염수 이동
              {
                wrapCmdFormat: reqWCF.SINGLE,
                wrapCmdType: reqWCT.CONTROL,
                wrapCmdGoalInfo: {
                  limitTimeSec: 9,
                },
                singleNodeId: ['P_001', 'WD_002', 'WD_003'],
                singleControlType: reqDCT.TRUE,
              },
              // 염도가 적정 수준에 오르기를 기다림
              {
                wrapCmdFormat: reqWCF.SINGLE,
                wrapCmdType: reqWCT.CONTROL,
                wrapCmdGoalInfo: {
                  limitTimeSec: 9,
                },
                singleNodeId: ['P_001', 'WD_002', 'WD_003'],
                singleControlType: reqDCT.FALSE,
              },
              // 염도에 의한 염수 이동
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CONTROL,
                wrapCmdGoalInfo: {
                  limitTimeSec: 9,
                },
                flowSrcPlaceId: 'NEB_2',
                flowDestPlaceId: 'BW_2',
              },
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CANCEL,
                wrapCmdGoalInfo: {
                  limitTimeSec: 9,
                },
                flowSrcPlaceId: 'NEB_2',
                flowDestPlaceId: 'BW_2',
              },
            ],
          ],
          // 염도에 의한 수중 태양광 증발지 염수 이동 1단계
          [
            [
              // 해주 2 > 수중 태양광 증발지 그룹 1 염수 이동
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CONTROL,
                wrapCmdGoalInfo: {
                  limitTimeSec: 9,
                },
                flowSrcPlaceId: 'BW_2',
                flowDestPlaceId: 'SEB_ONE',
              },
              // 수중 태양광 증발지 그룹 1의 염도 달성 대기
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CANCEL,
                wrapCmdGoalInfo: {
                  limitTimeSec: 9,
                },
                flowSrcPlaceId: 'BW_2',
                flowDestPlaceId: 'SEB_ONE',
              },
              // 염도 달성: 수중 태양광 증발지 그룹 1 > 해주 3
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CONTROL,
                wrapCmdGoalInfo: {
                  limitTimeSec: 9,
                },
                flowSrcPlaceId: 'SEB_ONE',
                flowDestPlaceId: 'BW_3',
              },
              // 염수 이동 완료
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CANCEL,
                flowSrcPlaceId: 'SEB_ONE',
                flowDestPlaceId: 'BW_3',
              },
            ],
          ],
          // 염도에 의한 수중 태양광 증발지 염수 이동 2단계
          [
            [
              // 해주 3 > 수중 태양광 증발지 그룹 2
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CONTROL,
                wrapCmdGoalInfo: {
                  limitTimeSec: 9,
                },
                flowSrcPlaceId: 'BW_3',
                flowDestPlaceId: 'SEB_TWO',
              },
              // 염도 달성 대기
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CANCEL,
                wrapCmdGoalInfo: {
                  limitTimeSec: 9,
                },
                flowSrcPlaceId: 'BW_3',
                flowDestPlaceId: 'SEB_TWO',
              },
              // 염도 달성: 수중태양광 증발지 그룹 2 > 해주 4
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CONTROL,
                wrapCmdGoalInfo: {
                  limitTimeSec: 9,
                },
                flowSrcPlaceId: 'SEB_TWO',
                flowDestPlaceId: 'BW_4',
              },
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CANCEL,
                flowSrcPlaceId: 'SEB_TWO',
                flowDestPlaceId: 'BW_4',
              },
              // 해주 4 > 결정지 해주로 이동
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CONTROL,
                wrapCmdGoalInfo: {
                  limitTimeSec: 9,
                },
                flowSrcPlaceId: 'BW_4',
                flowDestPlaceId: 'BW_5',
              },
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CANCEL,
                flowSrcPlaceId: 'BW_4',
                flowDestPlaceId: 'BW_5',
              },
            ],
          ],
          // 결정지 소금 생산
          [
            [
              // 해주 5 > 결정지 염수 이동
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CONTROL,
                wrapCmdGoalInfo: {
                  limitTimeSec: 9,
                },
                flowSrcPlaceId: 'BW_5',
                flowDestPlaceId: 'NCB',
              },
              {
                wrapCmdFormat: reqWCF.FLOW,
                wrapCmdType: reqWCT.CANCEL,
                flowSrcPlaceId: 'BW_5',
                flowDestPlaceId: 'NCB',
              },
            ],
          ],
        ],
      },
    ],
    tempControlList: [{ cmdName: '', trueList: [], falseList: [] }],
  },
};

module.exports = map;
