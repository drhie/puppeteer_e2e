/**
 * Walkthrough class
 */
class Walkthrough {
  constructor(args) {
    this.browser = args.browser;
    this.page = args.page;
  }

  async clickButton(buttonId, options = {}) {
    if (options.newTab === true) {
      const newPagePromise = new Promise((resolve) =>
        this.browser.once('targetcreated', (target) =>
          resolve(target.page())
        )
      );
      await this.page.click(buttonId);
      this.page = await newPagePromise;
    } else {
      await Promise.all([
        this.page.click(buttonId),
        this.page.waitForNavigation({'waitUntil': 'networkidle0'}),
      ]);
    }
  };

  async autoScroll() {
    await this.page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        let totalHeight = 0;
        const distance = 50;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 10);
      });
    });
  };
};

module.exports = Walkthrough;


