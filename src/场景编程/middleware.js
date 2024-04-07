class MiddleWare {
  constructor() {
    this.isRunning = false;
    this.middleWares = [];
    this.current = 0;
  }
  add(middleWare) {
    this.middleWares.push(middleWare);
  }
  async run() {
    if (this.isRunning) return;
    this.isRunning = true;
    await this.runMiddleWare();
  }
  async #runMiddleWare() {
    if (this.current >= this.middleWares.length) {
      this.isRunning = false;
      this.current = 0;
      this.middleWares = [];
      return;
    }
    const middleWare = this.middleWares.shift();
    const pre = this.current;
    await middleWare(this.next.bind(this));
    const current = this.current;
    if (pre === current) {
      this.next();
    }
  }
  async #next() {
    this.current++;
    await this.runMiddleWare();
  }
}
