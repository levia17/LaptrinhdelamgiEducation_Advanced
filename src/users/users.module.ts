import { Module } from '@nestjs/common';
import { UsersService } from '../service/users/users.service';
import { UsersController } from '../controller/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entites/user.entity';
import { AuthService } from 'src/service/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/service/token/token.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, AuthService, JwtService, TokenService],
})
export class UsersModule { }
