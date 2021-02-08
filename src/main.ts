import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import Config from './config';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const config = Config.getInstance();
  console.log(
      `starting server on http://localhost:${config.port}, environment ${config.environment}`
  );
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('hbs');

  const documentOptions = new DocumentBuilder()
      .setTitle("NestSeed API")
      .setDescription("A nest Rest API in -" + config.environment)
      .setVersion("0.0.1")
      .addBearerAuth()
      .build()
  const document = SwaggerModule.createDocument(app, documentOptions)
  SwaggerModule.setup("swagger", app, document)

  await app.listen(config.port);
  console.log(`server listening on http://localhost:${config.port}`);
}
bootstrap();
