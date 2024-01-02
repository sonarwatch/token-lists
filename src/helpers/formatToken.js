module.exports = function formatToken(token) {
  const nToken = { ...token };
  nToken.name = token.name.substring(0, 64).trim();
  nToken.symbol = token.symbol.trim().replaceAll(" ", "").substring(0, 24);
  return nToken;
};
