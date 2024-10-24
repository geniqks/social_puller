import { Module } from '@nestjs/common';
import { PROFILE_MODEL, ProfileModel } from './models/profile.model';
import { ProfileRepository } from './repositories/profile.repository';

const exported = [ProfileRepository];

@Module({
  providers: [
    ...exported,
    {
      provide: PROFILE_MODEL,
      useValue: ProfileModel,
    },
  ],
  exports: [...exported],
})
export class ProfilesModule {}
