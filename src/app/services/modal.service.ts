import { Injectable } from '@angular/core';
import { IModalProps } from '../models/modal-props.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private modalContentBSubj = new BehaviorSubject<null | IModalProps>(null);
    modalContent$ = this.modalContentBSubj.asObservable();

    setModal(newModalProps: IModalProps) {
        this.modalContentBSubj.next(newModalProps);
    }

    clearModalContent() {
        this.modalContentBSubj.next(null);
    }
}
