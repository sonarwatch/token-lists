# @sonarwatch/token-list

[![Tests](https://github.com/sonarwatch/token-lists/workflows/Tests/badge.svg)](https://github.com/sonarwatch/token-list/actions?query=workflow%3ATests)
[![npm](https://img.shields.io/npm/v/@sonarwatch/token-lists)](https://unpkg.com/@sonarwatch/token-lists@latest/)

_Based on [Uniswap default token list](https://github.com/Uniswap/default-token-list)._

This NPM module and GitHub repo contains SonarWatch's token lists.

## Lists

- [Aptos](https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.aptos.tokenlist.json)
- [Avalanche](https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.avalanche.tokenlist.json)
- [Bitcoin](https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.bitcoin.tokenlist.json)
- [Ethereum](https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.ethereum.tokenlist.json)
- [Optimism](https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.optimism.tokenlist.json)
- [Polygon](https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.polygon.tokenlist.json)
- [Solana](https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.solana.tokenlist.json)

## Adding a token

To request that we add a token to the list,
[file an issue](https://github.com/sonarwatch/token-lists/issues/new?assignees=&labels=token+request&template=token-request.md&title=Add+%7BTOKEN_SYMBOL%7D%3A+%7BTOKEN_NAME%7D).

## Release version

```bash
npm run build
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
