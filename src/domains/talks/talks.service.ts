import { Injectable } from "@nestjs/common"
import { CreateTalkDto } from "./dto/create-talk.dto"
import { UpdateTalkDto } from "./dto/update-talk.dto"
import { ITalk } from "./entities/talk.entity"
import { updateJsonFile } from "../../common/utils/fs.utils"

const _ = require("lodash")
let sessions: ITalk[] = require("../../../data/sessions.json")

@Injectable()
export class TalksService {
    getAllTalks() {
        return _.filter(sessions)
    }

    getOneTalk(id) {
        const session = _.filter(sessions, { id: parseInt(id) })
        return session[0]
    }

    update(id: number, updateTalkDto: UpdateTalkDto) {
        console.log("items at the start:", sessions.length)
        const index: number = _.findIndex(sessions, (talk: ITalk) => {
            if (talk.id === id) {
                return talk
            }
        })
        console.log("items at the end:", sessions.length)
        if (index !== -1) {
            sessions[index] = _.assign(sessions[index], updateTalkDto)
            updateJsonFile(sessions).then(() => console.log("json file updated"))
            return sessions[index]
        }
        return undefined
    }

    remove(id: number) {
        _.remove(sessions, (talk: ITalk) => {
            if (talk.id === id) {
                return talk
            }
        })
        // todo : handle error here
        updateJsonFile(sessions).then(() => console.log("json file updated"))
        return `This talk : ${id} has been deleted`
    }

    // TODO
    create(createTalkDto: CreateTalkDto) {
        return "This action adds a new talk"
    }
}
