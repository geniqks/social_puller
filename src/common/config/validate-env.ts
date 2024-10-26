import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

/**
 * Environment variables for the application
 * It is also used to validate the environment variables with class-validator
 */
export class EnvironmentVariables {
  @IsString()
  BRIGHT_DATA_TOKEN: string;

  @IsString()
  HOST: string;

  @IsString()
  INSTAGRAM_CLIENT_ID: string;

  @IsString()
  INSTAGRAM_CLIENT_SECRET: string;

  @IsString()
  MONGO_URI: string;

  @IsEnum(Environment)
  ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsString()
  REDDIT_CLIENT_ID: string;

  @IsString()
  REDDIT_CLIENT_SECRET: string;

  @IsString()
  REDDIT_PASSWORD: string;

  @IsString()
  REDDIT_USERNAME: string;

  @IsString()
  REDDIT_REDIRECT_URI: string;

  @IsString()
  REDDIT_USER_AGENT: string;

  @IsOptional()
  @IsString()
  REDDIT_USER_TOKEN: string;

  @IsString()
  TWITTER_BEARER_TOKEN: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
