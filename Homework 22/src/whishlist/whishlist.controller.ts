import { Controller, DefaultValuePipe, Get, Query } from '@nestjs/common';
import { WhishlistService } from './whishlist.service';
@Controller('whishlist')
export class WhishlistController {
    constructor(private whishlistService: WhishlistService) {}

    @Get()
    getWhishListByLang(@Query("lang", new DefaultValuePipe("en")) lang) {
        return this.whishlistService.getWhishListByLang(lang)
    }
}
