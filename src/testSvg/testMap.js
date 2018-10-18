require('../../../default-intelligence');

/**
 * @type {mDeviceMap}
 */
const map = {
  drawInfo: {
    frame: {
      mapSize: {
        width: 1700,
        height: 1230,
      },
      svgModelResourceList: [
        {
          id: 'salternModuleBlock_A',
          type: 'rect',
          elementDrawInfo: {
            width: 240,
            height: 150,
            color: '#3e68b6',
          },
        },
        {
          id: 'salternModuleBlock_B',
          type: 'rect',
          elementDrawInfo: {
            width: 300,
            height: 300,
            color: '#3e68b6',
          },
        },
        {
          id: 'salternNomalBlock_A',
          type: 'rect',
          elementDrawInfo: {
            width: 240,
            height: 130,
            color: '#2b4570',
          },
        },
        {
          id: 'salternNomalBlock_B',
          type: 'rect',
          elementDrawInfo: {
            width: 260,
            height: 180,
            color: '#2b4570',
          },
        },
        {
          id: 'earth',
          type: 'rect',
          elementDrawInfo: {
            width: 240,
            height: 120,
            color: '#3e68b6',
          },
        },
        {
          id: 'salternCrystalBlock',
          type: 'rect',
          elementDrawInfo: {
            width: 260,
            height: 180,
            color: '#152642',
          },
        },
        {
          id: 'brineWarehouse',
          type: 'rect',
          elementDrawInfo: {
            width: 170,
            height: 150,
            color: '#32706f',
          },
        },
        {
          id: 'waterDoor',
          type: 'rect',
          elementDrawInfo: {
            width: 55,
            height: 55,
            color: '#223056',
          },
        },
        {
          id: 'sea',
          type: 'rect',
          elementDrawInfo: {
            width: 175,
            height: 120,
            color: '#77a1c1',
          },
        },
        {
          id: 'valve',
          type: 'polygon',
          elementDrawInfo: {
            width: 30,
            height: 30,
            color: '#208974',
          },
        },
        {
          id: 'pipeLine',
          type: 'line',
          elementDrawInfo: {
            width: 3,
            color: '#F47994',
          },
        },
        {
          id: 'outlet',
          type: 'circle',
          elementDrawInfo: {
            width: 30,
            height: 30,
            radius: 30,
            color: '#124e42',
          },
        },
        {
          id: 'waterWay',
          type: 'line',
          elementDrawInfo: {
            width: 55,
            color: '#6f6f6f',
          },
        },
        {
          id: 'reservoir',
          type: 'rect',
          elementDrawInfo: {
            width: 550,
            height: 120,
            color: '#484144',
          },
        },
        {
          id: 'sea',
          type: 'rect',
          elementDrawInfo: {
            width: 190,
            height: 150,
            color: '#1A4876',
          },
        },
        {
          id: 'pump',
          type: 'circle',
          elementDrawInfo: {
            width: 50,
            height: 50,
            radius: 50,
            color: '#EE204D',
          },
        },
        {
          id: 'WLSensor',
          type: 'rect',
          elementDrawInfo: {
            width: 50,
            height: 40,
            color: '#dedede',
          },
        },
        {
          id: 'moduleRearTemperature',
          type: 'rect',
          elementDrawInfo: {
            width: 50,
            height: 40,
            color: '#dedede',
          },
        },
        {
          id: 'brineTemperature',
          type: 'rect',
          elementDrawInfo: {
            width: 50,
            height: 40,
            color: '#dedede',
          },
        },
        {
          id: 'salinity',
          type: 'rect',
          elementDrawInfo: {
            width: 50,
            height: 40,
            color: '#dedede',
          },
        },
      ],
    },
    positionList: {
      svgPlaceList: [
        {
          placeClassId: 'salternBlock',
          defList: [
            {
              id: 'SEB_1_A',
              name: '증발지1A',
              resourceId: 'salternModuleBlock_A',
              point: [340, 950],
            },
            {
              id: 'SEB_1_B',
              name: '증발지1B',
              resourceId: 'salternModuleBlock_A',
              point: [340, 760],
            },
            {
              id: 'SEB_1_C',
              name: '증발지1C',
              resourceId: 'salternModuleBlock_A',
              point: [340, 570],
            },
            {
              id: 'SEB_1_D',
              name: '증발지1D',
              resourceId: 'salternModuleBlock_A',
              point: [340, 380],
            },
            {
              id: 'SEB_1_E',
              name: '증발지1E',
              resourceId: 'salternModuleBlock_B',
              point: [1220, 400],
            },
            {
              id: 'SEB_일반',
              name: '증발지 일반',
              resourceId: 'salternNomalBlock_A',
              point: [340, 210],
            },
            {
              id: 'SEB_2',
              name: '증발지2',
              resourceId: 'salternNomalBlock_B',
              point: [635, 340],
            },
            {
              id: 'SEB_3',
              name: '증발지3',
              resourceId: 'salternNomalBlock_B',
              point: [635, 532],
            },
            {
              id: 'SEB_4',
              name: '증발지4',
              resourceId: 'salternNomalBlock_B',
              point: [635, 727],
            },
            {
              id: 'SCB',
              name: '결정지',
              resourceId: 'salternCrystalBlock',
              point: [635, 920],
            },
          ],
        },
        {
          placeClassId: 'earth',
          defList: [
            {
              id: 'EA_일반',
              name: '육상 일반',
              resourceId: 'earth',
              point: [0, 855],
            },
            {
              id: 'EA_G2G',
              name: '육상 G2G',
              resourceId: 'earth',
              point: [0, 980],
            },
          ],
        },
        {
          placeClassId: 'brineWarehouse',
          defList: [
            {
              id: 'BW_1',
              name: '해주1',
              resourceId: 'brineWarehouse',
              point: [600, 135],
            },
            {
              id: 'BW_2',
              name: '해주2',
              resourceId: 'brineWarehouse',
              point: [790, 135],
            },
            {
              id: 'BW_3',
              name: '해주3',
              resourceId: 'brineWarehouse',
              point: [980, 135],
            },
          ],
        },
        {
          placeClassId: 'reservoir',
          defList: [
            {
              id: 'RV',
              name: '저수조',
              resourceId: 'reservoir',
              point: [600, 10],
            },
          ],
        },
        {
          placeClassId: 'sea',
          defList: [
            {
              id: 'SEA',
              name: '바다',
              resourceId: 'sea',
              point: [1025, 980],
            },
          ],
        },
        {
          placeClassId: 'waterWay',
          defList: [
            {
              id: 'WW_001',
              name: '수로1',
              resourceId: 'waterWay',
              point: [607.5, 1100, 607.5, 340],
            },
            {
              id: 'WW_002',
              name: '수로2',
              resourceId: 'waterWay',
              point: [580, 312.5, 770, 312.5],
            },
            {
              id: 'WW_003',
              name: '수로3',
              resourceId: 'waterWay',
              point: [922, 1100, 922, 340],
            },
            {
              id: 'WW_004',
              name: '수로4',
              resourceId: 'waterWay',
              point: [770, 312.5, 1035, 312.5],
            },
            {
              id: 'WW_005',
              name: '수로5',
              resourceId: 'waterWay',
              point: [1007.5, 1100, 1007.5, 340],
            },
            {
              id: 'WW_006',
              name: '수로6',
              resourceId: 'waterWay',
              point: [1247.5, 1045, 1247.5, 700],
            },
            {
              id: 'WW_007',
              name: '수로7',
              resourceId: 'waterWay',
              point: [1275, 1072, 1200, 1072],
            },
          ],
        },
        {
          placeClassId: 'pipeLine',
          defList: [
            {
              id: 'PL_001',
              name: '파이프1',
              resourceId: 'pipeLine',
              point: [1150, 24, 1176, 24],
            },
            {
              id: 'PL_002',
              name: '파이프2',
              resourceId: 'pipeLine',
              point: [1175, 980, 1175, 24],
            },
            {
              id: 'PL_003',
              name: '파이프3',
              resourceId: 'pipeLine',
              point: [300, 35, 600, 35],
            },
            {
              id: 'PL_004',
              name: '파이프4',
              resourceId: 'pipeLine',
              point: [300, 160, 600, 160],
            },
            {
              id: 'PL_005',
              name: '파이프5',
              resourceId: 'pipeLine',
              point: [300, 150, 300, 35],
            },
            {
              id: 'PL_006',
              name: '파이프6',
              resourceId: 'pipeLine',
              point: [300, 550, 300, 150],
            },
            {
              id: 'PL_007',
              name: '파이프7',
              resourceId: 'pipeLine',
              point: [300, 550, 370, 550],
            },
            {
              id: 'PL_008',
              name: '파이프8',
              resourceId: 'pipeLine',
              point: [370, 550, 370, 530],
            },
            {
              id: 'PL_009',
              name: '파이프9',
              resourceId: 'pipeLine',
              point: [370, 570, 370, 550],
            },
            {
              id: 'PL_010',
              name: '파이프10',
              resourceId: 'pipeLine',
              point: [300, 930, 300, 550],
            },
            {
              id: 'PL_011',
              name: '파이프11',
              resourceId: 'pipeLine',
              point: [300, 930, 370, 930],
            },
            {
              id: 'PL_012',
              name: '파이프12',
              resourceId: 'pipeLine',
              point: [370, 930, 370, 910],
            },
            {
              id: 'PL_013',
              name: '파이프13',
              resourceId: 'pipeLine',
              point: [370, 950, 370, 930],
            },
            {
              id: 'PL_014',
              name: '파이프14',
              resourceId: 'pipeLine',
              point: [815, 340, 815, 185],
            },
            {
              id: 'PL_015',
              name: '파이프15',
              resourceId: 'pipeLine',
              point: [1125, 935, 1125, 185],
            },
            {
              id: 'PL_016',
              name: '파이프16',
              resourceId: 'pipeLine',
              point: [895, 935, 1125, 935],
            },
            {
              id: 'PL_017',
              name: '파이프17',
              resourceId: 'pipeLine',
              point: [1150, 105, 1295, 105],
            },
            {
              id: 'PL_018',
              name: '파이프18',
              resourceId: 'pipeLine',
              point: [1295, 400, 1295, 105],
            },
          ],
        },
      ],
      svgNodeList: [],
    },
  },
  setInfo: {
    mainInfo: { main_seq: 1, uuid: 'aaaaa' },
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
          type: 'zigbee',
          subType: 'xbee',
          baudRate: 9600,
          port: 'COM2',
        },
      },
    ],
    dpcConstructorList: [
      {
        dpcId: 'DPC_001',
        protocol_info: {
          mainCategory: 'UPSAS',
          subCategory: 'xbee',
        },
      },
    ],
    dataLoggerStructureList: [
      {
        target_prefix: 'D_G',
        target_name: '수문 DL',
        dataLoggerDeviceList: [
          {
            serial_number: '0013A20040F7ACC8',
            target_code: '005',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['WD_005'],
          },
          {
            serial_number: '0013A20040F7B486',
            target_code: '006',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['WD_006'],
          },
          {
            serial_number: '0013A20040F7B47C',
            target_code: '007',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['WD_007'],
          },
          {
            serial_number: '0013A20040F7AB9C',
            target_code: '008',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['WD_008'],
          },
          {
            serial_number: '0013A20040F7B430',
            target_code: '009',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['WD_009'],
          },
          {
            serial_number: '0013A20040F7AB7D',
            target_code: '010',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['WD_010', 'S_001'],
          },
          {
            serial_number: '0013A20040F7B4A9',
            target_code: '011',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['WD_011', 'S_002'],
          },
          {
            serial_number: '0013A20040F7B460',
            target_code: '012',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['WD_012', 'S_003'],
          },
          {
            serial_number: '0013A20040F7B49B',
            target_code: '013',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['WD_013'],
          },
          {
            serial_number: '0013A20040F7B453',
            target_code: '014',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['WD_014'],
          },
          {
            serial_number: '0013A20040F7B474',
            target_code: '015',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['WD_015'],
          },
          {
            serial_number: '0013A20040F7AB98',
            target_code: '016',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['WD_016'],
          },
        ],
      },
      {
        target_prefix: 'D_V',
        target_name: '밸브 DL',
        dataLoggerDeviceList: [
          {
            serial_number: '0013A20040F7B47F',
            target_code: '001',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['V_001', 'MRT_001', 'BT_001'],
          },
          {
            serial_number: '0013A20040F7B4A4',
            target_code: '002',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['V_002', 'MRT_002', 'BT_002'],
          },
          {
            serial_number: '0013A20040F7B455',
            target_code: '003',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['V_003', 'MRT_003', 'BT_003'],
          },
          {
            serial_number: '0013A20040F7B43C',
            target_code: '004',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['V_004', 'MRT_004', 'BT_004'],
          },
          {
            serial_number: '0013A20040F7B469',
            target_code: '006',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['V_006'],
          },
          {
            serial_number: '0013A20040F7B4A7',
            target_code: '007',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['V_007'],
          },
        ],
      },
      {
        target_prefix: 'D_GV',
        target_name: '게이트형 밸브',
        dataLoggerDeviceList: [
          {
            serial_number: '0013A20040F7AB81',
            target_code: '001',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['GV_001', 'WL_001'],
          },
          {
            serial_number: '0013A20040F7AB76',
            target_code: '002',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['GV_002', 'WL_002'],
          },
          {
            serial_number: '0013A20040F7AB69',
            target_code: '003',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['GV_003', 'WL_003'],
          },
          {
            serial_number: '0013A20040F7AB96',
            target_code: '004',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['GV_004', 'WL_004'],
          },
          {
            serial_number: '0013A20040F7B4AB',
            target_code: '005',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['GV_005', 'WL_005', 'BT_005', 'MRT_007'],
          },
        ],
      },
      {
        target_prefix: 'D_EP',
        target_name: '육상 모듈 DL',
        dataLoggerDeviceList: [
          {
            serial_number: '0013A20040F7AB86',
            target_code: '001',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['MRT_005', 'MRT_006'],
          },
        ],
      },
      {
        target_prefix: 'D_P',
        target_name: '펌프 DL',
        dataLoggerDeviceList: [
          {
            serial_number: '0013A20040F7B451',
            target_code: '001',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['P_001'],
          },
          {
            serial_number: '0013A20040F7B446',
            target_code: '002',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['P_002'],
          },
          {
            serial_number: '0013A20040F7B44A',
            target_code: '003',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['P_003'],
          },
          {
            serial_number: '0013A20040F7A4E0',
            target_code: '004',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['P_004'],
          },
          {
            serial_number: '0013A20040F7A4D8',
            target_code: '005',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['P_005'],
          },
          {
            serial_number: '0013A20040F7AB1C',
            target_code: '006',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: ['P_006'],
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
        description: '섭씨',
        defList: [
          {
            target_id: 'moduleFrontTemperature',
            target_prefix: 'MFT',
            target_name: '모듈 앞면 온도',
            description: null,
            nodeList: [],
          },
          {
            target_id: 'moduleRearTemperature',
            target_prefix: 'MRT',
            target_name: '모듈 뒷면 온도',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '002',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '003',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '004',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '005',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '006',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '007',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
            ],
          },
          {
            target_id: 'brineTemperature',
            target_prefix: 'BT',
            target_name: '염수 온도',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '002',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '003',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '004',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '005',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
            ],
          },
        ],
      },
      {
        target_id: 'reh',
        target_name: '습도',
        is_sensor: 1,
        data_unit: '%',
        description: '백분율',
        defList: [],
      },
      {
        target_id: 'ws',
        target_name: '풍속',
        is_sensor: 1,
        data_unit: 'm/s',
        description: '초당 바람이 이동하는 거리(m)',
        defList: [],
      },
      {
        target_id: 'solar',
        target_name: '일사량',
        is_sensor: 1,
        data_unit: 'W/m²',
        description: '1평방 미터당 조사되는 일사에너지의 양이 1W',
        defList: [],
      },
      {
        target_id: 'co2',
        target_name: '이산화탄소',
        is_sensor: 1,
        data_unit: 'ppm',
        description: '백만분의 1. 이산화탄소 농도 395ppm = 395/1,000,000 * 100 = 0.0395 %',
        defList: [],
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
        defList: [],
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
      {
        target_id: 'salinity',
        target_name: '염도',
        is_sensor: 1,
        data_unit: '%',
        description: null,
        defList: [
          {
            target_id: 'salinity',
            target_prefix: 'S',
            target_name: '염도',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '002',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '003',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
            ],
          },
        ],
      },
      {
        target_id: 'waterLevel',
        target_name: '수위',
        is_sensor: 1,
        data_unit: 'cm',
        description: null,
        defList: [
          {
            target_id: 'waterLevel',
            target_prefix: 'WL',
            target_name: '수위',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '002',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '003',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '004',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '005',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
            ],
          },
        ],
      },
      {
        target_id: 'waterDoor',
        target_name: '수문',
        is_sensor: 0,
        data_unit: null,
        description: null,
        defList: [
          {
            target_id: 'waterDoor',
            target_prefix: 'WD',
            target_name: '수문',
            description: null,
            nodeList: [
              {
                target_code: '005',
                data_logger_index: 0,
                axisScale: [1, 1],
                moveScale: [0, 0],
              },
              {
                target_code: '006',
                data_logger_index: 0,
                axisScale: [0, 1],
                moveScale: [0, 0.6],
              },
              {
                target_code: '007',
                data_logger_index: 0,
                axisScale: [0, 1],
                moveScale: [0, 0.6],
              },
              {
                target_code: '008',
                data_logger_index: 0,
                axisScale: [1, 1],
                moveScale: [0, 0],
              },
              {
                target_code: '009',
                data_logger_index: 0,
                axisScale: [1, 1],
                moveScale: [0, 0],
              },
              {
                target_code: '010',
                data_logger_index: 0,
                axisScale: [0, 1],
                moveScale: [1, 0],
              },
              {
                target_code: '011',
                data_logger_index: 0,
                axisScale: [0, 1],
                moveScale: [1, 0],
              },
              {
                target_code: '012',
                data_logger_index: 0,
                axisScale: [0, 1],
                moveScale: [0, 0],
              },
              {
                target_code: '013',
                data_logger_index: 0,
                axisScale: [0, 1],
                moveScale: [0, 0],
              },
              {
                target_code: '014',
                data_logger_index: 0,
                axisScale: [0, 1],
                moveScale: [0, 0],
              },
              {
                target_code: '015',
                data_logger_index: 0,
                axisScale: [1, 0],
                moveScale: [0, 1],
              },
              {
                target_code: '016',
                data_logger_index: 0,
                axisScale: [1, 0],
                moveScale: [0, 0],
              },
            ],
          },
        ],
      },
      {
        target_id: 'valve',
        target_name: '밸브',
        is_sensor: 0,
        data_unit: null,
        description: null,
        defList: [
          {
            target_id: 'valve',
            target_prefix: 'V',
            target_name: '밸브',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '002',
                data_logger_index: 0,
                axisScale: [0, 1],
                moveScale: [0, 0],
              },
              {
                target_code: '003',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '004',
                data_logger_index: 0,
                axisScale: [0, 1],
                moveScale: [0, 0],
              },
              {
                target_code: '006',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, -0.5],
              },
              {
                target_code: '007',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, -0.5],
              },
            ],
          },
          {
            target_id: 'gateValve',
            target_prefix: 'GV',
            target_name: '수문 용 밸브',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axisScale: [1, 1],
                moveScale: [0, -0.8],
              },
              {
                target_code: '002',
                data_logger_index: 0,
                axisScale: [1, 1],
                moveScale: [0, -0.8],
              },
              {
                target_code: '003',
                data_logger_index: 0,
                axisScale: [1, 1],
                moveScale: [0, -0.8],
              },
              {
                target_code: '004',
                data_logger_index: 0,
                axisScale: [1, 1],
                moveScale: [0, -0.8],
              },
              {
                target_code: '005',
                data_logger_index: 0,
                axisScale: [0, 1],
                moveScale: [0, 0],
              },
            ],
          },
        ],
      },
      {
        target_id: 'pump',
        target_name: '펌프',
        is_sensor: 0,
        data_unit: null,
        description: null,
        defList: [
          {
            target_id: 'pump',
            target_prefix: 'P',
            target_name: '펌프',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axisScale: [1, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '002',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '003',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '004',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '005',
                data_logger_index: 0,
                axisScale: [1, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '006',
                data_logger_index: 0,
                axisScale: [1, 1],
                moveScale: [0, 0],
              },
            ],
          },
        ],
      },
      {
        target_id: 'outlet',
        target_name: '배출구',
        is_sensor: -1,
        data_unit: null,
        description: null,
        defList: [
          {
            target_id: 'outlet',
            target_prefix: 'O',
            target_name: '배출구',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0.5, 2],
              },
              {
                target_code: '002',
                data_logger_index: 0,
                axisScale: [0, 1],
                moveScale: [0.5, -2],
              },
              {
                target_code: '003',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [0.5, 2],
              },
              {
                target_code: '004',
                data_logger_index: 0,
                axisScale: [0, 1],
                moveScale: [0.5, -2],
              },
              {
                target_code: '005',
                data_logger_index: 0,
                axisScale: [1, 0],
                moveScale: [-2.2, 0],
              },
              {
                target_code: '006',
                data_logger_index: 0,
                axisScale: [1, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '007',
                data_logger_index: 0,
                axisScale: [1, 0],
                moveScale: [0, 0],
              },
              {
                target_code: '008',
                data_logger_index: 0,
                axisScale: [0, 0],
                moveScale: [2, 0],
              },
            ],
          },
        ],
      },
    ],
  },
  realtionInfo: {
    placeRelationList: [
      {
        target_id: 'earth',
        target_name: '육상',
        description: null,
        defList: [
          {
            target_id: 'earth',
            target_name: '육상',
            target_prefix: 'EA',
            placeList: [
              {
                target_code: '일반',
                nodeList: ['MRT_006'],
              },
              {
                target_code: 'G2G',
                nodeList: ['MRT_005'],
              },
            ],
          },
        ],
      },
      {
        target_id: 'salternBlock',
        target_name: '염판',
        description: null,
        defList: [
          {
            target_id: 'salternEvapvaporationBlock',
            target_prefix: 'SEB',
            target_name: '증발지',
            placeList: [
              {
                target_code: '1_A',
                depth: 5,
                place_info: {
                  maxBrineLevel: 20,
                  minBrineLevel: 1,
                  setBrineLevel: 4,
                },
                nodeList: ['GV_001', 'WL_001', 'V_001', 'MRT_001', 'O_001', 'BT_001'],
              },
              {
                target_code: '1_B',
                depth: 5,
                place_info: {
                  maxBrineLevel: 20,
                  minBrineLevel: 1,
                  setBrineLevel: 4,
                },
                nodeList: ['GV_002', 'WL_002', 'V_002', 'MRT_002', 'O_002', 'BT_002'],
              },
              {
                target_code: '1_C',
                depth: 5,
                place_info: {
                  maxBrineLevel: 20,
                  minBrineLevel: 1,
                  setBrineLevel: 4,
                },
                nodeList: ['GV_003', 'WL_003', 'V_003', 'MRT_003', 'O_003', 'BT_003'],
              },
              {
                target_code: '1_D',
                depth: 5,
                place_info: {
                  maxBrineLevel: 20,
                  minBrineLevel: 1,
                  setBrineLevel: 4,
                },
                nodeList: ['GV_004', 'WL_004', 'V_004', 'MRT_004', 'O_004', 'BT_004'],
              },
              {
                target_code: '1_E',
                depth: 5,
                place_info: {
                  maxBrineLevel: 20,
                  minBrineLevel: 1,
                  setBrineLevel: 4,
                },
                nodeList: ['GV_005', 'O_008', 'MRT_007', 'WL_005', 'BT_005'],
              },
              {
                target_code: '일반',
                depth: 5,
                place_info: {
                  maxBrineLevel: 20,
                  minBrineLevel: 1,
                  setBrineLevel: 4,
                },
                nodeList: ['WD_005'],
              },
              {
                target_code: '2',
                depth: 4,
                place_info: {
                  maxBrineLevel: 20,
                  minBrineLevel: 1,
                  setBrineLevel: 4,
                },
                nodeList: ['WD_006', 'O_005'],
              },
              {
                target_code: '3',
                depth: 3,
                place_info: {
                  maxBrineLevel: 20,
                  minBrineLevel: 1,
                  setBrineLevel: 4,
                },
                nodeList: ['WD_006', 'WD_007'],
              },
              {
                target_code: '4',
                depth: 2,
                place_info: {
                  maxBrineLevel: 20,
                  minBrineLevel: 1,
                  setBrineLevel: 4,
                  setSalinity: 18,
                },
                nodeList: ['WD_007', 'WD_008'],
              },
            ],
          },
          {
            target_id: 'salternCrystalizingBlock',
            target_prefix: 'SCB',
            target_name: '결정지',
            placeList: [
              {
                target_code: '',
                depth: 1,
                place_info: {
                  maxBrineLevel: 7,
                  minBrineLevel: 1,
                },
                nodeList: ['WD_009', 'O_006'],
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
                depth: -1,
                place_info: {
                  maxBrineLevel: 100,
                  minBrineLevel: 30,
                  setBrineLevel: 70,
                },
                nodeList: ['WD_010', 'S_001', 'P_003'],
              },
              {
                target_code: '2',
                depth: -1,
                place_info: {
                  maxBrineLevel: 100,
                  minBrineLevel: 30,
                  setBrineLevel: 70,
                },
                nodeList: ['WD_011', 'S_002', 'P_004'],
              },
              {
                target_code: '3',
                depth: -1,
                place_info: {
                  maxBrineLevel: 100,
                  minBrineLevel: 30,
                  setBrineLevel: 70,
                },
                nodeList: ['WD_012', 'S_003', 'P_005'],
              },
            ],
          },
        ],
      },
      {
        target_id: 'reservoir',
        target_name: '저수조',
        description: null,
        defList: [
          {
            target_id: 'reservoir',
            target_prefix: 'RV',
            target_name: '저수조',
            placeList: [
              {
                target_code: '',
                depth: -1,
                nodeList: ['P_002', 'P_006', 'O_007'],
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
                nodeList: ['P_001'],
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
                depth: 0.4,
                nodeList: ['GV_001', 'GV_002', 'GV_003', 'GV_004', 'WD_013'],
              },
              {
                target_code: '002',
                depth: 0.3,
                nodeList: ['GV_004', 'WD_010', 'WD_013', 'WD_016'],
              },
              {
                target_code: '003',
                depth: 0.3,
                nodeList: ['WD_008', 'WD_009', 'WD_014'],
              },
              {
                target_code: '004',
                depth: 0.2,
                nodeList: ['WD_011', 'WD_012', 'WD_014', 'WD_015', 'WD_016'],
              },
              {
                target_code: '005',
                depth: 0.1,
                nodeList: ['WD_015'],
              },
              {
                target_code: '006',
                depth: 0.4,
                nodeList: ['GV_005'],
              },
              {
                target_code: '007',
                depth: 0.3,
                nodeList: [],
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
              {
                target_code: '001',
                nodeList: [],
              },
              {
                target_code: '002',
                nodeList: [],
              },
              {
                target_code: '003',
                nodeList: ['V_006'],
              },
              {
                target_code: '004',
                nodeList: ['V_007'],
              },
              {
                target_code: '005',
                nodeList: [],
              },
              {
                target_code: '006',
                nodeList: [],
              },
              {
                target_code: '007',
                nodeList: [],
              },
              {
                target_code: '008',
                nodeList: [],
              },
              {
                target_code: '009',
                nodeList: [],
              },
              {
                target_code: '010',
                nodeList: [],
              },
              {
                target_code: '011',
                nodeList: [],
              },
              {
                target_code: '012',
                nodeList: [],
              },
              {
                target_code: '013',
                nodeList: [],
              },
              {
                target_code: '014',
                nodeList: [],
              },
              {
                target_code: '015',
                nodeList: [],
              },
              {
                target_code: '016',
                nodeList: [],
              },
              {
                target_code: '017',
                nodeList: [],
              },
              {
                target_code: '018',
                nodeList: [],
              },
            ],
          },
        ],
      },
    ],
    brineFlowRelationList: [
      {
        currNodeId: 'P_001',
        placeIdList: ['RV'],
        parentNodeIdList: [],
        childrenNodeIdList: [],
      },
      {
        currNodeId: 'P_002',
        placeIdList: [],
        parentNodeIdList: [],
        childrenNodeIdList: ['V_006'],
      },
      {
        currNodeId: 'P_003',
        placeIdList: [],
        parentNodeIdList: [],
        childrenNodeIdList: ['V_007'],
      },
      {
        currNodeId: 'P_004',
        placeIdList: ['SEB_2'],
        parentNodeIdList: [],
        childrenNodeIdList: [],
      },
      {
        currNodeId: 'P_005',
        placeIdList: ['SCB'],
        parentNodeIdList: [],
        childrenNodeIdList: [],
      },
    ],
    brineFeedRankRelationList: [],
    svgResourceConnectionList: [
      {
        targetIdList: ['SEB_1_A', 'SEB_1_B', 'SEB_1_C', 'SEB_1_D'],
        resourceIdList: ['salternModuleBlock_A'],
      },
      {
        targetIdList: ['SEB_일반'],
        resourceIdList: ['salternNomalBlock_A'],
      },
      {
        targetIdList: ['SEB_2', 'SEB_3', 'SEB_4'],
        resourceIdList: ['salternNomalBlock_B'],
      },
      {
        targetIdList: ['SEB_1_E'],
        resourceIdList: ['salternModuleBlock_B'],
      },
      {
        targetIdList: ['SCB'],
        resourceIdList: ['salternCrystalBlock'],
      },
      {
        targetIdList: ['EA_일반', 'EA_G2G'],
        resourceIdList: ['earth'],
      },
      {
        targetIdList: ['BW_1', 'BW_2', 'BW_3'],
        resourceIdList: ['brineWarehouse'],
      },
      {
        targetIdList: ['RV'],
        resourceIdList: ['reservoir'],
      },
      {
        targetIdList: ['SEA'],
        resourceIdList: ['sea'],
      },
      {
        targetIdList: [
          'GV_001',
          'GV_002',
          'GV_003',
          'GV_004',
          'GV_005',
          'WD_005',
          'WD_006',
          'WD_007',
          'WD_008',
          'WD_009',
          'WD_010',
          'WD_011',
          'WD_012',
          'WD_013',
          'WD_014',
          'WD_015',
          'WD_016',
        ],
        resourceIdList: ['waterDoor'],
      },
      {
        targetIdList: ['P_001', 'P_002', 'P_003', 'P_004', 'P_005', 'P_006'],
        resourceIdList: ['pump'],
      },
      {
        targetIdList: ['V_001', 'V_002', 'V_003', 'V_004', 'V_006', 'V_007'],
        resourceIdList: ['valve'],
      },
      {
        targetIdList: ['O_001', 'O_002', 'O_003', 'O_004', 'O_005', 'O_006', 'O_007', 'O_008'],
        resourceIdList: ['outlet'],
      },
      {
        targetIdList: ['WW_001', 'WW_002', 'WW_003', 'WW_004', 'WW_005', 'WW_006', 'WW_007'],
        resourceIdList: ['waterWay'],
      },
      {
        targetIdList: ['MRT_001', 'MRT_002', 'MRT_003', 'MRT_004', 'MRT_005', 'MRT_006', 'MRT_007'],
        resourceIdList: ['moduleRearTemperature'],
      },
      {
        targetIdList: ['WL_001', 'WL_002', 'WL_003', 'WL_004', 'WL_005'],
        resourceIdList: ['WLSensor'],
      },
      {
        targetIdList: ['BT_001', 'BT_002', 'BT_003', 'BT_004', 'BT_005'],
        resourceIdList: ['brineTemperature'],
      },
      {
        targetIdList: ['S_001', 'S_002', 'S_003'],
        resourceIdList: ['salinity'],
      },
    ],
    excludeNameList: ['waterWay', 'pipeLine'],
  },
  controlInfo: {
    tempControlList: [
      {
        cmdName: '바다 → 저수지',
        trueList: ['P_001'],
        falseList: [],
      },
      {
        cmdName: '저수조 → 증발지 1_E',
        trueList: ['P_006'],
        falseList: ['GV_005'],
      },
      {
        cmdName: '저수조 → 증발지 1',
        trueList: ['V_006', 'V_001', 'V_002', 'V_003', 'V_004', 'P_002'],
        falseList: ['GV_001', 'GV_002', 'GV_003', 'GV_004', 'WD_005'],
      },
      {
        cmdName: '해주 1 → 증발지 1',
        trueList: ['V_007', 'V_001', 'V_002', 'V_003', 'V_004', 'P_003'],
        falseList: ['GV_001', 'GV_002', 'GV_003', 'GV_004', 'WD_005'],
      },
      {
        cmdName: '해주 2 → 증발지 2',
        trueList: ['P_004'],
        falseList: ['WD_006'],
      },
      {
        cmdName: '해주 2 → 증발지 2, 3, 4',
        trueList: ['P_004', 'WD_006', 'WD_007'],
        falseList: ['WD_008'],
      },
      {
        cmdName: '해주 3 → 결정지',
        trueList: ['P_005'],
        falseList: ['WD_009'],
      },
      {
        cmdName: '증발지 1 → 해주 1',
        trueList: ['GV_001', 'GV_002', 'GV_003', 'GV_004', 'WD_005', 'WD_013', 'WD_010'],
        falseList: ['WD_016'],
      },
      {
        cmdName: '증발지 1 → 해주 2',
        trueList: ['GV_001', 'GV_002', 'GV_003', 'GV_004', 'WD_005', 'WD_013', 'WD_016', 'WD_011'],
        falseList: ['WD_010', 'WD_012', 'WD_014', 'WD_015'],
      },
      {
        cmdName: '증발지 2 → 증발지 3',
        trueList: ['WD_006'],
        falseList: ['WD_007'],
      },
      {
        cmdName: '증발지 3 → 증발지 4',
        trueList: ['WD_007'],
        falseList: ['WD_008'],
      },
      {
        cmdName: '증발지 4 → 해주2',
        trueList: ['WD_008', 'WD_014', 'WD_011'],
        falseList: ['WD_012', 'WD_015'],
      },
      {
        cmdName: '증발지 4 → 해주3',
        trueList: ['WD_008', 'WD_014', 'WD_012'],
        falseList: ['WD_011', 'WD_015'],
      },
      {
        cmdName: '결정지 → 해주 3',
        trueList: ['WD_009', 'WD_014', 'WD_012'],
        falseList: ['WD_011'],
      },
      {
        cmdName: '저수조 → 증발지 1A',
        trueList: ['V_006', 'V_001', 'P_002'],
        falseList: ['GV_001'],
      },
      {
        cmdName: '저수조 → 증발지 1B',
        trueList: ['V_006', 'V_002', 'P_002'],
        falseList: ['GV_002'],
      },
      {
        cmdName: '저수조 → 증발지 1C',
        trueList: ['V_006', 'V_003', 'P_002'],
        falseList: ['GV_003'],
      },
      {
        cmdName: '저수조 → 증발지 1D',
        trueList: ['V_006', 'V_004', 'P_002'],
        falseList: ['GV_004'],
      },
      {
        cmdName: '해주 1 → 증발지 1A',
        trueList: ['V_007', 'V_001', 'P_003'],
        falseList: ['GV_001'],
      },
      {
        cmdName: '해주 1 → 증발지 1B',
        trueList: ['V_007', 'V_002', 'P_003'],
        falseList: ['GV_002'],
      },
      {
        cmdName: '해주 1 → 증발지 1C',
        trueList: ['V_007', 'V_003', 'P_003'],
        falseList: ['GV_003'],
      },
      {
        cmdName: '해주 1 → 증발지 1D',
        trueList: ['V_007', 'V_004', 'P_003'],
        falseList: ['GV_004'],
      },
      {
        cmdName: '증발지 1A → 해주 1',
        trueList: ['GV_001', 'WD_013', 'WD_010'],
        falseList: [],
      },
      {
        cmdName: '증발지 1B → 해주 1',
        trueList: ['GV_002', 'WD_013', 'WD_010'],
        falseList: [],
      },
      {
        cmdName: '증발지 1C → 해주 1',
        trueList: ['GV_003', 'WD_013', 'WD_010'],
        falseList: [],
      },
      {
        cmdName: '증발지 1D → 해주 1',
        trueList: ['GV_004', 'WD_013', 'WD_010'],
        falseList: [],
      },
    ],
  },
};
module.exports = map;
