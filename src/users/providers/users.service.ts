import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

/** Class to connect users table and perform business operations */
@Injectable()
export class UsersService {
  /** The is the constructor where we inject the cyclic dependency */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  /** Method to get all the users from database */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    console.log(getUsersParamDto, limit, page);
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
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
