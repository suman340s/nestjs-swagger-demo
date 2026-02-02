import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Swagger Demo')
    .setDescription('The Swagger API description for the demo application')
    .setVersion('1.0')
    .addTag('demo')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerUiEnabled: false,
  });

  const scalarHandler = apiReference({
    pageTitle: 'Demo API Reference',
    content: documentFactory(),
  });
  app.use('/api', (req, res, next) => {
    if (req.path === '/' || req.path === '') {
      return scalarHandler(req, res);
    }
    return next();
  });

  // Start the application
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
