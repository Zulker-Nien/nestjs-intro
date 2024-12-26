/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostsDto } from '../dto/create-posts-dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    public readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async create(@Body() createPostsDto: CreatePostsDto) {
    const posts = this.postsRepository.create({
      ...createPostsDto,
    });
    return await this.postsRepository.save(posts);
  }
  public async findAll(userId: string) {
    // const user = this.usersService.findOneById(userId);
    const posts = await this.postsRepository.find();
    return posts;
  }
  public async delete(id: number) {
    const post = await this.postsRepository.findOneBy({ id });
    let inversePost = await this.metaOptionsRepository.find({
      where: { id: post.metaOptions.id },
      relations: {
        post: true,
      },
    });
    console.log(inversePost);
    // await this.postsRepository.delete(id);
    // await this.metaOptionsRepository.delete(post.metaOptions.id);
    return { deleted: true, id };
  }
}
