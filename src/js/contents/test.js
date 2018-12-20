const $this = this;

$this.fs = require('fs');

$this.path = '/folderPath';

$this.fs.readdir($this.path, (err, folders) => {
  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];

    const fPath = `${$this.path}/${folder}`; // 하위 폴더 경로 반환

    const files = $this.fs.readdirSync(fPath); // 하위 폴더 내 파일 검색

    console.log(fPath);

    console.log(files);
  }
});
