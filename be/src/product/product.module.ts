import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/product.entity';
import { ImagesProduct } from 'src/entity/images_product.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product,ImagesProduct])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
