const {BU} = require('base-util-jh');
const SVG = require('svg.js');
const _ = require('lodash');
const map = require('./testMap');

class NewSvgMaker {
  startMake() {
    this.makeNodeInfo();
  }

  makeNodeInfo() {
    const structureList = map.setInfo.nodeStructureList;
    structureList.forEach(nodeStructureInfo => {
      const nodeId = nodeStructureInfo.target_id;
      const nodeName = nodeStructureInfo.target_name;

      nodeStructureInfo.defList.forEach(defInfo => {
        defInfo.nodeList.forEach(nodeInfo => {
          const nodeList = [];
          this.makeNodeList(defInfo, nodeInfo);
        });
      });
    });
  }

  /**
   * @param {string} defInfo nodeStructureList의 nodeDefList 순회 정보
   * @param {string} nodeInfo nodeDefList의 순회 정보
   */
  makeNodeList(defInfo, nodeInfo) {
    // const id = `${defInfo.target_prefix}_${nodeInfo.target_code}`;
    const id = 'GV_001';
    const resourceId = defInfo.target_id;
    const parents = [this.getParent(id)];
  }

  getParent(id) {
    map.realtionInfo.placeRelationList.forEach(placeRelationInfo => {
      placeRelationInfo.defList.forEach(defInfo => {
        defInfo.placeList.forEach(placeInfo => {
          const test = _.includes(placeInfo.nodeList, 'GV_001');
          console.log(test);
        });
      });
    });
  }

  // TODO: Step0 --> drawInfo.frame.svgModelResourceList 와 Node Def 관계 정의
  // TODO: Step1 --> relation.placeRelationList를 순회하고 node 카테고리 별 식별정보 생성
  // TODO: Step2 --> Step1과 Step0를 가지고 drawInfo.positionInfo.svgPlaceList 장소 객체를 찾아가서 부모를 가져오고
  //                 Step1의 axis와 moveScale을 이용하여 해당 svgNodeList를 생성한다.
  // TODO: Step3 --> outputMap.js 파일을 생성 한다
  // TODO: Step4 --> outputMap 을 읽어들여 index.html을 구성한다
}
module.exports = NewSvgMaker;
