import { Test, TestingModule } from '@nestjs/testing';
import { VariationOptionController } from './variation_option.controller';
import { VariationOptionService } from './variation_option.service';

describe('VariationOptionController', () => {
  let controller: VariationOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariationOptionController],
      providers: [VariationOptionService],
    }).compile();

    controller = module.get<VariationOptionController>(VariationOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
