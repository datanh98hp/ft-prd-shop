import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { About } from 'src/entity/about.entity';
import { Address } from 'src/entity/address.entity';
import { Brand } from 'src/entity/brand.entity';
import { Post } from 'src/entity/post.entity';
import { Product } from 'src/entity/product.entity';
import { ProductCategory } from 'src/entity/product_category.entity';
import { ProductConfiguration } from 'src/entity/product_configuration.entity';
import { ProductItem } from 'src/entity/product_item.entity';
import { Promotion } from 'src/entity/promotion.entity';
import { ShopOrder } from 'src/entity/shop_order.entity';
import { ShoppingCart } from 'src/entity/shopping_cart.entity';
import { Variation } from 'src/entity/variation.entity';
import { VariationOption } from 'src/entity/variation_option.entity';
import { PromotionCategory } from 'src/entity/promotion_category.entity';
import { UserPaymentMethod } from 'src/entity/user_payment_method.entity';
import { PaymentType } from 'src/entity/payment_type.entity';
import { ShoppingCartItem } from 'src/entity/shop_cart_item.entity';
import { OrderLine } from 'src/entity/order_line.entity';
import { OrderStatus } from 'src/entity/order_status.entity';
import { ShippingMethod } from 'src/entity/shipping_method.entity';
import { UserReview } from 'src/entity/user_review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // Add your entities here
      About,
      Address,
      Brand,
      Post,
      Product,
      ProductCategory,
      ProductConfiguration,
      ProductItem,
      Promotion,
      PromotionCategory,
      ShopOrder,
      ShoppingCart,
      Variation,
      VariationOption,
      UserPaymentMethod,
      PaymentType,
      ShoppingCartItem,
      OrderLine,
      OrderStatus,
      ShippingMethod,
      UserReview
    ]),
  ],

  providers: [SeedService],

  controllers: [SeedController],
  exports: [SeedService],
})
export class SeedModule {}
