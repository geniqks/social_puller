import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostRepository } from './repositories/post.repository';
import { PostModel, PostSchema } from './schemas/post.schema';

const exported = [PostRepository];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostModel.name, schema: PostSchema }]),
  ],
  providers: [...exported],
  exports: exported,
})
export class PostsModule {}
