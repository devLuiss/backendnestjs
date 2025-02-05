import { EnvService } from '@/infra/env/env.service';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(EnvService);
  console.table({
    PORT: configService.get('PORT'),
    JWT_SECRET_KEY: configService.get('JWT_SECRET_KEY'),
    DATABASE_URL: configService.get('DATABASE_URL'),
    SERVER_URL: `http://localhost:${configService.get('PORT')}`,
  });

  const config = new DocumentBuilder()
    .setTitle('API Documentation - Workforce Management')
    .setDescription('API Documentation - Workforce Management')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  const port = configService.get('PORT') || 3000;

  await app.listen(port);
  console.log(`Swagger UI is available at: http://localhost:${port}/swagger`);
  console.log(
    `Swagger JSON is available at: http://localhost:${port}/swagger/json`,
  );
}
bootstrap();
