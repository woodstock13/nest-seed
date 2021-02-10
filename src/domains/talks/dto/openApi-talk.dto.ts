import { ApiProperty } from "@nestjs/swagger"

export class TalkAPI {
    @ApiProperty({ type: Number })
    id: number
    @ApiProperty({ type: String })
     description: string
     @ApiProperty({ type: String })
     startsAt: string
     @ApiProperty({ type: String })
     endsAt: string
     @ApiProperty({
    type: 'object',
    properties: {
        id: { type: 'string', example: '1234' },
        name: { type: 'string', example: 'toto' }
    }})
        speakers: {
            id: string
            name: string
        }
      @ApiProperty({ type: String })
      room: string
      @ApiProperty({ type: String })
      day: string
      @ApiProperty({ type: String })
      format: string
      @ApiProperty({ type: String })
      track: string
      @ApiProperty({ type: String })
      level: string
}
