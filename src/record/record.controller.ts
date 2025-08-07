import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RecordService } from './record.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../../src/common/decorator/user.decorator';

@Controller('record')
@UseGuards(AuthGuard)
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get()
  getSummaryAndList(
    @User('id') userId: number,
    @Query('month') month?: string,
    @Query('start') start?: string,
    @Query('end') end?: string
  ) {
    return this.recordService.getSummaryAndEntries(userId, {
      month,
      start,
      end,
    });
  }
}
