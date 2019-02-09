import { NOISE_SETTINGS } from '../../../../src/nodes/noise';
import {
  EXCHANGE_IP_SETTINGS, EXCHANGE_MERGE_SETTINGS,
  EXCHANGE_SETTINGS,
  REQUEST_SETTINGS,
  RESPONSE_SETTINGS
} from '../../../../src/nodes/settings';
import { ExchangeMergeComponent } from './nodes/exchange-merge/exchange-merge.component';
import { ExchangeResponseComponent } from './nodes/exchange-response/exchange-response.component';
import { ExchangeComponent } from './nodes/exchange/exchange.component';
import { NoiseComponent } from './nodes/noise/noise.component';
import { RandomNumbersComponent } from './nodes/random-numbers/random-numbers.component';
import { RequestComponent } from './nodes/request/request.component';
import { RANDOM_NUMBER_SETTINGS, RandomNumbersWorker } from './workers/random-numbers';
import { StatsComponent } from './nodes/stats/stats.component';
import { STATS_SETTINGS, StatsWorker } from './workers/stats';
import { BasicGraphComponent } from './nodes/basic-graph/basic-graph.component';
import { BASIC_GRAPH_CONFIG, BasicGraphWorker } from './workers/basic-graph';
import { MergeStreamsComponent } from './nodes/merge-streams/merge-streams.component';
import { MERGE_STREAMS_SETTINGS, MergeStreamsWorker } from './workers/merge-streams';
import { TapComponent } from './nodes/tap/tap.component';
import { TAP_SETTINGS, TapWorker } from './workers/tap';
import { DefaultFlowComponent } from './nodes/default-flow/default-flow.component';
import { CustomCodeComponent } from './nodes/custom-code/custom-code.component';
import { CUSTOM_CODE_SETTINGS, CustomCodeWorker } from './workers/custom-code';
import { FractalComponent } from './nodes/fractal/fractal.component';
import { FRACTALS_SETTINGS, FractalsWorker } from './workers/fractals';
import { ZOOM_CANVAS_SETTINGS, ZoomCanvasWorker } from './workers/zoom-canvas';
import { ZoomCanvasComponent } from './nodes/zoom-canvas/zoom-canvas.component';
import { CanvasComponent } from './nodes/canvas/canvas.component';
import { CANVAS_SETTINGS, CanvasWorker } from './workers/canvas';
import { ResponseComponent } from './nodes/response/response.component';

export const FB_CONFIG = {
  'random-numbers': {component: RandomNumbersComponent, settings: RANDOM_NUMBER_SETTINGS, worker: RandomNumbersWorker},
  'stats': {component: StatsComponent, settings: STATS_SETTINGS, worker: StatsWorker},
  'basic-graph': {component: BasicGraphComponent, settings: BASIC_GRAPH_CONFIG, worker: BasicGraphWorker},
  'merge-streams': {component: MergeStreamsComponent, settings: MERGE_STREAMS_SETTINGS, worker: MergeStreamsWorker},
  'tap': {component: TapComponent, settings: TAP_SETTINGS, worker: TapWorker},
  'custom': {component: CustomCodeComponent, settings: CUSTOM_CODE_SETTINGS, worker: CustomCodeWorker},
  'fractals': {component: FractalComponent, settings: FRACTALS_SETTINGS, worker: FractalsWorker},
  'zoomcanvas': {component: ZoomCanvasComponent, settings: ZOOM_CANVAS_SETTINGS, worker: ZoomCanvasWorker},
  'canvas': {component: CanvasComponent, settings: CANVAS_SETTINGS, worker: CanvasWorker},
  'exchange': {component: ExchangeComponent, settings: EXCHANGE_SETTINGS},
  'exchange-ip': {component: ExchangeResponseComponent, settings: EXCHANGE_IP_SETTINGS},
  'exchange-merge': {component: ExchangeMergeComponent, settings: EXCHANGE_MERGE_SETTINGS},
  'request': {component: RequestComponent, settings: REQUEST_SETTINGS},
  'response': {component: ResponseComponent, settings: RESPONSE_SETTINGS},
  'noise': {component: NoiseComponent, settings: NOISE_SETTINGS},
  'flow': {component: DefaultFlowComponent, settings: {title: 'Composite Unit', isFlow: true}}
};

export const XXL_SOCKET_COLORS = {
  'number': '#025d04',
  'worker': '#c1a',
  'dimension': '#bebebe',
  'point': '#9988cf',
  'ip': '#bada55',
  'exchange': '#9900ff'
};
