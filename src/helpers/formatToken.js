module.exports = function formatToken(token) {
  const nToken = { ...token };
  nToken.name = token.name
    .normalize("NFKC")
    .replaceAll("\\", "")
    .replaceAll("\t", "")
    .replaceAll("\n", "")
    .trim()
    .substring(0, 64);
  nToken.symbol = token.symbol
    .replace(/[^\x20-\x7F]/g, "")
    .trim()
    .replaceAll(" ", "")
    .substring(0, 24);

  // Verify indexedTo
  if (nToken.extensions && nToken.extensions.indexedTo) {
    nToken.extensions.indexedTo = [...new Set(nToken.extensions.indexedTo)];
  }

  return nToken;
};
