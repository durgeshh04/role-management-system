import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './modules/filters/global.exception.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Employee Management System')
    .setDescription('API documentation for the Employee management system')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token', // This is the name of the security scheme
    ) // optional: for JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger at /api
  await app.listen(process.env.PORT ?? 3000);
  console.log('Database connected successfully');
  console.log(`Server successfully running on http://localhost:${3000}/api`);
}
bootstrap();
