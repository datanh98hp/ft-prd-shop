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
  UseGuards,
} from '@nestjs/common';
import { ProductItemService } from './product_item.service';
import { CreateProductItemDto } from '../dto/create-product_item.dto';
import { UpdateProductItemDto } from '../dto/update-product_item.dto';
import { UpdateProductConfigurationDto } from 'src/dto/update-product_configuration.dto';
import { CreateProductConfigurationDto } from 'src/dto/create-product_configuration.dto';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('product-item')
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService) {}

  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
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
  //
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductItemDto: UpdateProductItemDto,
  ) {
    return this.productItemService.update(+id, updateProductItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productItemService.remove(+id);
  }

  /// Option_configuration
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('configuration/list')
  listVariationOptions() {
    // return "list prdconfig"
    return this.productItemService.listVariationOptions();
  }


  //
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Post('configuration/create')
  createVariationOptions(
    @Body() createProductOpt: CreateProductConfigurationDto,
  ) {
    return this.productItemService.createVariationOption(createProductOpt);
  }

  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Put('configuration/update/:id')
  updateVariationOption(
    @Param('id') id: string,
    @Body() updateProductConfigDto: UpdateProductConfigurationDto,
  ) {
    return this.productItemService.updateVariationOption(
      +id,
      updateProductConfigDto,
    );
  }

  //
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Delete('product_configuration/delete/:id')
  deleteVariationOption(@Param('id') id: string) {
    return this.productItemService.deleteVariationOption(+id);
  }
}
