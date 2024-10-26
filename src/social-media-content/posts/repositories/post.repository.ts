import { IInstagramPosts } from '@drivers/instagram/interfaces/instagram.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContentOriginEnum } from '@social-media-content/enum/content-origin.enum';
import { Model } from 'mongoose';
import { PostModel } from '../schemas/post.schema';

@Injectable()
export class PostRepository {
  constructor(
    @InjectModel(PostModel.name) private readonly postModel: Model<PostModel>,
  ) {}

  public async createInstagramPost(
    posts: IInstagramPosts[],
  ): Promise<PostModel[]> {
    const formattedPosts: PostModel[] = posts.map((post) => ({
      url: post.url,
      post_id: post.post_id,
      location: post.location,
      description: post.description,
      comment_count: post.num_comments,
      likes: post.likes,
      pictures: post.photos,
      content_type: post.content_type,
      engagement_score_view: post.engagement_score_view,
      thumbnail: post.thumbnail,
      view_count: post.video_view_count,
      videos: post.videos,
      video_play_count: post.video_play_count,
      is_verified: post.is_verified,
      is_paid_partnership: post.is_paid_partnership,
      audio: post.audio,
      origin: ContentOriginEnum.INSTAGRAM,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    return this.postModel.insertMany(formattedPosts);
  }
}
