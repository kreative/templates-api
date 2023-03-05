import {
  Module,
  RequestMethod,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';

import { AuthenticateUserMiddleware } from '@/middleware/authenticateUser';
import { SentryModule } from './sentry/sentry.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthorsModule } from './authors/authors.module';
import { AuthorsController } from './authors/authors.controller';
import { TemplatesModule } from './templates/templates.module';
import { TemplatesController } from './templates/templates.controller';
import { DownloadsModule } from './downloads/downloads.module';
import { DownloadsController } from './downloads/downloads.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SentryModule.forRoot({
      dsn: process.env.SENTRY_DNS,
      tracesSampleRate: 1.0,
      debug: true,
    }),
    PrismaModule,
    CategoriesModule,
    AuthorsModule,
    TemplatesModule,
    DownloadsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // sentry specific middlware
    consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });

    consumer
      .apply(AuthenticateUserMiddleware)
      .exclude(
        {
          path: 'authors',
          method: RequestMethod.GET,
        },
        {
          path: 'authors/:id',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(AuthorsController);

    consumer
      .apply(AuthenticateUserMiddleware)
      .exclude(
        {
          path: 'templates',
          method: RequestMethod.GET,
        },
        {
          path: 'templates/:id',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(TemplatesController);

    consumer
      .apply(AuthenticateUserMiddleware)
      .exclude({
        path: 'downloads',
        method: RequestMethod.POST,
      })
      .forRoutes(DownloadsController);
  }
}
