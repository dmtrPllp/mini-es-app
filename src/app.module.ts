import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [
    SearchModule,
    PostsModule,
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
