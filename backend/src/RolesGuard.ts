import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {};
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    console.log("RolesGuard, canActivate");
    const roles = this.reflector.get(Roles, context.getHandler());
    console.log(`roles:${roles}`);
    if (!roles) {
      return true;
    }
    console.log("RolesGuard, canActivate2");
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(`RolesGuard, user${user}`);
    return matchRoles(roles, user?.roles);
   // return true;
  }
}

function matchRoles(roles: string[], roles1: any): boolean | Promise<boolean> | Observable<boolean> {
    //throw new Error("Function not implemented.");
    console.log("matchRoles");
    console.log(`roles:${roles}, roles user ${roles1}`);
    return false;
}

