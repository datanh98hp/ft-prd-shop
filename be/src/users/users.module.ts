import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserPaymentMethod } from 'src/entity/user_payment_method.entity';
import { UserAddress } from 'src/entity/user_address.entity';
import { Address } from 'src/entity/address.entity';
import { UserReview } from 'src/dto/user_review.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, UserPaymentMethod, UserAddress,Address,UserReview]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
