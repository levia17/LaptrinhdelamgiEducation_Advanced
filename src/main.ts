import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()


  const config = new DocumentBuilder()
    .setTitle('API Education Page')
    .setDescription('Laptrinhdelamgi Education API')
    .addSecurity('bearer', {
      type: 'http',
      bearerFormat: 'JWT',
      scheme: 'bearer'
    })
    .addSecurityRequirements('bearer')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4500);
}
bootstrap();
