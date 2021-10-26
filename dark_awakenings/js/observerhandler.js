export class ObserverHandler {
  constructor() {
    this.hpObservers = [];
  }

  add(o) {
    if (o) {
      this.hpObservers.push(o);
    }
  }

  notify() {} // notify all

  notify(o) {
    // notify specific observer
    for (let i = 0; i < this.hpObservers.length; i++) {
      this.hpObservers[i]._notify(o);
    }
  }
}
