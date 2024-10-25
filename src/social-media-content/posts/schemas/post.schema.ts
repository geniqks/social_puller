import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ContentOriginEnum } from '@social-media-content/enum/content-origin.enum';
import { PostContentTypeEnum } from '../enums/post-content-type.enum';
import { HydratedDocument } from 'mongoose';

// TODO: potentiellement mettre une date afin de pouvoir traquer l'évolution d'un post sur plusieurs jours ou mois
// TODO: ne jamais supprimer une data antierieur aux posts
export type PostDocument = HydratedDocument<PostModel>;
@Schema()
export class PostModel {
  // URL of the post
  @Prop()
  public url!: string;

  // Post ID
  @Prop()
  public post_id!: string;

  // Location if the user added it
  @Prop({ type: () => [String] })
  public location?: string[];

  // Description of the post
  @Prop()
  public description?: string;

  // Number of comments
  @Prop({ default: 0 })
  public comment_count!: number;

  // Number of reposts
  // Only available for twitter
  @Prop({ default: 0 })
  public repost_count?: number;

  // Number of likes
  @Prop({ default: 0 })
  public likes!: number;

  // Pictures of the post
  @Prop({ type: () => [String] })
  public pictures?: string[];

  // Content type
  @Prop({ enum: PostContentTypeEnum })
  public content_type?: PostContentTypeEnum; // TODO:voir tout les types possibles

  // Engagement score view given by BrightData
  // May be used for the score of the post but should not be the primary criteria
  @Prop({ default: 0 })
  public engagement_score_view?: number;

  // Thumbnail of the post
  @Prop()
  public thumbnail?: string;

  // Number of bookmarks
  // Only available for twitter
  @Prop({ default: 0 })
  public bookmarks_count?: number;

  // Number of views of the post
  @Prop({ default: 0 })
  public view_count?: number;

  // Links from the linked video posts
  @Prop({ type: () => [String] })
  public videos?: string[];

  // Number of times the video has been played
  @Prop({ default: 0 })
  public video_play_count?: number;

  // Is the user who posted the post verified
  @Prop({ default: false })
  public is_verified?: boolean;

  // Is the user who posted the post in a paid partnership
  @Prop({ default: false })
  public is_paid_partnership?: boolean;

  // Audio of the post
  @Prop()
  public audio?: {
    audio_asset_id: string;
    ig_artist_id: string;
    ig_artist_username: string;
    original_audio_title: string;
  };

  // Origin of the post
  @Prop({ enum: ContentOriginEnum })
  public origin?: ContentOriginEnum;

  // Date of the post
  @Prop({ default: () => new Date() })
  public created_at!: Date;

  // Updated at
  @Prop({ default: () => new Date() })
  public updated_at!: Date;
}

export const PostSchema = SchemaFactory.createForClass(PostModel);
