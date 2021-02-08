import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TalksService } from './talks.service';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Talks")
@Controller('talks')
export class TalksController {
  constructor(private readonly talksService: TalksService) {}

  @Post()
  create(@Body() createTalkDto: CreateTalkDto) {
    return this.talksService.create(createTalkDto);
  }

  @Get('/hi')
  hello() {
    return 'hi'
  }

  @Get()
  findAll() {
    return this.talksService.getAllTalks();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talksService.getOneTalk(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTalkDto: UpdateTalkDto) {
    return this.talksService.update(+id, updateTalkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talksService.remove(+id);
  }
}
