import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JobOptions, Queue } from 'bull';
import { QueueName } from 'src/constants/queue';
import { QueueRequest } from './request/queue.request';
import queueConfig from './config.queue';
@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(QueueName.upload) private readonly queueUpload: Queue,
    @InjectQueue(QueueName.handle_file) private readonly queueHandleFile: Queue,
  ) {}

  async handleUploadQueue(data: QueueRequest) {
    // set queue upload
    // console.log(data);
    await this.queueUpload.add(data, queueConfig as JobOptions);
    return;
  }
  ////
  async handleRemoveFile(data: QueueRequest) {
    // set queue upload
    // console.log(data);
    await this.queueUpload.add('remove_file', data, queueConfig as JobOptions);
    return;
  }

  async handleRemoveListFiles(data: QueueRequest) {
    // set queue upload
    // console.log(data);
    await this.queueHandleFile.add(
      'remove_files',
      data,
      queueConfig as JobOptions,
    );
    return;
  }
}
