import { Injectable } from '@nestjs/common';
import { CreateHeartDto } from './dto/create-heart.dto';
import { UpdateHeartDto } from './dto/update-heart.dto';

@Injectable()
export class HeartService {
  create(createHeartDto: CreateHeartDto) {
    return 'This action adds a new heart';
  }

  findAll() {
    return `This action returns all heart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} heart`;
  }

  update(id: number, updateHeartDto: UpdateHeartDto) {
    return `This action updates a #${id} heart`;
  }

  remove(id: number) {
    return `This action removes a #${id} heart`;
  }
}
