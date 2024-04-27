// login_helper.js

const { Helper } = codeceptjs;

class LoginHelper extends Helper {
  async login(username, password) {
    // Seu código de login aqui
    // Por exemplo:
    await this.helpers.WebDriver.amOnPage('https://tests.plataformatarget.com.br/web/e2e/login');
    await this.helpers.WebDriver.fillField("//input[@placeholder='Email']", username);
    await this.helpers.WebDriver.fillField("//input[@placeholder='Senha']", password);
    await this.helpers.WebDriver.click("//button[@key='sign-in']");
  }

  async _before() {
    // Realiza o login antes de iniciar os testes
    await this.login("suporte@communis.com.br", "f@ct@rget153624$$");
  }
}

module.exports = LoginHelper;
