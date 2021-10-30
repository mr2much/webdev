export class EntityContainer {
  constructor() {
    this.entities = [];
  }

  add(entity) {
    if (entity) {
      this.entities.push(entity);
    }
  }

  getCount() {
    return this.entities.length;
  }

  getEntityOfType(type) {
    let entity;

    if (this.entities.some((entity) => entity["type"] === type)) {
      do {
        let numberOfEntities = this.entities.length;
        let randomIndex = Math.floor(Math.random() * numberOfEntities);
        entity = this.entities[randomIndex];
      } while (entity.type !== type && entity.state !== "dead");
    }

    return entity;
  }

  getCountOfType(type) {
    let count = 0;

    for (let i = 0; i < this.entities.length; i++) {
      if (this.entities[i].type === type) {
        count++;
      }
    }

    return count;
  }

  remove(entity) {
    let index = this.entities.indexOf(entity);

    if (index >= 0) {
      console.assert(
        this.entities.splice(index, 1),
        "Couldn't remove: " + entity.name
      );
    }
  }

  list() {
    for (let i = 0; i < this.entities.length; i++) {
      console.log(`${i}) ${this.entities[i]}`);
    }
  }

  clear() {
    this.entities.splice(0, this.entities.length);
  }
}
