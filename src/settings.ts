import { FbNodeType } from '../public/admin/projects/flow-based/src/lib/flow-based';
import { CUSTOM_CODE_SETTINGS, CustomCodeWorker } from '../public/admin/src/app/workers/custom-code';
import { DAuth } from './nodes/auth';
import { DExchange } from './nodes/exchange';
import { DExchangeIp } from './nodes/exchange-ip';
import { DExchangeMerge } from './nodes/exchanges-merge';
import { DNoise } from './nodes/noise';
import { DRequest } from './nodes/request';
import { DResponse } from './nodes/response';

export const NODES: Record<string, FbNodeType> = {
    'request': { settings: {} as any, worker: DRequest as any} as FbNodeType,
    'auth': { settings: {} as any, worker: DAuth as any} as FbNodeType,
    'response': { settings: {} as any, worker: DResponse as any} as FbNodeType,
    'exchange': { settings: {} as any, worker: DExchange as any} as FbNodeType,
    'exchange-ip': { settings: {} as any, worker: DExchangeIp as any} as FbNodeType,
    'exchange-merge': { settings: {} as any, worker: DExchangeMerge as any} as FbNodeType,
    'noise': { settings: {} as any, worker: DNoise as any} as FbNodeType,
    'custom': { settings: CUSTOM_CODE_SETTINGS, worker: CustomCodeWorker as any} as FbNodeType,
    'flow': { settings: {title: 'Composite Unit', isFlow: true} as any} as FbNodeType
};