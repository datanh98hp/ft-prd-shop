import { IsNotEmpty } from "class-validator";
import { User } from "src/entity/user.entity";

export class PostDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    subtitle: string;
    @IsNotEmpty()
    slug: string
    // @IsNotEmpty()
    thumb: string;
    @IsNotEmpty()
    content: string;
    @IsNotEmpty()
    author: User;
}
