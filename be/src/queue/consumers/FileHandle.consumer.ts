import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bullmq';
import { QueueName } from 'src/constants/queue';
import * as fs from 'fs';
@Processor(QueueName.handle_file)
export class FileHandleConsumer {
  // @Process('remove_file')
  // async handleRemoveFile(job: Job<any>) {
  //   console.log(`Remove file in job:::: ${JSON.stringify(job.data)}`);
  //   const path = job.data.data.path;
  //   // console.log('path::::::::', path);
  //   fs.unlink(path, (err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(`deleted file "${path}"`);
  //   });
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(job.data);
  //     }, 1000 * 3);
  //   });
  // }
  removeFileExist(path: string) {
    console.log(path);
    if (fs.existsSync(path)) {
      fs.unlink(path, (err) => {
        if (err) {
          console.log(err);
        }
        console.log(`deleted file "${path}"`);
      });
    } else {
      console.log(` file not exist "${path}"`);
    }
  }
  ///
  @Process('remove_files')
  async handleRemoveFiles(job: Job<any>) {
    console.log(`Remove list files in job:::: ${JSON.stringify(job.data)}`);
    const paths = job.data.data.paths;
    console.log('path::::::::', paths);
    for (const path of paths) {
      if (fs.existsSync(path)) {
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          }
          console.log(`deleted file "${path}"`);
        });
      }
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(job.data);
      }, 1000 * 3);
    });
  }
}
