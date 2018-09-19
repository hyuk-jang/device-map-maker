const {BU} = require('base-util-jh');
const SVG = require('svg.js');
const _ = require('lodash');
const map = require('./testMap');

class NewSvgMaker {
  startMake() {
    console.log('hi');
  }

  // TODO: Step0 --> drawInfo.frame.svgModelResourceList 와 Node Def 관계 정의
  nodeDef() {
    const svgModelResourceList = map.drawInfo.frame.svgModelResourceList;
    
  }

  // TODO: Step1 --> relation.placeRelationList를 순회하고 node 카테고리 별 식별정보 생성

  // TODO: Step2 --> Step1과 Step0를 가지고 drawInfo.positionInfo.svgPlaceList 장소 객체를 찾아가서 부모를 가져오고
  // Step1의 axis와 moveScale을 이용하여 해당 svgNodeList를 생성한다.

  // TODO: Step3 --> outputMap.js 파일을 생성 한다

  // TODO: Step4 --> outputMap 을 읽어들여 index.html을 구성한다
}
module.exports = NewSvgMaker;
