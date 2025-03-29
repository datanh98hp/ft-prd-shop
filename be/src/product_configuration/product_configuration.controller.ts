import { query } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ProductConfigurationService } from './product_configuration.service';
import { CreateProductConfigurationDto } from '../dto/create-product_configuration.dto';
import { UpdateProductConfigurationDto } from '../dto/update-product_configuration.dto';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';

@Controller('product-configuration')
export class ProductConfigurationController {
  constructor(
    private readonly productConfigurationService: ProductConfigurationService,
  ) {}

  @Post()
  create(@Body() createProductConfigurationDto: CreateProductConfigurationDto) {
    return this.productConfigurationService.create(
      createProductConfigurationDto,
    );
  }

  @Get()
  findAll(@Query() query: PaginateFilter) {
    return this.productConfigurationService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productConfigurationService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductConfigurationDto: UpdateProductConfigurationDto,
  ) {
    return this.productConfigurationService.update(
      +id,
      updateProductConfigurationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productConfigurationService.remove(+id);
  }
}
