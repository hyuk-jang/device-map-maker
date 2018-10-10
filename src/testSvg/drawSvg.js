/**
 *
 * @param {Element} dom
 */
// document.write("<script src='./testSvg/outputMap.js'></script>");

function svgDrawing(dom) {
  /** @type {mDeviceMap} */
  const realMap = map;
  // svg를 그리기 위한 공간 생성
  const canvasWidth = realMap.drawInfo.frame.mapSize.width;
  const canvasHeight = realMap.drawInfo.frame.mapSize.width;
  const canvas = SVG(dom).size(canvasWidth, canvasHeight);

  // Place 그리기
  realMap.drawInfo.positionList.svgPlaceList.forEach(svgPlaceInfo => {
    svgPlaceInfo.defList.forEach(defInfo => {
      const placeResourceId = defInfo.resourceId;
      const placeX = defInfo.point[0];
      const placeY = defInfo.point[1];

      if (_.isUndefined(placeResourceId)) return false;

      // resourceId를 이용해 그리기 위한 정보 수집
      const resourceInfo = _.find(realMap.drawInfo.frame.svgModelResourceList, {
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
        console.log(placeX, placeY, placeX2, placeY2);
        const model = canvas.line(placeX, placeY, placeX2, placeY2);
        model.stroke({color: placeColor, width: placeWidth});
      } else if (placeType === 'pattern') {
        const pattern = canvas.pattern(20, 20, add => {
          add.rect(20, 20).fill('#f06');
          add
            .rect(20, 20)
            .move(10, 10)
            .fill('#fff');
        });

        canvas
          .rect(placeWidth, placeHeight)
          .move(placeX, placeY)
          .fill(pattern);
      } else {
        // TODO:
      }
      // TODO:
      writeText(canvas, defInfo, resourceInfo);
    });
  });

  // node 그리기
  realMap.drawInfo.positionList.svgNodeList.forEach(svgNodeInfo => {
    svgNodeInfo.defList.forEach(defInfo => {
      makeSvgNodeInfo(defInfo);

      const resourceInfo = _.find(realMap.drawInfo.frame.svgModelResourceList, {
        id: nodeObjInfo.resourceId,
      });

      if (_.isUndefined(resourceInfo)) return false;

      const nodeX = nodeObjInfo.point[0];
      const nodeY = nodeObjInfo.point[1];

      const nodeWidth = resourceInfo.elementDrawInfo.width;
      const nodeHeight = resourceInfo.elementDrawInfo.height;
      const nodeColor = resourceInfo.elementDrawInfo.color;
      const nodeType = resourceInfo.type; // rect, circle, polygon, text

      // SVG.js를 이용해 그리기
      if (nodeType === 'rect') {
        const model = canvas
          .rect(nodeWidth, nodeHeight)
          .fill(nodeColor)
          .move(nodeX, nodeY);
      } else if (nodeType === 'circle') {
        const nodeRadius = resourceInfo.elementDrawInfo.radius;
        const model = canvas
          .circle(nodeRadius)
          .fill(nodeColor)
          .move(nodeX, nodeY);
      } else if (nodeType === 'polygon') {
        const model = canvas.polyline(
          `${nodeWidth},${0} ${nodeWidth * 2},${nodeHeight} ${nodeWidth},${nodeHeight *
            2} ${0},${nodeHeight}`,
        );
        model.fill(nodeColor).move(nodeX, nodeY);
      } else {
        // TODO: 다른조건
      }
      // TODO:
      writeText(canvas, nodeObjInfo, resourceInfo);
    });
  });
}

/**
 * 텍스트 그리기
 * @param {*} canvas
 * @param {defInfo} defInfo 위치 정보 id, resourceId, point[]
 * @param {mSvgModelResource} resourceInfo 그려질 정보 id, type, elemetDrawInfo[width,height,radius,...]
 */
function writeText(canvas, defInfo, resourceInfo) {
  let textX = 0;
  let textY = 0;
  let textSize = 0;
  let textColor = '#FFFF00';

  // 센서를 찾아 글자색 변경
  if (resourceInfo.type === 'rect') {
    if (defInfo.id.match(/MRT/) || defInfo.id.match(/BT/) || defInfo.id.match(/WL/)) {
      textColor = '#2958ae';
    }
    textX = defInfo.point[0] + resourceInfo.elementDrawInfo.width / 2;
    textY = defInfo.point[1] + resourceInfo.elementDrawInfo.height / 2;
    textSize = 10; // TODO:
  } else if (resourceInfo.type === 'line') {
    if (defInfo.point[0] === defInfo.point[2]) {
      textX = defInfo.point[0] + 0;
      textY = defInfo.point[1] - (defInfo.point[1] - defInfo.point[3]) / 2;
    } else {
      textX = defInfo.point[0] + (defInfo.point[2] - defInfo.point[0]) / 2;
      textY = defInfo.point[1] + 0;
    }
    textSize = 10; // TODO:
  } else if (resourceInfo.type === 'circle') {
    textX = defInfo.point[0] + resourceInfo.elementDrawInfo.radius / 2;
    textY = defInfo.point[1] + resourceInfo.elementDrawInfo.radius / 2;
    textSize = 10; // TODO:
  } else if (resourceInfo.type === 'polygon') {
    textX = defInfo.point[0] + resourceInfo.elementDrawInfo.width;
    textY = defInfo.point[1] + resourceInfo.elementDrawInfo.height;
    textSize = 10; // TODO:
  }

  const text = canvas.text(`${defInfo.id}\n${defInfo.data}`);
  text.move(textX, textY).font({
    fill: textColor,
    size: textSize,
    anchor: 'middle',
    // leading: '2em',
    weight: 'bold',
  });
}

/**
 * //TODO:
 * @param {string} nodeId
 * @param {*} nodeValue
 */
function changeTextSvgNode(nodeId, nodeValue) {
  // 1. nodeId와 일치하는 SVG 객체를 불러와 nodeValue 반영
  // 2. 해당 nodeId를 가지고 있는 realMap.drawInfo.positionList.svgNodeList 에서 draw 정보를 가져와 reDraw
}

/**
 * //TODO:
 * @param {{nodeId: string, nodeValue: *}[]} nodeList
 */
function changeTextSvgNodes(nodeList) {
  _.forEach(nodeList, nodeInfo => changeTextSvgNode(nodeInfo.nodeId, nodeInfo.v));
}

/**
 * 그리기 위한 객체 정보를 담아두는 공간 생성
 * @param {defInfo} defInfo 위치 정보 id, resourceId, point[]
 */
function makeSvgNodeInfo(defInfo) {
  const nodeObjList = [];
  const {id, point, resourceId} = defInfo;
  // console.log(id);
  /** @type {nodeObjInfo} */
  const nodeObjInfo = {
    id,
    resourceId,
    point,
    data: 0,
  };

  this.nodeObjInfo = nodeObjInfo;
}

/**
 * @typedef {Object} nodeObjInfo
 * @property {string} id
 * @property {string} resourceId
 * @property {number[]} point
 * @property {number} data
 */
