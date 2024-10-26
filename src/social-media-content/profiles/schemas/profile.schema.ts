import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<ProfileModel>;

// TODO: for instagram and twitter, all post from user account are in the profile response
// TODO: potentiellement créer un moniteur pour pouvoir suivre l'évolution des followers, posts, etc
@Schema()
export class ProfileModel {
  @Prop()
  public id!: string;

  @Prop()
  public profile_url!: string;

  // Only for instagram
  @Prop()
  public is_business_account?: boolean;

  // Only for instagram
  @Prop()
  public is_professional_account?: boolean;

  @Prop()
  public followers!: number;

  @Prop()
  public is_verified!: boolean;

  // TODO: a voir ce que cela représente
  @Prop()
  public avg_engagement?: number;

  // only for instagram
  @Prop({ type: () => [String] })
  public external_url?: string[];

  // only for instagram
  @Prop()
  public business_category_name?: string;

  @Prop()
  public biography!: string;

  @Prop()
  public following!: number;

  @Prop()
  public full_name?: string;

  @Prop()
  public is_private!: boolean;

  // Only for twitter
  // TODO: find a way to get it from instagram profile
  @Prop()
  public profile_image_link?: string;

  // Only for twitter
  @Prop()
  public date_joined?: Date;

  @Prop({ default: () => new Date() })
  public created_at?: Date;

  @Prop({ default: () => new Date() })
  public updated_at?: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(ProfileModel);
