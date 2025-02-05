"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_service_1 = require("./infra/env/env.service");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(env_service_1.EnvService);
    console.table({
        PORT: configService.get('PORT'),
        JWT_SECRET_KEY: configService.get('JWT_SECRET_KEY'),
        DATABASE_URL: configService.get('DATABASE_URL'),
        SERVER_URL: `http://localhost:${configService.get('PORT')}`,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Documentation - Workforce Management')
        .setDescription('API Documentation - Workforce Management')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document, {
        jsonDocumentUrl: 'swagger/json',
    });
    const port = configService.get('PORT') || 3000;
    await app.listen(port);
    console.log(`Swagger UI is available at: http://localhost:${port}/swagger`);
    console.log(`Swagger JSON is available at: http://localhost:${port}/swagger/json`);
}
bootstrap();
//# sourceMappingURL=main.js.map