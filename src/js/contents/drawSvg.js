/** @type {{nodeId: string, nodeName: '', text: textElement}[]} */
const writtenTextList = [];

/**
 * @param {string} documentId
 * @param {string=} bgImgUrl // 배경 이미지 url
 * @param {string=} title // 제목
 */
function drawSvgBackground(documentId, bgImgUrl, title) {
  /** @type {mDeviceMap} */
  const realMap = map;

  // canvas 생성
  const { width: canvasWidth, height: canvasHeight } = realMap.drawInfo.frame.mapSize;
  const canvas = SVG(documentId).size(canvasWidth, canvasHeight);
  canvas.attr({ id: 'canvasId' });

  // 배경 이미지 지정
  const img = canvas.image(bgImgUrl, canvasWidth, canvasHeight);
  img.move(0, 0);

  // Place 그리기
  realMap.drawInfo.positionInfo.svgPlaceList.forEach(svgPlaceInfo => {
    svgPlaceInfo.defList.forEach(defInfo => {
      /** @type {mSvgModelResource} */
      const resourceInfo = _.find(realMap.drawInfo.frame.svgModelResourceList, {
        id: defInfo.resourceId,
      });
      if (_.isUndefined(resourceInfo)) return false;

      drawSvgElement(
        canvas,
        resourceInfo.type,
        defInfo.point,
        resourceInfo.elementDrawInfo,
        defInfo.id,
      );
      writeSvgText(canvas, defInfo, resourceInfo);
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
        canvas,
        resourceInfo.type,
        defInfo.point,
        resourceInfo.elementDrawInfo,
        defInfo.id,
      );
      writeSvgText(canvas, defInfo, resourceInfo);
    });
  });
}

/**
 * @param {string} nDefId
 * @param {number|string} data 데이터 값
 * @param {string=} updateTime 갱신 시간
 * @param {string=} currentTime 현재시간
 */
function showNodeData(nDefId, data = '') {
  /** @type {mDeviceMap} */
  const realMap = map;
  let dataUnit = getDataUnit(nDefId);

  _.isNull(dataUnit) ? (dataUnit = '') : '';
  if (data === '') dataUnit = '';

  const foundTextInfo = _.find(writtenTextList, { id: nDefId });
  if (_.isUndefined(foundTextInfo)) return false;

  // foundCanvas.text.node.innerHTML = `<tspan style="font-size: 20pt;  stroke-width: 0.2" dx="1.1%" dy="10">${data}${dataUnit}</tspan>`;
  foundTextInfo.text.node.innerHTML = `<tspan dx="5">${nDefId}</tspan>`; // FIXME:
  foundTextInfo.text.node.innerHTML += `<tspan style="font-size: 15pt; fill: #05f605; stroke-width: 0.2" dy="20" dx="-40" >${data}</tspan> <tspan>${dataUnit}</tspan>`; // FIXME:

  changeNodeBgColor(nDefId, data);
}

function changeNodeBgColor(nDefId, data) {
  /** @type {mDeviceMap} */
  const realMap = map;
  let getNodeBgColor;

  // 받아온 id 값으로  color 값 찾기
  realMap.drawInfo.positionInfo.svgNodeList.forEach(svgNodeInfo => {
    const foundNodeDefInfo = _.find(svgNodeInfo.defList, { id: nDefId });
    if (_.isUndefined(foundNodeDefInfo)) return false;

    const foundSvgModelResourceInfo = _.find(realMap.drawInfo.frame.svgModelResourceList, {
      id: foundNodeDefInfo.resourceId,
    });
    getNodeBgColor = foundSvgModelResourceInfo.elementDrawInfo.color;
  });

  // 받아온 id 값이 sensor인지 체크  0: 장치, 1: 센서, -1: 미분류
  const foundNodeInfo = _.find(realMap.drawInfo.positionInfo.svgNodeList, svgNodeInfo =>
    _.map(svgNodeInfo.defList, 'id').includes(nDefId),
  );
  if (_.isUndefined(foundNodeInfo)) return false;

  // 받아온 data 값을 체크
  if (foundNodeInfo.is_sensor === 0) {
    const falseValArr = ['CLOSE', 'CLOSING', 'OFF', 0, '0'];
    const trueValArr = ['OPEN', 'OPENING', 'ON', 1, '1'];

    const hasFalseValue = _.includes(falseValArr, data.toUpperCase());
    const hasTrueValue = _.includes(trueValArr, data.toUpperCase());

    const getSvgElement = SVG.get(nDefId);
    if (hasFalseValue === true && hasTrueValue === false) {
      getSvgElement.attr({ fill: getNodeBgColor[0] });
    } else if (hasFalseValue === false && hasTrueValue === true) {
      getSvgElement.attr({ fill: getNodeBgColor[1] });
    } else {
      getSvgElement.attr({ fill: getNodeBgColor[2] });
    }
  }
}

/**
 * 텍스트 그리기
 * @param {SVG} canvas
 * @param {defInfo} defInfo 장치, 노드의  id, resourceId, point[] 정보
 * @param {mSvgModelResource} resourceInfo 장치, 노드의 resource id, type, elemetDrawInfo[width,height,radius,...] 정보
 */
function writeSvgText(canvas, defInfo, resourceInfo) {
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
  const isCheckedExclusionText = isExcludableText(defInfo.id);
  isCheckedExclusionText ? (naming = '') : '';
  const text = canvas.text(naming);
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

  // 그려진 node에 해당하는 id, text 정보 수집
  const svgId = defInfo.id;
  const svgNode = {
    id: svgId,
    name: defInfo.name,
    textX,
    textY,
    text,
  };
  writtenTextList.push(svgNode);
}

/**
 * text를 제외할 요소 찾기. 반환값이  true: 제외
 * @param {string} defId
 */
function isExcludableText(defId) {
  /** @type {mDeviceMap} */
  const realMap = map;
  let hasFindedId; // FIXME:

  const foundPlaceInfo = _.find(realMap.drawInfo.positionInfo.svgPlaceList, svgPlaceInfo =>
    _.map(svgPlaceInfo.defList, 'id').includes(defId),
  );
  if (_.isUndefined(foundPlaceInfo)) {
    const foundNodeInfo = _.find(realMap.drawInfo.positionInfo.svgNodeList, svgNodeInfo =>
      _.map(svgNodeInfo.defList, 'id').includes(defId),
    );
    hasFindedId = _.includes(realMap.relationInfo.nameExclusionList, foundNodeInfo.nodeDefId);
  } else {
    hasFindedId = _.includes(realMap.relationInfo.nameExclusionList, foundPlaceInfo.placeId);
  }

  return hasFindedId;
}

/**
 *
 * @param {socekt} socket
 */
function bindingClickEventNode(socket) {
  /** @type {mDeviceMap} */
  const realMap = map;

  realMap.drawInfo.positionInfo.svgNodeList.forEach(svgNodeInfo => {
    svgNodeInfo.defList.forEach(noceDefInfo => {
      const getSvgElement = $(`#${noceDefInfo.id}`);
      getSvgElement.on('click touchstart', e => {
        const foundSvgNodeInfo = _.find(realMap.drawInfo.positionInfo.svgNodeList, info =>
          _.map(info.defList, 'id').includes(noceDefInfo.id),
        );
        if (_.isUndefined(foundSvgNodeInfo)) return false;

        // 장치 or 센서 구분  1: 센서, 0: 장치, -1: 미분류
        if (foundSvgNodeInfo.is_sensor === 1) {
          BootstrapDialog.show({
            title: `${noceDefInfo.name}`,
            message: `'${
              noceDefInfo.name
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

                  controlNodeState(socket, 3, noceDefInfo.id);
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
            title: `${noceDefInfo.name}`,
            message: `'${noceDefInfo.name}' 의 상태를 변경합니다.`,
            buttons: [
              {
                label: 'OPEN',
                action(dialogItself) {
                  controlNodeState(socket, 1, noceDefInfo.id);
                  dialogItself.close();
                },
              },
              {
                label: 'CLOSE',
                action(dialogItself) {
                  controlNodeState(socket, 0, noceDefInfo.id);
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
// requestNodeStateControl
function controlNodeState(socket, controlType, nodeId) {
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
 * @param {SVG} canvas
 * @param {string} svgDrawType rect, polygon, circle, line ...
 * @param {Object} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color}
 * @param {string} defId 그려지는 svg 도형에 주어줄 장소 또는 노드의 defInfo.id 값
 */
function drawSvgElement(canvas, svgDrawType, point, elementDrawInfo, defId) {
  switch (svgDrawType.toString()) {
    case 'rect':
      drawSvgRect(canvas, point, elementDrawInfo, defId);
      break;
    case 'line':
      drawSvgLine(canvas, point, elementDrawInfo, defId);
      break;
    case 'circle':
      drawSvgCircle(canvas, point, elementDrawInfo, defId);
      break;
    case 'polygon':
      drawSvgPolygon(canvas, point, elementDrawInfo, defId);
      break;
    case 'pattern':
      drawSvgPattern(canvas, point, elementDrawInfo, defId);
      break;
    default:
      break;
  }
}

/**
 *
 * @param {SVG} canvas
 * @param {number[]} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color, opactiy}
 * @param {string} id 그려지는 svg 도형에 주어줄 id 값
 */
function drawSvgRect(canvas, point, elementDrawInfo, id) {
  const [x, y] = point;

  const { width, height } = elementDrawInfo;
  let { color, radius, opacity } = elementDrawInfo;

  _.isUndefined(radius) ? (radius = 1) : '';
  _.isUndefined(opacity) ? (opacity = 1) : '';

  // color가 배열이 아니면 배열로 변환
  color = Array.isArray(color) ? color : [color];
  const model = canvas
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
 * @param {SVG} canvas
 * @param {number[]} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color}
 * @param {string} id 그려지는 svg 도형에 주어줄 id 값
 */
function drawSvgLine(canvas, point, elementDrawInfo, id) {
  const [x1, y1, x2, y2] = point;
  let { width, color } = elementDrawInfo;
  // color가 배열이 아니면 배열로 변환
  color = Array.isArray(color) ? color : [color];

  canvas
    .line(x1, y1, x2, y2)
    .stroke({ color: color[0], width })
    .attr({
      id,
    });
}

/**
 *
 * @param {SVG} canvas
 * @param {number[]} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color}
 * @param {string} id 그려지는 svg 도형에 주어줄 id 값
 */
function drawSvgCircle(canvas, point, elementDrawInfo, id) {
  const [x, y] = point;
  let { radius, color } = elementDrawInfo;
  // color가 배열이 아니면 배열로 변환
  color = Array.isArray(color) ? color : [color];

  const model = canvas
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
 * @param {SVG} canvas
 * @param {number[]} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color}
 * @param {string} id 그려지는 svg 도형에 주어줄 id 값
 */
function drawSvgPolygon(canvas, point, elementDrawInfo, id) {
  const [x, y] = point;
  let { width, height, color } = elementDrawInfo;
  // color가 배열이 아니면 배열로 변환
  color = Array.isArray(color) ? color : [color];

  const model = canvas.polyline(
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
 * @param {SVG} canvas
 * @param {number[]} point point[]
 * @param {mElementDrawInfo} elementDrawInfo {width, height, radius, color}
 * @param {string} id 그려지는 svg 도형에 주어줄 id값
 */
function drawSvgPattern(canvas, point, elementDrawInfo, id) {
  const [x, y] = point;
  let { width, height, color } = elementDrawInfo;
  // color가 배열이 아니면 배열로 변환
  color = Array.isArray(color) ? color : [color];

  // 그림자를 적용하기위한 가려진 사각형 그리기.
  const model = canvas.rect(width, height);
  model.move(x, y).stroke({ color: 'black' });

  drawSvgShadow(model, id);

  // pattern 안의 작은 사각형의 크기
  const patternSize = 21;
  const pattern = canvas.pattern(patternSize, patternSize, add => {
    add.rect(patternSize, patternSize).fill('white');
    add
      .rect(patternSize, patternSize)
      .move(0.4, 0.4)
      .fill(color[0])
      .radius(3.5);
  });
  canvas
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

// /**
//  * 제목 그리기
//  * @param {SVG} canvas
//  * @param {string} title
//  * @param {number[]} point
//  * @param {string=} fill
//  * @param {number=} size
//  */
// function setTitle(canvas, title = '', point, fill, size) {
//   const [x, y] = point;
//   canvas
//     .text(title)
//     .move(x, y)
//     .font({
//       fill,
//       size,
//       weight: 'bold',
//     });
// }

/**
 * @typedef {Object} svgNodeStorageInfo
 * @property {string} id
 * @property {string} resourceId
 * @property {number[]} point
 * @property {number} data
 */

/**
 * @typedef {Object} detailNodeObjInfo
 * @property {string} id
 * @property {string} resourceId
 * @property {number[]} point
 * @property {number} data
 */
