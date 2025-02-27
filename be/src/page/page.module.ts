import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { ProductCategory } from 'src/entity/product_category.entity';
import { Promotion } from 'src/entity/promotion.entity';
import { Brand } from 'src/entity/brand.entity';
// import { DataSource } from 'typeorm';

@Module({
  imports: [
    // DataSource,
    TypeOrmModule.forFeature([
      Product, ProductCategory, Promotion,Brand
    ]),
  ],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule { }
