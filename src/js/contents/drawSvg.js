/** @type {{nodeId: string, nodeName: '', text: textElement}[]} */
const writtenSvgTextList = [];

/**
 * @param {string} documentId
 * @param {string=} bgImgUrl // 배경 이미지 url
 * @param {string=} title // 제목
 */
function drawSvgBackground(documentId, bgImgUrl) {
  /** @type {mDeviceMap} */
  const realMap = map;

  // svgCanvas 생성
  const { width: svgCanvasWidth, height: svgCanvasHeight } = realMap.drawInfo.frame.mapSize;
  const svgCanvas = SVG(documentId).size(svgCanvasWidth, svgCanvasHeight);
  svgCanvas.attr({ id: 'svgCanvas' });

  // 배경 이미지 지정
  const backgroundImg = svgCanvas.image(bgImgUrl, svgCanvasWidth, svgCanvasHeight);
  backgroundImg.move(0, 0);

  // Place 그리기
  realMap.drawInfo.positionInfo.svgPlaceList.forEach(svgPlaceInfo => {
    svgPlaceInfo.defList.forEach(defInfo => {
      /** @type {mSvgModelResource} */
      const resourceInfo = _.find(realMap.drawInfo.frame.svgModelResourceList, {
        id: defInfo.resourceId,
      });
      if (_.isUndefined(resourceInfo)) return false;

      drawSvgElement(
        svgCanvas,
        resourceInfo.type,
        defInfo.point,
        resourceInfo.elementDrawInfo,
        defInfo.id,
      );
      writeSvgText(svgCanvas, defInfo, resourceInfo);
    });
  });

  // node 그리기
  realMap.drawInfo.positionInfo.svgNodeList.forEach(svgNodeInfo => {
    svgNodeInfo.defList.forEach(defInfo => {
      /** @type {mSvgModelResource} */
      const resourceInfo = _.find(realMap.drawInfo.frame.svgModelResourceList, {
        id: defInfo.resourceId,
      });
      if (_.isUndefined(resourceInfo)) return false;

      drawSvgElement(
        svgCanvas,
        resourceInfo.type,
        defInfo.point,
        resourceInfo.elementDrawInfo,
        defInfo.id,
      );
      writeSvgText(svgCanvas, defInfo, resourceInfo);
    });
  });
}

/**
 * @param {string} nDefId
 * @param {number|string} data 데이터 값
 */
function showNodeData(nDefId, data = '') {
  const { dx, dy, style } = configTest('node'); // FIXME:
  let dataUnit = getDataUnit(nDefId);

  _.isNull(dataUnit) ? (dataUnit = '') : '';
  if (data === '') dataUnit = '';

  const foundSvgTextInfo = _.find(writtenSvgTextList, { id: nDefId });
  if (_.isUndefined(foundSvgTextInfo)) return false;

  // FIXME:
  // foundsvgCanvas.text.node.innerHTML = `<tspan style="font-size: 20pt;  stroke-width: 0.2" dx="1.1%" dy="10">${data}${dataUnit}</tspan>`;
  foundSvgTextInfo.text.node.innerHTML = `<tspan id="node" x=${foundSvgTextInfo.textX}>${
    foundSvgTextInfo.name
  }</tspan>`; // FIXME:
  foundSvgTextInfo.text.node.innerHTML += `<tspan id="data" x=${
    foundSvgTextInfo.textX
  } style="font-size: 15pt; fill: #05f605; stroke-width: 0.2" dy="15">${data}</tspan> <tspan id="dataUnit">${dataUnit}</tspan>`; // FIXME:

  changeNodeColor(nDefId, data);
}

/**
 *
 * @param {string} nDefId
 * @param {number|string} data
 */
function changeNodeColor(nDefId, data) {
  /** @type {mDeviceMap} */
  const realMap = map;
  let getNodeBgColor;

  realMap.drawInfo.positionInfo.svgNodeList.forEach(svgNodeInfo => {
    const foundNodeDefInfo = _.find(svgNodeInfo.defList, { id: nDefId });
    if (_.isUndefined(foundNodeDefInfo)) return false;

    const foundSvgModelResourceInfo = _.find(realMap.drawInfo.frame.svgModelResourceList, {
      id: foundNodeDefInfo.resourceId,
    });
    getNodeBgColor = foundSvgModelResourceInfo.elementDrawInfo.color;
  });

  const foundNodeInfo = _.find(realMap.drawInfo.positionInfo.svgNodeList, svgNodeInfo =>
    _.map(svgNodeInfo.defList, 'id').includes(nDefId),
  );
  if (_.isUndefined(foundNodeInfo)) return false;

  // 0: 장치, 1: 센서, -1: 미분류
  if (foundNodeInfo.is_sensor === 0) {
    const falseValList = ['CLOSE', 'CLOSING', 'OFF', 0, '0'];
    const trueValList = ['OPEN', 'OPENING', 'ON', 1, '1'];

    const isFalseValue = _.includes(falseValList, data.toUpperCase());
    const isTrueValue = _.includes(trueValList, data.toUpperCase());

    const drawedSvgElement = $(`#${nDefId}`);
    // console.log(getSvgElement);
    if (isFalseValue === true && isTrueValue === false) {
      drawedSvgElement.attr({ fill: getNodeBgColor[0] });
    } else if (isFalseValue === false && isTrueValue === true) {
      drawedSvgElement.attr({ fill: getNodeBgColor[1] });
    } else {
      drawedSvgElement.attr({ fill: getNodeBgColor[2] });
    }
  }
}

/**
 * 텍스트 그리기
 * @param {SVG} svgCanvas
 * @param {defInfo} defInfo 장치, 노드의  id, resourceId, point[] 정보
 * @param {mSvgModelResource} resourceInfo 장치, 노드의 resource id, type, elemetDrawInfo[width,height,radius,...] 정보
 * FIXME: 변수명 수정 확인
 */
function writeSvgText(svgCanvas, defInfo, resourceInfo) {
  /** @type {mDeviceMap} */
  const realMap = map;

  let [textX, textY, textSize, textColor, leading] = [0, 0, 10, '#fdfe02', '1em'];
  const { width, height, radius } = resourceInfo.elementDrawInfo;
  const [x1, y1, x2, y2] = defInfo.point;
  let anchor = 'middle';
  let naming = defInfo.name; // defInfo.name: 한글, defInfo.id: 영문

  // svgPositionList를 검색하여 장치인지 센서인지 정의
  let foundSvgInfo = _.find(realMap.drawInfo.positionInfo.svgNodeList, svgNodeInfo =>
    _.map(svgNodeInfo.defList, 'id').includes(defInfo.id),
  );
  if (_.isUndefined(foundSvgInfo)) {
    foundSvgInfo = _.find(realMap.drawInfo.positionInfo.svgPlaceList, svgNodeInfo =>
      _.map(svgNodeInfo.defList, 'id').includes(defInfo.id),
    );
  }

  // 사각형, 패턴 형식
  if (resourceInfo.type === 'rect' || resourceInfo.type === 'pattern') {
    textX = x1 + width / 2;
    textY = y1 + height / 2;
    // 노드중 sensor style 지정
    if (foundSvgInfo.is_sensor === 1) {
      textColor = 'black';
      anchor = 'middle';
      textSize = 11;
      // textX = x1 + width - 25;
    }
    // 장소 text style 지정
    if (_.isString(foundSvgInfo.placeId)) {
      textSize = 25;
      leading = '0.7em';
      // textX = x1 + 35;
      anchor = 'middle';
      textColor = '#ececec';
    }
    // 줄 형식
  } else if (resourceInfo.type === 'line') {
    if (x1 === x2) {
      textX = x1;
      textY = y1 - (y1 - y2) / 2;
    } else {
      textX = x1 + (x2 - x1) / 2;
      textY = y1;
    }
    // 원
  } else if (resourceInfo.type === 'circle') {
    textX = x1 + radius / 2;
    textY = y1 + radius / 2;
    // 마름모
  } else if (resourceInfo.type === 'polygon') {
    textX = x1 + width;
    textY = y1 + height;
  }

  // 제외목록 체크
  isExcludableText(defInfo.id) ? (naming = '') : ''; // FIXME:

  const text = svgCanvas.text(naming);
  text
    .move(textX, textY)
    .font({
      fill: textColor,
      size: textSize,
      anchor,
      leading,
      weight: 'bold',
    })

    // text 커서 모양 설정
    .attr({
      'pointer-events': 'none',
    });

  // FIXME:
  const svgNode = {
    id: defInfo.id,
    name: defInfo.name,
    textX,
    textY,
    text,
  };
  writtenSvgTextList.push(svgNode);
}

/**
 * text를 제외할 요소 찾기. 반환값이  true: 제외
 * @param {string} defId
 */
function isExcludableText(defId) {
  /** @type {mDeviceMap} */
  const realMap = map;
  let isExclusionText; // FIXME:

  const foundPlaceInfo = _.find(realMap.drawInfo.positionInfo.svgPlaceList, svgPlaceInfo =>
    _.map(svgPlaceInfo.defList, 'id').includes(defId),
  );
  if (_.isUndefined(foundPlaceInfo)) {
    const foundNodeInfo = _.find(realMap.drawInfo.positionInfo.svgNodeList, svgNodeInfo =>
      _.map(svgNodeInfo.defList, 'id').includes(defId),
    );
    isExclusionText = _.includes(
      realMap.relationInfo.exclusionTextDefIdList,
      foundNodeInfo.nodeDefId,
    );
  } else {
    isExclusionText = _.includes(
      realMap.relationInfo.exclusionTextDefIdList,
      foundPlaceInfo.placeId,
    );
  }

  return isExclusionText;
}

/**
 *
 * @param {socekt} socket
 */
function bindingClickEventNode(socket) {
  /** @type {mDeviceMap} */
  const realMap = map;

  realMap.drawInfo.positionInfo.svgNodeList.forEach(svgNodeInfo => {
    svgNodeInfo.defList.forEach(nodeDefInfo => {
      const drawedSvgElement = $(`#${nodeDefInfo.id}`);
      // console.log(drawedSvgElement)
      drawedSvgElement.on('click touchstart', e => {
        const foundSvgNodeInfo = _.find(realMap.drawInfo.positionInfo.svgNodeList, info =>
          _.map(info.defList, 'id').includes(nodeDefInfo.id),
        );
        if (_.isUndefined(foundSvgNodeInfo)) return false;

        // 장치 or 센서 구분  1: 센서, 0: 장치, -1: 미분류
        if (foundSvgNodeInfo.is_sensor === 1) {
          BootstrapDialog.show({
            title: `${nodeDefInfo.name}`,
            message: `'${
              nodeDefInfo.name
            }' 의 값을 입력하세요.: <input type="text" class="form-control">`,
            buttons: [
              {
                label: 'OK',
                action(dialogItself) {
                  const getDialogValue = dialogItself
                    .getModalBody()
                    .find('input')
                    .val();
                  if (_.isUndefined(getDialogValue)) return false;

                  executeCommand(socket, 3, nodeDefInfo.id);
                  dialogItself.close();
                },
              },
              {
                label: 'CANCEL',
                cssClass: 'btn-primary',
                action(dialogItself) {
                  dialogItself.close();
                },
              },
            ],
          });
        } else {
          BootstrapDialog.show({
            title: `${nodeDefInfo.name}`,
            message: `'${nodeDefInfo.name}' 의 상태를 변경합니다.`,
            buttons: [
              {
                label: 'OPEN',
                action(dialogItself) {
                  executeCommand(socket, 1, nodeDefInfo.id);
                  dialogItself.close();
                },
              },
              {
                label: 'CLOSE',
                action(dialogItself) {
                  executeCommand(socket, 0, nodeDefInfo.id);
                  dialogItself.close();
                },
              },
              {
                label: 'CANCEL',
                cssClass: 'btn-primary',
                action(dialogItself) {
                  dialogItself.close();
                },
              },
            ],
          });
        }
      });
    });
  });
}

/**
 *
 * @param {socket} socket
 * @param {string} controlType 0: 장치 (Close, Off), 1: 장치 (Open, On), 3: 장치 값 설정
 * @param {string} nodeId
 */
function executeCommand(socket, controlType, nodeId) {
  const requestMsg = {
    commandId: 'SINGLE',
    contents: {
      requestCommandType: 'CONTROL',
      nodeId,
      controlType,
      rank: 2,
    },
  };
  socket.emit('executeCommand', requestMsg);
}

/**
 *
 * @param {SVG} svgCanvas
 * @param {string} svgDrawType rect, polygon, circle, line ...
 * @param {Object} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color}
 * @param {string} defId 그려지는 svg 도형에 주어줄 장소 또는 노드의 defInfo.id 값
 */
function drawSvgElement(svgCanvas, svgDrawType, point, elementDrawInfo, defId) {
  switch (svgDrawType.toString()) {
    case 'rect':
      drawSvgRect(svgCanvas, point, elementDrawInfo, defId);
      break;
    case 'line':
      drawSvgLine(svgCanvas, point, elementDrawInfo, defId);
      break;
    case 'circle':
      drawSvgCircle(svgCanvas, point, elementDrawInfo, defId);
      break;
    case 'polygon':
      drawSvgPolygon(svgCanvas, point, elementDrawInfo, defId);
      break;
    case 'pattern':
      drawSvgPattern(svgCanvas, point, elementDrawInfo, defId);
      break;
    default:
      break;
  }
}

/**
 *
 * @param {SVG} svgCanvas
 * @param {number[]} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color, opactiy}
 * @param {string} id 그려지는 svg 도형에 주어줄 id 값
 */
function drawSvgRect(svgCanvas, point, elementDrawInfo, id) {
  const [x, y] = point;

  const { width, height } = elementDrawInfo;
  let { color, radius, opacity } = elementDrawInfo;

  _.isUndefined(radius) ? (radius = 1) : '';
  _.isUndefined(opacity) ? (opacity = 1) : '';

  // color가 배열이 아니면 배열로 변환
  color = Array.isArray(color) ? color : [color];
  const model = svgCanvas
    .rect(width, height)
    .fill(color[0])
    .move(x, y)
    .radius(radius)
    .attr({
      id,
      radius,
      opacity,
    });
  drawSvgShadow(model, id);
}

/**
 *
 * @param {SVG} svgCanvas
 * @param {number[]} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color}
 * @param {string} id 그려지는 svg 도형에 주어줄 id 값
 */
function drawSvgLine(svgCanvas, point, elementDrawInfo, id) {
  const [x1, y1, x2, y2] = point;
  let { width, color } = elementDrawInfo;
  // color가 배열이 아니면 배열로 변환
  color = Array.isArray(color) ? color : [color];

  svgCanvas
    .line(x1, y1, x2, y2)
    .stroke({ color: color[0], width })
    .attr({
      id,
    });
}

/**
 *
 * @param {SVG} svgCanvas
 * @param {number[]} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color}
 * @param {string} id 그려지는 svg 도형에 주어줄 id 값
 */
function drawSvgCircle(svgCanvas, point, elementDrawInfo, id) {
  const [x, y] = point;
  let { radius, color } = elementDrawInfo;
  // color가 배열이 아니면 배열로 변환
  color = Array.isArray(color) ? color : [color];

  const model = svgCanvas
    .circle(radius)
    .fill(color[0])
    .move(x, y)
    .stroke({ width: 0.5 })
    .attr({
      id,
    });
  drawSvgShadow(model, id);
}

/**
 *
 * @param {SVG} svgCanvas
 * @param {number[]} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color}
 * @param {string} id 그려지는 svg 도형에 주어줄 id 값
 */
function drawSvgPolygon(svgCanvas, point, elementDrawInfo, id) {
  const [x, y] = point;
  let { width, height, color } = elementDrawInfo;
  // color가 배열이 아니면 배열로 변환
  color = Array.isArray(color) ? color : [color];

  const model = svgCanvas.polyline(
    `${width},${0} ${width * 2},${height} ${width},${height * 2} ${0},${height}`,
  );
  model
    .fill(color[0])
    .move(x, y)
    .stroke({ width: 0.5 })
    .attr({
      id,
    });
  drawSvgShadow(model, id);
}

/**
 *
 * @param {SVG} svgCanvas
 * @param {number[]} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color}
 * @param {string} id 그려지는 svg 도형에 주어줄 id값
 */
function drawSvgPattern(svgCanvas, point, elementDrawInfo, id) {
  const [x, y] = point;
  const { width, height } = elementDrawInfo;
  let { color } = elementDrawInfo;
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
    add
      .rect(patternSize, patternSize)
      .move(0.4, 0.4)
      .fill(color[0])
      .radius(3.5);
  });
  svgCanvas
    .rect(width, height)
    .move(x, y)
    .fill(pattern)
    .attr({
      id,
    });
}

/**
 * 그림자
 * @param {SVG} model 그려질 장소.
 * @param {string} defId 장소와 노드를 구분하기 위한 장소 또는 노드의 defId 값
 */
function drawSvgShadow(model, defId) {
  if (isSensor(defId)) {
    model.filter(add => {
      const blur = add
        .offset(0, 5)
        .in(add.sourceAlpha)
        .gaussianBlur(3);
      add.blend(add.source, blur);
    });
  } else {
    model.filter(add => {
      const blur = add
        .offset(7, 7)
        .in(add.sourceAlpha)
        .gaussianBlur(4);

      add.blend(add.source, blur);
    });
  }
}

/**
 * true: 센서, false: 장소
 * @param {string} nDefId
 */
function isSensor(nDefId) {
  /** @type {mDeviceMap} */
  const realMap = map;

  const foundNodeDefInfo = _.find(realMap.drawInfo.positionInfo.svgNodeList, svgNodeInfo =>
    _.map(svgNodeInfo.defList, 'id').includes(nDefId),
  );
  if (_.isUndefined(foundNodeDefInfo)) return false;

  return true;
}

/**
 * 데이터 단위 찾기
 * @param {string} nDefId 단위를 가져올  nodeDefInfoId
 */
function getDataUnit(nDefId) {
  /** @type {mDeviceMap} */
  const realMap = map;

  const foundUnit = _.find(realMap.setInfo.nodeStructureList, nodeStructureInfo =>
    _.map(nodeStructureInfo.defList, 'target_prefix').includes(_.replace(nDefId, /[_\d]/g, '')),
  );
  if (_.isUndefined(foundUnit)) return false;
  return foundUnit.data_unit;
}

// TODO:
function configTest(tspanTagId) {
  /** @type {cUpsasConfig} */
  const upsasConfig = config;
  let foundTspanTagInfo;
  if (tspanTagId === 'data') {
    foundTspanTagInfo = _.find(upsasConfig.nodeTspanTagInfo, { tspanTagId: 'data' });
  } else if (tspanTagId === 'node') {
    foundTspanTagInfo = _.find(upsasConfig.nodeTspanTagInfo, { tspanTagId: 'node' });
  } else {
    foundTspanTagInfo = _.find(upsasConfig.nodeTspanTagInfo, { tspanTagId: 'dataUnit' });
  }

  if (_.isUndefined(foundTspanTagInfo)) return false;

  return foundTspanTagInfo.tspanTagElement;
}

// FIXME:
/**
 * @typedef {Object} cUpsasConfig
 * @property {cNodeTspanTagInfo[]} nodeTspanTagInfo  노드 데이터의 텍스트 정보 // FIXME: 임시 명칭
 * @property {cSvgTextStyleInfo[]} svgTextStyleInfo // 모든 svg 텍스트의 속성 정보  // FIXME: 임시 명칭
 */

/**
 * @typedef {Object} cNodeTspanTagInfo
 * @property {string} tspanTagId  노드 이름 or 데이터 FIXME: 임시 명칭
 * @property {cTspanTagElement} tspanTagElement  tspan 태그 속성  // FIXME:
 */

/**
 * @typedef {Object} cTspanTagElement // FIXME: 임시 명칭
 * @property {number} dx dx
 * @property {number} dy dy
 * @property {string} style style
 */

/**
 * @typedef {Object} cSvgTextStyleInfo
 * @property {string} target 장소 or 센서 or 장치 // FIXME: 임시 명칭
 * @property {cStyleInfo} styleInfo style 속성 // FIXME: 임시 명칭
 */

/**
 * @typedef {Object} cStyleInfo
 * @property {number} textSize 텍스트 크기 // FIXME: 임시 명칭
 * @property {string} textColor 텍스트 색깔 // FIXME: 임시 명칭
 * @property {string} leading 텍스트 line height (단위 em) // FIXME: 임시 명칭
 * @property {string} anchor 좌우 정렬 start, middle, end // FIXME: 임시 명칭
 */
