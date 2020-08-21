const {
  di: {
    dcmConfigModel: {
      nodeDataType: { BLOCK, TROUBLE, NONE },
    },
  },
} = require('../../../module');

// Map Size 정보
const ms = {
  // 비닐 하우스 (Vinyl House)
  VH: {
    START_X: 100,
    START_Y: 100,
    INTERVAL: 100,
    WIDTH: 400,
    HEIGHT: 80,
  },
  // 센서 (SenSor)
  SS: {
    WIDTH: 100,
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
        width: 880,
        height: 1230,
        backgroundInfo: {
          backgroundData: '',
          backgroundPosition: [160, 0],
        },
      },
      svgModelResourceList: [
        /* *************       Place        ***************** */
        {
          id: 'vinylHouse',
          type: 'rect',
          elementDrawInfo: {
            width: ms.VH.WIDTH,
            height: ms.VH.HEIGHT,
            color: 'blue',
            opacity: 1,
          },
          textStyleInfo: { color: 'white', fontSize: 10 },
        },
        {
          id: 'pvSensor',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SS.WIDTH,
            height: ms.VH.HEIGHT / 2,
            color: 'red',
            opacity: 1,
          },
          textStyleInfo: { color: 'white', fontSize: 10 },
        },
        {
          id: 'outsideSensor',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SS.WIDTH,
            height: ms.VH.HEIGHT / 2,
            color: 'gold',
            opacity: 1,
          },
          textStyleInfo: { color: 'white', fontSize: 10 },
        },
        {
          id: 'pvN_4EA',
          type: 'rect',
          elementDrawInfo: {
            width: (ms.VH.WIDTH / 8) * 4,
            height: ms.VH.HEIGHT / 2,
            color: '#abe3e1',
            opacity: 1,
          },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'pvN_6EA',
          type: 'rect',
          elementDrawInfo: {
            width: (ms.VH.WIDTH / 8) * 6,
            height: ms.VH.HEIGHT / 2,
            color: '#abe3e1',
            opacity: 1,
          },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'pvN_7EA',
          type: 'rect',
          elementDrawInfo: {
            width: (ms.VH.WIDTH / 8) * 7,
            height: ms.VH.HEIGHT / 2,
            color: '#abe3e1',
            opacity: 1,
          },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'pvN_8EA',
          type: 'rect',
          elementDrawInfo: {
            width: ms.VH.WIDTH,
            height: ms.VH.HEIGHT / 2,
            color: '#abe3e1',
            opacity: 1,
          },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'pvT_4EA',
          type: 'rect',
          elementDrawInfo: {
            width: (ms.VH.WIDTH / 8) * 4,
            height: ms.VH.HEIGHT / 2,
            color: '#eeeeee',
            opacity: 1,
          },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'pvT_6EA',
          type: 'rect',
          elementDrawInfo: {
            width: (ms.VH.WIDTH / 8) * 6,
            height: ms.VH.HEIGHT / 2,
            color: '#eeeeee',
            opacity: 1,
          },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'pvT_7EA',
          type: 'rect',
          elementDrawInfo: {
            width: (ms.VH.WIDTH / 8) * 7,
            height: ms.VH.HEIGHT / 2,
            color: '#eeeeee',
            opacity: 1,
          },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'pvT_8EA',
          type: 'rect',
          elementDrawInfo: {
            width: ms.VH.WIDTH / 8,
            height: ms.VH.HEIGHT / 2,
            color: '#eeeeee',
            opacity: 1,
          },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'pumpPanel',
          type: 'rect',
          elementDrawInfo: { width: 200, height: 200, color: 'skyblue', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        {
          id: 'pcsPanel',
          type: 'rect',
          elementDrawInfo: { width: 50, height: 50, color: '#90b4dd', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 10 },
        },
        /* *************       Device        ***************** */
        {
          id: 'shutter',
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
          id: 'pump',
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
        /* *************       Sensor        ***************** */
        {
          id: 'soilTemperature',
          type: 'rect',
          elementDrawInfo: { width: 55, height: 25, color: '#f0f0f0', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'outsideAirTemperature',
          type: 'rect',
          elementDrawInfo: { width: 55, height: 25, color: '#f0f0f0', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'soilReh',
          type: 'rect',
          elementDrawInfo: { width: 55, height: 25, color: '#f0f0f0', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'outsideAirReh',
          type: 'rect',
          elementDrawInfo: { width: 55, height: 25, color: '#f0f0f0', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'horizontalSolar',
          type: 'rect',
          elementDrawInfo: { width: 55, height: 25, color: '#f0f0f0', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'pvUnderlyingSolar',
          type: 'rect',
          elementDrawInfo: { width: 55, height: 25, color: '#f0f0f0', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'powerGridKw',
          type: 'rect',
          elementDrawInfo: { width: 55, height: 25, color: '#f0f0f0', opacity: 1 },
          textStyleInfo: { color: '', fontSize: 8 },
        },
      ],
    },
    positionInfo: {
      svgPlaceList: [
        {
          placeId: 'vinylHouse',
          svgPositonList: [
            {
              id: 'VNH_1',
              name: '비닐 하우스 1',
              resourceId: 'vinylHouse',
              point: [ms.VH.START_X, ms.VH.START_Y],
            },
            {
              id: 'VNH_2',
              name: '비닐 하우스 2',
              resourceId: 'vinylHouse',
              point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 1],
            },
            {
              id: 'VNH_3',
              name: '비닐 하우스 3',
              resourceId: 'vinylHouse',
              point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 2],
            },
            {
              id: 'VNH_4',
              name: '비닐 하우스 4',
              resourceId: 'vinylHouse',
              point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 3],
            },
            {
              id: 'VNH_5',
              name: '비닐 하우스 5',
              resourceId: 'vinylHouse',
              point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 4],
            },
            {
              id: 'VNH_6',
              name: '비닐 하우스 6',
              resourceId: 'vinylHouse',
              point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 5],
            },
            {
              id: 'VNH_7',
              name: '비닐 하우스 7',
              resourceId: 'vinylHouse',
              point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 6],
            },
            {
              id: 'VNH_8',
              name: '비닐 하우스 8',
              resourceId: 'vinylHouse',
              point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 7],
            },
          ],
        },
        {
          placeId: 'sensor',
          svgPositonList: [
            {
              id: 'S_1',
              name: '생육환경 A',
              resourceId: 'pvSensor',
              point: [ms.VH.START_X + ms.SS.INTERVAL, ms.VH.START_Y + ms.VH.INTERVAL * 5],
            },
            {
              id: 'S_2',
              name: '생육환경 B',
              resourceId: 'pvSensor',
              point: [
                ms.VH.START_X + ms.VH.WIDTH / 2 - ms.SS.WIDTH / 2,
                ms.VH.START_Y + ms.VH.INTERVAL * 5,
              ],
            },
            {
              id: 'S_3',
              name: '생육환경 C',
              resourceId: 'pvSensor',
              point: [
                ms.VH.START_X - ms.SS.INTERVAL + ms.VH.WIDTH - ms.SS.WIDTH,
                ms.VH.START_Y + ms.VH.INTERVAL * 5,
              ],
            },
            {
              id: 'S_4',
              name: '외기환경',
              resourceId: 'outsideSensor',
              point: [
                ms.VH.START_X + ms.VH.WIDTH / 2 - ms.SS.WIDTH / 2,
                ms.VH.START_Y + ms.VH.INTERVAL * 8,
              ],
            },
          ],
        },
        {
          placeId: 'pumpPanel',
          svgPositonList: [
            {
              id: 'PCH',
              name: '펌프 제어반',
              resourceId: 'pumpPanel',
              point: [
                ms.VH.START_X + ms.VH.WIDTH + ms.VH.INTERVAL,
                ms.VH.START_Y + ms.VH.INTERVAL * 6,
              ],
            },
          ],
        },
        {
          placeId: 'pvPanel',
          svgPositonList: [
            {
              id: 'PV_1',
              name: 'PV_1_S_일반(7)',
              resourceId: 'pvN_7EA',
              point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 0 + ms.VH.HEIGHT / 2],
            },
            {
              id: 'PV_2',
              name: 'PV_2_S_투명(7)',
              resourceId: 'pvT_7EA',
              point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 1 + ms.VH.HEIGHT / 2],
            },
            {
              id: 'PV_3',
              name: 'PV_3_S_일반(7)',
              resourceId: 'pvN_7EA',
              point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 2 + ms.VH.HEIGHT / 2],
            },
            {
              id: 'PV_4',
              name: 'PV_4_S_투명(7)',
              resourceId: 'pvT_7EA',
              point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 3 + ms.VH.HEIGHT / 2],
            },
            {
              id: 'PV_5',
              name: 'PV_5_M_투명(6)',
              resourceId: 'pvT_6EA',
              point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 4 + ms.VH.HEIGHT / 2],
            },
            {
              id: 'PV_6',
              name: 'PV_6_M_일반(8)',
              resourceId: 'pvN_8EA',
              point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 5 + ms.VH.HEIGHT / 2],
            },
            {
              id: 'PV_7-A',
              name: 'PV_7-A_M_투명(4)',
              resourceId: 'pvT_4EA',
              point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 6 + ms.VH.HEIGHT / 2],
            },
            {
              id: 'PV_7-B',
              name: 'PV_7-B_M_일반(4)',
              resourceId: 'pvN_4EA',
              point: [
                ms.VH.START_X + (ms.VH.WIDTH / 8) * 4,
                ms.VH.START_Y + ms.VH.INTERVAL * 6 + ms.VH.HEIGHT / 2,
              ],
            },
            {
              id: 'PV_8-A',
              name: 'PV_8-A_M_투명(4)',
              resourceId: 'pvT_4EA',
              point: [ms.VH.START_X, ms.VH.START_Y + ms.VH.INTERVAL * 7 + ms.VH.HEIGHT / 2],
            },
            {
              id: 'PV_8-B',
              name: 'PV_8-B_M_일반(4)',
              resourceId: 'pvN_4EA',
              point: [
                ms.VH.START_X + (ms.VH.WIDTH / 8) * 4,
                ms.VH.START_Y + ms.VH.INTERVAL * 7 + ms.VH.HEIGHT / 2,
              ],
            },
          ],
        },
      ],
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
          mainCategory: 'S2W',
          subCategory: 'dmTech',
          wrapperCategory: 'default',
          cmdExecTimeoutMs: 1000 * 2,
        },
      },
      {
        dpcId: 'DPC_002',
        protocol_info: {
          mainCategory: 'S2W',
          subCategory: 'sm',
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
            target_code: '1',
            target_name: '투명(I)',
          },
          {
            target_code: '2',
            target_name: '일반(I)',
          },
          {
            target_code: '11',
            target_name: '투명 1(I)',
          },
          {
            target_code: '12',
            target_name: '투명 2(I)',
          },
          {
            target_code: '13',
            target_name: '일반 1(M.I)',
          },
          {
            target_code: '14',
            target_name: '일반 2(M.I)',
          },
          {
            target_code: '15',
            target_name: '일반 3(M.I)',
          },
          {
            target_code: '16',
            target_name: '투명 4(M.I)',
          },
        ],
      },
      {
        repeatId: 'RE_PREFIX_IVT',
        repeatCategory: 'prefix',
        nodeList: [
          'IVT_PV_V2',
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
                axisScale: [0, 0],
                moveScale: [-1, 0],
              },
              {
                target_code: '002',
                target_name: '1-B',
                data_logger_index: 1,
                axisScale: [0, 1],
                moveScale: [-1, 0],
              },
              {
                target_code: '003',
                target_name: '2-A',
                data_logger_index: 2,
                axisScale: [0, 0],
                moveScale: [-1, 0],
              },
              {
                target_code: '004',
                target_name: '2-B',
                data_logger_index: 3,
                axisScale: [0, 1],
                moveScale: [-1, 0],
              },
              {
                target_code: '005',
                target_name: '3-A',
                data_logger_index: 4,
                axisScale: [0, 0],
                moveScale: [-1, 0],
              },
              {
                target_code: '006',
                target_name: '3-B',
                data_logger_index: 5,
                axisScale: [0, 1],
                moveScale: [-1, 0],
              },
              {
                target_code: '007',
                target_name: '4-A',
                data_logger_index: 6,
                axisScale: [0, 0],
                moveScale: [-1, 0],
              },
              {
                target_code: '008',
                target_name: '4-B',
                data_logger_index: 7,
                axisScale: [0, 1],
                moveScale: [-1, 0],
              },
              {
                target_code: '009',
                target_name: '5-A',
                data_logger_index: 8,
                axisScale: [0, 0],
                moveScale: [-1, 0],
              },
              {
                target_code: '010',
                target_name: '5-B',
                data_logger_index: 9,
                axisScale: [0, 1],
                moveScale: [-1, 0],
              },
              {
                target_code: '011',
                target_name: '6-A',
                data_logger_index: 10,
                axisScale: [0, 0],
                moveScale: [-1, 0],
              },
              {
                target_code: '012',
                target_name: '6-B',
                data_logger_index: 11,
                axisScale: [0, 1],
                moveScale: [-1, 0],
              },
              {
                target_code: '013',
                target_name: '7-A',
                data_logger_index: 12,
                axisScale: [0, 0],
                moveScale: [-1, 0],
              },
              {
                target_code: '014',
                target_name: '7-B',
                data_logger_index: 13,
                axisScale: [0, 1],
                moveScale: [-1, 0],
              },
              {
                target_code: '015',
                target_name: '8-A',
                data_logger_index: 14,
                axisScale: [0, 0],
                moveScale: [-1, 0],
              },
              {
                target_code: '016',
                target_name: '8-B',
                data_logger_index: 15,
                axisScale: [0, 1],
                moveScale: [-1, 0],
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
                axisScale: [1, 1],
                moveScale: [-1, -1],
              },
              {
                target_code: '002',
                target_name: '양액 A',
                data_logger_index: 1,
                axisScale: [0.1, 0.2],
                moveScale: [0, 0],
              },
              {
                target_code: '003',
                target_name: '양액 B',
                data_logger_index: 2,
                axisScale: [0.8, 0.2],
                moveScale: [0, 0],
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
              },
              {
                target_code: '024',
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
              },
              {
                target_code: '024',
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
              },
              {
                target_code: '024',
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
              },
              {
                target_code: '024',
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
              },
              {
                target_code: '022',
              },
              {
                target_code: '023',
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
              },
              {
                target_code: '022',
                target_name: 'B',
                chart_color: '#868e96',
                chart_sort_rank: 22,
                nodeList: ['S_PU_022', 'T_S_022', 'RH_S_022', 'T_OA_022', 'RH_OA_022'],
              },
              {
                target_code: '023',
                target_name: 'C',
                chart_color: '#b9560d',
                chart_sort_rank: 23,
                nodeList: ['S_PU_023'],
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
              },
              {
                target_code: '2',
                nodeList: ['ST_003', 'ST_004'],
              },
              {
                target_code: '3',
                nodeList: ['ST_005', 'ST_006'],
              },
              {
                target_code: '4',
                nodeList: ['ST_007', 'ST_008'],
              },
              {
                target_code: '5',
                nodeList: ['ST_009', 'ST_010'],
              },
              {
                target_code: '6',
                nodeList: ['ST_011', 'ST_012'],
              },
              {
                target_code: '7',
                nodeList: ['ST_013', 'ST_014'],
              },
              {
                target_code: '8',
                nodeList: ['ST_015', 'ST_016'],
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
  controlInfo: {},
};

module.exports = map;
