---
sidebar_position: 3
---

# Zk Merkle Tree for EVM

Zero-Knowledge Merkle Trees implementation using circom circuits and snarkjs, designed for EVM chains.

⚠️ **Early Stage Project**: This package is under active development. APIs may change as we improve the implementation.


## Features

- 🌳 ZK Merkle Tree with native EVM integration
- 🌲 Fast off-chain proof generation
- 🎋 On-chain verification
- 🌴 Custom trusted setup support
- 📦 Built on circom & snarkjs

## Installation

v0.1 version soon deprecated,

```bash
bun add zkmerkle
# or
npm install zkmerkle
```

Soon moving to @zkthings/merkle-evm instead

```bash
bun add @zkthings/merkle-evm
# or
npm install @zkthings/merkle-evm
```

## Quick Start

```typescript
import { ZkMerkleTree } from '@zkthings/merkle-evm';

// Create a new ZK Merkle Tree
const zkMerkle = new ZkMerkleTree();

// Add data and generate proof
const values = ['Dragon Tree', 'Olive' , 'Linden']

const { proof, publicSignals } = await zkMerkle.generateMerkleProof(
  values,
  'Dragon Tree'
);

// Verify off-chain (for testing)
const isValidOffChain = await zkMerkle.verifyProofOffChain(proof, publicSignals);

// Export and deploy verifier contract
const verifierContract = await zkMerkle.exportVerifierContract();
```

## Production Usage

### Trusted Setup

A trusted setup is a crucial security process that creates the cryptographic parameters needed for zero-knowledge proofs. It requires multiple participants to ensure no single party has access to the complete setup information.

The setup process happens in two phases:
1. Phase 1 (Powers of Tau): General setup that can be reused
2. Phase 2: Circuit-specific setup for Merkle Tree operations

#### Coordinator Setup
```typescript
import { PowerOfTau } from '@zkthings/merkle-evm';

// Initialize ceremony
const ceremony = new PowerOfTau(15);  // For trees up to depth 15

// 1. Initialize ceremony
const ptauFile = await ceremony.initCeremony();

// 2. Share ptauFile with participants
// Each participant must contribute sequentially

// 3. After receiving final contribution
await ceremony.finalizeCeremony();

// 4. Generate production parameters
await ceremony.initPhase2('MerkleTreeProof');
await ceremony.finalizeCircuit('MerkleTreeProof');
```

#### Participant Contribution
```typescript
import { PowerOfTau } from '@zkthings/merkle-evm';

// Each participant runs this
const ceremony = new PowerOfTau(15);

// Import previous contribution
await ceremony.importContribution(ptauFile);

// Add contribution
const newPtau = await ceremony.contributePhase1(`Participant ${id}`);

// Send newPtau to next participant or coordinator
```

#### Ceremony Flow
1. Coordinator initializes: `pot15_0000.ptau`
2. Participant 1 contributes: `pot15_0001.ptau`
3. Participant 2 contributes: `pot15_0002.ptau`
4. Final participant returns to coordinator
5. Coordinator finalizes ceremony

### Production Deployment
```typescript
// Use custom ceremony output
const zkMerkle = new ZkMerkleTree({
  baseDir: './production-zkconfig',
  maxDepth: 20
});

// Deploy verifier contract
const verifierContract = await zkMerkle.exportVerifierContract();
```

## Architecture

```
📦 @zkthings/merkle-evm
├── core/             # Core Merkle Tree implementation
├── circuits/         # Circom circuit definitions
├── contracts/        # Solidity verifier contracts
└── ceremony/         # Trusted setup utilities
```

## Best Practices

### Local Development
```typescript
// Fast local testing
const zkMerkle = new ZkMerkleTree();
const isValid = await zkMerkle.verifyProofOffChain(proof, publicSignals);
```

### Production Setup
```typescript
// Secure production configuration
const zkMerkle = new ZkMerkleTree({
  baseDir: './production-zkconfig',
});
```

## Security Considerations

1. **Trusted Setup**
   - Multiple participants required
   - Secure randomness for contributions
   - Verify ceremony completion

2. **Contract Deployment**
   - Audit generated verifier
   - Test thoroughly on testnet
   - Monitor gas costs

3. **Verification**
   - Always verify on-chain in production
   - Use off-chain for testing only
   - Validate all proof components


## Contributing

PRs welcome! Check our [Contributing Guide](https://github.com/zkthings/merkle-evm/blob/main/CONTRIBUTING.md).

## Support

- [Documentation](https://zksdk.io/docs/intro)
- [GitHub Issues](https://github.com/zkthings/merkle-evm/issues)

## License

MIT © [zkThings](https://github.com/zkthings)
