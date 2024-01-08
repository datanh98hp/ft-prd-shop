import { Module } from '@nestjs/common';
import { VariationService } from './variation.service';
import { VariationController } from './variation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variation } from '../entity/variation.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Variation])
  ],
  controllers: [VariationController],
  providers: [VariationService],
})
export class VariationModule {}
