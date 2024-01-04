import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductConfigurationService } from './product_configuration.service';
import { CreateProductConfigurationDto } from '../dto/create-product_configuration.dto';
import { UpdateProductConfigurationDto } from '../dto/update-product_configuration.dto';

@Controller('product-configuration')
export class ProductConfigurationController {
  constructor(private readonly productConfigurationService: ProductConfigurationService) {}

  @Post()
  create(@Body() createProductConfigurationDto: CreateProductConfigurationDto) {
    return this.productConfigurationService.create(createProductConfigurationDto);
  }

  @Get()
  findAll() {
    return this.productConfigurationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productConfigurationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductConfigurationDto: UpdateProductConfigurationDto) {
    return this.productConfigurationService.update(+id, updateProductConfigurationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productConfigurationService.remove(+id);
  }
}
