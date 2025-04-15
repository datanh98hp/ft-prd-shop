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
  UseGuards,
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
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { extname } from 'path';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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
        fileFilter: (req, file, cb) => {
          const sizeFile = parseInt(req.headers['content-length']);
          if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            // Allow storage of file
            cb(null, true);
          } else {
            // Reject file
            cb(
              new HttpException(
                `Unsupported file type ${extname(file.originalname)}`,
                HttpStatus.BAD_REQUEST,
              ),
              false,
            );
            req.fileValidate = `File type is not supported`;
          }
          if (sizeFile > 1024 * 1024 * 5) {
            // >5MB
            req.fileValidate = `File must less than 5MB`;
          } else {
            cb(null, true);
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
    try {
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
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  //
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get()
  findAll(@Query() query: ProductFilterPaginate) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
  //
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
  // update image product
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Put('image/:idImg')
  @UseInterceptors(
    FileInterceptor('product_image', {
      storage: storeConfig('product_images'),
      fileFilter: (req, file, cb) => {
        const sizeFile = parseInt(req.headers['content-length']);
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          // Allow storage of file
          cb(null, true);
        } else {
          // Reject file
          cb(
            new HttpException(
              `Unsupported file type ${extname(file.originalname)}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
          req.fileValidate = `File type is not supported`;
        }
        if (sizeFile > 1024 * 1024 * 5) {
          // >5MB
          req.fileValidate = `File must less than 5MB`;
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
