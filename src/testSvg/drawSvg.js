/** @type {{nodeId: string, nodeName: '', text: textElement}[]} */
const svgNodeTextList = [];

/**
 * @param {string} documentId
 */
function svgDrawing(documentId) {
  // canvas 생성
  const canvasWidth = map.drawInfo.frame.mapSize.width;
  const canvasHeight = map.drawInfo.frame.mapSize.height;
  const canvas = SVG(documentId).size(canvasWidth, canvasHeight);

  // Place 그리기
  map.drawInfo.positionList.svgPlaceList.forEach(svgPlaceInfo => {
    svgPlaceInfo.defList.forEach(defInfo => {
      const placeResourceId = defInfo.resourceId;
      const placeX = defInfo.point[0];
      const placeY = defInfo.point[1];

      if (_.isUndefined(placeResourceId)) return false;

      // resourceId를 이용해 그리기 위한 정보 수집
      const resourceInfo = _.find(map.drawInfo.frame.svgModelResourceList, {
        id: placeResourceId,
      });
      const placeWidth = resourceInfo.elementDrawInfo.width;
      const placeHeight = resourceInfo.elementDrawInfo.height;
      const placeColor = resourceInfo.elementDrawInfo.color;
      const placeType = resourceInfo.type; // rect, line

      // SVG.js 이용해 그리기
      if (placeType === 'rect') {
        const model = canvas
          .rect(placeWidth, placeHeight)
          .fill(placeColor)
          .move(placeX, placeY);
      } else if (placeType === 'line') {
        const placeX2 = defInfo.point[2];
        const placeY2 = defInfo.point[3];
        const model = canvas.line(placeX, placeY, placeX2, placeY2);
        model.stroke({color: placeColor, width: placeWidth});
      }
      writeText(canvas, defInfo, resourceInfo);
    });
  });

  // node 그리기
  map.drawInfo.positionList.svgNodeList.forEach(svgNodeInfo => {
    svgNodeInfo.defList.forEach(defInfo => {
      const resourceInfo = _.find(map.drawInfo.frame.svgModelResourceList, {
        id: defInfo.resourceId,
      });

      if (_.isUndefined(resourceInfo)) return false;

      const [nodeX, nodeY] = defInfo.point;

      const nodeWidth = resourceInfo.elementDrawInfo.width;
      const nodeHeight = resourceInfo.elementDrawInfo.height;
      const nodeColor = resourceInfo.elementDrawInfo.color;
      const nodeType = resourceInfo.type; // rect, circle, polygon, text

      // SVG.js를 이용해 그리기
      let model;
      if (nodeType === 'rect') {
        model = canvas
          .rect(nodeWidth, nodeHeight)
          .fill(nodeColor)
          .move(nodeX, nodeY);
      } else if (nodeType === 'circle') {
        const nodeRadius = resourceInfo.elementDrawInfo.radius;
        model = canvas
          .circle(nodeRadius)
          .fill(nodeColor)
          .move(nodeX, nodeY);
      } else if (nodeType === 'polygon') {
        model = canvas.polyline(
          `${nodeWidth},${0} ${nodeWidth * 2},${nodeHeight} ${nodeWidth},${nodeHeight *
            2} ${0},${nodeHeight}`,
        );
        model.fill(nodeColor).move(nodeX, nodeY);
      }
      writeText(canvas, defInfo, resourceInfo);
    });
  });
  // FIXME: ↓ TEST
  drawExistCanvasValues([
    {nodeId: 'GV_001', svgValue: 1},
    {nodeId: 'GV_002', svgValue: 2},
    {nodeId: 'GV_003', svgValue: 3},
    {nodeId: 'GV_004', svgValue: 4},
    {nodeId: 'WL_001', svgValue: 1},
  ]);
}

/**
 * @param {string} nodeId
 * @param {*} svgValue
 */
function drawExistCanvasValue(nodeId = '', svgValue) {
  const foundCanvas = _.find(svgNodeTextList, {id: nodeId});
  const nodeX = foundCanvas.text.node.attributes.x.value;
  foundCanvas.text.node.innerHTML = `<tspan dy="8">${nodeId}</tspan><tspan dy="13" x=${nodeX}>${svgValue}</tspan>`;
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
  let textX;
  let textY;
  const textSize = 10;
  let textColor = '#FFFF00';

  // 센서를 찾아 글자색 변경
  textX = defInfo.point[0] + resourceInfo.elementDrawInfo.width / 2;
  textY = defInfo.point[1] + resourceInfo.elementDrawInfo.height / 2;

  if (resourceInfo.type === 'rect') {
    if (defInfo.id.match(/MRT/) || defInfo.id.match(/BT/) || defInfo.id.match(/WL/)) {
      textColor = '#2958ae';
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
  const text = canvas.text(`${defInfo.id}`);
  text.move(textX, textY).font({
    fill: textColor,
    size: textSize,
    anchor: 'middle',
    // leading: '2em',
    weight: 'bold',
  });

  // 그려진 node id, text 정보 수집
  const svgId = defInfo.id;
  const svgNode = {
    id: svgId,
    text,
  };
  svgNodeTextList.push(svgNode);
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
