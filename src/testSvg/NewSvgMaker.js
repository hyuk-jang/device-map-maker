const { BU } = require('base-util-jh');
const _ = require('lodash');
const map = require('./testMap');

// require('../../../default-intelligence');

class NewSvgMaker {
  constructor() {
    this.makeObjInfo();
    this.makeSvgNodeList();
    this.testFunction(); // FIXME:
  }

  startMake() {
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
            const { axisScale, moveScale } = this.getAxisMoveScale(nodeId);
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
            let foundIt = _.find(storageList, { nodeClassId: resourceId });
            if (_.isEmpty(foundIt)) {
              foundIt = {
                nodeClassId: resourceId,
                defList: [],
              };
              storageList.push(foundIt);
            }
            /** @type {defInfo} */
            const foundNodeIt = _.find(foundIt.defList, { nodeId });
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
        const targetNodeInfo = _.find(targetDefInfo.nodeList, { target_code: targetCode });
        returnValue = _.pick(targetNodeInfo, ['axisScale', 'moveScale']);
      }
    });

    return returnValue;
  }

  /**
   * 최종으로 저장될 svgNodeList 생성
   */
  makeSvgNodeList() {
    const storageList = this.storageList;
    /** @type {mSvgNodeInfo[]} */
    storageList.forEach(storageInfo => {
      _.forEach(storageInfo.defList, (defInfo, index) => {
        const targetPoint = this.discoverObjectPoint(defInfo.placeId);
        const finalAxis = this.calcPlacePoint(defInfo, targetPoint);
        // const {axisScale, moveScale, name, nodeId: id, placeId, point, resourceId} = _.set(defInfo, 'point', finalAxis);
        const finalObj = _.set(defInfo, 'point', finalAxis);
        const name = this.findNodeName(defInfo.nodeId);
        const isSensor = this.findIsSensorValue(defInfo.nodeId);
        /** @type {defInfo} */
        const newDetailNode = {
          id: finalObj.nodeId,
          name,
          placeId: finalObj.placeId,
          resourceId: finalObj.resourceId,
          point: finalObj.point,
        };

        // 그룹 존재
        /** @type {mSvgNodeInfo} */
        let foundIt = _.find(map.drawInfo.positionList.svgNodeList, {
          nodeClassId: storageInfo.nodeClassId,
        });
        if (_.isEmpty(foundIt)) {
          foundIt = {
            nodeClassId: storageInfo.nodeClassId,
            is_sensor: isSensor,
            defList: [],
          };
          if (foundIt.is_sensor != 1) {
            map.drawInfo.positionList.svgNodeList.push(foundIt);
          }
        }

        /** @type {defInfo} */
        const foundNodeIt = _.find(foundIt.defList, { id: finalObj.nodeId });
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
    const nodeResourceInfo = this.getResourceInfo(storageDefInfo.nodeId);
    if (_.isUndefined(nodeResourceInfo)) return false;
    const nodeElementDraw = nodeResourceInfo.elementDrawInfo;
    const nodeType = nodeResourceInfo.type;
    const isSensor = this.findIsSensorValue(storageDefInfo.nodeId);

    const [axisX, axisY] = storageDefInfo.axisScale;
    const [moveX, moveY] = storageDefInfo.moveScale;
    const [x1, y1, x2, y2] = placePoint;

    // FIXME: ↓ 후에 더 좋은 방법으로 수정, 센서도 axis,move 필요 그에 맞게 수정
    let targetAxis = [];
    let x;
    let y;

    if (isSensor === 1) {
      x = x1 + (x2 - x1) / 2 - nodeElementDraw.width / 2 + moveX;
      y = y1 + (y2 - y1) / 2 - nodeElementDraw.height / 2 + moveY;

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
      const targetInfo = _.find(svgPlaceInfo.defList, { id: placeId });
      if (_.isUndefined(targetInfo)) return false;
      const targetResourceId = targetInfo.resourceId;
      /** @type {mSvgModelResource} */
      const svgModelResourceInfo = _.find(map.drawInfo.frame.svgModelResourceList, {
        id: targetResourceId,
      });
      const targetType = svgModelResourceInfo.type;
      const targetDrawInfo = svgModelResourceInfo.elementDrawInfo;
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
        // 다른 조건문 작성
      }
    });
    return targetPoint;
  }

  /**
   * node의 name을 찾는 함수
   * @param {string} nodeId
   */
  findNodeName(nodeId) {
    const nodePrefix = this.getReplace(nodeId, /[_\d]/g);
    const nodeCode = this.getReplace(nodeId, /\D/g);
    // BU.CLIS(nodeId, nodePrefix, nodeCode);
    let nodeName;

    map.setInfo.nodeStructureList.forEach(nodeStructureInfo => {
      const findDefInfo = _.find(nodeStructureInfo.defList, { target_prefix: nodePrefix });
      if (_.isUndefined(findDefInfo)) return false;
      nodeName = `${findDefInfo.target_name}_${nodeCode}`;
      // BU.CLI(nodeName);
    });
    return nodeName;
  }

  /**
   * 1: sensor, 0: device, -1: nothing
   * @param {string} nodeId
   */
  findIsSensorValue(nodeId) {
    const nodePrefix = this.getReplace(nodeId, /[_\d]/g);

    let isSensor;
    map.setInfo.nodeStructureList.forEach(nodeStructureInfo => {
      const foundDefInfo = _.find(nodeStructureInfo.defList, { target_prefix: nodePrefix });
      if (_.isUndefined(foundDefInfo)) return false;

      const foundNodeStructureInfo = _.find(map.setInfo.nodeStructureList, {
        defList: [foundDefInfo],
      });
      isSensor = foundNodeStructureInfo.is_sensor;
    });

    return isSensor;
  }

  // TODO: sensor 재배치
  testFunction() {
    map.realtionInfo.placeRelationList.forEach(placeRelationInfo => {
      placeRelationInfo.defList.forEach(defInfo => {
        defInfo.placeList.forEach(placeInfo => {
          const sensorStorage = [];
          placeInfo.nodeList.forEach(nodeId => {
            const foundSensorValue = this.findIsSensorValue(nodeId);
            if (foundSensorValue === 1) {
              sensorStorage.push(nodeId);
            }
          });
          this.sensorStorage = sensorStorage;
          // //////////////////////////////////////////////////////////////////////////////////////////////////////
          let placeId = defInfo.target_prefix;
          // placeId 중 code 유무 체크
          if (placeInfo.target_code) {
            placeId += `_${placeInfo.target_code}`;
          }

          _.forEach(sensorStorage, (sensorId, index) => {
            const sensorPrefix = this.getReplace(sensorId, /[_\d]/g);
            const placePoint = this.discoverObjectPoint(placeId);
            let moveScale = [[]];
            if (sensorStorage.length === 1) {
              moveScale = [0, -1];
            } else if (sensorStorage.length > 2 < 5) {
              moveScale = [[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]];
              moveScale = moveScale[index];
            } else if (sensorStorage.length > 4 < 10) {
              moveScale = [
                [-1.2, -1.2],
                [0, -1.2],
                [1.2, -1.2],
                [-1.2, 0],
                [0, 1.2],
                [-1.2, 1.2],
                [0, 1.2],
                [1.2, 1.2],
              ];
            }

            const resourceInfo = this.getResourceInfo(sensorId);
            const { width, height, color } = resourceInfo.elementDrawInfo;
            // BU.CLIS(width, height, color);
            const [x1, y1, x2, y2] = placePoint;
            let x;
            let y;
            let targetAxis = [];
            const len = 10; // FI1XME:

            x = x1 + (x2 - x1) / 2 - width / 2 + moveScale[0] * width;
            y = y1 + (y2 - y1) / 2 - height / 2 + moveScale[1] * height;

            this.x = x;

            targetAxis = [x, y];
            // BU.CLIS(placeId, sensorId, targetAxis);
            // //////////////////////////////////////////////////////////////////////////////////////////
            // className을 찾기.
            map.setInfo.nodeStructureList.forEach(nodeStructureInfo => {
              const foundSensorInfo = _.find(nodeStructureInfo.defList, {
                target_prefix: sensorPrefix,
              });
              if (_.isUndefined(foundSensorInfo)) return false;

              const sensorClassName = foundSensorInfo.target_id;
              const newDefInfo = {
                id: sensorId,
                name: this.findNodeName(sensorId),
                placeId,
                resourceId: sensorClassName,
                point: targetAxis,
              };
              // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              // 그룹 존재
              let foundSensor = _.find(map.drawInfo.positionList.svgNodeList, {
                nodeClassId: sensorClassName,
              });
              if (_.isEmpty(foundSensor)) {
                foundSensor = {
                  nodeClassId: sensorClassName,
                  is_sensor: nodeStructureInfo.is_sensor,
                  defList: [],
                };
                map.drawInfo.positionList.svgNodeList.push(foundSensor);
              }
              /** @type {defInfo} */
              const foundNodeIt = _.find(foundSensor.defList, { id: sensorId });
              if (_.isEmpty(foundNodeIt)) {
                foundSensor.defList.push(newDefInfo);
              }
            });
          });
        });
      });
    });
  }

  // FIXME: 함수 네임 변경
  // testSensorCalcPlacePoint(sensorStorage, sensorId, placePoint) {
  //   const resourceInfo = this.getResourceInfo(sensorId);
  //   const { width, height, color } = resourceInfo.elementDrawInfo;
  //   // BU.CLIS(width, height, color);
  //   const [x1, y1, x2, y2] = placePoint;
  //   let x;
  //   let y;
  //   let targetAxis = [];
  //   const len = 10; // FIXME:

  //   x = x1 + (x2 - x1) / 2 - width - len;
  //   y = y1 + (y2 - y1) / 2 - height - len;
  //   this.x = x;

  //   targetAxis = [x, y];

  //   return targetAxis;
  // }
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
 * @property {string} name
 * @property {string} resourceId
 * @property {number[]} axisScale
 * @property {number[]} moveScale
 * @property {number[]} point 최종 적으로 나올 좌표 정보
 */
