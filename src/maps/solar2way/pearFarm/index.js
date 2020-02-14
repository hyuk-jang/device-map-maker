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
      mapSize: {
        width: 880,
        height: 1230,
      },
      svgModelResourceList: [],
    },
    positionInfo: {},
  },
  setInfo: {
    mainInfo: {
      uuid: '103',
    },
    dccConstructorList: [
      {
        dccId: 'DCC_001',
        connect_info: {
          type: 'socket',
          subType: '',
          host: 'localhost',
          port: 9000,
          hasPassive: true,
        },
      },
    ],
    dpcConstructorList: [
      {
        dpcId: 'DPC_001',
        protocol_info: {
          mainCategory: 'S2W',
          subCategory: 'dmTech',
          wrapperCategory: 'default',
          cmdExecTimeoutMs: 1000 * 2,
        },
      },
      {
        dpcId: 'DPC_IVT_001',
        protocol_info: {
          mainCategory: 'Inverter',
          subCategory: 'das_1.3',
          wrapperCategory: 'default',
          cmdExecTimeoutMs: 1000 * 5,
        },
      },
      {
        dpcId: 'DPC_IVT_002',
        protocol_info: {
          mainCategory: 'Inverter',
          subCategory: 's5500k',
          wrapperCategory: 'default',
          cmdExecTimeoutMs: 1000 * 5,
        },
      },
      {
        dpcId: 'DPC_IVT_003',
        protocol_info: {
          mainCategory: 'Inverter',
          subCategory: 'ESP3K5',
          wrapperCategory: 'default',
          cmdExecTimeoutMs: 1000 * 5,
        },
      },
      {
        dpcId: 'DPC_IVT_004',
        protocol_info: {
          mainCategory: 'Inverter',
          subCategory: 'KDX_300',
          wrapperCategory: 'default',
          cmdExecTimeoutMs: 1000 * 5,
        },
      },
    ],
    repeatNodeList: [
      {
        repeatId: 'RE_NODE_IVT',
        repeatCategory: 'node',
        nodeList: [
          {
            target_code: 'A',
            // target_name: 'A',
          },
          {
            target_code: 'B',
            // target_name: 'B',
          },
          {
            target_code: 'C',
            // target_name: 'C',
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
          'IVT_G_R_A',
          'IVT_G_L_F',
          'IVT_PW_G_KW',
          'IVT_PW_PF',
          'IVT_PW_D_KWH',
          'IVT_PW_C_KWH',
          'IVT_TRB',
        ],
      },
    ],
    dataLoggerStructureList: [
      {
        target_prefix: 'D_CE',
        target_name: 'Crops Environment (작물 생육 환경)',
        dataLoggerDeviceList: [
          {
            serial_number: 41,
            target_code: '041',
            target_name: '구조물 하부',
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            nodeList: ['S_PU_041', 'T_S_041', 'RH_S_041'],
          },
          {
            serial_number: 42,
            target_code: '042',
            target_name: '대조군',
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            nodeList: ['S_PU_042', 'T_S_042', 'RH_S_042'],
          },
        ],
      },
      {
        target_prefix: 'D_IVT',
        target_name: '인버터 DL',
        dataLoggerDeviceList: [
          {
            target_code: 'A',
            // target_name: 'A',
            serial_number: Buffer.from([1]),
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_003',
            repeatId: 'RE_PREFIX_IVT',
          },
          {
            target_code: 'B',
            // target_name: 'B',
            serial_number: Buffer.from([2]),
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_003',
            repeatId: 'RE_PREFIX_IVT',
          },
          {
            target_code: 'C',
            // target_name: 'C',
            serial_number: Buffer.from([3]),
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_003',
            repeatId: 'RE_PREFIX_IVT',
          },
        ],
      },
    ],
    nodeStructureList: [
      {
        target_id: 'temp',
        target_name: '온도',
        is_sensor: 1,
        // save_db_type: BLOCK,
        data_unit: '℃',
        description: '섭씨: 1 atm에서의 물의 어는점을 0도, 끓는점을 100도로 정한 온도',
        defList: [
          {
            target_id: 'soilTemperature',
            target_prefix: 'T_S',
            target_name: '토양 온도',
            nodeList: [
              {
                target_code: '041',
              },
              {
                target_code: '042',
              },
            ],
          },
        ],
      },
      {
        target_id: 'reh',
        target_name: '습도',
        is_sensor: 1,
        // save_db_type: BLOCK,
        data_unit: '%RH',
        description: '공기 중에 포함되어 있는 수증기의 양 또는 비율을 나타내는 단위',
        defList: [
          {
            target_id: 'soilReh',
            target_prefix: 'RH_S',
            target_name: '토양 습도',
            nodeList: [
              {
                target_code: '041',
              },
              {
                target_code: '042',
              },
            ],
          },
        ],
      },

      {
        target_id: 'solar',
        target_name: '일사량',
        is_sensor: 1,
        // save_db_type: BLOCK,
        data_unit: 'W/m²',
        description: '1평방 미터당 조사되는 일사에너지의 양이 1W',
        defList: [
          {
            target_id: 'pvUnderlyingSolar',
            target_name: '하부 일사량',
            target_prefix: 'S_PU',
            nodeList: [
              {
                target_code: '041',
              },
              {
                target_code: '042',
              },
            ],
          },
        ],
      },
      {
        target_id: 'vol',
        target_name: '전압',
        is_sensor: 2,
        is_submit_api: 0,
        save_db_type: BLOCK,
        data_unit: 'V',
        description: null,
        defList: [
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
        ],
      },
      {
        target_id: 'amp',
        target_name: '전류',
        is_sensor: 2,
        is_submit_api: 0,
        save_db_type: BLOCK,
        data_unit: 'A',
        description: null,
        defList: [
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
        ],
      },
      {
        target_id: 'W',
        target_name: '전력량',
        is_sensor: 2,
        is_submit_api: 0,
        save_db_type: BLOCK,
        data_unit: 'W',
        description: '1 와트(기호 W)는 1 초 동안의 1 줄(N·m)에 해당하는 일률의 SI 단위',
        defList: [],
      },
      {
        target_id: 'kW',
        target_name: '전력량',
        is_sensor: 2,
        is_submit_api: 0,
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
        is_submit_api: 0,
        save_db_type: BLOCK,
        data_unit: 'kWh',
        description: '시간당 에너지 단위, 1 kW의 일률로 1 시간 동안 하는 일의 양',
        defList: [
          {
            target_id: 'powerDailyKwh',
            target_name: '인버터 하루 발전량',
            target_prefix: 'IVT_PW_D_KWH',
            description: 'Daily Power Generation',
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
        target_id: 'powerFactor',
        target_name: '역률',
        is_sensor: 2,
        is_submit_api: 0,
        save_db_type: BLOCK,
        data_unit: '%',
        defList: [
          {
            target_id: 'powerPf',
            target_name: '역률',
            target_prefix: 'IVT_PW_PF',
            repeatId: 'RE_NODE_IVT',
          },
        ],
      },
      {
        target_id: 'frequency',
        target_name: '주파수',
        is_sensor: 2,
        is_submit_api: 0,
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
        is_submit_api: 0,
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
                target_code: 'A',
                // target_name: 'A',
                chart_color: '#c92a2a',
                chart_sort_rank: 41,
                repeatId: 'RE_PREFIX_IVT',
              },
              {
                target_code: 'B',
                // target_name: 'B',
                chart_color: '#868e96',
                chart_sort_rank: 42,
                repeatId: 'RE_PREFIX_IVT',
              },
              {
                target_code: 'C',
                // target_name: 'C',
                chart_color: '#b9560d',
                chart_sort_rank: 43,
                repeatId: 'RE_PREFIX_IVT',
              },
            ],
          },
        ],
      },
      {
        target_id: 'farmParallelSite',
        target_name: '농업 병행 부지',
        description: '농업 병행 태양광 부지로 작물 생육 환경 센서가 존재',
        defList: [
          {
            target_id: 'normalType',
            target_prefix: 'PV_N',
            placeList: [
              {
                target_code: '041',
                target_name: '구조물 하부',
                chart_color: '#c92a2a',
                chart_sort_rank: 41,
                nodeList: ['S_PU_041', 'T_S_041', 'RH_S_041'],
              },
              {
                target_code: '042',
                target_name: '대조군',
                chart_color: '#868e96',
                chart_sort_rank: 42,
                nodeList: ['S_PU_042', 'T_S_042', 'RH_S_042'],
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
