import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Put,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

import { storeConfig } from 'config/store.config';
import { Request } from 'express';
import * as fs from 'fs';
import { AboutDto } from 'src/dto/AboutDto.dto';

import { AboutService } from './about.service';
import { QueueRequest } from 'src/queue/request/queue.request';
import { QueueService } from 'src/queue/queue.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { extname } from 'path';

@Controller('about')
export class AboutController {
  constructor(
    private aboutService: AboutService,
    private readonly queueService: QueueService,
  ) {}

  @Get()
  async getAbout() {
    return await this.aboutService.getAbout();
  }
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Put()
  async updateAbout(@Body() about: AboutDto) {
    return await this.aboutService.updateAbout(about);
  }
  // delete file
  removeFileExist(path: string) {
    console.log(path);
    if (fs.existsSync(path)) {
      fs.unlink(path, (err) => {
        if (err) {
          console.log(err);
        }
        console.log(`deleted file "${path}"`);
      });
    } else {
      console.log(` file not exist "${path}"`);
    }
  }
  //

  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Put('logo')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: storeConfig('logo'),
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
  async updateLogo(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    const host = (await req).headers.host;
    const temp = file.path.split('/');
    // const url = `${host}/${temp[1]}/${temp[2]}`;

    const url = `${req.protocol}://${host}/${temp[1]}/${temp[2]}`;
    // delete old logo file

    const oldData = await this.aboutService.getAbout();
    if (oldData && oldData.logo) {
      const logoPath = oldData.logo;
      const tem = logoPath.split('/');
      const path = `upload/${tem[3]}/${tem[4]}`;

      // this.removeFileExist(path);
      await this.queueService.handleRemoveFile({
        name: 'remove-logo',
        key: 'remove-logo',
        data: {
          path,
        },
      } as QueueRequest);
      await this.aboutService.updateLogo(url);
    } else {
      const update = await this.aboutService.updateLogo(url); // host/logo/{filename}
      if (!update) {
        return new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
    }
    //set queue upload
    const contents = {
      name: 'update-logo',
      key: 'update-logo',
      file: {
        host,
        ...file,
      },
    } as QueueRequest;
    const jobU = await this.queueService.handleUploadQueue(contents);

    return new HttpException('Update logo success', HttpStatus.OK);
  }

  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Put('banners')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'banners',
          maxCount: 5,
        },
      ],
      {
        storage: storeConfig('banners'),
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
  async updateBanners(
    @Req() req: Request,
    @UploadedFiles() files: { banners: Express.Multer.File[] },
  ) {
    const oldData = await this.aboutService.getAbout();
    if (oldData && oldData.banners && oldData.banners.length > 0) {
      const list = oldData.banners.split(',');
      const paths = list.map((item) => {
        const tem = item.split('/');
        const path = `upload/${tem[3]}/${tem[4]}`;
      });
      //console.log('list file:', paths);
      // const contents = {
      //   name: 'remove-brand',
      //   key: 'remove-brand',
      //   data: {
      //     paths,
      //   },
      // } as QueueRequest;
      await this.queueService.handleRemoveListFiles({
        name: 'remove-banners',
        key: 'remove-banners',
        data: {
          paths,
        },
      } as QueueRequest);

      ////
      const host = (await req).headers.host;

      const listFile: Array<string> = [];
      files.banners?.map(async (item) => {
        let temp = item.path.split('/');
        let url = `${req.protocol}://${host}/${temp[1]}/${temp[2]}`;
        listFile.push(url);
        //set queue upload

        const contents = {
          name: 'update-banner',
          key: 'update-banner',
          file: {
            host,
            ...item,
          },
        } as QueueRequest;
        await this.queueService.handleUploadQueue(contents);
      });

      await this.aboutService.addBanners(listFile.toString());
      return new HttpException('Update banner is processing.', HttpStatus.OK);
    }
    throw new HttpException('Error', HttpStatus.BAD_REQUEST);
  }

  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Put('delete_files')
  async deleteFiles(@Body() data: { filePaths: Array<string> }) {
    const filePaths = data.filePaths;
    if (!filePaths && filePaths.length == 0) {
      console.log('Not file found.');
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not file found.',
      };
    }
    filePaths.map((item) => {
      if (fs.existsSync(`upload/${item}`)) {
        fs.unlink(`./upload/${item}`, (err) => {
          if (err) {
            console.log(err);
          }
          console.log(`deleted file "${item}"`);
        });
        this.aboutService.updateAboutWithAttribute({ logo: '' });
      }
      // return {
      //   statusCode: HttpStatus.NOT_FOUND,
      //   message: 'File not exist.',
      // };
    });

    await this.queueService.handleRemoveListFiles({
      name: 'remove-banners',
      key: 'remove-banners',
      data: {
        paths: filePaths,
      },
    } as QueueRequest);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete files is processing.',
    };
  }
}
