const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

// Här anger vi var testfilen ska hämtas. De konstiga replaceAll-funktionerna ersätter
// mellanslag med URL-säkra '%20' och backslash (\) på Windows med slash (/).
const fileUnderTest = 'file://' + __dirname.replaceAll(/ /g, '%20').replaceAll(/\\/g, '/') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});

test("push adds a new element to the stack", async () => {
    let push = await driver.findElement(By.id('push')); // hämtar knappen med id:t push
    await push.click();

    let alert = driver.switchTo().alert();
    await alert.sendKeys("Messi är bäst"); // skickar denna sträng till top_of_stack som är FEL!
    await alert.accept(); // accepterar/skickar strängen 

    // hämtar texten som finns i elementet med id:t "top_of_stack" 
    let top_of_stack = await driver.findElement(By.id('top_of_stack')).getText();

    expect(top_of_stack).toEqual("Messi är bäst"); // top_of_stack förväntar sig denna sträng 

});