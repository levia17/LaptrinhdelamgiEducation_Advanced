import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRole = this.reflector.get('roles', context.getHandler());

        try {
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization.split(" ")[1];
            if (!token) {
                throw new UnauthorizedException('Cannot authorized!');
            }

            request.user = this.jwtService.verify(token, { secret: process.env.SECRET })

            if (!requiredRole.includes(request.user.role)) {

                throw new UnauthorizedException('Not enough permission to do that!');
            }

        }
        catch (e) {
            console.log(e);
            throw new Error('Error!')
        }
        return true;
    }
}
