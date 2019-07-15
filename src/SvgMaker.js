const _ = require('lodash');
const { BU } = require('base-util-jh');

const map = require(`./maps/${process.env.SOURCE_PATH}/${process.env.SOURCE_FILE}`);
const mapBase64 = require(`./maps/${process.env.SOURCE_PATH}/${process.env.SOURCE_FILE}/mapBase64`);
// const mapBase64 = require('./maps/upsas/mapBase64');

require('dotenv').config();
require('default-intelligence');

class SvgMaker {
  constructor() {
    // map 정보를 비구조화 할당 처리하여 내부 메소드에서 사용하는 체인을 줄임
    const {
      drawInfo: {
        frame: { svgModelResourceList },
        positionInfo = {},
      },
      setInfo: { nodeStructureList },
      relationInfo: { placeRelationList, svgResourceConnectionList },
    } = map;

    // SVG Drawing 리소스를 저장하는 목록
    this.mSvgModelResourceList = svgModelResourceList;

    // 생성 시킬 svgNodeList 초기화
    positionInfo.svgNodeList = [];

    // Position SVG 장소 목록, Node 목록
    this.mSvgPlaceList = positionInfo.svgPlaceList;
    this.mSvgNodeList = positionInfo.svgNodeList;

    // SetInfo 노드 구조 정의 목록
    this.mNodeStructureList = nodeStructureList;

    // RelationInfo 장소 관계 목록, SVG Resouce 관계 목록
    this.mPlaceRelationList = placeRelationList;
    this.mSvgResourceConnectionList = svgResourceConnectionList;

    // SVG NodeList를 생성하기 위한 임시 저장소 생성
    this.setSvgNodeTempStorageList();
    // Node(센서 제외) SVG 위치 정보 산출
    this.makeSvgNodeList();
    // Node(센서) SVG 위치 정보 산출
    this.makeSensorList();
    // File로 떨굼
    this.writeMapFile();
  }

  async writeMapFile() {
    try {
      map.drawInfo.frame.mapInfo.backgroundInfo.backgroundData = mapBase64;
      const finalStrMap = `var map = ${JSON.stringify(map)}`;
      await BU.writeFile('./out/defaultMap.js', finalStrMap, 'w');
      // FIXME:
      await BU.writeFile(
        `./out/${process.env.SOURCE_PATH}/output_${process.env.SOURCE_FILE}.js`,
        finalStrMap,
        'w',
      );
      return BU.CLI('Map 자동 생성 성공');
    } catch (error) {
      BU.CLI('Map 생성 실패', error);
    }
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
    const foundSVGResourceConnectionInfo = _.find(this.mSvgResourceConnectionList, {
      targetIdList: [targetId],
    });

    if (_.isObject(foundSVGResourceConnectionInfo)) {
      const resourceId = foundSVGResourceConnectionInfo.resourceIdList[0];
      // BU.CLI(resourceId);
      /** @type {mSvgModelResource} */
      const resourceInfo = _.find(this.mSvgModelResourceList, {
        id: resourceId,
      });

      return resourceInfo;
    }
  }

  /**
   * svgNodeList를 만들기 전 nodeDef 항목끼리 묶어 데이터를 거치시킴. 임시 저장소(메모리 상 거주)
   */
  setSvgNodeTempStorageList() {
    /** @type {storageInfo[]} */
    const storageList = [];

    // 장소 대분류 구조 목록을 순회
    this.mPlaceRelationList.forEach(placeClassInfo => {
      // 장소 개요 목록 순회
      placeClassInfo.defList.forEach(placeDefInfo => {
        const { target_prefix: pdPrefix } = placeDefInfo;
        // 장소 목록 순회
        placeDefInfo.placeList.forEach(placeInfo => {
          const { target_code: pCode = null, nodeList = [] } = placeInfo;
          // Place ID 정의
          const placeId = `${pdPrefix}${pCode ? `_${pCode}` : ''}`;

          _.forEach(nodeList, nodeId => {
            const { axisScale, moveScale = [0, 0] } = this.getAxisMoveScale(nodeId);
            const resourceInfo = this.getResourceInfo(nodeId);
            const resourceId = _.result(resourceInfo, 'id');

            // resourceId가 존재하지 않는다면 그리지 않는다고 판단. 해당 node는 제외
            if (resourceId === undefined) return false;

            if (_.isArray(axisScale)) {
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
              let foundIt = _.find(storageList, { nodeDefId: resourceId });
              if (_.isEmpty(foundIt)) {
                foundIt = {
                  nodeDefId: resourceId,
                  defList: [],
                };
                storageList.push(foundIt);
              }
              /** @type {defInfo} */
              const foundNodeIt = _.find(foundIt.defList, { nodeId });
              if (_.isEmpty(foundNodeIt)) {
                foundIt.defList.push(detailNode);
              }
            }
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

    this.mNodeStructureList.forEach(nodeStructureInfo => {
      /** @type {mNodeDefInfo} */
      const targetDefInfo = _.find(nodeStructureInfo.defList, {
        target_prefix: targetPrefix,
      });
      if (_.isObject(targetDefInfo)) {
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
    // BU.CLI('makeSvgNodeList');
    const { storageList } = this;
    // BU.CLIN(storageList, 2);
    /** @type {mSvgNodeInfo[]} */
    storageList.forEach(storageInfo => {
      _.forEach(storageInfo.defList, (detailNodeInfo, index) => {
        const { placeId, nodeId } = detailNodeInfo;
        const targetPoint = this.discoverObjectPoint(placeId);
        const finalAxis = this.calcPlacePoint(detailNodeInfo, targetPoint);
        const finalObj = _.set(detailNodeInfo, 'point', finalAxis);
        const name = this.findNodeName(nodeId);
        const isSensor = this.findIsSensorValue(nodeId);
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
        let foundIt = _.find(this.mSvgNodeList, {
          nodeDefId: storageInfo.nodeDefId,
        });

        if (_.isEmpty(foundIt)) {
          foundIt = {
            nodeDefId: storageInfo.nodeDefId,
            is_sensor: isSensor,
            defList: [],
          };

          // 장치 종류가 센서 타입이 아니라면 추가
          if (foundIt.is_sensor !== 1) {
            this.mSvgNodeList.push(foundIt);
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
    const { width, height } = nodeResourceInfo.elementDrawInfo;
    const nodeType = nodeResourceInfo.type;
    const isSensor = this.findIsSensorValue(storageDefInfo.nodeId);

    const [axisX, axisY] = storageDefInfo.axisScale;
    const [moveX, moveY] = storageDefInfo.moveScale;
    const [x1, y1, x2, y2] = placePoint;

    let targetAxis = [];
    let x;
    let y;

    if (isSensor === 1) {
      x = x1 + ((x2 - x1) / 2 - width / 2) + moveX;
      y = y1 + ((y2 - y1) / 2 - height / 2) + moveY;

      targetAxis = [x, y];
    } else {
      x = x1 + axisX * (x2 - x1);
      y = y1 + axisY * (y2 - y1);
      if (nodeType === 'rect') {
        x = x - axisX * width + moveX * width;
        y = y - axisY * height + moveY * height;
      } else if (nodeType === 'circle') {
        x = x - axisX * width + moveX * width;
        y = y - axisY * height + moveY * height;
      } else if (nodeType === 'polygon') {
        x = x - axisX * (width * 2) + moveX * (width * 2);
        y = y - axisY * (height * 2) + moveY * (height * 2);
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

    this.mSvgPlaceList.forEach(svgPlaceInfo => {
      /** @type {defInfo} */
      const targetInfo = _.find(svgPlaceInfo.defList, { id: placeId });
      if (_.isUndefined(targetInfo)) return false;
      const targetResourceId = targetInfo.resourceId;
      /** @type {mSvgModelResource} */
      const svgModelResourceInfo = _.find(this.mSvgModelResourceList, {
        id: targetResourceId,
      });

      const targetType = svgModelResourceInfo.type;
      const { width, height } = svgModelResourceInfo.elementDrawInfo;
      const [x, y, x1, y1] = targetInfo.point;

      if (targetType === 'rect' || targetType === 'pattern' || targetType === 'image') {
        targetPoint = [x, y, x + width, y + height];
        // line position:(x1,y1,x2,y2)
      } else if (targetType === 'line') {
        if (y === y1) {
          targetPoint = [x, y - width / 2, x1, y1 - width / 2];
        } else {
          targetPoint = [x - width / 2, y - width, x1 - width / 2, y1 + width];
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

    this.mNodeStructureList.forEach(nodeStructureInfo => {
      const findDefInfo = _.find(nodeStructureInfo.defList, { target_prefix: nodePrefix });
      if (_.isUndefined(findDefInfo)) return false;
      nodeName = `${findDefInfo.target_name}_${nodeCode}`;
      // BU.CLI(nodeName);
    });
    return nodeName;
  }

  /**
   * 1: sensor, 0: device, -1: nothing
   * setInfo.nodeStructureList 중에서 nodeId가 동일한 요소가 있다면 해당 노드의 is_sensor 값 반환
   * @param {string} nodeId
   */
  findIsSensorValue(nodeId) {
    // BU.CLI('findIsSensorValue', nodeId);
    // const nodePrefix = this.getReplace(nodeId, /[_\d]/g);

    let hasFound = false;
    let sensorValue;

    this.mNodeStructureList.forEach(nodeClassInfo => {
      if (hasFound) return false;
      // 노드 개요 목록 순회
      nodeClassInfo.defList.forEach(nodeDefInfo => {
        if (hasFound) return false;
        const { target_prefix: ndPrefix, nodeList = [] } = nodeDefInfo;
        // nodeId 동일한 개체가 있다면 해당 센서 값 기입 후 순회 구문 종료
        if (
          _.find(nodeList, nodeInfo => {
            const { target_code: nCode = null } = nodeInfo;
            return _.eq(nodeId, `${ndPrefix}${nCode ? `_${nCode}` : ''}`);
          })
        ) {
          hasFound = true;
          sensorValue = nodeClassInfo.is_sensor;
          // BU.CLI('찾음', sensorValue);
        }
      });
    });

    return sensorValue;
  }

  /**
   * 센서 자동 배치 함수
   */
  makeSensorList() {
    this.mPlaceRelationList.forEach(placeClassInfo => {
      placeClassInfo.defList.forEach(placeDefInfo => {
        const { target_prefix: pdPrefix, placeList = [] } = placeDefInfo;

        placeList.forEach(placeInfo => {
          const { target_code: pCode = null, nodeList: pNodeList = [] } = placeInfo;
          const sensorStorage = [];

          pNodeList.forEach(nodeId => {
            const foundSensorValue = this.findIsSensorValue(nodeId);
            if (foundSensorValue === 1) {
              sensorStorage.push(nodeId);
            }
          });

          const placeId = `${pdPrefix}${pCode ? `_${pCode}` : ''}`;

          // FIXME: 개선해야 하는 소스
          _.forEach(sensorStorage, (sensorId, index) => {
            const sensorPrefix = this.getReplace(sensorId, /[_\d]/g);
            const placePoint = this.discoverObjectPoint(placeId);
            const { axisScale } = this.getAxisMoveScale(sensorId);
            let { moveScale } = this.getAxisMoveScale(sensorId);

            if (sensorStorage.length === 1) {
              moveScale = [0 + moveScale[0], -1 + moveScale[1]];
            } else if (sensorStorage.length > 2 < 5) {
              moveScale = [
                [-1 + moveScale[0], -1 + moveScale[1]],
                [1 + moveScale[0], -1 + moveScale[1]],
                [-1 + moveScale[0], 1 + moveScale[1]],
                [1 + moveScale[0], 1 + moveScale[1]],
              ];
              moveScale = moveScale[index];
            } else if (sensorStorage.length > 4 < 10) {
              moveScale = [
                [-1.2 + moveScale[0], -1.2 + moveScale[1]],
                [0 + moveScale[0], -1.2 + moveScale[1]],
                [1.2 + moveScale[0], -1.2 + moveScale[1]],
                [-1.2 + moveScale[0], 0 + moveScale[1]],
                [0 + moveScale[0], 1.2 + moveScale[1]],
                [-1.2 + moveScale[0], 1.2 + moveScale[1]],
                [0 + moveScale[0], 1.2 + moveScale[1]],
                [1.2 + moveScale[0], 1.2 + moveScale[1]],
              ];
              moveScale = moveScale[index];
            } else if (sensorStorage.length > 9 < 17) {
              moveScale = [
                [-1.5 + moveScale[0], -1 + moveScale[1]],
                [-0.7 + moveScale[0], -1 + moveScale[1]],
                [0.7 + moveScale[0], -1 + moveScale[1]],
                [1.5 + moveScale[0], -1 + moveScale[1]],
                [-1.5 + moveScale[0], -0.5 + moveScale[1]],
                [1.5 + moveScale[0], -0.5 + moveScale[1]],
                [-1.5 + moveScale[0], 0.5 + moveScale[1]],
                [1.5 + moveScale[0], 0.5 + moveScale[1]],
                [-1.5 + moveScale[0], 1 + moveScale[1]],
                [-0.7 + moveScale[0], 1 + moveScale[1]],
                [0.7 + moveScale[0], 1 + moveScale[1]],
                [1.5 + moveScale[0], 1 + moveScale[1]],
              ];
              moveScale = moveScale[index];
            }

            const resourceInfo = this.getResourceInfo(sensorId);
            const { width, height, color } = resourceInfo.elementDrawInfo;
            const [x1, y1, x2, y2] = placePoint;
            let x;
            let y;
            let targetAxis = [];

            x = x1 + (x2 - x1) / 2 - width / 2 + moveScale[0] * width;
            y = y1 + (y2 - y1) / 2 - height / 2 + moveScale[1] * height;

            this.x = x;

            targetAxis = [x, y];
            // className을 찾기.
            this.mNodeStructureList.forEach(nodeClassInfo => {
              const foundNodeDefInfo = _.find(nodeClassInfo.defList, {
                target_prefix: sensorPrefix,
              });
              if (_.isUndefined(foundNodeDefInfo)) return false;

              const nodeDefId = foundNodeDefInfo.target_id;
              const newDefInfo = {
                id: sensorId,
                name: this.findNodeName(sensorId),
                placeId,
                resourceId: resourceInfo.id,
                point: targetAxis,
              };
              // 그룹 존재
              let foundSensor = _.find(this.mSvgNodeList, {
                nodeDefId: resourceInfo.id,
              });
              if (_.isEmpty(foundSensor)) {
                foundSensor = {
                  nodeDefId,
                  is_sensor: nodeClassInfo.is_sensor,
                  defList: [],
                };
                this.mSvgNodeList.push(foundSensor);
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
}
module.exports = SvgMaker;

/**
 * @typedef {Object} storageInfo
 * @property {string} nodeDefId
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
