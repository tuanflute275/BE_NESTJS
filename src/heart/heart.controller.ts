import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeartService } from './heart.service';
import { CreateHeartDto } from './dto/create-heart.dto';
import { UpdateHeartDto } from './dto/update-heart.dto';

@Controller('heart')
export class HeartController {
  constructor(private readonly heartService: HeartService) {}

  @Post()
  create(@Body() createHeartDto: CreateHeartDto) {
    return this.heartService.create(createHeartDto);
  }

  @Get()
  findAll() {
    return this.heartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeartDto: UpdateHeartDto) {
    return this.heartService.update(+id, updateHeartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heartService.remove(+id);
  }
}
