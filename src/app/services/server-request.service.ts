import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ServerRequestService {
    #isLoadingSubj = new BehaviorSubject<boolean>(false);
    isLoading$ = this.#isLoadingSubj.asObservable();

    showProgressBar(show: boolean) {
        this.#isLoadingSubj.next(show);
    }
}
