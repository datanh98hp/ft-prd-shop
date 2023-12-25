import { Module } from '@nestjs/common';

import { AboutService } from './about.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { About } from 'src/entity/about.entity';
import { AboutController } from './about.controller';

@Module({
    imports:[TypeOrmModule.forFeature([About])],
    controllers: [AboutController],
    providers: [AboutService]
})
export class AboutModule { }
