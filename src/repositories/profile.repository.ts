import { bind } from "@decorators/bind.decorator";
import { IInstagramProfile } from "@interfaces/instagram.interface";
import { ProfileDto, ProfileModel } from "@models/profile.model";
import { injectable } from "inversify";

@bind()
@injectable()
export class ProfileRepository {
  public async createInstagramProfile(
    profiles: IInstagramProfile[]
  ): Promise<ProfileDto[]> {
    const formattedProfiles: ProfileDto[] = profiles.map((profile) => ({
      id: profile.id,
      profile_url: profile.profile_url,
      is_business_account: profile.is_business_account,
      is_professional_account: profile.is_professional_account,
      followers: profile.followers,
      is_verified: profile.is_verified,
      avg_engagement: profile.avg_engagement,
      external_url: profile.external_url,
      business_category_name: profile.business_category_name,
      biography: profile.biography,
      following: profile.following,
      full_name: profile.full_name,
      is_private: profile.is_private,
    }));

    return ProfileModel.insertMany(formattedProfiles);
  }
}
