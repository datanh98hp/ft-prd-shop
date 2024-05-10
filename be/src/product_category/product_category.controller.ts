import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { CreateProductCategoryDto } from '../dto/create-product_category.dto';
import { UpdateProductCategoryDto } from '../dto/update-product_category.dto';
import { ProductCategory } from 'src/entity/product_category.entity';

@Controller('product-category')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto): Promise<ProductCategory> {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  findAll(@Query() query:any) {
    return this.productCategoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCategoryService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductCategoryDto: UpdateProductCategoryDto) {
    return this.productCategoryService.update(+id, updateProductCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCategoryService.remove(+id);
  }
}
