import { Module } from '@nestjs/common';
import { POST_MODEL, PostModel } from './models/post.model';
import { PostRepository } from './repositories/post.repository';

const exported = [PostRepository];

@Module({
  providers: [
    {
      provide: POST_MODEL,
      useValue: PostModel,
    },
    ...exported,
  ],
  exports: exported,
})
export class PostsModule {}
