import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEnum, IsInt, isString, Length, Max, Min } from "class-validator"

export class UpdateTalkDto {
    @ApiProperty({ type: String })
    @Length(10, 100)
    description: string

    // between : 1(easy) to 4(hard)
    @ApiProperty({ type: Number })
    @IsInt()
    @Min(0)
    @Max(10)
    level: number

    @ApiProperty({ type: String })
    @IsEmail()
    contactEmail: string
}
