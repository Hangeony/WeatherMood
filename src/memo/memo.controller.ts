import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  CreateMemoDto,
  UpdateMemoDto,
  createMemoSchema,
  updateMemoSchema,
} from './dto/memo.dto';
import { User } from '../common/decorator/user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { ZodValidationPipe } from '../auth/dto/validation.pipe';
import { MemoService } from './memo.service';

@Controller('memo')
@UseGuards(AuthGuard)
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Get()
  list(@User('id') userId: number) {
    return this.memoService.listMyMemos(userId);
  }

  @Get(':id')
  getOne(@User('id') userId: number, @Param('id', ParseIntPipe) id: number) {
    return this.memoService.getOne(userId, id);
  }

  @Get('/:date')
  getOneByDate(@User('id') userId: number, @Param('date') date: string) {
    return this.memoService.getOneByDate(userId, date);
  }

  @Post()
  create(
    @User('id') userId: number,
    @Body(new ZodValidationPipe(createMemoSchema)) dto: CreateMemoDto
  ) {
    return this.memoService.create(userId, dto);
  }

  @Put(':id')
  update(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateMemoSchema)) dto: UpdateMemoDto
  ) {
    return this.memoService.update(userId, id, dto);
  }

  @Delete(':id')
  remove(@User('id') userId: number, @Param('id', ParseIntPipe) id: number) {
    return this.memoService.remove(userId, id);
  }
}
