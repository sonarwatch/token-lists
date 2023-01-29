const MAX_ACCOUNT = 100;
module.exports = async function getMultipleAccountsInfoSafe(
  connection,
  publicKeys
) {
  if (publicKeys.length <= MAX_ACCOUNT) {
    return connection.getMultipleAccountsInfo(publicKeys);
  }
  const accountsInfo = [];
  const publicKeysToFetch = [...publicKeys];
  while (publicKeysToFetch.length !== 0) {
    const currPublicKeysToFetch = publicKeysToFetch.splice(0, MAX_ACCOUNT);
    const accountsInfoRes = await connection.getMultipleAccountsInfo(
      currPublicKeysToFetch
    );
    accountsInfo.push(...accountsInfoRes);
  }
  return accountsInfo;
};
