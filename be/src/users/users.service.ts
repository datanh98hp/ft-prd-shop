import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { CreateUserAddressDto } from 'src/dto/create-user-address.dto';
import { CreateUserPaymentMethodDto } from 'src/dto/create-user-payment-method.dto';
import { CreateUserReviewDto } from 'src/dto/create-user-review.dto';
import { UpdateUserAddressDto } from 'src/dto/update-user-address.dto';
import { UserReview } from 'src/dto/user_review.entity';
import { Address } from 'src/entity/address.entity';
import { User } from 'src/entity/user.entity';
import { UserAddress } from 'src/entity/user_address.entity';
import { UserPaymentMethod } from 'src/entity/user_payment_method.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) readonly userRepo: Repository<User>,
        @InjectRepository(UserPaymentMethod) private readonly userPaymentMethodRepo: Repository<UserPaymentMethod>,
        @InjectRepository(UserAddress) private readonly userAddressRepo: Repository<UserAddress>,
        @InjectRepository(Address) private readonly addressRepo: Repository<Address>,
        @InjectRepository(UserReview) private readonly userReviewRepo: Repository<UserReview>,
    ) { }

    async getListUser(query: PaginateFilter): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;

        const skip = (page - 1) * items_per_page;

        const sortBy = query.sortBy; //'DESC' || "ASC"

        const keyword = query.keyword;
        const [res, total] = await this.userRepo.findAndCount({
            order: {
                created_at: sortBy ? 'ASC' : "DESC"
            },
            where: [
                { usermame: Like(`%${keyword}%`) },
                { email: Like(`%${keyword}%`) },
                { role: Like(`%${keyword}%`) },
            ],
            select: ['id', 'usermame', 'email', 'role', 'profileImg', 'created_at', 'updated_at'],
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
        return await this.userRepo.delete(id);
    }
    //
    async createUserPaymentMethod(userPatmentMethodDto: CreateUserPaymentMethodDto) {
        try {
            await this.userPaymentMethodRepo.save(userPatmentMethodDto);
            return new HttpException('created', HttpStatus.CREATED);
        } catch (error) {
            return new HttpException('Can not create data', HttpStatus.BAD_REQUEST);
        }
    }
    async updateUserPaymentMethod(id: number, userPatmentMethodDto: CreateUserPaymentMethodDto) {
        try {
            await this.userPaymentMethodRepo.update(id, userPatmentMethodDto);
            return new HttpException('updated', HttpStatus.OK);
        } catch (error) {
            return new HttpException('Can not update data' + error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async createUserAddress(createUserAddrDto: CreateUserAddressDto) {
        ///
        console.log(createUserAddrDto);
        try {
            const addr = await this.addressRepo.save({
                unit_number: createUserAddrDto.unit_number,
                stress_number: createUserAddrDto.stress_number,
                address_line_1: createUserAddrDto.address_line_1,
                address_line_2: createUserAddrDto.address_line_2,
                city: createUserAddrDto.city,
                postal_code: createUserAddrDto.city,
                country: createUserAddrDto.country,
            });
            const userAddr = await this.userAddressRepo.save({
                user: createUserAddrDto.user,
                address: addr,
                isDefault: createUserAddrDto.isDefault,
            });

            return new HttpException('success', HttpStatus.OK);

        } catch (error) {
            return new HttpException('Data dupplicate or fail', HttpStatus.BAD_REQUEST);
        }
    }
    async deleteAddress(id: number) {
        try {
            const idUserAddr = await this.userAddressRepo.findOneBy({
                address: { id }
            });
            await this.userAddressRepo.delete(idUserAddr.id);
            await this.addressRepo.delete(id);
        } catch (error) {
            return new HttpException('Can not delete', HttpStatus.BAD_REQUEST);
        }
    }
    async updateUserAddress(id: number, updateUserAddrDto: UpdateUserAddressDto) {
        try {
            // await this.addressRepo.update( id , {
            //     unit_number: updateUserAddrDto.unit_number,
            //     stress_number: updateUserAddrDto.stress_number,
            //     address_line_1: updateUserAddrDto.address_line_1,
            //     address_line_2: updateUserAddrDto.address_line_2,
            //     city: updateUserAddrDto.city,
            //     postal_code: updateUserAddrDto.city,
            //     country: updateUserAddrDto.country,
            // });
            ///
            // const updateUsrAddr = await this.userAddressRepo.findOne({
            //     where: [
            //         { user: updateUserAddrDto.user },
            //         //    {address:{id:id}}
            //     ]
            // });
            // const addrRef = await this.addressRepo.findOneBy({ id });
            // await this.userAddressRepo.update({ user: updateUserAddrDto.user, address: updateUserAddrDto.user }, {
            //     isDefault: updateUserAddrDto.isDefault
            // });
        } catch (error) {
            return new HttpException('Update fail ' + error.message, HttpStatus.BAD_REQUEST);
        }
    }
    /// user review
    async createUserReview(createUserReview: CreateUserReviewDto) {
        console.log(createUserReview)
        try {
            await this.userReviewRepo.save(createUserReview);
            return new HttpException("success", HttpStatus.OK);
        } catch (error) {
            return new HttpException('Fail. '+ error.message, HttpStatus.BAD_REQUEST);
        }

    }
    async deleteUserReview(id:number) {
        try {
            await this.userReviewRepo.delete(id);
            return new HttpException("success", HttpStatus.OK);
        } catch (error) {
            return new HttpException('Fail. ' + error.message, HttpStatus.BAD_REQUEST);
        }

    }
}
