import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import CreatePostDto from './dto/create-post.dto';
import UpdatePostDto from './dto/update.post.dto';
import PostsSearchService from './posts-search.service';

@Injectable()
export default class PostsService {
  constructor(
    private db: PrismaService,
    private postsSearchService: PostsSearchService,
  ) {}

  async getAllPosts() {
    return await this.db.post.findMany();
  }

  async getPostById(id: number) {
    const post = await this.db.post.findFirst({
      where: {
        id,
      },
    });
    if (post) {
      return post;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreatePostDto) {
    const newPost = await this.db.post.create({
      data: {
        ...post,
      },
    });
    this.postsSearchService.indexPost(newPost);
    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    const updatedPost = await this.db.post.update({
      where: {
        id,
      },
      data: {
        ...post,
      },
    });
    if (updatedPost) {
      await this.postsSearchService.update(updatedPost);
      return updatedPost;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.db.post.delete({
      where: {
        id,
      },
    });
    if (!deleteResponse) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await this.postsSearchService.remove(id);
  }

  async searchForPosts(text: string) {
    const results = await this.postsSearchService.search(text);
    console.log(results);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    return await this.db.post.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
