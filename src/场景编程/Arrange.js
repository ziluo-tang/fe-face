class Arrange {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
  _wait(delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
  waitFirst(delay) {
    this.tasks.unshift(this._wait(delay));
    return this;
  }
  wait(delay) {
    this.tasks.push(this._wait(delay));
    return this;
  }
  do(task) {
    this.tasks.push(task);
    return this;
  }
  async execute() {
    for (const task of this.tasks) {
      const ret = await Promise.resolve(task);
      ret && console.log(ret);
    }
  }
}

// const scheduer = new Arrange("scheduler");
// scheduer.do("task1").wait(2000).do("task2").execute();

const arrange = () => {
  const tasks = [];
  return {
    doFirst(task) {
      tasks.unshift(task);
      return this;
    },
    wait(timer) {
      const p = new Promise((resolve, reject) => {
        setTimeout(resolve, timer);
      });
      tasks.push(p);
      return this;
    },
    do(task) {
      tasks.push(task);
      return this;
    },
    async execute() {
      for (const task of tasks) {
        const ret = await Promise.resolve(task);
        console.log(ret);
      }
    },
  };
};

arrange().do('hello do').wait(200).doFirst('hello first').execute()
