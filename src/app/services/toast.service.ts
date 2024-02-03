import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IToast } from '../models/toast.model';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    #toastBSubj = new BehaviorSubject<IToast | null>(null);
    toast$ = this.#toastBSubj.asObservable();

    setToast(newToast: IToast) {
        this.#toastBSubj.next(newToast);
    }

    clearToast() {
        this.#toastBSubj.next(null);
    }
}
