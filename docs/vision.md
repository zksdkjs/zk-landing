---
sidebar_position: 2
---

# The Long-Term Vision

zkSDK provides a unified development experience for zero-knowledge applications:

## Our Vision

By providing robust building blocks and intuitive interfaces, we're enabling developers to harness the full power of zero-knowledge technology:

````javascript
// The same code pattern working across different platforms
const token = new ZkToken({
  platform: 'mina' | 'ethereum' | 'midnight' | 'fhe' |
  type: 'zkp' | 'fhe',
  // Platform-specific configs handled internally
});

// Deploy and interact using consistent patterns
await token.deploy();
await token.transfer(to, amount,salt);
await token.generateProof({});

// Deploy and interact with zkVMs the same way
const zkApp = new ZkVM({
  platform: 'SP1' | 'Valida' | 'RISCZero',
  // zkVM-specific configs handled internally
});

await zkApp.deploy(code);
await zkApp.execute(input);
await zkApp.verifyExecution();
````

Our goal is to abstract away the complexity of different ZK implementations


## Join Us

[GitHub](https://github.com/zkthings/zksdk) | [Twitter](https://twitter.com/0xsayd)

<a href="/docs/sdk-guides/zkmerkle">
  📄️ ZkMerkle
</a>
````


