import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Put, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storeConfig } from 'config/store.config';
import { AboutDto } from 'src/dto/AboutDto.dto';
import { AboutService } from './about.service';
import { Request } from 'supertest';
import * as fs from 'fs'
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('about')
export class AboutController {
    constructor(
        private aboutService: AboutService
    ) { }

    @Get()
    async getAbout() {
        return await this.aboutService.getAbout();
    }
    @UseGuards(AuthGuard)
    @Put()
    async updateAbout(@Body() about: AboutDto) {
        return await this.aboutService.updateAbout(about);
    }
    @Put('logo')
    @UseInterceptors(FileInterceptor('logo', {
        storage: storeConfig('logo'),
        fileFilter: (req, file, cb) => {
            const sizeFile = parseInt(req.headers['content-length']);
            if (sizeFile > 1024 * 1024 * 5) { // >5MB
                req.fileValidate = `File must less than 5MB`;
            } else {
                cb(null, true)
            }
        }
    }))
    async updateLogo(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
        console.log( `Uploaded file "${file.originalname}"`);
        const host = (await req).headers.host;
        const temp = file.path.split('/')
        const url = `${host}/${temp[1]}/${temp[2]}`;
        await this.aboutService.updateLogo(url); // host/logo/{filename}
        return "OK";
    }

    @Put('banners')

    @UseInterceptors(FileFieldsInterceptor([
        {
            name: 'banners', maxCount: 5,
        },

    ],
        {
            storage: storeConfig('banners'),
            fileFilter: (req, file, cb) => {
                const sizeFile = parseInt(req.headers['content-length']);
                if (sizeFile > 1024 * 1024 * 10) { // >10MB
                    req.fileValidate = `File must less than 10MB`;
                } else {
                    cb(null, true)
                }
            }
        }))
    async updateBanners(@Req() req: Request, @UploadedFiles() files: { banners: Express.Multer.File[] }) {
        //
        const oldData = await this.aboutService.getAbout();
        if (oldData && oldData.banners && oldData.banners.length > 0){
            const list = oldData.banners.split(',');
            
            list.map(item => {
                const tem = item.split('/');
                const path = `upload/${tem[1]}/${tem[2]}`;
                // console.log(path)
                if (fs.existsSync(path)) {
                    fs.unlink(path, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(`deleted file "${path}"`);
                    })
                }
            });
            ////
            const host = (await req).headers.host;
            const listFile: Array<string> = [];
            files.banners.map(item => {
                let temp = item.path.split('/');
                let url = `${host}/${temp[1]}/${temp[2]}`;
                listFile.push(url);
            });
            await this.aboutService.addBanners(listFile.toString());
            return listFile.toString();
        }
        throw new HttpException('Error',HttpStatus.BAD_REQUEST);
        // 
       
    }

    @Put('delete_files')
    async deleteFiles(@Body() filePaths: Array<string>) {
        if (!filePaths && filePaths.length == 0) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Not file found.'
            }
        }
        filePaths.map(item => {
            if (fs.existsSync(item)) {
                fs.unlink(item, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`deleted file "${item}"`);
                })
            }
        });

    }


}


