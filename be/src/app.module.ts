import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutModule } from './about/about.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { ProductCategoryModule } from './product_category/product_category.module';
import { PromotionModule } from './promotion/promotion.module';
import { PromotionCategoryModule } from './promotion_category/promotion_category.module';
import { ProductModule } from './product/product.module';
import { VariationModule } from './variation/variation.module';
import { VariationOptionModule } from './variation_option/variation_option.module';
import { ProductItemModule } from './product_item/product_item.module';
import { ProductConfigurationModule } from './product_configuration/product_configuration.module';
import { AddressModule } from './address/address.module';
import { ShopOrderModule } from './shop_order/shop_order.module';
import { ShoppingCartModule } from './shopping_cart/shopping_cart.module';
import { BrandModule } from './brand/brand.module';
import { PageModule } from './page/page.module';
import { SeedModule } from './seed/seed.module';

import { QueueModule } from './queue/queue.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: ['.env'],
      },
    ),
    BullModule.forRoot({
      redis: {
        host:  process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      //
      // type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: '',
      // database: 'test-blog',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
    }),
    AuthModule,
    UsersModule,
    AboutModule,
    PostModule,
    ProductCategoryModule,
    PromotionModule,
    PromotionCategoryModule,
    ProductModule,
    VariationModule,
    VariationOptionModule,
    ProductItemModule,
    ProductConfigurationModule,
    AddressModule,
    ShopOrderModule,
    ShoppingCartModule,
    BrandModule,
    PageModule,
    SeedModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
