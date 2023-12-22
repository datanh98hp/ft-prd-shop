import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto/Auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Get()
    test() {
        return 'asdada';
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
    @Post('refresh-token')
    async refreshToken(@Body() token: string) {
        return await this.authService.refreshToken(token);
    }
}
