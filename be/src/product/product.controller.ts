import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductFilterPaginate } from 'src/dto/ProductFilterPaginate.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductService } from './product.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { storeConfig } from 'config/store.config';
import { Request } from 'express';
import { Product } from 'src/entity/product.entity';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'product_images',
          maxCount: 5,
        },
      ],
      {
        storage: storeConfig('product_images'),
        fileFilter: (req, file, cb) => {
          const sizeFile = parseInt(req.headers['content-length']);
          if (sizeFile > 1024 * 1024 * 10) {
            // >10MB
            req.fileValidate = `File must less than 10MB`;
          } else {
            cb(null, true);
            console.log(`${file.originalname} stored.`);
          }
        },
      },
    ),
  )
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: Request,
    @UploadedFiles() files: { product_images: Express.Multer.File[] },
  ) {
    //
    const product_images_files = files.product_images;
    if (!product_images_files) {
      return await this.productService.create(createProductDto);
    }
    const prdNew = await this.productService.create(createProductDto);
    product_images_files.map(async (img) => {
      const temp = img.path.split('/');
      let pathImg = temp[1] + '/' + temp[2];
      await this.productService.createProductImage({
        key: createProductDto.name,
        path: pathImg,
        product: prdNew,
      });
    });
    return prdNew;
  }

  @Get()
  findAll(@Query() query: ProductFilterPaginate) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
  // update image product
  @Put('image/:idImg')
  @UseInterceptors(
    FileInterceptor('product_image', {
      storage: storeConfig('product_images'),
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
  async updateImageProduct(
    @Param('idImg') idImg: string,
    @UploadedFile() file: { product_image: Express.Multer.File },
  ) {
    const temp = file.product_image.path.split('/');
    let pathImg = temp[1] + '/' + temp[2];
    await this.productService.updateImageProduct(+idImg, { path: pathImg });

    return await pathImg;
  }
}
