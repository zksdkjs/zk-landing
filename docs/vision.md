---
sidebar_position: 1
---

# The Long-Term Vision

## Unifying Zero Knowledge Development

zkSDK is an open-source initiative that aims to revolutionize how developers interact with zero-knowledge technologies by providing a unified, intuitive SDK for all ZK-related development.

## Our Vision

We envision a future where developers can seamlessly work with any zero-knowledge or fully homomorphic encryption (FHE) technology through a single, unified JavaScript SDK. Imagine writing one piece of code that works across multiple ZK platforms with minimal modifications:

````javascript
// The same code pattern working across different platforms
const token = new ZkToken({
  platform: 'mina' | 'ethereum' | 'midnight' | 'fhe' |
  type: 'zkp' | 'fhe',
  // Platform-specific configs handled internally
});

// Deploy and interact using consistent patterns
await token.deploy();
await token.transfer(to, amount);
await token.generateProof();

// Deploy and interact with zkVMs the same way
const zkApp = new ZkVM({
  platform: 'SP1' | 'Valida' | 'RISCZero',
  // zkVM-specific configs handled internally
});

await zkApp.deploy(code);
await zkApp.execute(input);
await zkApp.verifyExecution();
````

Our goal is to abstract away the complexity of different ZK implementations, allowing developers to focus on building their applications rather than dealing with the intricacies of each platform.

## Core Components

### Unified ZK Development
- Write ZK applications using familiar patterns across all supported platforms
- Abstract away complex implementation details:
  - ZK Circuit development
  - Cryptographic primitives
  - Smart contract interactions
  - Proof generation and verification
- Develop once, deploy, and interact with all ZK platforms using the same scripts, ensuring a seamless and unified experience for every ZK application.

### Cross-Platform ZK Operations and Integration
- Generate and verify proofs using consistent patterns across all supported platforms
- Interact with various ZK virtual machines through a unified interface, abstracting away platform-specific complexities
- Support for custom ZK circuits with automated compilation and deployment
- Ensure consistent state management and proof verification across different environments

### Proof Aggregation and Trustless Verification
- Aggregate proofs from multiple sources to streamline verification processes
- Enable trustless verification across platforms, ensuring security and integrity
- Facilitate seamless connections between proofs and verifications, enhancing cross-platform operability

### Developer Tools
- Simple JavaScript interfaces that feel native to web developers
- Built-in testing and deployment tools that work across platforms
- Automated proof generation and verification

## Join the Journey

We're building the future of privacy-preserving computation. This is an open-source initiative focused on making zero-knowledge technology accessible to every developer, regardless of their preferred platform or token standard.

Want to contribute? Check out our [GitHub](https://github.com/zkthings/zksdk) or join the discussion on [Twitter](https://twitter.com/0xsayd).

<a href="/docs/sdk-guides/zkmerkle">
  📄️ ZkMerkle
</a>
