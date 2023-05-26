import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLogger } from './core/logger/app-logger';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { AuthModule } from './modules/security/auth/auth.module';
import { UserModule } from './modules/security/user/user.module';
import { RoleModule } from './modules/security/role/role.module';
import { RoleUserModule } from './modules/security/role-user/role-user.module';
import { PermissionModule } from './modules/security/permission/permission.module';
import { RolePermissionModule } from './modules/security/role-permission/role-permission.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PasswordResetModule } from './modules/security/password-reset/password-reset.module';
import { CommunityNewsModule } from './modules/community-news/community-news.module';
import { EventModule } from './modules/event/event.module';
import { EventReviewModule } from './modules/event-review/event-review.module';
import { NoteModule } from './modules/note/note.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
      logging: false,
      migrationsRun: true,
      migrations: ['dist/migrations/!**/!*{.ts,.js}'],
    }),
    MailerModule,
    UserModule,
    AuthModule,
    RoleModule,
    RoleUserModule,
    PermissionModule,
    RolePermissionModule,
    PasswordResetModule,
    CommunityNewsModule,
    EventModule,
    EventReviewModule,
    NoteModule,
  ],
  controllers: [],
  providers: [
    AppLogger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
