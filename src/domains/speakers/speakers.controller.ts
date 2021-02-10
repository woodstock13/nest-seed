import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SpeakersService } from './speakers.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Speakers")
@Controller('speakers')
export class SpeakersController {
  constructor(private readonly speakersService: SpeakersService) {}

  @Post()
  create(@Body() createSpeakerDto: CreateSpeakerDto) {
    return this.speakersService.create(createSpeakerDto);
  }

  @Get()
  findAll() {
    return this.speakersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speakersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSpeakerDto: UpdateSpeakerDto) {
    return this.speakersService.update(+id, updateSpeakerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speakersService.remove(+id);
  }
}
