import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhishlistModule } from './whishlist/whishlist.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [WhishlistModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
