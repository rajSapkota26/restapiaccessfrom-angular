import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInteceptor implements HttpInterceptor {
    constructor(private service: LoginService) { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler):
        Observable<HttpEvent<any>> {
        //add token
        const token = this.service.getToken();
        let authReq = req;
        if (token != null) {
            authReq = authReq.clone({ setHeaders: { "Authorization": `Bearer ${token}` } })
        }
        return next.handle(authReq);
    }
}
export const authIntecepterProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInteceptor,
        multi: true,
    },
];
