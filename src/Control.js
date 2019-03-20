const UploadToDB = require('./UploadToDB');
const SvgMaker = require('./SvgMaker');

class Control {
  /** 환경 변수를 읽어 들여 상황에 맞는 메소드 실행 */
  startMapMaker() {
    // map 정보를 읽어 들여 SVG로 표현할 map File 생성.
    // mDrawInfo 연관이 깊음.
    if (process.env.IS_SVG === '1') {
      this.SvgMaker = new SvgMaker();
    }

    // map 정보를 읽어 들여 DB에 Setting (setInfo.)
    // mSetInfo, mrelationInfo 연관이 깊음
    if (process.env.IS_UPLOAD === '1') {
      this.uploadToDB = new UploadToDB();
      // this.uploadToDB.startUpload();
    }
  }
}
module.exports = Control;
