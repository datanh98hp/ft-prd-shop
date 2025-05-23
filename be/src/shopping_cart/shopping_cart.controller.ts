import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { CreateShoppingCartDto } from '../dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from '../dto/update-shopping_cart.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('shopping-cart')
@UseInterceptors(CacheInterceptor)
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Post()
  create(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.create(createShoppingCartDto);
  }

  // @UseGuards(AuthGuard)
  // @UseGuards(RolesGuard)
  // @Roles(Role.Admin, Role.User)
  // @Get()
  // async findAll(@Query() query: any) {
  //   return await this.shoppingCartService.findAll(query);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingCartService.findOne(+id);
  }
  @Get('/user/:idUser')
  getCartByUser(@Param('idUser') idUser: string) {
    return this.shoppingCartService.getCartByUser(+idUser);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateShoppingCartDto: UpdateShoppingCartDto,
  ) {
    return this.shoppingCartService.update(+id, updateShoppingCartDto);
  }

  @UseGuards(AuthGuard)
  @Put('/item/:id')
  updateItem(@Param('id') id: string, @Body() body: { qty: string }) {
    const { qty } = body;
    return this.shoppingCartService.updateItem(+id, +qty);
  }
  @Delete('/item/:id')
  removeItemCart(@Body('ids') ids: number[]) {
    return this.shoppingCartService.removeItemCart(ids);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingCartService.remove(+id);
  }
}
