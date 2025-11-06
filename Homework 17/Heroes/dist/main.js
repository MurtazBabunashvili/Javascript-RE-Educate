"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function levelUp(hero) {
    if (hero.age > 30) {
        hero.level = "Pro";
    }
    else {
        hero.level = "Newbie";
    }
    console.log(`${hero.name} is now level: ${hero.level}`);
}
const hero1 = {
    name: "Batman",
    age: 35,
    power: "Stealth"
};
levelUp(hero1);
//# sourceMappingURL=main.js.map