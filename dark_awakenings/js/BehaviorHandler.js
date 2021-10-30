import { EntityContainer } from "./EntityContainer.js";

export class BehaviorHandler {
  constructor() {
    this._behaviors = new Map();
    this._entities = new EntityContainer();
  }

  getCount() {
    return this._entities.getCount();
  }

  execute() {
    for (const entity of this._behaviors.keys()) {
      // The value stored in the map is a function, so we execute it by getting it from the map and putting the () in front of it
      this._behaviors.get(entity)(entity);
    }
  }

  run(entity) {
    if (this._behaviors.has(entity)) {
      this._behaviors.get(entity)(entity);
    }
  }

  addBehavior(entity, behavior) {
    if (entity && behavior) {
      this._behaviors.set(entity, behavior);
      this._entities.add(entity);
    }
  }

  _notify(entity) {
    if (this._entities.getEntityOfType("hostile")) {
      if (entity.hp <= 0) {
        console.log(
          `The enemy ${entity.name}${entity.uid} was killed. Removing`
        );
        this.run(entity);
        this.remove(entity);
      }
    }
  }

  getEntityOfType(type) {
    return this._entities.getEntityOfType(type);
  }

  getCountOfType(type) {
    return this._entities.getCountOfType(type);
  }

  remove(entity) {
    if (this._behaviors.has(entity)) {
      this._behaviors.delete(entity);
    }

    this._entities.remove(entity);
  }

  list() {
    this._entities.list();
  }

  clear() {
    this._behaviors.clear();
    this._entities.clear();
  }
}
