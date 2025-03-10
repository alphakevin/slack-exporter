const {getThreadListByType, getThreadsAndAllMessagesWithFiles} = require("../conversation");
const {getFilesInAllMessages} = require("../downloadfile");
const {CHANNEL_TYPE} = require("../constants");
const logger = require("../log");
const async = require("async");

function step1(callback) {
    logger.info("Step 1: Multi Direct Message 获取Thread List");
    setTimeout(async () => {
        await getThreadListByType(CHANNEL_TYPE.MULTI_DIRECT_MESSAGE);
        callback(null, "Step 1 Done");
    }, 1000);
}

function step2(callback) {
    logger.info("Step 2: Multi Direct Message Un-Archive 频道，获取每个Thread中的所有消息回复");
    setTimeout(async () => {
        await getThreadsAndAllMessagesWithFiles(CHANNEL_TYPE.MULTI_DIRECT_MESSAGE, false);
        callback(null, "Step 2 Done");
    }, 1000);
}

function step3(callback) {
    logger.info("Step 3: Multi Direct Message Archive 频道，获取每个Thread中的所有消息回复");
    setTimeout(async () => {
        await getThreadsAndAllMessagesWithFiles(CHANNEL_TYPE.MULTI_DIRECT_MESSAGE, true);
        callback(null, "Step 3 Done");
    }, 1000);
}

function step4(callback) {
    logger.info("Step 4: Multi Direct Message Un-Archive 频道，获取每个消息中需要下载的文件");
    setTimeout(async () => {
        await getFilesInAllMessages(CHANNEL_TYPE.MULTI_DIRECT_MESSAGE, false);
        callback(null, "Step 4 Done");
    }, 1000);
}

function step5(callback) {
    logger.info("Step 5: Multi Direct Message Archive 频道，获取每个消息中需要下载的文件");
    setTimeout(async () => {
        await getFilesInAllMessages(CHANNEL_TYPE.MULTI_DIRECT_MESSAGE, false);
        callback(null, "Step 5 Done");
    }, 1000);
}

// 分步骤执行
async function runSteps() {
    try {
        const results = await async.series([step1, step2,step3,step4,step5]);
        logger.info(`Multi Direct Message All steps completed! ${results}`);
    } catch (err) {
        logger.error("分步骤执行 Error:", err);
    }
}

runSteps();