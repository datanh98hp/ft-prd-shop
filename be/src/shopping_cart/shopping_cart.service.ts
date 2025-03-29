import { query } from 'express';
import {
  HttpException,
  HttpExceptionBody,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateShoppingCartDto } from '../dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from '../dto/update-shopping_cart.dto';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from 'src/entity/shopping_cart.entity';
import { Repository } from 'typeorm';

import { ShoppingCartItem } from 'src/entity/shop_cart_item.entity';
import { ProductItem } from 'src/entity/product_item.entity';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepo: Repository<ShoppingCart>,
    @InjectRepository(ShoppingCartItem)
    private readonly shoppingCartItemRepo: Repository<ShoppingCartItem>,
    // @InjectRepository(ProductItem)
    // private readonly productItemRepo: Repository<ProductItem>,
  ) {}
  async create(createShoppingCartDto: CreateShoppingCartDto) {
    // check user cart id exist
    console.log(createShoppingCartDto.user);
    try {
      const userCart = await this.shoppingCartRepo.findOne({
        where: { user: { id: createShoppingCartDto.user.id } },
      });
      if (userCart) {
        // add product to user cart
        createShoppingCartDto.items.map(async (item) => {
          const idItem = Number(item.product_item);
          //if item exist then only update qty
          const cartItem = await this.shoppingCartItemRepo.findOne({
            where: { cart: { id: userCart.id }, product_item: { id: idItem } },
          });
          //new qty
          if (cartItem) {
            const newQty = cartItem.qty + item.qty;
            await this.shoppingCartItemRepo.update(
              {
                id: cartItem.id,
              },
              {
                qty: newQty,
              },
            );
          } else {
            await this.shoppingCartItemRepo.save({
              cart: userCart,
              product_item: { id: idItem },
              qty: item.qty,
            }); // save or update
          }
        });

        return new HttpException('success', HttpStatus.CREATED);
      }
      // 'Not found';
      // add item to shopping cart
      console.log('hande cart create new ');

      const newCart = await this.shoppingCartRepo.save({
        user: createShoppingCartDto.user,
      });
      createShoppingCartDto.items.map(async (item) => {
        console.log(item.product_item);
        const idItem = Number(item.product_item);
        return await this.shoppingCartItemRepo.save({
          cart: newCart,
          product_item: { id: idItem },
          qty: item.qty,
        });
      });

      // return new HttpException('success', HttpStatus.CREATED);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: PaginateFilter) {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;

    const skip = (page - 1) * items_per_page;

    const sortBy = query.sortBy; //'DESC' || "ASC"
    const userId = Number(query.userId) || null;

    // search by keyword
    // const keyword = query.keyword || null;

    // console.log("Keyword :", keyword)
    // console.log("product_cate_id :", product_cate_id)

    const [res, total] = await this.shoppingCartRepo.findAndCount({
      order: {
        created_at: sortBy === 'DESC' ? 'DESC' : 'ASC',
      },
      where: {
        user: { id: userId },
      },
      cache: true,
      take: items_per_page,
      skip: skip,
      relations: {
        items: true,
      },
      select: {
        items: {
          id: true,
          qty: true,
        },
      },
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

  async findOne(id: number) {
    return await this.shoppingCartRepo.findOneByOrFail({ id });
  }

  async update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    return `This action updates a #${id} shoppingCart`;
  }

  async remove(id: number) {
    try {
      await this.shoppingCartItemRepo.delete({ cart: { id } });
      const res = await this.shoppingCartRepo.delete(id);
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}
