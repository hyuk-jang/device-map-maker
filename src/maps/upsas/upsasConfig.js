/**
 * @type {cUpsasConfig}
 */
const config = {
  nodeTspanTagInfo: {
    allNodeTspanElm: {
      dx: 0,
      dy: 15,
      style: 'font-size: 15pt; fill: #05f605; stroke-width: 0.2',
    },
    singleNodeTspanElmList: [
      {
        nodeId: 'GV_001',
        targetDx: 0,
        targetDy: 15,
        targetStyle: 'font-size: 15pt; fill: #05f605; stroke-width: 0.2',
      },
    ],
  },
  svgTextStyleInfo: [
    {
      isSensor: 0,
      styleInfo: {
        anchor: '',
        leading: '',
        textColor: '',
        textSize: 0,
      },
    },
  ],
};

// /** @type {test} */
// const testInfo = {

// }

// /**
//  *
//  * @param {Object} info
//  * @param {number} info.a
//  * @param {Object} info.b
//  * @param {Object} info.b.c
//  */
// function tt(info) {

// }

// /**
//  * @typedef {Object} cUpsasConfig
//  * @property {cNodeTspanTagInfo} nodeTspanTagInfo  노드 데이터의 텍스트 정보 // FIXME: 임시 명칭
//  * @property {cSvgTextStyleInfo[]} svgTextStyleInfo  노드 데이터의 텍스트 정보 // FIXME: 임시 명칭
//  */

// // FIXME:
// /**
//  * @typedef {Object} cUpsasConfig
//  * @property {cNodeTspanTagInfo} nodeTspanTagInfo  노드 데이터의 텍스트 정보 // FIXME: 임시 명칭
//  * @property {cSvgTextStyleInfo[]} svgTextStyleInfo  노드 데이터의 텍스트 정보 // FIXME: 임시 명칭
//  */

// /**
//  * @typedef {Object} cNodeTspanTagInfo
//  * @property {cNodeSingleTspanElementInfo[]} singleNodeTspanElementList  노드 단일 <tspan> 속성 리스트 FIXME: 임시 명칭
//  * @property {cNodeAllTspanElementInfo} allNodeTspanElementList  모든 노드 <tspan> 속성 리스트  // FIXME:
//  */

// /**
//  * @typedef {Object} cNodeSingleTspanElementInfo
//  * @property {string} nodeId FIXME:
//  * @property {cTspanTagElement} tspanTagElement FIXME:
//  */

// /**
//  * @typedef {Object} cNodeAllTspanElementInfo
//  * @property {string} id FIXME: 이름 바꿔야함
//  * @property {cTspanTagElement} tspanTagElement FIXME:
//  */

// /**
//  * @typedef {Object} cTspanTagElement // FIXME: 임시 명칭
//  * @property {number} dx dx
//  * @property {number} dy dy
//  * @property {string} style style
//  */

// /**
//  * @typedef {Object} cSvgTextStyleInfo
//  * @property {string=} isSensor FIXME: 임시 명칭
//  * @property {string=} placeId FIXME: 임시 명칭
//  * @property {cStyleInfo} styleInfo style 속성 // FIXME: 임시 명칭
//  */

// /**
//  * @typedef {Object} cStyleInfo
//  * @property {number} textSize 텍스트 크기 // FIXME: 임시 명칭
//  * @property {string} textColor 텍스트 색깔 // FIXME: 임시 명칭
//  * @property {string} leading 텍스트 line height (단위 em) // FIXME: 임시 명칭
//  * @property {string} anchor 좌우 정렬 start, middle, end // FIXME: 임시 명칭
//  */
