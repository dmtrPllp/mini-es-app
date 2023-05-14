import { Module } from '@nestjs/common';
import PostsSearchService from './posts-search.service';
import { SearchModule } from 'src/search/search.module';
import { PrismaModule } from 'src/database/prisma.module';
import PostsController from './posts.controller';
import PostsService from './posts.service';

@Module({
  imports: [SearchModule, PrismaModule],
  controllers: [PostsController],
  providers: [PostsService, PostsSearchService],
})
export class PostsModule {}
