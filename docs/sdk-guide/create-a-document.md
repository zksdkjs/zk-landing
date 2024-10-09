---
sidebar_position: 2
---

# ZkMerkle Program

This guide provides a step-by-step walkthrough on how to use the `zksdk-zkmerkle` package to create and verify a Zero-Knowledge (ZK) Merkle tree for testing, verification, and more.

## Installation

To get started, install the `zksdk` package:

```bash
npm install zksdk@zkmerkle
```

## Creating a ZK Merkle Tree

To create a ZK Merkle tree from an array of data:

```javascript
import { ZkMerkle } from 'zksdk-zkmerkle';

// Initialize the ZkMerkle instance
const zksdk = new ZkMerkle();

const treeData = ['data A', 'data B', 'data C'];

// Create a Merkle tree
const tree = zksdk.createTree(treeData);

// The tree object contains:
// {
//   rootHash: '...',   // The root hash of the Merkle tree
//   leaves: [...]      // The hashed leaves of the tree
// }

console.log('Merkle Tree Root Hash:', tree.rootHash);
```

Alternatively, you can pass a structured object to the `createTree` method:

```javascript
const myTree = { a: 'data A', b: 'data B', c: 'data C' };
const tree = zksdk.createTree(Object.values(myTree));
```

## Verifying a Leaf

To verify that a specific leaf belongs to the Merkle tree:

```javascript
const root = tree.rootHash;
const leaf = 'data A';  // The leaf you want to verify
const proof = tree.proofForLeaf(leaf);  // Obtain proof for this leaf

// Verify the leaf against the Merkle tree's root hash
const isValid = zksdk.verifyLeaf(root, leaf, proof);

if (isValid) {
  console.log('Leaf is valid and part of the Merkle tree.');
} else {
  console.log('Leaf verification failed.');
}
```

The `verifyLeaf` method will return a boolean indicating whether the leaf is part of the tree.

---

This revised guide maintains professionalism while ensuring clarity. Let me know if you need additional details!