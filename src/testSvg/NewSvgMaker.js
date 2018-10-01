const {BU} = require('base-util-jh');
const SVG = require('svg.js');
const _ = require('lodash');
const map = require('./testMap');

class NewSvgMaker {
  startMake() {
    this.makeObjValueInfo();
  }

  /**
   * @param {string} id replace 하려는 id 값
   * @param {string} pattern 정규식
   */
  getReplace(id, pattern) {
    const result = id.replace(pattern, '');

    return result;
  }

  // TODO: Step0 --> drawInfo.frame.svgModelResourceList 와 Node Def 관계 정의

  /**
   * @param {string} targetId resource 정보를 찾으려고 하는 타켓의 아이디
   */
  getResourceInfo(targetId) {
    const foundImgContactInfo = _.find(map.realtionInfo.imgContactList, {
      targetIdList: [targetId],
    });
    if (foundImgContactInfo != null) {
      const resourceId = foundImgContactInfo.resourceIdList[0];

      return resourceId;
    }
  }

  // TODO: Step1 --> relation.placeRelationList를 순회하고 node 카테고리 별 식별정보 생성
  /**
   * svgNodeList를 만들기위한 node 정보 저장
   */
  makeObjValueInfo() {
    /** @type {storageInfo[]} */
    const storageList = [];
    map.realtionInfo.placeRelationList.forEach(placeRelationInfo => {
      placeRelationInfo.defList.forEach(defInfo => {
        defInfo.placeList.forEach(placeInfo => {
          let placeId = defInfo.target_prefix;
          // placeId 중 code 유무 체크
          if (placeInfo.target_code) {
            placeId += `_${placeInfo.target_code}`;
          }

          _.forEach(placeInfo.nodeList, nodeId => {
            const {axisScale, moveScale} = this.getAxisMoveScale(nodeId);
            const resourceId = this.getResourceInfo(nodeId);
            // BU.CLI(resourceId);
            /** @type {detailNodeInfo} */
            const detailNode = {
              nodeId,
              placeId,
              resourceId,
              point: [],
              axisScale,
              moveScale,
            };

            let foundIt = _.find(storageList, {nodeClassId: resourceId});
            // 그룹 존재 체크
            if (_.isEmpty(foundIt)) {
              foundIt = {
                nodeClassId: resourceId,
                list: [],
              };
              storageList.push(foundIt);
            }

            const foundNodeIt = _.find(foundIt.list, {nodeId});
            if (_.isEmpty(foundNodeIt)) {
              foundIt.list.push(detailNode);
            }

            BU.CLIS(storageList);
          });
        });
      });
    });

    this.storageList = storageList;
  }

  /**
   * axisScale 과 moveScale 찾아가기
   * @param {string} targetId
   * @return {{axisScale: [], moveScale: []}}
   */
  getAxisMoveScale(targetId) {
    const targetPrefix = this.getReplace(targetId, /[_\d]/g);
    const targetCode = this.getReplace(targetId, /\D/g);

    let returnValue = {
      axisScale: [],
      moveScale: [],
    };

    map.setInfo.nodeStructureList.forEach(nodeStructureInfo => {
      const targetDefInfo = _.find(nodeStructureInfo.defList, {target_prefix: targetPrefix});
      if (targetDefInfo != null) {
        const targetNodeInfo = _.find(targetDefInfo.nodeList, {target_code: targetCode});
        returnValue = _.pick(targetNodeInfo, ['axisScale', 'moveScale']);
      }
    });

    return returnValue;
  }

  // TODO: Step2 --> Step1과 Step0를 가지고 drawInfo.positionInfo.svgPlaceList 장소 객체를 찾아가서 부모를 가져오고
  //                 Step1의 axis와 moveScale을 이용하여 해당 svgNodeList를 생성한다.

  calcPlacePoint(placeObjInfo, locatedObjPoint) {}

  /**
   * @param {string} baseId
   */
  discoverObjectPoint(baseId) {
    let targetPoint = []; // [x1,y1,x2,y2]
    map.drawInfo.positionList.svgPlaceList.forEach(svgPlaceInfo => {
      const targetInfo = _.find(svgPlaceInfo.defList, {id: baseId});
      const targetResourceId = targetInfo.resourceId;

      const svgModelResourceInfo = _.find(map.drawInfo.frame.svgModelResourceList, {
        id: targetResourceId,
      });

      const targetType = svgModelResourceInfo.type;
      const targetDrawInfo = svgModelResourceInfo.elementDrawInfo;
      if (targetType === 'rect') {
        targetPoint = [
          targetInfo.position[0],
          targetInfo.position[1],
          targetInfo.position[0] + targetDrawInfo.width,
          targetInfo.position[1] + targetDrawInfo.height,
        ];
      } else {
        // TODO: 다른 조건문 작성
      }
    });
    return targetPoint;
  }

  // TODO: Step3 --> outputMap.js 파일을 생성 한다
  // TODO: Step4 --> outputMap 을 읽어들여 index.html을 구성한다
}
module.exports = NewSvgMaker;

/**
 * @typedef {Object} storageInfo
 * @property {string} nodeClassId
 * @property {detailNodeInfo[]} list
 */

/**
 * @typedef {Object} detailNodeInfo
 * @property {string} placeId
 * @property {string} nodeId
 * @property {string} resourceId
 * @property {number[]} axisScale
 * @property {number[]} moveScale
 * @property {number[]} point 최종 적으로 나올 좌표 정보
 */

// this.storageList.forEach(storageInfo => {
//   storageInfo.list.forEach(detailNodeInfo => {
//     // 1번째  placeRes 가졍기
//     const resourceInfo = _.find([], {img: detailNodeInfo.placeId});
//     // 2번째  node Res 가져오기
//     const resourcㄴㄴeInfo = _.find([], {img: detailNodeInfo.resourceId});

//     detailNodeInfo.point = [30, 20, 10, 50];
//   });
// });

// let axisMoveScaleInfo = [];
