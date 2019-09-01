describe('app', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000');
  }, 20000);

  it('should match input with id "example-map-state" and fill the input', async () => {
    await page.waitForSelector(
      'input',
      { timeout: 10000, visible: true },
      async () => {
        await expect(page).toFillForm('input[id="example-map-state"]', {
          name: 'James'
        });
      }
    );
  }, 20000);

  it('should click a button', async () => {
    await expect(page).toClick('button', { text: 'Send' });
    console.log('clicked');
  });
}, 20000);
