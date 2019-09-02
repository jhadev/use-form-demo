const puppeteer = require('puppeteer');

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
  page.setViewport({ width: 400, height: 1920 });
}, 30000);

afterAll(() => {
  browser.close();
});

test('can user type input and click button', async () => {
  await page.waitForSelector('#example-only-filter-name', { visible: true });
  await page.focus('#example-only-filter-name');
  await page.keyboard.type('Josh');
  await page.focus('#example-only-filter-password');
  await page.keyboard.type('testing');
  await page.click('button', { text: 'Send Data' });
  console.log('clicked');
}, 30000);
