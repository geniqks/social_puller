import { getModelForClass } from '@typegoose/typegoose';
import { PostDto } from '../dto/post.dto';

export const POST_MODEL = 'POST_MODEL';

export const PostModel = getModelForClass(PostDto, {
  schemaOptions: {
    collection: 'posts',
  },
});
