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
        width: 3000,
        height: 2000,
        backgroundInfo: {
          backgroundData: '',
          backgroundPosition: [160, 0],
        },
      },
      svgModelResourceList: [
        {
          id: 'solarEvaporationBlock',
          type: 'rect',
          elementDrawInfo: { width: 100, height: 280, color: '#abe3e1', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'normalEvaporationBlock_A',
          type: 'rect',
          elementDrawInfo: { width: 1010, height: 180, color: '#bd8f3a', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'normalEvaporationBlock_B',
          type: 'rect',
          elementDrawInfo: { width: 700, height: 100, color: '#bd8f3a', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'normalCrystalizingBlock',
          type: 'rect',
          elementDrawInfo: { width: 200, height: 160, color: '#988224', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'reservoir_A',
          type: 'rect',
          elementDrawInfo: { width: 1010, height: 90, color: 'blue', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'reservoir_B',
          type: 'rect',
          elementDrawInfo: { width: 180, height: 90, color: 'blue', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'drainage',
          type: 'rect',
          elementDrawInfo: { width: 80, height: 90, color: 'skyblue', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'brineWarehouse_A',
          type: 'rect',
          elementDrawInfo: { width: 1010, height: 80, color: '#90b4dd', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'brineWarehouse_B',
          type: 'rect',
          elementDrawInfo: { width: 200, height: 80, color: '#90b4dd', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'brineWarehouse_C',
          type: 'rect',
          elementDrawInfo: { width: 120, height: 80, color: '#90b4dd', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'brineWarehouse_D',
          type: 'rect',
          elementDrawInfo: { width: 110, height: 80, color: '#90b4dd', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'sea',
          type: 'rect',
          elementDrawInfo: { width: 1010, height: 20, color: 'skyblue', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'waterWay',
          type: 'line',
          elementDrawInfo: { width: 25, color: '#b2b2b2', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'waterWay_B',
          type: 'line',
          elementDrawInfo: { width: 25, color: '#4c7a89', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'peWaterWay',
          type: 'line',
          elementDrawInfo: { width: 25, color: '#108760', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'pipeLine_A',
          type: 'line',
          elementDrawInfo: { width: 10, color: '#ff9a00', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'pipeLine_B',
          type: 'line',
          elementDrawInfo: { width: 10, color: '#7513a1', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
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
          textStyleInfo: { color: '', fontSize: 5, leading: '1.8em' },
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
            opacity: 1,
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
            opacity: 1,
          },
          textStyleInfo: { color: '', fontSize: 6 },
        },
        {
          id: 'outlet',
          type: 'circle',
          elementDrawInfo: { width: 10, height: 10, radius: 10, color: 'black', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'salinity',
          type: 'rect',
          elementDrawInfo: { width: 45, height: 25, color: '#f0f0f0', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'moduleRearTemperature',
          type: 'rect',
          elementDrawInfo: { width: 45, height: 25, color: '#f0f0f0', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 5 },
        },
        {
          id: 'waterLevel',
          type: 'rect',
          elementDrawInfo: { width: 45, height: 25, color: '#f0f0f0', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'brineTemperature',
          type: 'rect',
          elementDrawInfo: { width: 45, height: 25, color: '#f0f0f0', opacity: 1 },
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
              point: [190, 435],
            },
            {
              id: 'SEB_2',
              name: '증발지_2',
              resourceId: 'solarEvaporationBlock',
              point: [312, 435],
            },
            {
              id: 'SEB_3',
              name: '증발지_3',
              resourceId: 'solarEvaporationBlock',
              point: [435, 435],
            },
            {
              id: 'SEB_4',
              name: '증발지_4',
              resourceId: 'solarEvaporationBlock',
              point: [558, 435],
            },
            {
              id: 'SEB_5',
              name: '증발지_5',
              resourceId: 'solarEvaporationBlock',
              point: [685, 435],
            },
            {
              id: 'SEB_6',
              name: '증발지_6',
              resourceId: 'solarEvaporationBlock',
              point: [815, 435],
            },
            {
              id: 'SEB_7',
              name: '증발지_7',
              resourceId: 'solarEvaporationBlock',
              point: [940, 435],
            },
            {
              id: 'SEB_8',
              name: '증발지_8',
              resourceId: 'solarEvaporationBlock',
              point: [1060, 435],
            },
            {
              id: 'NEB_1',
              name: '일반 증발지_1',
              resourceId: 'normalEvaporationBlock_A',
              point: [170, 145],
            },
            { id: 'NCB', name: '결정지', resourceId: 'normalCrystalizingBlock', point: [170, 730] },
          ],
        },
        {
          placeId: 'brineWarehouse',
          defList: [
            { id: 'BW_1', name: '해주_1', resourceId: 'brineWarehouse_A', point: [170, 340] },
            { id: 'BW_5', name: '해주_5', resourceId: 'brineWarehouse_D', point: [445, 730] },
          ],
        },
        {
          placeId: 'reservoir',
          defList: [{ id: 'RV_1', name: '저수지_1', resourceId: 'reservoir_A', point: [170, 40] }],
        },
        {
          placeId: 'sea',
          defList: [{ id: 'SEA', name: '바다', resourceId: 'sea', point: [170, 10] }],
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
  setInfo: {},
  relationInfo: {
    placeRelationList: [],
    smartSalternInfo: {},
    svgResourceConnectionList: [],
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
