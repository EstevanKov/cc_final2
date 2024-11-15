import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('app')
export class AppController {
  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }

  @UseGuards(JwtAuthGuard)
  @Get('secure-endpoint')
  getSecureData() {
    return "This is a secure data";
  }

  @Get('public-endpoint')
  getPublicData() {
    return "This is public data";
  }
}
