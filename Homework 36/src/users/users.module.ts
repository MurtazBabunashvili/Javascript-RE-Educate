import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './entities/user.entity';
import { UsersResolver } from './user.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userSchema }])],
  controllers: [],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
