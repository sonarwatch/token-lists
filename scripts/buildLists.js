const aptosList = require("../build/sonarwatch.aptos.tokenlist.json");
const avalancheList = require("../build/sonarwatch.avalanche.tokenlist.json");
const bitcoinList = require("../build/sonarwatch.bitcoin.tokenlist.json");
const bnbList = require("../build/sonarwatch.bnb.tokenlist.json");
const arbitrumList = require("../build/sonarwatch.arbitrum.tokenlist.json");
const baseList = require("../build/sonarwatch.base.tokenlist.json");
const cronosList = require("../build/sonarwatch.cronos.tokenlist.json");
const gnosisList = require("../build/sonarwatch.gnosis.tokenlist.json");
const lineaList = require("../build/sonarwatch.linea.tokenlist.json");
const scrollList = require("../build/sonarwatch.scroll.tokenlist.json");
const zksyncList = require("../build/sonarwatch.zksync.tokenlist.json");
const polygonZkEvmList = require("../build/sonarwatch.polygon-zkevm.tokenlist.json");
const ethereumList = require("../build/sonarwatch.ethereum.tokenlist.json");
const optimismList = require("../build/sonarwatch.optimism.tokenlist.json");
const polygonList = require("../build/sonarwatch.polygon.tokenlist.json");
const solanaList = require("../build/sonarwatch.solana.tokenlist.json");
const suiList = require("../build/sonarwatch.sui.tokenlist.json");
const seiList = require("../build/sonarwatch.sei.tokenlist.json");

const lists = {
  aptos: aptosList,
  avalanche: avalancheList,
  bitcoin: bitcoinList,
  bnb: bnbList,
  arbitrum: arbitrumList,
  base: baseList,
  cronos: cronosList,
  gnosis: gnosisList,
  linea: lineaList,
  scroll: scrollList,
  zksync: zksyncList,
  "polygon-zkevm": polygonZkEvmList,
  ethereum: ethereumList,
  optimism: optimismList,
  polygon: polygonList,
  solana: solanaList,
  sui: suiList,
  sei: seiList,
};
console.log(JSON.stringify(lists, null, 2));
