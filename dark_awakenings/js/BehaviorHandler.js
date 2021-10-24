export class BehaviorHandler {
  constructor(go) {
    this.gameObject = go;
    this.behaviors = new Map();
  }

  execute() {
    for (const entity of behaviors.keys()) {
      // The value stored in the map is a function, so we execute it by getting it from the map and putting the () in front of it
      this.behaviors.get(entity).execute(entity);
    }
  }

  addBehavior(entity, behavior) {
    if (entity && behavior) {
      this.behaviors.set(entity, behavior);
    }
  }

  removeBehavior(entity) {
    if (this.behaviors.has(entity)) {
      this.behaviors.delete();
    }
  }
}
