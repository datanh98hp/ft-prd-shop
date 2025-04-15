import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/product.entity';
import { Images } from 'src/entity/images.entity';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports:[
    QueueModule,
    TypeOrmModule.forFeature([Product, Images])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
