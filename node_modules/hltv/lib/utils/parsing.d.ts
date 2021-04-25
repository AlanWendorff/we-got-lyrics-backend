/// <reference types="cheerio" />
export declare const text: (el: cheerio.Cheerio) => string;
export declare const prev: (el: cheerio.Cheerio) => cheerio.Cheerio;
export declare const hasChild: (childSelector: string) => (el: cheerio.Cheerio) => boolean;
export declare const hasNoChild: (childSelector: string) => (el: cheerio.Cheerio) => boolean;
export declare const popSlashSource: (el: cheerio.Cheerio) => string | undefined;
export declare const percentageToDecimalOdd: (odd: number) => number;
