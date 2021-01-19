const {
  di: {
    dcmConfigModel: { goalDataRange: gDR, reqDeviceControlType: reqDCT },
  },
} = require('../../../module');

// 오일 펌프 구동 여부, 오일 순환에 필요한 필수적인 구동 장치
const itPumpOperation = [
  {
    nodeId: 'PUM_OIL_1',
    goalValue: reqDCT.TRUE,
    goalRange: gDR.EQUAL,
    groupId: 'PUM_OIL',
    isCompleteClear: 1,
  },
  {
    nodeId: 'PUM_OIL_2',
    goalValue: reqDCT.TRUE,
    goalRange: gDR.EQUAL,
    groupId: 'PUM_OIL',
    isCompleteClear: 1,
  },
];

/** @type {mImgTriggerInfo[]} */
module.exports = [
  /* *************       배관        ***************** */
  // 오일 펌프 작동
  {
    fileName: 'oil_flow_op_pass',
    folderPath: 'oil_line',
    opacity: 0.6,
    triggerGoalInfo: {
      goalDataList: [...itPumpOperation],
    },
  },
  // PTC
  {
    fileName: 'oil_flow_ptc_over',
    folderPath: 'oil_line',
    opacity: 0.6,
    triggerGoalInfo: {
      goalDataList: [
        ...itPumpOperation,
        {
          nodeId: 'FDVA_PTC',
          goalValue: 50,
          goalRange: gDR.LOWER,
        },
      ],
    },
  },
  {
    fileName: 'oil_flow_ptc_pass',
    folderPath: 'oil_line',
    opacity: 0.6,
    triggerGoalInfo: {
      goalDataList: [
        ...itPumpOperation,
        {
          nodeId: 'FDVA_PTC',
          goalValue: 50,
          goalRange: gDR.UPPER,
          isInclusionGoal: 1,
        },
      ],
    },
  },
  // 오일 탱크 1
  {
    fileName: 'oil_flow_ot1_over',
    folderPath: 'oil_line',
    opacity: 0.6,
    triggerGoalInfo: {
      goalDataList: [
        ...itPumpOperation,
        {
          nodeId: 'FDVA_OT_1',
          goalValue: 50,
          goalRange: gDR.LOWER,
        },
      ],
    },
  },
  {
    fileName: 'oil_flow_ot1_pass',
    folderPath: 'oil_line',
    opacity: 0.6,
    triggerGoalInfo: {
      goalDataList: [
        ...itPumpOperation,
        {
          nodeId: 'FDVA_OT_1',
          goalValue: 50,
          goalRange: gDR.UPPER,
          isInclusionGoal: 1,
        },
      ],
    },
  },
  // 오일 탱크 2
  {
    fileName: 'oil_flow_ot2_over',
    folderPath: 'oil_line',
    opacity: 0.6,
    triggerGoalInfo: {
      goalDataList: [
        ...itPumpOperation,
        {
          nodeId: 'FDVA_OT_2',
          goalValue: 50,
          goalRange: gDR.LOWER,
        },
      ],
    },
  },
  {
    fileName: 'oil_flow_ot2_pass',
    folderPath: 'oil_line',
    opacity: 0.6,
    triggerGoalInfo: {
      goalDataList: [
        ...itPumpOperation,
        {
          nodeId: 'FDVA_OT_2',
          goalValue: 50,
          goalRange: gDR.UPPER,
          isInclusionGoal: 1,
        },
      ],
    },
  },
  // 증기 발생기
  {
    fileName: 'oil_flow_sg_over',
    folderPath: 'oil_line',
    opacity: 0.6,
    triggerGoalInfo: {
      goalDataList: [
        ...itPumpOperation,
        {
          nodeId: 'FDVA_SG',
          goalValue: 50,
          goalRange: gDR.LOWER,
        },
      ],
    },
  },
  {
    fileName: 'oil_flow_sg_pass',
    folderPath: 'oil_line',
    opacity: 0.6,
    triggerGoalInfo: {
      goalDataList: [
        ...itPumpOperation,
        {
          nodeId: 'FDVA_SG',
          goalValue: 50,
          goalRange: gDR.UPPER,
          isInclusionGoal: 1,
        },
      ],
    },
  },
  // 증기 발생기 출구
  {
    fileName: 'steam_flow_sg_pass',
    folderPath: 'steam_line',
    opacity: 0.6,
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'FRIN_PIP',
          goalValue: 100,
          goalRange: gDR.UPPER,
          isInclusionGoal: 1,
        },
      ],
    },
  },
  {
    fileName: 'steam_flow_factory_pass',
    folderPath: 'steam_line',
    opacity: 0.6,
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'FRIN_PIP',
          goalValue: 100,
          goalRange: gDR.UPPER,
          isInclusionGoal: 1,
        },
      ],
    },
  },
  /* *************       장치 아이콘        ***************** */
  // 오일 탱크 1
  {
    fileName: 'ot1_level1',
    folderPath: ['icon', 'ot'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'TEM_OIL_3',
          goalValue: undefined,
          goalRange: gDR.EQUAL,
          isCompleteClear: 1,
        },
        {
          nodeId: 'TEM_OIL_3',
          goalValue: 100,
          goalRange: gDR.LOWER,
          isCompleteClear: 1,
        },
      ],
    },
  },
  {
    fileName: 'ot1_level2',
    folderPath: ['icon', 'ot'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'TEM_OIL_3',
          goalValue: 100,
          goalRange: gDR.UPPER,
          isInclusionGoal: 1,
        },
        {
          nodeId: 'TEM_OIL_3',
          goalValue: 180,
          goalRange: gDR.LOWER,
        },
      ],
    },
  },
  {
    fileName: 'ot1_level3',
    folderPath: ['icon', 'ot'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'TEM_OIL_3',
          goalValue: 180,
          goalRange: gDR.UPPER,
          isInclusionGoal: 1,
        },
      ],
    },
  },
  // 오일 탱크 2
  {
    fileName: 'ot2_level1',
    folderPath: ['icon', 'ot'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'TEM_OIL_4',
          goalValue: undefined,
          goalRange: gDR.EQUAL,
          isCompleteClear: 1,
        },
        {
          nodeId: 'TEM_OIL_4',
          goalValue: 100,
          goalRange: gDR.LOWER,
          isCompleteClear: 1,
        },
      ],
    },
  },
  {
    fileName: 'ot2_level2',
    folderPath: ['icon', 'ot'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'TEM_OIL_4',
          goalValue: 100,
          goalRange: gDR.UPPER,
          isInclusionGoal: 1,
        },
        {
          nodeId: 'TEM_OIL_4',
          goalValue: 180,
          goalRange: gDR.LOWER,
        },
      ],
    },
  },
  {
    fileName: 'ot2_level3',
    folderPath: ['icon', 'ot'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'TEM_OIL_4',
          goalValue: 180,
          goalRange: gDR.UPPER,
          isInclusionGoal: 1,
        },
      ],
    },
  },
  // 스팀 발생기
  {
    fileName: 'sg_level1',
    folderPath: ['icon', 'sg'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'TEM_OIL_6',
          goalValue: undefined,
          goalRange: gDR.EQUAL,
          isCompleteClear: 1,
        },
        {
          nodeId: 'TEM_OIL_6',
          goalValue: 100,
          goalRange: gDR.LOWER,
          isCompleteClear: 1,
        },
      ],
    },
  },
  {
    fileName: 'sg_level2',
    folderPath: ['icon', 'sg'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'TEM_OIL_6',
          goalValue: 100,
          goalRange: gDR.UPPER,
          isInclusionGoal: 1,
        },
        {
          nodeId: 'TEM_OIL_6',
          goalValue: 180,
          goalRange: gDR.LOWER,
        },
      ],
    },
  },
  {
    fileName: 'sg_level3',
    folderPath: ['icon', 'sg'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'TEM_OIL_6',
          goalValue: 180,
          goalRange: gDR.UPPER,
          isInclusionGoal: 1,
        },
      ],
    },
  },
  // PTC 밸브
  {
    fileName: 'vv_ptc_over',
    folderPath: ['icon', 'vv'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'FDVA_PTC',
          goalValue: undefined,
          goalRange: gDR.EQUAL,
          isCompleteClear: 1,
        },
        {
          nodeId: 'FDVA_PTC',
          goalValue: 50,
          goalRange: gDR.LOWER,
          isCompleteClear: 1,
        },
      ],
    },
  },
  {
    fileName: 'vv_ptc_pass',
    folderPath: ['icon', 'vv'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'FDVA_PTC',
          goalValue: 50,
          goalRange: gDR.UPPER,
          isInclusionGoal: 1,
        },
      ],
    },
  },
  // 오일탱크 1 밸브
  {
    fileName: 'vv_ot1_over',
    folderPath: ['icon', 'vv'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'FDVA_OT_1',
          goalValue: undefined,
          goalRange: gDR.EQUAL,
          isCompleteClear: 1,
        },
        {
          nodeId: 'FDVA_OT_1',
          goalValue: 50,
          goalRange: gDR.LOWER,
          isCompleteClear: 1,
        },
      ],
    },
  },
  {
    fileName: 'vv_ot1_pass',
    folderPath: ['icon', 'vv'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'FDVA_OT_1',
          goalValue: 50,
          goalRange: gDR.UPPER,
          isInclusionGoal: 1,
        },
      ],
    },
  },
  // 오일탱크 2 밸브
  {
    fileName: 'vv_ot2_over',
    folderPath: ['icon', 'vv'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'FDVA_OT_2',
          goalValue: undefined,
          goalRange: gDR.EQUAL,
          isCompleteClear: 1,
        },
        {
          nodeId: 'FDVA_OT_2',
          goalValue: 50,
          goalRange: gDR.LOWER,
          isCompleteClear: 1,
        },
      ],
    },
  },
  {
    fileName: 'vv_ot2_pass',
    folderPath: ['icon', 'vv'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'FDVA_OT_2',
          goalValue: 50,
          goalRange: gDR.UPPER,
          isInclusionGoal: 1,
        },
      ],
    },
  },
  // 증기발생기 밸브
  {
    fileName: 'vv_sg_over',
    folderPath: ['icon', 'vv'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'FDVA_SG',
          goalValue: undefined,
          goalRange: gDR.EQUAL,
          isCompleteClear: 1,
        },
        {
          nodeId: 'FDVA_SG',
          goalValue: 50,
          goalRange: gDR.LOWER,
          isCompleteClear: 1,
        },
      ],
    },
  },
  {
    fileName: 'vv_sg_pass',
    folderPath: ['icon', 'vv'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'FDVA_SG',
          goalValue: 50,
          goalRange: gDR.UPPER,
          isInclusionGoal: 1,
        },
      ],
    },
  },
  // 오일 펌프
  {
    fileName: 'op_off',
    folderPath: ['icon', 'op'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'PUM_OIL_1',
          goalValue: undefined,
          goalRange: gDR.EQUAL,
          groupId: 'PUM_OIL_1',
          isCompleteClear: 1,
        },
        {
          nodeId: 'PUM_OIL_1',
          goalValue: reqDCT.FALSE,
          goalRange: gDR.EQUAL,
          groupId: 'PUM_OIL_1',
          isCompleteClear: 1,
        },
        {
          nodeId: 'PUM_OIL_2',
          goalValue: undefined,
          goalRange: gDR.EQUAL,
          groupId: 'PUM_OIL_2',
          isCompleteClear: 1,
        },
        {
          nodeId: 'PUM_OIL_2',
          goalValue: reqDCT.FALSE,
          goalRange: gDR.EQUAL,
          groupId: 'PUM_OIL_2',
          isCompleteClear: 1,
        },
      ],
    },
  },
  {
    fileName: 'op_on',
    folderPath: ['icon', 'op'],
    triggerGoalInfo: {
      goalDataList: [...itPumpOperation],
    },
  },
  // 보충 펌프
  {
    fileName: 'sw_off',
    folderPath: ['icon', 'sw'],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'PUM_SW',
          goalValue: undefined,
          goalRange: gDR.EQUAL,
          isCompleteClear: 1,
        },
        {
          nodeId: 'PUM_SW',
          goalValue: reqDCT.FALSE,
          goalRange: gDR.EQUAL,
          isCompleteClear: 1,
        },
      ],
    },
  },
  {
    filePathConfigList: [
      // 보충 펌프 라인
      {
        fileName: ['water_flow_sw_pass'],
        folderPath: 'water_line',
        opacity: 0.6,
      },
      // 보충 펌프
      {
        fileName: 'sw_on',
        folderPath: ['icon', 'sw'],
      },
    ],
    triggerGoalInfo: {
      goalDataList: [
        {
          nodeId: 'PUM_SW',
          goalValue: reqDCT.TRUE,
          goalRange: gDR.EQUAL,
        },
      ],
    },
  },
];
