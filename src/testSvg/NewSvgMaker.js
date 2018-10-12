const {BU} = require('base-util-jh');
const _ = require('lodash');
const map = require('./testMap');

require('../../../default-intelligence');

class NewSvgMaker {
  constructor() {
    this.makeObjInfo();
    this.makeSvgNodeList();
  }

  startMake() {
    // BU.CLI(map);
    BU.writeFile(
      './src/testSvg/outputMap.js',
      `var map = ${JSON.stringify(map)}`,
      'w',
      (err, res) => {
        if (err) {
          return BU.CLI('Map 자동 생성에 실패하였습니다.');
        }
        BU.CLI('맵 자동생성을 하였습니다.', 'outputMap.js');
      },
    );
  }

  /**
   * 아이디 값을 가져와 접두사 또는 넘버 분리 ex) SEB_001 → 'SEB' or '001'
   * @param {string} id ex) 'SEB_001', 'MRT_002' ...
   * @param {string} pattern 정규식
   */
  getReplace(id, pattern) {
    const result = id.replace(pattern, '');

    return result;
  }

  /**
   * svgModelResourceList 에서 원하는 정보 값 가져오기
   * @param {string} targetId  ex) 'SEB_001', 'MRT_002' ...
   */
  getResourceInfo(targetId) {
    /** @type {mSvgResourceConnectionInfo} */
    const foundSVGResourceConnectionInfo = _.find(map.realtionInfo.svgResourceConnectionList, {
      targetIdList: [targetId],
    });

    if (foundSVGResourceConnectionInfo != null) {
      const resourceId = foundSVGResourceConnectionInfo.resourceIdList[0];
      /** @type {mSvgModelResource} */
      const resourceInfo = _.find(map.drawInfo.frame.svgModelResourceList, {
        id: resourceId,
      });

      return resourceInfo;
    }
  }

  /**
   * svgNodeList를 만들기위한 node 정보 수집
   */
  makeObjInfo() {
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
            const resourceInfo = this.getResourceInfo(nodeId);
            const resourceId = _.result(resourceInfo, 'id');

            /** @type {detailNodeInfo} */
            const detailNode = {
              nodeId,
              placeId,
              resourceId,
              point: [],
              axisScale,
              moveScale,
            };

            // 그룹 존재
            /** @type {storageInfo[]} */
            let foundIt = _.find(storageList, {nodeClassId: resourceId});
            if (_.isEmpty(foundIt)) {
              foundIt = {
                nodeClassId: resourceId,
                defList: [],
              };
              storageList.push(foundIt);
            }

            /** @type {defInfo} */
            const foundNodeIt = _.find(foundIt.defList, {nodeId});
            if (_.isEmpty(foundNodeIt)) {
              foundIt.defList.push(detailNode);
            }
            // BU.CLIS(storageList);
          });
        });
      });
    });

    this.storageList = storageList;
  }

  /**
   * axisScale, moveScale 값 가져오기
   * @param {string} targetId ex) 'SEB_001', 'MRT_002' ...
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
      /** @type {mNodeDefInfo} */
      const targetDefInfo = _.find(nodeStructureInfo.defList, {
        target_prefix: targetPrefix,
      });
      if (targetDefInfo != null) {
        /** @type {mNodeModelInfo} */
        const targetNodeInfo = _.find(targetDefInfo.nodeList, {target_code: targetCode});
        returnValue = _.pick(targetNodeInfo, ['axisScale', 'moveScale']);
      }
    });

    return returnValue;
  }

  /**
   * 최종으로 저장될 svgNodeList 생성
   */
  makeSvgNodeList() {
    const objectList = this.storageList;

    /** @type {mSvgNodeInfo[]} */
    objectList.forEach(objList => {
      _.forEach(objList.defList, (obj, index) => {
        const targetPoint = this.discoverObjectPoint(obj.placeId);
        const finalAxis = this.calcPlacePoint(obj, targetPoint);
        const finalObj = _.set(obj, 'point', finalAxis);

        /** @type {defInfo} */
        const newDetailNode = {
          id: finalObj.nodeId,
          placeId: finalObj.placeId,
          resourceId: finalObj.resourceId,
          point: finalObj.point,
        };
        // 그룹 존재

        /** @type {mSvgNodeInfo} */
        let foundIt = _.find(map.drawInfo.positionList.svgNodeList, {
          nodeClassId: objList.nodeClassId,
        });
        if (_.isEmpty(foundIt)) {
          foundIt = {
            nodeClassId: objList.nodeClassId,
            defList: [],
          };
          map.drawInfo.positionList.svgNodeList.push(foundIt);
        }

        /** @type {defInfo} */
        const foundNodeIt = _.find(foundIt.defList, {nodeId: finalObj.nodeId});
        if (_.isEmpty(foundNodeIt)) {
          foundIt.defList.push(newDetailNode);
        }
      });
    });
  }

  /**
   * 장소에 따른 노드의 위치 지정
   * @param {detailNodeInfo} storageDefInfo storageList에 저장된 defList 정보
   * @param {number[]} placePoint 장소의 (x1,y1,x2,y2) 정보
   */
  calcPlacePoint(storageDefInfo, placePoint) {
    // BU.CLIS(storageDefInfo, placePoint);
    const nodeResourceInfo = this.getResourceInfo(storageDefInfo.nodeId);
    if (_.isUndefined(nodeResourceInfo)) return false; // FIXME: 센서류 때문에 작성.
    const nodeElementDraw = nodeResourceInfo.elementDrawInfo;
    const nodeType = nodeResourceInfo.type;

    const [axisX, axisY] = storageDefInfo.axisScale;
    const [moveX, moveY] = storageDefInfo.moveScale;
    const [x1, y1, x2, y2] = placePoint;

    // FIXME: ↓ 후에 더 좋은 방법으로 수정, 센서도 axis,move 필요 그에 맞게 수정
    let targetAxis = [];
    let x;
    let y;
    if (
      nodeResourceInfo.id === 'moduleRearTemperature' ||
      nodeResourceInfo.id === 'brineTemperature' ||
      nodeResourceInfo.id === 'WLSensor' ||
      nodeResourceInfo.id === 'salinity'
    ) {
      if (nodeResourceInfo.id === 'moduleRearTemperature') {
        x = x1 + (x2 - x1) / 2 - nodeElementDraw.width;
        y = y1 + (y2 - y1) / 2 + nodeElementDraw.height / 2;
      } else if (nodeResourceInfo.id === 'brineTemperature') {
        x = x1 + (x2 - x1) / 2 + 10;
        y = y1 + (y2 - y1) / 2 + nodeElementDraw.height / 2;
      } else if (nodeResourceInfo.id === 'salinity') {
        x = x1 + (x2 - x1) / 2;
        y = y1 + (y2 - y1) / 2 - nodeElementDraw.height - 10;
      } else {
        x = x1 + (x2 - x1) / 2 - nodeElementDraw.width;
        y = y1 + (y2 - y1) / 2 - nodeElementDraw.height - 10;
      }
      targetAxis = [x, y];
    } else {
      x = x1 + axisX * (x2 - x1);
      y = y1 + axisY * (y2 - y1);
      if (nodeType === 'rect') {
        x = x - axisX * nodeElementDraw.width + moveX * nodeElementDraw.width;
        y = y - axisY * nodeElementDraw.height + moveY * nodeElementDraw.height;
      } else if (nodeType === 'circle') {
        x = x - axisX * nodeElementDraw.width + moveX * nodeElementDraw.width;
        y = y - axisY * nodeElementDraw.height + moveY * nodeElementDraw.height;
      } else if (nodeType === 'polygon') {
        x = x - axisX * (nodeElementDraw.width * 2) + moveX * (nodeElementDraw.width * 2);
        y = y - axisY * (nodeElementDraw.height * 2) + moveY * (nodeElementDraw.height * 2);
      }
      targetAxis = [x, y];
    }
    return targetAxis;
  }

  /**
   * 장소의 정보를 이용해 (x1,y1) 과 (x2,y2)를 구한다
   * @param {string} placeId ex) 'SEB_001'
   */
  discoverObjectPoint(placeId) {
    let targetPoint = []; // [x1,y1,x2,y2]

    map.drawInfo.positionList.svgPlaceList.forEach(svgPlaceInfo => {
      /** @type {defInfo} */
      const targetInfo = _.find(svgPlaceInfo.defList, {id: placeId});
      if (_.isUndefined(targetInfo)) return false;
      const targetResourceId = targetInfo.resourceId;
      /** @type {mSvgModelResource} */
      const svgModelResourceInfo = _.find(map.drawInfo.frame.svgModelResourceList, {
        id: targetResourceId,
      });
      const targetType = svgModelResourceInfo.type;
      const targetDrawInfo = svgModelResourceInfo.elementDrawInfo;
      // const [x,y] = targetInfo; // TODO:
      if (targetType === 'rect') {
        targetPoint = [
          targetInfo.point[0],
          targetInfo.point[1],
          targetInfo.point[0] + targetDrawInfo.width,
          targetInfo.point[1] + targetDrawInfo.height,
        ];
        // line position:(x1,y1,x2,y2)
      } else if (targetType === 'line') {
        if (targetInfo.point[1] === targetInfo.point[3]) {
          targetPoint = [
            targetInfo.point[0],
            targetInfo.point[1] - targetDrawInfo.width / 2,
            targetInfo.point[2],
            targetInfo.point[3] - targetDrawInfo.width / 2,
          ];
        } else {
          targetPoint = [
            targetInfo.point[0] - targetDrawInfo.width / 2,
            targetInfo.point[1] - targetDrawInfo.width,
            targetInfo.point[2] - targetDrawInfo.width / 2,
            targetInfo.point[3] + targetDrawInfo.width,
          ];
        }
      } else {
        // TODO: 다른 조건문 작성
      }
    });
    return targetPoint;
  }
}
module.exports = NewSvgMaker;

/**
 * @typedef {Object} storageInfo
 * @property {string} nodeClassId
 * @property {detailNodeInfo[]} defList
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
