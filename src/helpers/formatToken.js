module.exports = function formatToken(token) {
  const nToken = { ...token };
  nToken.name = token.name.normalize("NFKC").trim().substring(0, 64);
  nToken.symbol = token.symbol.trim().replaceAll(" ", "").substring(0, 24);
  return nToken;
};
