const {
  di: {
    dcmConfigModel: {
      nodeDataType: { BLOCK, TROUBLE, NONE },
    },
  },
} = require('../../../module');

const pvNormalPatternInfo = {
  patternSize: [10, 10],
  patternList: [
    {
      patternType: 'image',
      fill: '/out/cell',
      size: [10, 10],
      opacity: 0.5,
    },
  ],
};

const pvTransPatternInfo = {
  patternSize: [10, 10],
  patternList: [
    {
      patternType: 'image',
      fill: '/out/cell',
      size: [10, 10],
      opacity: 0.8,
    },
  ],
};

// Map Size 정보
const ms = {
  SENSOR: {
    START_X: 100,
    START_Y: 30,
    WIDTH: 300,
    HEIGHT: 400,
  },
  DEVICE: {
    START_X: 500,
    START_Y: 30,
    WIDTH: 300,
    HEIGHT: 400,
  },
  // 비닐 하우스 (Vinyl House)
  VH: {
    START_X: 100,
    START_Y: 30,
    INTERVAL: 100,
    WIDTH: 450,
    HEIGHT: 80,
    BIG_HEIGHT: 180,
  },
  // 센서 (SenSor)
  SS: {
    WIDTH: 100,
    BIG_WIDTH: 200,
    INTERVAL: 20,
  },
};

/**
 * @type {mDeviceMap}
 */
const map = {
  drawInfo: {
    frame: {
      mapInfo: {
        width: 800,
        height: 1100,
        backgroundInfo: {
          backgroundData: '',
          backgroundPosition: [0, 0],
        },
      },
      svgModelResourceList: [
        {
          id: 'sensorArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SENSOR.WIDTH,
            height: ms.SENSOR.HEIGHT,
            color: '#dbe4ff',
            opacity: 1,
          },
          textStyleInfo: { color: '', axisScale: [0.5, -0.3] },
        },
        {
          id: 'deviceArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.DEVICE.WIDTH,
            height: ms.DEVICE.BIG_HEIGHT,
            color: '#abefff',
            opacity: 1,
          },
          textStyleInfo: { color: '' },
        },
        /* *************       Device        ***************** */
        {
          id: 'valve',
          type: 'circle',
          elementDrawInfo: {
            radius: 40,
            color: ['#a3a3a3', '#22fb00'],
            opacity: 1,
            strokeInfo: {
              width: 0.7,
              color: '#000',
            },
          },
          textStyleInfo: { fontSize: 8 },
        },
        /* *************       Sensor        ***************** */
        {
          id: 'sensor',
          type: 'rect',
          elementDrawInfo: {
            width: 60,
            height: 30,
            color: '#f0f0f0',
            opacity: 1,
            strokeInfo: {
              width: 0.7,
              color: '#000',
            },
          },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'pressureSensor',
          type: 'rect',
          elementDrawInfo: {
            width: 60,
            height: 30,
            color: '#f0f0f0',
            opacity: 1,
            strokeInfo: {
              width: 0.7,
            },
          },
          textStyleInfo: { color: '', fontSize: 8 },
        },
      ],
    },
    positionInfo: {
      svgPlaceList: [],
      svgNodeList: [],
    },
  },
  setInfo: {
    mainInfo: {
      uuid: '102',
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
          mainCategory: 'Sensor',
          subCategory: 'pressorSensor',
          cmdExecTimeoutMs: 1000 * 2,
        },
      },
      {
        dpcId: 'DPC_002',
        protocol_info: {
          mainCategory: 'Sensor',
          subCategory: 'Valve',
          cmdExecTimeoutMs: 1000 * 2,
        },
      },
    ],
    dataLoggerStructureList: [
      {
        target_prefix: 'D_CE',
        target_name: 'Crops Environment (작물 생육 환경)',
        dataLoggerDeviceList: [
          {
            serial_number: 21,
            target_code: '021',
            target_name: 'A',
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            nodeList: ['S_PU_021'],
          },
          {
            serial_number: 22,
            target_code: '022',
            target_name: 'B',
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            nodeList: ['S_PU_022', 'T_S_022', 'RH_S_022', 'T_OA_022', 'RH_OA_022'],
          },
          {
            serial_number: 23,
            target_code: '023',
            target_name: 'C',
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            nodeList: ['S_PU_023'],
          },
        ],
      },
      {
        target_prefix: 'D_OE',
        target_name: 'Outside Environment (외기 환경)',
        dataLoggerDeviceList: [
          {
            serial_number: 24,
            target_code: '024',
            target_name: '외기 환경',
            dccId: 'DCC_001',
            dpcId: 'DPC_001',
            nodeList: ['S_H_024', 'T_S_024', 'RH_S_024', 'T_OA_024', 'RH_OA_024'],
          },
        ],
      },
      {
        target_prefix: 'D_IVT',
        target_name: '인버터 DL',
        dataLoggerDeviceList: [
          {
            target_code: '1',
            target_name: '투명 16장(I)',
            serial_number: Buffer.from([58]),
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_003',
            repeatId: 'RE_PREFIX_IVT',
          },
          {
            target_code: '2',
            target_name: '일반 14장(I)',
            serial_number: Buffer.from([57]),
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_003',
            repeatId: 'RE_PREFIX_IVT',
          },

          {
            target_code: '11',
            target_name: '투명 4장(M.I)',
            serial_number: 1,
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_004',
            repeatId: 'RE_PREFIX_IVT',
          },
          {
            target_code: '12',
            target_name: '일반 4장(M.I)',
            serial_number: 2,
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_004',
            repeatId: 'RE_PREFIX_IVT',
          },
          {
            target_code: '13',
            target_name: '투명 4장(M.I)',
            serial_number: 3,
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_004',
            repeatId: 'RE_PREFIX_IVT',
            is_deleted: 1,
          },
          {
            target_code: '14',
            target_name: '일반 4장(M.I)',
            serial_number: 4,
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_004',
            repeatId: 'RE_PREFIX_IVT',
            is_deleted: 1,
          },
          {
            target_code: '15',
            target_name: '일반 8장(M.I)',
            serial_number: 5,
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_004',
            repeatId: 'RE_PREFIX_IVT',
            is_deleted: 1,
          },
          {
            target_code: '16',
            target_name: '투명 6장(M.I)',
            serial_number: 6,
            dccId: 'DCC_001',
            dpcId: 'DPC_IVT_004',
            repeatId: 'RE_PREFIX_IVT',
            is_deleted: 1,
          },
        ],
      },
      {
        target_prefix: 'D_ST',
        target_name: '개폐기 DL',
        dataLoggerDeviceList: [
          {
            serial_number: '0013A2004190ED67',
            target_code: '01',
            target_name: '하우스 개폐기',
            dccId: 'DCC_001',
            dpcId: 'DPC_002',
            nodeList: [
              'ST_001',
              'ST_002',
              'ST_003',
              'ST_004',
              'ST_005',
              'ST_006',
              'ST_007',
              'ST_008',
              'ST_009',
              'ST_010',
              'ST_011',
              'ST_012',
              'ST_013',
              'ST_014',
              'ST_015',
              'ST_016',
            ],
          },
        ],
      },
      {
        target_prefix: 'D_P',
        target_name: '펌프 DL',
        dataLoggerDeviceList: [
          {
            serial_number: '0013A2004190EDB7',
            target_code: '001',
            target_name: '펌프 제어반',
            dccId: 'DCC_001',
            dpcId: 'DPC_002',
            nodeList: ['P_001', 'P_002', 'P_003'],
          },
        ],
      },
    ],
    nodeStructureList: [
      /* *********             Device             ********* */
      {
        target_id: 'shutter',
        target_name: '개폐기',
        is_sensor: 0,
        is_submit_api: 1,
        description: '개폐기',
        defList: [
          {
            target_id: 'shutter',
            target_prefix: 'ST',
            target_name: '하우스 개폐기',
            nodeList: [
              {
                target_code: '001',
                target_name: '1-A',
                data_logger_index: 0,
                svgNodePosOpt: {
                  // placeId: 'VNH_1',
                  resourceId: 'shutter',
                  axisScale: [0, 0],
                  moveScale: [-1, 0],
                },
              },
              {
                target_code: '002',
                target_name: '1-B',
                data_logger_index: 1,
                svgNodePosOpt: {
                  placeId: 'VNH_1',
                  resourceId: 'shutter',
                  axisScale: [0, 1],
                  moveScale: [-1, 0],
                },
              },
              {
                target_code: '003',
                target_name: '2-A',
                data_logger_index: 2,
                svgNodePosOpt: {
                  placeId: 'VNH_2',
                  resourceId: 'shutter',
                  axisScale: [0, 0],
                  moveScale: [-1, 0],
                },
              },
              {
                target_code: '004',
                target_name: '2-B',
                data_logger_index: 3,
                svgNodePosOpt: {
                  placeId: 'VNH_2',
                  resourceId: 'shutter',
                  axisScale: [0, 1],
                  moveScale: [-1, 0],
                },
              },
              {
                target_code: '005',
                target_name: '3-A',
                data_logger_index: 4,
                svgNodePosOpt: {
                  placeId: 'VNH_3',
                  resourceId: 'shutter',
                  axisScale: [0, 0],
                  moveScale: [-1, 0],
                },
              },
              {
                target_code: '006',
                target_name: '3-B',
                data_logger_index: 5,
                svgNodePosOpt: {
                  placeId: 'VNH_3',
                  resourceId: 'shutter',
                  axisScale: [0, 1],
                  moveScale: [-1, 0],
                },
              },
              {
                target_code: '007',
                target_name: '4-A',
                data_logger_index: 6,
                svgNodePosOpt: {
                  placeId: 'VNH_4',
                  resourceId: 'shutter',
                  axisScale: [0, 0],
                  moveScale: [-1, 0],
                },
              },
              {
                target_code: '008',
                target_name: '4-B',
                data_logger_index: 7,
                svgNodePosOpt: {
                  placeId: 'VNH_4',
                  resourceId: 'shutter',
                  axisScale: [0, 1],
                  moveScale: [-1, 0],
                },
              },
              {
                target_code: '009',
                target_name: '5-A',
                data_logger_index: 8,
                svgNodePosOpt: {
                  placeId: 'VNH_5',
                  resourceId: 'shutter',
                  axisScale: [0, 0],
                  moveScale: [-1, 0],
                },
              },
              {
                target_code: '010',
                target_name: '5-B',
                data_logger_index: 9,
                svgNodePosOpt: {
                  placeId: 'VNH_5',
                  resourceId: 'shutter',
                  axisScale: [0, 1],
                  moveScale: [-1, 0],
                },
              },
              {
                target_code: '011',
                target_name: '6-A',
                data_logger_index: 10,
                svgNodePosOpt: {
                  placeId: 'VNH_6',
                  resourceId: 'shutter',
                  axisScale: [0, 0],
                  moveScale: [-1, 0],
                },
              },
              {
                target_code: '012',
                target_name: '6-B',
                data_logger_index: 11,
                svgNodePosOpt: {
                  placeId: 'VNH_6',
                  resourceId: 'shutter',
                  axisScale: [0, 1],
                  moveScale: [-1, 0],
                },
              },
              {
                target_code: '013',
                target_name: '7-A',
                data_logger_index: 12,
                svgNodePosOpt: {
                  placeId: 'VNH_7',
                  resourceId: 'shutter',
                  axisScale: [0, 0],
                  moveScale: [-1, 0],
                },
              },
              {
                target_code: '014',
                target_name: '7-B',
                data_logger_index: 13,
                svgNodePosOpt: {
                  placeId: 'VNH_7',
                  resourceId: 'shutter',
                  axisScale: [0, 1],
                  moveScale: [-1, 0],
                },
              },
              {
                target_code: '015',
                target_name: '8-A',
                data_logger_index: 14,
                svgNodePosOpt: {
                  placeId: 'VNH_8',
                  resourceId: 'shutter',
                  axisScale: [0, 0],
                  moveScale: [-1, 0],
                },
              },
              {
                target_code: '016',
                target_name: '8-B',
                data_logger_index: 15,
                svgNodePosOpt: {
                  placeId: 'VNH_8',
                  resourceId: 'shutter',
                  axisScale: [0, 1],
                  moveScale: [-1, 0],
                },
              },
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
              {
                target_code: '001',
                target_name: '펌프',
                data_logger_index: 0,
                svgNodePosOpt: {
                  placeId: 'PCH',
                  resourceId: 'pump',
                  axisScale: [1, 1],
                  moveScale: [-0.3, -0.3],
                },
              },
              {
                target_code: '002',
                target_name: '양액 A',
                data_logger_index: 1,
                svgNodePosOpt: {
                  placeId: 'PCH',
                  resourceId: 'pump',
                  axisScale: [0, 0],
                  moveScale: [0.3, 0.3],
                },
              },
              {
                target_code: '003',
                target_name: '양액 B',
                data_logger_index: 2,
                svgNodePosOpt: {
                  placeId: 'PCH',
                  resourceId: 'pump',
                  axisScale: [1, 0],
                  moveScale: [-0.3, 0.3],
                },
              },
            ],
          },
        ],
      },
      /* *********             Sensor             ********* */
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
                target_code: '022',
                svgNodePosOpt: {
                  resourceId: 'sensor',
                  axisScale: [0.25, 0.15],
                },
              },
              {
                target_code: '024',
                svgNodePosOpt: {
                  resourceId: 'sensor',
                  axisScale: [0.25, 0.15],
                },
              },
            ],
          },
          {
            target_id: 'outsideAirTemperature',
            target_prefix: 'T_OA',
            target_name: '외기 온도',
            nodeList: [
              {
                target_code: '022',
                svgNodePosOpt: {
                  resourceId: 'sensor',
                  axisScale: [0.75, 0.15],
                },
              },
              {
                target_code: '024',
                svgNodePosOpt: {
                  resourceId: 'sensor',
                  axisScale: [0.75, 0.15],
                },
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
                target_code: '022',
                svgNodePosOpt: {
                  resourceId: 'sensor',
                  axisScale: [0.25, 0.85],
                },
              },
              {
                target_code: '024',
                svgNodePosOpt: {
                  resourceId: 'sensor',
                  axisScale: [0.25, 0.85],
                },
              },
            ],
          },
          {
            target_id: 'outsideAirReh',
            target_prefix: 'RH_OA',
            target_name: '외기 습도',
            nodeList: [
              {
                target_code: '022',
                svgNodePosOpt: {
                  resourceId: 'sensor',
                  axisScale: [0.75, 0.85],
                },
              },
              {
                target_code: '024',
                svgNodePosOpt: {
                  resourceId: 'sensor',
                  axisScale: [0.75, 0.85],
                },
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
            target_prefix: 'S_H',
            nodeList: [
              {
                target_code: '024',
                svgNodePosOpt: {
                  resourceId: 'sensor',
                  axisScale: [0.5, 0.5],
                },
              },
            ],
          },
          {
            target_id: 'pvUnderlyingSolar',
            target_name: '하부 일사량',
            target_prefix: 'S_PU',
            nodeList: [
              {
                target_code: '021',
                svgNodePosOpt: {
                  resourceId: 'sensor',
                  axisScale: [0.5, 0.5],
                },
              },
              {
                target_code: '022',
                svgNodePosOpt: {
                  resourceId: 'sensor',
                  axisScale: [0.5, 0.5],
                },
              },
              {
                target_code: '023',
                svgNodePosOpt: {
                  resourceId: 'sensor',
                  axisScale: [0.5, 0.5],
                },
              },
            ],
          },
        ],
      },
      /* *********             PCS             ********* */
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
            target_id: 'pvVol2',
            target_name: '인버터 PV 전압 2',
            target_prefix: 'IVT_PV_V2',
            repeatId: 'RE_NODE_IVT',
            nodeList: [
              {
                target_code: '1',
                target_name: '투명 1(I)',
              },
              {
                target_code: '2',
                target_name: '일반 2(I)',
              },
            ],
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
            nodeList: [
              {
                target_code: '1',
                target_name: '투명(I)',
                svgNodePosOpt: {
                  resourceId: 'powerGridKw',
                  axisScale: [0.5, 0.5],
                },
              },
              {
                target_code: '2',
                target_name: '일반(I)',
                svgNodePosOpt: {
                  resourceId: 'powerGridKw',
                  axisScale: [0.5, 0.5],
                },
              },
              {
                target_code: '11',
                target_name: '투명 1(I)',
                svgNodePosOpt: {
                  resourceId: 'powerGridKw',
                  axisScale: [0.5, 0.5],
                },
              },
              {
                target_code: '12',
                target_name: '투명 2(I)',
                svgNodePosOpt: {
                  resourceId: 'powerGridKw',
                  axisScale: [0.5, 0.5],
                },
              },
              {
                target_code: '13',
                target_name: '일반 1(M.I)',
                svgNodePosOpt: {
                  resourceId: 'powerGridKw',
                  axisScale: [0.5, 0.5],
                },
              },
              {
                target_code: '14',
                target_name: '일반 2(M.I)',
                svgNodePosOpt: {
                  resourceId: 'powerGridKw',
                  axisScale: [0.5, 0.5],
                },
              },
              {
                target_code: '15',
                target_name: '일반 3(M.I)',
                svgNodePosOpt: {
                  resourceId: 'powerGridKw',
                  axisScale: [0.5, 0.5],
                },
              },
              {
                target_code: '16',
                target_name: '투명 4(M.I)',
                svgNodePosOpt: {
                  resourceId: 'powerGridKw',
                  axisScale: [0.5, 0.5],
                },
              },
            ],
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
                target_code: '1',
                target_name: '1(I)',
                chart_color: '#c92a2a',
                chart_sort_rank: 21,
                repeatId: 'RE_PREFIX_IVT',
              },
              {
                target_code: '2',
                target_name: '2(I)',
                chart_color: '#868e96',
                chart_sort_rank: 22,
                repeatId: 'RE_PREFIX_IVT',
              },
              {
                target_code: '11',
                target_name: '1(M.I)',
                chart_color: '#b9560d',
                chart_sort_rank: 23,
                repeatId: 'RE_PREFIX_IVT',
              },
              {
                target_code: '12',
                target_name: '2(M.I)',
                chart_color: '#3bc9db',
                chart_sort_rank: 24,
                repeatId: 'RE_PREFIX_IVT',
              },
              {
                target_code: '13',
                target_name: '3(M.I)',
                chart_color: '#868e96',
                chart_sort_rank: 25,
                repeatId: 'RE_PREFIX_IVT',
              },
              {
                target_code: '14',
                target_name: '4(M.I)',
                chart_color: '#7048e8',
                chart_sort_rank: 26,
                repeatId: 'RE_PREFIX_IVT',
              },
              {
                target_code: '15',
                target_name: '5(M.I)',
                chart_color: '#20c997',
                chart_sort_rank: 27,
                repeatId: 'RE_PREFIX_IVT',
              },
              {
                target_code: '16',
                target_name: '6(M.I)',
                chart_color: '#fcc419',
                chart_sort_rank: 28,
                repeatId: 'RE_PREFIX_IVT',
              },
            ],
          },
        ],
      },
      {
        target_id: 'house',
        target_name: '비닐 하우스',
        defList: [
          {
            target_id: 'vinylHouse',
            target_prefix: 'VNH',
            placeList: [
              {
                target_code: '1',
                nodeList: ['ST_001', 'ST_002'],
                svgPositionInfo: {
                  resourceId: 'vinylHouse',
                  point: [ms.VH.START_X, ms.VH.START_Y],
                },
              },
              {
                target_code: '2',
                nodeList: ['ST_003', 'ST_004'],
                svgPositionInfo: {
                  resourceId: 'vinylHouse',
                  point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 1],
                },
              },
              {
                target_code: '3',
                nodeList: ['ST_005', 'ST_006'],
                svgPositionInfo: {
                  resourceId: 'vinylHouse',
                  point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 2],
                },
              },
              {
                target_code: '4',
                nodeList: ['ST_007', 'ST_008'],
                svgPositionInfo: {
                  resourceId: 'vinylHouse',
                  point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 3],
                },
              },
              {
                target_code: '5',
                nodeList: ['ST_009', 'ST_010'],
                svgPositionInfo: {
                  resourceId: 'vinylHouse',
                  point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 4],
                },
              },
              {
                target_code: '6',
                nodeList: ['ST_011', 'ST_012'],
                svgPositionInfo: {
                  resourceId: 'bigVinylHouse',
                  point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 5],
                },
              },
              {
                target_code: '7',
                nodeList: ['ST_013', 'ST_014'],
                svgPositionInfo: {
                  resourceId: 'vinylHouse',
                  point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 7],
                },
              },
              {
                target_code: '8',
                nodeList: ['ST_015', 'ST_016'],
                svgPositionInfo: {
                  resourceId: 'vinylHouse',
                  point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 8],
                },
              },
            ],
          },
          // Pump Control House
          {
            target_id: 'pumpControl',
            target_name: '펌프 제어반',
            target_prefix: 'PCH',
            placeList: [
              {
                target_code: '',
                nodeList: ['P_001', 'P_002', 'P_003'],
                svgPositionInfo: {
                  resourceId: 'pumpPanel',
                  point: [
                    ms.VH.START_X + ms.VH.WIDTH + ms.VH.INTERVAL / 2,
                    ms.VH.START_Y + ms.VH.INTERVAL * 7,
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        target_id: 'pvArray',
        target_name: 'PV 어레이',
        defList: [
          {
            target_id: 'array',
            target_name: '일반',
            target_prefix: 'PVA',
            placeList: [
              {
                target_code: '1',
                target_name: 'PV_1_S_일반(7)',
                svgPositionInfo: {
                  resourceId: 'pvN_7EA',
                  point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 0 + ms.VH.HEIGHT / 2],
                },
              },
              {
                target_code: '2',
                target_name: 'PV_2_S_투명(7)',
                svgPositionInfo: {
                  resourceId: 'pvT_7EA',
                  point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 1 + ms.VH.HEIGHT / 2],
                },
              },
              {
                target_code: '3',
                target_name: 'PV_3_S_일반(7)',
                nodeList: ['IVT_PW_G_KW_1'],
                svgPositionInfo: {
                  resourceId: 'pvN_7EA',
                  point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 2 + ms.VH.HEIGHT / 2],
                },
              },
              {
                target_code: '4',
                target_name: 'PV_4_S_투명(7)',
                nodeList: ['IVT_PW_G_KW_2'],
                svgPositionInfo: {
                  resourceId: 'pvT_7EA',
                  point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 3 + ms.VH.HEIGHT / 2],
                },
              },
              {
                target_code: '5',
                target_name: 'PV_5_M_투명(6)',
                nodeList: ['IVT_PW_G_KW_11'],
                svgPositionInfo: {
                  resourceId: 'pvT_6EA',
                  point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 4 + ms.VH.HEIGHT / 2],
                },
              },
              {
                target_code: '6',
                target_name: 'PV_6_M_일반(8)',
                nodeList: ['IVT_PW_G_KW_12'],
                svgPositionInfo: {
                  resourceId: 'pvN_8EA',
                  point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 6 + ms.VH.HEIGHT / 2],
                },
              },
              {
                target_code: '7-A',
                target_name: 'PV_7-A_M_투명(4)',
                nodeList: ['IVT_PW_G_KW_13'],
                svgPositionInfo: {
                  resourceId: 'pvT_4EA',
                  point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 7 + ms.VH.HEIGHT / 2],
                },
              },
              {
                target_code: '7-B',
                target_name: 'PV_7-B_M_일반(4)',
                nodeList: ['IVT_PW_G_KW_14'],
                svgPositionInfo: {
                  resourceId: 'pvN_4EA',
                  point: [
                    ms.VH.START_X + (ms.VH.WIDTH / 8) * 4,
                    ms.VH.START_Y + ms.VH.INTERVAL * 7 + ms.VH.HEIGHT / 2,
                  ],
                },
              },
              {
                target_code: '8-A',
                target_name: 'PV_8-A_M_투명(4)',
                nodeList: ['IVT_PW_G_KW_15'],
                svgPositionInfo: {
                  resourceId: 'pvT_4EA',
                  point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 8 + ms.VH.HEIGHT / 2],
                },
              },
              {
                target_code: '8-B',
                target_name: 'PV_8-B_M_일반(4)',
                nodeList: ['IVT_PW_G_KW_16'],
                svgPositionInfo: {
                  resourceId: 'pvN_4EA',
                  point: [
                    ms.VH.START_X + (ms.VH.WIDTH / 8) * 4,
                    ms.VH.START_Y + ms.VH.INTERVAL * 8 + ms.VH.HEIGHT / 2,
                  ],
                },
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
                target_code: '021',
                target_name: 'A',
                chart_color: '#c92a2a',
                chart_sort_rank: 21,
                nodeList: ['S_PU_021'],
                svgPositionInfo: {
                  resourceId: 'pvSensor',
                  point: [ms.VH.START_X + ms.SS.INTERVAL, ms.VH.START_Y + ms.VH.INTERVAL * 5],
                },
              },
              {
                target_code: '022',
                target_name: 'B',
                chart_color: '#868e96',
                chart_sort_rank: 22,
                nodeList: ['S_PU_022', 'T_S_022', 'RH_S_022', 'T_OA_022', 'RH_OA_022'],
                svgPositionInfo: {
                  resourceId: 'bigPvSensor',
                  point: [
                    ms.VH.START_X + ms.VH.WIDTH / 2 - ms.SS.BIG_WIDTH / 2,
                    ms.VH.START_Y + ms.VH.INTERVAL * 5,
                  ],
                },
              },
              {
                target_code: '023',
                target_name: 'C',
                chart_color: '#b9560d',
                chart_sort_rank: 23,
                nodeList: ['S_PU_023'],
                svgPositionInfo: {
                  resourceId: 'pvSensor',
                  point: [
                    ms.VH.START_X - ms.SS.INTERVAL + ms.VH.WIDTH - ms.SS.WIDTH,
                    ms.VH.START_Y + ms.VH.INTERVAL * 5,
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        target_id: 'outside',
        target_name: '외기 환경',
        description:
          '농업 병행 태양광 부지와의 대조구으로 작물 생육에 들어간 센서와 기상환경 계측 센서 존재',
        defList: [
          {
            target_id: 'outside',
            target_prefix: 'OS',
            placeList: [
              {
                target_code: '024',
                chart_color: '#99e9f2',
                chart_sort_rank: 24,
                nodeList: ['S_H_024', 'T_S_024', 'RH_S_024', 'T_OA_024', 'RH_OA_024'],
                svgPositionInfo: {
                  resourceId: 'outsideSensor',
                  point: [
                    ms.VH.START_X + ms.VH.WIDTH / 2 - ms.SS.BIG_WIDTH / 2,
                    ms.VH.START_Y + ms.VH.INTERVAL * 9,
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
    svgResourceConnectionList: [
      {
        targetIdList: [
          'ST_001',
          'ST_002',
          'ST_003',
          'ST_004',
          'ST_005',
          'ST_006',
          'ST_007',
          'ST_008',
          'ST_009',
          'ST_010',
          'ST_011',
          'ST_012',
          'ST_013',
          'ST_014',
          'ST_015',
          'ST_016',
        ],
        resourceIdList: ['shutter'],
      },
      {
        targetIdList: ['P_001', 'P_002', 'P_003'],
        resourceIdList: ['pump'],
      },
      {
        targetIdList: ['T_S_022', 'T_S_024'],
        resourceIdList: ['soilTemperature'],
      },
      {
        targetIdList: ['T_OA_022', 'T_OA_024'],
        resourceIdList: ['outsideAirTemperature'],
      },
      {
        targetIdList: ['RH_S_022', 'RH_S_024'],
        resourceIdList: ['soilReh'],
      },
      {
        targetIdList: ['RH_OA_022', 'RH_OA_024'],
        resourceIdList: ['outsideAirReh'],
      },
      {
        targetIdList: ['S_H_024'],
        resourceIdList: ['horizontalSolar'],
      },
      {
        targetIdList: ['S_PU_021', 'S_PU_022', 'S_PU_023'],
        resourceIdList: ['pvUnderlyingSolar'],
      },
      {
        targetIdList: [
          'IVT_PW_G_KW_1',
          'IVT_PW_G_KW_2',
          'IVT_PW_G_KW_11',
          'IVT_PW_G_KW_12',
          'IVT_PW_G_KW_13',
          'IVT_PW_G_KW_14',
          'IVT_PW_G_KW_15',
          'IVT_PW_G_KW_16',
        ],
        resourceIdList: ['powerGridKw'],
      },
    ],
  },
  controlInfo: {
    setCmdList: [
      {
        cmdId: 'closeAllDevice',
        cmdName: '모든 장치 닫기',
        trueNodeList: [],
        falseNodeList: [
          'P_001',
          'P_002',
          'P_003',
          'ST_001',
          'ST_002',
          'ST_003',
          'ST_004',
          'ST_005',
          'ST_006',
          'ST_007',
          'ST_008',
          'ST_009',
          'ST_010',
          'ST_011',
          'ST_012',
          'ST_013',
          'ST_014',
          'ST_015',
          'ST_016',
        ],
      },
      {
        cmdId: 'closeAllShutter',
        cmdName: '모든 개폐기 폐쇄',
        trueNodeList: [],
        falseNodeList: [
          'ST_001',
          'ST_002',
          'ST_003',
          'ST_004',
          'ST_005',
          'ST_006',
          'ST_007',
          'ST_008',
          'ST_009',
          'ST_010',
          'ST_011',
          'ST_012',
          'ST_013',
          'ST_014',
          'ST_015',
          'ST_016',
        ],
      },
      {
        cmdId: 'closeAllPump',
        cmdName: '모든 펌프 폐쇄',
        trueNodeList: [],
        falseNodeList: ['P_001', 'P_002', 'P_003'],
      },
    ],
  },
  configInfo: {
    deviceCmdList: [
      {
        deviceCmdName: '테스트 제어',
        applyDeviceList: ['act', 'exam', 'shutter'],
        dCmdScenarioInfo: {
          scenarioMsg: '제어 동작을 선택하세요.',
          confirmList: [
            {
              enName: 'Off',
              krName: '끔',
              controlValue: 0,
            },
            {
              enName: 'On',
              krName: '켬',
              controlValue: 1,
            },
            {
              enName: 'Unfold',
              krName: '접음',
              controlValue: 10,
            },
            {
              enName: 'Fold',
              krName: '펼침',
              controlValue: 11,
            },
            {
              enName: 'Move',
              krName: '이동 2',
              nextStepInfo: {
                scenarioMsg: '이동 방향과 거리(m) 선택하세요.',
                isSetValue: 1,
                setValueInfo: {
                  msg: '이동 거리',
                  min: -0.5,
                  max: 45,
                },
                confirmList: [
                  {
                    enName: 'left',
                    krName: '좌',
                    controlValue: 21,
                  },
                  {
                    enName: 'right',
                    krName: '우',
                    controlValue: 22,
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};
module.exports = map;
