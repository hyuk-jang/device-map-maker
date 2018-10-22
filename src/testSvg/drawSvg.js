/** @type {{nodeId: string, nodeName: '', text: textElement}[]} */
const svgNodeTextList = [];

/**
 * @param {string} documentId
 */
function svgDrawing(documentId) {
  /** @type {mDeviceMap} */
  const realMap = map;
  // canvas 생성
  const canvasWidth = realMap.drawInfo.frame.mapSize.width;
  const canvasHeight = realMap.drawInfo.frame.mapSize.height;
  const canvas = SVG(documentId).size(canvasWidth, canvasHeight);

  // Place 그리기
  realMap.drawInfo.positionList.svgPlaceList.forEach(svgPlaceInfo => {
    svgPlaceInfo.defList.forEach(defInfo => {
      const placeResourceId = defInfo.resourceId;
      const placeX = defInfo.point[0];
      const placeY = defInfo.point[1];

      if (_.isUndefined(placeResourceId)) return false;

      // resourceId를 이용해 그리기 위한 정보 수집
      /** @type {mSvgModelResource} */
      const resourceInfo = _.find(realMap.drawInfo.frame.svgModelResourceList, {
        id: placeResourceId,
      });
      const placeWidth = resourceInfo.elementDrawInfo.width;
      const placeHeight = resourceInfo.elementDrawInfo.height;
      const placeColor = resourceInfo.elementDrawInfo.color;
      const placeType = resourceInfo.type; // rect, line

      // SVG.js 이용해 그리기
      let model;
      if (placeType === 'rect') {
        model = canvas
          .rect(placeWidth, placeHeight)
          .fill(placeColor)
          .move(placeX, placeY);

        // 그림자 효과
        model.filter(add => {
          const blur = add
            .offset(5, 5)
            .in(add.sourceAlpha)
            .gaussianBlur(2);

          add.blend(add.source, blur);
        });
      } else if (placeType === 'line') {
        const placeX2 = defInfo.point[2];
        const placeY2 = defInfo.point[3];
        model = canvas
          .line(placeX, placeY, placeX2, placeY2)
          .stroke({ color: placeColor, width: placeWidth });
      }
      writeText(canvas, defInfo, resourceInfo);
    });
  });

  // node 그리기
  realMap.drawInfo.positionList.svgNodeList.forEach(svgNodeInfo => {
    svgNodeInfo.defList.forEach(defInfo => {
      /** @type {mSvgModelResource} */
      const resourceInfo = _.find(realMap.drawInfo.frame.svgModelResourceList, {
        id: defInfo.resourceId,
      });

      if (_.isUndefined(resourceInfo)) return false;

      const [nodeX, nodeY] = defInfo.point;

      const { color, height, image } = resourceInfo.elementDrawInfo;

      const nodeWidth = resourceInfo.elementDrawInfo.width;
      const nodeHeight = resourceInfo.elementDrawInfo.height;
      const nodeColor = resourceInfo.elementDrawInfo.color;
      const nodeType = resourceInfo.type; // rect, circle, polygon, text

      // SVG.js를 이용해 그리기
      let model;
      if (nodeType === 'rect') {
        model = canvas
          .rect(nodeWidth, nodeHeight)
          .fill(nodeColor[0])
          .move(nodeX, nodeY)
          .attr({
            id: defInfo.id,
            class: 'node',
          });
      } else if (nodeType === 'circle') {
        const nodeRadius = resourceInfo.elementDrawInfo.radius;
        model = canvas
          .circle(nodeRadius)
          .fill(nodeColor[0])
          .move(nodeX, nodeY)
          .attr({
            id: defInfo.id,
            class: 'node',
          });
      } else if (nodeType === 'polygon') {
        model = canvas.polyline(
          `${nodeWidth},${0} ${nodeWidth * 2},${nodeHeight} ${nodeWidth},${nodeHeight *
            2} ${0},${nodeHeight}`,
        );
        model
          .fill(nodeColor[0])
          .move(nodeX, nodeY)
          .attr({
            id: defInfo.id,
            class: 'node',
          });
      }
      // 그림자 효과
      model.filter(add => {
        const blur = add
          .offset(1, 1)
          .in(add.sourceAlpha)
          .gaussianBlur(2);

        add.blend(add.source, blur);
      });
      writeText(canvas, defInfo, resourceInfo);
    });
  });
}

/**
 * @param {string} nodeId
 * @param {*} svgValue
 */
function drawExistCanvasValue(nodeId = '', svgValue) {
  const foundCanvas = _.find(svgNodeTextList, { id: nodeId });
  const nodeX = foundCanvas.text.node.attributes.x.value;
  foundCanvas.text.node.innerHTML = `<tspan dy="5">${foundCanvas.name}</tspan>`;
  foundCanvas.text.node.innerHTML += `<tspan class='data' dy="14" x=${nodeX}>${svgValue}</tspan>`;
}

/**
 * @param {{nodeId: string, svgValue:*}[]} changeCanvasList
 */
function drawExistCanvasValues(changeCanvasList) {
  changeCanvasList.forEach(existCanvasInfo => {
    drawExistCanvasValue(existCanvasInfo.nodeId, existCanvasInfo.svgValue);
  });
}

/**
 * 텍스트 그리기
 * @param {*} canvas
 * @param {defInfo} defInfo 위치 정보 id, resourceId, point[]
 * @param {mSvgModelResource} resourceInfo 그려질 정보 id, type, elemetDrawInfo[width,height,radius,...]
 */
function writeText(canvas, defInfo, resourceInfo) {
  let [textX, textY, textSize, textColor, leading] = [, , 10, 'yellow'];

  // svgPositionList를 검색하여 장치인지 센서인지 정의
  let foundSvgInfo = _.find(map.drawInfo.positionList.svgNodeList, { defList: [defInfo] });
  if (_.isUndefined(foundSvgInfo)) {
    foundSvgInfo = _.find(map.drawInfo.positionList.svgPlaceList, { defList: [defInfo] });
  }
  // 제외목록 서칭
  const writeTextBoolean = excludeText(defInfo.id);

  if (writeTextBoolean === true) {
    // 센서를 찾아 글자색 변경
    textX = defInfo.point[0] + resourceInfo.elementDrawInfo.width / 2;
    textY = defInfo.point[1] + resourceInfo.elementDrawInfo.height / 2;

    if (resourceInfo.type === 'rect') {
      // 노드중 sensor style 지정
      if (foundSvgInfo.is_sensor === 1) {
        textColor = '#0404B6';
      }
      // 장소 text style 지정
      if (!_.isUndefined(foundSvgInfo.placeClassId)) {
        textSize = 17;
        leading = '0.8em';
      }
    } else if (resourceInfo.type === 'line') {
      if (defInfo.point[0] === defInfo.point[2]) {
        textX = defInfo.point[0];
        textY = defInfo.point[1] - (defInfo.point[1] - defInfo.point[3]) / 2;
      } else {
        textX = defInfo.point[0] + (defInfo.point[2] - defInfo.point[0]) / 2;
        textY = defInfo.point[1];
      }
    } else if (resourceInfo.type === 'circle') {
      textX = defInfo.point[0] + resourceInfo.elementDrawInfo.radius / 2;
      textY = defInfo.point[1] + resourceInfo.elementDrawInfo.radius / 2;
    } else if (resourceInfo.type === 'polygon') {
      textX = defInfo.point[0] + resourceInfo.elementDrawInfo.width;
      textY = defInfo.point[1] + resourceInfo.elementDrawInfo.height;
    }

    const text = canvas.text(defInfo.name);
    text
      .move(textX, textY)
      .font({
        fill: textColor,
        size: textSize,
        anchor: 'middle',
        leading,
        weight: 'bold',
      })
      // text 커서 무시
      .attr({
        'pointer-events': 'none',
      });

    // 그려진 node id, text 정보 수집
    const svgId = defInfo.id;

    const svgNode = {
      id: svgId,
      name: defInfo.name,
      text,
    };
    svgNodeTextList.push(svgNode);
  } else {
    return false;
  }
}

/**
 * text를 제외할 요소 찾기
 * @param {string} id
 */
function excludeText(id) {
  /** @type {mDeviceMap} */
  const realMap = map;

  let findExclusion;

  realMap.drawInfo.positionList.svgPlaceList.forEach(svgPlaceInfo => {
    /** @type {defInfo} */
    const foundIt = _.find(svgPlaceInfo.defList, { id });
    if (!_.isUndefined(foundIt)) {
      const placeClassId = svgPlaceInfo.placeClassId;
      findExclusion = _.indexOf(realMap.realtionInfo.excludeNameList, placeClassId);
    }
  });

  realMap.drawInfo.positionList.svgNodeList.forEach(svgNodeInfo => {
    /** @type {defInfo} */
    const foundIt = _.find(svgNodeInfo.defList, { id });
    if (!_.isUndefined(foundIt)) {
      const nodeClassId = svgNodeInfo.nodeClassId;
      findExclusion = _.indexOf(realMap.realtionInfo.excludeNameList, nodeClassId);
    }
  });

  if (findExclusion === -1) {
    return true;
  }
  return false;
}
function dataInstallEvent() {
  // TODO:
  map.drawInfo.positionList.svgNodeList.forEach(svgNodeInfo => {
    svgNodeInfo.defList.forEach(defInfo => {
      const getSvgElement = SVG.get(defInfo.id);
      getSvgElement.click(e => {
        const inputString = prompt(`${defInfo.id}의 값을 입력하세요`);

        const resourceInfo = _.find(map.drawInfo.frame.svgModelResourceList, {
          id: defInfo.resourceId,
        });
        const color = resourceInfo.elementDrawInfo.color;
        // true fals 값 체크
        const falseValueList = ['CLOSE', 'OFF', 0, '0'];
        const trueValueList = ['OPEN', 'ON', 1, '1'];

        const trueValueCheck = _.indexOf(trueValueList, _.toUpper(inputString));
        const falseValueCheck = _.indexOf(falseValueList, _.toUpper(inputString));

        if (inputString != null) {
          // FIXME:
          drawExistCanvasValue(defInfo.id, inputString);
          if (trueValueCheck != -1) {
            getSvgElement.attr({
              fill: color[1],
            });
          } else if (falseValueCheck != -1) {
            getSvgElement.attr({
              fill: color[0],
            });
          } else {
            getSvgElement.attr({
              fill: color[2],
            });
          }
        }
      });
    });
  });
}

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
