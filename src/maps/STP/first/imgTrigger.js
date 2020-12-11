const path = require('path');
const fs = require('fs');
const { BU } = require('base-util-jh');

const imgPathList = [
  'allWave.gif',
  'brineWarehouseAWave.gif',
  'brineWareHouseBWave.gif',
  'brineWHAWaterfull.gif',
  'moduleWaterfull.gif',
  'moduleWave.gif',
  'normalEvaporationAWave.gif',
  'normalEvaporationBWave.gif',
  'rainModeWaterfull.gif',
  'resorviorWave.gif',
  'waterfallRight.gif',
];

function getImgPath(idx) {
  return `/img/${imgPathList[idx]}`;
}

const RANGE = {
  LOWER: 'LOWER',
  EQUAL: 'EQUAL',
  UPPER: 'UPPER',
};

/** @type {mImgTriggerInfo[]} */
const imgTriggerList = [
  {
    imgPath: getImgPath(0),
    position: [],
    size: [10, 10],
    opacity: 0.8,
    triggerList: [
      {
        nodeId: '',
        goalValue: 500,
        goalRange: RANGE.UPPER,
      },
    ],
  },
];

module.exports = imgTriggerList;

/**
 * @typedef {Object} mImgTriggerInfo 이미지 View Trigger
 * @property {string} imgPath 보여줄 이미지 Path
 * @property {mTriggerInfo[]} triggerList
 */

/**
 * @typedef {Object} mTriggerInfo 트리거 작동 제약 조건
 * @property {string} nodeId 달성하고자 하는 nodeId
 * @property {string|number} goalValue 달성 기준치 값
 * @property {number} goalRange 기준치 인정 범위.
 * @property {boolean} isCompleteClear 기본 값 false, 이 옵션이 있다면 이 요건만 충족하면 완료 된 것으로 판단. 아니라면 전체 Goal 달성 해야함
 */
