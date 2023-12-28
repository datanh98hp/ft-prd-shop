import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  async findAll(@Query() query: PaginateFilter) {
    return await this.postService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
