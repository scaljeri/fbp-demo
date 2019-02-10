export const EXCHANGE_SETTINGS = {
    title: 'Exchange',
    config: {},
    sockets: [
        {
            type: 'in'
        },
        {
            type: 'out',
            format: 'exchange'
        }
    ]
};

export const NOISE_SETTINGS = {
    title: 'Noise',
    config: {
        noiseLevel: 15
    },
    sockets: [
        {
            type: 'in',
            format: 'exchange'
        },
        {
            type: 'out',
            format: 'exchange'
        }
    ]
};

export const EXCHANGE_MERGE_SETTINGS = {
    title: 'Exchange merge',
    config: {},
    sockets: [
        {
            name: 'ip',
            type: 'in',
            format: 'exchange',
        },
        {
            name: 'exchange',
            type: 'in',
            format: 'exchange',
        },
        {
            type: 'out',
            format: 'exchange'
        }
    ]
}

export const EXCHANGE_IP_SETTINGS = {
    title: 'Exchange2IP',
    config: {},
    sockets: [
        {
            name: 'ip',
            type: 'in',
            format: 'ip',
        },
        {
            name: 'exchange',
            type: 'in',
            format: 'exchange',
        },
        {
            type: 'out',
            format: 'ip'
        }
    ]
};

export const RESPONSE_SETTINGS = {
    title: 'Response',
    sockets: [
        {
            type: 'in',
            format: 'ip'
        }
    ]
};


export const REQUEST_SETTINGS = {
    title: 'Request',
    config: {
        endpoint: '/api/crypto',
    },
    sockets: [
        {
            type: 'out',
            format: 'ip'
        }
    ]
};