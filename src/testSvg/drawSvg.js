/**
 *
 * @param {Element} dom
 */
// document.write("<script src='./testSvg/outputMap.js'></script>");

function svgDrawing(dom) {
  // 그리는 공간 크기
  const canvasWidth = map.drawInfo.frame.mapSize.width;
  const canvasHeight = map.drawInfo.frame.mapSize.width;
  const canvas = SVG(dom).size(canvasWidth, canvasHeight);
  const rect = canvas
    .rect(canvasWidth, canvasHeight)
    .fill('#B2EBF4') // FIXME: canvas의 크기를 파악하기위한 색 (후에 삭제)
    .move(0, 0);

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
        console.log(placeX, placeY, placeX2, placeY2);
        const model = canvas.line(placeX, placeY, placeX2, placeY2);
        model.stroke({color: placeColor, width: placeWidth});
      } else {
        // TODO:
      }
      // TODO:
      writeText(canvas, defInfo, resourceInfo);
    });
  });

  // node 그리기
  map.drawInfo.positionList.svgNodeList.forEach(svgNodeInfo => {
    svgNodeInfo.defList.forEach(defInfo => {
      const nodeResourceId = defInfo.resourceId;
      const nodeX = defInfo.point[0];
      const nodeY = defInfo.point[1];

      if (_.isUndefined(nodeResourceId)) return false;

      const resourceInfo = _.find(map.drawInfo.frame.svgModelResourceList, {
        id: nodeResourceId,
      });
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
      writeText(canvas, defInfo, resourceInfo);
    });
  });
}

/**
 * 텍스트 그리기
 * @param {*} canvas
 * @param {*} targetInfo 위치 정보 id, resourceId, point[]
 * @param {*} resourceInfo 그려질 정보 id, type, elemetDrawInfo[width,height,radius,...]
 */
function writeText(canvas, targetInfo, resourceInfo) {
  let textX = 0;
  let textY = 0;
  let testSize = 0;

  if (resourceInfo.type === 'rect') {
    textX = targetInfo.point[0] + resourceInfo.elementDrawInfo.width / 2;
    textY = targetInfo.point[1] + resourceInfo.elementDrawInfo.height / 2;
    testSize = 10; // TODO:
  } else if (resourceInfo.type === 'line') {
    if (targetInfo.point[0] === targetInfo.point[2]) {
      textX = targetInfo.point[0] + 0;
      textY = targetInfo.point[1] - (targetInfo.point[1] - targetInfo.point[3]) / 2;
    } else {
      textX = targetInfo.point[0] + (targetInfo.point[2] - targetInfo.point[0]) / 2;
      textY = targetInfo.point[1] + 0;
    }
    testSize = 10; // TODO:
  } else if (resourceInfo.type === 'circle') {
    textX = targetInfo.point[0] + resourceInfo.elementDrawInfo.radius / 2;
    textY = targetInfo.point[1] + resourceInfo.elementDrawInfo.radius / 2;
    testSize = 10; // TODO:
  } else if (resourceInfo.type === 'polygon') {
    textX = targetInfo.point[0] + resourceInfo.elementDrawInfo.width;
    textY = targetInfo.point[1] + resourceInfo.elementDrawInfo.height;
    testSize = 10; // TODO:
  }
  const text = canvas.text(`${targetInfo.id}\n15`);
  text.move(textX, textY).font({
    fill: '#FFFF00',
    size: testSize,
    anchor: 'middle',
    // leading: '2em',
    weight: 'bold',
  });
}
