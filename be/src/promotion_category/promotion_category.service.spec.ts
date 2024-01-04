import { Test, TestingModule } from '@nestjs/testing';
import { PromotionCategoryService } from './promotion_category.service';

describe('PromotionCategoryService', () => {
  let service: PromotionCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromotionCategoryService],
    }).compile();

    service = module.get<PromotionCategoryService>(PromotionCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
