const TRUE_DATA = '1';
const FALSE_DATA = '0';
const ERROR_DATA = '-1';

var _ = _;
var $ = $;
var SVG = SVG;
/** @type {mDeviceMap} */
const realMap = map;

const DATA_RANGE = {
  TRUE: ['OPEN', 'OPENING', 'ON', '1', 'FOLD'],
  FALSE: ['CLOSE', 'CLOSING', 'OFF', '0', 'UNFOLD'],
};

const SENSOR_TYPE = {
  DEVICE: 0,
  SENSOR: 1,
  NONE: -1,
};

const {
  drawInfo: {
    frame: {
      mapInfo: { width: mapWidth, height: mapHeight, backgroundInfo },
      svgModelResourceList,
    },
    positionInfo: { svgNodeList, svgPlaceList },
  },
  setInfo: { nodeStructureList },
  relationInfo: { placeRelationList },
  configInfo: { deviceCmdList } = {},
} = realMap;

// svgModelResourceList 생성
/** @type {Map<string, mSvgModelResource>} */
const mdMapStorage = new Map();

/** @type {Map<string, mdPlaceInfo>} */
const mdPlaceStorage = new Map();

/** @type {Map<string, mdNodeInfo>} nodeId를 기준으로 nodeInfo 정보를 저장할 Map */
const mdNodeStorage = new Map();

/** @type {Map<string, dCmdScenarioInfo>} node Class Id를 기준으로 nodeInfo 정보를 저장할 Map */
const mdDeviceScenaioStorage = new Map();

/**
 * Map 초기화 진행
 * Map<placeId, mdPlaceInfo>, Map<nodeId, mdNodeInfo> 생성
 */
function initDrawSvg() {
  // svgModelResourceList 생성
  svgModelResourceList.forEach(modelInfo => {
    const { id } = modelInfo;
    mdMapStorage.set(id, modelInfo);
  });

  // PlaceRelationList을 순회하면서 Map<placeId, mSvgStorageInfo> 세팅
  placeRelationList.forEach(pClassInfo => {
    const { defList, target_name: pcName } = pClassInfo;
    defList.forEach(pDefInfo => {
      const { target_prefix: pdPrefix, target_name: pdName = pcName, placeList = [] } = pDefInfo;
      // 장소 목록 순회
      placeList.forEach(pInfo => {
        const {
          target_code: pCode = null,
          target_name: pName = pdName,
          nodeList = [],
          svgPositionInfo: { point, resourceId } = {},
        } = pInfo;
        // Place ID 정의

        // svgPositionInfo 정보가 없다면 추가하지 않음
        if (resourceId === undefined) return false;

        const placeId = `${pdPrefix}${pCode ? `_${pCode}` : ''}`;
        const placeName = `${pName}${pCode ? `_${pCode}` : ''}`;

        mdPlaceStorage.set(placeId, {
          placeId,
          placeName,
          nodeList,
          point,
          svgModelResource: mdMapStorage.get(resourceId),
        });
      });
    });
  });

  nodeStructureList.forEach(nClassInfo => {
    const {
      defList,
      is_sensor: isSensor = 1,
      target_id: ncId,
      target_name: ncName,
      data_unit: dataUnit,
    } = nClassInfo;
    defList.forEach(nDefInfo => {
      const { nodeList = [], target_prefix: ndPrefix, target_name: ndName = ncName } = nDefInfo;

      nodeList.forEach(nodeInfo => {
        const {
          target_code: nCode,
          target_name: nName = ndName,
          svgNodePosOpt = {},
          svgNodePosOpt: { resourceId, axisScale, moveScale } = {},
        } = nodeInfo;

        let { svgNodePosOpt: { placeId } = {} } = nodeInfo;

        // SVG Node의 위치 설정 정보가 없을 경우 추가하지 않음
        if (_.isEmpty(svgNodePosOpt)) {
          return false;
        }

        const nodeId = `${ndPrefix}${nCode ? `_${nCode}` : ''}`;
        let nodeName;
        if (typeof nName === 'string' && nName.length) {
          nodeName = nName;
        } else {
          nodeName = `${ndName}${nCode ? `_${nCode}` : ''}`;
        }

        // resourceId의 정보가 없다면 placeRelation에 있는지 찾아서 정의
        if (placeId === undefined) {
          const psIterator = mdPlaceStorage.values();

          let psInfo = psIterator.next();

          while (!psInfo.done) {
            if (_.includes(_.get(psInfo.value, 'nodeList', []), nodeId)) {
              placeId = _.get(psInfo.value, 'placeId');
              break;
            }
            psInfo = psIterator.next();
          }
        }

        mdNodeStorage.set(nodeId, {
          ncId,
          ndName,
          nodeId,
          nodeName,
          nodeData: undefined,
          isSensor,
          dataUnit,
          placeId,
          axisScale,
          moveScale,
          point: [],
          mdPlaceInfo: mdPlaceStorage.get(placeId),
          svgModelResource: mdMapStorage.get(resourceId),
        });
      });
    });
  });

  // 장치 제어 목록 설정
  deviceCmdList.forEach(deviceCmdInfo => {
    const { applyDeviceList, dCmdScenarioInfo } = deviceCmdInfo;
    applyDeviceList.forEach(ncId => {
      mdDeviceScenaioStorage.set(ncId, dCmdScenarioInfo);
    });
  });
}

const SVG_TYPE = {
  place: undefined,
  device: 0,
  sensor: 1,
  non: -1,
};

/**
 *
 * @param {mdNodeInfo} svgPositionInfo
 */
function getSvgType(svgPositionInfo) {
  const { id: nodeId, placeId } = svgPositionInfo;

  return placeId === undefined ? SVG_TYPE.place : mdNodeStorage.get(nodeId).isSensor;
}

/**
 * FIXME: SVG Filter 로딩 오류로 인해 사용하지 못함
 * 그림자
 * @param {SVG} model 그려질 장소.
 * @param {mSvgPositionInfo} svgPositionInfo 장소와 노드를 구분하기 위한 장소 또는 노드의 defId 값
 */
function drawSvgShadow(model, svgPositionInfo) {
  // console.log(model);
  // if (getSvgType === SVG_TYPE.sensor) {
  //   model.attr({ name: 'sensor' });
  //   model.filter(add => {
  //     const blur = add.offset(0, 0).in(add.sourceAlpha);
  //     add.blend(add.source, blur);
  //   });
  // } else {
  //   model.filter(add => {
  //     const blur = add.offset(7, 7).in(add.sourceAlpha).gaussianBlur(4);
  //     add.blend(add.source, blur);
  //   });
  // }
}

/**
 * 패턴 방식 (바둑판 등)
 * @param {svgDrawInfo} svgDrawInfo
 */
function drawSvgPattern(svgDrawInfo) {
  // console.dir(svgDrawInfo);
  const {
    svgCanvas,
    svgPositionInfo: {
      id: positionId,
      point: [x1, y1, x2, y2],
    },
    svgModelResource: {
      elementDrawInfo: {
        color: [defaultColor],
        width,
        height,
        radius = 1,
        opacity = 1,
        strokeInfo,
      },
    },
  } = svgDrawInfo;

  // 그림자를 적용하기위해 pattern 뒤에 사각형 그리기.
  const model = svgCanvas.rect(width, height);
  model.move(x1, y1).stroke({ color: 'black' });

  drawSvgShadow(model, positionId);

  // pattern 안의 작은 사각형의 크기
  const patternSize = 21;
  const pattern = svgCanvas.pattern(patternSize, patternSize, add => {
    add.rect(patternSize, patternSize).fill('white');
    add.rect(patternSize, patternSize).move(0.4, 0.4).fill(defaultColor).radius(radius).attr({
      opacity,
    });
  });
  return svgCanvas.rect(width, height).move(x1, y1).fill(pattern).attr({
    positionId,
    opacity,
  });
}

/**
 * svg.js 의 도형별 그리기 이벤트를 모음
 * @param {svgDrawInfo} svgDrawInfo
 */
function drawSvgElement(svgDrawInfo) {
  // console.log(svgDrawInfo);
  const {
    svgCanvas,
    svgPositionInfo: {
      id: positionId,
      name: positionName,
      point: [x1, y1, x2, y2],
      placeId,
    },
    ownerInfo,
    ownerInfo: {
      svgModelResource: {
        type: svgModelType,
        elementDrawInfo,
        elementDrawInfo: {
          color: [defaultColor],
          radius = 1,
          opacity = 1,
          strokeInfo,
          imgUrl,
        },
        textStyleInfo,
      },
    },
    isShow = true,
  } = svgDrawInfo;

  let { width: svgModelWidth, height: svgModelHeight } = elementDrawInfo;

  let svgCanvasBgElement;

  // SVG 생성
  switch (svgModelType) {
    case 'rect':
      svgCanvasBgElement = svgCanvas.rect(svgModelWidth, svgModelHeight);
      break;
    case 'circle':
      svgModelWidth = radius;
      svgModelHeight = radius;
      svgCanvasBgElement = svgCanvas.circle(radius);
      break;
    case 'image':
      svgCanvasBgElement = svgCanvas.image(imgUrl);
      break;
    case 'line':
      svgCanvasBgElement = svgCanvas.line(x1, y1, x2, y2);
      break;
    case 'polygon':
      svgCanvas.polyline(
        `${svgModelWidth},${0} ${svgModelWidth * 2},${svgModelHeight} ${svgModelWidth},${
          svgModelHeight * 2
        } ${0},${svgModelHeight}`,
      );
      break;
    case 'pattern':
      drawSvgPattern(svgDrawInfo);
      break;
    default:
      break;
  }
  // 모델 색상, 좌표 이동, 외곽선 굵기, Attr 세팅
  svgCanvasBgElement !== undefined &&
    svgCanvasBgElement
      .fill(defaultColor)
      .move(x1, y1)
      .stroke(strokeInfo)
      .attr({
        id: positionId,
        opacity: isShow ? opacity : 0,
      });

  // mdNodeInfo|mdPlaceInfo 에 SVG BG 정의
  ownerInfo.svgEleBg = svgCanvasBgElement;

  // tSpan을 그리기 위한 SVG 생성 정보
  const {
    color = '#000',
    dataColor = '#0014ff',
    fontSize = 10,
    // 행간
    leading = 1.2,
    transform,
    axisScale: [tAxisScaleX, tAxisScaleY] = [0.5, 0.5],
  } = textStyleInfo;

  // 텍스트 그리기
  let textModelDy = 0;
  svgCanvas
    .text(text => {
      // mdNodeInfo|mdPlaceInfo 에 SVG Title 정의
      ownerInfo.svgEleName = text.tspan(positionName).font({ fill: color, size: fontSize });

      // 데이터 공간
      if (placeId !== undefined) {
        textModelDy = -fontSize * 0.7;
        // mdNodeInfo|mdPlaceInfo 에 SVG Data 정의
        ownerInfo.svgEleData = text.tspan(' ').newLine().font({ size: fontSize, fill: dataColor });

        // mdNodeInfo|mdPlaceInfo 에 SVG Data Unit 정의
        ownerInfo.svgEleDataUnit = text.tspan('').font({ size: fontSize * 0.9 });
      }
    })
    // 공통 옵션
    .leading(leading)
    .move(x1 + svgModelWidth * tAxisScaleX, y1 - fontSize / 2 + svgModelHeight * tAxisScaleY)
    .font({ anchor: 'middle', weight: 'bold', transform, 'pointer-events': 'none' })
    .dy(textModelDy);

  return svgCanvasBgElement;
}

/**
 * 노드 또는 센서에 데이터 표시
 * @param {string} nodeId
 * @param {number|string} data 데이터 값
 */
function showNodeData(nodeId, data = '') {
  try {
    const mdNodeInfo = mdNodeStorage.get(nodeId);
    const {
      nodeData,
      isSensor,
      dataUnit = '',
      svgModelResource: {
        elementDrawInfo: { color },
      },
      svgEleBg,
      svgEleData,
      svgEleDataUnit,
    } = mdNodeInfo;

    // 현재 데이터와 수신 받은 데이터가 같다면 종료
    if (nodeData === data) return false;

    // data update
    mdNodeInfo.nodeData = data;

    // data의 상태에 따라 tspan(data, dataUnit) 색상 및 Visible 변경
    let isValidData = 0;
    let colorIndex = 0;

    // node 타입이 Sensor 일 경우에는 Number 형식이 와야함. 아닐 경우 에러
    if (isSensor) {
      isValidData = !Number.isNaN(_.toNumber(data));
    } else {
      // node 타입이 Device 일 경우에는 DATA_RANGE 범위 측정. 아닐 경우 에러
      const strData = _.toString(data);
      const strUpperData = strData.toUpperCase();

      // 데이터가 들어오면 유효한 데이터
      if (strData.length) {
        isValidData = 1;
        colorIndex = 1;
        // False 영역일 경우
        if (DATA_RANGE.TRUE.includes(strUpperData)) {
          colorIndex = 0;
        }
      } else {
        colorIndex = 2;
      }
    }

    svgEleBg.fill(color[colorIndex]);
    if (isValidData) {
      svgEleData.text(data);
      svgEleDataUnit.text(dataUnit).dx(2);
    } else {
      // data가 유효범위가 아닐 경우
      svgEleData.clear();
      svgEleDataUnit.clear();
    }

    return false;
  } catch (e) {
    console.error(e);
  }
}

/**
 * Svg Node Device 객체를 선택하여 제어를 하고자 할 경우
 * @param {mdNodeInfo} mdNodeInfo Device Node Id
 * @param {dCmdScenarioInfo=} dCmdScenarioInfo 현재 수행 중인 장치 제어 단계
 */
function alertDeviceCmdConfirm(mdNodeInfo, dCmdScenarioInfo) {
  const { ncId, ndName = '', nodeName, nodeData } = mdNodeInfo;

  if (dCmdScenarioInfo === undefined) {
    dCmdScenarioInfo = mdDeviceScenaioStorage.get(ncId);
  }
  const { scenarioMsg, isSetValue = false, confirmList } = dCmdScenarioInfo;

  // Node의 현 상태가 Error 일 경우 제어 불가
  if (nodeData === undefined || nodeData === '') {
    alert('장치 상태를 점검해주세요.');
  }

  const btnFn = confirmList.reduce((btnFnInfo, dConfirmInfo) => {
    const { enName, krName, controlValue, nextStepInfo } = dConfirmInfo;

    if (nextStepInfo === undefined) {
      // 다음 스텝이 없으면 즉시 실행
      btnFnInfo[krName] = () => {
        const deviceSetValue = $('#dialog-dynamic-input').val();
        // 값 입력이 활성화 되어 있으나 사용자의 값 입력에 문제가 있을 경우
        if (isSetValue && !deviceSetValue.length) {
        }
        dialog.dialog('close');

        console.log('Cmd 실행', dConfirmInfo, $('#dialog-dynamic-input').val());
      };
    } else {
      btnFnInfo[krName] = () => {
        dialog.dialog('close');
        alertDeviceCmdConfirm(mdNodeInfo, nextStepInfo);
      };
    }
    return btnFnInfo;
  }, {});

  // console.log(document.getElementById('dialog-dynamic'));

  const dynamicDialogDom = $('#dialog-dynamic-template').html();
  const dynamicDialogTemplate = Handlebars.compile(dynamicDialogDom);
  const resultTempalte = dynamicDialogTemplate({
    confirmMsg: scenarioMsg,
    isSetValue,
    setMsg: '가자',
  });

  console.dir(resultTempalte);

  const $dynamicDialog = $('#dialog-dynamic');

  $dynamicDialog.attr('title', `${ndName} ${nodeName} 제어`);

  $dynamicDialog.empty();
  $dynamicDialog.append(resultTempalte);

  showDynamicDialog(btnFn);

  // Dialog 메시지를 생성하여 id: dialog-message의 msg를 변경

  // confirmList에 따라 동적 Function 생성

  // 사용자에게 Confirm 입력 대기

  //
}

/**
 * @param {string} documentId // 그려질 div의 id 값
 * @param {string=} isKorText // 장소, 장치, 센서 한글로 표현 유무
 */
function drawSvgBasePlace(documentId, isKorText = true) {
  const textLang = isKorText ? 'ko' : 'en';
  const { backgroundData = '', backgroundPosition = [0, 0] } = backgroundInfo;

  const svgCanvas = SVG().addTo(`#${documentId}`).size('100%', '100%');

  // canvas 정의
  svgCanvas.attr({
    id: 'svgCanvas',
    class: 'svg_map',
    preserveAspectRatio: 'xMidYMin meet',
    lang: textLang,
  });

  // 브라우저 크기에 반응하기 위한 뷰박스 세팅
  svgCanvas.viewbox(0, 0, mapWidth, mapHeight);

  // map에 배경의 데이터가 있을경우 배경 이미지 지정
  svgCanvas.image(backgroundData).move(backgroundPosition[0], backgroundPosition[1]);

  // Place 그리기
  svgPlaceList.forEach(svgPositionInfo => {
    const { id: placeId } = svgPositionInfo;

    drawSvgElement({
      svgCanvas,
      svgPositionInfo,
      isShow: !backgroundData.length,
      ownerInfo: mdPlaceStorage.get(placeId),
    });
  });

  // Node 그리기
  svgNodeList.forEach(svgNodeInfo => {
    const { id: nodeId } = svgNodeInfo;
    const mdNodeInfo = mdNodeStorage.get(nodeId);

    const svgCanvasBgElement = drawSvgElement({
      svgCanvas,
      svgPositionInfo: svgNodeInfo,
      ownerInfo: mdNodeInfo,
    });

    // 노드 타입이 장치라면 클릭 이벤트 바인딩
    if (mdNodeInfo.isSensor === SENSOR_TYPE.DEVICE) {
      svgCanvasBgElement.click(() => {
        alertDeviceCmdConfirm(mdNodeInfo);
      });
    }
  });

  // FIXME: TEST
  // SVG('#IVT_PW_G_KW_1_title').clear().text('TEST');

  mdNodeStorage.forEach(mdNodeInfo => {
    const { nodeId, isSensor } = mdNodeInfo;
    if (isSensor) {
      showNodeData(nodeId, _.round(_.random(0, 1000, true), 2));
    } else {
      const isDataType = _.random(0, 2);

      let nodeData;

      switch (isDataType) {
        case 0:
          nodeData = DATA_RANGE.FALSE[_.random(0, DATA_RANGE.FALSE.length - 1)];
          break;
        case 1:
          nodeData = DATA_RANGE.TRUE[_.random(0, DATA_RANGE.TRUE.length - 1)];
          break;
        default:
          nodeData = _.round(_.random(0, 1000, true), 2);
          break;
      }
      showNodeData(nodeId, nodeData);
    }
  });
}

/**
 *
 * @typedef {Object} svgDrawInfo
 * @property {SVG} svgCanvas
 * @property {mSvgPositionInfo} svgPositionInfo
 * @property {boolean} isShow default: true,  true: 화면 표시 (기본값), false: 숨김
 * @property {mSvgModelResource} svgModelResource {width, height, radius, color}
 * @property {mdNodeInfo|mdPlaceInfo} ownerInfo mdNodeInfo or mdPlaceInfo
 */
