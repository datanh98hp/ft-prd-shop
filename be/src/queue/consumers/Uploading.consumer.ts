import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bullmq';
import { QueueName } from 'src/constants/queue';
import * as fs from 'fs';
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
        // console.log(`Uploaded file "${data.file.originalname}"`);
        resolve(data);
      }, 1000 * 3);
    });
  }
  @Process('remove_file')
  async handleRemoveFile(job: Job<any>) {
    console.log(`Remove file in job:::: ${JSON.stringify(job.data)}`);
    const path = job.data.data.path;
    // console.log('path::::::::', path);
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`deleted file "${path}"`);
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(job.data);
      }, 1000 * 3);
    });
  }
}
