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
        height: 800,
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
          textStyleInfo: { color: 'white', fontSize: 10 },
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
          elementDrawInfo: { width: 45, height: 25, color: '#f0f0f0', opacity: 0 },
          textStyleInfo: { color: '', fontSize: 5 },
        },
        {
          id: 'waterLevel',
          type: 'rect',
          elementDrawInfo: { width: 45, height: 25, color: '#f0f0f0', opacity: 0 },
          textStyleInfo: { color: '', fontSize: 8 },
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
