export class BehaviorHandler {
  constructor() {
    this.behaviors = new Map();
  }

  execute() {
    for (const entity of this.behaviors.keys()) {
      // The value stored in the map is a function, so we execute it by getting it from the map and putting the () in front of it
      this.behaviors.get(entity)(entity);
    }
  }

  run(entity) {
    if (this.behaviors.has(entity)) {
      this.behaviors.get(entity)(entity);
    }
  }

  addBehavior(entity, behavior) {
    if (entity && behavior) {
      this.behaviors.set(entity, behavior);
    }
  }

  removeBehavior(entity) {
    if (this.behaviors.has(entity)) {
      this.behaviors.delete(entity);
    }
  }

  clear() {
    this.behaviors.clear();
  }
}
