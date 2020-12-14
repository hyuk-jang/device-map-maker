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
    id: 'rain1',
    imgPath: getImgPath(0),
    position: [],
    size: [10, 10],
    opacity: 0.8,
    triggerList: [
      {
        nodeId: 'INF_SKY',
        goalValue: 500,
        goalRange: RANGE.UPPER,
      },
      {
        nodeId: 'INF_SKY2',
        goalValue: 600,
        goalRange: RANGE.UPPER,
      },
    ],
  },
  {
    imgPath: getImgPath(1),
    position: [],
    size: [10, 10],
    opacity: 0.8,
    triggerList: [
      {
        nodeId: 'FRCU_SG',
        goalValue: 600,
        goalRange: RANGE.LOWER,
      },
    ],
  },
];

module.exports = imgTriggerList;
