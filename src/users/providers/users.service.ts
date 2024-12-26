import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

/** Class to connect users table and perform business operations */
@Injectable()
export class UsersService {
  /** Injecting Users Repository */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Check if user exists with same email
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    // Handle Exceptions
    // Create a new user
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);

    return newUser;
  }

  /** Method to get all the users from database */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    console.log(getUsersParamDto, limit, page);
    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }

  /** Fnding a single user using the Id of the user */
  public findOneById(id: string) {
    console.log(id);
    return [
      {
        id: 1234,
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }
}
