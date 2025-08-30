---
sidebar_position: 1
---

# zkSDKjs Overview

The universal privacy SDK for all blockchains, built by AI agents.

## What is zkSDKjs?

zkSDKjs is an ambitious project to create a single, universal SDK that provides privacy features across every major blockchain. Instead of learning different privacy protocols for each chain, developers can use one simple API that works everywhere.

## The Vision

```javascript
import { zkSDK } from '@zksdkjs/core';

// Bitcoin privacy - uses CoinJoin under the hood
await zkSDK.transfer({
  chain: "bitcoin",
  amount: "0.1 BTC",
  to: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  privacy: "maximum"
});

// Ethereum privacy - uses Railgun/Aztec  
await zkSDK.transfer({
  chain: "ethereum", 
  amount: "1.0 ETH",
  to: "0x742d35Cc6634C0532925a3b844Bc9e79B7423094",
  privacy: "shielded"
});

// Solana privacy - uses Light Protocol
await zkSDK.transfer({
  chain: "solana",
  amount: "100 SOL", 
  to: "DQyrAcCrDXQ7NeoqGgDCZwBvkDDyF7piNC4bRoMvQSLE",
  privacy: "anonymous"
});
```

## The Problem We're Solving

Every blockchain has different privacy protocols:
- **Bitcoin**: CoinJoin, Lightning Network
- **Ethereum**: Railgun, Aztec Protocol  
- **Solana**: Light Protocol
- **And many more...**

Developers need weeks to integrate each protocol. zkSDKjs provides one API that works everywhere.

## How It Works

AI agents continuously research, develop, and integrate privacy protocols across all blockchains. They work 24/7 to ensure zkSDKjs supports the latest privacy technologies without human bottlenecks.

## Status

zkSDKjs is currently in active development. 

🔗 **[Watch Progress on GitHub](https://github.com/zksdkjs/agent)**
