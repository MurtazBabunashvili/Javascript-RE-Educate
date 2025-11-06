interface IHero {
    name:string,
    age:number
}

interface ISuperHero extends IHero{
    power:string,
    level?:string
}

function levelUp(hero: ISuperHero):void {
    if (hero.age > 30) {
        hero.level = "Pro"
    } else {
        hero.level = "Newbie"
    }
    console.log(`${hero.name} is now level: ${hero.level}`)
}

const hero1:ISuperHero = {
    name: "Batman",
    age:35,
    power:"Stealth"
}

levelUp(hero1)