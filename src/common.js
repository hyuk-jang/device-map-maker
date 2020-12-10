const _ = require('lodash');

/**
 * Text Element 가 위치할 X 좌표 값을 자동 계산하여 반환
 * @param {number} vStrokeScale vertical Stroke Scale
 * @param {string} anchor text anchor
 * @param {boolean=} isTitle
 */
function calcDataAxisX(vStrokeScale, anchor, isTitle = true) {
  const remainDataScale = 1 - vStrokeScale;

  const interval = 0.05;

  let dataAxisX = 0;

  switch (anchor) {
    case 'start':
      dataAxisX = isTitle ? interval : vStrokeScale + interval;
      break;
    case 'middle':
      dataAxisX = isTitle
        ? _.round(vStrokeScale * 0.5, 2)
        : _.round(vStrokeScale + remainDataScale * 0.5, 2);
      break;
    case 'end':
      dataAxisX = isTitle ? vStrokeScale - interval : 1 - interval;
      break;
    default:
      break;
  }

  // console.log(widthScale, anchor, dataAxisX);

  return dataAxisX;
}

module.exports = {
  anchor: {
    start: 'start',
    middle: 'middle',
    end: 'end',
  },
  /** @param {cmInsideParam} templateParam */
  insideSensorTemplate1: templateParam => {
    const {
      rowsCount = 1,
      shareRate = 0,
      vStrokeScale = 0,
      titleAnchor = 'middle',
      dataAnchor = 'end',
    } = templateParam;

    /** @type {mInsideInfo} */
    const insideInfo = {
      headerInfo: {
        bgColor: 'purple',
        shareRate,
        fontSize: 12,
        fontColor: 'white',
      },
      bodyInfo: {
        fontColor: 'yellow',
        fontSize: 10,
        unitColor: 'orange',
        tblInfo: {
          rowsCount,
          strokeColor: 'white',
          strokeWidth: 1,
          vStrokeScale,
          titleInfo: {
            anchor: titleAnchor,
            xAxisScale: calcDataAxisX(vStrokeScale, titleAnchor, true),
            fontColor: 'white',
          },
          dataInfo: {
            anchor: dataAnchor,
            xAxisScale: calcDataAxisX(vStrokeScale, dataAnchor, false),
          },
        },
      },
    };

    return insideInfo;
  },
  /** @param {cmInsideParam} templateParam */
  insideAlarmTemplate1: templateParam => {
    const { rowsCount = 1, shareRate = 0, dataAnchor = 'start' } = templateParam;

    /** @type {mInsideInfo} */
    const insideInfo = {
      headerInfo: {
        bgColor: 'purple',
        shareRate,
        fontSize: 12,
        fontColor: 'white',
      },
      bodyInfo: {
        fontColor: 'white',
        fontSize: 10,
        unitColor: 'orange',
        tblInfo: {
          rowsCount,
          strokeColor: 'white',
          strokeWidth: 1,
          dataInfo: {
            anchor: dataAnchor,
            xAxisScale: calcDataAxisX(0, dataAnchor, false),
          },
        },
      },
    };

    return insideInfo;
  },
  /** @param {cmInsideParam} templateParam */
  insideBtnTemplate1: templateParam => {
    const { rowsCount = 1, shareRate = 0, dataAnchor = 'start' } = templateParam;

    /** @type {mInsideInfo} */
    const insideInfo = {
      headerInfo: {
        bgColor: 'blue',
        shareRate,
        fontSize: 11,
        fontColor: 'white',
      },
      bodyInfo: {
        fontColor: 'white',
        fontSize: 12,
        unitColor: 'orange',
        tblInfo: {
          rowsCount,
          strokeColor: 'white',
          strokeWidth: 1,
          dataInfo: {
            anchor: dataAnchor,
            xAxisScale: calcDataAxisX(0, dataAnchor, false),
          },
        },
      },
    };

    return insideInfo;
  },
};

/**
 * @typedef {Object} cmInsideParam
 * @property {number=} shareRate (default: 0) Height 차지 영역 Rate
 * @property {number=} rowsCount (default: 1) 테이블 행 개수
 * @property {string=} dataAnchor (default: end) 데이터 텍스트 정렬. start: 0.1, middle. 0.5, end. 0.9
 * @property {number=} vStrokeScale (default: 0) 수직 선 시작 X 좌표 비율.
 * @property {number=} xAxisScale (default: vStrokeScale / 2) 타이틀 제목 시작 X 좌표 비율
 */
