/**
 * @type {upsasConfig}
 */
const config = {
  // allNodeTspanEleInfo: {
  //   dx: 0,
  //   dy: 15,
  //   style: 'font-size: 15pt; fill: #05f605; stroke-width: 0.2',
  // },
  // singleNodeTspanEleList: [
  //   {
  //     nodeId: 'GV_001',
  //     targetDx: 0,
  //     targetDy: 15,
  //     targetStyle: 'font-size: 15pt; fill: red; stroke-width: 0.2',
  //   },
  // ],
  // allTextStyleInfo: {
  //   textColor: '',
  //   textSize: 0,
  //   anchor: '',
  //   leading: '',
  //   moveScale: [],
  // },
  // singleTextStyleList: [
  //   {
  //     targetId: 'WL_001',
  //     styleInfo: {
  //       textColor: 'red',
  //       textSize: 0,
  //       anchor: '',
  //       leading: '',
  //       moveScale: [],
  //     },
  //   },
  // ],
};

/**
 * @typedef {Object} upsasConfig
 * @property {cAllNodeTspanEleInfo} allNodeTspanEleInfo
 * @property {cSingleNodeTspanEleList[]} singleNodeTspanEleList
 * @property {cAllTextStyleInfo} allTextStyleInfo
 * @property {cSingleTextStyleList[]} singleTextStyleList
 */

/**
 * @typedef {Object} cAllNodeTspanEleInfo
 * @property {number} dx
 * @property {number} dy
 * @property {string} style
 */

/**
 * @typedef {Object} cSingleNodeTspanEleList
 * @property {number} nodeId
 * @property {number} targetDx
 * @property {number} targetDy
 * @property {string} targetStyle
 */

/**
 * @typedef {Object} cAllTextStyleInfo
 * @property {string} textColor
 * @property {number} textSize
 * @property {string} leading
 * @property {string} anchor
 * @property {number[]} moveScale
 */

/**
 * @typedef {Object} cSingleTextStyleList
 * @property {string} targetId
 * @property {Object} styleInfo
 * @property {string} styleInfo.textColor
 * @property {number} styleInfo.textSize
 * @property {string} styleInfo.leading
 * @property {string} styleInfo.anchor
 * @property {number[]} styleInfo.moveScale
 */
