import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileFilterConfig, storeConfig } from 'config/store.config';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateProductConfigurationDto } from 'src/dto/create-product_configuration.dto';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';
import { UpdateProductConfigurationDto } from 'src/dto/update-product_configuration.dto';
import { CreateProductItemDto } from '../dto/create-product_item.dto';
import { UpdateProductItemDto } from '../dto/update-product_item.dto';
import { ProductItemService } from './product_item.service';
import { de } from '@faker-js/faker/.';
import { diskStorage } from 'multer';

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

  ///
  @UseInterceptors(
    FilesInterceptor('product_images', 5, {
      storage: diskStorage({
        destination: `upload/product_images/`,
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      fileFilter: fileFilterConfig.fileFilter,
    }),
  )
  @Post('add-image/:id')
  async updateProductItemImages(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: Request,
    @Param('id') id: string,
  ) {
    /// check if product item exist
    const productItem = await this.productItemService.findOne(+id);
    //get old images list
    let srt_list_url = '';
    if (!productItem) {
      throw new HttpException('Product Item not found', 404);
    }
    //console.log('Files:', files);
    const oldImagesList = productItem.product_images;
    srt_list_url = oldImagesList;
    if (oldImagesList && oldImagesList !== '') {
      let list_url = files.map((file) => {
        const temp = file.path.split('/');
        let url = `${req.protocol}://${req.headers.host}/public/${temp[1]}/${temp[2]}`;
        //check exist in oldImagesList
        if (!srt_list_url.includes(url)) {
          return url;
        }
      });
      srt_list_url = list_url.join(',');
      console.log('srt_list_url:', srt_list_url);

      return this.productItemService.update(+id, {
        product_images: srt_list_url,
      });
    }
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
