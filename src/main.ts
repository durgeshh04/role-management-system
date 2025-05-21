import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Employee Management System')
    .setDescription('API documentation for the Employee management system')
    .setVersion('1.0')
    .addBearerAuth() // optional: for JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger at /api
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
