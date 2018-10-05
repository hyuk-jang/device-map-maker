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
      const placeX = defInfo.position[0];
      const placeY = defInfo.position[1];

      if (_.isUndefined(placeResourceId)) return false;

      // resourceId를 이용해 그리기 위한 정보 수집
      const resourceInfo = _.find(map.drawInfo.frame.svgModelResourceList, {
        id: placeResourceId,
      });
      const placeWidth = resourceInfo.elementDrawInfo.width;
      const placeHeight = resourceInfo.elementDrawInfo.height;
      const placeColor = resourceInfo.elementDrawInfo.color;
      const placeType = resourceInfo.type; // rect, line
      // console.log(`placeType : ${placeType}`);

      // SVG.js
      if (placeType === 'rect') {
        const model = canvas
          .rect(placeWidth, placeHeight)
          .fill(placeColor)
          .move(placeX, placeY);
      } else if (placeType === 'line') {
        const placeX2 = defInfo.position[2];
        const placeY2 = defInfo.position[3];
        console.log(placeX, placeY, placeX2, placeY2);
        const model = canvas.line(placeX, placeY, placeX2, placeY2);
        model.stroke({color: placeColor, width: placeWidth});
      } else {
        // TODO:
      }
    });
  });

  // node 그리기
  map.drawInfo.positionList.svgNodeList.forEach(svgNodeInfo => {
    svgNodeInfo.list.forEach(listInfo => {
      const nodeResourceId = listInfo.resourceId;
      const nodeX = listInfo.point[0];
      const nodeY = listInfo.point[1];

      if (_.isUndefined(nodeResourceId)) return false;

      const resourceInfo = _.find(map.drawInfo.frame.svgModelResourceList, {
        id: nodeResourceId,
      });
      const nodeWidth = resourceInfo.elementDrawInfo.width;
      const nodeHeight = resourceInfo.elementDrawInfo.height;
      const nodeColor = resourceInfo.elementDrawInfo.color;
      const nodeType = resourceInfo.type; // rect, circle, polygon
      // console.log(`nodeType : ${nodeType}`);

      // SVG.js
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
    });
  });
}
