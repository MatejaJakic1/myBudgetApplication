export interface Exchange {
    date: string;
    [key: string]: { [key: string]: number } | string;  
}