import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserPaymentMethod } from 'src/entity/user_payment_method.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,UserPaymentMethod]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
