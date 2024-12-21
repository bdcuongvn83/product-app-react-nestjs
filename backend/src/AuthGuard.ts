import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      console.log("AuthGuard check");
      return validateRequest(request);
    }
  }


function validateRequest(request: any): boolean | Promise<boolean> | Observable<boolean> {
   // throw new Error("Function not implemented.");
   console.log("AuthGuard validateRequest ");
   return true;
}

