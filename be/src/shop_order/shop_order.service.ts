import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/dto/Create-Order.dto';
import { OrderLine } from 'src/entity/order_line.entity';
import { OrderStatus } from 'src/entity/order_status.entity';
import { PaymentType } from 'src/entity/payment_type.entity';
import { ShippingMethod } from 'src/entity/shipping_method.entity';
import { ShopOrder } from 'src/entity/shop_order.entity';
import { UserPaymentMethod } from 'src/entity/user_payment_method.entity';
import { Repository } from 'typeorm';
import { UpdateShopOrderDto } from '../dto/update-shop_order.dto';
import { ProductItem } from 'src/entity/product_item.entity';
import { CreateShopOrderDto } from 'src/dto/create-shop_order.dto';
import { CreateOrderLineDto } from 'src/dto/create-order_line.dto';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';

@Injectable()
export class ShopOrderService {
  constructor(
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepo: Repository<OrderStatus>,
    @InjectRepository(ShippingMethod)
    private readonly shippingMethodRepo: Repository<ShippingMethod>,
    @InjectRepository(UserPaymentMethod)
    private readonly userPaymentMethodRepo: Repository<UserPaymentMethod>,
    @InjectRepository(OrderLine)
    private readonly orderLineRepo: Repository<OrderLine>,
    @InjectRepository(PaymentType)
    private readonly paymentTypeRepo: Repository<PaymentType>,
    @InjectRepository(ShopOrder)
    private readonly shopOrderRepo: Repository<ShopOrder>,
    @InjectRepository(ProductItem)
    private readonly productItemRepo: Repository<ProductItem>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    try {
      const orderInst = await this.shopOrderRepo.create(createOrderDto);
      const orderNew = await this.shopOrderRepo.save(orderInst);
      //create order_line
      const order_lines = createOrderDto.order_lines.map(
        async (item: CreateOrderLineDto) => {
          const lines = this.orderLineRepo.create({
            ...item,
            order: orderNew,
          });
          await this.orderLineRepo.save(lines);
        },
      );
      return new HttpException('success', HttpStatus.CREATED);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: PaginateFilter) {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;

    const skip = (page - 1) * items_per_page;

    const sortBy = query.sortBy; //'DESC' || "ASC"
    const order_status = Number(query.order_status) || null;
    const shippingMethod = Number(query.shippingMethod) || null;
    const payment_method = Number(query.payment_method) || null;
    const userId = Number(query.userId) || null;
    // search by keyword
    const keyword = query.keyword || null;

    // console.log("Keyword :", keyword)
    // console.log("product_cate_id :", product_cate_id)

    const [res, total] = await this.shopOrderRepo.findAndCount({
      order: {
        created_at: sortBy === 'DESC' ? 'DESC' : 'ASC',
      },
      where: {
        // name: keyword ? Like(`%${keyword}%`) : null,
        payment_method: { id: payment_method },
        shippingMethod: { id: shippingMethod },
        order_status: { id: order_status },
        user: { id: userId },
      },
      cache: true,
      take: items_per_page,
      skip: skip,
      relations: {
        user: true,
        payment_method: true,
        order_status: true,
        shippingMethod: true,
        order_lines: true,
      },
      select: {},
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
    return await this.shopOrderRepo.findOne({
      where: { id },
      relations: {
        user: true,
        payment_method: true,
        order_status: true,
        shippingMethod: true,
        order_lines: true,
      },
      select: {
        user: {
          id: true,
          email: true,
          username: true,
          profileImg: true,
        },
      },
    });
  }

  async updateStatus(id: number, status: { idStatus: number }) {
    try {
      const res = await this.shopOrderRepo.update(id, {
        order_status: { id: status.idStatus },
      });
      if (res.affected === 0) {
        return new HttpException('Update failed', HttpStatus.BAD_REQUEST);
      }
      return new HttpException('Update success', HttpStatus.OK);
    } catch (error) {
      return new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
  update(id: number, updateShopOrderDto: UpdateShopOrderDto) {
    return `This action updates a #${id} shopOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} shopOrder`;
  }
}
