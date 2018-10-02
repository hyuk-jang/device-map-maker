/**
 *
 * @param {Element} dom
 */
function drawTest(dom) {
  _.forEach([1, 2], v => {
    console.log(v);
  });

  const draw = SVG(dom).size(300, 130);

  const rect = draw
    .rect(100, 100)
    .fill('#f06')
    .move(20, 20);
}

// const map = require('./testMap');

// class testCoding {
//   test() {
//     const bgWidth = map.drawInfo.frame.mapSize.width;
//     const bgHeight = map.drawInfo.frame.mapSize.height;
//   }
// }

console.log('hi');
