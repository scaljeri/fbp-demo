import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { DExchange } from './nodes/exchange';
import { FbNodeState, XxlFlow } from './nodes/flow-based';
import { NODES } from './settings';
import { DFlow } from './utils/flow';

@Injectable()
export class AppService {
    private fixtures: Record<string, XxlFlow> = {};

    get noiseLevel(): number {
        return 15;
    }

    addFlow(name: string, flow: XxlFlow): void {
        this.fixtures[name] = flow;
    }

    updateFlow(name: string, flow: XxlFlow): void {
        this.addFlow(name, flow);

        if (process.env.PERSIST) {
            this.persistFlow(name, flow);
        }
    }

    getFlow(name: string): XxlFlow {
        if (!this.fixtures[name]) {
            this.fixtures[name] = this.loadFLow(name);
        }

        return this.fixtures[name];
    }

    get nodes() {
        return {
            'exchange': {settings: {}, worker: DExchange},
        }
    }

    loadFLow(name): XxlFlow {
        const path = join(__dirname, `data/${name}-flow.json`);

        return JSON.parse(fs.readFileSync(path, 'utf-8'));
    }

    persistFlow(name: string, flow: XxlFlow): void {
        const path = join(__dirname, `data/${name}-flow.json`);

        fs.writeFileSync(path, JSON.stringify(flow, null, 2), 'utf-8');
    }

    buildFlow(name: string): DFlow {
        const fixture = this.getFlow(name);
        const flow = new DFlow(NODES as any);
        flow.initialize(fixture as FbNodeState);

        return flow;
    }
}
