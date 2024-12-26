import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreatePostMetaOptionsDTO {
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
