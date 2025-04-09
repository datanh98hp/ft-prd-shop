import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { VariationService } from './variation.service';
import { CreateVariationDto } from '../dto/create-variation.dto';
import { UpdateVariationDto } from '../dto/update-variation.dto';
import { CreateVariationOptionDto } from 'src/dto/create-variation_option.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('variation')
export class VariationController {
  constructor(private readonly variationService: VariationService) {}

  //
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Post()
  create(@Body() createVariationDto: CreateVariationDto) {
    return this.variationService.create(createVariationDto);
  }
  //

  @Get()
  findAll(@Query() query: { sortBy; categoryId }) {
    return this.variationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variationService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateVariationDto: UpdateVariationDto,
  ) {
    return this.variationService.update(+id, updateVariationDto);
  }

  //
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variationService.remove(+id);
  }

  // option_variation
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('get-option/list')
  getOptions(@Query() query: { sortBy; variation_id }) {
    return this.variationService.getOptions(query);
  }
  //
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Post('get-option/create')
  createOptions(@Body() createVarianOptDto: CreateVariationOptionDto) {
    return this.variationService.createVariationOpt(createVarianOptDto);
  }
  ///

  @Get('get-option/get/:id')
  getVariationOpt(@Param('id') id: string) {
    return this.variationService.getVariationOpt(+id);
  }
  //
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Post('get-option/update/:id')
  updateOptions(
    @Param('id') id: number,
    @Body() updateVarianOptDto: CreateVariationOptionDto,
  ) {
    return this.variationService.updateVariationOpt(id, updateVarianOptDto);
  }

  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Post('get-option/delete/:id')
  delVariationOpt(@Param('id') id: string) {
    return this.variationService.deleteVariationOpt(+id);
  }
}
