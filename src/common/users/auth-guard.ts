// jwt.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
      return false; // No token provided or incorrect format
    }

    const authToken = token.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(authToken);
      request.user = decoded; // Set user information extracted from JWT token in the request
      return true; // Token is valid
    } catch (error) {
      return false; // Token is invalid or expired
    }
  }
}
