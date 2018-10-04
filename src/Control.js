const UploadToDB = require('./UploadToDB');
const SvgMaker = require('./testSvg/NewSvgMaker');

class Control {
  /** 환경 변수를 읽어 들여 상황에 맞는 메소드 실행 */
  startMapMaker() {
    // map 정보를 읽어 들여 SVG로 표현할 map File 생성.
    // mDrawInfo 연관이 깊음.
    if (process.env.HAS_SVG === 'true') {
      this.svgMaker = new SvgMaker();
      this.svgMaker.startMake();
    }

    // map 정보를 읽어 들여 DB에 Setting (setInfo.)
    // mSetInfo, mRealtionInfo 연관이 깊음
    if (process.env.HAS_UPLOAD === 'true') {
      this.uploadToDB = new UploadToDB();
      this.uploadToDB.startUpload();
    }
  }
}
module.exports = Control;
