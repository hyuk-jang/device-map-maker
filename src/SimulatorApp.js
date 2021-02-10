const _ = require('lodash');
const express = require('express');
const path = require('path');

const ejs = require('ejs');

const http = require('http');

const { BU } = require('base-util-jh');

class SimulatorApp {
  /**
   *
   * @param {number} appPort 포트
   * @param {mDeviceMap} defaultMap
   */
  constructor(appPort = 8000, defaultMap) {
    this.appPort = appPort;

    /** @type {mDeviceMap} */
    this.deviceMap = defaultMap;

    const app = express();

    app.use(express.static(path.join(__dirname, '/')));

    app.engine('html', ejs.renderFile);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, 'view'));
    app.use(
      '/out',
      express.static(path.join(__dirname, '..', 'out'), {
        extensions: ['jpg', 'png', 'gif'],
      }),
    );

    // 웹 페이지 이미지
    app.use(
      '/img',
      express.static(path.join(__dirname, '..', 'img'), {
        extensions: ['jpg', 'png', 'gif'],
      }),
    );

    // 맵 이미지
    app.use(
      '/map',
      express.static(
        path.join(
          process.cwd(),
          ...['out', process.env.SOURCE_PATH, process.env.SOURCE_FILE].filter(
            pjId => typeof pjId === 'string' && pjId.length,
          ),
        ),
        {
          extensions: ['jpg', 'png', 'gif'],
        },
      ),
    );

    this.app = app;

    this.server = http.createServer(app);
  }

  init() {
    this.app.get('/', (req, res) => {
      res.render('./index', {
        map: this.deviceMap,
      });
    });

    this.server.listen(this.appPort, () => {
      console.log(`Simulator server listening on port ${this.appPort}`);
    });
  }
}
module.exports = SimulatorApp;
