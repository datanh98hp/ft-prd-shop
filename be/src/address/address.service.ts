import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entity/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {}
  async create(createAddressDto: CreateAddressDto) {
    return await this.addressRepo.save(createAddressDto);
  }

  async findAll() {
    return await this.addressRepo.find({});
  }

  async findOne(id: number) {
    return await this.addressRepo.findOne({ where: { id } });
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    return await this.addressRepo.update(id, updateAddressDto);
  }

  async remove(id: number) {
    return await this.addressRepo.delete(id);
  }
}
