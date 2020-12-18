import {browser} from 'protractor';

export class AppPage {
  /**
   * Test user configuration
   */
  static username = 'test517357643167';
  static password = 'testTEST!1';

  /**
   * Simple sleep function for debugging
   * @param ms - Time to sleep in ms
   */
  static async delay(ms: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Navigate to base url
   */
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;

  }

  /**
   * Get current browser title
   */
  getTitle(): Promise<string> {
    return browser.getTitle() as Promise<string>;
  }
}
