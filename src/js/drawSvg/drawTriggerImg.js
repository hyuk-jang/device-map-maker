/** @type {Map<string, ???>} key: svgModelResourceId */
const mdMapImgTrigger = new Map();

function initTriggerImg() {
  // TODO: Img Trigger 객체 생성 및 mdNodeStorage에 옵저버 등록
  // 옵저버등록 >> mdNodeStorage.get().attach()  사용

  console.log(imgTriggerList);

  imgTriggerList.forEach(imgTriggerInfo => {
    // 저장소 생성

    const threTriStorage = new ThreTriStorage();
    threTriStorage.initThreTri(imgTriggerInfo);

    mdMapImgTrigger.set(imgTriggerInfo.id, threTriStorage);
  });

  // /** @type {mImgTriggerInfo[]} */
  // const imgTriggers = imgTriggerList;
}

function drawTriggerImg() {}
