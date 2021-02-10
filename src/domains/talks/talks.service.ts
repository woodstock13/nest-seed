import {Injectable} from '@nestjs/common';
import {CreateTalkDto} from './dto/create-talk.dto';
import {UpdateTalkDto} from './dto/update-talk.dto';
import {ITalk} from "./entities/talk.entity";

const _ = require('lodash');
let sessions : ITalk[] = require('../../../data/sessions.json');

@Injectable()
export class TalksService {

  getAllTalks() {
    return _.filter(sessions);
  }

  getOneTalk(id) {
    const session = _.filter(sessions, { id: parseInt(id) });
    return session[0];
  }

  update(id: number, updateTalkDto: UpdateTalkDto) {
    const index: number = _.findIndex(sessions, (talk: ITalk) => {
      if(talk.id === id) {
        return talk
      }
    })
    if(index !== undefined) {
      return _.assign(sessions[index], updateTalkDto)
    }
    // todo erase + replace file with fs by sessions
    return undefined;
  }

  remove(id: number) {
    console.log(sessions.length)
    _.remove(sessions, (talk: ITalk) => {
      if(talk.id === id) {
        return talk
      }
    })
    console.log(sessions.length)
    // todo erase + replace file with fs by sessions
    return `This talk : ${id} has been deleted`;
  }

  // TODO
  create(createTalkDto: CreateTalkDto) {
    return 'This action adds a new talk';
  }
}
