import { Module } from '@nestjs/common';
import { VariationOptionService } from './variation_option.service';
import { VariationOptionController } from './variation_option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariationOption } from './entities/variation_option.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([VariationOption])
  ],
  controllers: [VariationOptionController],
  providers: [VariationOptionService],
})
export class VariationOptionModule {}
