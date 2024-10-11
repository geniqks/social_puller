import { getModelForClass } from "@typegoose/typegoose";


class ProfileDto { }

export const ProfileModel = getModelForClass(ProfileDto);