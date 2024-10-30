import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';

const exported = [UserService];

@Module({
  providers: exported,
  exports: exported,
})
export class UsersModule {}
