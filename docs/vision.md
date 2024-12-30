---
sidebar_position: 2
---

# The Long-Term Vision

zkSDK standardizes how developers work with zero-knowledge systems. Right now, every ZK platform has its own way of doing things - different APIs, different patterns, different tooling. We're fixing that.

## What We're Building

zkSDK provides a unified development experience for zero-knowledge applications:

- A cross-platform Merkle tree implementation that works seamlessly across Mina, StarkNet, EVM chains and zkVMs
- A standardized API for private tokens (ERC20/NFT) with consistent behavior across all platforms
- A unified interface for generating and verifying zero-knowledge proofs
- Platform-agnostic deployment tooling for zkVM applications
- Comprehensive proof verification infrastructure with cross-platform support


Here's what that looks like in practice:

## Our Vision

We're building the foundation for privacy-preserving applications. By providing robust building blocks and intuitive interfaces, we're enabling developers to harness the full power of zero-knowledge technology:

````javascript
// The same code pattern working across different platforms
const token = new ZkToken({
  platform: 'mina' | 'ethereum' | 'midnight' | 'fhe' |
  type: 'zkp' | 'fhe',
  // Platform-specific configs handled internally
});

// Deploy and interact using consistent patterns
await token.deploy();
await token.transfer(to, amount,salt);a
await token.generateProof({});

// Deploy and interact with zkVMs the same way
const zkApp = new ZkVM({
  platform: 'SP1' | 'Valida' | 'RISCZero',a
  // zkVM-specific configs handled internally
});

await zkApp.deploy(code);
await zkApp.execute(input);
await zkApp.verifyExecution();
````

Our goal is to abstract away the complexity of different ZK implementations, allowing developers to focus on building their applications rather than dealing with the intricacies of each platform.

## Core Components

### ZK Development
- Write once, run anywhere
- Built-in circuit development
- Cross-platform smart contracts
- Automated proof handling

### Cross-Platform Operations
- Consistent proof generation
- Unified VM interfaces
- Custom circuit support
- State management across chains

### Proof System
- Multi-source proof aggregation
- Cross-platform verification
- Proof registry and discovery

### Developer Tools
- JavaScript-first APIs
- Cross-platform testing
- Automated deployments

## Join Us

Building privacy tech should be easier. Help us make it happen.

[GitHub](https://github.com/zkthings/zksdk) | [Twitter](https://twitter.com/0xsayd)

<a href="/docs/sdk-guides/zkmerkle">
  📄️ ZkMerkle
</a>
````


