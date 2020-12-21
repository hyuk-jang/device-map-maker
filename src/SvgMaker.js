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
        positionInfo = {},
        positionInfo: { svgNodeList = [], svgPlaceList = [], svgCmdList = [] } = {},
      },
      setInfo: { nodeStructureList },
      relationInfo: { placeRelationList, imgTriggerList = [] },
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
    map.drawInfo.positionInfo = positionInfo;

    // SetInfo 노드 구조 정의 목록
    this.mNodeStructureList = nodeStructureList;

    // RelationInfo 장소 관계 목록, SVG Resouce 관계 목록
    this.mPlaceRelationList = placeRelationList;

    // 이미지 트리거 목록
    this.mImgTriggerList = imgTriggerList;

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

    // Step 5: Img 복사
    await this.copyAndPasteImg();

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
      const {
        id,
        elementDrawInfo,
        elementDrawInfo: { width, height },
      } = modelInfo;
      // 자바스크립트 계산식 로직에 의한 소수점 생성부분 삭제
      typeof width === 'number' && _.set(elementDrawInfo, 'width', _.round(width, 3));
      typeof height === 'number' && _.set(elementDrawInfo, 'height', _.round(height, 3));

      this.mdMapStorage.set(id, modelInfo);
    });

    // PlaceRelationList을 순회하면서 Map<placeId, mSvgStorageInfo> 세팅
    /** @type {Map<string, mdPlaceInfo>} */
    this.mdPlaceStorage = new Map();

    this.mPlaceRelationList.forEach(pClassInfo => {
      const { defList = [], target_name: pcName } = pClassInfo;
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
            target_name: pName = '',
            nodeList = [],
            svgPositionInfo: { point, resourceId } = {},
          } = pInfo;

          // svgPositionInfo 정보가 없다면 추가하지 않음
          if (resourceId === undefined) return false;

          // Place ID 정의
          const placeId = `${pdPrefix}${pCode ? `_${pCode}` : ''}`;
          // 사용자 지정 이름이 있을 경우 사용
          const placeName =
            pName.length > 0 ? pName : `${pdName}${pCode ? ` ${pCode}` : ''}`;

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
        defList = [],
        is_sensor: isSensor = 1,
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
            svgNodePosOpt: { axisScale, moveScale, tblIndex } = {},
          } = nodeInfo;

          let { svgNodePosOpt: { placeId, resourceId } = {} } = nodeInfo;

          // SVG Node의 위치 설정 정보가 없을 경우 추가하지 않음
          if (_.isEmpty(svgNodePosOpt)) {
            return false;
          }

          const nodeId = `${ndPrefix}${nCode ? `_${nCode}` : ''}`;
          let nodeName;
          if (typeof nName === 'string' && nName.length) {
            nodeName = nName;
          } else {
            nodeName = `${ndName}${nCode ? ` ${nCode}` : ''}`;
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
                svgNodePosOpt.placeId = placeId;
              }
            }
          });

          // 자원이 존재하지 않으나 테이블 형식일 경우 노드를 포함하는 장소의 자원을 정의
          if (resourceId === undefined && typeof tblIndex === 'number') {
            resourceId = this.mdPlaceStorage.get(placeId).svgModelResource.id;
            svgNodePosOpt.resourceId = resourceId;
          }

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
            tblIndex,
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
      const { cmdId, cmdName, svgNodePosOpt } = scenarioCmdInfo;

      this.setCmdStorage('SCENARIO', cmdId, cmdName, svgNodePosOpt);
    });
    // console.dir(this.mCmdStorage);

    this.mImgTriggerList.forEach(imgTriggerInfo => {
      const { fileName, folderPath = '' } = imgTriggerInfo;

      const pathList = ['map'];

      Array.isArray(folderPath)
        ? pathList.splice(1, 0, ...folderPath)
        : pathList.push(folderPath);

      pathList.push(fileName);

      imgTriggerInfo.filePath = path.join(...pathList);
    });
  }

  /** Step 2: Svg Place Position 목록 생성 */
  setSvgPlaceList() {
    this.mdPlaceStorage.forEach(mdPlaceInfo => {
      // BU.CLI(mdPlaceInfo);
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
      mdPlaceInfo.point = svgPosPoint.map(point => _.round(point, 2));

      typeof width === 'number' && _.set(elementDrawInfo, 'width', _.round(width, 3));
      typeof height === 'number' && _.set(elementDrawInfo, 'height', _.round(height, 3));

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
        point: mdPlaceInfo.point,
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
        tblIndex,
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
        tblIndex,
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
    const outputProjectMapPath = path.join(
      process.cwd(),
      'out',
      SOURCE_PATH,
      SOURCE_FILE,
      'defaultMap.js',
    );
    // const outputBase64Path = path.join(process.cwd(), 'out', 'defaultBase64.js');
    // 이미지 사용될 경우 defaultMap.png 로 저장
    // const outputImgPath = path.join(process.cwd(), 'out', 'defaultMap.png');
    // const outputProjectMapPath = path.join(
    //   process.cwd(),
    //   'out',
    //   SOURCE_PATH,
    //   SOURCE_FILE,
    //   `output_${SOURCE_FILE}.js`,
    // );

    // const isExistMapImg = await fs.existsSync(inputMapImgPath);
    // // 이미지가 존재할 경우 복사본 생성
    // if (isExistMapImg) {
    //   fs.createReadStream(inputMapImgPath).pipe(fs.createWriteStream(outputImgPath));

    //   // const imgAsBase64 = fs.readFileSync(inputMapImgPath, 'base64');
    //   // await BU.writeFile(
    //   //   outputBase64Path,
    //   //   `module.exports = 'data:image/png;base64,${imgAsBase64}'`,
    //   //   'w',
    //   // );
    // } else if (fs.existsSync(outputImgPath)) {
    //   // 프로젝트 이미지가 존재하지 않고 out 경로에 생성된 이미지가 존재할 경우 해당 이미지 삭제
    //   await fs.accessSync(outputImgPath, fs.constants.F_OK);
    //   fs.unlink(outputImgPath, console.error);
    // }
    // 모듈화
    const finalStrMap = `module.exports = ${JSON.stringify(map)}`;

    await BU.writeFile(outputMapPath, finalStrMap, 'w');

    await BU.writeFile(outputProjectMapPath, finalStrMap, 'w');
  }

  /**
   * Step 5: 이미지 복사 붙여넣기
   */
  async copyAndPasteImg() {
    const pastePath = path.join(process.cwd(), 'out', SOURCE_PATH, SOURCE_FILE);

    const imgExt = ['png', 'jpg', 'jpeg', 'gif'];

    fs.readdirSync(mapPath).forEach(file => {
      const copyFilePath = path.join(mapPath, file);
      const pasteFilePath = path.join(pastePath, file);
      const lastDotIndex = file.lastIndexOf('.');

      // 이미지 일 경우에만 생성
      lastDotIndex > 0 &&
        imgExt.includes(file.slice(lastDotIndex + 1)) &&
        fs.createReadStream(copyFilePath).pipe(fs.createWriteStream(pasteFilePath));
    });

    // 하위 폴더 읽음
    BU.getDirectories(mapPath).forEach(folder => {
      const copyFolderPath = path.join(mapPath, folder);
      const pasteFolderPath = path.join(pastePath, folder);
      // 폴더 없으면 생성
      !fs.existsSync(pastePath) && fs.mkdirSync(pastePath);

      fs.readdirSync(copyFolderPath).forEach(file => {
        const copyImgPath = path.join(copyFolderPath, file);
        const pasteImgPath = path.join(pasteFolderPath, file);

        // 하위 이미지 폴더 없으면 생성
        !fs.existsSync(pasteFolderPath) && fs.mkdirSync(pasteFolderPath);

        fs.createReadStream(copyImgPath).pipe(fs.createWriteStream(pasteImgPath));
      });
    });
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
      textStyleInfo = {},
      textStyleInfo: { dataColor, anchor } = {},
    } = svgModelResource;

    // anchor 변환 설정
    if (typeof anchor === 'number') {
      let strAnchor = '';
      switch (anchor) {
        case 0:
          strAnchor = 'start';
          break;
        case 1:
          strAnchor = 'middle';
          break;
        case 2:
          strAnchor = 'end';
          break;
        default:
          break;
      }

      if (strAnchor.length) {
        textStyleInfo.anchor = strAnchor;
      }
    }

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

    return [_.round(svgAxisX, 2), _.round(svgAxisY, 2)];
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
