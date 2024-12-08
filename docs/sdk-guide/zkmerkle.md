---
sidebar_position: 2
---

# ZkMerkle Program

Zero-Knowledge Merkle Trees with support for custom trusted setups.

> ⚠️ **Note**: This is an early stage project. API may change as we improve it.

## What is this?

This package helps you work with Merkle Trees that have zero-knowledge capabilities:
- Prove membership without revealing the path or location
- Generate and verify zero-knowledge proofs
- Create and manage your own trusted setup
- Export Solidity verifier contracts

## Installation

```bash
# Using bun (recommended)
bun add zkmerkle

# Using npm
npm i zkmerkle
```

## Basic Usage

```typescript
import { ZkMerkle } from 'zkmerkle';

// Create a new ZK Merkle Tree
const zkMerkle = new ZkMerkle();

// Add some data to your tree
const myData = ['apple', 'banana', 'orange', 'grape', 'mango'];

// Calculate tree depth
const depth = Math.ceil(Math.log2(myData.length));

// Generate a proof
const { proof, publicSignals, root } = 
  await zkMerkle.generateMerkleProof('apple', myData);

console.log('Merkle Root:', root);
console.log('Proof:', JSON.stringify(proof, null, 2));
console.log('Public Signals:', publicSignals);

// Verify the proof
const isValid = await zkMerkle.verifyProof(
  proof, 
  publicSignals, 
  depth
);

console.log(`Proof verification: ${isValid ? 'SUCCESS' : 'FAILED'}`);
```

## Advanced Usage

### Production Setup

For production environments, use a custom trusted setup:

```typescript
// Use your ceremony output
const zkMerkle = new ZkMerkle('./production-zkconfig');
```

### Custom Configuration

Configure the ZkMerkle instance with specific settings:

```typescript
const zkMerkle = new ZkMerkle({
  baseDir: './my-setup',
  maxDepth: 20,
  circuits: {
    wasmDir: './my-circuits',
    zkeyDir: './my-keys',
    verificationDir: './my-verifiers'
  }
});
```

## Understanding Trusted Setup

### What is a Trusted Setup?

A trusted setup is a crucial security process that creates the cryptographic parameters needed for zero-knowledge proofs. It requires multiple participants to ensure no single party has access to the complete setup information.

### The Setup Process

The setup happens in two phases:
1. Phase 1 (Powers of Tau): General setup that can be reused
2. Phase 2: Circuit-specific setup for Merkle Tree operations

### Running a Setup Ceremony

#### Coordinator Role
```typescript
import { PowerOfTau } from '@zksdk/zk-merkle';

async function coordinatorSetup() {
  const ceremony = new PowerOfTau(15);  // For trees up to depth 15
  
  // 1. Initialize ceremony
  const ptauFile = await ceremony.initCeremony();
  
  // 2. Share ptauFile with first participant
  
  // 3. After receiving final contribution
  await ceremony.finalizeCeremony();
  
  // 4. Set up Merkle Tree circuit
  await ceremony.initPhase2('MerkleTreeProof');
  await ceremony.finalizeCircuit('MerkleTreeProof');
}
```

#### Participant Role
```typescript
async function participantContribution(ptauFile: string, participantNumber: number) {
  const ceremony = new PowerOfTau(15);
  
  // 1. Import the previous contribution
  await ceremony.importContribution(ptauFile);
  
  // 2. Add contribution
  const newPtau = await ceremony.contributePhase1(`Participant ${participantNumber}`);
  
  // 3. Send newPtau to next participant or back to coordinator
}
```

## Important Notes

1. **Testing vs Production**
   - Testing: Use built-in setup
   - Production: Create custom setup with multiple participants

2. **Tree Depth**
   - Default maximum: 15 (32,768 items)
   - Configurable through custom setup

3. **Security Considerations**
   - Multiple participants improve security
   - Each participant must keep their randomness secret
   - Coordinator should verify contributions

## Directory Structure

```
📁 zkConfig/                # Configuration directory
├── 📁 ceremony/           
│   └── 📁 pot/           # Trusted setup files
├── 📁 circuits/          
│   ├── 📁 wasm/          # Circuit files
│   ├── 📁 zkey/          # Proving keys
│   └── 📁 verification/  # Verification keys
└── 📁 templates/         # Smart contract templates
```

## Support

- [GitHub Issues](https://github.com/zkthings/zksdk/issues)
- [Main Website](https://zksdk.io)