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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storeConfig } from 'config/store.config';
import { extname } from 'path';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateBrandDto } from 'src/dto/create-brand.dto';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';
import { UpdateBrandDto } from 'src/dto/update-brand.dto';
import { QueueService } from 'src/queue/queue.service';
import { QueueRequest } from 'src/queue/request/queue.request';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
  constructor(
    private brandService: BrandService,
    private readonly queueService: QueueService,
  ) {}

  @Get()
  findAll(@Query() query: PaginateFilter) {
    return this.brandService.findAll(query);
  }

  @Get(':id')
  async getBrand(@Param('id') id: string) {
    return await this.brandService.getBrand(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: storeConfig('brand'),
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
  async create(
    @Body() createBrandDto: CreateBrandDto,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log(createBrandDto);
    // console.log(file);
    ///console.log(`Uploaded file "${file.originalname}"`);
    try {
      const host = (await req).headers.host;
      const temp = file.path.split('/');
      const url = `${req.protocol}://${host}/public/${temp[1]}/${temp[2]}`;

      //set queue upload
      const contents = {
        name: 'upload-brand',
        key: 'upload-brand',
        file: {
          host,
          ...file,
        },
      } as QueueRequest;
      const jobU = await this.queueService.handleUploadQueue(contents);
      // console.log('data save', { ...createBrandDto, logo: url });
      return await this.brandService.create({ ...createBrandDto, logo: url });
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: storeConfig('brand'),
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
  async update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    ///console.log(file.fieldname)
    try {
      if (file.fieldname) {
        // delete old file image logo
        const brandItem = await this.brandService.getBrand(+id);

        if (!brandItem) {
          return new HttpException(
            'Not found item to update',
            HttpStatus.NOT_FOUND,
          );
        }
        const logoPath = brandItem?.logo;

        const tem = logoPath.split('/');
        const path = `upload/${tem[3]}/${tem[4]}`;
        console.log(path);
        // if (fs.existsSync(path)) {
        //   fs.unlink(path, (err) => {
        //     if (err) {
        //       console.log(err);
        //     }
        //     console.log(`deleted file "${path}"`);
        //   });
        // }
        //
        await this.queueService.handleRemoveFile({
          name: 'remove-brand',
          key: 'remove-brand',
          data: {
            path,
          },
        } as QueueRequest);

        const host = (await req).headers.host;
        const temp = file.path.split('/');
        const url = `${req.protocol}://${host}/public/${temp[1]}/${temp[2]}`;
        //set queue upload
        const contents = {
          name: 'update-brand',
          key: 'update-brand',
          file: {
            host,
            ...file,
          },
        } as QueueRequest;
        const jobU = await this.queueService.handleUploadQueue(contents);
        return await this.brandService.update(+id, {
          ...updateBrandDto,
          logo: url,
        });
      } else {
        return await this.brandService.update(+id, updateBrandDto);
      }
    } catch (error) {
      return new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const brandItem = await this.brandService.getBrand(+id);
      if (!brandItem) {
        return new HttpException(
          'Not found item to delete',
          HttpStatus.NOT_FOUND,
        );
      }
      // delete old file image logo
      const logoPath = brandItem.logo;
      const tem = logoPath.split('/');
      const path = `upload/${tem[3]}/${tem[4]}`;
      ///queue remove file
      const contents = {
        name: 'remove-brand',
        key: 'remove-brand',
        data: {
          path,
        },
      } as QueueRequest;
      await this.queueService.handleRemoveFile(contents);

      // fs.unlink(path, (err) => {
      //   if (err) {
      //     console.log(err);
      //   }
      //   console.log(`deleted file "${path}"`);
      // });

      return await this.brandService.remove(+id);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
