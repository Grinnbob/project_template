import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRole } from './roles/user-roles.model';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/posts.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import * as dbConfig from './database/config.json';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }), // чтобы сервер мог раздавать статику (например изображения)
    SequelizeModule.forRoot({
      dialect: dbConfig[process.env.NODE_ENV].dialect,
      host: dbConfig[process.env.NODE_ENV].host,
      port: dbConfig[process.env.NODE_ENV].port,
      username: dbConfig[process.env.NODE_ENV].username,
      password: dbConfig[process.env.NODE_ENV].password,
      database: dbConfig[process.env.NODE_ENV].database,
      models: [User, Role, UserRole, Post],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
})
export class AppModule {}
