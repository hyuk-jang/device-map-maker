const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const { BU } = require('base-util-jh');

const { SOURCE_PATH, SOURCE_FILE } = process.env;

const mapPath = path.join(process.cwd(), 'src', 'maps', SOURCE_PATH, SOURCE_FILE);

/** @type {mDeviceMap} */
// eslint-disable-next-line import/no-dynamic-require
const map = require(mapPath);

require('./module').di;

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
        positionInfo,
        positionInfo: { svgNodeList = [], svgPlaceList = [], svgCmdList = [] } = {},
      },
      setInfo: { nodeStructureList },
      relationInfo: { placeRelationList },
      controlInfo: { setCmdList = [], flowCmdList = [], scenarioCmdList = [] },
    } = map;

    // SVG Drawing 리소스를 저장하는 목록
    this.mSvgModelResourceList = svgModelResourceList;

    // Position SVG 장소 목록, Node 목록
    this.mSvgPlaceList = svgPlaceList;
    this.mSvgNodeList = svgNodeList;
    this.mSvgCmdList = svgCmdList;
    // 선언이 안되어있을 경우를 대비하여 재정의
    positionInfo.svgPlaceList = svgPlaceList;
    positionInfo.svgNodeList = svgNodeList;
    positionInfo.svgCmdList = svgCmdList;

    // SetInfo 노드 구조 정의 목록
    this.mNodeStructureList = nodeStructureList;

    // RelationInfo 장소 관계 목록, SVG Resouce 관계 목록
    this.mPlaceRelationList = placeRelationList;

    // SVG를 생성할 명령 목록
    this.mSetCmdList = setCmdList;
    this.mFlowCmdList = flowCmdList;
    this.mScenarioCmdList = scenarioCmdList;
  }

  /**
   * @return {mDeviceMap}
   */
  async makeSvgMapFile() {
    // Step 1: Node, Place Storage 생성
    this.init();

    // Step 2: Svg Place Position 목록 생성
    this.setSvgPlaceList();
    // BU.CLIN(this.mdPlaceStorage);

    // Step 3: Svg Node Position 목록 생성
    this.setSvgNodeList();
    // BU.CLIN(this.mdNodeStorage);

    // Step 4: Svg Command Position 목록 생성
    this.setSvgCmdList();

    // Step 4: Map File 생성
    await this.writeMapFile();

    return map;
  }

  /**
   * Map 초기화 진행
   * Map<placeId, mdPlaceInfo>, Map<nodeId, mdNodeInfo> 생성
   * Step 1: Node, Place Storage 생성
   */
  init() {
    // svgModelResourceList 생성
    /** @type {Map<string, mSvgModelResource>} */
    this.mdMapStorage = new Map();
    this.mSvgModelResourceList.forEach(modelInfo => {
      const { id } = modelInfo;
      this.mdMapStorage.set(id, modelInfo);
    });

    // PlaceRelationList을 순회하면서 Map<placeId, mSvgStorageInfo> 세팅
    /** @type {Map<string, mdPlaceInfo>} */
    this.mdPlaceStorage = new Map();

    this.mPlaceRelationList.forEach(pClassInfo => {
      const { defList, target_name: pcName } = pClassInfo;
      defList.forEach(pDefInfo => {
        const {
          target_prefix: pdPrefix,
          target_name: pdName = pcName,
          placeList = [],
        } = pDefInfo;
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

    // SetInfo NodeStrutureList 를 순회하면서 Map<placeId, mSvgStorageInfo> 세팅
    /** @type {Map<string, mdNodeInfo>} nodeId를 기준으로 nodeInfo 정보를 저장할 Map */
    this.mdNodeStorage = new Map();

    this.mNodeStructureList.forEach(nClassInfo => {
      const {
        defList,
        is_sensor: isSensor,
        target_id: ncId,
        target_name: ncName,
        data_unit: dataUnit,
      } = nClassInfo;

      defList.forEach(nDefInfo => {
        const {
          nodeList = [],
          target_prefix: ndPrefix,
          target_name: ndName = ncName,
        } = nDefInfo;

        nodeList.forEach(nodeInfo => {
          const {
            target_code: nCode,
            target_name: nName,
            svgNodePosOpt = {},
            svgNodePosOpt: { resourceId, axisScale, moveScale } = {},
          } = nodeInfo;

          let { svgNodePosOpt: { placeId } = {} } = nodeInfo;

          // SVG Node의 위치 설정 정보가 없을 경우 추가하지 않음
          if (_.isEmpty(svgNodePosOpt)) {
            return false;
          }

          const nodeId = `${ndPrefix}${nCode ? `_${nCode}` : ''}`;
          let nodeName;
          if (typeof nName === 'string' && nName.length) {
            nodeName = nName;
          } else {
            nodeName = `${ndName}${nCode ? `_${nCode}` : ''}`;
          }

          // 노드를 포함하는 Place Id 목록
          const placeIdList = [];

          this.mdPlaceStorage.forEach(mdPlaceInfo => {
            const { nodeList: mdPlaceNodeList, placeId: mdPlaceId } = mdPlaceInfo;
            if (mdPlaceNodeList.includes(nodeId)) {
              placeIdList.push(mdPlaceId);

              // placeId의 정보가 없다면 placeRelation에 있는지 찾아서 정의
              if (placeId === '' || placeId === undefined) {
                placeId = mdPlaceId;
              }
            }
          });

          this.mdNodeStorage.set(nodeId, {
            ncId,
            ndName,
            nodeId,
            nodeName,
            isSensor,
            dataUnit,
            placeId,
            axisScale,
            moveScale,
            point: [],
            placeIdList,
            placeNameList: placeIdList.map(pId => this.mdPlaceStorage.get(pId).placeName),
            mdPlaceInfo: this.mdPlaceStorage.get(placeId),
            svgModelResource: this.mdMapStorage.get(resourceId),
          });
        });
      });
    });

    /** @type {Map<string, mdCmdInfo>} */
    this.mdCmdStorage = new Map();
    // SVG를 그릴 항목은 SET, FLOW, SCENARIO

    // 설정 명령
    this.mSetCmdList.forEach(setCmdInfo => {
      const { cmdId, cmdName, svgNodePosOpt } = setCmdInfo;

      this.setCmdStorage('SET', cmdId, cmdName, svgNodePosOpt);
    });

    // 흐름 명령
    this.mFlowCmdList.forEach(flowCmdInfo => {
      const { destList = [], srcPlaceId } = flowCmdInfo;
      let { srcPlaceName } = flowCmdInfo;

      // srcName이 사용자가 지정하지 않았을 경우 Place 저장소에서 이름 추출
      if (srcPlaceName === undefined) {
        srcPlaceName = this.mdPlaceStorage.get(srcPlaceId).placeName;
        flowCmdInfo.srcPlaceName = srcPlaceName;
      }
      // 목적지 순회
      destList.forEach(destInfo => {
        const { destPlaceId, svgNodePosOpt } = destInfo;
        let { destPlaceName } = destInfo;
        // 도착지 이름이 지정되지 않았을 경우 place 저장소에서 이름 추출하여 정의
        if (destPlaceName === undefined) {
          destPlaceName = this.mdPlaceStorage.get(destPlaceId).placeName;
          destInfo.destPlaceName = destPlaceName;
        }

        const cmdId = `${srcPlaceId}_TO_${destPlaceId}`;
        const cmdName = `${srcPlaceName}_TO_${destPlaceName}`;

        this.setCmdStorage('FLOW', cmdId, cmdName, svgNodePosOpt);
      });
    });

    // 시나리오 명령
    this.mScenarioCmdList.forEach(scenarioCmdInfo => {
      const { scenarioId: cmdId, scenarioName: cmdName, svgNodePosOpt } = scenarioCmdInfo;

      this.setCmdStorage('SCENARIO', cmdId, cmdName, svgNodePosOpt);
    });
    // console.dir(this.mCmdStorage);
  }

  /** Step 2: Svg Place Position 목록 생성 */
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
          elementDrawInfo: { width, height, color, svgClass },
        },
      } = mdPlaceInfo;

      let svgPosPoint = []; // [x1,y1,x2,y2]

      switch (modelType) {
        case 'rect':
        case 'pattern':
        case 'image':
        case 'diamond':
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
      // svgClass가 존재하고 스트링일 경우 배열로 변환하여 저장
      if (svgClass && typeof svgClass === 'string' && svgClass.length) {
        elementDrawInfo.svgClass = [svgClass];
      }

      if (!svgPosPoint.every(point => _.isNumber(point))) {
        throw new Error(`placeId: ${placeId} is not defined point`);
      }

      this.mSvgPlaceList.push({
        id: placeId,
        name: placeName,
        point: svgPosPoint,
        resourceId: id,
      });
    });
  }

  /** Step 3: Svg Node Position 목록 생성 */
  setSvgNodeList() {
    this.mdNodeStorage.forEach(mdNodeInfo => {
      // BU.CLIN(mdNodeInfo);
      const {
        nodeId,
        nodeName,
        isSensor,
        axisScale,
        moveScale,
        mdPlaceInfo,
        svgModelResource,
      } = mdNodeInfo;

      this.mSvgNodeList.push({
        id: nodeId,
        name: nodeName,
        cursor: isSensor === 0 ? 'pointer' : '',
        is_sensor: isSensor,
        resourceId: svgModelResource.id,
        placeId: mdPlaceInfo.placeId,
        point: this.calcSvgElementPoint(
          axisScale,
          moveScale,
          mdPlaceInfo,
          svgModelResource,
        ),
      });
    });
  }

  /** Step 4: Svg Node Position 목록 생성 */
  setSvgCmdList() {
    this.mdCmdStorage.forEach(cmdInfo => {
      const {
        cmdFormat,
        cmdId,
        cmdName,
        axisScale,
        moveScale,
        mdPlaceInfo,
        svgModelResource,
      } = cmdInfo;

      this.mSvgCmdList.push({
        cmdFormat,
        id: cmdId,
        name: cmdName,
        cursor: 'pointer',
        resourceId: svgModelResource.id,
        placeId: mdPlaceInfo.placeId,
        point: this.calcSvgElementPoint(
          axisScale,
          moveScale,
          mdPlaceInfo,
          svgModelResource,
        ),
      });
    });

    // BU.CLI(this.mSvgCmdList);
  }

  /** Step 4: Map File 생성 */
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
   * SVG Element 실제 배치 좌표 계산 및 속성 갱신
   * @param {number=} axisScale
   * @param {number=} moveScale
   * @param {mdPlaceInfo} mdPlaceInfo
   * @param {mSvgModelResource} svgModelResource
   */
  calcSvgElementPoint(axisScale = [], moveScale = [], mdPlaceInfo, svgModelResource) {
    const [axisX = 0, axisY = 0] = axisScale;
    const [moveX = 0, moveY = 0] = moveScale;

    const {
      point: [px1, py1, px2, py2],
    } = mdPlaceInfo;

    const {
      type: elementType,
      elementDrawInfo,
      elementDrawInfo: {
        width: nModelWidth,
        height: nModelHeight,
        radius: nModelRadius,
        color,
        svgClass,
      },
      textStyleInfo,
      textStyleInfo: { dataColor } = {},
    } = svgModelResource;

    elementDrawInfo.color = Array.isArray(color) ? color : [color];
    // svgClass가 존재하고 스트링일 경우 배열로 변환하여 저장
    if (svgClass && typeof svgClass === 'string' && svgClass.length) {
      elementDrawInfo.svgClass = [svgClass];
    }

    // 데이터 색상을 배열 형식으로 변환
    if (dataColor === undefined || dataColor === '') {
      delete textStyleInfo.dataColor;
    } else if (!Array.isArray(dataColor)) {
      textStyleInfo.dataColor = [dataColor];
    }

    let svgAxisX;
    let svgAxisY;

    const pModelWidth = px2 - px1;
    const pModelHeight = py2 - py1;

    svgAxisX = px1 + axisX * pModelWidth;
    svgAxisY = py1 + axisY * pModelHeight;

    switch (elementType) {
      case 'rect':
      case 'diamond':
        svgAxisX -= axisX * nModelWidth - moveX * nModelWidth;
        svgAxisY -= axisY * nModelHeight - moveY * nModelHeight;
        break;
      case 'circle':
      case 'rhombus':
        svgAxisX -= axisX * nModelRadius * 2 - moveX * nModelRadius * 2;
        svgAxisY -= axisY * nModelRadius * 2 - moveY * nModelRadius * 2;
        break;
      case 'polygon':
        svgAxisX -= axisX * (nModelWidth * 2) - moveX * (nModelWidth * 2);
        svgAxisY -= axisY * (nModelHeight * 2) - moveY * (nModelHeight * 2);
        break;
      default:
        break;
    }

    return [svgAxisX, svgAxisY];
  }

  /**
   * mCmdStorage에 Map 요소를 추가하기 위한 메소드
   * @param {string} cmdFormat
   * @param {string} cmdId
   * @param {string} cmdName
   * @param {svgNodePosOpt} svgNodePosOpt
   */
  setCmdStorage(cmdFormat, cmdId, cmdName, svgNodePosOpt) {
    if (_.isEmpty(svgNodePosOpt)) {
      return false;
    }
    const { placeId, resourceId, axisScale, moveScale } = svgNodePosOpt;

    this.mdCmdStorage.set(cmdId, {
      cmdFormat,
      cmdId,
      cmdName,
      axisScale,
      moveScale,
      mdPlaceInfo: this.mdPlaceStorage.get(placeId),
      svgModelResource: this.mdMapStorage.get(resourceId),
    });
  }
}
module.exports = SvgMaker;
