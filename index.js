const Control = require('./src/Control');

module.exports = Control;

// if __main process
if (require !== undefined && require.main === module) {
  console.log('__main__');

  require('dotenv').config();

  console.log(process.env.HAS_UPLOAD);
  const control = new Control();
  control.startMapMaker();

  process.on('uncaughtException', err => {
    // BU.debugConsole();
    console.error(err.stack);
    console.log(err.message);
    console.log('Node NOT Exiting...');
  });

  process.on('unhandledRejection', err => {
    // BU.debugConsole();
    console.dir(err);
    console.log('Node NOT Exiting...');
  });
}
