export interface IImage {
    url: string;
    caption: string;
}

export interface ISample {
    id: number;
    src: string;
    caption: string;
    url: string | null;
    desc: string;
    stack: string;
    year: string;
    comp: string;
    type: string;
    images: IImage[] | null
}