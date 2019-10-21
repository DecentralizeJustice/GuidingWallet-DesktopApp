
'use strict'

process.title = 'bcoin'
const nodeInfoLocation = process.argv[2]
console.log(nodeInfoLocation)
const SPVNode = require('bcoin/lib/node/spvnode')
const node = new SPVNode({
  network: 'testnet',
  file: true,
  argv: true,
  env: true,
  logFile: true,
  logConsole: false,
  logLevel: 'debug',
  db: 'leveldb',
  memory: false,
  persistent: true,
  workers: true,
  listen: true,
  loader: require,
  // 'wallet-watch-only': true,
  cors: true,
  'api-key': 'hunter2',
  prefix: nodeInfoLocation
})

// Temporary hack
if (!node.config.bool('no-wallet') && !node.has('walletdb')) {
  const plugin = require('bcoin/lib/wallet/plugin')
  node.use(plugin)
}

process.on('unhandledRejection', (err, promise) => {
  throw err
})

process.on('SIGINT', async () => {
  await node.close()
});

(async () => {
  await node.ensure()
  await node.open()
  await node.connect()

  node.startSync()
})().catch((err) => {
  console.error(err.stack)
  process.exit(1)
})