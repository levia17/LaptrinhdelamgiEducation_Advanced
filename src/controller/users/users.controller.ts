import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/users/CreateUser.dto';
import { UsersService } from 'src/service/users/users.service';
import { LoginUserDto } from 'src/dtos/users/LoginUser.dto';
import { AuthService } from 'src/service/auth/auth.service';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';


@ApiTags('User')
@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) { }

    @Get(':username') // Get one user
    getOneUser(@Param('username') username: string) {
        return this.userService.getUserByUsername(username);
    }

    @UseGuards(RolesGuard)
    @Roles('admin')
    @Get() // Get all users
    getUsers() {
        return this.userService.getUsers()
    };


    @Post('register') // Register
    signInUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.signIn(createUserDto);
    };

    @Post('login') // Login
    logInUser(@Body() loginUserDto: LoginUserDto) {
        return this.authService.logIn(loginUserDto)
    }


    @Delete(':username') // Delete one user
    deleteUser(@Param('username') username: string) {
        return this.userService.deleteUser(username);
    };

    @Patch(':username') // Update one user
    updateUser(@Param('username') username: string, @Body() updatedDetails: {}) {
        return this.userService.updateUser(username, updatedDetails);
    }



}
