import { IsNotEmpty } from 'class-validator';
import { ProductItem } from 'src/entity/product_item.entity';
import { VariationOption } from 'src/entity/variation_option.entity';

export class CreateProductConfigurationDto {
  @IsNotEmpty()
  product_item: ProductItem;
  @IsNotEmpty()
  variation_option: VariationOption;
}
