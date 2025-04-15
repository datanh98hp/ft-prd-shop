import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  HttpException,
  UseInterceptors,
  UploadedFile,
  Req,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { CreateProductCategoryDto } from '../dto/create-product_category.dto';
import { UpdateProductCategoryDto } from '../dto/update-product_category.dto';
import { ProductCategory } from 'src/entity/product_category.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilterConfig, storeConfig } from 'config/store.config';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { QueueService } from 'src/queue/queue.service';
import { QueueRequest } from 'src/queue/request/queue.request';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
    private readonly queueService: QueueService,
  ) {}

  //
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Post()
  @UseInterceptors(
    FileInterceptor('product_category_thumb', {
      storage: storeConfig('product_category_thumb'),
      fileFilter: fileFilterConfig.fileFilter,
    }),
  )
  async create(
    @Body() createProductCategoryDto: CreateProductCategoryDto,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ProductCategory | HttpException> {
    if (file) {
      //need handle upload file in queue
      //-- if upload success,then set url in database, else set category_img = "uploading...."
      const host = (await req).headers.host;
      const temp = file.path?.split('/');
      const url = `${req.protocol}://${host}/public/${temp[1]}/${temp[2]}`;
      //////////////
      createProductCategoryDto.category_img = url;

      await this.queueService.handleUploadQueue({
        key: 'upload product_category',
        name: 'upload_product_category',
        data: {
          file,
        },
      });
    }

    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.productCategoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCategoryService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @UseInterceptors(
    FileInterceptor('product_category_thumb', {
      storage: storeConfig('product_category_thumb'),
      fileFilter: fileFilterConfig.fileFilter,
    }),
  )
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    //delete old image
    const oldProductCategory = await this.productCategoryService.findOne(+id);
    if (!oldProductCategory) {
      return new HttpException('Not found item', HttpStatus.NOT_FOUND);
    }
    //update new image
    if (updateProductCategoryDto.category_img) {
      // delete old image in server
      const oldPath = oldProductCategory.category_img;
      const temp = oldPath.split('/');
      const path = `upload/${temp[3]}/${temp[4]}`;
      //queue remove file
      const contents = {
        name: 'remove-product-category',
        key: 'remove-product-category',
        data: {
          path,
        },
      } as QueueRequest;
      /////
      await this.queueService.handleRemoveFile(contents);

      //upload new image
      //////////////
      const url = `${req.protocol}://${req.headers.host}/public/${file.path}`;
      updateProductCategoryDto.category_img = url;
      await this.queueService.handleUploadQueue({
        key: 'upload product_category',
        name: 'upload_product_category',
        data: {
          file,
        },
      });
    }

    return this.productCategoryService.update(+id, updateProductCategoryDto);
  }
  //
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCategoryService.remove(+id);
  }
}
