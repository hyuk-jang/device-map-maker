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
          id: 'salternModuleBlock_001',
          type: 'pattern',
          code: 'SMB_1_A',
          elementDrawInfo: {
            width: 200,
            height: 130,
            color: '#a99',
          },
        },
        {
          id: 'salternModuleBlock_002',
          type: 'pattern',
          code: 'SMB_1_B',
          elementDrawInfo: {
            width: 210,
            height: 130,
            color: '#a99',
            image: '/src/testImage/testModule.jpg',
          },
        },
        {
          id: 'salternModuleBlock_003',
          type: 'pattern',
          code: 'SMB_1_C',
          elementDrawInfo: {
            width: 210,
            height: 130,
            color: '#a99',
            image: '/src/testImage/testModule.jpg',
          },
        },
        {
          id: 'salternModuleBlock_004',
          type: 'pattern',
          code: 'SMB_1_D',
          elementDrawInfo: {
            width: 210,
            height: 130,
            color: '#a99',
            image: '/src/testImage/testModule.jpg',
          },
        },
        {
          id: 'salternNomalBlock_001',
          type: 'rect',
          code: 'SNB_001',
          elementDrawInfo: {
            width: 210,
            height: 130,
          },
        },
        {
          id: 'salternNomalBlock_002',
          type: 'rect',
          code: 'SNB_002',
          elementDrawInfo: {
            width: 230,
            height: 150,
          },
        },
        {
          id: 'salternNomalBlock_003',
          type: 'rect',
          code: 'SNB_003',
          elementDrawInfo: {
            width: 230,
            height: 150,
          },
        },
        {
          id: 'salternNomalBlock_004',
          type: 'rect',
          code: 'SNB_004',
          elementDrawInfo: {
            width: 230,
            height: 150,
          },
        },
        {
          id: 'salternCrystalBlock_001',
          type: 'rect',
          code: 'SCB_001',
          elementDrawInfo: {
            width: 230,
            height: 150,
          },
        },
        {
          id: 'brineWarehouse_001',
          type: 'rect',
          code: 'BW_001',
          elementDrawInfo: {
            width: 170,
            height: 150,
            color: '#33ffff',
          },
        },
        {
          id: 'brineWarehouse_002',
          type: 'rect',
          code: 'BW_002',
          elementDrawInfo: {
            width: 170,
            height: 150,
            color: '#33ffff',
          },
        },
        {
          id: 'brineWarehouse_003',
          type: 'rect',
          code: 'BW_003',
          elementDrawInfo: {
            width: 170,
            height: 150,
            color: '#33ffff',
          },
        },
        // {
        //   id: 'waterDoor_001',
        //   type: 'rect',
        //   code: 'WD_001',
        //   elementDrawInfo: {
        //     width: 50,
        //     height: 50,
        //     color: '#5CD1E5',
        //   },
        // },
        // {
        //   id: 'waterDoor_002',
        //   type: 'rect',
        //   code: 'WD_002',
        //   elementDrawInfo: {
        //     width: 50,
        //     height: 50,
        //     color: '#33ffff',
        //   },
        // },
        // {
        //   id: 'waterDoor_003',
        //   type: 'rect',
        //   code: 'WD_003',
        //   elementDrawInfo: {
        //     width: 50,
        //     height: 50,
        //     color: '#33ffff',
        //   },
        // },
        // {
        //   id: 'waterDoor_004',
        //   type: 'rect',
        //   code: 'WD_004',
        //   elementDrawInfo: {
        //     width: 50,
        //     height: 50,
        //     color: '#33ffff',
        //   },
        // },
        // {
        //   id: 'waterDoor_005',
        //   type: 'rect',
        //   code: 'WD_005',
        //   elementDrawInfo: {
        //     width: 50,
        //     height: 50,
        //     color: '#33ffff',
        //   },
        // },
        // {
        //   id: 'waterDoor_006',
        //   type: 'rect',
        //   code: 'WD_006',
        //   elementDrawInfo: {
        //     width: 50,
        //     height: 50,
        //     color: '#33ffff',
        //   },
        // },
        // {
        //   id: 'waterDoor_007',
        //   type: 'rect',
        //   code: 'WD_007',
        //   elementDrawInfo: {
        //     width: 50,
        //     height: 50,
        //     color: '#33ffff',
        //   },
        // },
        // {
        //   id: 'waterDoor_008',
        //   type: 'rect',
        //   code: 'WD_008',
        //   elementDrawInfo: {
        //     width: 50,
        //     height: 50,
        //     color: '#33ffff',
        //   },
        // },
        // {
        //   id: 'waterDoor_009',
        //   type: 'rect',
        //   code: 'WD_009',
        //   elementDrawInfo: {
        //     width: 50,
        //     height: 50,
        //     color: '#33ffff',
        //   },
        // },
        // {
        //   id: 'waterDoor_010',
        //   type: 'rect',
        //   code: 'WD_010',
        //   elementDrawInfo: {
        //     width: 50,
        //     height: 50,
        //     color: '#33ffff',
        //   },
        // },
        // {
        //   id: 'waterDoor_011',
        //   type: 'rect',
        //   code: 'WD_011',
        //   elementDrawInfo: {
        //     width: 50,
        //     height: 50,
        //     color: '#33ffff',
        //   },
        // },
        // {
        //   id: 'waterDoor_012',
        //   type: 'rect',
        //   code: 'WD_012',
        //   elementDrawInfo: {
        //     width: 50,
        //     height: 50,
        //     color: '#33ffff',
        //   },
        // },
        // {
        //   id: 'waterDoor_013',
        //   type: 'rect',
        //   code: 'WD_013',
        //   elementDrawInfo: {
        //     width: 50,
        //     height: 50,
        //     color: '#33ffff',
        //   },
        // },
        // {
        //   id: 'waterDoor_014',
        //   type: 'rect',
        //   code: 'WD_014',
        //   elementDrawInfo: {
        //     width: 50,
        //     height: 50,
        //     color: '#33ffff',
        //   },
        // },
        // {
        //   id: 'waterDoor_015',
        //   type: 'rect',
        //   code: 'WD_015',
        //   elementDrawInfo: {
        //     width: 50,
        //     height: 50,
        //     color: '#33ffff',
        //   },
        // },
        // {
        //   id: 'waterDoor_016',
        //   type: 'rect',
        //   code: 'WD_016',
        //   elementDrawInfo: {
        //     width: 50,
        //     height: 50,
        //     color: '#33ffff',
        //   },
        // },
        // {
        //   id: 'sea',
        //   type: 'rect',
        //   code: 'SEA',
        //   elementDrawInfo: {
        //     width: 100,
        //     height: 150,
        //   },
        // },
        // {
        //   id: 'salternLine_001',
        //   type: 'line',
        //   elementDrawInfo: {
        //     // TODO: 라인 설정 값 svg.js 기준으로 변경
        //   },
        // },
        // {
        //   id: 'pipe_001',
        //   type: 'line',
        //   elementDrawInfo: {
        //     // TODO: 라인 설정 값 svg.js 기준으로 변경
        //   },
        // },
        // {
        //   id: 'pump_001',
        //   type: 'circle',
        //   elementDrawInfo: {
        //     radius: 20,
        //     color: '#9fe667',
        //   },
        // },
        // {
        //   id: 'pump_002',
        //   type: 'circle',
        //   elementDrawInfo: {
        //     radius: 20,
        //     color: '#9fe667',
        //   },
        // },
        // {
        //   id: 'pump_003',
        //   type: 'circle',
        //   elementDrawInfo: {
        //     radius: 20,
        //     color: '#9fe667',
        //   },
        // },
        // {
        //   id: 'pump_004',
        //   type: 'circle',
        //   elementDrawInfo: {
        //     radius: 20,
        //     color: '#9fe667',
        //   },
        // },
        // {
        //   id: 'pump_005',
        //   type: 'circle',
        //   elementDrawInfo: {
        //     radius: 20,
        //     color: '#9fe667',
        //   },
        // },
        // {
        //   id: 'outlet_001',
        //   type: 'circle',
        //   elementDrawInfo: {
        //     radius: 20,
        //     color: '#9fe667',
        //   },
        // },
        // {
        //   id: 'valve_001',
        //   type: 'polygon',
        //   elementDrawInfo: {
        //     // TODO: 마름모 설정 값 svg.js 기준으로 변경
        //     width: 40,
        //     height: 40,
        //     color: '#9fe667',
        //   },
        // },
        // {
        //   id: 'valve_002',
        //   type: 'polygon',
        //   elementDrawInfo: {
        //     // TODO: 마름모 설정 값 svg.js 기준으로 변경
        //     width: 40,
        //     height: 40,
        //     color: '#9fe667',
        //   },
        // },
        // {
        //   id: 'valve_003',
        //   type: 'polygon',
        //   elementDrawInfo: {
        //     // TODO: 마름모 설정 값 svg.js 기준으로 변경
        //     width: 40,
        //     height: 40,
        //     color: '#9fe667',
        //   },
        // },
        // {
        //   id: 'valve_004',
        //   type: 'polygon',
        //   elementDrawInfo: {
        //     // TODO: 마름모 설정 값 svg.js 기준으로 변경
        //     width: 40,
        //     height: 40,
        //     color: '#9fe667',
        //   },
        // },
        // {
        //   id: 'valve_005',
        //   type: 'polygon',
        //   elementDrawInfo: {
        //     // TODO: 마름모 설정 값 svg.js 기준으로 변경
        //     width: 40,
        //     height: 40,
        //     color: '#9fe667',
        //   },
        // },
        // {
        //   id: 'valve_006',
        //   type: 'polygon',
        //   elementDrawInfo: {
        //     // TODO: 마름모 설정 값 svg.js 기준으로 변경
        //     width: 40,
        //     height: 40,
        //     color: '#9fe667',
        //   },
        // },
        // {
        //   id: 'valve_007',
        //   type: 'polygon',
        //   elementDrawInfo: {
        //     // TODO: 마름모 설정 값 svg.js 기준으로 변경
        //     width: 40,
        //     height: 40,
        //     color: '#9fe667',
        //   },
        // },
        // {
        //   id: 'reservoir_001',
        //   type: 'rect',
        //   elementDrawInfo: {
        //     width: 100,
        //     height: 150,
        //   },
        // },
      ],
    },
    positionInfo: {
      // TODO: positionInfo 정의
      svgPlaceList: [
        {
          id: 'salternModuleBlock_001',
          code: 'SMB_1_A',
          placeList: {
            placePosition: [160, 850],
          },
        },
        {
          id: 'salternModuleBlock_002',
          code: 'SMB_1_B',
          placeList: {
            placePosition: [160, 680],
          },
        },
        {
          id: 'salternModuleBlock_003',
          code: 'SMB_1_C',
          placeList: {
            placePosition: [160, 510],
          },
        },
        {
          id: 'salternModuleBlock_004',
          code: 'SMB_1_D',
          placeList: {
            placePosition: [160, 340],
          },
        },
        {
          id: 'salternNomalBlock_001',
          code: 'SNB_001',
          placeList: {
            placePosition: [160, 170],
          },
        },
        {
          id: 'salternNomalBlock_002',
          code: 'SNB_002',
          placeList: {
            placePosition: [430, 300],
          },
        },
        {
          id: 'salternNomalBlock_003',
          code: 'SNB_003',
          placeList: {
            placePosition: [430, 475],
          },
        },
        {
          id: 'salternNomalBlock_004',
          code: 'SNB_004',
          placeList: {
            placePosition: [430, 655],
          },
        },
        {
          id: 'salternCrystalBlock_001',
          code: 'SCB_001',
          placeList: {
            placePosition: [430, 830],
          },
        },
        {
          id: 'brineWarehouse_001',
          code: 'BW_001',
          placeList: {
            placePosition: [400, 100],
          },
        },
        {
          id: 'brineWarehouse_002',
          code: 'BW_002',
          placeList: {
            placePosition: [580, 100],
          },
        },
        {
          id: 'brineWarehouse_003',
          code: 'BW_003',
          placeList: {
            placePosition: [760, 100],
          },
        },
        {
          id: 'waterDoor_001',
          code: 'WD_001',
          placeList: {
            placePosition: [320, 930],
          },
        },
      ],
      svgNodeList: [
        {
          id: 'waterDoor_001',
          type: 'rect',
          code: 'WD_001',
          elementDrawInfo: {
            width: 50,
            height: 50,
            color: '#5CD1E5',
          },
        },
      ],
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
    ],
  },
  relationInfo: {
    placeRelationList: [
      // FIXME: 각 요소에 대한 'placeList' 작성.
      {
        target_id: 'salternModuleBlock',
        target_name: '모듈 증발지',
        defList: [
          {
            target_id: 'salternModuleBlock',
            target_name: '모듈 증발지',
            target_prefix: 'SMB',
            placeList: [
              {
                target_code: '1_A',
                nodeList: ['WD_001'], // FIXME: nodeList 수정.
              },
              {
                target_code: '1_B',
                nodeList: [], // FIXME: nodeList 수정.
              },
              {
                target_code: '1_C',
                nodeList: [], // FIXME: nodeList 수정.
              },
              {
                target_code: '1_D',
                nodeList: [], // FIXME: nodeList 수정.
              },
            ],
          },
        ],
      },
      {
        target_id: 'salternNomalBlock',
        target_name: '일반 증발지',
        defList: [
          {
            target_id: 'salternNormalBlock',
            target_prefix: 'SNB',
            target_name: '일반 증발지',
            placeList: [
              {
                target_code: '001',
                nodeList: [],
              },
              {
                // FIXME: 배출구 재확인
                target_code: '002',
                nodeList: [],
              },
              {
                target_code: '003',
                nodeList: [],
              },
              {
                target_code: '004',
                nodeList: [],
              },
            ],
          },
          {
            target_id: 'salternCrystalBlock',
            target_prefix: 'SCB',
            target_name: '결정지',
            placeList: [
              {
                // FIXME: 배출구 재확인
                target_code: '001',
                nodeList: [],
              },
            ],
          },
        ],
      },
      {
        target_id: 'salternCrystalBlock',
        target_name: '결정지',
        defList: [
          {
            target_id: 'salternCrystalBlock',
            target_prefix: 'SCB',
            target_name: '결정지',
            placeList: [
              {
                // FIXME: 배출구 재확인
                target_code: '001',
                nodeList: [],
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
            target_name: '해주',
            target_prefix: 'BW',
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
                nodeList: [],
              },
            ],
          },
        ],
      },
      {
        target_id: 'waterDoor',
        target_name: '수문',
        defList: [
          {
            target_id: 'waterDoor',
            target_prefix: 'WD',
            target_name: '수문',
            placeList: [
              {
                target_code: '001',
                nodeList: [],
              },
            ],
          },
        ],
      },
      // {
      //   target_id: 'reservoir',
      //   target_name: '저수조',
      //   defList: [
      //     {
      //       target_id: 'reservoir',
      //       target_name: '저수조',
      //       target_prefix: 'RV',
      //       placeList: [
      //         {
      //           target_code: '',
      //           nodeList: [],
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   target_id: 'sea',
      //   target_name: '바다',
      //   defList: [
      //     {
      //       target_id: 'sea',
      //       target_name: '바다',
      //       target_prefix: 'SEA',
      //       placeList: [
      //         {
      //           target_code: '',
      //           nodeList: [],
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   target_id: 'sulternLine',
      //   target_name: '수로',
      //   defList: [
      //     {
      //       target_id: 'sulternLine',
      //       target_name: '수로',
      //       target_prefix: 'SL',
      //       placeList: [
      //         {
      //           target_code: '',
      //           nodeList: [],
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   target_id: 'valve',
      //   target_name: '벨브',
      //   defList: [
      //     {
      //       target_id: 'valve',
      //       target_name: '벨브',
      //       target_prefix: 'V',
      //       placeList: [
      //         {
      //           target_code: '001',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   target_id: 'outlet',
      //   target_name: '배출구',
      //   defList: [
      //     {
      //       target_id: 'outlet',
      //       target_name: '배출구',
      //       target_prefix: 'O',
      //       placeList: [
      //         {
      //           target_code: '001',
      //           nodeList: [],
      //         },
      //         {
      //           target_code: '002',
      //           nodeList: [],
      //         },
      //         {
      //           target_code: '003',
      //           nodeList: [],
      //         },
      //         {
      //           target_code: '004',
      //           nodeList: [],
      //         },
      //         {
      //           target_code: '005',
      //           nodeList: [],
      //         },
      //         {
      //           target_code: '006',
      //           nodeList: [],
      //         },
      //         {
      //           target_code: '007',
      //           nodeList: [],
      //         },
      //         {
      //           target_code: '008',
      //           nodeList: [],
      //         },
      //         {
      //           target_code: '009',
      //           nodeList: [],
      //         },
      //       ],
      //     },
      //   ],
      // },
      // TODO: text, pipe, pump, sulternLine 작성할 것
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

// module.exports = map;
