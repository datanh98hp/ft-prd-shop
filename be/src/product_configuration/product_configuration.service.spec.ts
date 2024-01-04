import { Test, TestingModule } from '@nestjs/testing';
import { ProductConfigurationService } from './product_configuration.service';

describe('ProductConfigurationService', () => {
  let service: ProductConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductConfigurationService],
    }).compile();

    service = module.get<ProductConfigurationService>(ProductConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
