import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bullmq';
import { QueueName } from 'src/constants/queue';

@Processor(QueueName.upload)
export class UploadingConsumer {
  @Process()
  async handleTask(job: Job<unknown>) {
    //handle task in queue
    let progress = 0;
    for (let i = 0; i < 100; i++) {
      console.log(`Uploaded file in job: ${JSON.stringify(job.data)}`);
      Promise.all([
        await this.handleUpload(job.data),
        // ///// addd other task
      ]);
      progress += 1;
      await job.updateProgress(progress);
    }
    return {};
  }
  async handleUpload(data: Record<string, any>) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`Uploaded file "${data.file.originalname}"`);
        resolve(data);
      }, 1000 * 3);
    });
  }
  @Process('remove_file')
  async handleRemoveFile(job: Job<unknown>) {
    console.log(`Remove file in job: ${JSON.stringify(job.data)}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(job.data);
      }, 1000 * 3);
    });
  }
}
