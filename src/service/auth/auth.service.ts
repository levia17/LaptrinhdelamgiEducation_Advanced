import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "src/dtos/users/CreateUser.dto";
import { LoginUserDto } from "src/dtos/users/LoginUser.dto";
import { TokenService } from "../token/token.service";
import { error } from "console";


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private tokenService: TokenService
    ) { }


    async signIn(infomationUser: CreateUserDto) {
        const user = await this.userService.getUserByUsername(infomationUser.username)

        if (user) {
            return { message: 'Username is exist!' }
        } else {
            if (infomationUser.password !== infomationUser.confirmPassword) {
                return { message: 'Wrong confirm password!' }
            }
            return (this.userService.createUser(infomationUser), { message: 'SignIn Successfully!' });
        }

    }

    async logIn(infomationUser: LoginUserDto) {
        const user = await this.userService.getUserByUsername(infomationUser.username)

        if (!user) {

            return { message: 'Username is not exist!' }
        } else {

            if (infomationUser.password !== user.password) {
                
                return { message: 'Wong password!' }
            } else {

                const infoToEncode =
                {
                    username: user.username,
                    role: user.role,
                }

                const encodedToken = this.tokenService.encode(infoToEncode)

                return { message: 'LogIn successfully!', access_token: encodedToken }

            }
        }
    }




}