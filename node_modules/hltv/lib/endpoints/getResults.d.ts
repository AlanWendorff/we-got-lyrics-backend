import { MatchResult } from '../models/MatchResult';
import { HLTVConfig } from '../config';
import { ContentFilter } from '../enums/ContentFilter';
declare type GetResultsArguments = {
    startPage?: number;
    endPage?: number;
    teamID?: number;
    eventID?: never;
    contentFilters?: ContentFilter[];
} | {
    startPage?: never;
    endPage?: never;
    teamID?: number;
    eventID?: number;
    contentFilters?: ContentFilter[];
};
export declare const getResults: (config: HLTVConfig) => ({ startPage, endPage, teamID, eventID, contentFilters }: GetResultsArguments) => Promise<MatchResult[]>;
export {};
