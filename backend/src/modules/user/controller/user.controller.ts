import { Body, Controller, Post, Res } from '@nestjs/common';
import { IAuthController } from '../interfaces/user.controller.interface';
import { Response } from 'express';
import { RegisterDTO } from '../dto/register.dto';

@Controller('auth')
export class AuthController implements IAuthController {

    constructor(private userService: )

  @Post('register')
  register(@Body body: RegisterDTO, @Res res: Response) {

  }
}

