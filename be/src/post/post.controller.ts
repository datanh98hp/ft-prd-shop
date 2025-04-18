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
import { PostService } from './post.service';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';
import { PostDto } from 'src/dto/Post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storeConfig } from 'config/store.config';
import { Request } from 'express';
import * as fs from 'fs';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import path, { extname } from 'path';
import { QueueRequest } from 'src/queue/request/queue.request';
import { QueueService } from 'src/queue/queue.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
@Controller('post')
@UseInterceptors(CacheInterceptor)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly queueService: QueueService,
  ) {}
  @Get()
  async findAll(@Query() query: PaginateFilter) {
    return await this.postService.findAll(query);
  }

  //
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Post()
  @UseInterceptors(
    FileInterceptor('thumb', {
      storage: storeConfig('thumb'),
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
    @Body() post: PostDto,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      //console.log(`Uploaded file "${file.originalname}"`);
      const host = (await req).headers.host;
      const temp = file.path.split('/');
      const url = `${req.protocol}://${host}/public/${temp[1]}/${temp[2]}`;
      console.log(url);
      //////////////
      post.thumb = url;
      post.slug = this.genSlug(post.slug);
      //set queue upload
      await this.queueService.handleUploadQueue({
        name: 'create-post',
        key: 'create-post',
        file: {
          host,
          ...file,
        },
      } as QueueRequest);
      return await this.postService.create({ ...post, thumb: url });
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  ///
  genSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
  }


  //
  @Get(':id')
  async show(@Param('id') id: number) {
    return await this.postService.getPost(id);
  }

  ///
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('thumb', {
      storage: storeConfig('thumb'),
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
    @Param('id') id: number,
    @Body() post: any,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const oldPost = await this.postService.getPost(id);
    if (!oldPost) {
      return {
        error: HttpStatus.NOT_FOUND,
        messsage: 'Can not found item',
      };
    }

    const thummUrl = oldPost.thumb;
    if (thummUrl === null) {
      // this.delFileExist(thummUrl);
      await this.queueService.handleRemoveFile({
        name: 'remove_file',
        key: 'remove_file',
        data: {
          path: thummUrl,
        },
      } as QueueRequest);

      const host = (await req).headers.host;
      const updateUrlThumb = this.getUrlFromPath(
        `${req.protocol}://${host}`,
        file.path,
      );
      console.log(updateUrlThumb);
    }
    return await this.postService.update(+id, {
      ...post,
    });
  }
  private delFileExist(url: string) {
    const tem = url.split('/');
    const pathFile = `upload/${tem[1]}/${tem[2]}`;
    if (fs.existsSync(pathFile)) {
      fs.unlink(pathFile, (err) => {
        if (err) {
          console.log(err);
        }
        console.log(`deleted file "${pathFile}"`);
      });
    }
  }
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    // delete file in server
    const postItem = await this.postService.getPost(id);
    if (!postItem || !postItem.thumb) {
      return new HttpException(
        'Not found item to delete',
        HttpStatus.NOT_FOUND,
      );
    }
    const thummUrl = postItem.thumb;

    await this.queueService.handleRemoveFile({
      name: 'remove_file',
      key: 'remove_file',
      data: { path: thummUrl },
    } as QueueRequest);

    return await this.postService.delete(id);
  }

  ///
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Post('content-image')
  @UseInterceptors(
    FileInterceptor('img', {
      storage: storeConfig('contents-img'),
      fileFilter: (req, file, cb) => {
        const sizeFile = parseInt(req.headers['content-length']);
        if (sizeFile > 1024 * 1024 * 10) {
          // >10MB
          req.fileValidate = `File must less than 10MB`;
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async uploadForContent(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const host = (await req).headers.host;
    const url = this.getUrlFromPath(host, file.path);
    return {
      error: false,
      url,
      message: 'Upload success !',
    };
  }
  private getUrlFromPath(host: string, path: string) {
    const temp = path.split('/');
    const url = `${host}/public/${temp[1]}/${temp[2]}`;
    return url;
  }
}
