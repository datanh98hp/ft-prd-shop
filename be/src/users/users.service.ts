import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserAddressDto } from 'src/dto/create-user-address.dto';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';
import { UpdateUserAddressDto } from 'src/dto/update-user-address.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { User } from 'src/entity/user.entity';
import { UserAddress } from 'src/entity/user_address.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) readonly userRepo: Repository<User>,
    @InjectRepository(UserAddress)
    readonly userAddressRepo: Repository<UserAddress>,
  ) {}

  async getListUser(query: PaginateFilter): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;

    const skip = (page - 1) * items_per_page;

    const sortBy = query.sortBy; //'DESC' || "ASC"

    const keyword = query.keyword;
    const [res, total] = await this.userRepo.findAndCount({
      order: {
        created_at: sortBy ? 'ASC' : 'DESC',
      },
      where: [
        { username: Like(`%${keyword}%`) },
        { email: Like(`%${keyword}%`) },
        { role: Like(`%${keyword}%`) },
      ],
      select: [
        'id',
        'username',
        'email',
        'role',
        'profileImg',
        'created_at',
        'updated_at',
      ],
      relations: ['user_address'],
      take: items_per_page,
      skip: skip,

      //select:[]
    });

    const lastPage = Math.ceil(total / items_per_page);

    const nextPage = page + 1 ? null : page + 1;

    const previousPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      previousPage,
      lastPage,
    };
  }
  async create(user: CreateUserDto): Promise<any> {
    return await this.userRepo.save(user);
  }
  async getUser(id): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ id });
    return user;
  }

  async updateUserInf(user: UpdateUserDto, id): Promise<any> {
    const update = await this.userRepo.update(id, user);

    return update;
  }

  async deleleUser(id: number) {
    try {
      const res = await this.userRepo.delete(id);
      if (res.affected === 0) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return res;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  //User Address

  async createUserAddress(userAddr: CreateUserAddressDto) {
    try {
      return await this.userAddressRepo.save(userAddr);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserAddress(id: number) {
    return await this.userAddressRepo.findOne({
      where: { user: { id } },
      relations: { user: true },
      select: ['id', 'country', 'isDefault'],
    });
  }

  async updateUserAddress(id: number, userAddress: UpdateUserAddressDto) {
    try {
      const res = await this.userAddressRepo.update(id, userAddress);
      if (res.affected === 0) {
        return new HttpException(
          'Not found item to update',
          HttpStatus.BAD_REQUEST,
        );
      }
      return new HttpException('Update success', HttpStatus.OK);
    } catch (error) {
      return new HttpException(
        'Not found item to update',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async removeUserAddress(id: number) {
    try {
      // soft delete
      const res = await this.userAddressRepo.delete(id);
      if (res.affected === 0) {
        return new HttpException(
          'Not found item to delete',
          HttpStatus.BAD_REQUEST,
        );
      }
      return new HttpException('Delete success', HttpStatus.OK);
    } catch (error) {
      return new HttpException(
        'Not found item to delete',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
