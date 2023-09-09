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
const common_evm_utils_1 = require("@moralisweb3/common-evm-utils");
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
    const operation = common_evm_utils_1.operations.find((o) => o.name === operationName);
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
const getBlockOperation = getOperation('getBlock');
Parse.Cloud.define("getBlock", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getBlock');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getBlockOperation);
        const result = await moralis_1.default.EvmApi.block.getBlock(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getBlock'));
    }
});
const getDateToBlockOperation = getOperation('getDateToBlock');
Parse.Cloud.define("getDateToBlock", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getDateToBlock');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getDateToBlockOperation);
        const result = await moralis_1.default.EvmApi.block.getDateToBlock(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getDateToBlock'));
    }
});
const getLogsByAddressOperation = getOperation('getContractLogs');
Parse.Cloud.define("getLogsByAddress", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getLogsByAddress');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getLogsByAddressOperation);
        const result = await moralis_1.default.EvmApi.events.getContractLogs(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getLogsByAddress'));
    }
});
const getNFTTransfersByBlockOperation = getOperation('getNFTTransfersByBlock');
Parse.Cloud.define("getNFTTransfersByBlock", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getNFTTransfersByBlock');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getNFTTransfersByBlockOperation);
        const result = await moralis_1.default.EvmApi.nft.getNFTTransfersByBlock(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getNFTTransfersByBlock'));
    }
});
const getTransactionOperation = getOperation('getTransaction');
Parse.Cloud.define("getTransaction", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getTransaction');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getTransactionOperation);
        const result = await moralis_1.default.EvmApi.transaction.getTransaction(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getTransaction'));
    }
});
const getContractEventsOperation = getOperation('getContractEvents');
Parse.Cloud.define("getContractEvents", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getContractEvents');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getContractEventsOperation);
        const result = await moralis_1.default.EvmApi.events.getContractEvents(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getContractEvents'));
    }
});
const runContractFunctionOperation = getOperation('runContractFunction');
Parse.Cloud.define("runContractFunction", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'runContractFunction');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, runContractFunctionOperation);
        const result = await moralis_1.default.EvmApi.utils.runContractFunction(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'runContractFunction'));
    }
});
const getTransactionsOperation = getOperation('getWalletTransactions');
Parse.Cloud.define("getTransactions", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getTransactions');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getTransactionsOperation);
        const result = await moralis_1.default.EvmApi.transaction.getWalletTransactions(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getTransactions'));
    }
});
const getTransactionsVerboseOperation = getOperation('getWalletTransactionsVerbose');
Parse.Cloud.define("getTransactionsVerbose", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getTransactionsVerbose');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getTransactionsVerboseOperation);
        const result = await moralis_1.default.EvmApi.transaction.getWalletTransactionsVerbose(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getTransactionsVerbose'));
    }
});
const getNativeBalanceOperation = getOperation('getNativeBalance');
Parse.Cloud.define("getNativeBalance", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getNativeBalance');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getNativeBalanceOperation);
        const result = await moralis_1.default.EvmApi.balance.getNativeBalance(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getNativeBalance'));
    }
});
const getTokenBalancesOperation = getOperation('getWalletTokenBalances');
Parse.Cloud.define("getTokenBalances", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getTokenBalances');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getTokenBalancesOperation);
        const result = await moralis_1.default.EvmApi.token.getWalletTokenBalances(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getTokenBalances'));
    }
});
const getTokenTransfersOperation = getOperation('getWalletTokenTransfers');
Parse.Cloud.define("getTokenTransfers", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getTokenTransfers');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getTokenTransfersOperation);
        const result = await moralis_1.default.EvmApi.token.getWalletTokenTransfers(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getTokenTransfers'));
    }
});
const getNFTsOperation = getOperation('getWalletNFTs');
Parse.Cloud.define("getNFTs", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getNFTs');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getNFTsOperation);
        const result = await moralis_1.default.EvmApi.nft.getWalletNFTs(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getNFTs'));
    }
});
const getNFTTransfersOperation = getOperation('getWalletNFTTransfers');
Parse.Cloud.define("getNFTTransfers", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getNFTTransfers');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getNFTTransfersOperation);
        const result = await moralis_1.default.EvmApi.nft.getWalletNFTTransfers(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getNFTTransfers'));
    }
});
const getWalletNFTCollectionsOperation = getOperation('getWalletNFTCollections');
Parse.Cloud.define("getWalletNFTCollections", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getWalletNFTCollections');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getWalletNFTCollectionsOperation);
        const result = await moralis_1.default.EvmApi.nft.getWalletNFTCollections(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getWalletNFTCollections'));
    }
});
const getNFTsForContractOperation = getOperation('getWalletNFTs');
Parse.Cloud.define("getNFTsForContract", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getNFTsForContract');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getNFTsForContractOperation);
        const result = await moralis_1.default.EvmApi.nft.getWalletNFTs(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getNFTsForContract'));
    }
});
const getTokenMetadataOperation = getOperation('getTokenMetadata');
Parse.Cloud.define("getTokenMetadata", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getTokenMetadata');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getTokenMetadataOperation);
        const result = await moralis_1.default.EvmApi.token.getTokenMetadata(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getTokenMetadata'));
    }
});
const getNFTTradesOperation = getOperation('getNFTTrades');
Parse.Cloud.define("getNFTTrades", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getNFTTrades');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getNFTTradesOperation);
        const result = await moralis_1.default.EvmApi.nft.getNFTTrades(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getNFTTrades'));
    }
});
const getNFTLowestPriceOperation = getOperation('getNFTLowestPrice');
Parse.Cloud.define("getNFTLowestPrice", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getNFTLowestPrice');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getNFTLowestPriceOperation);
        const result = await moralis_1.default.EvmApi.nft.getNFTLowestPrice(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getNFTLowestPrice'));
    }
});
const getTokenMetadataBySymbolOperation = getOperation('getTokenMetadataBySymbol');
Parse.Cloud.define("getTokenMetadataBySymbol", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getTokenMetadataBySymbol');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getTokenMetadataBySymbolOperation);
        const result = await moralis_1.default.EvmApi.token.getTokenMetadataBySymbol(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getTokenMetadataBySymbol'));
    }
});
const getTokenPriceOperation = getOperation('getTokenPrice');
Parse.Cloud.define("getTokenPrice", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getTokenPrice');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getTokenPriceOperation);
        const result = await moralis_1.default.EvmApi.token.getTokenPrice(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getTokenPrice'));
    }
});
const getTokenAddressTransfersOperation = getOperation('getTokenTransfers');
Parse.Cloud.define("getTokenAddressTransfers", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getTokenAddressTransfers');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getTokenAddressTransfersOperation);
        const result = await moralis_1.default.EvmApi.token.getTokenTransfers(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getTokenAddressTransfers'));
    }
});
const getTokenAllowanceOperation = getOperation('getTokenAllowance');
Parse.Cloud.define("getTokenAllowance", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getTokenAllowance');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getTokenAllowanceOperation);
        const result = await moralis_1.default.EvmApi.token.getTokenAllowance(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getTokenAllowance'));
    }
});
const searchNFTsOperation = getOperation('searchNFTs');
Parse.Cloud.define("searchNFTs", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'searchNFTs');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, searchNFTsOperation);
        const result = await moralis_1.default.EvmApi.nft.searchNFTs(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'searchNFTs'));
    }
});
const getNftTransfersFromToBlockOperation = getOperation('getNFTTransfersFromToBlock');
Parse.Cloud.define("getNftTransfersFromToBlock", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getNftTransfersFromToBlock');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getNftTransfersFromToBlockOperation);
        const result = await moralis_1.default.EvmApi.nft.getNFTTransfersFromToBlock(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getNftTransfersFromToBlock'));
    }
});
const getAllTokenIdsOperation = getOperation('getContractNFTs');
Parse.Cloud.define("getAllTokenIds", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getAllTokenIds');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getAllTokenIdsOperation);
        const result = await moralis_1.default.EvmApi.nft.getContractNFTs(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getAllTokenIds'));
    }
});
const getMultipleNFTsOperation = getOperation('getMultipleNFTs');
Parse.Cloud.define("getMultipleNFTs", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getMultipleNFTs');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getMultipleNFTsOperation);
        const result = await moralis_1.default.EvmApi.nft.getMultipleNFTs(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getMultipleNFTs'));
    }
});
const getContractNFTTransfersOperation = getOperation('getNFTContractTransfers');
Parse.Cloud.define("getContractNFTTransfers", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getContractNFTTransfers');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getContractNFTTransfersOperation);
        const result = await moralis_1.default.EvmApi.nft.getNFTContractTransfers(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getContractNFTTransfers'));
    }
});
const getNFTOwnersOperation = getOperation('getNFTOwners');
Parse.Cloud.define("getNFTOwners", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getNFTOwners');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getNFTOwnersOperation);
        const result = await moralis_1.default.EvmApi.nft.getNFTOwners(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getNFTOwners'));
    }
});
const getNFTMetadataOperation = getOperation('getNFTContractMetadata');
Parse.Cloud.define("getNFTMetadata", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getNFTMetadata');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getNFTMetadataOperation);
        const result = await moralis_1.default.EvmApi.nft.getNFTContractMetadata(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getNFTMetadata'));
    }
});
const reSyncMetadataOperation = getOperation('reSyncMetadata');
Parse.Cloud.define("reSyncMetadata", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'reSyncMetadata');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, reSyncMetadataOperation);
        const result = await moralis_1.default.EvmApi.nft.reSyncMetadata(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'reSyncMetadata'));
    }
});
const syncNFTContractOperation = getOperation('syncNFTContract');
Parse.Cloud.define("syncNFTContract", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'syncNFTContract');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, syncNFTContractOperation);
        const result = await moralis_1.default.EvmApi.nft.syncNFTContract(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'syncNFTContract'));
    }
});
const getTokenIdMetadataOperation = getOperation('getNFTMetadata');
Parse.Cloud.define("getTokenIdMetadata", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getTokenIdMetadata');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getTokenIdMetadataOperation);
        const result = await moralis_1.default.EvmApi.nft.getNFTMetadata(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getTokenIdMetadata'));
    }
});
const getTokenIdOwnersOperation = getOperation('getNFTTokenIdOwners');
Parse.Cloud.define("getTokenIdOwners", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getTokenIdOwners');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getTokenIdOwnersOperation);
        const result = await moralis_1.default.EvmApi.nft.getNFTTokenIdOwners(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getTokenIdOwners'));
    }
});
const getWalletTokenIdTransfersOperation = getOperation('getNFTTransfers');
Parse.Cloud.define("getWalletTokenIdTransfers", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getWalletTokenIdTransfers');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getWalletTokenIdTransfersOperation);
        const result = await moralis_1.default.EvmApi.nft.getNFTTransfers(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getWalletTokenIdTransfers'));
    }
});
const resolveDomainOperation = getOperation('resolveDomain');
Parse.Cloud.define("resolveDomain", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'resolveDomain');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, resolveDomainOperation);
        const result = await moralis_1.default.EvmApi.resolve.resolveDomain(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'resolveDomain'));
    }
});
const resolveAddressOperation = getOperation('resolveAddress');
Parse.Cloud.define("resolveAddress", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'resolveAddress');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, resolveAddressOperation);
        const result = await moralis_1.default.EvmApi.resolve.resolveAddress(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'resolveAddress'));
    }
});
const getPairReservesOperation = getOperation('getPairReserves');
Parse.Cloud.define("getPairReserves", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getPairReserves');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getPairReservesOperation);
        const result = await moralis_1.default.EvmApi.defi.getPairReserves(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getPairReserves'));
    }
});
const getPairAddressOperation = getOperation('getPairAddress');
Parse.Cloud.define("getPairAddress", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getPairAddress');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, getPairAddressOperation);
        const result = await moralis_1.default.EvmApi.defi.getPairAddress(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'getPairAddress'));
    }
});
const uploadFolderOperation = getOperation('uploadFolder');
Parse.Cloud.define("uploadFolder", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'uploadFolder');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, uploadFolderOperation);
        const result = await moralis_1.default.EvmApi.ipfs.uploadFolder(request);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'uploadFolder'));
    }
});
const web3ApiVersionOperation = getOperation('web3ApiVersion');
Parse.Cloud.define("web3ApiVersion", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'web3ApiVersion');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, web3ApiVersionOperation);
        const result = await moralis_1.default.EvmApi.utils.web3ApiVersion();
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'web3ApiVersion'));
    }
});
const endpointWeightsOperation = getOperation('endpointWeights');
Parse.Cloud.define("endpointWeights", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'endpointWeights');
        const request = (0, upgradeRequest_1.upgradeRequest)(params, endpointWeightsOperation);
        const result = await moralis_1.default.EvmApi.utils.endpointWeights();
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'endpointWeights'));
    }
});
//# sourceMappingURL=evmApi.js.map