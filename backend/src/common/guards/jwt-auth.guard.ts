import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtUtil } from '../utils/jwt.util';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = JwtUtil.verifyAccessToken(token);
      request['user'] = decoded;
      return true;
    } catch (error) {
      return false;
    }
  }
}
