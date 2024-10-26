import { IInstagramProfile } from '@drivers/instagram/interfaces/instagram.interface';
import { Injectable } from '@nestjs/common';
import { ProfileModel } from '../schemas/profile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectModel(ProfileModel.name)
    private readonly profileModel: Model<ProfileModel>,
  ) {}

  public async createInstagramProfile(
    profiles: IInstagramProfile[],
  ): Promise<ProfileModel[]> {
    const formattedProfiles: ProfileModel[] = profiles.map((profile) => ({
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

    return this.profileModel.insertMany(formattedProfiles);
  }
}
