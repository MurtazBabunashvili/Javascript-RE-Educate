import { Injectable } from '@nestjs/common';

@Injectable()
export class WhishlistService {
    whishlist = {
        en:[{name:"headphones", category: "Electronics", price: 50}],
        ger:[{name:"Kopfhörer", category: "Elektronik", price: 50}],
        fr:[{name:"Casque", category: "Casque", price: 50}],
        ru:[{name:"Наушники", category: "Электроника", price: 50}],
        it:[{name:"Cuffie", category: "Elettronica", price: 50}]
    }

    getWhishListByLang(lang) {
        return this.whishlist[lang]
    }
}
