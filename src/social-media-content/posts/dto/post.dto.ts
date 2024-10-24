import { ContentOriginEnum } from '@social-media-content/enum/content-origin.enum';
import { prop } from '@typegoose/typegoose';
import { PostContentTypeEnum } from '../enums/post-content-type.enum';

// TODO: potentiellement mettre une date afin de pouvoir traquer l'évolution d'un post sur plusieurs jours ou mois
// TODO: ne jamais supprimer une data antierieur aux posts
export class PostDto {
  // URL of the post
  @prop()
  public url!: string;

  // Post ID
  @prop()
  public post_id!: string;

  // Location if the user added it
  @prop({ type: () => [String] })
  public location?: string[];

  // Description of the post
  @prop()
  public description?: string;

  // Number of comments
  @prop({ default: 0 })
  public comment_count!: number;

  // Number of reposts
  // Only available for twitter
  @prop({ default: 0 })
  public repost_count?: number;

  // Number of likes
  @prop({ default: 0 })
  public likes!: number;

  // Pictures of the post
  @prop({ type: () => [String] })
  public pictures?: string[];

  // Content type
  @prop({ enum: PostContentTypeEnum })
  public content_type?: PostContentTypeEnum; // TODO:voir tout les types possibles

  // Engagement score view given by BrightData
  // May be used for the score of the post but should not be the primary criteria
  @prop({ default: 0 })
  public engagement_score_view?: number;

  // Thumbnail of the post
  @prop()
  public thumbnail?: string;

  // Number of bookmarks
  // Only available for twitter
  @prop({ default: 0 })
  public bookmarks_count?: number;

  // Number of views of the post
  @prop({ default: 0 })
  public view_count?: number;

  // Links from the linked video posts
  @prop({ type: () => [String] })
  public videos?: string[];

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

  // Origin of the post
  @prop({ enum: ContentOriginEnum })
  public origin?: ContentOriginEnum;

  // Date of the post
  @prop({ default: () => new Date() })
  public created_at!: Date;

  // Updated at
  @prop({ default: () => new Date() })
  public updated_at!: Date;
}
