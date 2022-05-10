import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment as env} from "../../environments/environment";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor{
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setParams: {
        'api_key': env.API_KEY
      }
    })
    return next.handle(req)
  }
}
