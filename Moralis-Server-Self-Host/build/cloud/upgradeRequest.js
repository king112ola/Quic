"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradeRequest = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const common_core_1 = require("@moralisweb3/common-core");
function upgradeRequest(params, operation) {
    const request = Object.keys(params).reduce((value, key) => {
        value[(0, common_core_1.toCamel)(key)] = params[key];
        return value;
    }, {});
    if (request['address'] && !hasParam(operation, 'address')) {
        delete request['address'];
    }
    if (request['chain']) {
        if (!hasParam(operation, 'chain')) {
            delete request['chain'];
        }
        else {
            request['chain'] = upgradeChain(request['chain']);
        }
    }
    return request;
}
exports.upgradeRequest = upgradeRequest;
function hasParam(operation, name) {
    var _a, _b, _c;
    return (((_a = operation.bodyParamNames) === null || _a === void 0 ? void 0 : _a.includes(name)) ||
        ((_b = operation.urlPathParamNames) === null || _b === void 0 ? void 0 : _b.includes(name)) ||
        ((_c = operation.urlSearchParamNames) === null || _c === void 0 ? void 0 : _c.includes(name)) ||
        false);
}
const chainMap = {
    eth: '0x1',
    goerli: '0x5',
    sepolia: '0xaa36a7',
    polygon: '0x89',
    mumbai: '0x13881',
    bsc: '0x38',
    'bsc testnet': '0x61',
    avalanche: '0xa86a',
    'avalanche testnet': '0xa869',
    fantom: '0xfa',
    cronos: '0x19',
    'cronos testnet': '0x152',
};
function upgradeChain(chain) {
    const upgradedValue = chainMap[chain];
    return upgradedValue !== null && upgradedValue !== void 0 ? upgradedValue : chain;
}
//# sourceMappingURL=upgradeRequest.js.map