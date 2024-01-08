import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { ShoppingCartController } from './shopping_cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from 'src/entity/shopping_cart.entity';
import { ShoppingCartItem } from 'src/entity/shop_cart_item.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ShoppingCart,ShoppingCartItem])
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
