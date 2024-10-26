import { urlTransform } from '@drivers/transforms/url.transform';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UrlsValidatorDto {
  @Type(() => String)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Transform(urlTransform)
  public urls: string[];
}
