import { CreatePostsDto } from './create-posts-dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
export class PatchPostDto extends PartialType(CreatePostsDto) {
  @ApiProperty({
    description: 'The ID of the post that needs to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
