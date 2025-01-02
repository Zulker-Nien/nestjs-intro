import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreatePostsDto } from '../dto/create-posts-dto';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from '../../tags/providers/tags.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}
  public async create(createPostsDto: CreatePostsDto, user: ActiveUserData) {
    let author = undefined;
    let tags = undefined;
    try {
      author = await this.usersService.findOneById(user.sub);
      tags = await this.tagsService.findMultipleTags(createPostsDto.tags);
    } catch (error) {
      throw new ConflictException(error);
    }
    if (createPostsDto.tags.length !== tags.length) {
      throw new BadRequestException('Please check your tag Ids');
    }
    const post = this.postsRepository.create({
      ...createPostsDto,
      author: author,
      tags: tags,
    });

    try {
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Ensure post slug is unique and not a duplicate',
      });
    }
  }
}
