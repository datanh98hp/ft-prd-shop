import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { About } from 'src/entity/about.entity';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';

import { QueueModule } from 'src/queue/queue.module';
import { BullModule } from '@nestjs/bull';
import { QueueName } from 'src/constants/queue';
import { UploadingConsumer } from 'src/queue/consumers/Uploading.consumer';

@Module({
  imports: [
    QueueModule,
    // BullModule.registerQueue({ name: QueueName.upload }),
    TypeOrmModule.forFeature([About]),
  ],
  controllers: [AboutController],
  providers: [
    AboutService,
    //UploadingConsumer
  ],
})
export class AboutModule {}
