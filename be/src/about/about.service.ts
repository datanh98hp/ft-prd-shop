import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutDto } from 'src/dto/AboutDto.dto';
import { About } from 'src/entity/about.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AboutService {
    constructor(
        @InjectRepository(About) private readonly aboutRepo: Repository<About>
    ) { }

    async getAbout() {
        return await this.aboutRepo.findOneBy({ id: 1 });
    }
    async updateAbout(about: AboutDto) {
        return await this.aboutRepo.update({ id: 1 }, about);
    }
    async updateAboutWithAttribute(data) {
        return await this.aboutRepo.update({ id: 1 }, data);
    }
    async updateLogo(logoPath: string) {
        return await this.aboutRepo.update({ id: 1 }, {
            logo:logoPath
        });
    }
    async addBanners(banners: string) {
        return await this.aboutRepo.update({ id: 1 }, {
            banners
        });
    }
}
