import { getModelForClass } from '@typegoose/typegoose';
import { ProfileDto } from '../dto/profile.dto';

export const PROFILE_MODEL = 'PROFILE_MODEL';

export const ProfileModel = getModelForClass(ProfileDto, {
  schemaOptions: {
    collection: 'profiles',
  },
});
