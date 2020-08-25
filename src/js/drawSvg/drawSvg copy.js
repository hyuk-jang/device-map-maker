const TRUE_DATA = '1';
const FALSE_DATA = '0';
const ERROR_DATA = '-1';

var _ = _;
var $ = $;
var SVG = SVG;
/** @type {mDeviceMap} */
const realMap = map;

const {
  drawInfo: {
    frame: {
      mapInfo: { width: mapWidth, height: mapHeight, backgroundInfo },
      svgModelResourceList,
    },
    positionInfo: { svgNodeList, svgPlaceList },
  },
  setInfo: { nodeStructureList },
  relationInfo: { placeRelationList },
} = realMap;

// svgModelResourceList 생성
/** @type {Map<string, mSvgModelResource>} */
const mdMapStorage = new Map();

/** @type {Map<string, mdPlaceInfo>} */
const mdPlaceStorage = new Map();

/** @type {Map<string, mdNodeInfo>} nodeId를 기준으로 nodeInfo 정보를 저장할 Map */
const mdNodeStorage = new Map();

/**
 * Map 초기화 진행
 * Map<placeId, mdPlaceInfo>, Map<nodeId, mdNodeInfo> 생성
 */
function initDrawSvg() {
  // svgModelResourceList 생성
  svgModelResourceList.forEach(modelInfo => {
    const { id } = modelInfo;
    mdMapStorage.set(id, modelInfo);
  });

  // PlaceRelationList을 순회하면서 Map<placeId, mSvgStorageInfo> 세팅
  placeRelationList.forEach(pClassInfo => {
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

        mdPlaceStorage.set(placeId, {
          placeId,
          placeName,
          nodeList,
          point,
          svgModelResource: mdMapStorage.get(resourceId),
        });
      });
    });
  });

  nodeStructureList.forEach(nClassInfo => {
    const { defList, is_sensor: isSensor = 1, target_name: ncName } = nClassInfo;
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
          const psIterator = mdPlaceStorage.values();

          let psInfo = psIterator.next();

          while (!psInfo.done) {
            if (_.includes(_.get(psInfo.value, 'nodeList', []), nodeId)) {
              placeId = _.get(psInfo.value, 'placeId');
              break;
            }
            psInfo = psIterator.next();
          }
        }

        mdNodeStorage.set(nodeId, {
          nodeId,
          nodeName,
          isSensor,
          placeId,
          axisScale,
          moveScale,
          point: [],
          mdPlaceInfo: mdPlaceStorage.get(placeId),
          svgModelResource: mdMapStorage.get(resourceId),
        });
      });
    });
  });
}

const SVG_TYPE = {
  place: undefined,
  device: 0,
  sensor: 1,
  non: -1,
};

/**
 *
 * @param {mdNodeInfo} svgPositionInfo
 */
function getSvgType(svgPositionInfo) {
  const { id: nodeId, placeId } = svgPositionInfo;

  return placeId === undefined ? SVG_TYPE.place : mdNodeStorage.get(nodeId).isSensor;
}

/**
 * 그림자
 * @param {SVG} model 그려질 장소.
 * @param {mSvgPositionInfo} svgPositionInfo 장소와 노드를 구분하기 위한 장소 또는 노드의 defId 값
 */
function drawSvgShadow(model, svgPositionInfo) {
  console.log(model);
  if (getSvgType === SVG_TYPE.sensor) {
    model.attr({ name: 'sensor' });
    model.filter(add => {
      const blur = add.offset(0, 0).in(add.sourceAlpha);

      add.blend(add.source, blur);
    });
  } else {
    model.filter(add => {
      const blur = add.offset(7, 7).in(add.sourceAlpha).gaussianBlur(4);

      add.blend(add.source, blur);
    });
  }
}

/**
 * 사각형
 * @param {svgDrawInfo} svgDrawInfo
 */
function drawSvgRect(svgDrawInfo) {
  // console.dir(svgDrawInfo);
  const {
    svgCanvas,
    svgPositionInfo,
    svgPositionInfo: {
      id: positionId,
      point: [x, y],
    },
    svgModelResource: {
      elementDrawInfo,
      elementDrawInfo: { width, height, radius = 1 },
    },
    isShow = true,
  } = svgDrawInfo;

  let { color, opacity = 1 } = elementDrawInfo;

  opacity = isShow ? opacity : 0;

  // color가 배열이 아니면 배열로 변환
  color = Array.isArray(color) ? color : [color];

  const model = svgCanvas.rect(width, height).fill(color[0]).move(x, y).radius(radius).attr({
    id: positionId,
    radius,
    opacity,
  });
  drawSvgShadow(model, svgPositionInfo);
}

/**
 * 줄
 * @param {SVG} svgCanvas
 * @param {number[]} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color}
 * @param {string} id 그려지는 svg 도형에 주어줄 id 값
 * @param {Boolean=} isShow true: 화면 표시 (기본값), false: 숨김
 */
function drawSvgLine(svgCanvas, point, elementDrawInfo, id, isShow = true) {
  const [x1, y1, x2, y2] = point;
  const { width } = elementDrawInfo;
  let { color, opacity = 1 } = elementDrawInfo;

  isShow ? opacity : (opacity = 0);

  // color가 배열이 아니면 배열로 변환
  color = Array.isArray(color) ? color : [color];

  svgCanvas.line(x1, y1, x2, y2).stroke({ color: color[0], width, opacity }).attr({
    id,
  });
}

/**
 * 원
 * @param {SVG} svgCanvas
 * @param {number[]} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color}
 * @param {string} id 그려지는 svg 도형에 주어줄 id 값
 * @param {Boolean=} isShow true: 화면 표시 (기본값), false: 숨김
 */
function drawSvgCircle(svgCanvas, point, elementDrawInfo, id, isShow = true) {
  const [x, y] = point;
  let { color, opacity = 1 } = elementDrawInfo;
  const { radius } = elementDrawInfo;

  isShow ? opacity : (opacity = 0);

  // color가 배열이 아니면 배열로 변환
  color = Array.isArray(color) ? color : [color];
  const model = svgCanvas.circle(radius).fill(color[0]).move(x, y).stroke({ width: 0.5 }).attr({
    id,
    opacity,
  });
  drawSvgShadow(model, id);
}

/**
 * 다각형
 * @param {SVG} svgCanvas
 * @param {number[]} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color}
 * @param {string} id 그려지는 svg 도형에 주어줄 id 값
 * @param {Boolean=} isShow true: 화면 표시 (기본값), false: 숨김
 */
function drawSvgPolygon(svgCanvas, point, elementDrawInfo, id, isShow = true) {
  const [x, y] = point;
  const { width, height } = elementDrawInfo;
  let { color, opacity = 1 } = elementDrawInfo;

  isShow ? opacity : (opacity = 0);

  // color가 배열이 아니면 배열로 변환
  color = Array.isArray(color) ? color : [color];

  const model = svgCanvas.polyline(
    `${width},${0} ${width * 2},${height} ${width},${height * 2} ${0},${height}`,
  );
  model.fill(color[0]).move(x, y).stroke({ width: 0.5 }).attr({
    id,
    opacity,
  });
  drawSvgShadow(model, id);
}

/**
 * 패턴 방식 (바둑판 등)
 * @param {SVG} svgCanvas
 * @param {number[]} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color}
 * @param {string} id 그려지는 svg 도형에 주어줄 id값
 * @param {Boolean=} isShow true: 화면 표시 (기본값), false: 숨김
 */
function drawSvgPattern(svgCanvas, point, elementDrawInfo, id, isShow = true) {
  const [x, y] = point;
  const { width, height, radius = 1 } = elementDrawInfo;
  let { color, opacity = 1 } = elementDrawInfo;

  isShow ? opacity : (opacity = 0);

  // color가 배열이 아니면 배열로 변환
  color = Array.isArray(color) ? color : [color];

  // 그림자를 적용하기위해 pattern 뒤에 사각형 그리기.
  const model = svgCanvas.rect(width, height);
  model.move(x, y).stroke({ color: 'black' });

  drawSvgShadow(model, id);

  // pattern 안의 작은 사각형의 크기
  const patternSize = 21;
  const pattern = svgCanvas.pattern(patternSize, patternSize, add => {
    add.rect(patternSize, patternSize).fill('white');
    add.rect(patternSize, patternSize).move(0.4, 0.4).fill(color[0]).radius(radius).attr({
      opacity,
    });
  });
  svgCanvas.rect(width, height).move(x, y).fill(pattern).attr({
    id,
    opacity,
  });
}

/**
 * 이미지
 * @param {SVG} svgCanvas
 * @param {number[]} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color}
 * @param {string} id 그려지는 svg 도형에 주어줄 id값
 * @param {Boolean=} isShow true: 화면 표시 (기본값), false: 숨김
 */
function drawSvgImage(svgCanvas, point, elementDrawInfo, id, isShow = true) {
  const [x, y] = point;
  const { width, height, imgUrl, radius = 1 } = elementDrawInfo;
  let { opacity = 1 } = elementDrawInfo;

  isShow ? opacity : (opacity = 0);

  const model = svgCanvas.image(imgUrl).move(x, y).size(width, height).attr({
    id,
    radius,
    opacity,
  });
  drawSvgShadow(model, id);
}

/**
 * svg.js 의 도형별 그리기 이벤트를 모음
 * @param {svgDrawInfo} svgDrawInfo
 */
function drawSvgElement(svgDrawInfo) {
  console.log(svgDrawInfo);
  const {
    svgModelResource: { type: svgModelType },
  } = svgDrawInfo;
  switch (svgModelType) {
    case 'rect':
      drawSvgRect(svgDrawInfo);
      break;
    case 'image':
      drawSvgImage(svgDrawInfo);
      break;
    case 'line':
      drawSvgLine(svgDrawInfo);
      break;
    case 'circle':
      drawSvgCircle(svgDrawInfo);
      break;
    case 'polygon':
      drawSvgPolygon(svgDrawInfo);
      break;
    case 'pattern':
      drawSvgPattern(svgDrawInfo);
      break;
    default:
      break;
  }
}

/**
 * @param {string} documentId // 그려질 div의 id 값
 * @param {string=} isKorText // 장소, 장치, 센서 한글로 표현 유무
 */
function drawSvgBasePlace(documentId, isKorText = true) {
  const textLang = isKorText ? 'ko' : 'en';
  const { backgroundData = '', backgroundPosition = [0, 0] } = backgroundInfo;
  const svgCanvas = SVG().addTo(`#${documentId}`).size('100%', '100%');

  // canvas 정의
  svgCanvas.attr({
    id: 'svgCanvas',
    class: 'svg_map',
    preserveAspectRatio: 'xMidYMin meet',
    lang: textLang,
  });

  // 브라우저 크기에 반응하기 위한 뷰박스 세팅
  svgCanvas.viewbox(0, 0, mapWidth, mapHeight);

  // map에 배경의 데이터가 있을경우 배경 이미지 지정
  svgCanvas.image(backgroundData).move(backgroundPosition[0], backgroundPosition[1]);

  // Place 그리기
  svgPlaceList.forEach(svgPositionInfo => {
    const { resourceId } = svgPositionInfo;
    drawSvgElement({
      svgCanvas,
      svgPositionInfo,
      svgModelResource: mdMapStorage.get(resourceId),
    });
  });
}

/**
 *
 * @typedef {Object} svgDrawInfo
 * @property {SVG} svgCanvas
 * @property {mSvgPositionInfo} svgPositionInfo
 * @property {boolean} isShow default: true,  true: 화면 표시 (기본값), false: 숨김
 * @property {mSvgModelResource} svgModelResource {width, height, radius, color}
 */
