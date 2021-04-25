import { HLTVConfig } from '../config';
import { OngoingEventResult } from '../models/OngoingEventResult';
export declare const getOngoingEvents: (config: HLTVConfig) => () => Promise<OngoingEventResult[]>;
