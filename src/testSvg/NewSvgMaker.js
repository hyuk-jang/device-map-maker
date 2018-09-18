const {BU} = require('base-util-jh');
const SVG = require('svg.js');
const _ = require('lodash');
const map = require('./testMap');

class NewSvgMaker {
  drawPlace() {
    const bgWidth = map.drawInfo.frame.mapSize.width;
    const bgHeight = map.drawInfo.frame.mapSize.height;
    const canvas = SVG('canvas').size(bgWidth, bgHeight);

    this.placeMake();
  }

  /**
   * 
   * @param {string=} canvas 
   */
  startMake(canvas) {
    const svgPlaceList = map.drawInfo.positionInfo.svgPlaceList;
    // 
    svgPlaceList.forEach(list => {
      _.forEach(list.placeList, (value, key) => {
        const target = this.newMethod(value);
      });
    });
  }

  newMethod(value) {
    const svgModelResourceList = map.drawInfo.frame.svgModelResourceList;
    svgModelResourceList.forEach(objResourceList => {
      const objPlaceInfo = _.find(value, {id: objResourceList.id});
      const objPosition = objPlaceInfo.id;
      }
    return null;
  }
}
module.exports = NewSvgMaker;
