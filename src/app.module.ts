import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';
import { ProfileModule } from './profile/profile.module';
import { MemoModule } from './memo/memo.module';

@Module({
  imports: [AuthModule, WeatherModule, ProfileModule, MemoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
