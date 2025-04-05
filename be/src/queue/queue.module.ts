import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bull';
import { QueueName } from 'src/constants/queue';
import { UploadingConsumer } from './consumers/Uploading.consumer';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: QueueName.upload,
      },
      {
        name: QueueName.email,
      },
    ),
  ],
  providers: [QueueService, UploadingConsumer],
  exports: [QueueService],
})
export class QueueModule {}
