/**
 * @type {configTest}
 */
const config = {
  nodeDataInfo: [
    {
      target: 'nodeId',
      tspanElement: {
        dx: 0,
        dy: 0,
        style: '',
      },
    },
    {
      target: 'nodeData',
      tspanElement: {
        dx: 0,
        dy: 0,
        style: '',
      },
    },
  ],
  svgTextInfo: [
    {
      target: 'place',
      textStyleInfo: {
        textSize: 0,
        textColor: '',
        anchor: '',
        leading: '',
      },
    },
  ],
};
module.exports = config;

/**
 * @typedef {Object} configTest
 * @property {cNodeDataInfo[]} nodeDataInfo  노드 데이터의 텍스트 정보 // FIXME: 임시 명칭
 * @property {cSvgTextInfo[]} svgTextInfo // 모든 svg 텍스트의 속성 정보  // FIXME: 임시 명칭
 */

/**
 * @typedef {Object} cNodeDataInfo
 * @property {string} target  노드 이름 or 데이터 FIXME: 임시 명칭
 * @property {tspanElement} tspanElement  tspan 태그 속성  // FIXME:
 */

/**
 * @typedef {Object} tspanElement // FIXME: 임시 명칭
 * @property {number} dx dx
 * @property {number} dy dy
 * @property {string} style style
 */

/**
 * @typedef {Object} cSvgTextInfo
 * @property {string} target 장소 or 센서 or 장치 // FIXME: 임시 명칭
 * @property {styleInfo} textStyleInfo style 속성 // FIXME: 임시 명칭
 */

/**
 * @typedef {Object} styleInfo
 * @property {number} textSize 텍스트 크기 // FIXME: 임시 명칭
 * @property {string} textColor 텍스트 색깔 // FIXME: 임시 명칭
 * @property {string} leading 텍스트 line height (단위 em) // FIXME: 임시 명칭
 * @property {string} anchor 좌우 정렬 start, middle, end // FIXME: 임시 명칭
 */
