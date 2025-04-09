import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class TimezoneMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const timezone = req.headers['timezone'] || 'Asia/Ho_Chi_Minh';
    req.timezone = timezone; //// Attach timezone to the request object

    next();
  }
}
