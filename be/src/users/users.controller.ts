import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { User } from 'src/entity/user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateUserAddressDto } from 'src/dto/create-user-address.dto';
import { UpdateUserAddressDto } from 'src/dto/update-user-address.dto';

@Controller('users')
export class UsersController {
  constructor(private userServive: UsersService) {}

  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
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
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.User)
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    const user = await this.userServive.getUser(id);

    return await user;
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(
    @Body() userUpdate: UpdateUserDto,
    @Param('id') id: number,
  ): Promise<any> {
    const update = await this.userServive.updateUserInf(userUpdate, id);
    return update;
  }
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<any> {
    const update = await this.userServive.deleleUser(id);
    return update;
  }

  /// User Address
  @UseGuards(AuthGuard)
  @Post('/address')
  async createUserAddress(@Body() userAddr: CreateUserAddressDto) {
    return await this.userServive.createUserAddress(userAddr);
  }

  @UseGuards(AuthGuard)
  @Get('/address/:id')
  async getUserAddress(@Param('id') id: string) {
    return await this.userServive.getUserAddress(+id);
  }
  ///
  @UseGuards(AuthGuard)
  @Put('/address/:id')
  async updateUserAddress(
    @Param('id') id: string,
    @Body() userAddress: UpdateUserAddressDto,
  ) {
    return await this.userServive.updateUserAddress(+id, userAddress);
  }
  ///
  @UseGuards(AuthGuard)
  @Delete('/address/:id')
  async removeUserAddress(@Param('id') id: string) {
    return await this.userServive.removeUserAddress(+id);
  }
}
