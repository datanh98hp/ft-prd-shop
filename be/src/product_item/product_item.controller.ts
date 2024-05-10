import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductItemService } from './product_item.service';
import { CreateProductItemDto } from '../dto/create-product_item.dto';
import { UpdateProductItemDto } from '../dto/update-product_item.dto';
import { UpdateProductConfigurationDto } from 'src/dto/update-product_configuration.dto';
import { CreateProductConfigurationDto } from 'src/dto/create-product_configuration.dto';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';

@Controller('product-item')
export class ProductItemController {
  constructor(
    private readonly productItemService: ProductItemService,
    ) {}

  @Post()
  create(@Body() createProductItemDto: CreateProductItemDto) {
    return this.productItemService.create(createProductItemDto);
  }

  @Get()
  findAll(@Query() query: PaginateFilter) {
    return this.productItemService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductItemDto: UpdateProductItemDto) {
    return this.productItemService.update(+id, updateProductItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productItemService.remove(+id);
  }

  /// Option_configuration
  @Get('configuration/list')
  listVariationOptions(){
    // return "list prdconfig"
    return this.productItemService.listVariationOptions();
  }

  @Post('configuration/create')
  createVariationOptions(@Body() createProductOpt: CreateProductConfigurationDto) {
  
    return this.productItemService.createVariationOption(createProductOpt);
  }

  @Patch('configuration/update/:id')
  updateVariationOption(@Param('id') id: string, @Body() updateProductConfigDto: UpdateProductConfigurationDto) {
    return this.productItemService.updateVariationOption(+id,updateProductConfigDto);
  }
  @Delete('product_configuration/delete/:id')
  deleteVariationOption(@Param('id') id: string) {
    return this.productItemService.deleteVariationOption(+id);
  }
}
