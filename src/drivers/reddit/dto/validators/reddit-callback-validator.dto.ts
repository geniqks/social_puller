import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class RedditCallbackValidatorDto {
  @Type(() => String)
  @IsString()
  public code: string;

  @Type(() => String)
  @IsString()
  public state: string;
}
