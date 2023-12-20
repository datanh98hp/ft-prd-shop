import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from 'src/dto/Auth.dto';
import { User } from 'src/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ){}

    async signIn(auth:AuthDto){
        console.log(`login with ${auth}`)

        const user = await this.userRepository.findOneBy({ email: auth.email })
        if (!user) {
            //throw new HttpException('Email is not match',HttpStatus.UNAUTHORIZED);
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'Email is not match'
            }
        }
        const checkPass = await bcrypt.compareSync(auth.password, user.password);
        if (!checkPass) {
            // throw new HttpException('Email or password is wrong', HttpStatus.UNAUTHORIZED)
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'Email or password is wrong'
            }
        }
        ///
        const payload = { id: user.id, email: user.email, role: user.role };

        return this.generateToken(payload);
    }
    async register(user: AuthDto): Promise<any> {
        // try {
        // find
        const existUserEmail = await this.userRepository.findOneBy({ email: user.email })
        if (!existUserEmail) {

            const hashPassword = await this.hashPassword(user.password)
            // handle before create new user

            const userNew = await this.userRepository.save({
                ...user,
                password: hashPassword,
                refresh_token: "refresh_token_string"
            });

            return {
                error: false,
                status: 'success',
                data: {
                    id: userNew.id,
                    username: userNew.usermame,
                    email: userNew.email,
                    role: userNew.role,
                    created_at: userNew.created_at
                }
            };

        }
        //throw new HttpException('Email is used by other user',HttpStatus.BAD_REQUEST)
        return {
            error: true,
            message: "Email is used by other user"
        }
        // } catch (error) {
        //     //throw new HttpException('Eror request' + error, HttpStatus.BAD_REQUEST)
        //     return {
        //         error: true,
        //         message: error
        //     }
        // }

    }
    private async generateToken(payload: { id: number, email: string, role: string }) {
        const access_token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET_STRING,
            expiresIn: '1d'
        });
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET_STRING,
            expiresIn: process.env.EXP_IN_REFRESH_TOKEN
        })
        await this.userRepository.update(
            { email: payload.email },
            { refresh_token: refresh_token }
        )

        return {
            access_token,
            refresh_token
        };
    }
    async refreshToken(refresh_token: string) {
        try {
            const verify = await this.jwtService.verifyAsync(refresh_token, {
                secret: process.env.JWT_SECRET_STRING
            });

            //console.log(verify);
            const checkIndb = await this.userRepository.findOneBy(
                { email: verify.email, refresh_token: refresh_token }
            );
            if (checkIndb) {
                return this.generateToken({ id: verify.id, email: verify.email, role: verify.role })
            }
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Refresh token is not valid'
            }
        } catch (error) {
            //console.log(error);
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Token is not valid'
            }
        }
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)
        const hash = await bcrypt.hash(password, salt);

        return hash;
    }

}
