# @sonarwatch/token-list

[![npm](https://img.shields.io/npm/v/@sonarwatch/token-lists)](https://unpkg.com/@sonarwatch/token-lists@latest/)

_Based on [Uniswap default token list](https://github.com/Uniswap/default-token-list)._

This NPM module and GitHub repo contains SonarWatch's token lists.

## Lists

- [Aptos](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.aptos.tokenlist.json)
- [Arbitrum](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.arbitrum.tokenlist.json)
- [Avalanche](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.avalanche.tokenlist.json)
- [Base](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.base.tokenlist.json)
- [Bitcoin](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.bitcoin.tokenlist.json)
- [BNB](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.bnb.tokenlist.json)
- [Cronos](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.cronos.tokenlist.json)
- [Ethereum](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.ethereum.tokenlist.json)
- [Gnosis](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.gnosis.tokenlist.json)
- [Linea](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.linea.tokenlist.json)
- [Optimism](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.optimism.tokenlist.json)
- [Polygon ZkEvm](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.polygon-zkevm.tokenlist.json)
- [Polygon](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.polygon.tokenlist.json)
- [Scroll](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.scroll.tokenlist.json)
- [Sei](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.sei.tokenlist.json)
- [Solana](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.solana.tokenlist.json)
- [Sui](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.sui.tokenlist.json)
- [zkSync](https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.zksync.tokenlist.json)

## Adding a token

To request that we add a token to the list,
[file an issue](https://github.com/sonarwatch/token-lists/issues/new?assignees=&labels=token+request&template=token-request.md&title=Add+%7BTOKEN_SYMBOL%7D%3A+%7BTOKEN_NAME%7D).

## Release version

```bash
npm run build:list:aptos
npm run build

npm test ./test/tokenIndexes.test.js
npm test ./test/lists.test.js
npm test

npm run release -- --ci -i patch
npm run release -- --ci -i minor
npm run release -- --ci -i major

npm publish
```

### Disclaimer

Note filing an issue does not guarantee addition to this default token list.
We do not review token addition requests in any particular order, and we do not
guarantee that we will review your request to add the token to the default list.
