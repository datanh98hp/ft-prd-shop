import { Test, TestingModule } from '@nestjs/testing';
import { ProductConfigurationController } from './product_configuration.controller';
import { ProductConfigurationService } from './product_configuration.service';

describe('ProductConfigurationController', () => {
  let controller: ProductConfigurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductConfigurationController],
      providers: [ProductConfigurationService],
    }).compile();

    controller = module.get<ProductConfigurationController>(ProductConfigurationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
