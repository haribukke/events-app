import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication/authentication.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let token = this.authenticationService.getAuthorizationToken();
        let id = this.authenticationService.getUserId();
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    id: `${id}`
                }
            });
        }

        return next.handle(request);
    }
}