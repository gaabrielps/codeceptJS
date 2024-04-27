const {
  setHeadlessWhen,
  setCommonPlugins
} = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './e2e/*_test.js',
  output: './output',
  helpers: {

    Playwright: {
      browser: 'chromium',
      url: 'https://tests.plataformatarget.com.br/web/e2e/login',
      show: true
    }
  },

    LoginHelper: {
      require: './login_helper.js'
    },

    include: {
     I: './steps_file.js',
    gerenciadorDeEncaminhametosPage: "./pages/gerenciadorDeEncaminhametos.js",
    },

  name: 'targetWeb'
}