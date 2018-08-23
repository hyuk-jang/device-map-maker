const UploadToDB = require('./UploadToDB');
const SvgMaker = require('./SvgMaker');

class Control {
  constructor() {
    this.uploadToDB = new UploadToDB();
    this.svgMaker = new SvgMaker();
  }

  startMapUpload() {
    this.uploadToDB.startUpload();
  }

  startSvgMapMaker() {
    this.svgMaker.getResource();
  }
}
module.exports = Control;
