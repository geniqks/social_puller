import { Public } from '@auth/decorators/is-public.decorator';
import { AuthService } from '@auth/services/auth.service';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Request() req) {
    console.log(req);
    return this.authService.login(req.user);
  }

  @Post('logout')
  public async logout(@Request() req) {
    return req.logout();
  }

  @Get('profile')
  public async profile(@Request() req) {
    return req.user;
  }
}
