import { HttpInterceptorFn } from '@angular/common/http';
import { ServerRequestService } from '../services/server-request.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

export const serverRequestInterceptor: HttpInterceptorFn = (req, next) => {
    const srs = inject(ServerRequestService);

    srs.showProgressBar(true);

    return next(req).pipe(finalize(() => srs.showProgressBar(false)));
};
