import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entity/post.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) readonly postRepo: Repository<Post>
  ) { }

  async create(createPostDto: CreatePostDto) {
    return await this.postRepo.create(createPostDto);
  }

  async findAll(query) {

    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;

    const skip = (page - 1) * items_per_page;

    const sortBy = query.sortBy; //'DESC' || "ASC"

    const keyword = query.keyword;
    const [res, total] = await this.postRepo.findAndCount({
      order: {
        created_at: sortBy ? 'ASC' : "DESC"
      },
      where: [
        { title: Like(`%${keyword}%`) },
        { slug: Like(`%${keyword}%`) },
      ],
      select: ['id', 'title', 'subtitle', 'slug', 'thumb', 'created_at', 'updated_at'],
      take: items_per_page,
      skip: skip,

      //select:[]
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

  async findOne(id: number) {
    return await this.postRepo.findOneBy({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepo.update({ id }, updatePostDto);
  }

  async remove(id: number) {
    return await this.postRepo.delete(id);
  }
}
