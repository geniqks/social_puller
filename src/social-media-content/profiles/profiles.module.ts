import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileRepository } from './repositories/profile.repository';
import { ProfileModel, ProfileSchema } from './schemas/profile.schema';

const exported = [ProfileRepository];

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProfileModel.name,
        schema: ProfileSchema,
        collection: 'profiles',
      },
    ]),
  ],
  providers: [...exported],
  exports: [...exported],
})
export class ProfilesModule {}
