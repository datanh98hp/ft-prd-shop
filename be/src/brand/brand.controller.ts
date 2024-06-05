import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BrandService } from './brand.service';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storeConfig } from 'config/store.config';
import { CreateBrandDto } from 'src/dto/create-brand.dto';
import { UpdateBrandDto } from 'src/dto/update-brand.dto';
import * as fs from 'fs';

@Controller('brand')
export class BrandController {
    constructor(private brandService: BrandService) { }

    @Get()
    findAll(@Query() query: PaginateFilter) {
        return this.brandService.findAll(query);
    }

    @Get(":id")
    async getBrand(@Param('id') id: string) {
        return await this.brandService.getBrand(+id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('logo', {
        storage: storeConfig('logo_brand'),
        fileFilter: (req, file, cb) => {
            const sizeFile = parseInt(req.headers['content-length']);
            if (sizeFile > 1024 * 1024 * 5) { // >5MB
                req.fileValidate = `File must less than 5MB`;
            } else {
                cb(null, true)
            }
        }
    }))
    async create(@Body() createBrandDto: CreateBrandDto, @Req() req: any, @UploadedFile() file: Express.Multer.File) {
        ///console.log(`Uploaded file "${file.originalname}"`);
        const host = (await req).headers.host;
        const temp = file.path.split('/')
        const url = `${host}/${temp[1]}/${temp[2]}`;
        return await this.brandService.create({ ...createBrandDto, logo: url });
    }
    @Patch(':id')
    @UseInterceptors(FileInterceptor('logo', {
        storage: storeConfig('logo_brand'),
        fileFilter: (req, file, cb) => {
            const sizeFile = parseInt(req.headers['content-length']);
            if (sizeFile > 1024 * 1024 * 5) { // >5MB
                req.fileValidate = `File must less than 5MB`;
            } else {
                cb(null, true)
            }
        }
    }))
    async update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto, @Req() req: any, @UploadedFile() file: Express.Multer.File) {
        ///console.log(file.fieldname)
        try {
        if (file.fieldname) {
            // delete old file image logo
            const brandItem = await this.brandService.getBrand(+id);
            const logoPath = brandItem.logo;

            const tem = logoPath.split('/');
            const path = `upload/${tem[1]}/${tem[2]}`;
            console.log(path);
            if (fs.existsSync(path)) {
                fs.unlink(path, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`deleted file "${path}"`);
                })
            }
            const host = (await req).headers.host;
            const temp = file.path.split('/')
            const url = `${host}/${temp[1]}/${temp[2]}`;
            return await this.brandService.update(+id, { ...updateBrandDto, logo: url });
        } else {
            return await this.brandService.update(+id, updateBrandDto);
        }
        } catch (error) {
            return new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            const brandItem = await this.brandService.getBrand(+id);
            const logoPath = brandItem.logo;
            const tem = logoPath.split('/');
            const path = `upload/${tem[1]}/${tem[2]}`;

            fs.unlink(path, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log(`deleted file "${path}"`);
            })
            return await this.brandService.remove(+id);
        } catch (error) {
            return new HttpException(error.message, HttpStatus.NOT_FOUND);
        }

    }

}
