import { PartialType } from "@nestjs/mapped-types";
import { CreateUserReviewDto } from "./create-user-review.dto";

export class UpdateUserReviewDto extends PartialType(CreateUserReviewDto) {

}
