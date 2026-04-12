// src/post/post.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Get()
  findAll() {
    // O service 'posts' espera um objeto de parâmetros (mesmo que vazio)
    return this.postService.posts({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.post({ id }); // ✅ string
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost({
      where: { id }, // ✅ string
      data: updatePostDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.deletePost({ id }); // ✅ string
  }
}
