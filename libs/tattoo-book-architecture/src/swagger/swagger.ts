import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
  static documentFactory(app) {
    const config = new DocumentBuilder()
      .setTitle('Tattoo Book')
      .setDescription('Sistema de intermediação entre tatuadores e clientes')
      .setVersion('1.0.0')
      .addTag('Tattoo Book')
      .addBearerAuth()
      .build();

    return SwaggerModule.createDocument(app, config);
  }

  static configure(app) {
    SwaggerModule.setup('api', app, this.documentFactory(app));
  }

  static setAlternativeRoutes(app) {
    SwaggerModule.setup('swagger', app, Swagger.documentFactory(app), { jsonDocumentUrl: 'swagger/json' });
    SwaggerModule.setup('swagger', app, Swagger.documentFactory(app), { yamlDocumentUrl: 'swagger/yaml' });
  }
}
