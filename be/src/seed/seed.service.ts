import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostDto } from 'src/dto/Post.dto';
import { About } from 'src/entity/about.entity';
import { Address } from 'src/entity/address.entity';
import { Brand } from 'src/entity/brand.entity';
import { OrderLine } from 'src/entity/order_line.entity';
import { OrderStatus } from 'src/entity/order_status.entity';
import { PaymentType } from 'src/entity/payment_type.entity';
import { Post as PostEntity } from 'src/entity/post.entity';
import { Product } from 'src/entity/product.entity';
import { ProductCategory } from 'src/entity/product_category.entity';
import { ProductConfiguration } from 'src/entity/product_configuration.entity';
import { ProductItem } from 'src/entity/product_item.entity';
import { Promotion } from 'src/entity/promotion.entity';
import { PromotionCategory } from 'src/entity/promotion_category.entity';
import { ShippingMethod } from 'src/entity/shipping_method.entity';
import { ShoppingCartItem } from 'src/entity/shop_cart_item.entity';
import { ShopOrder } from 'src/entity/shop_order.entity';
import { ShoppingCart } from 'src/entity/shopping_cart.entity';
import { UserPaymentMethod } from 'src/entity/user_payment_method.entity';
import { UserReview } from 'src/entity/user_review.entity';
import { Variation } from 'src/entity/variation.entity';
import { VariationOption } from 'src/entity/variation_option.entity';
import { Repository } from 'typeorm';
@Injectable()
export class SeedService {
  shoppingCartItemRepo: any;
  constructor(
    @InjectRepository(About) readonly aboutRepo: Repository<About>,
    @InjectRepository(Address) readonly addressRepo: Repository<Address>,
    @InjectRepository(Brand) readonly brandRepo: Repository<Brand>,
    @InjectRepository(PostEntity) readonly postRepo: Repository<PostEntity>,
    @InjectRepository(Product) readonly productRepo: Repository<Product>,
    @InjectRepository(ProductCategory)
    readonly productCateRepo: Repository<ProductCategory>,
    @InjectRepository(ProductConfiguration)
    readonly productConfigCateRepo: Repository<ProductConfiguration>,
    @InjectRepository(ProductItem)
    readonly productItemCateRepo: Repository<ProductItem>,
    @InjectRepository(Promotion) readonly promotionRepo: Repository<Promotion>,
    @InjectRepository(PromotionCategory)
    readonly promotionCateRepo: Repository<PromotionCategory>,
    @InjectRepository(ShopOrder)
    readonly shopOrderCateRepo: Repository<ShopOrder>,
    @InjectRepository(ShoppingCart)
    readonly shopCarteRepo: Repository<ShoppingCart>,
    @InjectRepository(Variation) readonly variationRepo: Repository<Variation>,
    @InjectRepository(VariationOption)
    readonly variationOptRepo: Repository<VariationOption>,

    @InjectRepository(UserPaymentMethod)
    readonly userPaymentMethodRepo: Repository<UserPaymentMethod>,

    @InjectRepository(PaymentType)
    readonly paymentTypeRepo: Repository<PaymentType>,

    @InjectRepository(ShippingMethod)
    readonly shipingMethodRepo: Repository<ShippingMethod>,

    @InjectRepository(ShoppingCartItem)
    shoppingCartItemRepo: Repository<ShoppingCartItem>,

    @InjectRepository(OrderLine)
    private readonly orderLineRepo: Repository<OrderLine>,

    @InjectRepository(OrderStatus)
    private readonly orderStatusRepo: Repository<OrderStatus>,

    @InjectRepository(UserReview)
    private readonly userReviewRepo: Repository<UserReview>,
  ) {}

  //seed data endpoint
  async executeSeed() {
    await this.seedAbout(1);
    await this.seedAddress(10);
    await this.seedBrand(10);
    await this.seedPost(10);
    // /1
    await this.seedPromotion(10);
    await this.seedPromotionCategory(10);
    await this.seedProductCategory(10);
    await this.seedProduct(10);

    await this.seedProductItem(10);
    await this.seedVariation(10);
    await this.seedVariationOption(10);
    await this.seedProductConfiguration(10);

    await this.seedPaymentType();
    await this.seedShippingMethod();
    await this.seedUserPaymentMethod(10);  
    await this.seedingOrderStatus();

    // await this.seedShopOrder(10);

    // await this.seedShoppingCart(10);

    /// await this.seedingOrderLine(10);  // dont't need initial
    // await this.seedUserReview(5);
    return 'Seed is processing';
  }

  async seedAbout(num: number) {
    const about = await this.aboutRepo.save({
      phone: faker.phone.number(),
      openTime: '08:00 - 22:00',
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      fb: faker.internet.url(),
      instagram: faker.internet.url(),
      shopee: faker.internet.url(),
      tiki: faker.internet.url(),
      tiktok: faker.internet.url(),
      description: faker.lorem.sentence(),
      logo: faker.image.url(),
      banners: faker.image.url(),
    } as About);

    // console.log('Seeding :', about);
    return about;
  }

  async seedAddress(num: number) {
    return new Array(num).fill(null).map(async () => {
      await this.addressRepo.save({
        unit_number: 'VND',
        stress_number: Math.ceil(Math.random()).toString(),
        address_line_1: faker.location.streetAddress(),
        address_line_2: faker.location.streetAddress(),
        city: faker.location.city(),
        postal_code: faker.location.zipCode(),
      } as Address);
    });
  }

  async seedBrand(num: number) {
    Array(num)
      .fill(null)
      .map(() => {
        return this.brandRepo.save({
          brand_name: faker.company.name(),
          logo: faker.image.url(),
        } as Brand);
      });
  }

  async seedPost(num: number) {
    Array(num)
      .fill(null)
      .map(async () => {
        const title = faker.lorem.text();
        let slug = () => {
          let slug = title.split(' ').join('-');
          return slug;
        };
        const newPost = this.postRepo.create({
          title,
          subtitle: faker.lorem.text(),
          slug: slug(),
          content: faker.lorem.text(),
          author: { id: 1 },
        } as PostDto);
        return await this.postRepo.save(newPost as PostEntity);
      });
  }
  async seedProduct(num: number) {
    let productName = faker.commerce.productName();
    Array(num)
      .fill(null)
      .map(async () => {
        return await this.productRepo.save({
          name: productName,
          slug: productName.split(' ').join('-'),
          original_price: faker.number.int({ min: 10000, max: 100000 }),
          description: faker.lorem.text(),
          category: { id: 1 },
        } as Product);
      });
  }

  async seedProductItem(num: number) {
    //sku=nameProduct+DateInput+
    Array(num)
      .fill(null)
      .map(async () => {
        return await this.productItemCateRepo.save({
          sku: faker.string.alphanumeric({ length: 5 }),
          qty_in_stock: faker.number.int({ min: 0, max: 100 }),
          price: faker.number.int({ min: 10000, max: 100000 }),
          product_images: faker.image.url(),
          product: { id: 1 },
        } as ProductItem);
      });
  }

  async seedProductCategory(num: number) {
    Array(num)
      .fill(null)
      .map(async () => {
        return await this.productCateRepo.save({
          category_name: faker.company.name(),
          category_img: faker.image.url({ width: 200, height: 300 }),
          parent_category: {}, //*
          promotion_category: { id: 1 },
          //*
        } as ProductCategory);
      });
  }

  async seedProductConfiguration(num: number) {
    Array(num)
      .fill(null)
      .map(async () => {
        return await this.productConfigCateRepo.save({
          product_item: { id: 1 },
          variation_option: {
            id: 1,
          },
        } as ProductConfiguration);
      });
  }

  async seedPromotion(num: number) {
    Array(num)
      .fill(null)
      .map(async () => {
        return await this.promotionRepo.save({
          name: faker.commerce.department(),
          description: faker.commerce.productAdjective(),
          discount_rate: faker.number.int({ min: 0, max: 20 }),
          start_date: faker.date.past().toISOString(),
          end_date: faker.date.future().toISOString(),
        } as Promotion);
      });
  }

  async seedPromotionCategory(num: number) {
    Array(num)
      .fill(null)
      .map(async () => {
        return await this.promotionCateRepo.save({
          promotion_name: faker.commerce.department(),
          promotion: { id: 1 },
        } as unknown as ProductCategory);
      });
  }

  async seedingOrderStatus() {
    await this.orderStatusRepo.save({
      name: 'canceled',
    } as OrderStatus);
    this.orderStatusRepo.save({
      name: 'delivering',
    } as OrderStatus);

    this.orderStatusRepo.save({
      name: 'pending',
    } as OrderStatus);

    this.orderStatusRepo.save({
      name: 'success',
    } as OrderStatus);
  }
  async seedShopOrder(num: number) {
    Array(num)
      .fill(null)
      .map(async () => {
        return await this.shopOrderCateRepo.save({
          user: { id: 1 },
          order_status: { id: faker.number.int({ min: 1, max: 3 }) },
          order_date: faker.date.recent(),
          shipping_address: { id: 1 },
          shippingMethod: { id: 1 },
          order_total: faker.number.int({ min: 10000, max: 100000 }),
        } as ShopOrder);
      });
  }
  async seedShippingMethod() {
    return await this.shipingMethodRepo.save({
      name: faker.helpers.arrayElement(['COD', 'SHIPPING']).toString(),
      price: faker.number.int({ min: 10000, max: 100000 }).toString(),
    } as ShippingMethod);
  }
  async seedPaymentType() {
    {
      return Promise.all([
        await this.paymentTypeRepo.save({
          type: 'COD',
        } as PaymentType),
        await this.paymentTypeRepo.save({
          type: 'CREDIT_CARD',
        } as PaymentType),
      ]);
    }
  }

  async seedUserPaymentMethod(num: number) {
    Array(num)
      .fill(null)
      .map(async () => {
        return await this.userPaymentMethodRepo.save({
          user: { id: 1 },
          payment_type: {
            id: 1,
          },
          provider: faker.string.alphanumeric({ length: 5 }),
          account_number: faker.string.numeric({ length: 5 }),
          expiry_date: faker.date.future().toISOString(),
          is_default: true,
        } as UserPaymentMethod);
      });
  }
  async seedShoppingCart(num: number) {
    Array(num)
      .fill(null)
      .map(async () => {
        const cart = await this.shopCarteRepo.save({
          user: { id: 1 },
        } as ShoppingCart);

        return await this.shoppingCartItemRepo.save({
          cart: cart,
          product_item: { id: 1 },
          qty: 1,
        });
      });
  }
  async seedingOrderLine(num: number) {
    // Array(num)
    //   .fill(null)
    //   .map(async () => {
    //     return await this.orderLineRepo.save({
    //       qty: faker.number.int({ min: 1, max: 10 }),
    //       price: faker.number.int({ min: 10000, max: 100000 }),
    //       product_item: { id: 1 },
    //       order: { id: 1 },
    //     } as OrderLine);
    //   });
  }

  async seedVariation(num: number) {
    Array(num)
      .fill(null)
      .map(async () => {
        return await this.variationRepo.save({
          variation_name: faker.commerce.productMaterial(),
          category: {
            id: 1,
          }, //Product category
        } as Variation);
      });
  }

  async seedVariationOption(num: number) {
    Array(num)
      .fill(null)
      .map(async (_) => {
        return await this.variationOptRepo.save({
          value: faker.commerce.department(),
          variation: _,
        } as VariationOption);
      });
  }

  async seedUserReview(num: number) {
    Array(num)
      .fill(null)
      .map(async () => {
        return await this.userReviewRepo.save({
          user: { id: 1 },
          rating: faker.number.int({ min: 1, max: 5 }),
          revirew_order: { id: 1 },
          comment:faker.lorem.text(),
        } as UserReview);
      });
  }
}
