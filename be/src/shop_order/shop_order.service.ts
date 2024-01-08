import { Injectable } from '@nestjs/common';
import { CreateShopOrderDto } from '../dto/create-shop_order.dto';
import { UpdateShopOrderDto } from '../dto/update-shop_order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from 'src/entity/order_status.entity';
import { Repository } from 'typeorm';
import { ShippingMethod } from 'src/entity/shipping_method.entity';
import { UserPaymentMethod } from 'src/entity/user_payment_method.entity';
import { OrderLine } from 'src/entity/order_line.entity';
import { PaymentType } from 'src/entity/payment_type.entity';
import { ShopOrder } from 'src/entity/shop_order.entity';

@Injectable()
export class ShopOrderService {

  constructor(
    @InjectRepository(OrderStatus) private readonly  orderStatusRepo: Repository<OrderStatus>,
    @InjectRepository(ShippingMethod) private readonly shippingMethodRepo: Repository<ShippingMethod>,
    @InjectRepository(UserPaymentMethod) private readonly userPaymentMethodRepo: Repository<UserPaymentMethod>,
    @InjectRepository(OrderLine) private readonly orderLineRepo: Repository<OrderLine>,
    @InjectRepository(PaymentType) private readonly paymentTypeRepo: Repository<PaymentType>,
    @InjectRepository(ShopOrder) private readonly shopOrderRepo: Repository<ShopOrder>,
  ){}

  create(createShopOrderDto: CreateShopOrderDto) {
    return 'This action adds a new shopOrder';
  }

  findAll() {
    return `This action returns all shopOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shopOrder`;
  }

  update(id: number, updateShopOrderDto: UpdateShopOrderDto) {
    return `This action updates a #${id} shopOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} shopOrder`;
  }
}
