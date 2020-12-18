import {AppPage} from './app.po';
import {browser, by, element, logging, protractor} from 'protractor';

describe('workspace-project ConnectApp', () => {
  let page: AppPage;
  const testUsername = AppPage.username;
  const testPassword = AppPage.password;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Should display tab title \'ConnectApp: Home\'', () => {
    browser.waitForAngularEnabled(false);
    page.navigateTo();
    expect(page.getTitle()).toEqual('ConnectApp: Home');
  });

  it('Should navigate to register form', async () => {
    browser.waitForAngularEnabled(true);
    await browser.get('http://localhost:4200/register');
    const elm = await element(by.id('registerUsername'));
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(elm), 5000);
    return expect<any>(browser.getCurrentUrl()).toEqual('http://localhost:4200/register');
  });

  it('Should register test user', async () => {
    browser.waitForAngularEnabled(true);
    await element(by.id('registerUsername')).sendKeys(testUsername);
    await element(by.id('registerPassword')).sendKeys(testPassword);
    await element(by.id('registerPasswordRepeat')).sendKeys(testPassword);
    const registerBtn = await element(by.id('register-btn'));
    const EC = protractor.ExpectedConditions;
    await browser.wait(EC.elementToBeClickable(registerBtn), 5000);
    await registerBtn.click();
    const registerAlert = await element(by.id('register-alert'));
    await browser.wait(EC.elementToBeClickable(registerAlert), 10000);
    return expect(registerAlert.getText()).toBe(`Account ${testUsername} created! You can now login.`);
  });

  it('Should navigate to login form', async () => {
    browser.waitForAngularEnabled(true);
    await browser.get('http://localhost:4200/login');
    const elm = await element(by.id('username'));
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(elm), 5000);
    return expect<any>(browser.getCurrentUrl()).toEqual('http://localhost:4200/login');
  });

  it('Should login with test user', async () => {
    browser.waitForAngularEnabled(true);
    await element(by.id('username')).sendKeys(testUsername);
    await element(by.id('password')).sendKeys(testPassword);
    const submitBtn = await element(by.id('submit-btn'));
    const EC = protractor.ExpectedConditions;
    await browser.wait(EC.elementToBeClickable(submitBtn), 5000);
    await submitBtn.click();
    browser.waitForAngularEnabled(false);
    const helpCard = await element(by.id('help-card'));
    await browser.wait(EC.elementToBeClickable(helpCard), 5000);
    return expect<any>(browser.getCurrentUrl()).toEqual('http://localhost:4200/?p=1');
  });

  it('Should navigate to delete user', async () => {
    browser.waitForAngularEnabled(false);
    await browser.get('http://localhost:4200/user/delete');
    browser.waitForAngularEnabled(true);
    const elm = await element(by.id('deleteUsername'));
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(elm), 5000);
    return expect<any>(browser.getCurrentUrl()).toEqual('http://localhost:4200/user/delete');
  });

  it('Delete test user', async () => {
    browser.waitForAngularEnabled(true);
    await element(by.id('deleteUsername')).sendKeys(testUsername);
    const deleteBtn = await element(by.id('delete-btn'));
    const EC = protractor.ExpectedConditions;
    await browser.wait(EC.elementToBeClickable(deleteBtn), 5000);
    await deleteBtn.click();
    const deleteAlert = await element(by.id('delete-alert'));
    await browser.wait(EC.elementToBeClickable(deleteAlert), 15000);
    return expect<any>(deleteAlert.getText()).toEqual('Successfully deleted account.');
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
})
;
