import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    NotFoundException,
    ParseIntPipe,
    ValidationPipe
} from "@nestjs/common"
import { TalksService } from "./talks.service"
import { CreateTalkDto } from "./dto/create-talk.dto"
import { UpdateTalkDto } from "./dto/update-talk.dto"
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { TalkAPI } from "./dto/openApi-talk.dto"
import { updateJsonFile } from "../../common/utils/fs.utils"

@ApiTags("DavTalks")
@Controller("talks")
export class TalksController {
    constructor(private readonly talksService: TalksService) {}

    @Get()
    findAll() {
        return this.talksService.getAllTalks()
    }

    @Get(":id")
    @ApiNotFoundResponse({ description: "Talk not found" })
    @ApiOkResponse({
        description: "Get one specific talk",
        type: TalkAPI
    })
    findOne(@Param("id", ParseIntPipe) id: number) {
        const selectedTalk = this.talksService.getOneTalk(id)
        if (selectedTalk === undefined) {
            throw new NotFoundException()
        }
        return selectedTalk
    }

    // TODO fix later
    @Put(":id")
    @ApiOkResponse({
        description: "Get one specific talk",
        type: TalkAPI
    })
    @ApiBadRequestResponse({ description: "Bad request" })
    @ApiNotFoundResponse({ description: "Talk not found" })
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body(new ValidationPipe()) updateTalkDto: UpdateTalkDto
    ) {
        const updatedTalk = this.talksService.update(+id, updateTalkDto)
        if (updatedTalk === undefined) {
            throw new NotFoundException()
        }
        return updatedTalk
    }

    @Delete(":id")
    remove(@Param("id", ParseIntPipe) id: string) {
        return this.talksService.remove(+id)
    }

    // TODO by yourself :)
    @Post()
    create(@Body() createTalkDto: CreateTalkDto) {
        return this.talksService.create(createTalkDto)
    }
}
