import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostDto } from 'src/dto/Post.dto';
import { Post } from 'src/entity/post.entity';

import { DataSource, Like, Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepostory: Repository<Post>,
    private dataSource: DataSource,
  ) {}

  async findAll(query): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;

    const skip = (page - 1) * items_per_page;

    const sortBy = query.sortBy; //'DESC' || "ASC"

    // search

    const keyword = query.keyword;

    const [res, total] = await this.postRepostory.findAndCount({
      order: {
        created_at: sortBy,
        id: sortBy,
      },
      where: {
        title: keyword ? Like(`%${keyword}%`) : null,
        subtitle: keyword ? Like(`%${keyword}%`) : null,
        slug: keyword ? Like(`%${keyword}%`) : null,
      },
      // where: [
      //     // title: keyword ? Like(`%${keyword}%`) : null,
      //     // subtitle: keyword ? Like(`%${keyword}%`) : null,
      //     { title: Like(`%${keyword}%`) },
      //     { subtitle: Like(`%${keyword}%`) },
      //     { slug: Like(`%${keyword}%`) },
      // ],
      take: items_per_page,
      skip: skip,
      relations: {
        author: true,
      },
      select: {
        author: {
          id: true,
          email: true,
          username: true,
          profileImg: true,
          role: true,
        },
      },
    });

    const lastPage = Math.ceil(total / items_per_page);

    const nextPage = page + 1 ? null : page + 1;

    const previousPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      previousPage,
      lastPage,
    };
  }

  async getPost(id: number): Promise<any | null> {
    const post = await this.postRepostory.findOne({
      cache: true,
      where: { id },
      relations: ['author'],
      select: {
        author: {
          id: true,
          email: true,
          username: true,
          profileImg: true,
          role: true,
        },
      },
    });
    if (!post) {
      return new HttpException('Not found item', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async create(post: PostDto) {
    const newPost = this.postRepostory.create(post);
    return await this.postRepostory.save(newPost);
  }

  async update(id: number, post: any) {
    return await this.postRepostory.update(
      { id },
      {
        ...post,
      },
    );
  }

  async delete(id: number) {
    return await this.postRepostory.delete(id);
  }
}
