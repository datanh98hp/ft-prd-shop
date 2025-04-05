import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { QueueName } from 'src/constants/queue';

@Processor(QueueName.upload)
export class UploadingConsumer {
  @Process()
  async handleTask(job: Job<unknown>) {
    //handle task in queue

    console.log(`Uploaded file in job: ${JSON.stringify(job.data)}`);
    Promise.all([
      await this.handleUpload(job.data),
      // ///// addd other task
    ]);
  }
  async handleUpload(data: Record<string, any>) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`Uploaded file "${data.file.originalname}"`);
        resolve(data);
      }, 1000 * 3);
    });
  }
}
