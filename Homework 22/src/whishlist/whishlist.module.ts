import { Module } from '@nestjs/common';
import { WhishlistService } from './whishlist.service';
import { WhishlistController } from './whishlist.controller';

@Module({
  providers: [WhishlistService],
  controllers: [WhishlistController]
})
export class WhishlistModule {}
