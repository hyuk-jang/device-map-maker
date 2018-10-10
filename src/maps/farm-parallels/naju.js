require('../../../../default-intelligence');

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
      svgModelResourceList: [
        {
          id: 'salternBlock_001',
          type: 'rect',
          elementDrawInfo: {
            width: 100,
            height: 150,
            color: '#33ffff',
          },
        },
        {
          id: 'salternBlock_002',
          type: 'rect',
          elementDrawInfo: {
            width: 100,
            height: 150,
            color: '#33ffff',
          },
        },
        {
          id: 'salternLine_001',
          type: 'line',
          elementDrawInfo: {
            strokeWidth: 100,
            color: '#33ccff',
          },
        },
        {
          id: 'pump_001',
          type: 'circle',
          elementDrawInfo: {
            radius: 20,
            color: '#9fe667',
          },
        },
        {
          id: 'valve_001',
          type: 'rhombus',
          elementDrawInfo: {
            width: 20,
            height: 20,
            rotate: 45,
            color: '#efb4ce',
          },
        },
      ],
    },
    positionList: [{}],
  },
  setInfo: {
    mainInfo: {
      main_seq: 1,
      uuid: '001',
    },
    dccConstructorList: [
      {
        dccId: 'DCC_001',
        connect_info: {
          type: 'socket',
          subType: '',
          host: 'localhost',
          port: 9000,
        },
      },
      {
        dccId: 'DCC_002',
        connect_info: {
          type: 'modbus',
          subType: 'rtu',
          baudRate: 9600,
          port: 'COM3',
        },
      },
    ],
    dpcConstructorList: [
      {
        dpcId: 'DPC_001',
        protocol_info: {
          mainCategory: 'FarmParallel',
          subCategory: 'dmTech',
        },
      },
    ],
    dataLoggerStructureList: [
      {
        target_prefix: 'D_CE',
        target_name: 'Crops Environment (작물 생육 환경)',
        dataLoggerDeviceList: [
          {
            serial_number: 1,
            target_code: '001',
            target_name: '나주(배) 태양광 하부',
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            nodeList: ['LX_001', 'IS_001', 'CO2_001', 'WV_S_001', 'T_S_001', 'RH_S_001'],
          },
          {
            serial_number: 2,
            target_code: '002',
            target_name: '나주(배) 외부',
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            nodeList: ['LX_002', 'IS_002', 'CO2_002', 'WV_S_002', 'T_S_002', 'RH_S_002'],
          },
          {
            serial_number: 3,
            target_code: '003',
            target_name: '나주(배추) 태양광 하부',
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            nodeList: ['LX_003', 'IS_003', 'CO2_003', 'WV_S_003', 'T_S_003', 'RH_S_003'],
          },
          {
            serial_number: 4,
            target_code: '004',
            target_name: '나주(배추) 외부',
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            nodeList: ['LX_004', 'IS_004', 'CO2_004', 'WV_S_004', 'T_S_004', 'RH_S_004'],
          },
          {
            serial_number: 5,
            target_code: '005',
            target_name: '나주(양파) 태양광 하부',
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            nodeList: ['LX_005', 'IS_005', 'CO2_005', 'WV_S_005', 'T_S_005', 'RH_S_005'],
          },
          {
            serial_number: 6,
            target_code: '006',
            target_name: '나주(양파) 외부',
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            nodeList: ['LX_006', 'IS_006', 'CO2_006', 'WV_S_006', 'T_S_006', 'RH_S_006'],
          },
        ],
      },
      {
        target_prefix: 'D_OE',
        target_name: 'Outside Environment (외기 환경)',
        dataLoggerDeviceList: [
          {
            serial_number: 7,
            target_code: '007',
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            nodeList: [
              'LX_007',
              'IS_007',
              'CO2_007',
              'WV_S_007',
              'T_S_007',
              'RH_S_007',
              'T_OA_001',
              'RH_OA_001',
              'W_D_001',
              'W_S_001',
              'RF1_001',
              'IR_001',
            ],
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
            target_id: 'soilTemperature',
            target_prefix: 'T_S',
            target_name: '토양 온도',
            nodeList: [
              {
                target_code: '001',
              },
              {
                target_code: '002',
              },
              {
                target_code: '003',
              },
              {
                target_code: '004',
              },
              {
                target_code: '005',
              },
              {
                target_code: '006',
              },
              {
                target_code: '007',
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
        target_id: 'reh',
        target_name: '습도',
        is_sensor: 1,
        data_unit: '%RH',
        description: '공기 중에 포함되어 있는 수증기의 양 또는 비율을 나타내는 단위',
        defList: [
          {
            target_id: 'soilReh',
            target_prefix: 'RH_S',
            target_name: '토양 습도',
            nodeList: [
              {
                target_code: '001',
              },
              {
                target_code: '002',
              },
              {
                target_code: '003',
              },
              {
                target_code: '004',
              },
              {
                target_code: '005',
              },
              {
                target_code: '006',
              },
              {
                target_code: '007',
              },
            ],
          },
          {
            target_id: 'outsideAirReh',
            target_prefix: 'RH_OA',
            target_name: '외기 습도',
            nodeList: [
              {
                target_code: '001',
              },
            ],
          },
        ],
      },
      {
        target_id: 'ws',
        target_name: '풍속',
        is_sensor: 1,
        data_unit: 'm/s',
        description: '초당 바람이 이동하는 거리(m)',
        defList: [
          {
            target_id: 'windSpeed',
            target_prefix: 'W_S',
            nodeList: [
              {
                target_code: '001',
              },
            ],
          },
        ],
      },
      {
        target_id: 'wd',
        target_name: '풍향',
        is_sensor: 1,
        data_unit: '°',
        description: '바람이 불어오는 방향을 360 각도로 표현',
        defList: [
          {
            target_id: 'windDirection',
            target_prefix: 'W_D',
            nodeList: [
              {
                target_code: '001',
              },
            ],
          },
        ],
      },
      {
        target_id: 'solar',
        target_name: '일사량',
        is_sensor: 1,
        data_unit: 'W/m²',
        description: '1평방 미터당 조사되는 일사에너지의 양이 1W',
        defList: [
          {
            target_id: 'horizontalSolar',
            target_name: '수평 일사량',
            target_prefix: 'HS',
            nodeList: [
              {
                target_code: '001',
              },
              {
                target_code: '002',
              },
              {
                target_code: '003',
              },
              {
                target_code: '004',
              },
              {
                target_code: '005',
              },
              {
                target_code: '006',
              },
              {
                target_code: '007',
              },
            ],
          },
          {
            target_id: 'inclinedSolar',
            target_name: '경사 일사량',
            target_prefix: 'IS',
            nodeList: [
              {
                target_code: '001',
              },
              {
                target_code: '002',
              },
              {
                target_code: '003',
              },
            ],
          },
        ],
      },
      {
        target_id: 'rainfall',
        target_name: '강우량',
        is_sensor: 1,
        data_unit: 'mm/hr',
        description: '시간당 일정한 곳에 내린 비의 분량. 단위는 mm',
        defList: [
          {
            target_id: 'r1',
            target_prefix: 'RF1',
            target_name: '시간당 강우량',
            nodeList: [
              {
                target_code: '001',
              },
            ],
          },
        ],
      },
      {
        target_id: 'isRain',
        target_name: '강우 감지 여부',
        is_sensor: 1,
        data_unit: null,
        description: '감지시 1, 미감지시 0',
        defList: [
          {
            target_id: 'isRain',
            target_prefix: 'IR',
            target_name: '강우 감지 여부',
            nodeList: [
              {
                target_code: '001',
              },
            ],
          },
        ],
      },
      {
        target_id: 'co2',
        target_name: '이산화탄소',
        is_sensor: 1,
        data_unit: 'ppm',
        description: '백만분의 1. 이산화탄소 농도 395ppm = 395/1,000,000 * 100 = 0.0395 %',
        defList: [
          {
            target_id: 'co2',
            target_prefix: 'CO2',
            nodeList: [
              {
                target_code: '001',
              },
              {
                target_code: '002',
              },
              {
                target_code: '003',
              },
              {
                target_code: '004',
              },
              {
                target_code: '005',
              },
              {
                target_code: '006',
              },
              {
                target_code: '007',
              },
            ],
          },
        ],
      },
      {
        target_id: 'uv',
        target_name: '자외선',
        is_sensor: 1,
        data_unit: 'mJ/c㎡',
        description: '1평방 센치당 조사되는 uv 에너지가 1mJ',
        defList: [],
      },
      {
        target_id: 'lux',
        target_name: '조도',
        is_sensor: 1,
        data_unit: 'lx',
        description: '1㎡의 면적 위에 1m의 광속이 균일하게 비춰질 때',
        defList: [
          {
            target_id: 'lux',
            target_prefix: 'LX',
            nodeList: [
              {
                target_code: '001',
              },
              {
                target_code: '002',
              },
              {
                target_code: '003',
              },
              {
                target_code: '004',
              },
              {
                target_code: '005',
              },
              {
                target_code: '006',
              },
              {
                target_code: '007',
              },
            ],
          },
        ],
      },
      {
        target_id: 'waterValue',
        target_name: '수분 값',
        is_sensor: 1,
        data_unit: '%',
        description: '',
        defList: [
          {
            target_id: 'soilWaterValue',
            target_prefix: 'WV_S',
            target_name: '토양 수분 값',
            nodeList: [
              {
                target_code: '001',
              },
              {
                target_code: '002',
              },
              {
                target_code: '003',
              },
              {
                target_code: '004',
              },
              {
                target_code: '005',
              },
              {
                target_code: '006',
              },
              {
                target_code: '007',
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
        defList: [],
      },
      {
        target_id: 'amp',
        target_name: '전류',
        is_sensor: 1,
        data_unit: 'A',
        description: null,
        defList: [],
      },
    ],
  },
  realtionInfo: {
    placeRelationList: [
      {
        target_id: 'NAJU_pear',
        target_name: '나주(배)',
        description: '',
        defList: [
          {
            target_id: 'NJP_bottom',
            target_prefix: 'NJPB',
            target_name: '태양광 하부',
            placeList: [
              {
                nodeList: ['LX_001', 'IS_001', 'CO2_001', 'WV_S_001', 'T_S_001', 'RH_S_001'],
              },
            ],
          },
          {
            target_id: 'NJP_suburb',
            target_prefix: 'NJPS',
            target_name: '외곽',
            placeList: [
              {
                nodeList: ['LX_002', 'IS_002', 'CO2_002', 'WV_S_002', 'T_S_002', 'RH_S_002'],
              },
            ],
          },
        ],
      },
      {
        target_id: 'NAJU_cabbage',
        target_name: '나주(배추)',
        description: '',
        defList: [
          {
            target_id: 'NJC_bottom',
            target_prefix: 'NJCB',
            target_name: '태양광 하부',
            placeList: [
              {
                nodeList: ['LX_003', 'IS_003', 'CO2_003', 'WV_S_003', 'T_S_003', 'RH_S_003'],
              },
            ],
          },
          {
            target_id: 'NJC_suburb',
            target_prefix: 'NJCS',
            target_name: '외곽',
            placeList: [
              {
                nodeList: ['LX_004', 'IS_004', 'CO4_004', 'WV_S_004', 'T_S_004', 'RH_S_004'],
              },
            ],
          },
        ],
      },
      {
        target_id: 'NAJU_onion',
        target_name: '나주(양파)',
        description: '',
        defList: [
          {
            target_id: 'NJO_bottom',
            target_prefix: 'NJOB',
            target_name: '태양광 하부',
            placeList: [
              {
                nodeList: ['LX_005', 'IS_005', 'CO2_005', 'WV_S_005', 'T_S_005', 'RH_S_005'],
              },
            ],
          },
          {
            target_id: 'NJO_suburb',
            target_prefix: 'NJOS',
            target_name: '외곽',
            placeList: [
              {
                nodeList: ['LX_006', 'IS_006', 'CO6_006', 'WV_S_006', 'T_S_006', 'RH_S_006'],
              },
            ],
          },
        ],
      },
      {
        target_id: 'NAJU_outsideAir',
        target_name: '나주',
        description: '작물 생육에 들어간 센서와 기상환경 계측 센서가 들어간 장소 ',
        defList: [
          {
            target_id: 'NAJU_outsideAir',
            target_prefix: 'NJOA',
            target_name: '외기 환경',
            placeList: [
              {
                nodeList: [
                  'LX_007',
                  'IS_007',
                  'CO2_007',
                  'WV_S_007',
                  'T_S_007',
                  'RH_S_007',
                  'T_OA_001',
                  'RH_OA_001',
                  'W_D_001',
                  'W_S_001',
                  'RF1_001',
                  'IR_001',
                ],
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
