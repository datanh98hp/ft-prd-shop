import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutDto } from 'src/dto/AboutDto.dto';
import { About } from 'src/entity/about.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About) private readonly aboutRepo: Repository<About>,
  ) {}

  async getAbout() {
    return await this.aboutRepo.findOneBy({ id: 1 });
  }
  async updateAbout(about: AboutDto) {
    const res = this.aboutRepo.update({ id: 1 }, about);
    if ((await res).affected > 0) {
      return new HttpException('Update success', HttpStatus.OK);
    }
    return new HttpException('Update failed', HttpStatus.NOT_MODIFIED);
  }
  async updateAboutWithAttribute(data) {
    return await this.aboutRepo.update({ id: 1 }, data);
  }
  async updateLogo(logoPath: string) {
    try {
      const logo = await this.aboutRepo.findOneBy({ id: 1 });
      if (!logo.logo) {
        return new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      const res = await this.aboutRepo.update(
        { id: 1 },
        {
          logo: logoPath,
        },
      );
      return res;
    } catch (error) {
      return new HttpException('Error', HttpStatus.NOT_FOUND);
    }
  }
  async addBanners(banners: string) {
    return await this.aboutRepo.update(
      { id: 1 },
      {
        banners,
      },
    );
  }
}
