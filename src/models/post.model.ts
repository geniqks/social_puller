import { getModelForClass, prop } from "@typegoose/typegoose";


class PostDto {
  // URL of the post
  @prop()
  public url!: string;

  // Post ID
  @prop()
  public post_id!: string;

  // Location if the user added it
  @prop()
  public location?: string;

  // Description of the post
  @prop()
  public description?: string;

  // Number of comments
  @prop({ default: 0 })
  public comment_count!: number;

  // Number of likes
  @prop({ default: 0 })
  public likes!: number;

  // Pictures of the post
  @prop()
  public pictures?: string[];

  // Content type
  @prop()
  public content_type?: 'reel' | 'photo' | 'video'; // TODO: créer une enum et voir tout les types possibles

  // Engagement score view given by BrightData
  // Maybe used for the score of the post but should not be the primary criteria
  @prop({ default: 0 })
  public engagement_score_view?: number;

  // Thumbnail of the post
  @prop()
  public thumbnail?: string;

  // Number of views of the video
  @prop({ default: 0 })
  public video_view_count?: number;

  // Number of times the video has been played
  @prop({ default: 0 })
  public video_play_count?: number;

  // Is the user who posted the post verified
  @prop({ default: false })
  public is_verified?: boolean;

  // Is the user who posted the post in a paid partnership
  @prop({ default: false })
  public is_paid_partnership?: boolean;

  // Audio of the post
  @prop()
  public audio?: {
    audio_asset_id: string;
    ig_artist_id: string;
    ig_artist_username: string;
    original_audio_title: string;
  };

  // Date of the post
  @prop({ default: () => new Date() })
  public created_at!: Date;

  // Updated at
  @prop({ default: () => new Date() })
  public updated_at!: Date;
}

export const PostModel = getModelForClass(PostDto);