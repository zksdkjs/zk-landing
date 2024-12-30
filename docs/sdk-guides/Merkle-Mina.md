---
sidebar_position: 4
---
# Zk Merkle Tree for Mina


Zero-Knowledge Merkle Tree implementation for Mina Protocol, powered by o1js.

⚠️ **Early Stage Project**: This package is under active development. APIs may change as we improve the implementation.

## Features

- 🌳 ZK Merkle Tree with native Mina integration
- 🌲 Fast off-chain proof generation
- 🎋 On-chain verification
- 🌴 Local & Berkeley testnet ready
- 📦 Built on o1js

## Installation

```bash
bun add @zkthings/merkle-mina
# or
npm install @zkthings/merkle-mina
```

## Quick Start

```typescript
import { ZkMerkleTree, MerkleProver, deployZkApp } from '@zkthings/merkle-mina';
import { Mina, PrivateKey } from 'o1js';

// 1. Deploy Merkle Prover Contract
const deployment = await deployZkApp(MerkleProver, {
  network: 'local',
  proofsEnabled: true
});

// 2. Create and populate Merkle Tree
const zkMerkle = new ZkMerkleTree();
const values = ['Banyan', 'Sakura', 'Tembusu'];

// 3. Generate Proof
const { proof, publicSignals } = await zkMerkle.generateMerkleProof(
  values,
  'world',
  deployment.deployerAccount
);

// 4. Verify (choose method)
// Off-chain (fast, for testing)

const isValidOffChain = await zkMerkle.verifyProofOffChain(proof, publicSignals);

// On-chain (blockchain verification)
const isValidOnChain = await zkMerkle.verifyProofOnChain(
  deployment.contract,
  proof,
  publicSignals
);
```

## Production Usage

```typescript
// Berkeley Testnet Setup
const Berkeley = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');
Mina.setActiveInstance(Berkeley);

// Deploy with your credentials
const deployment = await deployZkApp(MerkleProver, {
  network: 'berkeley',
  deployer: {
    key: PrivateKey.fromBase58('YOUR_PRIVATE_KEY'),
    account: deployerAccount
  }
});
```

## Architecture

```
📦 @zkthings/merkle-mina
├── 🌲 ZkMerkleTree     # Core Merkle Tree implementation
├── 📜 MerkleProver     # On-chain verification contract
└── 🛠️ Utils
    └── deployZkApp     # Deployment helper
```

## Best Practices

### Local Development
```typescript
// Fast local testing
const deployment = await deployZkApp(MerkleProver, {
  network: 'local',
  proofsEnabled: false  // Faster for development
});
```

### Production Deployment
```typescript
// Secure production setup
const deployment = await deployZkApp(MerkleProver, {
  network: 'berkeley',
  proofsEnabled: true,  // Always true in production
  deployer: {
    key: deployerKey,
    account: deployerAccount
  }
});
```

## Security Considerations

1. **Proof Generation**
   - Always validate inputs
   - Handle errors gracefully
   - Use try-catch for proof operations

2. **Contract Deployment**
   - Secure private keys
   - Test thoroughly on Berkeley
   - Monitor contract state

3. **Verification**
   - Always verify on-chain in production
   - Use off-chain for testing only
   - Validate all proof components

## Performance Tips

1. **Proof Generation**
   - Generate proofs off-chain
   - Cache proofs when possible
   - Use appropriate tree depth

2. **Contract Interaction**
   - Batch operations when possible
   - Monitor gas costs
   - Use local network for testing


## Contributing

PRs welcome! Check our [Contributing Guide](https://github.com/zkthings/merkle-mina/blob/main/CONTRIBUTING.md).

## Support

- [Documentation](https://zksdk.io/docs/intro)
- [GitHub Issues](https://github.com/zkthings/merkle-mina/issues)

## License

MIT © [zkThings](https://github.com/zkthings)