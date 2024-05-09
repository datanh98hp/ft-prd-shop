import { Body, Controller, Get, Post, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto/Auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Get()
    test() {
        return 'Test auth';
    }
    @Post('login')
    async login(@Body() userLogin: AuthDto) {
        return await this.authService.signIn(userLogin); 
        // return "login";
    }
    @Post('register')
    async register(@Body() userRegister: AuthDto) {
        return await this.authService.register(userRegister);
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    async profile(@Headers('Authorization') token: string) {
        return await this.authService.getProfile(token);
    }
    @UseGuards(AuthGuard)
    @Post('refresh-token')
    async refreshToken(@Body('refresh_token') refresh_token: string) {
        return await this.authService.refreshToken(refresh_token);
    }
}
