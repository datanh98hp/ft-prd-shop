import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JobOptions, Queue } from 'bull';
import { QueueName } from 'src/constants/queue';
import { QueueRequest } from './request/queue.request';
import queueConfig from './config.queue';
import { Job } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(QueueName.upload) private readonly queueUpload: Queue,
  ) {}

  async handleUpload_Logo_Queue(data: QueueRequest) {
    // set queue upload
    // console.log(data);
    await this.queueUpload.add(data, queueConfig as JobOptions);
  }
  ////
  
}
