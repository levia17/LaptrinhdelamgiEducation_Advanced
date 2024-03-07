import { Module } from '@nestjs/common';
import { UsersService } from '../service/users/users.service';
import { UsersController } from '../controller/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entites/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }
