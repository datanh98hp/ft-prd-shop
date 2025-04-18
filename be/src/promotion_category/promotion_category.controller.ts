import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePromotionCategoryDto } from '../dto/create-promotion_category.dto';
import { UpdatePromotionCategoryDto } from '../dto/update-promotion_category.dto';
import { PromotionCategoryService } from './promotion_category.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('promotion-category')
@UseInterceptors(CacheInterceptor)
export class PromotionCategoryController {
  constructor(
    private readonly promotionCategoryService: PromotionCategoryService,
  ) {}
  ///
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Post()
  create(@Body() createPromotionCategoryDto: CreatePromotionCategoryDto) {
    return this.promotionCategoryService.create(createPromotionCategoryDto);
  }

  @Get()
  async findAll(@Query() query: { sortBy; promotionId; categoriesId }) {
    return this.promotionCategoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotionCategoryService.findOne(+id);
  }

  ///
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePromotionCategoryDto: UpdatePromotionCategoryDto,
  ) {
    return this.promotionCategoryService.update(
      +id,
      updatePromotionCategoryDto,
    );
  }

  //
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionCategoryService.remove(+id);
  }
}
