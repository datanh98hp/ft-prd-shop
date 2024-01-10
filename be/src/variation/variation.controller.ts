import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VariationService } from './variation.service';
import { CreateVariationDto } from '../dto/create-variation.dto';
import { UpdateVariationDto } from '../dto/update-variation.dto';
import { CreateVariationOptionDto } from 'src/dto/create-variation_option.dto';

@Controller('variation')
export class VariationController {
  constructor(private readonly variationService: VariationService) { }

  @Post()
  create(@Body() createVariationDto: CreateVariationDto) {
    return this.variationService.create(createVariationDto);
  }

  @Get()
  findAll(@Query() query: { sortBy, categoryId }) {
    return this.variationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVariationDto: UpdateVariationDto) {
    return this.variationService.update(+id, updateVariationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variationService.remove(+id);
  }

  // option_variation

  @Get('get-option/list')
  getOptions(@Query() query: { sortBy, variation_id }) {
    return this.variationService.getOptions(query)
  }

  @Post('get-option/create')
  createOptions(@Body() createVarianOptDto: CreateVariationOptionDto) {
    return this.variationService.createVariationOpt(createVarianOptDto);
  }

  @Get('get-option/get/:id')
  getVariationOpt(@Param('id') id: string) {
    return this.variationService.getVariationOpt(+id);
  }

  @Post('get-option/update/:id')
  updateOptions(@Param('id') id: number, @Body() updateVarianOptDto: CreateVariationOptionDto) {
    return this.variationService.updateVariationOpt(id, updateVarianOptDto);
  }

  @Post('get-option/delete/:id')
  delVariationOpt(@Param('id') id: string) {
    return this.variationService.deleteVariationOpt(+id);
  }
}
