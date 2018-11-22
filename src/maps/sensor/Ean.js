require('../../../../default-intelligence');

/**
 * @type {mDeviceMap}
 */
const map = {
  drawInfo: {
    frame: {
      mapSize: { width: 1700, height: 1230 },
      svgModelResourceList: [],
    },
    positionList: {
      svgPlaceList: [],
      svgNodeList: [],
    },
  },
  setInfo: {
    mainInfo: { main_seq: 1, uuid: 'ean' },
    dccConstructorList: [
      {
        dccId: 'DCC_001',
        dccName: '일반 모듈환경 계측용',
        connect_info: {
          type: 'serial',
          subType: 'parser',
          addConfigInfo: {
            parser: 'readLineParser',
            option: '\\r',
          },
          baudRate: 9600,
          port: 'COM8',
          host: 'localhost',
        },
      },
      {
        dccId: 'DCC_002',
        dccName: '냉각형 모듈환경 계측용',
        connect_info: {
          type: 'serial',
          subType: 'parser',
          addConfigInfo: {
            parser: 'readLineParser',
            option: '\\r',
          },
          baudRate: 9600,
          port: 'COM8',
          host: 'localhost',
        },
      },
      {
        dccId: 'DCC_003',
        dccName: '일반 모듈 발전량 계측용',
        connect_info: {
          type: 'serial',
          subType: 'parser',
          addConfigInfo: {
            parser: 'readLineParser',
            option: '\\n',
          },
          baudRate: 9600,
          port: 'COM7',
          host: 'localhost',
        },
      },
      {
        dccId: 'DCC_004',
        dccName: '냉각형 모듈 발전량 계측용',
        connect_info: {
          type: 'serial',
          subType: 'parser',
          addConfigInfo: {
            parser: 'readLineParser',
            option: '\\n',
          },
          baudRate: 9600,
          port: 'COM7',
          host: 'localhost',
        },
      },
    ],
    dpcConstructorList: [
      { dpcId: 'DPC_001', protocol_info: { mainCategory: 'Sensor', subCategory: 'Ean' } },
    ],
    dataLoggerStructureList: [
      {
        target_prefix: 'D_PV',
        target_name: 'PV',
        dataLoggerDeviceList: [
          {
            target_code: '001',
            target_name: '일반 모듈 발전량 계측용',
            dccId: 'DCC_003',
            dpcId: 'DPC_001',
            nodeList: ['V_PV_001', 'A_PV_001', 'W_PV_001'],
          },
          {
            target_code: '002',
            target_name: '냉각형 모듈 발전량 계측용',
            dccId: 'DCC_004',
            dpcId: 'DPC_001',
            nodeList: ['V_PV_002', 'A_PV_002', 'W_PV_002'],
          },
        ],
      },
      {
        target_prefix: 'D_E',
        target_name: 'Environment (외기 환경)',
        dataLoggerDeviceList: [
          {
            target_code: '001',
            target_name: '일반 모듈환경 계측용',
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            nodeList: ['T_PR_001', 'T_W_001', 'T_OA_001'],
          },
          {
            target_code: '002',
            target_name: '냉각형 모듈환경 계측용',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['T_PR_002', 'T_W_002'],
          },
        ],
      },
    ],
    nodeStructureList: [
      {
        target_id: 'temp',
        target_name: '온도',
        is_sensor: 1,
        data_unit: '℃',
        description: '섭씨: 1 atm에서의 물의 어는점을 0도, 끓는점을 100도로 정한 온도',
        defList: [
          {
            target_id: 'pvRearTemperature',
            target_prefix: 'T_PR',
            target_name: '모듈 후면 온도',
            nodeList: [
              {
                target_code: '001',
              },
              {
                target_code: '002',
              },
            ],
          },
          {
            target_id: 'waterTemperature',
            target_prefix: 'T_W',
            target_name: '수중 온도',
            nodeList: [
              {
                target_code: '001',
              },
              {
                target_code: '002',
              },
            ],
          },
          {
            target_id: 'outsideAirTemperature',
            target_prefix: 'T_OA',
            target_name: '외기 온도',
            nodeList: [
              {
                target_code: '001',
              },
            ],
          },
        ],
      },
      {
        target_id: 'vol',
        target_name: '전압',
        is_sensor: 1,
        data_unit: 'V',
        description: null,
        defList: [
          {
            target_id: 'pvVol',
            target_name: 'PV 전압',
            target_prefix: 'V_PV',
            description: '200W 급',
            nodeList: [
              {
                target_code: '001',
              },
              {
                target_code: '002',
              },
            ],
          },
        ],
      },
      {
        target_id: 'amp',
        target_name: '전류',
        is_sensor: 1,
        data_unit: 'A',
        description: null,
        defList: [
          {
            target_id: 'pvAmp',
            target_name: 'PV 전류',
            target_prefix: 'A_PV',
            description: '200W 급',
            nodeList: [
              {
                target_code: '001',
              },
              {
                target_code: '002',
              },
            ],
          },
        ],
      },
      {
        target_id: 'watt',
        target_name: '출력',
        data_unit: 'W',
        description: '출력',
        defList: [
          {
            target_id: 'pvWatt',
            target_name: 'PV 출력',
            target_prefix: 'W_PV',
            description: '200W 급',
            nodeList: [
              {
                target_code: '001',
              },
              {
                target_code: '002',
              },
            ],
          },
        ],
      },
      {
        target_id: 'kiloWatt',
        target_name: '출력',
        data_unit: 'kW',
        description: '출력',
        defList: [],
      },
    ],
  },
  realtionInfo: {
    placeRelationList: [
      {
        target_id: 'testBed',
        target_name: '테스트베드',
        description: '400 W 급',
        defList: [
          {
            target_id: 'normalTB',
            target_name: '일반형 테스트 베드',
            target_prefix: 'TB_N',
            placeList: [
              {
                target_code: '',
                nodeList: ['V_PV_001', 'A_PV_001', 'W_PV_001', 'T_PR_001', 'T_W_001', 'T_OA_001'],
              },
            ],
          },
          {
            target_id: 'coolingTB',
            target_name: '냉각형 테스트 베드',
            target_prefix: 'TB_C',
            placeList: [
              {
                target_code: '',
                nodeList: ['V_PV_002', 'A_PV_002', 'W_PV_002', 'T_PR_002', 'T_W_002', 'T_OA_001'],
              },
            ],
          },
        ],
      },
    ],
  },
  controlInfo: {},
};

module.exports = map;
