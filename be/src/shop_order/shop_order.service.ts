import { Injectable } from '@nestjs/common';
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

@Injectable()
export class ShopOrderService {

  constructor(
    @InjectRepository(OrderStatus) private readonly orderStatusRepo: Repository<OrderStatus>,
    @InjectRepository(ShippingMethod) private readonly shippingMethodRepo: Repository<ShippingMethod>,
    @InjectRepository(UserPaymentMethod) private readonly userPaymentMethodRepo: Repository<UserPaymentMethod>,
    @InjectRepository(OrderLine) private readonly orderLineRepo: Repository<OrderLine>,
    @InjectRepository(PaymentType) private readonly paymentTypeRepo: Repository<PaymentType>,
    @InjectRepository(ShopOrder) private readonly shopOrderRepo: Repository<ShopOrder>,
    @InjectRepository(ProductItem) private readonly productItemRepo: Repository<ProductItem>,
  ) { }

  async createOrder(createOrderDto: CreateOrderDto) {

    console.log(createOrderDto);
    const orderInst = await this.shopOrderRepo.create(createOrderDto);
    const orderNew = await this.shopOrderRepo.save(orderInst);
    //create order_line 
    const order_lines = createOrderDto.order_lines.map(async (item: CreateOrderLineDto) => {
      const lines = this.orderLineRepo.create({
        ...item,
        order:orderNew
      });
      await this.orderLineRepo.save(lines)
    });

    console.log(createOrderDto.order_lines)
  
    return "CREATED !";
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
