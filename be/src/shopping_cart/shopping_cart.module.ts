import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartItem } from 'src/entity/shop_cart_item.entity';
import { ShoppingCart } from 'src/entity/shopping_cart.entity';
import { ShoppingCartController } from './shopping_cart.controller';
import { ShoppingCartService } from './shopping_cart.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([ShoppingCart,ShoppingCartItem])
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
