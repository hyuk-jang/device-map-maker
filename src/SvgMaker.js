const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const { BU } = require('base-util-jh');

const { SOURCE_PATH, SOURCE_FILE } = process.env;

const mapPath = path.join(process.cwd(), 'src', 'maps', SOURCE_PATH, SOURCE_FILE);

// eslint-disable-next-line import/no-dynamic-require
/** @type {mDeviceMap} */
const map = require(mapPath);

require('default-intelligence');

const STROKE_INFO = {
  color: '#ccc',
  linecap: 'rect',
  width: 0.5,
};

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
    // this.setSvgNodeTempStorageList();
    // Node(센서 제외) SVG 위치 정보 산출
    // this.makeSvgNodeList();
    // Node(센서) SVG 위치 정보 산출
    // this.makeSensorList();

    this.init();

    this.setSvgPlaceList();

    this.setSvgNodeList();

    // TODO: PlaceRelationList 목록을 순회하면서 positionInfo.svgPlaceList 에 세팅

    await this.writeMapFile();

    // BU.CLIN(map.drawInfo.positionInfo.svgPlaceList);

    return map;
  }

  /**
   * Map 초기화 진행
   * Map<placeId, mdPlaceInfo>, Map<nodeId, mdNodeInfo> 생성
   */
  init() {
    // svgModelResourceList 생성
    /** @type {Map<string, mSvgModelResource>} */
    this.mdMapStorage = new Map();
    this.mSvgModelResourceList.forEach(modelInfo => {
      const { id } = modelInfo;
      this.mdMapStorage.set(id, modelInfo);
    });

    // TODO: PlaceRelationList을 순회하면서 Map<placeId, mSvgStorageInfo> 세팅

    /** @type {Map<string, mdPlaceInfo>} */
    this.mdPlaceStorage = new Map();

    this.mPlaceRelationList.forEach(pClassInfo => {
      const { defList, target_name: pcName } = pClassInfo;
      defList.forEach(pDefInfo => {
        const { target_prefix: pdPrefix, target_name: pdName = pcName, placeList = [] } = pDefInfo;
        // 장소 목록 순회
        placeList.forEach(pInfo => {
          const {
            target_code: pCode = null,
            target_name: pName = pdName,
            nodeList = [],
            svgPositionInfo: { point, resourceId } = {},
          } = pInfo;
          // Place ID 정의

          // svgPositionInfo 정보가 없다면 추가하지 않음
          if (resourceId === undefined) return false;

          const placeId = `${pdPrefix}${pCode ? `_${pCode}` : ''}`;
          const placeName = `${pName}${pCode ? `_${pCode}` : ''}`;

          this.mdPlaceStorage.set(placeId, {
            placeId,
            placeName,
            nodeList,
            point,
            svgModelResource: this.mdMapStorage.get(resourceId),
          });
        });
      });
    });

    // BU.CLIN(this.mdPlaceStorage);

    // TODO: SetInfo NodeStrutureList 를 순회하면서 Map<placeId, mSvgStorageInfo> 세팅
    /** @type {Map<string, mdNodeInfo>} nodeId를 기준으로 nodeInfo 정보를 저장할 Map */
    this.mdNodeStorage = new Map();

    this.mNodeStructureList.forEach(nClassInfo => {
      const { defList, is_sensor: isSensor, target_name: ncName, data_unit: dataUnit } = nClassInfo;

      defList.forEach(nDefInfo => {
        const { nodeList = [], target_prefix: ndPrefix, target_name: ndName = ncName } = nDefInfo;

        nodeList.forEach(nodeInfo => {
          const {
            target_code: nCode,
            target_name: nName = ndName,
            svgNodePosOpt = {},
            svgNodePosOpt: { resourceId, axisScale, moveScale } = {},
          } = nodeInfo;

          let { svgNodePosOpt: { placeId } = {} } = nodeInfo;

          // SVG Node의 위치 설정 정보가 없을 경우 추가하지 않음
          if (_.isEmpty(svgNodePosOpt)) {
            return false;
          }

          const nodeId = `${ndPrefix}${nCode ? `_${nCode}` : ''}`;
          const nodeName = `${nName}${nCode ? `_${nCode}` : ''}`;

          // resourceId의 정보가 없다면 placeRelation에 있는지 찾아서 정의
          if (placeId === undefined) {
            const psIterator = this.mdPlaceStorage.values();

            let psInfo = psIterator.next();

            while (!psInfo.done) {
              if (_.includes(_.get(psInfo.value, 'nodeList', []), nodeId)) {
                placeId = _.get(psInfo.value, 'placeId');
                break;
              }
              psInfo = psIterator.next();
            }
          }

          this.mdNodeStorage.set(nodeId, {
            nodeId,
            nodeName,
            isSensor,
            dataUnit,
            placeId,
            axisScale,
            moveScale,
            point: [],
            mdPlaceInfo: this.mdPlaceStorage.get(placeId),
            svgModelResource: this.mdMapStorage.get(resourceId),
          });
        });
      });
    });

    // BU.CLIN(this.mNodeStorage);
  }

  /**
   * SetInfo SVG Place List 정의
   */
  setSvgPlaceList() {
    this.mdPlaceStorage.forEach(mdPlaceInfo => {
      const {
        placeId,
        placeName,
        point: [x1, y1, x2, y2],
        svgModelResource: {
          id,
          type: modelType,
          elementDrawInfo,
          elementDrawInfo: {
            width,
            height,
            color,
            strokeInfo: {
              color: strokeColor = STROKE_INFO.color,
              linecap = STROKE_INFO.linecap,
              width: strokeWidth = STROKE_INFO.width,
            } = {},
          },
        },
      } = mdPlaceInfo;

      let svgPosPoint = []; // [x1,y1,x2,y2]

      switch (modelType) {
        case 'rect':
        case 'pattern':
        case 'image':
          svgPosPoint = [x1, y1, x1 + width, y1 + height];
          break;
        case 'line':
          svgPosPoint =
            y1 === y2
              ? // 수평으로 라인을 그을 경우
                [x1, y1 - width / 2, x2, y2 - width / 2]
              : // 수직으로 라인을 그을 경우
                [x1 - width / 2, y1 - width, x2 - width / 2, y2 + width];
          break;

        default:
          break;
      }
      // 장소 위치정보 업데이트
      mdPlaceInfo.point = svgPosPoint;
      elementDrawInfo.color = Array.isArray(color) ? color : [color];
      elementDrawInfo.strokeInfo = {
        color: strokeColor,
        linecap,
        width: strokeWidth,
      };

      this.mSvgPlaceList.push({
        id: placeId,
        name: placeName,
        point: svgPosPoint,
        resourceId: id,
      });
    });

    // BU.CLIN(this.mSvgPlaceList);
  }

  setSvgNodeList() {
    /** @type {mSvgNodeInfo} */
    const temp = { nodeDefId: 'test', is_sensor: 0, svgPositonList: [] };

    // this.mSvgNodeList.push(temp);

    this.mdNodeStorage.forEach(mdNodeInfo => {
      // BU.CLIN(mdNodeInfo);
      const {
        nodeId,
        nodeName,
        isSensor,
        axisScale: [axisX = 0, axisY = 0] = [],
        moveScale: [moveX = 0, moveY = 0] = [],
        mdPlaceInfo: {
          placeId,
          point: [px1, py1, px2, py2],
          svgModelResource: pSvgModel,
        },
        svgModelResource: {
          id: nodeModelId,
          type: nodeType,
          elementDrawInfo,
          elementDrawInfo: {
            width: nModelWidth,
            height: nModelHeight,
            radius: nModelRadius,
            color,
            strokeInfo: {
              color: strokeColor = STROKE_INFO.color,
              linecap = STROKE_INFO.linecap,
              width: strokeWidth = STROKE_INFO.width,
            } = {},
          },
          textStyleInfo: nTextStyleInfo,
        },
      } = mdNodeInfo;

      // BU.CLI('wtf');
      // 노드 중심축 좌표
      const nodeAxis = [];
      let nAxisX;
      let nAxisY;

      const pModelWidth = px2 - px1;
      const pModelHeight = py2 - py1;

      nAxisX = px1 + axisX * pModelWidth;
      nAxisY = py1 + axisY * pModelHeight;

      switch (nodeType) {
        case 'rect':
          nAxisX -= axisX * nModelWidth - moveX * nModelWidth;
          nAxisY -= axisY * nModelHeight - moveY * nModelHeight;
          break;
        case 'circle':
          nAxisX -= axisX * nModelRadius - moveX * nModelRadius;
          nAxisY -= axisY * nModelRadius - moveY * nModelRadius;
          break;
        case 'polygon':
          nAxisX -= axisX * (nModelWidth * 2) - moveX * (nModelWidth * 2);
          nAxisY -= axisY * (nModelHeight * 2) - moveY * (nModelHeight * 2);
          break;
        default:
          break;
      }

      mdNodeInfo.point = [nAxisX, nAxisY];
      elementDrawInfo.color = Array.isArray(color) ? color : [color];
      elementDrawInfo.strokeInfo = {
        color: strokeColor,
        linecap,
        width: strokeWidth,
      };

      // BU.CLIN(mdNodeInfo.point);

      // temp.svgPositonList.push({
      this.mSvgNodeList.push({
        id: nodeId,
        name: nodeName,
        placeId,
        is_sensor: isSensor,
        point: mdNodeInfo.point,
        resourceId: nodeModelId,
      });

      //
    });

    // BU.CLIN(this.mSvgNodeList, 3);
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
