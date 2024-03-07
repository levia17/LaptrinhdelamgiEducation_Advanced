import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/users/CreateUser.dto';
import { UsersService } from 'src/service/users/users.service';
import { LoginUserDto } from 'src/dtos/users/LoginUser.dto';


@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService
    ) { }

    @Get(':username') // Get one user
    getOneUser(@Param('username') username: string) {
        return this.userService.getUserByUsername(username);
    }

    @Get() // Get all users
    getUsers() {
        return this.userService.getUsers()
    };


    @Post('register') // Register
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    };

    @Post('login') // Login
    loginUser(@Body() loginUserDto: LoginUserDto) {
        return this.userService.loginUser(loginUserDto)
    }


    @Delete(':username') // Delete one user
    deleteUser(@Param('username') username: string) {
        return this.userService.deleteUser(username);
    };

    @Patch(':username') // Update one user
    updateUser(@Param('username') username: string[], @Body() updatedDetails: {}) {
        return this.userService.updateUser(username, updatedDetails);
    }



}
