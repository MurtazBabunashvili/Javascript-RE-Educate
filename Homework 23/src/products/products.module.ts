import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UserAgentMiddleware } from 'middleware/userAgent.middleware';
import { isAdminMiddleware } from './dto/isAdmin.middleware';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAgentMiddleware)
      .forRoutes(ProductsController)
    consumer 
      .apply(isAdminMiddleware)
      .forRoutes(
        {path:"products/*",method:RequestMethod.POST},
        {path:"products/*", method:RequestMethod.PUT},
        {path:"products/*",method:RequestMethod.DELETE},
        {path:"products/*",method:RequestMethod.PATCH}
      )
  }
}
