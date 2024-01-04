import { Test, TestingModule } from '@nestjs/testing';
import { PromotionCategoryController } from './promotion_category.controller';
import { PromotionCategoryService } from './promotion_category.service';

describe('PromotionCategoryController', () => {
  let controller: PromotionCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromotionCategoryController],
      providers: [PromotionCategoryService],
    }).compile();

    controller = module.get<PromotionCategoryController>(PromotionCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
