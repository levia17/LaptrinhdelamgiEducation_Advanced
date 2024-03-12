import { ApiProperty } from "@nestjs/swagger";



export class UserTokenDto {
    @ApiProperty()
    readonly username: string;
    
    @ApiProperty()
    readonly role: string;
}