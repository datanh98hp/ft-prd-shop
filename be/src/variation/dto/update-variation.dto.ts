import { PartialType } from '@nestjs/mapped-types';
import { CreateVariationDto } from './create-variation.dto';

export class UpdateVariationDto extends PartialType(CreateVariationDto) {}
