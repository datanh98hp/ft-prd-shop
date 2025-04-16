import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { fileFilterConfig, storeConfig } from 'config/store.config';
import { Request } from 'express';
import * as fs from 'fs';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ProductFilterPaginate } from 'src/dto/ProductFilterPaginate.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductService } from './product.service';
import { QueueService } from 'src/queue/queue.service';
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly queueService: QueueService,
  ) {}

  ///
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
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
        fileFilter: fileFilterConfig.fileFilter,
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
    try {
      const prdNew = await this.productService.create(createProductDto);
      product_images_files.map(async (img) => {
        const temp = img.path.split('/');
        let pathImg = temp[1] + '/' + temp[2];
        let urlImg = `${req.protocol}://${req.headers.host}/public/${pathImg}`;
        await this.productService.createProductImage({
          key: createProductDto.name,
          path: urlImg,
          product: prdNew,
        });
      });
      return prdNew;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  //

  @Get()
  findAll(@Query() query: ProductFilterPaginate) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(+id);
  }
  //
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }
  ///////////////
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    //remove image product
    const item = await this.productService.findOne(+id);
    if (!item) {
      return new HttpException('Not found item', HttpStatus.NOT_FOUND);
    }
    const images = item.product_images;
    // console.log('images---------', images);

    if (images.length > 0) {
      const paths = images.map((img) => {
        const temp = img.path.split('/');
        const pathImg = `upload/${temp[4]}/${temp[5]}`;
        return pathImg;
      });
      console.log('paths', paths);
      /// set queue remove imagess
      await this.queueService.handleRemoveListFiles({
        name: 'remove-product-images',
        key: 'remove-product-images',
        data: {
          paths,
        },
      });
    }

    return this.productService.remove(+id);
  }
  // update image product
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Put('image/:idImg')
  @UseInterceptors(
    FilesInterceptor('product_images', 5, {
      storage: storeConfig('product_images'),
      fileFilter: fileFilterConfig.fileFilter,
    }),
  )
  async updateImageProduct(
    @Param('idImg') idImg: string,
    @Req() req: Request,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log('idImg', idImg);
    console.log('file', files);
    if (!files || files.length === 0) {
      return new HttpException('No image provided', HttpStatus.BAD_REQUEST);
    }
    const pathsImg = [];
    for (const file of files) {
      // console.log('file', file);
      const temp = file.path.split('/');
      let pathImg = temp[1] + '/' + temp[2];
      pathsImg.push(pathImg);

      let urlImg = `${req.protocol}://${req.headers.host}/public/${pathImg}`;
      //console.log('urlImg', urlImg);

      if (fs.existsSync(file.path)) {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.log(err);
          }
          console.log(`deleted file "${pathImg}"`);
        });
      }
      await this.productService.updateImageProduct(+idImg, { path: urlImg });
    }
    console.log('pathsImg', pathsImg);
    //set queue remove imagess
    // await this.queueService.handleRemoveListFiles({
    //   name: 'remove-product-images',
    //   key: 'remove-product-images',
    //   data: {
    //     paths: pathsImg,
    //   },
    // });
  }
  ////

  //delete image product
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Post('/image-delete')
  async deleteImageProduct(@Body() { idImgs }: { idImgs: number[] }) {
    if (idImgs.length === 0) {
      return new HttpException('No image provided', HttpStatus.BAD_REQUEST);
    }
    const pathImgs = [];
    for (const id of idImgs) {
      const item = await this.productService.getImageProduct(id);
      if (!item) {
        console.log(`Image ${id} not found`);
      } else {
        const temp = item.path.split('/');
        //const pathImg = `${req.protocol}://${req.headers.host}/public/${temp[3]}/${temp[4]}`;
        const pathImg = `upload/${temp[4]}/${temp[5]}`;
        pathImgs.push(pathImg);
      }
    }
    if (pathImgs.length !== 0) {
      await this.productService.deleteImageProduct(pathImgs);
      await this.queueService.handleRemoveListFiles({
        name: 'remove-product-images',
        key: 'remove-product-images',
        data: {
          paths: pathImgs,
        },
      });
      return await this.productService.deleteImageProduct(idImgs);
    }
    return new HttpException('No image path provided', HttpStatus.BAD_REQUEST);
  }

  getUrlImage(req: Request, pathImg: string) {
    const temp = pathImg.split('/');
    //const pathImg = `${req.protocol}://${req.headers.host}/public/${temp[3]}/${temp[4]}`;
    return `${req.protocol}://${req.headers.host}/public/${temp[1]}/${temp[2]}`;
  }
}
