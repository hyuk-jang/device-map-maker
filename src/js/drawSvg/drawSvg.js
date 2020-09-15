const TRUE_DATA = '1';
const FALSE_DATA = '0';
const ERROR_DATA = '-1';

var _ = _;
var $ = $;
var SVG = SVG;
/** @type {mDeviceMap} */
const realMap = map;

const BASE = {
  TXT: {
    DATA_COLOR: '#0014ff',
    TITLE_COLOR: '#000',
    FONT_SIZE: 10,
    // middle
    ANCHOR: 'middle',
  },
};

const DATA_RANGE = {
  TRUE: ['OPEN', 'OPENING', 'ON', '1', 'FOLD', 'AUTO', 'A'],
  FALSE: ['CLOSE', 'CLOSING', 'OFF', '0', 'UNFOLD', 'MANUAL', 'M'],
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
  configInfo: { deviceCmdList = [] } = {},
} = realMap;

// svgModelResourceList 생성
/** @type {Map<string, mSvgModelResource>} */
const mdMapStorage = new Map();

/** @type {Map<string, mdPlaceInfo>} */
const mdPlaceStorage = new Map();

/** @type {mdPlaceRelHeadStorage} */
const mdPlaceRelationStorage = new Map();

/** @type {Map<string, string[]>} ncId를 기준으로 속해있는 nodeIds  */
const mdNodeClassStorage = new Map();

/** @type {Map<string, mdNodeInfo>} nodeId를 기준으로 nodeInfo 정보를 저장할 Map */
const mdNodeStorage = new Map();

/** @type {Map<string, dCmdScenarioInfo>} node Class Id를 기준으로 명령 정보를 저장할 Map */
const mdDeviceScenaioStorage = new Map();

/** @type {dControlNodeStorage} node Class Id를 기준으로 단일 제어 Select 영역 구성 필요 정보 */
const mdControlIdenStorage = new Map();

/**
 * 장치 제어 식별 Map 생성
 * @param {dCmdScenarioInfo} dCmdScenarioInfo
 * @param {dControlValueStorage=} dControlValueStorage
 */
function initDeviceControlIdentify(dCmdScenarioInfo, dControlValueStorage = new Map()) {
  const { confirmList, scenarioMsg, isSetValue, setValueInfo } = dCmdScenarioInfo;

  confirmList.forEach(confirmInfo => {
    const { enName, krName, controlValue, nextStepInfo } = confirmInfo;

    // 다음 동작이 존재한다면 재귀
    if (nextStepInfo) {
      return this.initDeviceControlIdentify(nextStepInfo, dControlValueStorage);
    }

    /** @type {dControlIdenInfo} */
    const dControlIdenInfo = {
      enName,
      krName,
      scenarioMsg,
      controlValue,
      isSetValue,
      setValueInfo,
    };

    dControlValueStorage.set(controlValue, dControlIdenInfo);
  });

  return dControlValueStorage;
}

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
    const { target_id: pcId, target_name: pcName, defList } = pClassInfo;

    mdPlaceRelationStorage.set(pcId, {
      pcId,
      pcName,
      mdPlaceRelTailStorage: new Map(),
    });

    defList.forEach(pDefInfo => {
      const {
        target_prefix: pdPrefix,
        target_name: pdName = pcName,
        placeList = [],
      } = pDefInfo;
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
        if (resourceId === undefined) {
          return mdPlaceRelationStorage.has(pcId) && mdPlaceRelationStorage.delete(pcId);
        }

        const placeId = `${pdPrefix}${pCode ? `_${pCode}` : ''}`;
        const placeName = `${pName}${pCode ? `_${pCode}` : ''}`;

        mdPlaceRelationStorage.get(pcId).mdPlaceRelTailStorage.set(placeId, {
          pcId,
          pId: placeId,
          pName: placeName,
          getNodeList: () => {
            return nodeList.reduce((mdNodeList, nId) => {
              const mdNodeInfo = mdNodeStorage.get(nId);
              mdNodeInfo.isSensor === 1 && mdNodeList.push(mdNodeInfo);

              return mdNodeList;
            }, []);
          },
        });

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

    mdNodeClassStorage.set(ncId, []);

    defList.forEach(nDefInfo => {
      const {
        nodeList = [],
        target_prefix: ndPrefix,
        target_name: ndName = ncName,
      } = nDefInfo;

      nodeList.forEach(nodeInfo => {
        const {
          target_code: nCode,
          target_name: nName,
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

        mdNodeClassStorage.get(ncId).push(nodeId);

        // 노드를 포함하는 Place Id 목록
        const placeIdList = [];

        mdPlaceStorage.forEach(mdPlaceInfo => {
          const { nodeList: mdPlaceNodeList, placeId: mdPlaceId } = mdPlaceInfo;
          if (mdPlaceNodeList.includes(nodeId)) {
            placeIdList.push(mdPlaceId);

            // placeId의 정보가 없다면 placeRelation에 있는지 찾아서 정의
            if (placeId === '' || placeId === undefined) {
              placeId = mdPlaceId;
            }
          }
        });

        mdNodeStorage.set(nodeId, {
          ncId,
          ncName,
          ndName,
          nodeId,
          nodeName,
          nodeData: undefined,
          isSensor,
          dataUnit,
          axisScale,
          moveScale,
          point: [],
          placeIdList,
          placeNameList: placeIdList.map(pId => mdPlaceStorage.get(pId).placeName),
          svgModelResource: mdMapStorage.get(resourceId),
        });
      });
    });
  });

  // Place Class Storage 수정 (Node 상태에 따라)
  mdPlaceRelationStorage.forEach(mdPlaceRelHeadInfo => {
    const { pcId, mdPlaceRelTailStorage } = mdPlaceRelHeadInfo;

    // 장소에 조건을 충족하는 노드가 없을 경우 Map에서 해당 요소 삭제
    mdPlaceRelTailStorage.forEach((mdPlaceRelTailInfo, pId) => {
      mdPlaceRelTailInfo.getNodeList().length === 0 && mdPlaceRelTailStorage.delete(pId);
    });
    mdPlaceRelTailStorage.size === 0 && mdPlaceRelationStorage.delete(pcId);
  });

  // 장치 제어 목록 설정
  deviceCmdList.forEach(deviceCmdInfo => {
    const { applyDeviceList = [], dCmdScenarioInfo } = deviceCmdInfo;

    const dControlValueStorage = initDeviceControlIdentify(dCmdScenarioInfo);

    applyDeviceList.forEach(ncId => {
      // 장치 제어 식별 Map 생성
      mdDeviceScenaioStorage.set(ncId, dCmdScenarioInfo);
      // Node Class Id 기준으로 해당 식별 Map을 붙여줌
      mdControlIdenStorage.set(ncId, dControlValueStorage);
    });
  });
}

/**
 * FIXME: SVG Filter 로딩 오류로 인해 사용하지 못함
 * 그림자
 * @param {SVG} model 그려질 장소.
 * @param {mSvgPositionInfo} svgPositionInfo 장소와 노드를 구분하기 위한 장소 또는 노드의 defId 값
 */
function drawSvgShadow(model, svgPositionInfo) {
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
 *
 * @param {SVG} svgCanvas
 * @param {mPatternInfo} patternInfo
 */
function drawSvgPattern(svgCanvas, patternInfo) {
  const {
    patternSize: [pW, pH],
    patternList,
  } = patternInfo;

  return svgCanvas.pattern(pW, pH, add => {
    patternList.forEach(elePatternInfo => {
      const {
        patternType,
        fill,
        move: [mX, mY] = [],
        radius,
        size: [width, height],
        opacity = 1,
      } = elePatternInfo;

      switch (patternType) {
        case 'rect':
          add.rect(width, height).opacity(opacity);
          break;
        case 'circle':
          add.circle(radius).opacity(opacity);
          break;
        case 'image':
          add.image(fill).size(width, height).opacity(opacity);
          break;
        default:
          break;
      }

      mX && mY && add.move(mX, mY);
    });
  });
}

/**
 * svg.js 의 도형별 그리기 이벤트를 모음
 * @param {svgDrawInfo} svgDrawInfo
 */
function drawSvgElement(svgDrawInfo) {
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
          errColor = 'red',
          radius = 1,
          opacity = 1,
          strokeInfo,
          patternInfo,
        },
        textStyleInfo,
      },
    },
    isShow = true,
  } = svgDrawInfo;

  let {
    color: [defaultColor],
    width: svgModelWidth,
    height: svgModelHeight,
  } = elementDrawInfo;

  const bgOption = {
    id: positionId,
    opacity: isShow ? opacity : 0,
    drawType: svgModelType,
  };
  // placeId가 존재하지 않으면 Node이고 Node의 isSensor가 0이면 Device이므로 Cursor: Pointer 처리
  if (placeId !== undefined) {
    const { isSensor } = mdNodeStorage.get(positionId);
    isSensor === 0 && (bgOption.cursor = 'pointer');
  }

  let svgCanvasBgElement;

  // SVG 생성
  switch (svgModelType) {
    case 'rect':
      svgCanvasBgElement = svgCanvas.rect(svgModelWidth, svgModelHeight);
      // 장소일 경우 color사용, Place 위에 그려지는 Node의 초기값은 Error
      defaultColor = placeId === undefined ? defaultColor : errColor;
      break;
    case 'circle':
      svgModelWidth = radius * 2;
      svgModelHeight = svgModelWidth;
      svgCanvasBgElement = svgCanvas.circle(radius * 2);
      // 장소일 경우 color사용, Place 위에 그려지는 Node의 초기값은 Error
      defaultColor = placeId === undefined ? defaultColor : errColor;
      break;
    case 'rhombus':
      svgModelWidth = radius * 2;
      svgModelHeight = svgModelWidth;

      svgCanvasBgElement = svgCanvas.polygon(
        `${radius}, 0 ${svgModelWidth}, ${radius} ${radius}, ${svgModelHeight} 0, ${radius} `,
      );
      // 장소일 경우 color사용, Place 위에 그려지는 Node의 초기값은 Error
      defaultColor = placeId === undefined ? defaultColor : errColor;
      break;
    case 'image':
      svgCanvasBgElement = svgCanvas
        .image(defaultColor)
        .size(svgModelWidth, svgModelHeight);
      break;
    case 'line':
      svgCanvasBgElement = svgCanvas.line(x1, y1, x2, y2);
      break;
    case 'pattern':
      svgCanvasBgElement = svgCanvas.rect(svgModelWidth, svgModelHeight);
      // Pattern 가져옴
      defaultColor = drawSvgPattern(svgCanvas, patternInfo);
      break;
    default:
      break;
  }

  if (svgCanvasBgElement !== undefined) {
    svgCanvasBgElement.move(x1, y1).stroke(strokeInfo).attr(bgOption).fill(defaultColor);
  }

  // mdNodeInfo|mdPlaceInfo 에 SVG BG 정의
  ownerInfo.svgEleBg = svgCanvasBgElement;

  // tSpan을 그리기 위한 SVG 생성 정보
  const {
    isHiddenTitle = false,
    isTitleWrap = true,
    leading = 1.1,
    color = BASE.TXT.TITLE_COLOR,
    dataColor: [TXT_DATA_COLOR] = [BASE.TXT.DATA_COLOR],
    fontSize = BASE.TXT.FONT_SIZE,
    transform,
    axisScale: [tAxisScaleX, tAxisScaleY] = [0.5, 0.5],
    anchor = BASE.TXT.ANCHOR,
  } = textStyleInfo;

  // tspan 옵션
  const fontOption = {
    leading,
    anchor: 'middle',
    weight: 'bold',
    transform,
    'dominant-baseline': 'middle',
    'pointer-events': 'none',
  };

  // isTitleWrap을 하지 않을 경우 배경 데이터 공간을 기준으로 [좌: 타이틀, 우: 데이터] text 각각 생성
  if (!isTitleWrap && !isHiddenTitle && placeId !== undefined) {
    const yAxisPoint = y1 + svgModelHeight * tAxisScaleY + fontSize * 0.1;
    // Title 생성
    svgCanvas
      .text(text => {
        // mdNodeInfo|mdPlaceInfo 에 SVG Title 정의
        ownerInfo.svgEleName = text.tspan('').font({ fill: color, size: fontSize });
      })
      // 배경의 좌측 10% 공간에서 시작
      .move(x1 + svgModelWidth * 0.1, yAxisPoint)
      // 시작점에서 우측으로 써나감
      .font({ ...fontOption, anchor: 'start' });

    svgCanvas
      .text(text => {
        ownerInfo.svgEleData = text
          .tspan('')
          .font({ size: fontSize, fill: TXT_DATA_COLOR });
        // mdNodeInfo|mdPlaceInfo 에 SVG Data Unit 정의
        ownerInfo.svgEleDataUnit = text.tspan('').font({ size: fontSize * 0.9 });
      })
      // 배경의 좌측 90% 공간에서 시작
      .move(x1 + svgModelWidth * 0.9, yAxisPoint)
      // 시작점에서 좌측으로 써나감
      .font({ ...fontOption, anchor: 'end' });
    // tspan에 text를 집어넣을 경우 hidden, visible에 따라 위치 버그 발생때문에 아래로 배치
    ownerInfo.svgEleName && ownerInfo.svgEleName.text(positionName);
  } else {
    let yAxisPoint = y1 + svgModelHeight * tAxisScaleY;
    svgCanvas
      .text(text => {
        // mdNodeInfo|mdPlaceInfo 에 SVG Title 정의
        if (!isHiddenTitle) {
          ownerInfo.svgEleName = text.tspan('').font({ fill: color, size: fontSize });
          // PlaceId가 존재하지 않을 경우 장소로 판단.
          // data가 존재하지 않기 때문에 차감('dominant-baseline': 'middle'으로 해도 중심선이 안맞음. fontSize를 기준으로 10% 차감)
          yAxisPoint -=
            placeId === undefined ? fontSize * -0.1 : fontSize * leading * 0.4;
        }

        // 데이터 공간이 있을 경우
        if (placeId !== undefined) {
          // 타이틀을 사용하지 않을 경우
          if (isHiddenTitle) {
            ownerInfo.svgEleData = text
              .tspan(' ')
              .font({ size: fontSize, fill: TXT_DATA_COLOR });
          } else {
            // mdNodeInfo|mdPlaceInfo 에 SVG Data 정의
            ownerInfo.svgEleData = text
              .tspan(' ')
              .newLine()
              .font({ size: fontSize, fill: TXT_DATA_COLOR });
          }
          // mdNodeInfo|mdPlaceInfo 에 SVG Data Unit 정의
          ownerInfo.svgEleDataUnit = text.tspan('').font({ size: fontSize * 0.9 });
        }
      })
      // 공통 옵션
      .move(x1 + svgModelWidth * tAxisScaleX, yAxisPoint)
      .font({ ...fontOption, anchor });

    // tspan에 text를 집어넣을 경우 hidden, visible에 따라 위치 버그 발생때문에 아래로 배치
    ownerInfo.svgEleName && ownerInfo.svgEleName.text(positionName);
  }

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
    // 해당 노드가 존재하지 않는다면 처리 X
    if (mdNodeInfo === undefined) return false;

    const {
      nodeData,
      isSensor,
      dataUnit = '',
      svgModelResource: {
        elementDrawInfo: {
          color: [baseColor, actionColor],
          errColor = 'red',
        },
        textStyleInfo: { dataColor: [txtBaseColor, txtActionColor] = [] } = {},
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
    let selectedColor = baseColor;
    let selectedTxtColor = txtBaseColor;

    // node 타입이 Sensor 일 경우에는 Number 형식이 와야함. 아닐 경우 에러
    if (isSensor) {
      if (data === '' || data === undefined) {
        selectedColor = errColor;
      } else {
        isValidData = 1;

        // string 형식일 경우에는 dataRange 체크
        if (typeof data === 'string' && DATA_RANGE.TRUE.includes(data.toUpperCase())) {
          selectedTxtColor = txtActionColor;
        }
      }
    } else {
      // node 타입이 Device 일 경우에는 DATA_RANGE 범위 측정. 아닐 경우 에러
      const strData = _.toString(data);
      const strUpperData = strData.toUpperCase();

      // 데이터가 들어오면 유효한 데이터
      if (strData.length) {
        isValidData = 1;
        selectedColor = actionColor;
        // False 영역일 경우
        if (DATA_RANGE.FALSE.includes(strUpperData)) {
          selectedColor = baseColor;
        }
      } else {
        selectedColor = errColor;
      }
    }

    // 배경 색상 변경
    svgEleBg.fill(selectedColor);
    // 데이터 색상 변경
    svgEleData.font({ fill: selectedTxtColor });
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
function alertDeviceCmdConfirm(mdNodeInfo, dCmdScenarioInfo = {}) {
  const { ncId, ndName = '', nodeId, nodeName, nodeData } = mdNodeInfo;

  const deviceName = `${ndName}(${nodeName})`;

  // 노드 장치 제어 정보가 없을 경우
  if (_.isEmpty(dCmdScenarioInfo)) {
    const deviceScenarioInfo = mdDeviceScenaioStorage.get(ncId);
    // map에 해당 장치 노드 조작 정보가 있다면 입력
    deviceScenarioInfo !== undefined && (dCmdScenarioInfo = deviceScenarioInfo);
  }
  // 노드 장치 제어 정보
  const {
    scenarioMsg = '제어 동작을 선택하세요.',
    isSetValue = false,
    setValueInfo: { msg = '', min = 0, max = 100 } = {},
    confirmList = [
      {
        enName: 'On/Open',
        krName: '동작',
        controlValue: 1,
      },
      {
        enName: 'Off/Close',
        krName: '정지',
        controlValue: 0,
      },
    ],
  } = dCmdScenarioInfo;

  // Node의 현 상태가 Error 일 경우 제어 불가
  if (nodeData === undefined || nodeData === '') {
    alert(`${deviceName}의 상태를 점검해주세요.`);
  }

  // 동적 다이어로그 구성
  const btnFn = confirmList.reduce((btnFnInfo, dConfirmInfo) => {
    const { krName, controlValue, nextStepInfo } = dConfirmInfo;

    let deviceSetValue = '';
    if (nextStepInfo === undefined) {
      // 다음 스텝이 없으면 즉시 실행
      // eslint-disable-next-line func-names
      btnFnInfo[krName] = function () {
        const $deviceSetValue = $('#dialog-dynamic-input');
        // 값 입력이 활성화 되어 있으나 사용자의 값 입력에 문제가 있을 경우
        if (isSetValue) {
          deviceSetValue = $deviceSetValue.val();
          if (!deviceSetValue.length) {
            // 값 존재 필요
            return $deviceSetValue.addClass('ui-state-error');
          }

          const inputMin = Number($deviceSetValue.attr('min'));
          const inputMax = Number($deviceSetValue.attr('max'));
          // 데이터의 유효 범위 충족 여부
          const isGoodScope = deviceSetValue >= inputMin && deviceSetValue <= inputMax;

          if (!isGoodScope) {
            // 데이터 범위 오류
            return $deviceSetValue.addClass('ui-state-error');
          }
        }

        $(this).dialog('close');

        // TODO: Execute 전송
        console.log('Execute', deviceSetValue, controlValue);
        typeof reqSingleControl === 'function' &&
          reqSingleControl(nodeId, controlValue, deviceSetValue);
      };
    } else {
      // eslint-disable-next-line func-names
      btnFnInfo[krName] = function () {
        $(this).dialog('close');
        alertDeviceCmdConfirm(mdNodeInfo, nextStepInfo);
      };
    }
    return btnFnInfo;
  }, {});

  // 동적 다이어로그 박스 생성
  const dynamicDialogDom = $('#dialog-dynamic-template').html();
  const dynamicDialogTemplate = Handlebars.compile(dynamicDialogDom);
  const resultTempalte = dynamicDialogTemplate({
    confirmMsg: scenarioMsg,
    isSetValue,
    setMsg: msg,
    min,
    max,
  });

  const $dynamicDialog = $('#dialog-dynamic');

  $dynamicDialog.empty();
  $dynamicDialog.append(resultTempalte);

  // Dialog 메시지를 생성하여 dialog title, 버튼 정보 전송
  showDynamicDialog(`${deviceName} 제어`, btnFn);
}

/**
 * SVG Map 세팅
 * @param {string} documentId // 그려질 div의 id 값
 * @param {string=} isKorText // 장소, 장치, 센서 한글로 표현 유무
 */
function drawSvgBasePlace(documentId, isKorText = true) {
  const textLang = isKorText ? 'ko' : 'en';
  const {
    backgroundData = '',
    backgroundPosition: [bgPosX, bgPosY] = [0, 0],
  } = backgroundInfo;

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

  // 일반 색상으로 표현하고자 할 경우
  if (backgroundData.length < 8) {
    const bgColor = backgroundData.length === 0 ? '#fff3bf' : backgroundData;

    svgCanvas
      .rect(mapWidth, mapHeight)
      .fill(bgColor)
      .stroke({
        width: 1,
        color: '#ccc',
      })
      .opacity(0.1);
  } else {
    // map에 배경의 데이터가 있을경우 배경 이미지 지정
    svgCanvas.image(backgroundData).move(bgPosX, bgPosY);
  }

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
}

/**
 * Simulator 데이터 입력
 */
function runSimulator() {
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
