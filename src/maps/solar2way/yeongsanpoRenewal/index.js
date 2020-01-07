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
      mapInfo: {
        width: 2000,
        height: 1230,
        backgroundInfo: {
          backgroundData: '',
          backgroundPosition: [0, 0],
        },
      },
      svgModelResourceList: [
        {
          id: 'farmParallelSite',
          type: 'rect',
          elementDrawInfo: { width: 250, height: 350, color: 'red', opacity: 0.5 },
          textStyleInfo: {
            color: 'white',
          },
        },
        {
          id: 'outside',
          type: 'rect',
          elementDrawInfo: { width: 700, height: 200, color: '#009432', opacity: 0.5 },
          textStyleInfo: {
            color: 'white',
          },
        },
        {
          id: 'inverter',
          type: 'rect',
          elementDrawInfo: { width: 100, height: 100, color: '#0652DD', opacity: 0.5 },
          textStyleInfo: {
            color: 'white',
          },
        },
        {
          id: 'sensor',
          type: 'rect',
          elementDrawInfo: { width: 100, height: 30, color: '#f0f0f0' },
        },
      ],
    },
    positionInfo: {
      svgPlaceList: [
        {
          placeId: 'farmParallelSite',
          defList: [
            {
              id: 'FPS_62',
              name: '좌측_62',
              resourceId: 'farmParallelSite',
              point: [300, 100],
            },
            {
              id: 'FPS_61',
              name: '중앙_61',
              resourceId: 'farmParallelSite',
              point: [600, 100],
            },
            {
              id: 'FPS_10',
              name: '우측_10',
              resourceId: 'farmParallelSite',
              point: [900, 100],
            },
          ],
        },
        {
          placeId: 'outside',
          defList: [
            {
              id: 'OS_11',
              name: '외기 환경_11',
              resourceId: 'outside',
              point: [400, 600],
            },
          ],
        },
        {
          placeId: 'inverter',
          defList: [
            {
              id: 'IVT_A',
              name: '인버터_A',
              resourceId: 'inverter',
              point: [800, 470],
            },
            {
              id: 'IVT_B',
              name: '인버터_B',
              resourceId: 'inverter',
              point: [550, 470],
            },
          ],
        },
      ],
      svgNodeList: [],
    },
  },
  setInfo: {
    mainInfo: {
      uuid: '101',
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
            target_name: '단면 4x9(I)',
          },
          {
            target_code: 'B',
            target_name: '양면 4x9(I)',
          },
          {
            target_code: 'C',
            target_name: '단면(2.5m) 3x12(I)',
          },
          {
            target_code: 'D',
            target_name: '양면(2.5m) 3x12(I)',
          },
          {
            target_code: 'E',
            target_name: '단면추적 4x9(M.I)',
          },
          {
            target_code: 'F',
            target_name: '양면 3x12(M.I)',
          },
          {
            target_code: 'G',
            target_name: '단면 3x12(M.I)',
          },
          {
            target_code: 'H',
            target_name: '양면추적 4x9(M.I)',
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
      },
      {
        target_prefix: 'D_OE',
        target_name: 'Outside Environment (외기 환경)',
      },
      {
        target_prefix: 'D_IVT',
        target_name: '인버터 DL',
        dataLoggerDeviceList: [
          {
            target_code: 'A',
            target_name: '단면 4x9(I)',
            serial_number: Buffer.from([47]),
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_003',
            repeatId: 'RE_PREFIX_IVT',
          },
          {
            target_code: 'B',
            target_name: '양면 4x9(I)',
            serial_number: Buffer.from([85]),
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_003',
            repeatId: 'RE_PREFIX_IVT',
          },
          {
            target_code: 'C',
            target_name: '단면(2.5m) 3x12(I)',
            serial_number: Buffer.from([46]),
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_003',
            repeatId: 'RE_PREFIX_IVT',
          },
          {
            target_code: 'D',
            target_name: '양면(2.5m) 3x12(I)',
            serial_number: Buffer.from([86]),
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_003',
            repeatId: 'RE_PREFIX_IVT',
          },
          {
            target_code: 'E',
            target_name: '단면추적 4x9(M.I)',
            serial_number: 5,
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_004',
            repeatId: 'RE_PREFIX_IVT',
          },
          {
            target_code: 'F',
            target_name: '양면 3x12(M.I)',
            serial_number: 6,
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_004',
            repeatId: 'RE_PREFIX_IVT',
          },
          {
            target_code: 'G',
            target_name: '단면 3x12(M.I)',
            serial_number: 7,
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_004',
            repeatId: 'RE_PREFIX_IVT',
          },
          {
            target_code: 'H',
            target_name: '양면추적 4x9(M.I)',
            serial_number: 8,
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_004',
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
            target_prefix: 'TS',
            target_name: '토양 온도',
            nodeList: [
              {
                target_code: '010',
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '011',
                axisScale: [0, 0],
                moveScale: [0.7, 0.9],
              },
            ],
          },
          {
            target_id: 'outsideAirTemperature',
            target_prefix: 'TOA',
            target_name: '외기 온도',
            nodeList: [
              {
                target_code: '061',
                axisScale: [0, 0],
                moveScale: [-1.2, -1.5],
              },
              {
                target_code: '011',
                axisScale: [0, 0],
                moveScale: [-0.7, 0.9],
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
            target_prefix: 'RHS',
            target_name: '토양 습도',
            nodeList: [
              {
                target_code: '010',
                axisScale: [0, 0],
                moveScale: [-1.2, -1.5],
              },
              {
                target_code: '011',
                axisScale: [0, 0],
                moveScale: [-0.7, 0.7],
              },
            ],
          },
          {
            target_id: 'outsideAirReh',
            target_prefix: 'RHOA',
            target_name: '외기 습도',
            nodeList: [
              {
                target_code: '061',
                axisScale: [0, 0],
                moveScale: [1.2, -3],
              },
              {
                target_code: '011',
                axisScale: [0, 0],
                moveScale: [0.7, 0],
              },
            ],
          },
        ],
      },
      {
        target_id: 'ws',
        target_name: '풍속',
        is_sensor: 1,
        // save_db_type: BLOCK,
        data_unit: 'm/s',
        description: '초당 바람이 이동하는 거리(m)',
        defList: [
          {
            target_id: 'windSpeed',
            target_prefix: 'WS',
            target_name: '풍속',
            nodeList: [
              {
                target_code: '061',
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '011',
                axisScale: [0, 0],
                moveScale: [0.4, 0.4],
              },
            ],
          },
        ],
      },
      {
        target_id: 'wd',
        target_name: '풍향',
        is_sensor: 1,
        // save_db_type: BLOCK,
        description: '풍향 0~7 (북, 북동, 동, 남동, 남, 남서, 서, 북서)',
        defList: [
          {
            target_id: 'windDirection',
            target_prefix: 'WD',
            target_name: '풍향',
            nodeList: [
              {
                target_code: '061',
                axisScale: [0, 0],
                moveScale: [1.2, 2.7],
              },
              {
                target_code: '011',
                axisScale: [0, 0],
                moveScale: [0.7, 0.4],
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
            target_id: 'horizontalSolar',
            target_name: '수평 일사량',
            target_prefix: 'SH',
            nodeList: [
              {
                target_code: '011',
                axisScale: [0, 0],
                moveScale: [0.7, 0.7],
              },
            ],
          },
          {
            target_id: 'inclinedSolar',
            target_name: '경사 일사량',
            target_prefix: 'S_I',
            nodeList: [],
          },
          {
            target_id: 'pvUnderlyingSolar',
            target_name: '모듈 하부 일사량',
            target_prefix: 'SPU',
            description: null,
            nodeList: [
              {
                target_code: '062',
                axisScale: [0, 0],
                moveScale: [1, -1.5],
              },
              {
                target_code: '063',
                axisScale: [0, 0],
                moveScale: [-1, 0],
              },
              {
                target_code: '061',
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '010',
                axisScale: [0, 0],
                moveScale: [1.2, 2.7],
              },
            ],
          },
        ],
      },
      {
        target_id: 'rainfall',
        target_name: '강우량',
        is_sensor: 1,
        // save_db_type: BLOCK,
        data_unit: 'mm/hr',
        description: '시간당 일정한 곳에 내린 비의 분량. 단위는 mm',
        defList: [
          {
            target_id: 'rainfallHour',
            target_prefix: 'RFH',
            target_name: '시간당 강우량',
            nodeList: [
              {
                target_code: '011',
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
            ],
          },
        ],
      },
      {
        target_id: 'isRain',
        target_name: '강우 감지 여부',
        is_sensor: 1,
        // save_db_type: BLOCK,
        description: '감지시 1, 미감지시 0',
        defList: [
          {
            target_id: 'isRain',
            target_prefix: 'IR',
            target_name: '강우 감지 여부',
            nodeList: [
              {
                target_code: '011',
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
            ],
          },
        ],
      },
      {
        target_id: 'co2',
        target_name: '이산화탄소',
        is_sensor: 1,
        // save_db_type: BLOCK,
        data_unit: 'ppm',
        description: '백만분의 1. 이산화탄소 농도 395ppm = 395/1,000,000 * 100 = 0.0395 %',
        defList: [
          {
            target_id: 'co2',
            target_prefix: 'CO',
            target_name: '이산화탄소',
            nodeList: [
              {
                target_code: '010',
                axisScale: [0, 0],
                moveScale: [1.2, -3],
              },
              {
                target_code: '011',
                axisScale: [0, 0],
                moveScale: [-0.7, 0],
              },
            ],
          },
        ],
      },
      {
        target_id: 'uv',
        target_name: '자외선',
        is_sensor: 1,
        // save_db_type: BLOCK,
        data_unit: 'mJ/c㎡',
        description: '1평방 센치당 조사되는 uv 에너지가 1mJ',
        defList: [],
      },
      {
        target_id: 'lux',
        target_name: '조도',
        is_sensor: 1,
        // save_db_type: BLOCK,
        data_unit: 'lx',
        description: '1㎡의 면적 위에 1m의 광속이 균일하게 비춰질 때',
        defList: [
          {
            target_id: 'lux',
            target_prefix: 'LX',
            target_name: '조도',
            nodeList: [
              {
                target_code: '010',
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '011',
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
            ],
          },
        ],
      },
      {
        target_id: 'waterValue',
        target_name: 'EC 값',
        is_sensor: 1,
        // save_db_type: BLOCK,
        data_unit: '%',
        description: '',
        defList: [
          {
            target_id: 'soilWaterValue',
            target_prefix: 'WVS',
            target_name: '토양 EC 값',
            nodeList: [
              {
                target_code: '010',
                axisScale: [0, 0],
                moveScale: [1.2, 3],
              },
              {
                target_code: '011',
                axisScale: [0, 0],
                moveScale: [0.4, 0.4],
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
        target_id: 'MW',
        target_name: '전력량',
        is_sensor: 2,
        is_submit_api: 0,
        save_db_type: BLOCK,
        data_unit: 'MW',
        description:
          '1 메가와트(기호 MW)는 1 초 동안의 1,000,000 줄(N·m)에 해당하는 일률의 SI 단위',
        defList: [],
      },
      {
        target_id: 'Wh',
        target_name: '전력량',
        is_sensor: 2,
        is_submit_api: 0,
        save_db_type: BLOCK,
        data_unit: 'Wh',
        description: '시간당 에너지 단위, 1 W의 일률로 1 시간 동안 하는 일의 양',
        defList: [],
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
        target_id: 'MWh',
        target_name: '전력량',
        is_sensor: 2,
        is_submit_api: 0,
        save_db_type: BLOCK,
        data_unit: 'MWh',
        description: '시간당 에너지 단위, 1 MW의 일률로 1 시간 동안 하는 일의 양',
        defList: [],
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
                target_name: '단면 4x9(I)',
                chart_color: '#212529',
                chart_sort_rank: 1,
                repeatId: 'RE_PREFIX_IVT',
                nodeList: [],
              },
              {
                target_code: 'B',
                target_name: '양면 4x9(I)',
                chart_color: '#fcc2d7',
                chart_sort_rank: 2,
                repeatId: 'RE_PREFIX_IVT',
                nodeList: [],
              },
              {
                target_code: 'C',
                target_name: '단면(2.5m) 3x12(I)',
                chart_color: '#d0bfff',
                chart_sort_rank: 3,
                repeatId: 'RE_PREFIX_IVT',
                nodeList: [],
              },
              {
                target_code: 'D',
                target_name: '양면(2.5m) 3x12(I)',
                chart_color: '#99e9f2',
                chart_sort_rank: 4,
                repeatId: 'RE_PREFIX_IVT',
                nodeList: [],
              },
              {
                target_code: 'E',
                target_name: '단면추적 4x9(M.I)',
                chart_color: '#212529',
                chart_sort_rank: 5,
                repeatId: 'RE_PREFIX_IVT',
                nodeList: [],
              },
              {
                target_code: 'F',
                target_name: '양면 3x12(M.I)',
                chart_color: '#a9e34b',
                chart_sort_rank: 6,
                repeatId: 'RE_PREFIX_IVT',
                nodeList: [],
              },
              {
                target_code: 'G',
                target_name: '단면 3x12(M.I)',
                chart_color: '#ffe066',
                chart_sort_rank: 7,
                repeatId: 'RE_PREFIX_IVT',
                nodeList: [],
              },
              {
                target_code: 'H',
                target_name: '양면추적 4x9(M.I)',
                chart_color: '#2b8a3e',
                chart_sort_rank: 8,
                repeatId: 'RE_PREFIX_IVT',
                nodeList: [],
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
            target_id: 'farmParallelSite',
            target_prefix: 'FPS',
            target_name: '농업 병행 부지',
            placeList: [
              {
                target_code: '62',
                nodeList: ['SPU_062', 'SPU_063'],
                depth: 0,
              },
              {
                target_code: '61',
                nodeList: ['RHOA_061', 'SPU_061', 'TOA_061', 'WD_061', 'WS_061'],
                depth: 0,
              },
              {
                target_code: '10',
                nodeList: ['CO_010', 'LX_010', 'RHS_010', 'SPU_010', 'TS_010', 'WVS_010'],
                depth: 0,
              },
            ],
          },
        ],
      },
      {
        target_id: 'outside',
        target_name: '외부 환경',
        description:
          '농업 병행 태양광 부지와의 대조군으로 작물 생육에 들어간 센서와 기상환경 계측 센서 존재',
        defList: [
          {
            target_id: 'outside',
            target_prefix: 'OS',
            target_name: '외기 환경',
            placeList: [
              {
                target_code: '11',
                nodeList: [
                  'CO_011',
                  'IR_911',
                  'LX_011',
                  'RFH_011',
                  'RHOA_011',
                  'RHS_011',
                  'SH_011',
                  'TOA_011',
                  'TS_011',
                  'WVS_011',
                  'WD_011',
                  'WS_011',
                ],
              },
            ],
          },
        ],
      },
    ],
    svgResourceConnectionList: [
      {
        targetIdList: ['FPS_62', 'FPS_61', 'FPS_10'],
        resourceIdList: ['farmParallelSite'],
      },
      {
        targetIdList: [
          'SPU_063',
          'SPU_062',
          'RHOA_061',
          'SPU_061',
          'TOA_061',
          'WD_061',
          'WS_061',
          'CO_010',
          'LX_010',
          'RHS_010',
          'SPU_010',
          'TS_010',
          'WVS_010',
          'CO_011',
          'IR_911',
          'LX_011',
          'RFH_011',
          'RHOA_011',
          'RHS_011',
          'SH_011',
          'TOA_011',
          'TS_011',
          'WVS_011',
          'WD_011',
          'WS_011',
        ],
        resourceIdList: ['sensor'],
      },
    ],
    hiddenTextSvgModelResourceIdList: [],
  },
  controlInfo: {},
};

module.exports = map;
