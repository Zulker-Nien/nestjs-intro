/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

/** Class to connect users table and perform business operations */
@Injectable()
export class UsersService {
  /** Injecting Users Repository */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    private readonly usersCreateManyProvider: UsersCreateManyProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Check if user exists with same email
    let existingUser = undefined;
    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    // Handle Exceptions
    if (existingUser) {
      throw new BadRequestException(
        'User already exists. Please check your email.',
      );
    }
    // Create a new user
    let newUser = this.usersRepository.create(createUserDto);
    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return newUser;
  }

  /** Method to get all the users from database */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: "The API endpoint doesn't exist",
        fileName: 'users.service.ts',
        lineNumber: 88,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'Occured because the API was moved permanently',
      },
    );
  }

  /** Fnding a single user using the Id of the user */
  public async findOneById(id: number) {
    let user = undefined;
    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!user) {
      throw new BadRequestException('User ID does not exist');
    }
    return user;
  }
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }
}
