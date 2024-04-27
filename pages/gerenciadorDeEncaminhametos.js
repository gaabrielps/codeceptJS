const { I } = inject();

module.exports = {

  goToManegerAssignment: function (){
        //acessando e abrindo o modal de gerenciamento
        I.seeElement("li[class$=test-menu-management]")
        I.click("li[class$=test-menu-management]")
    
        //Clicando no botão de encaminhamentos e acessando página de encaminhamentos
        I.seeElement("li[title=Encaminhamentos]")
        I.click("li[title=Encaminhamentos]")
        I.wait(5)

        //Validando se estamos na página de encaminhameentos
        I.see('Gerenciador de Encaminhamentos')
  },

  selectResponsible: function(fullName) {
    I.click("//input[@placeholder='Quem será responsável?']")
    I.fillField("//input[@placeholder='Quem será responsável?']", `${fullName}`)
    I.wait(5)
    I.click(`//h5[.='${fullName}']`)

  }

}
