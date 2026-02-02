import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('api/posts')
export class PostsController {
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    // this.postsService.create(createPostDto);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the post',
    example: '1',
  })
  async findOne(@Param('id') id: string) {
    // return this.postsService.findOne(id);
  }

  @Get()
  @ApiQuery({
    name: 'search',
    required: true,
    description: 'Search term for filtering posts',
    example: 'nestjs',
  })
  async findSearch(@Query('search') search: string) {
    // return this.postsService.findSearch();
  }
}
