import { Module } from '@nestjs/common';
import { ProductItemService } from './product_item.service';
import { ProductItemController } from './product_item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductItem } from './entities/product_item.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductItem])
  ],
  controllers: [ProductItemController],
  providers: [ProductItemService],
})
export class ProductItemModule {}
