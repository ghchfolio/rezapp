import { IModal } from "./modal.model";

export interface IModalProps {
    content: IModal;
    confirmAction: (() => void);
    cancelAction: (() => void);
}
