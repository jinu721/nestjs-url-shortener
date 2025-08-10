import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtUtil } from '../utils/jwt.util';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header missing or invalid',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = JwtUtil.verifyAccessToken(token);
      console.log('decoded', decoded);
      request['user'] = decoded;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Token expired or invalid');
    }
  }
}
