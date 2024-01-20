import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Country } from '../entity/country.entity';
import { Address } from '../entity/address.entity';
import { UserAddress } from '../dto/user_address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country, Address, UserAddress])
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule { }
