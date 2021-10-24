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
      let character = this.hpObservers[i]._char;
      if (character.id === o.id) {
        if (character.uid === o.uid) {
          character.hp = o.hp;
        }
      }
    }
  }
}
