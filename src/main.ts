import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import Config from './config';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {HttpExceptionFilter} from "./common/filters/httpException.filter";


async function bootstrap() {
  const config = Config.getInstance();

  // init the Nest Server here
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // to allow the rerender home Page + global error filter
  app.setViewEngine('hbs');
  app.useGlobalFilters(new HttpExceptionFilter())


  // init swagger here
  const documentOptions = new DocumentBuilder()
      .setTitle("NestSeed API")
      .setDescription("A nest Rest API in -" + config.environment)
      .setVersion("1.0.0")
      .addBearerAuth()
      .build()
  const document = SwaggerModule.createDocument(app, documentOptions)
  SwaggerModule.setup("swagger", app, document)

  // init port here
  await app.listen(config.port);
  console.log(`server listening on http://localhost:${config.port}`);
}
bootstrap();
