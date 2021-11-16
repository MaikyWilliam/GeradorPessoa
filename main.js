const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const chrome = require('selenium-webdriver/chrome');


class GeradorPessoa {
    constructor() {
        this.driver;
    }

    async run(){

        await this.init();
        await this.createArquivo();
    }

    async init(){
        let options = new chrome.Options();
    
        //Argumento para não exibir o navegador
        options.addArguments('--headless');
        this.driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    }

    async getCPF(){
        try{
            await this.driver.get('https://www.4devs.com.br/gerador_de_pessoas');
            await this.driver.manage().window().maximize();
            await this.driver.findElement(By.className('checkmark')).click();
            await this.driver.findElement(By.id('idade')).sendKeys('28');
            await this.driver.findElement(By.id('cep_estado')).sendKeys('RS', Key.RETURN);
            await this.driver.sleep(1000);
            await this.driver.findElement(By.id('cep_cidade')).sendKeys('RS', Key.RETURN);
            await this.driver.findElement(By.id('pontuacao_nao')).click();
            await this.driver.findElement(By.id('bt_gerar_pessoa')).click();
            await this.driver.sleep(1000);
            await this.driver.findElement(By.xpath('//*[@id="btn_json_tab"]')).click();
            await this.driver.sleep(1000);
            await this.driver.findElement(By.xpath('//*[@id="area_resposta_json"]/div/button[2]')).click();
            await this.driver.findElement(By.xpath('//*[@id="area_resposta_json"]/div/button[2]')).click();
    
            let data = await this.driver.findElement(By.id('dados_json')).getText();

            return data;

        }catch(error){

        }
    }

    async createArquivo(){

        const data = await this.getCPF();

        fs.writeFile('Pessoa.json', data, (err) => {
            if (err) throw err;
            console.log('Arquivo criado');
        });
    }
}

const bot = new GeradorPessoa;
bot.run();