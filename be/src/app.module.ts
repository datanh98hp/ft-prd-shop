import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutModule } from './about/about.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';

 
@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..','client'),
    //   // renderPath:'/upload'
    // }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: `postgres`,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities:true
      // 
      // type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: '',
      // database: 'test-blog',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
    }),
    AuthModule,
    UsersModule,
    AboutModule,
    PostModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
