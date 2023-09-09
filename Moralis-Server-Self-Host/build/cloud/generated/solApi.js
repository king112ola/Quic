"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const moralis_1 = __importDefault(require("moralis"));
const common_core_1 = require("@moralisweb3/common-core");
const rateLimit_1 = require("../../rateLimit");
const upgradeRequest_1 = require("../upgradeRequest");
const axios_1 = require("axios");
const common_sol_utils_1 = require("@moralisweb3/common-sol-utils");
function getErrorMessage(error, name) {
    // Resolve Axios data inside the MoralisError
    if (error instanceof common_core_1.MoralisError &&
        error.cause &&
        error.cause instanceof axios_1.AxiosError &&
        error.cause.response &&
        error.cause.response.data) {
        return JSON.stringify(error.cause.response.data);
    }
    if (error instanceof Error) {
        return error.message;
    }
    return `API error while calling ${name}`;
}
function getOperation(operationName) {
    const operation = common_sol_utils_1.operations.find((o) => o.name === operationName);
    if (!operation) {
        throw new Error(`Not supported operation ${operationName}`);
    }
    return operation;
}
async function beforeApiRequest(user, ip, name) {
    if (!(await (0, rateLimit_1.handleRateLimit)(user, ip))) {
        throw new Error(`Too many requests to ${name} API from this particular client, the clients needs to wait before sending more requests.`);
    }
}
const balanceOperation = getOperation('getBalance');
Parse.Cloud.define("sol-balance", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'balance');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, balanceOperation);
        const result = await moralis_1.default.SolApi.account.getBalance(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'sol-balance'));
    }
});
const getSPLOperation = getOperation('getSPL');
Parse.Cloud.define("sol-getSPL", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getSPL');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getSPLOperation);
        const result = await moralis_1.default.SolApi.account.getSPL(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'sol-getSPL'));
    }
});
const getNFTsOperation = getOperation('getNFTs');
Parse.Cloud.define("sol-getNFTs", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getNFTs');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getNFTsOperation);
        const result = await moralis_1.default.SolApi.account.getNFTs(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'sol-getNFTs'));
    }
});
const getPortfolioOperation = getOperation('getPortfolio');
Parse.Cloud.define("sol-getPortfolio", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getPortfolio');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getPortfolioOperation);
        const result = await moralis_1.default.SolApi.account.getPortfolio(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'sol-getPortfolio'));
    }
});
const getNFTMetadataOperation = getOperation('getNFTMetadata');
Parse.Cloud.define("sol-getNFTMetadata", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getNFTMetadata');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getNFTMetadataOperation);
        const result = await moralis_1.default.SolApi.nft.getNFTMetadata(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'sol-getNFTMetadata'));
    }
});
const getTokenPriceOperation = getOperation('getTokenPrice');
Parse.Cloud.define("sol-getTokenPrice", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getTokenPrice');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getTokenPriceOperation);
        const result = await moralis_1.default.SolApi.token.getTokenPrice(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'sol-getTokenPrice'));
    }
});
//# sourceMappingURL=solApi.js.map