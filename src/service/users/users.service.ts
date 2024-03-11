import { Injectable, Param, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entites/user.entity';
import { CreateUserParam, LoginUserParam } from 'src/ulti/type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    getUsers() {
        return this.userRepository.find();
    };

    getUserByUsername(username: string) {
        return this.userRepository.findOneBy({ username })
    };


    createUser(userDetails: CreateUserParam) {
        const newUser = this.userRepository.create({ ...userDetails, createAt: new Date() });
        return this.userRepository.save(newUser);
    };

    deleteUser(username: string) {
        return (this.userRepository.delete({ username }), { message: 'Username is deleted!' });
    }


    updateUser(username: string[], updatedDetails: {}) {
        return this.userRepository.update(username, updatedDetails)
    }

}
