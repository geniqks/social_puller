import { bind } from "@decorators/bind.decorator";
import { PostDto, PostModel } from "@models/post.model";
import { injectable } from "inversify";
import { IInstagramPosts } from "src/interfaces/instagram.interface";
import { PostOriginEnum } from "src/interfaces/model.interface";

@bind()
@injectable()
export class PostRepository {
  public async createPost(posts: IInstagramPosts[]): Promise<any> {
    const formattedPosts: PostDto[] = posts.map((post) => ({
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
      origin: PostOriginEnum.INSTAGRAM,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    return PostModel.insertMany(formattedPosts);
  }
}
