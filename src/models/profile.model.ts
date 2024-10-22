import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

// TODO: for instagram and twitter, all post from user account are in the profile response
// TODO: potentiellement créer un moniteur pour pouvoir suivre l'évolution des followers, posts, etc
@modelOptions({
  options: {
    customName: "profile",
  },
})
export class ProfileDto {
  @prop()
  public id!: string;

  @prop()
  public profile_url!: string;

  // Only for instagram
  @prop()
  public is_business_account?: boolean;

  // Only for instagram
  @prop()
  public is_professional_account?: boolean;

  @prop()
  public followers!: number;

  @prop()
  public is_verified!: boolean;

  // TODO: a voir ce que cela représente
  @prop()
  public avg_engagement?: number;

  // only for instagram
  @prop({ type: () => [String] })
  public external_url?: string[];

  // only for instagram
  @prop()
  public business_category_name?: string;

  @prop()
  public biography!: string;

  @prop()
  public following!: number;

  @prop()
  public full_name?: string;

  @prop()
  public is_private!: boolean;

  // Only for twitter
  // TODO: find a way to get it from instagram profile
  @prop()
  public profile_image_link?: string;

  // Only for twitter
  @prop()
  public date_joined?: Date;
}

export const ProfileModel = getModelForClass(ProfileDto);
