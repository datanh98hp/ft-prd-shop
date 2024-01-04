import { Module } from '@nestjs/common';
import { ProductConfigurationService } from './product_configuration.service';
import { ProductConfigurationController } from './product_configuration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductConfiguration } from '../entity/product_configuration.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductConfiguration])
  ],
  controllers: [ProductConfigurationController],
  providers: [ProductConfigurationService],
})
export class ProductConfigurationModule {}
