import { Module } from '@nestjs/common';
import { VariationService } from './variation.service';
import { VariationController } from './variation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variation } from '../entity/variation.entity';
import { VariationOption } from 'src/entity/variation_option.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Variation,VariationOption])
  ],
  controllers: [VariationController],
  providers: [VariationService],
})
export class VariationModule {}
