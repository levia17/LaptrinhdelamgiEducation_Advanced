import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserTokenDto } from "src/dtos/users/UserToken.dto";

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService
    ) { }

    encode(infomationEncode: UserTokenDto) {
        const encode = this.jwtService.sign(infomationEncode, { secret: process.env.SECRET })
        return encode;
    }
}