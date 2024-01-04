import { PartialType } from '@nestjs/mapped-types';
import { CreateProductItemDto } from './create-product_item.dto';

export class UpdateProductItemDto extends PartialType(CreateProductItemDto) {}
