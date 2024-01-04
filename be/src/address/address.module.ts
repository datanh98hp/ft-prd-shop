import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Country } from './entities/country.entity';
import { Address } from './entities/address.entity';
import { UserAddress } from './entities/user_address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country, Address, UserAddress])
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule { }
