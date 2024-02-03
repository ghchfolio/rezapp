import { IModal } from "./modal.model";

export interface IModalProps {
    content: IModal;
    confirmAction: null | (() => void);
    cancelAction: null | (() => void);
}
