const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const { BU } = require('base-util-jh');

const { SOURCE_PATH, SOURCE_FILE } = process.env;

const mapPath = path.join(process.cwd(), 'src', 'maps', SOURCE_PATH, SOURCE_FILE);

// eslint-disable-next-line import/no-dynamic-require
const map = require(mapPath);

require('default-intelligence');

class SvgMaker {
  constructor() {
    // map 정보를 비구조화 할당 처리하여 내부 메소드에서 사용하는 체인을 줄임
    /** @type {mDeviceMap} */
    const {
      drawInfo: {
        frame: { svgModelResourceList },
        positionInfo: { svgNodeList = [], svgPlaceList = [] } = {},
      },
      setInfo: { nodeStructureList },
      relationInfo: { placeRelationList, svgResourceConnectionList },
    } = map;

    // SVG Drawing 리소스를 저장하는 목록
    this.mSvgModelResourceList = svgModelResourceList;

    // Position SVG 장소 목록, Node 목록
    this.mSvgPlaceList = svgPlaceList;
    this.mSvgNodeList = svgNodeList;

    // SetInfo 노드 구조 정의 목록
    this.mNodeStructureList = nodeStructureList;

    // RelationInfo 장소 관계 목록, SVG Resouce 관계 목록
    this.mPlaceRelationList = placeRelationList;
    this.mSvgResourceConnectionList = svgResourceConnectionList;
  }

  /**
   * @return {mDeviceMap}
   */
  async makeSvgMapFile() {
    // SVG NodeList를 생성하기 위한 임시 저장소 생성
    this.setSvgNodeTempStorageList();
    // Node(센서 제외) SVG 위치 정보 산출
    // this.makeSvgNodeList();
    // Node(센서) SVG 위치 정보 산출
    // this.makeSensorList();

    await this.writeMapFile();

    return map;
  }

  // Step 4
  /**
   */
  async writeMapFile() {
    // 사용할 프로젝트 맵 이미지 경로
    const inputMapImgPath = path.join(mapPath, `${SOURCE_FILE}.png`);

    const outputMapPath = path.join(process.cwd(), 'out', 'defaultMap.js');
    // 이미지 사용될 경우 defaultMap.png 로 저장
    const outputImgPath = path.join(process.cwd(), 'out', 'defaultMap.png');
    const outputProjectMapPath = path.join(
      process.cwd(),
      'out',
      SOURCE_PATH,
      `output_${SOURCE_FILE}.js`,
    );

    const isExistMapImg = await fs.existsSync(inputMapImgPath);
    // 이미지가 존재할 경우 복사본 생성
    if (isExistMapImg) {
      fs.createReadStream(inputMapImgPath).pipe(fs.createWriteStream(outputImgPath));
    } else if (fs.existsSync(outputImgPath)) {
      // 프로젝트 이미지가 존재하지 않고 out 경로에 생성된 이미지가 존재할 경우 해당 이미지 삭제
      await fs.accessSync(outputImgPath, fs.constants.F_OK);
      fs.unlink(outputImgPath, console.error);
    }
    // 모듈화
    const finalStrMap = `module.exports = ${JSON.stringify(map)}`;

    await BU.writeFile(outputMapPath, finalStrMap, 'w');

    await BU.writeFile(outputProjectMapPath, finalStrMap, 'w');
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
    /** @type {mSvgModelResource} */
    let resourceInfo = {};

    /** @type {mSvgResourceConnectionInfo} */
    const svgResourceConnInfo = _.find(this.mSvgResourceConnectionList, {
      targetIdList: [targetId],
    });

    if (svgResourceConnInfo === undefined) {
      return resourceInfo;
    }

    const resourceId = svgResourceConnInfo.resourceIdList[0];
    // BU.CLI(resourceId);

    const resource = _.find(this.mSvgModelResourceList, {
      id: resourceId,
    });

    if (resource !== undefined) {
      resourceInfo = resource;
    }

    return resourceInfo;
  }

  // Step 1
  /**
   * svgNodeList를 만들기 전 nodeDef 항목끼리 묶어 데이터를 거치시킴. 임시 저장소(메모리 상 거주)
   */
  setSvgNodeTempStorageList() {
    // console.time('setSvgNodeTempStorageList');
    /** @type {Map<string, mNodeStorageInfo>} nodeId를 기준으로 nodeInfo 정보를 저장할 Map */
    this.mNodeStorage = new Map();

    this.mNodeStructureList.forEach(nClassInfo => {
      const { defList, is_sensor: isSensor } = nClassInfo;
      defList.forEach(nDefInfo => {
        const { nodeList = [], target_prefix: ndPrefix, target_name: ndName } = nDefInfo;

        nodeList.forEach(nodeInfo => {
          const { target_code: nCode } = nodeInfo;
          const nodeId = `${ndPrefix}${nCode ? `_${nCode}` : ''}`;
          const nodeName = `${ndName}${nCode ? `_${nCode}` : ''}`;

          nodeInfo.nodeName = nodeName;
          nodeInfo.isSensor = isSensor;

          this.mNodeStorage.set(nodeId, nodeInfo);
        });
      });
    });

    /** @type {Map<string, mSvgStorageInfo>} */
    this.mSvgStorage = new Map();
    this.mSvgPlaceList.forEach(svgPlaceInfo => {
      const { placeId, svgPositonList } = svgPlaceInfo;

      svgPositonList.forEach(svgPositionInfo => {
        const { resourceId, id: svgPositionId } = svgPositionInfo;

        const svgResourceInfo = _.find(this.mSvgModelResourceList, {
          id: resourceId,
        });

        this.mSvgStorage.set(svgPositionId, {
          svgPositionInfo,
          svgResourceInfo,
        });
      });
    });

    // BU.CLIN(this.mSvgStorage);

    /** @type {storageInfo[]} */
    const storageList = [];

    // console.timeLog('setSvgNodeTempStorageList');
    // 장소 대분류 구조 목록을 순회
    this.mPlaceRelationList.forEach(pClassInfo => {
      // 장소 개요 목록 순회
      pClassInfo.defList.forEach(pDefInfo => {
        const { target_prefix: pdPrefix, placeList = [] } = pDefInfo;
        // 장소 목록 순회
        placeList.forEach(pInfo => {
          const { target_code: pCode = null, nodeList = [] } = pInfo;
          // Place ID 정의
          const placeId = `${pdPrefix}${pCode ? `_${pCode}` : ''}`;

          nodeList.forEach(nodeId => {
            // 노드 좌표의 시작 좌표 및 이동 좌표
            const { axisScale, moveScale = [0, 0] } = this.mNodeStorage.get(nodeId);

            const { id: resourceId } = this.getResourceInfo(nodeId);

            // resourceId가 존재하지 않는다면 그리지 않는다고 판단. 해당 node는 제외
            if (resourceId === undefined) return false;

            // axisScale이 존재하지 않는다면
            if (!_.isArray(axisScale)) return false;

            /** @type {detailNodeInfo} */
            const detailNode = {
              nodeId,
              placeId,
              resourceId,
              point: [],
              axisScale,
              moveScale,
            };

            // storage 조회
            let storageInfo = _.find(storageList, { nodeDefId: resourceId });
            // 존재하지 않을 경우 새로이 생성하고 삽입
            if (storageInfo === undefined) {
              storageInfo = {
                nodeDefId: resourceId,
                defList: [],
              };
              storageList.push(storageInfo);
            }
            // 존재하지 않을 경우 삽입
            if (_.findIndex(storageInfo.defList, { nodeId }) === -1) {
              storageInfo.defList.push(detailNode);
            }
          });
        });
      });
    });

    // BU.CLIN(storageList, 3);
    // console.timeEnd('setSvgNodeTempStorageList');
    this.storageList = storageList;
  }

  // Step 2
  /**
   * 최종으로 저장될 svgNodeList 생성
   */
  makeSvgNodeList() {
    // BU.CLI('makeSvgNodeList');
    const { storageList } = this;
    // BU.CLIN(storageList, 2);

    // BU.CLIN(this.mSvgStorage);

    /** @type {mSvgNodeInfo[]} */
    storageList.forEach(storageInfo => {
      const { defList: nodeDetailList, nodeDefId } = storageInfo;
      nodeDetailList.forEach(detailNodeInfo => {
        const { placeId, nodeId, resourceId } = detailNodeInfo;

        // 장소 [시작좌표, 끝좌표]
        const placePoint = this.getPlacePoint(placeId);
        // 노드 중심 좌표
        const finalAxis = this.getNodeAxis(detailNodeInfo, placePoint);
        detailNodeInfo.point = finalAxis;

        const isSensor = this.findIsSensorValue(nodeId);

        // 그룹 존재
        /** @type {mSvgNodeInfo} */
        let svgNodeInfo = _.find(this.mSvgNodeList, {
          nodeDefId,
        });

        if (svgNodeInfo === undefined) {
          svgNodeInfo = {
            nodeDefId,
            is_sensor: isSensor,
            svgPositonList: [],
          };

          // 장치 종류가 센서 타입이 아니라면 추가
          if (isSensor !== 1) {
            this.mSvgNodeList.push(svgNodeInfo);
          }
        }

        /** @type {mSvgPositionInfo} */
        const svgNodePositionInfo = _.find(svgNodeInfo.svgPositonList, { id: nodeId });
        if (svgNodePositionInfo === undefined) {
          // BU.CLI(detailNodeInfo);
          svgNodeInfo.svgPositonList.push({
            id: nodeId,
            name: this.mNodeStorage.get(nodeId).nodeName,
            placeId,
            resourceId,
            point: detailNodeInfo.point,
          });
        }
      });
    });
  }

  // Step 3
  /**
   * 센서 자동 배치 함수
   */
  makeSensorList() {
    try {
      BU.CLIN(this.mPlaceRelationList);
      this.mPlaceRelationList.forEach(placeClassInfo => {
        placeClassInfo.defList.forEach(placeDefInfo => {
          const { target_prefix: pdPrefix, placeList = [] } = placeDefInfo;

          placeList.forEach(placeInfo => {
            const { target_code: pCode = null, nodeList: pNodeList = [] } = placeInfo;
            const sensorStorage = [];

            pNodeList.forEach(nodeId => {
              const foundSensorValue = this.findIsSensorValue(nodeId);
              if (foundSensorValue === 1 || foundSensorValue === 2) {
                sensorStorage.push(nodeId);
              }
            });

            const placeId = `${pdPrefix}${pCode ? `_${pCode}` : ''}`;

            if (placeId.includes('PV_N')) {
              BU.CLI(placeId, sensorStorage);
            }

            // FIXME: 개선해야 하는 소스
            _.forEach(sensorStorage, (sensorId, index) => {
              const getReplaceVal = this.getReplace(sensorId, /(?<=_)[0-9]+/g);
              const sensorPrefix = getReplaceVal.substring(sensorId, getReplaceVal.length - 1);
              const placePoint = this.getPlacePoint(placeId);
              const { axisScale } = this.getAxisMoveScale(sensorId);
              let { moveScale } = this.getAxisMoveScale(sensorId);
              // let { moveScale = [0, 0] } = this.getAxisMoveScale(sensorId);

              if (sensorStorage.length === 1) {
                moveScale = [0 + moveScale[0], -1 + moveScale[1]];
              } else if (sensorStorage.length > 1 && sensorStorage.length < 5) {
                // BU.CLI(sensorStorage.length);
                moveScale = [
                  [-1 + moveScale[0], -1 + moveScale[1]],
                  [1 + moveScale[0], -1 + moveScale[1]],
                  [-1 + moveScale[0], 1 + moveScale[1]],
                  [1 + moveScale[0], 1 + moveScale[1]],
                ];
                moveScale = moveScale[index];
              } else if (sensorStorage.length > 4 && sensorStorage.length < 10) {
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
              } else if (sensorStorage.length > 9 && sensorStorage.length < 17) {
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
              // BU.CLIS(sensorId, resourceInfo.elementDrawInfo);

              if (placeId.includes('PV_N')) {
                BU.CLIS(moveScale, resourceInfo.elementDrawInfo, placePoint);
              }

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
                  name: this.mNodeStorage.get(sensorId).nodeName,
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
                    svgPositonList: [],
                  };
                  this.mSvgNodeList.push(foundSensor);
                }
                /** @type {mSvgPositionInfo} */
                const foundNodeIt = _.find(foundSensor.svgPositonList, { id: sensorId });
                if (_.isEmpty(foundNodeIt)) {
                  foundSensor.svgPositonList.push(newDefInfo);
                }
              });
            });
          });
        });
      });
    } catch (error) {
      console.error(error);
      // throw error;
    }
  }

  /**
   * 장소에 따른 노드의 위치 지정
   * @param {detailNodeInfo} nodeDetailInfo storageList에 저장된 defList 정보
   * @param {number[]} placePoint 장소의 (x1,y1,x2,y2) 정보
   * @return Node Axis [x, y]
   */
  getNodeAxis(nodeDetailInfo, placePoint) {
    // Model Resource 정보
    const {
      type: nodeType,
      elementDrawInfo: { width: nModelWidth, height: nModelHeight },
    } = this.getResourceInfo(nodeDetailInfo.nodeId);

    // Node Axis 계산 옵션
    const {
      axisScale: [axisX, axisY],
      moveScale: [moveX, moveY],
    } = nodeDetailInfo;
    // 노드 센서 여부
    const { isSensor } = this.mNodeStorage.get(nodeDetailInfo.nodeId);

    // 노드를 관리하는 장소의 시작좌표 및 끝좌표
    const [px1, py1, px2, py2] = placePoint;

    // 노드 중심축 좌표
    let nodeAxis = [];
    let nAxisX;
    let nAxisY;

    const pModelWidth = px2 - px1;
    const pModelHeight = py2 - py1;

    // 센서 배치
    if (isSensor === 1) {
      // 센서 노드 중심 좌표
      const sNodeX = pModelWidth / 2 - nModelWidth / 2;
      const sNodeY = pModelHeight / 2 - nModelHeight / 2;

      nAxisX = px1 + sNodeX + moveX;
      nAxisY = py1 + sNodeY + moveY;

      nodeAxis = [nAxisX, nAxisY];
    } else {
      // 시작 점을 기준으로 axis 비율에 따라 끝점값을 가감하여 Node의 Axis 계산
      nAxisX = px1 + axisX * pModelWidth;
      nAxisY = py1 + axisY * pModelHeight;
      // 노드 타입에 따라서 Axis 조정

      switch (nodeType) {
        case 'rect':
        case 'circle':
          nAxisX -= axisX * nModelWidth - moveX * nModelWidth;
          nAxisY -= axisY * nModelHeight - moveY * nModelHeight;
          break;
        case 'polygon':
          nAxisX -= axisX * (nModelWidth * 2) - moveX * (nModelWidth * 2);
          nAxisY -= axisY * (nModelHeight * 2) - moveY * (nModelHeight * 2);
          break;
        default:
          break;
      }

      // if (nodeType === 'rect') {
      //   nAxisX -= axisX * width + moveX * width;
      //   nAxisY -= axisY * height + moveY * height;
      // } else if (nodeType === 'circle') {
      //   nAxisX = nAxisX - axisX * width + moveX * width;
      //   nAxisY = nAxisY - axisY * height + moveY * height;
      // } else if (nodeType === 'polygon') {
      //   nAxisX = nAxisX - axisX * (width * 2) + moveX * (width * 2);
      //   nAxisY = nAxisY - axisY * (height * 2) + moveY * (height * 2);
      // }

      nodeAxis = [nAxisX, nAxisY];
    }
    return nodeAxis;
  }

  /**
   * svgPlaceInfo.svgPositonList 목록 중 id가 placeId와 일치하는 SVG 객체의 시작점과 끝점을 추출
   * @param {string} placeId ex) 'SEB_001'
   */
  getPlacePoint(placeId) {
    let svgPosPoint = []; // [x1,y1,x2,y2]
    // BU.CLI(placeId);

    try {
      const {
        svgPositionInfo: {
          point: [x1, y1, x2, y2],
        },
        svgResourceInfo: {
          type: targetType,
          elementDrawInfo: { width, height },
        },
      } = this.mSvgStorage.get(placeId);
      // BU.CLI(svgResourceInfo);
      if (targetType === 'rect' || targetType === 'pattern' || targetType === 'image') {
        svgPosPoint = [x1, y1, x1 + width, y1 + height];
        // line position:(x1,y1,x2,y2)
      } else if (targetType === 'line') {
        // 수평으로 라인을 그을 경우
        if (y1 === y2) {
          BU.CLI('@@');
          svgPosPoint = [x1, y1 - width / 2, x2, y2 - width / 2];
        } else {
          BU.CLI('@@');
          svgPosPoint = [x1 - width / 2, y1 - width, x2 - width / 2, y2 + width];
        }
      } else {
        // 다른 조건문 작성
      }
      return svgPosPoint;
    } catch (error) {
      return svgPosPoint;
    }

    // this.mSvgPlaceList.forEach(svgPlaceInfo => {
    //   // /** @type {mSvgPositionInfo} */
    //   const svgPositionInfo = _.find(svgPlaceInfo.svgPositonList, { id: placeId });
    //   if (_.isUndefined(svgPositionInfo)) return false;
    //   const targetResourceId = svgPositionInfo.resourceId;
    //   /** @type {mSvgModelResource} */
    //   const svgModelResourceInfo = _.find(this.mSvgModelResourceList, {
    //     id: targetResourceId,
    //   });

    //   const targetType = svgModelResourceInfo.type;
    //   const { width, height } = svgModelResourceInfo.elementDrawInfo;
    //   const [x, y, x1, y1] = svgPositionInfo.point;

    //   if (targetType === 'rect' || targetType === 'pattern' || targetType === 'image') {
    //     targetPoint = [x, y, x + width, y + height];
    //     // line position:(x1,y1,x2,y2)
    //   } else if (targetType === 'line') {
    //     if (y === y1) {
    //       targetPoint = [x, y - width / 2, x1, y1 - width / 2];
    //     } else {
    //       targetPoint = [x - width / 2, y - width, x1 - width / 2, y1 + width];
    //     }
    //   } else {
    //     // 다른 조건문 작성
    //   }
    // });
    // BU.CLI(targetPoint);
    // return targetPoint;
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
   * axisScale, moveScale 값 가져오기
   * @param {string} targetId ex) 'SEB_001', 'MRT_002' ...
   * @return {{axisScale: [], moveScale: []}}
   */
  getAxisMoveScale(targetId) {
    const getReplaceVal = this.getReplace(targetId, /(?<=_)[0-9]+/g);
    const targetPrefix = getReplaceVal.substring(0, getReplaceVal.length - 1);
    const targetCode = _.replace(targetId, getReplaceVal, '');

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
