const _ = require('lodash');
const {BU} = require('base-util-jh');
const svg = require('svg.js');
const map = require('./testMap');

const drawingPlace = () => {
  const svgModelResourceList = map.drawInfo.frame.svgModelResourceList;
  const placeImgData = placeInfo.
};
/**
 * 대상이 그려질 좌표 정보를 가져옴
 * @param {Object} placeObjInfo {id, img, target, axis=[x1, y1]}
 * @param {Array} locatedObjPoint [x1, y1, x2, y2]
 * @return {Array} [x1, y1]
 */

const calcPlacePoint = () => {
  const placeImgInfo = _.find(map.drawInfo.frame.svgModelResourceList, {ID: placeObjInfo.id});
  const placeImgData = placeImgInfo.elementDrawInfo;
  const placeImgType = placeImgInfo.Type;

  const targetAxis = [];

  const x = locatedObjPoint[0] + placeObjInfo.axis[0] * (locatedObjPoint[2] - locatedObjPoint[0]);
  const y = locatedObjPoint[1] + placeObjInfo.axis[1] * (locatedObjPoint[3] - locatedObjPoint[1]);
  if (placeImgType == 'rect') {
  }
};
