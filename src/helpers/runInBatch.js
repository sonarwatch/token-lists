module.exports = async function runInBatch(functionsToRun, batchSize = 100) {
  const results = [];
  while (functionsToRun.length !== 0) {
    const currFunctionsToRun = functionsToRun.splice(0, batchSize);
    const promises = currFunctionsToRun.map((fToRun) => fToRun());
    const currResults = await Promise.allSettled(promises);
    results.push(...currResults);
  }
  return results;
};
