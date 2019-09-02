import puppeteer from 'puppeteer';
import 'regenerator-runtime/runtime';

let browser;
let page;

const options = {
  headless: false,
  slowMo: 250,
  devtools: true
};

beforeAll(async () => {
  browser = await puppeteer.launch(options);
  page = await browser.newPage();
  await page.goto('http://localhost:3000/');
}, 30000);

afterAll(() => {
  browser.close();
});

test('can user type input and send', async () => {
  await page.waitForSelector('#example-only-filter-name', { visible: true });
  await page.focus('#example-only-filter-name');
  await page.keyboard.type('Josh');
  await page.focus('#example-only-filter-password');
  await page.keyboard.type('testing');
  const sendButton = await page.$('[id="send"]');
  await sendButton.click();
}, 30000);

it('should type in input field with name of "age"', async () => {
  await page.waitForSelector('input[name=age]', { visible: true });
  await page.focus('input[name=age]');
  await page.keyboard.type('1000');
}, 30000);
