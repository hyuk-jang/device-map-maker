const {
  di: {
    dmmModel: { mmSvgBtnClass },
    dcmConfigModel: {
      nodeDataType: { BLOCK, TROUBLE, NONE },
      goalDataRange: gDR,
      textAnchorType,
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

const strokeInfo = {
  pvNormal: {
    color: '#ccc',
    linecap: 'rect',
    width: 0.5,
  },
  pvTrans: {
    color: '#005e8c',
    linecap: 'rect',
    width: 0.5,
  },
};

// Map Size 정보
const ms = {
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
  SIDE: {
    WIDTH: 130,
    PUMP_HEIGHT: 180,
    CMD_HEIGHT: 600,
    CMD_START_AXIS: 0.08,
    CMD_INTREVAL_RATE: 0.125,
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
          id: 'waterWay',
          type: 'line',
          elementDrawInfo: { width: 25, color: 'red' },
        },
        /* *************       Place        ***************** */
        {
          id: 'vinylHouse',
          type: 'rect',
          elementDrawInfo: {
            width: ms.VH.WIDTH,
            height: ms.VH.HEIGHT,
            color: 'url(#bg-sky-1)',
            opacity: 1,
            filterInfo: {
              filter: 'url(#dropShadow)',
            },
          },
          textStyleInfo: { color: '', fontSize: 10, axisScale: [0.5, 0.25] },
        },
        {
          id: 'bigVinylHouse',
          type: 'rect',
          elementDrawInfo: {
            width: ms.VH.WIDTH,
            height: ms.VH.BIG_HEIGHT,
            color: '#dbe4ff',
            opacity: 1,
            filterInfo: {
              filter: 'url(#dropShadow)',
            },
          },
          textStyleInfo: { color: '' },
        },
        {
          id: 'pvSensor',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SS.WIDTH,
            height: ms.VH.BIG_HEIGHT - ms.VH.HEIGHT / 2,
            color: 'red',
            opacity: 0,
          },
          textStyleInfo: { color: 'white' },
        },
        {
          id: 'bigPvSensor',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SS.BIG_WIDTH,
            height: ms.VH.BIG_HEIGHT - ms.VH.HEIGHT / 2,
            color: 'red',
            opacity: 0,
          },
          textStyleInfo: { color: 'white' },
        },
        {
          id: 'outsideSensor',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SS.BIG_WIDTH,
            height: ms.VH.BIG_HEIGHT - ms.VH.HEIGHT / 2,
            color: 'gold',
            opacity: 1,
            filterInfo: {
              filter: 'url(#dropShadow)',
            },
          },
          textStyleInfo: { color: 'white' },
        },
        {
          id: 'pvN_4EA',
          type: 'rect',
          elementDrawInfo: {
            width: (ms.VH.WIDTH / 8) * 4,
            height: ms.VH.HEIGHT / 2,
            color: '#abe3e1',
            opacity: 1,
            strokeInfo: strokeInfo.pvNormal,
            patternInfo: pvNormalPatternInfo,
          },
          textStyleInfo: { axisScale: [0.5, 0.25], fontSize: 9 },
        },
        {
          id: 'pvN_6EA',
          type: 'rect',
          elementDrawInfo: {
            width: (ms.VH.WIDTH / 8) * 6,
            height: ms.VH.HEIGHT / 2,
            color: '#abe3e1',
            opacity: 1,
            patternInfo: pvNormalPatternInfo,
            strokeInfo: strokeInfo.pvNormal,
          },
          textStyleInfo: { axisScale: [0.5, 0.25], fontSize: 9 },
        },
        {
          id: 'pvN_7EA',
          type: 'rect',
          elementDrawInfo: {
            width: (ms.VH.WIDTH / 8) * 7,
            height: ms.VH.HEIGHT / 2,
            color: '#abe3e1',
            opacity: 1,
            patternInfo: pvNormalPatternInfo,
            strokeInfo: strokeInfo.pvNormal,
          },
          textStyleInfo: { axisScale: [0.5, 0.25], fontSize: 9 },
        },
        {
          id: 'pvN_8EA',
          type: 'rect',
          elementDrawInfo: {
            width: ms.VH.WIDTH,
            height: ms.VH.HEIGHT / 2,
            color: '#abe3e1',
            opacity: 1,
            patternInfo: pvNormalPatternInfo,
            strokeInfo: strokeInfo.pvNormal,
          },
          textStyleInfo: { axisScale: [0.5, 0.25], fontSize: 9 },
        },
        {
          id: 'pvT_4EA',
          type: 'rect',
          elementDrawInfo: {
            width: (ms.VH.WIDTH / 8) * 4,
            height: ms.VH.HEIGHT / 2,
            color: '#4dabf7',
            opacity: 1,
            strokeInfo: strokeInfo.pvTrans,
            patternInfo: pvTransPatternInfo,
          },
          textStyleInfo: { axisScale: [0.5, 0.25], fontSize: 9 },
        },
        {
          id: 'pvT_6EA',
          type: 'rect',
          elementDrawInfo: {
            width: (ms.VH.WIDTH / 8) * 6,
            height: ms.VH.HEIGHT / 2,
            color: '#4dabf7',
            opacity: 1,
            strokeInfo: strokeInfo.pvTrans,
            patternInfo: pvTransPatternInfo,
          },
          textStyleInfo: { axisScale: [0.5, 0.25], fontSize: 9 },
        },
        {
          id: 'pvT_7EA',
          type: 'rect',
          elementDrawInfo: {
            width: (ms.VH.WIDTH / 8) * 7,
            height: ms.VH.HEIGHT / 2,
            color: '#4dabf7',
            opacity: 1,
            strokeInfo: strokeInfo.pvTrans,
            patternInfo: pvTransPatternInfo,
          },
          textStyleInfo: { axisScale: [0.5, 0.25], fontSize: 9 },
        },
        {
          id: 'pvT_8EA',
          type: 'rect',
          elementDrawInfo: {
            width: ms.VH.WIDTH / 8,
            height: ms.VH.HEIGHT / 2,
            color: '#4dabf7',
            opacity: 1,
            strokeInfo: strokeInfo.pvTrans,
            patternInfo: pvTransPatternInfo,
          },
          textStyleInfo: { axisScale: [0.5, 0.25], fontSize: 9 },
        },
        {
          id: 'pumpPanel',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SIDE.WIDTH,
            height: ms.SIDE.PUMP_HEIGHT,
            color: 'skyblue',
            opacity: 1,
            filterInfo: {
              filter: 'url(#dropShadow)',
            },
          },
          textStyleInfo: { color: '' },
        },
        {
          id: 'cmdArea',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SIDE.WIDTH,
            height: ms.SIDE.CMD_HEIGHT,
            color: 'yellowgreen',
            opacity: 1,
            filterInfo: {
              filter: 'url(#dropShadow)',
            },
          },
          textStyleInfo: {
            axisScale: [0.5, 0.04],
            fontSize: 15,
          },
        },
        {
          id: 'pcsPanel',
          type: 'rect',
          elementDrawInfo: {
            width: 50,
            height: 50,
            color: '#90b4dd',
            opacity: 1,
            filterInfo: {
              filter: 'url(#dropShadow)',
            },
          },
          textStyleInfo: { color: '' },
        },
        /* *************       Device        ***************** */
        {
          id: 'shutter',
          type: 'circle',
          elementDrawInfo: {
            radius: 20,
            color: ['url(#bg-gray-1)', 'url(#bg-green-1)'],
            strokeInfo: {
              width: 0.7,
              color: '#555',
            },
            svgClass: [mmSvgBtnClass.lightGray, mmSvgBtnClass.green],
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: { fontSize: 8 },
        },
        {
          id: 'pump',
          type: 'circle',
          elementDrawInfo: {
            radius: 20,
            color: ['#a3a3a3', '#22fb00'],
            svgClass: [mmSvgBtnClass.lightGray, mmSvgBtnClass.green],
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: { fontSize: 8 },
        },
        {
          id: 'valve',
          type: 'rhombus',
          elementDrawInfo: {
            radius: 25,
            color: ['#a3a3a3', '#22fb00'],
            svgClass: [mmSvgBtnClass.lightGray, mmSvgBtnClass.green],
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: { fontSize: 8 },
        },
        /* *************       Command        ***************** */
        {
          id: 'cmdBtn',
          type: 'rect',
          elementDrawInfo: {
            width: ms.SIDE.WIDTH * 0.9,
            height: ms.SIDE.CMD_HEIGHT * 0.08,
            svgClass: [mmSvgBtnClass.white, mmSvgBtnClass.orange],
            filterInfo: {
              filter: 'url(#deviceShadow)',
            },
          },
          textStyleInfo: { fontSize: 15 },
        },
        /* *************       Sensor        ***************** */
        {
          id: 'shutterControlType',
          type: 'rect',
          elementDrawInfo: {
            width: 40,
            height: 30,
            color: '#f0f0f0',
            strokeInfo: {
              width: 0.7,
              color: '#000',
            },
          },
          textStyleInfo: { dataColor: ['blue', 'brown'], fontSize: 8 },
        },
        {
          id: 'pumpControlType',
          type: 'rect',
          elementDrawInfo: {
            width: 45,
            height: 30,
            color: '#f0f0f0',
            strokeInfo: {
              width: 0.7,
              color: '#000',
            },
          },
          textStyleInfo: { dataColor: ['blue', 'brown'], fontSize: 8 },
        },
        {
          id: 'sensor',
          type: 'rect',
          elementDrawInfo: {
            width: 65,
            height: 30,
            color: '#f0f0f0',
            strokeInfo: {
              width: 0.7,
              color: '#000',
            },
          },
          textStyleInfo: {
            // isHiddenTitle: true,
            // anchor: textAnchorType.END,
            // axisScale: [0.5, 0.5],
            color: '',
            dataColor: ['blue'],
            fontSize: 8,
          },
        },
        {
          id: 'soilTemperature',
          type: 'rect',
          elementDrawInfo: {
            width: 60,
            height: 30,
            color: '#f0f0f0',
            strokeInfo: {
              width: 0.7,
            },
          },
          textStyleInfo: { color: '', dataColor: 'blue', fontSize: 8 },
        },
        {
          id: 'outsideAirTemperature',
          type: 'rect',
          elementDrawInfo: {
            width: 60,
            height: 30,
            color: '#f0f0f0',
            strokeInfo: {
              width: 1,
            },
          },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'soilReh',
          type: 'rect',
          elementDrawInfo: {
            width: 60,
            height: 30,
            color: '#f0f0f0',
            strokeInfo: {
              width: 1,
            },
          },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'outsideAirReh',
          type: 'rect',
          elementDrawInfo: {
            width: 60,
            height: 30,
            color: '#f0f0f0',
            strokeInfo: {
              width: 1,
            },
          },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'horizontalSolar',
          type: 'rect',
          elementDrawInfo: {
            width: 60,
            height: 30,
            color: '#f0f0f0',
            strokeInfo: {
              width: 1,
            },
          },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'pvUnderlyingSolar',
          type: 'rect',
          elementDrawInfo: {
            width: 60,
            height: 30,
            color: '#f0f0f0',
            strokeInfo: {
              width: 1,
            },
          },
          textStyleInfo: { color: '', fontSize: 8 },
        },
        {
          id: 'powerGridKw',
          type: 'rect',
          elementDrawInfo: {
            width: 80,
            height: 16,
            color: '#f0f0f0',
            strokeInfo: {
              width: 0.7,
              color: '#000',
            },
          },
          textStyleInfo: {
            isHiddenTitle: false,
            isTitleWrap: true,
            axisScale: [0.65, 0.5],
            fontSize: 8,
          },
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
              'ST_CT',
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
            nodeList: ['P_001', 'V_N_001', 'V_N_002', 'V_W_001', 'V_W_002', 'P_CT'],
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
        svgViewInfo: {
          thresholdList: [['CLOSE'], ['OPEN']],
        },
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
                data_index: 1,
                svgNodePosOpt: {
                  resourceId: 'shutter',
                  axisScale: [0, 0],
                  moveScale: [-1, 0],
                },
              },
              {
                target_code: '002',
                target_name: '1-B',
                data_logger_index: 1,
                data_index: 2,
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
                data_index: 3,
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
                data_index: 4,
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
                data_index: 5,
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
                data_index: 6,
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
                data_index: 7,
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
                data_index: 8,
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
                data_index: 9,
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
                data_index: 10,
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
                data_index: 11,
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
                data_index: 12,
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
                data_index: 13,
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
                data_index: 14,
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
                data_index: 15,
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
                data_index: 16,
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
        svgViewInfo: {
          thresholdList: [['OFF'], ['ON']],
        },
        defList: [
          {
            target_id: 'pump',
            target_prefix: 'P',
            target_name: '펌프',
            nodeList: [
              {
                target_code: '001',
                target_name: '펌프',
                data_index: 1,
                svgNodePosOpt: {
                  placeId: 'PCH',
                  resourceId: 'pump',
                  axisScale: [0, 1],
                  moveScale: [0.3, -0.3],
                },
              },
            ],
          },
        ],
      },
      {
        target_id: 'valve',
        target_name: '밸브',
        is_sensor: 0,
        svgViewInfo: {
          thresholdList: [['CLOSE'], ['OPEN']],
        },
        defList: [
          {
            target_id: 'nutrientValve',
            target_prefix: 'V_N',
            target_name: '양액 밸브',
            nodeList: [
              {
                target_code: '001',
                target_name: '양액 A',
                data_logger_index: 0,
                data_index: 2,
                svgNodePosOpt: {
                  placeId: 'PCH',
                  resourceId: 'pump',
                  axisScale: [0, 0.5],
                  moveScale: [0.3, 0],
                },
              },
              {
                target_code: '002',
                target_name: '양액 B',
                data_logger_index: 1,
                data_index: 3,
                svgNodePosOpt: {
                  placeId: 'PCH',
                  resourceId: 'pump',
                  axisScale: [1, 0.5],
                  moveScale: [-0.3, 0],
                },
              },
            ],
          },
          {
            target_id: 'wateringValve',
            target_prefix: 'V_W',
            target_name: '관수 밸브',
            nodeList: [
              {
                target_code: '001',
                target_name: '밸브 A',
                data_logger_index: 0,
                data_index: 4,
                svgNodePosOpt: {
                  placeId: 'PCH',
                  resourceId: 'valve',
                  axisScale: [0, 0],
                  moveScale: [0.2, 0.2],
                },
              },
              {
                target_code: '002',
                target_name: '밸브 B',
                data_logger_index: 1,
                data_index: 5,
                svgNodePosOpt: {
                  placeId: 'PCH',
                  resourceId: 'valve',
                  axisScale: [1, 0],
                  moveScale: [-0.2, 0.2],
                },
              },
            ],
          },
        ],
      },
      /* *********             Sensor             ********* */
      {
        target_id: 'controlType',
        target_name: '제어 타입',
        is_sensor: 2,
        description: '자동 or 수동',
        svgViewInfo: {
          thresholdList: [['M'], ['A']],
        },
        defList: [
          {
            target_id: 'shutterControlType',
            target_prefix: 'ST_CT',
            description: '개폐기 제어 타입',
            nodeList: [
              {
                // target_code: '',
                target_name: '제어 모드',
                data_logger_index: 0,
                svgNodePosOpt: {
                  resourceId: 'shutterControlType',
                  axisScale: [0, 1],
                  moveScale: [-1, 1.2],
                },
              },
            ],
          },
          {
            target_id: 'pumpControlType',
            target_prefix: 'P_CT',
            description: '펌프 제어 타입',
            nodeList: [
              {
                // target_code: '001',
                target_name: '제어 모드',
                svgNodePosOpt: {
                  placeId: 'PCH',
                  resourceId: 'pumpControlType',
                  axisScale: [1, 1],
                  moveScale: [-0.3, -0.5],
                },
              },
            ],
          },
        ],
      },
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
        svgViewInfo: {
          isStrType: 0,
          thresholdList: [
            {
              goalValue: 300,
              goalRange: gDR.LOWER,
              isInclusionGoal: 1,
            },
            {
              goalValue: 600,
              goalRange: gDR.LOWER,
              isInclusionGoal: 1,
            },
            {
              goalValue: 600,
              goalRange: gDR.UPPER,
            },
          ],
        },
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
        is_submit_api: 1,
        save_db_type: BLOCK,
        data_unit: 'kW',
        description:
          '1 킬로와트(기호 kW)는 1 초 동안의 1,000 줄(N·m)에 해당하는 일률의 SI 단위',
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
                // target_name: '투명(I)',
                target_name: '출력',
                svgNodePosOpt: {
                  resourceId: 'powerGridKw',
                  axisScale: [0.5, 0.8],
                },
              },
              {
                target_code: '2',
                // target_name: '일반(I)',
                target_name: '출력',
                svgNodePosOpt: {
                  resourceId: 'powerGridKw',
                  axisScale: [0.5, 0.8],
                },
              },
              {
                target_code: '11',
                // target_name: '투명 1(I)',
                target_name: '출력',
                svgNodePosOpt: {
                  resourceId: 'powerGridKw',
                  axisScale: [0.5, 0.8],
                },
              },
              {
                target_code: '12',
                // target_name: '투명 2(I)',
                target_name: '출력',
                svgNodePosOpt: {
                  resourceId: 'powerGridKw',
                  axisScale: [0.5, 0.8],
                },
              },
              {
                target_code: '13',
                // target_name: '일반 1(M.I)',
                target_name: '출력',
                svgNodePosOpt: {
                  resourceId: 'powerGridKw',
                  axisScale: [0.5, 0.8],
                },
              },
              {
                target_code: '14',
                // target_name: '일반 2(M.I)',
                target_name: '출력',
                svgNodePosOpt: {
                  resourceId: 'powerGridKw',
                  axisScale: [0.5, 0.8],
                },
              },
              {
                target_code: '15',
                // target_name: '일반 3(M.I)',
                target_name: '출력',
                svgNodePosOpt: {
                  resourceId: 'powerGridKw',
                  axisScale: [0.5, 0.8],
                },
              },
              {
                target_code: '16',
                // target_name: '투명 4(M.I)',
                target_name: '출력',
                svgNodePosOpt: {
                  resourceId: 'powerGridKw',
                  axisScale: [0.5, 0.8],
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
        target_name: '하우스',
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
                nodeList: ['ST_015', 'ST_016', 'ST_CT'],
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
                nodeList: ['P_001', 'V_N_001', 'V_N_002', 'V_W_001', 'V_W_002', 'P_CT'],
                svgPositionInfo: {
                  resourceId: 'pumpPanel',
                  point: [
                    ms.VH.START_X + ms.VH.WIDTH + ms.VH.INTERVAL / 3,
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
                  point: [
                    ms.VH.START_X,
                    ms.VH.START_Y + ms.VH.INTERVAL * 0 + ms.VH.HEIGHT / 2,
                  ],
                },
              },
              {
                target_code: '2',
                target_name: 'PV_2_S_투명(7)',
                svgPositionInfo: {
                  resourceId: 'pvT_7EA',
                  point: [
                    ms.VH.START_X,
                    ms.VH.START_Y + ms.VH.INTERVAL * 1 + ms.VH.HEIGHT / 2,
                  ],
                },
              },
              {
                target_code: '3',
                target_name: 'PV_3_S_일반(7)',
                nodeList: ['IVT_PW_G_KW_1'],
                svgPositionInfo: {
                  resourceId: 'pvN_7EA',
                  point: [
                    ms.VH.START_X,
                    ms.VH.START_Y + ms.VH.INTERVAL * 2 + ms.VH.HEIGHT / 2,
                  ],
                },
              },
              {
                target_code: '4',
                target_name: 'PV_4_S_투명(7)',
                nodeList: ['IVT_PW_G_KW_2'],
                svgPositionInfo: {
                  resourceId: 'pvT_7EA',
                  point: [
                    ms.VH.START_X,
                    ms.VH.START_Y + ms.VH.INTERVAL * 3 + ms.VH.HEIGHT / 2,
                  ],
                },
              },
              {
                target_code: '5',
                target_name: 'PV_5_M_투명(6)',
                nodeList: ['IVT_PW_G_KW_11'],
                svgPositionInfo: {
                  resourceId: 'pvT_6EA',
                  point: [
                    ms.VH.START_X,
                    ms.VH.START_Y + ms.VH.INTERVAL * 4 + ms.VH.HEIGHT / 2,
                  ],
                },
              },
              {
                target_code: '6',
                target_name: 'PV_6_M_일반(8)',
                nodeList: ['IVT_PW_G_KW_12'],
                svgPositionInfo: {
                  resourceId: 'pvN_8EA',
                  point: [
                    ms.VH.START_X,
                    ms.VH.START_Y + ms.VH.INTERVAL * 6 + ms.VH.HEIGHT / 2,
                  ],
                },
              },
              {
                target_code: '7-A',
                target_name: 'PV_7-A_M_투명(4)',
                nodeList: ['IVT_PW_G_KW_13'],
                svgPositionInfo: {
                  resourceId: 'pvT_4EA',
                  point: [
                    ms.VH.START_X,
                    ms.VH.START_Y + ms.VH.INTERVAL * 7 + ms.VH.HEIGHT / 2,
                  ],
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
                  point: [
                    ms.VH.START_X,
                    ms.VH.START_Y + ms.VH.INTERVAL * 8 + ms.VH.HEIGHT / 2,
                  ],
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
                  point: [
                    ms.VH.START_X + ms.SS.INTERVAL * 2,
                    ms.VH.START_Y + ms.VH.INTERVAL * 5,
                  ],
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
                    ms.VH.START_X - ms.SS.INTERVAL * 2 + ms.VH.WIDTH - ms.SS.WIDTH,
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
      {
        target_id: 'cmdArea',
        target_name: '제어 영역',
        defList: [
          {
            target_id: 'cmdArea',
            target_prefix: 'CMD',
            placeList: [
              {
                svgPositionInfo: {
                  resourceId: 'cmdArea',
                  point: [
                    ms.VH.START_X + ms.VH.WIDTH + ms.VH.INTERVAL / 3,
                    ms.VH.START_Y,
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  controlInfo: {
    singleCmdList: [
      {
        singleCmdName: '펌프 제어',
        applyDeviceList: ['pump'],
        singleMidCateCmdInfo: {
          scenarioMsg: '제어 동작을 선택하세요.',
          subCmdList: [
            {
              enName: 'Off',
              krName: '정지',
              controlValue: 0,
            },
            {
              enName: 'On',
              krName: '동작',
              controlValue: 1,
            },
          ],
        },
      },
      {
        singleCmdName: '밸브 제어',
        applyDeviceList: ['valve'],
        singleMidCateCmdInfo: {
          scenarioMsg: '제어 동작을 선택하세요.',
          subCmdList: [
            {
              enName: 'Close',
              krName: '닫음',
              controlValue: 0,
            },
            {
              enName: 'Open',
              krName: '열음',
              controlValue: 1,
            },
          ],
        },
      },
      {
        singleCmdName: '개폐기 제어',
        applyDeviceList: ['shutter'],
        singleMidCateCmdInfo: {
          scenarioMsg: '제어 동작을 선택하세요.',
          subCmdList: [
            {
              enName: 'Close',
              krName: '접음',
              controlValue: 0,
            },
            {
              enName: 'Open',
              krName: '펼침',
              controlValue: 1,
            },
          ],
        },
      },
    ],
    setCmdList: [
      {
        cmdId: 'conWaterSupplyPipeA',
        cmdName: 'A 배관 급수 제어',
        trueNodeList: ['P_001', 'V_N_001', 'V_W_001'],
        falseNodeList: [],
        svgNodePosOpt: {
          placeId: 'CMD',
          resourceId: 'cmdBtn',
          axisScale: [0.5, ms.SIDE.CMD_START_AXIS],
          // moveScale: [0.1, 0.1],
        },
      },
      {
        cmdId: 'canWaterSupplyPipeA',
        cmdName: 'A 배관 급수 취소',
        trueNodeList: [],
        falseNodeList: ['P_001', 'V_N_001', 'V_W_001'],
        svgNodePosOpt: {
          placeId: 'CMD',
          resourceId: 'cmdBtn',
          axisScale: [0.5, ms.SIDE.CMD_START_AXIS + ms.SIDE.CMD_INTREVAL_RATE * 1],
          // moveScale: [0.1, 0.1],
        },
      },
      {
        cmdId: 'conWaterSupplyPipeB',
        cmdName: 'B 배관 급수 제어',
        trueNodeList: ['P_001', 'V_N_002', 'V_W_002'],
        falseNodeList: [],
        svgNodePosOpt: {
          placeId: 'CMD',
          resourceId: 'cmdBtn',
          axisScale: [0.5, ms.SIDE.CMD_START_AXIS + ms.SIDE.CMD_INTREVAL_RATE * 2],
          // moveScale: [0.1, 0.1],
        },
      },
      {
        cmdId: 'canWaterSupplyPipeB',
        cmdName: 'B 배관 급수 취소',
        trueNodeList: [],
        falseNodeList: ['P_001', 'V_N_002', 'V_W_002'],
        svgNodePosOpt: {
          placeId: 'CMD',
          resourceId: 'cmdBtn',
          axisScale: [0.5, ms.SIDE.CMD_START_AXIS + ms.SIDE.CMD_INTREVAL_RATE * 3],
          // moveScale: [0.1, 0.1],
        },
      },

      {
        cmdId: 'closeAllShutter',
        cmdName: '모든 개폐기 닫음',
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
        svgNodePosOpt: {
          placeId: 'CMD',
          resourceId: 'cmdBtn',
          axisScale: [0.5, ms.SIDE.CMD_START_AXIS + ms.SIDE.CMD_INTREVAL_RATE * 4],
          // moveScale: [0.1, 0.1],
        },
      },
      {
        cmdId: 'openAllShutter',
        cmdName: '모든 개폐기 열음',
        trueNodeList: [
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
        falseNodeList: [],
        svgNodePosOpt: {
          placeId: 'CMD',
          resourceId: 'cmdBtn',
          axisScale: [0.5, ms.SIDE.CMD_START_AXIS + ms.SIDE.CMD_INTREVAL_RATE * 5],
          // moveScale: [0.1, 0.1],
        },
      },
      {
        cmdId: 'closeAllDevice',
        cmdName: '모든 장치 정지',
        trueNodeList: [],
        falseNodeList: [
          'P_001',
          'V_N_001',
          'V_N_002',
          'V_W_001',
          'V_W_002',
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
        svgNodePosOpt: {
          placeId: 'CMD',
          resourceId: 'cmdBtn',
          axisScale: [0.5, ms.SIDE.CMD_START_AXIS + ms.SIDE.CMD_INTREVAL_RATE * 6],
          // moveScale: [0.1, 0.1],
        },
      },
      {
        cmdId: 'openAllDevice',
        cmdName: '모든 장치 동작',
        trueNodeList: [
          'P_001',
          'V_N_001',
          'V_N_002',
          'V_W_001',
          'V_W_002',
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
        falseNodeList: [],
        svgNodePosOpt: {
          placeId: 'CMD',
          resourceId: 'cmdBtn',
          axisScale: [0.5, ms.SIDE.CMD_START_AXIS + ms.SIDE.CMD_INTREVAL_RATE * 7],
          // moveScale: [0.1, 0.1],
        },
      },
    ],
    flowCmdList: [],
    scenarioCmdList: [],
  },
};

module.exports = map;
