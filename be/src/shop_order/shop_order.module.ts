import { Module } from '@nestjs/common';
import { ShopOrderService } from './shop_order.service';
import { ShopOrderController } from './shop_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopOrder } from './entities/shop_order.entity';
import { OrderStatus } from './entities/order_status.entity';
import { UserPaymentMethod } from './entities/user_payment_method.entity';
import { ShippingMethod } from './entities/shipping_method.entity';
import { OrderLine } from './entities/order_line.entity';
import { PaymentType } from './entities/payment_type.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ShopOrder,OrderStatus,UserPaymentMethod,ShippingMethod,OrderLine,PaymentType])
  ],
  controllers: [ShopOrderController],
  providers: [ShopOrderService],
})
export class ShopOrderModule {}
