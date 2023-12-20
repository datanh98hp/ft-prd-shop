import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { User } from 'src/entity/user.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) readonly userRepo: Repository<User>
    ){}

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

}
