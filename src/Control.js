const UploadToDB = require('./UploadToDB');

class Control {
  constructor() {
    this.uploadToDB = new UploadToDB();
  }

  startMapUpload() {
    this.uploadToDB.startUpload();
  }
}
module.exports = Control;
