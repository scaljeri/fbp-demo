export interface IExchangeData {
    date: Date;
    name: string;
    value: number;
}

export interface IIP {
    isAuth: boolean;
    errors: string[];
    exchanges?: IExchangeData[][];
}

export interface IResponse {
    data: IExchangeData[];
}

export interface IPackage {
    isAuth?: boolean;
}