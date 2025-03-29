import { SeedService } from './seed.service';
import { Controller, Post } from '@nestjs/common';

@Controller('seed')
export class SeedController {
  shoppingCartItemRepo: any;
  constructor(private seedService: SeedService) {}

  //seed data endpoint
  @Post()
  async executeSeed() {
    await this.seedService.executeSeed();
  }
}
