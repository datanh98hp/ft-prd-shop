import { Module } from '@nestjs/common';
import { ShopOrderService } from './shop_order.service';
import { ShopOrderController } from './shop_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopOrder } from '../entity/shop_order.entity';
import { OrderStatus } from '../entity/order_status.entity';
import { UserPaymentMethod } from '../entity/user_payment_method.entity';
import { ShippingMethod } from '../entity/shipping_method.entity';
import { OrderLine } from '../entity/order_line.entity';
import { PaymentType } from '../entity/payment_type.entity';
import { ProductItem } from 'src/entity/product_item.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ShopOrder, OrderStatus, UserPaymentMethod, ShippingMethod, OrderLine, PaymentType, ProductItem])
  ],
  controllers: [ShopOrderController],
  providers: [ShopOrderService],
})
export class ShopOrderModule {}
