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
} from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { CreateProductCategoryDto } from '../dto/create-product_category.dto';
import { UpdateProductCategoryDto } from '../dto/update-product_category.dto';
import { ProductCategory } from 'src/entity/product_category.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { storeConfig } from 'config/store.config';
import { Request } from 'express';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('product_category_thumb', {
      storage: storeConfig('product_category_thumb'),
      fileFilter: (req, file, cb) => {
        const sizeFile = parseInt(req.headers['content-length']);
        if (sizeFile > 1024 * 1024 * 10) {
          // >5MB
          req.fileValidate = `File must less than 10MB`;
        } else {
          cb(null, true);
        }
      },
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
      const url = `${host}/${temp[1]}/${temp[2]}`;
      //////////////
      createProductCategoryDto.category_img = url;
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

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoryService.update(+id, updateProductCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCategoryService.remove(+id);
  }
}
