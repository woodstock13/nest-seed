import {ApiProperty} from "@nestjs/swagger";

export class UpdateTalkDto {
     @ApiProperty({ type: String })
     description: string;
     @ApiProperty({ type: String })
     format: string;
     @ApiProperty({ type: String })
     level: string;
     @ApiProperty({ type: String })
     day: string;
}
