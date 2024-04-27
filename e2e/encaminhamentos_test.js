const { faker } = require('@faker-js/faker');
const { selectResponsible } = require('../pages/gerenciadorDeEncaminhametos');
const LoginHelper = require('../login_helper');

Feature('encaminhamentos');



Before(({ I }) => { // or Background
   I.amOnPage('https://qa01.plataformatarget.com.br/web/govba/login')
   I.fillField("//input[@placeholder='Email']", "suporte@communis.com.br" )
   I.fillField("//input[@placeholder='Senha']", "f@ct@rget153624$$")
   I.click("//button[@key='sign-in']");
   I.wait(4)

  });



//Criação de encaminhamentos
Scenario('TG-TC-809', ({ I, gerenciadorDeEncaminhametosPage}) => {

        const nomeEncaminhamento = faker.lorem.sentence()

        // ir para o gerenciador de encaminhamento pelo menu
        gerenciadorDeEncaminhametosPage.goToManegerAssignment()


        //Clicando no botão de adicionar
        I.click("button[class='btn btn-info animate ng-scope']")

        //Verificar se a página de criação de encaminhamentos está visivel
        I.see("Criar Encaminhamento")
        
        //Nome
        I.wait(5)
        I.fillField("//div[@placeholder='Escrever encaminhamento']", nomeEncaminhamento)
        
        //tipo
        I.click("//div[@ng-model='editor.data.assignment.type']")
        I.click("//span[.='Gerencial']")

        //previsão
        I.click("//input[@ng-model='editor.data.assignment.predictDateFormatted']")
        I.fillField("//input[@ng-model='editor.data.assignment.predictDateFormatted']", "01/12/2024")

        //Responsável e Sub-Responsável
        gerenciadorDeEncaminhametosPage.selectResponsible('Gabriel Lopes Araujo')


     
        I.click("//input[@placeholder='Quem será responsável?']")
        I.fillField("//input[@placeholder='Quem será responsável?']", "Lion Simon")
        I.wait(5)
        I.click("//h5[.='Lion Simon']")



        //status
        I.click("//div[@class='select-status']")
        I.click("//span[@class='ng-binding'][.='andamento']")

        //Relações Entidade
        I.click("//input[@placeholder='Pesquisar projetos, indicadores ou instituições']")
        I.fillField("//input[@placeholder='Pesquisar projetos, indicadores ou instituições']", "Entidade para vincular encaminhamentos")
        I.wait(3)
        I.click("//h5[.='Entidade para vincular encaminhamentos']")
        I.seeElement("//span[@uib-tooltip='Entidade para vincular encaminhamentos']")
        I.wait(5)
        
        //Relações Agency
        I.click("//input[@placeholder='Pesquisar projetos, indicadores ou instituições']")
        I.fillField("//input[@placeholder='Pesquisar projetos, indicadores ou instituições']", "Qualidade")
        I.click("(//span[@class='tg-lang ng-binding'][.='Instituição'])[2]")
        I.click("//h5[.='QA - Qualidade']")
        I.click("//a[@uib-tooltip='Instituição']")
        I.wait(1)
        I.seeElement("//div[@class='agency_panel ng-binding']")
        I.wait(3)

        //Relações Indicadores
        I.click("//input[@placeholder='Pesquisar projetos, indicadores ou instituições']")
        I.fillField("//input[@placeholder='Pesquisar projetos, indicadores ou instituições']", "Indicadores")
        I.click("(//span[@class='tg-lang ng-binding'][.='Indicadores'])[2]")
        I.click("//h5[.='Indicadores para vincular encaminhamentos']")
        I.click("//a[@uib-tooltip='Indicadores']")
        I.wait(1)
        I.seeElement("//span[@uib-tooltip='Indicadores para vincular encaminhamentos']")
        I.wait(3)


        //salvar
        I.click("//button[@class='btn btn-primary animate'][@type='button']") 
        I.wait(5)

        //validar o nome faker
        I.see(nomeEncaminhamento)

        // ir para o gerenciador de encaminhamento pelo menu
        gerenciadorDeEncaminhametosPage.goToManegerAssignment()

})

//Edição de encaminhamentos
Scenario('TG-TC-812', ({ I, gerenciadorDeEncaminhametosPage }) => {

    const nomeEncaminhamento = faker.lorem.sentence()

    // ir para o gerenciador de encaminhamento pelo menu
    gerenciadorDeEncaminhametosPage.goToManegerAssignment()


    //Clicando no botão de menu opções e no botão de edição no primeiro encaminhamento
    I.click("(//button[@class='btn btn-primary btn-xs'])[2]")
    I.click("(//span[@class='tg-lang ng-binding'][.='Editar'])[2]")

    //Verificar se a página de criação de encaminhamentos está visivel
    I.see("Editar Encaminhamento")
    
    //Nome
    I.wait(5)
    I.fillField("//div[@placeholder='Escrever encaminhamento']",nomeEncaminhamento)
    
    //tipo
    I.click("//div[@ng-model='editor.data.assignment.type']")
    I.click("//span[.='Operacional']")

    //previsão
    I.click("//input[@ng-model='editor.data.assignment.predictDateFormatted']")
    I.fillField("//input[@ng-model='editor.data.assignment.predictDateFormatted']", "11/01/2025")

    //Responsável
    I.click("//input[@placeholder='Quem será responsável?']")
    I.fillField("//input[@placeholder='Quem será responsável?']", "Arthur Hendrich")
    I.wait(5)
    I.click("//h5[.='Arthur Hendrich']")


    //status
    I.click("//div[@class='select-status']")
    I.click("//span[@class='ng-binding'][.='a iniciar']")

    //Relação, retirar 
    I.click("(//span[@class='iconfont animate icon-cancel'])[1]")
    I.wait(5)

    //salvar
   I.click("//button[@class='btn btn-primary animate'][@type='button']") 
   I.wait(5)

    //validar o nome faker
    I.see(nomeEncaminhamento)
    I.wait(2)
    I.see("Encaminhamento salvo com sucesso")

})

//Inativar e Reativar encaminhamento
Scenario('TG-TC-815 e TG-TC-816', ({ I, gerenciadorDeEncaminhametosPage}) => {
    // ir para o gerenciador de encaminhamento pelo menu
    gerenciadorDeEncaminhametosPage.goToManegerAssignment()
    const nomeEncaminhamento = `"Encaminhamento criado para ativar e inativar"`

    //Buscar encaminhamento para inativar
    I.fillField("(//div[@class='input-group']//input)[1]", nomeEncaminhamento)

    //Clicando no botão de menu de opçoes e clicando em inativar no primeiro encaminhamento
    I.click("(//button[@class='btn btn-primary btn-xs'])[2]")
    I.click("(//span[@class='tg-lang ng-binding'][.='Inativar'])[2]")

    //clicando na flag de inativos
    I.click("//span[.='Exibir Inativos']//..//tg-switch")

    I.seeElement("//span[.='Inativo']")
    

    //Clicando no botão de menu de opçoes e clicando em reativar no primeiro encaminhamento
    I.click("(//button[@class='btn btn-primary btn-xs'])[2]")
    I.click("(//span[@class='tg-lang ng-binding'][.='Reativar'])[2]")


})

Scenario('Exclusão Encaminhamentos', ({ I, gerenciadorDeEncaminhametosPage}) => {
    // ir para o gerenciador de encaminhamento pelo menu
    gerenciadorDeEncaminhametosPage.goToManegerAssignment()

    //Clicando no botão de menu de opçoes e clicando em inativar no primeiro encaminhamento
    I.click("(//button[@class='btn btn-primary btn-xs'])[2]")
    I.click("(//span[@class='tg-lang ng-binding'][.='Deletar'])[2]")
    I.wait(2)
})

Scenario('Comentar em encaminhamentos pelo gerenciador', ({ I,gerenciadorDeEncaminhametosPage }) => {
    // ir para o gerenciador de encaminhamento pelo menu
    gerenciadorDeEncaminhametosPage.goToManegerAssignment()
    I.click("(//button [@ng-if='canUpdateAssignment'])[1]")
    I.fillField("(//div[@placeholder= 'Escrever comentário'])[1]", "Olha, todo mundo está comentando Seu cartaz tá aumentando")
})


