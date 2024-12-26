import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDTO } from '../dtos/create-post-meta-options.dto';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}
  public async create(createPostMetaOptionsDTO: CreatePostMetaOptionsDTO) {
    const metaOption = this.metaOptionsRepository.create(
      createPostMetaOptionsDTO,
    );
    return await this.metaOptionsRepository.save(metaOption);
  }
}
