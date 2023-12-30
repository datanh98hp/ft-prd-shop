import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';
import { PostDto } from 'src/dto/Post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storeConfig } from 'config/store.config';
import { Request } from 'express';
import * as fs from 'fs';
@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService
    ) { }
    @Get()
    async findAll(@Query() query: PaginateFilter) {
        return await this.postService.findAll(query);
    }

    @Post()
    @UseInterceptors(FileInterceptor('thumb', {
        storage: storeConfig('thumb'),
        fileFilter: (req, file, cb) => {
            const sizeFile = parseInt(req.headers['content-length']);
            if (sizeFile > 1024 * 1024 * 10) { // >5MB
                req.fileValidate = `File must less than 10MB`;
            } else {
                cb(null, true)
            }
        }
    }))
    async create(@Body() post: PostDto, @Req() req: Request, @UploadedFile() file: Express.Multer.File) {
        //console.log(`Uploaded file "${file.originalname}"`);
        const host = (await req).headers.host;
        const temp = file.path.split('/')
        const url = `${host}/${temp[1]}/${temp[2]}`;
        //////////////
        post.thumb = url;
      
        return await this.postService.create(post);
    }
    @Get(':id')
    async show(@Param('id') id: number) {
        return await this.postService.getPost(id);
    }
    @Put(':id')
    @UseInterceptors(FileInterceptor('thumb', {
        storage: storeConfig('thumb'),
        fileFilter: (req, file, cb) => {
            
            const sizeFile = parseInt(req.headers['content-length']);
            if (sizeFile > 1024 * 1024 * 10) { // >5MB
                req.fileValidate = `File must less than 10MB`;
            } else {
                cb(null, true)
            }
        }
    }))
    async update(@Param('id') id: number, @Body() post: PostDto, @Req() req: Request, @UploadedFile() file: Express.Multer.File) {
        const oldPost = await this.postService.getPost(id);
        if (!oldPost) {
            return {
                error:HttpStatus.NOT_FOUND,
                messsage:"Can not found item"
            }
        }
       
        const thummUrl = oldPost.thumb;
        // const tem = thummUrl.split('/');
        this.delFileExist(thummUrl)
        // const pathFile = `upload/${tem[1]}/${tem[2]}`;
        // if (fs.existsSync(pathFile)) {
        //     fs.unlink(pathFile, (err) => {
        //         if (err) {
        //             console.log(err);
        //         }
        //         console.log(`deleted file "${pathFile}"`);
        //     })
        // }
        const host = (await req).headers.host;
        const updateUrlThumb = this.getUrlFromPath(host,file.path);
        console.log(updateUrlThumb);
        return await this.postService.update(+id, {
            ... post,
            thumb:updateUrlThumb
        });
    }
    private delFileExist(url:string){
        const tem = url.split('/');
        const pathFile = `upload/${tem[1]}/${tem[2]}`;
        if (fs.existsSync(pathFile)) {
            fs.unlink(pathFile, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log(`deleted file "${pathFile}"`);
            })
        }
    }
    @Delete(':id')
    async delete(@Param('id') id: number) {

        return await this.postService.delete(id);
    }

    @Post('content-image')
    @UseInterceptors(FileInterceptor('img', {
        storage: storeConfig('contents-img'),
        fileFilter: (req, file, cb) => {
            const sizeFile = parseInt(req.headers['content-length']);
            if (sizeFile > 1024 * 1024 * 10) { // >10MB
                req.fileValidate = `File must less than 10MB`;
            } else {
                cb(null, true)
            }
        }
    }))
    async uploadForContent(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
        const host = (await req).headers.host;
        const url = this.getUrlFromPath(host, file.path);
        return {
            error: false,
            url,
            message: 'Upload success !'
        }
    }
    private getUrlFromPath(host: string, path: string) {
        const temp = path.split('/');
        const url = `${host}/${temp[1]}/${temp[2]}`;
        return url;
    }

}
