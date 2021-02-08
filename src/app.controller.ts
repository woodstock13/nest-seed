import { Get, Controller, Render } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiTags} from "@nestjs/swagger";

@ApiTags("/")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  render() {
    const message = this.appService.getHello();
    return { message };
  }

  @Get('ping')
  ping() {
    return 'hi you';
  }

  @Get('test')
  test() {
    return 'test';
  }

  @Get('test2')
  test2() {
    return 'test2';
  }
}
