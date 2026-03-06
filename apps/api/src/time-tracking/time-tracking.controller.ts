import { Body, Controller, Post, Req } from '@nestjs/common';
import { TimeTrackingService } from './time-tracking.service';

class ClockDto {
  lat?: number;
  lng?: number;
}

@Controller('time-tracking')
export class TimeTrackingController {
  constructor(private readonly service: TimeTrackingService) {}

  @Post('clock-in')
  clockIn(@Req() req: any, @Body() body: ClockDto) {
    return this.service.clockIn(req.user, body);
  }

  @Post('clock-out')
  clockOut(@Req() req: any, @Body() body: ClockDto) {
    return this.service.clockOut(req.user, body);
  }
}

