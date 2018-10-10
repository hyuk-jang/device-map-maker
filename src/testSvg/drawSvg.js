/**
 *
 * @param {Element} dom
 */

function svgDrawing(dom) {
  this.makeSvgNodeInfo();
  // /** @type {mDeviceMap} */
  // const map = map;
  // svg를 그리기 위한 공간 생성
  const canvasWidth = map.drawInfo.frame.mapSize.width;
  const canvasHeight = map.drawInfo.frame.mapSize.width;
  const canvas = SVG(dom).size(canvasWidth, canvasHeight);

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
        // console.log(placeX, placeY, placeX2, placeY2);
        const model = canvas.line(placeX, placeY, placeX2, placeY2);
        model.stroke({color: placeColor, width: placeWidth});
      } else {
        // TODO:
      }
      // TODO:
      writeText(canvas, defInfo, resourceInfo);
      // FIXME: test
    });
  });

  // console.log(svgNodeStorageList);
  // node 그리기
  svgNodeStorageList.forEach(svgNodeStorageInfo => {
    const resourceInfo = _.find(map.drawInfo.frame.svgModelResourceList, {
      id: svgNodeStorageInfo.resourceId,
    });

    if (_.isUndefined(resourceInfo)) return false;

    const nodeX = svgNodeStorageInfo.point[0];
    const nodeY = svgNodeStorageInfo.point[1];

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
    writeText(canvas, svgNodeStorageInfo, resourceInfo);
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
  const text = canvas.text(`${defInfo.id}: ${defInfo.data}`);
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
 * @param {string} nodeId data를 넣을  nodeId 값
 * @param {*} nodeValue data 값
 */
function changeTextSvgNode(nodeId, nodeValue) {
  const svgNodeStorageList = this.svgNodeStorageList;
  const svgNodeStorageInfo = _.find(svgNodeStorageList, {id: nodeId});
  if (svgNodeStorageInfo) {
    const dataSettedInfo = _.set(svgNodeStorageInfo, 'data', nodeValue);
  } else {
    alert('not find it.');
  }
}

/**
 * //TODO:
 * @param {{nodeId: string, nodeValue: *}[]} nodeList
 */
function changeTextSvgNodes(nodeList) {
  _.forEach(nodeList, nodeInfo => changeTextSvgNode(nodeInfo.nodeId, nodeInfo.nodeValue));
}

/**
 * 그리기 위한 객체 정보를 담아두는 공간 생성
 * @param {defInfo} defInfo 위치 정보 id, resourceId, point[]
 */
const svgNodeStorageList = []; // FIXME:
function makeSvgNodeInfo() {
  /** @type {mDeviceMap} */
  const realMap = map;
  /** @type {svgNodeStorageInfo[]} */

  realMap.drawInfo.positionList.svgNodeList.forEach(svgNodeInfo => {
    svgNodeInfo.defList.forEach(defInfo => {
      const {id, point, resourceId} = defInfo;
      // console.log(id);
      /** @type {detailNodeObjInfo} */
      const nodeObjInfo = {
        id,
        resourceId,
        point,
        data: 0,
      };
      svgNodeStorageList.push(nodeObjInfo);
    });
  });
  this.svgNodeStorageList = svgNodeStorageList;
  // console.log(svgNodeStorageList);
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

// 2.해당 nodeId를 가지고 있는 realMap.drawInfo.positionList.svgNodeList 에서 draw 정보를 가져와 reDraw
