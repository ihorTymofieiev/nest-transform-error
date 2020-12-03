import {typedEnv} from './utils/typed-env';

import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {logger} from './utils/logger';
import {expressMiddleware} from 'cls-rtracer';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';
import compression from 'compression';

async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule, { cors: true });
        app.use(expressMiddleware());
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                validationError: {
                    target: false,
                    value: false,
                },
            }),
        );
        app.use(compression());

        const options = new DocumentBuilder()
            .setTitle('Test API')
            .setDescription('test application')
            .setVersion(typedEnv.APP_VERSION)
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('/api', app, document);
        await app.listen(typedEnv.PORT);
        logger.info(`Test application successfully started on PORT ${typedEnv.PORT}`);
    } catch (err) {
        logger.error(err, err.stackTrace);
    }
}

bootstrap();
