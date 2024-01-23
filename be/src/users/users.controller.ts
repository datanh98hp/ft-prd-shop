import { Body, Controller, Get, Param, Put, Query, Post, Delete, Patch } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { User } from 'src/entity/user.entity';
import { UsersService } from './users.service';
import { CreateUserPaymentMethodDto } from 'src/dto/create-user-payment-method.dto';

@Controller('users')
export class UsersController {
    constructor(private userServive: UsersService) { }

    @Get('list')
    async getListUser(@Query() query: PaginateFilter): Promise<any> {

        const users = await this.userServive.getListUser(query);

        return await users;
    }

    @Post('')
    async createUser(@Body() userDto: CreateUserDto): Promise<any> {

        const user = await this.userServive.create(userDto);

        return await user;
    }

    @Get(':id')
    async getUser(@Param('id') id: number): Promise<User> {

        const user = await this.userServive.getUser(id);

        return await user;
    }

    @Put(':id')
    async updateUser(@Body() userUpdate: UpdateUserDto, @Param('id') id: number): Promise<any> {
        const update = await this.userServive.updateUserInf(userUpdate, id);
        return update;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<any> {
        const update = await this.userServive.deleleUser(id);
        return update;
    }

    @Post('/create-user-payment')
    async createUserPaymentMethod(@Body() userPatmentMethodDto: CreateUserPaymentMethodDto) {
        return await this.userServive.createUserPaymentMethod(userPatmentMethodDto);
    }
    @Patch('/update-user-payment/:id')
    async updateUserPaymentMethod(@Param() id: number, @Body() updatePatmentMethodDto: CreateUserPaymentMethodDto) {
        return await this.userServive.updateUserPaymentMethod(id, updatePatmentMethodDto);
    }
}
