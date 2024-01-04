import { PartialType } from '@nestjs/mapped-types';
import { CreateVariationOptionDto } from './create-variation_option.dto';

export class UpdateVariationOptionDto extends PartialType(CreateVariationOptionDto) {}
