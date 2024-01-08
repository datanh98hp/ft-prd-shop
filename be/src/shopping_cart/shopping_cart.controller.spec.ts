import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartController } from './shopping_cart.controller';
import { ShoppingCartService } from './shopping_cart.service';

describe('ShoppingCartController', () => {
  let controller: ShoppingCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingCartController],
      providers: [ShoppingCartService],
    }).compile();

    controller = module.get<ShoppingCartController>(ShoppingCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
