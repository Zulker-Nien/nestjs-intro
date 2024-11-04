import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
  IsJSON,
  IsUrl,
  IsISO8601,
  ValidateNested,
} from 'class-validator';
import { PostType } from '../enums/post-type.enum';
import { PostStatus } from '../enums/post-status.enum';
import { CreatePostMetaOptionsDTO } from './create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostsDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: PostType,
    description: "Possible values  'post', 'page', 'story', 'series'",
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    description: "For example 'my-url'",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @ApiProperty({
    enum: PostStatus,
    description: "Possible values 'draft', 'scheduled', 'review', 'published'",
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @ApiPropertyOptional({
    description: 'This is the content of the post',
    example: 'The post content',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation error will be thrown',
    example: '\r\n "@context":"http://schema.org",\r\n "@type":"Person"\r\n',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Featured images for your blog posts',
    example: 'http://localhost:3000/images/image1.jpg',
  })
  @IsOptional()
  @IsUrl()
  featuredImageUrl?: string;

  @ApiProperty({
    description: 'Must be a valid timestamp in ISO8601',
    example: '2024-03-16T07:46:32+0000',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'Array of tags passed as string values',
    example: ['nestjs', 'typescript'],
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description: 'The key can be any identifier for your meta option',
          example: 'sidebarEnabled',
        },
        value: {
          type: 'any',
          description: 'Any value you want to save to the key',
          example: true,
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDTO)
  metaOptions?: CreatePostMetaOptionsDTO[];
}
