import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/dto/Create-Order.dto';
import { OrderLine } from 'src/entity/order_line.entity';
import { OrderStatus } from 'src/entity/order_status.entity';
import { PaymentType } from 'src/entity/payment_type.entity';

import { ShopOrder } from 'src/entity/shop_order.entity';
import { UserPaymentMethod } from 'src/entity/user_payment_method.entity';
import { Between, Like, Raw, Repository } from 'typeorm';
import { UpdateShopOrderDto } from '../dto/update-shop_order.dto';
import { ProductItem } from 'src/entity/product_item.entity';
import { CreateShopOrderDto } from 'src/dto/create-shop_order.dto';
import { CreateOrderLineDto } from 'src/dto/create-order_line.dto';

import { ShippingMethod } from 'src/entity/shipping_method.entity';
import { CreateShippingMethod } from 'src/dto/create-shipping-method.dto';

@Injectable()
export class ShopOrderService {

  constructor(
    @InjectRepository(OrderStatus) private readonly orderStatusRepo: Repository<OrderStatus>,
    @InjectRepository(ShippingMethod) private readonly shippingMethodRepo: Repository<ShippingMethod>,
    // @InjectRepository(UserPaymentMethod) private readonly userPaymentMethodRepo: Repository<UserPaymentMethod>,
    @InjectRepository(OrderLine) private readonly orderLineRepo: Repository<OrderLine>,
    @InjectRepository(PaymentType) private readonly paymentTypeRepo: Repository<PaymentType>,
    @InjectRepository(ShopOrder) private readonly shopOrderRepo: Repository<ShopOrder>,
    // @InjectRepository(ProductItem) private readonly productItemRepo: Repository<ProductItem>,
  ) { }

  async createOrder(createOrderDto: CreateOrderDto) { //CreateOrderDto
    //console.log(createOrderDto);
    const orderInst = await this.shopOrderRepo.create(createOrderDto);
    const orderNew = await this.shopOrderRepo.save(orderInst);
    //create order_line 
    let sumOrderTotal = 0;

    const order_lines = createOrderDto.order_lines.map(async (item: CreateOrderLineDto) => {
      sumOrderTotal += item.price;
      const lines = this.orderLineRepo.create({
        ...item,
        order: orderNew
      });
      await this.orderLineRepo.save(lines)
    });
    // update order_total
    await this.shopOrderRepo.update({ id: orderNew.id }, {
      order_total: sumOrderTotal
    });

    //console.log(createOrderDto.order_lines)

    return await this.findOne(orderNew.id);
  }

  async findAll(query) {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;

    const skip = (page - 1) * items_per_page;

    const sortBy = query.sortBy; //'DESC' || "ASC"

    const userId = Number(query.userId) || null;
    const order_date = new Date(Date.parse(`${query.order_date}`)) || null;
    const order_status = Number(query.order_status) || null;  // 1: Canceled - 2: Delivery - 3: Success
    const paymentMethod = Number(query.paymentMethod) || null;
    const shipMethod = Number(query.shipMethod) || null;
    // search

    const keyword = query.keyword;

    const [res, total] = await this.shopOrderRepo.findAndCount({
      order: {
        order_date: sortBy ? 'ASC' : "DESC"
      },
      where: {
        user: {
          id: userId
        },
        // order_date: Between(order_date, order_date ), // get data by range Date
        // order_date: Raw(order_date=>`${order_date}=> :from AND ${order_date} <= :to`, {from:order_date,to: Date.now() }),
        order_status: {
          id: order_status
        },
        payment_method: {
          id: paymentMethod
        },
        shippingMethod: {
          id: shipMethod
        },

      },
      take: items_per_page,
      skip: skip,
      relations:
      {
        order_lines: true,
        order_status: true,
        shipping_address: true,
        shippingMethod: true,
        user: true,
      }
      ,
      select: {
        user: {
          id: true,
          email: true,
          usermame: true,
          profileImg: true,
          role: true
        }
      }
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
    try {
      return await this.shopOrderRepo.findOne(
        {
          where: {
            id: +id
          },
          relations: {
            order_lines: true,
            order_status: true,
            shipping_address: true,
            shippingMethod: true,
            user: true
          },
          select: {
            user: {
              id: true,
              email: true,
              usermame: true,
              profileImg: true,
              role: true
            }
          }
        });
    } catch (error) {
      return new HttpException('Can not found this item', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateShopOrderDto: UpdateShopOrderDto) {
    // re-estimate order_total before update order item
    try {
      const item = await this.findOne(id);
      if (!item) {
        return new HttpException('Can not find this item.', HttpStatus.NOT_FOUND);
      }
      // console.log(updateShopOrderDto,id);
      return await this.shopOrderRepo.update(id, updateShopOrderDto);
    } catch (error: any) {
      return new HttpException('Can not update this item .' + error.message, HttpStatus.BAD_REQUEST);
    }

  }

  async remove(id: number) {
    try {
      return await this.shopOrderRepo.delete(id);
    } catch (error) {
      return new HttpException('Can not delete this item', HttpStatus.BAD_REQUEST);
    }
  }
  // order ststus
  async create_orderStatus(createStatus: { name: string }) {
    try {
      await this.orderStatusRepo.save(createStatus);
      return new HttpException('success', HttpStatus.CREATED);
    } catch (error) {
      return new HttpException('Can not create this item', HttpStatus.BAD_REQUEST);
    }
  }

  async createShippingMethod(createShippingMethodDto: { name: string, price:string}) {
    try {
      const newIt = this.shippingMethodRepo.create(createShippingMethodDto);
      await this.shippingMethodRepo.save(newIt);
      return new HttpException('success', HttpStatus.CREATED);
    } catch (error) {
      return new HttpException('Can not create this item', HttpStatus.BAD_REQUEST);
    }
  }
  async createPaymentType(createPaymentTypeDto: { type: string}) {
    try {
      const newIt= this.paymentTypeRepo.create(createPaymentTypeDto);
      await this.shippingMethodRepo.save(newIt);
      return new HttpException('success', HttpStatus.CREATED);
    } catch (error) {
      return new HttpException('Can not create this item', HttpStatus.BAD_REQUEST);
    }
  }

}
