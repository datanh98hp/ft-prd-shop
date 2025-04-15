import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { ProductCategoryController } from './product_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from '../entity/product_category.entity';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports:[
    QueueModule,
    TypeOrmModule.forFeature([ProductCategory])
  ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
