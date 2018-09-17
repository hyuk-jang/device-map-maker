require('default-intelligence');

/**
 * @type {mDeviceMap}
 */

const map = {
  drawInfo: {
    frame: {
      mapSize: {
        width: 3000,
        height: 1230,
      },
      svgModelResourceList: [
        {
          id: 'salternModuleBlock',
          type: 'pattern',
          elementDrawInfo: {
            width: 200,
            height: 130,
            color: '', // TODO:
          },
        },
        {
          id: 'salternNomalBlock',
          type: 'rect',
          elementDrawInfo: {
            width: 200,
            height: 130,
            color: '', // TODO:
          },
        },
        {
          id: 'salternCrystalBlock',
          type: 'rect',
          elementDrawInfo: {
            width: 200,
            height: 130,
            color: '', // TODO:
          },
        },
        {
          id: 'brineWarehouse',
          type: 'rect',
          elementDrawInfo: {
            width: 170,
            height: 150,
            color: '', // TODO:
          },
        },
        {
          id: 'waterDoor',
          type: 'rect',
          elementDrawInfo: {
            width: 50,
            height: 50,
            color: '', // TODO:
          },
        },
        {
          id: 'sea',
          type: 'rect',
          elementDrawInfo: {
            // FIXME:
            width: 170,
            height: 150,
            color: '', // TODO:
          },
        },
        {
          id: 'valve',
          type: 'polygon',
          elementDrawInfo: {
            // FIXME:
            width: 170,
            height: 150,
            color: '', // TODO:
          },
        },
        {
          id: 'pipe',
          type: 'line',
          elementDrawInfo: {
            // FIXME:
            width: 170,
            height: 150,
            color: '', // TODO:
          },
        },
        {
          id: 'outlet',
          type: 'cicle',
          elementDrawInfo: {
            // FIXME:
            width: 170,
            height: 150,
            color: '', // TODO:
          },
        },
        {
          id: 'waterLine',
          type: 'line',
          elementDrawInfo: {
            // FIXME:
            width: 170,
            height: 150,
            color: '', // TODO:
          },
        },
        {
          id: 'reservoir',
          type: 'rect',
          elementDrawInfo: {
            // FIXME:
            width: 170,
            height: 150,
            color: '', // TODO:
          },
        },
        {
          id: 'sea',
          type: 'rect',
          elementDrawInfo: {
            // FIXME:
            width: 170,
            height: 150,
            color: '', // TODO:
          },
        },
      ],
    },
    positionInfo: {
      // TODO: positionInfo 정의
      svgPlaceList: [
        {
          placeId: 'salternBlock',
          placeName: '염판',
          placeList: [
            {
              id: 'SMB_1_A',
              resourceId: 'salternModuleBlock',
              placePosition: [200, 850], // FIXME:
            },
            {
              id: 'SMB_1_B',
              resourceId: 'salternModuleBlock',
              placePosition: [200, 850], // FIXME:
            },
            {
              id: 'SMB_1_C',
              resourceId: 'salternModuleBlock',
              placePosition: [200, 850], // FIXME:
            },
            {
              id: 'SMB_1_D',
              resourceId: 'salternModuleBlock',
              placePosition: [200, 850], // FIXME:
            },
            {
              id: 'SNB_001',
              resourceId: 'salternNomalBlock',
              placePosition: [200, 850], // FIXME:
            },
            {
              id: 'SNB_002',
              resourceId: 'salternNomalBlock',
              placePosition: [200, 850], // FIXME:
            },
            {
              id: 'SNB_003',
              resourceId: 'salternNomalBlock',
              placePosition: [200, 850], // FIXME:
            },
            {
              id: 'SNB_004',
              resourceId: 'salternNomalBlock',
              placePosition: [200, 850], // FIXME:
            },
            {
              id: 'SCB_001',
              resourceId: 'salternCrystalBlock',
              placePosition: [200, 850], // FIXME:
            },
          ],
        },
        {
          placeId: 'brineWarehoust',
          placeName: '해주',
          placeList: [
            {
              id: 'BW_001',
              resourceId: 'brineWarehouse',
              placePosition: [200, 850], // FIXME:
            },
            {
              id: 'BW_002',
              resourceId: 'brineWarehouse',
              placePosition: [200, 850], // FIXME:
            },
            {
              id: 'BW_003',
              resourceId: 'brineWarehouse',
              placePosition: [200, 850], // FIXME:
            },
          ],
        },
        {
          placeId: 'reservoir',
          placeName: '저수조',
          placeList: [
            {
              id: 'RESERVOIR',
              resourceId: 'reservoir',
              placePosition: [0, 0], // FIXME:
            },
          ],
        },
        {
          placeId: 'sea',
          placeName: '바다',
          placeList: [
            {
              id: 'SEA',
              resourceId: 'sea',
              placePosition: [0, 0], // FIXME:
            },
          ],
        },
      ],
      svgNodeList: [],
    },
  },
  setInfo: {
    mainInfo: {
      main_seq: 1,
      uuid: 'aaaaa',
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
          subCategory: 'youngSanPo',
        },
      },
    ],
    dataLoggerStructureList: [
      {
        target_prefix: 'D_SB',
        target_name: '센서 Board DL',
        dataLoggerDeviceList: [
          {
            serial_number: '1',
            target_code: '001',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: [''],
          },
          {
            serial_number: '2',
            target_code: '002',
            dccId: 'DCC_002',
            dpcId: 'DPC_001',
            nodeList: [''],
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
            target_id: 'soilTemperature',
            target_prefix: 'ST',
            target_name: '토양 온도',
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
              },
              {
                target_code: '002',
                data_logger_index: 0,
              },
            ],
          },
          {
            target_id: 'outsideAirTemperature',
            target_prefix: 'OAT',
            target_name: '외기 온도',
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
              },
              {
                target_code: '002',
                data_logger_index: 0,
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
        defList: [
          {
            target_id: 'soilReh',
            target_prefix: 'SR',
            target_name: '토양 습도',
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
              },
              {
                target_code: '002',
                data_logger_index: 0,
              },
            ],
          },
          {
            target_id: 'outsideAirReh',
            target_prefix: 'OAR',
            target_name: '외기 습도',
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
              },
              {
                target_code: '002',
                data_logger_index: 0,
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
            target_prefix: 'WS',
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
              },
              {
                target_code: '002',
                data_logger_index: 0,
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
            target_prefix: 'WD',
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
              },
              {
                target_code: '002',
                data_logger_index: 0,
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
            target_id: 'solar',
            target_prefix: 'SL',
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
              },
              {
                target_code: '002',
                data_logger_index: 0,
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
            target_prefix: 'R1',
            target_name: '시간당 강우량',
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
              },
              {
                target_code: '002',
                data_logger_index: 0,
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
                data_logger_index: 0,
              },
              {
                target_code: '002',
                data_logger_index: 0,
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
                data_logger_index: 0,
              },
              {
                target_code: '002',
                data_logger_index: 0,
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
                data_logger_index: 0,
              },
              {
                target_code: '002',
                data_logger_index: 0,
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
            target_prefix: 'SWV',
            target_name: '토양 수분 값',
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
              },
              {
                target_code: '002',
                data_logger_index: 0,
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
      // TODO: pump, waterDoor, valve, outlet ↓
      {
        target_id: 'vavle',
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
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '002',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '003',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '004',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '005',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '006',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
            ],
          },
        ],
      },
      {
        target_id: 'gateValve',
        target_name: '수문',
        is_sensor: 0,
        data_unit: null,
        description: null,
        defList: [
          {
            target_id: 'gateValve',
            target_prefix: 'GV',
            target_name: '수문',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '002',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '003',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '004',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
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
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '006',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '007',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '008',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '009',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '010',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '011',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '012',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '013',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '014',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '015',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '016',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
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
            target_prefix: 'PU',
            target_name: '펌프',
            description: null,
            nodeList: [
              {
                target_code: '001',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '002',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '003',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '004',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '005',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
            ],
          },
        ],
      },
      {
        target_id: 'outlet',
        target_name: '배출구',
        is_sensor: 0,
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
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '002',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '003',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
              {
                target_code: '004',
                data_logger_index: 0,
                axis: [0, 0],
                moveScale: [0, 0], // FIXME:
              },
            ],
          },
        ],
      },
    ],
  },
  relationInfo: {
    placeRelationList: [
      {
        target_id: 'salternBlock',
        target_name: '증발지',
        defList: [
          {
            target_id: 'salternModuleBlock',
            target_prefix: 'SMB',
            target_name: '모듈 증발지',
            placeList: [
              {
                target_code: '1_A',
                depth: 0, // FIXME:
                nodeList: ['GV_001', 'V_001', 'O_001'],
              },
              {
                target_code: '1_B',
                depth: 0, // FIXME:
                nodeList: ['GV_002', 'V_002', 'O_002'],
              },
              {
                target_code: '1_C',
                depth: 0, // FIXME:
                nodeList: ['GV_003', 'V_003', 'O_003'],
              },
              {
                target_code: '1_D',
                depth: 0, // FIXME:
                nodeList: ['GV_004', 'V_004', 'O_004'],
              },
            ],
          },
          {
            target_id: 'salternNormalBlock',
            target_prefix: 'SNB',
            target_name: '일반 증발지',
            placeList: [
              {
                target_code: '001',
                depth: 0, // FIXME:
                nodeList: ['WD_005'],
              },
              {
                target_code: '002',
                depth: 0, // FIXME:
                nodeList: ['WD_006'],
              },
              {
                target_code: '003',
                depth: 0, // FIXME:
                nodeList: ['WD_006', 'WD_007'],
              },
              {
                target_code: '004',
                depth: 0, // FIXME:
                nodeList: ['WD_007', 'WD_008'],
              },
            ],
          },
          {
            target_id: 'salternCrystalBlock',
            target_prefix: 'SCB',
            target_name: '결정지',
            placeList: [
              {
                target_code: '001',
                depth: 0, // FIXME:
                nodeList: ['WD_009'],
              },
            ],
          },
        ],
      },
      {
        target_id: 'brineWarehouse',
        target_name: '해주',
        defList: [
          {
            target_id: 'brineWarehouse',
            target_prefix: 'BW',
            target_name: '해주',
            placeList: [
              {
                target_code: '001',
                nodeList: ['WD_010', 'PU_003'],
              },
              {
                target_code: '002',
                nodeList: ['WD_011', 'PU_004'],
              },
              {
                target_code: '003',
                nodeList: ['WD_012', 'PU_005'],
              },
            ],
          },
        ],
      },
      {
        target_id: 'reservoir',
        target_name: '저수조',
        defList: [
          {
            target_id: 'reservoir',
            target_prefix: 'RESERVOIR',
            target_name: '저수조',
            placeList: [
              {
                target_code: '',
                nodeList: ['PU_001', 'PU_002'],
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
  },
  controlInfo: {
    tempControlList: [
      {
        cmdName: '바다 → 저수지',
        trueList: ['P_001'],
        falseList: [],
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
