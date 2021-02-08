import { Injectable } from '@nestjs/common';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';

const sessions = require('../../../data/sessions.json');
const _ = require('lodash');

@Injectable()
export class TalksService {
  create(createTalkDto: CreateTalkDto) {
    return 'This action adds a new talk';
  }

  getAllTalks() {
    return _.filter(sessions);
  }

  getOneTalk(id) {
    const session = _.filter(sessions, { id: parseInt(id) });
    return session[0];
  }

  update(id: number, updateTalkDto: UpdateTalkDto) {
    return `This action updates a #${id} talk`;
  }

  remove(id: number) {
    return `This action removes a #${id} talk`;
  }
}
