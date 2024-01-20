import { Module } from '@nestjs/common';
import { ProductItemService } from './product_item.service';
import { ProductItemController } from './product_item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductItem } from '../entity/product_item.entity';
import { ProductConfiguration } from 'src/entity/product_configuration.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductItem,ProductConfiguration])
  ],
  controllers: [ProductItemController],
  providers: [ProductItemService],
})
export class ProductItemModule {}
