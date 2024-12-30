import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [platform, setPlatform] = useState('evm');

  const platformConfigs = {
    evm: {
      title: 'merkle.evm.ts',
      code: `import { ZkMerkle } from '@zkthings/merkle-evm'

// Initialize ZK Merkle Tree
const zkMerkle = new ZkMerkle()

// Add data and generate proof
const values = [🌳, 🌲, 🌴]

const { proof, publicSignals } = await zkMerkle.generateMerkleProof(
  values,
  'world'
)

// Verify off-chain (for testing)
const isValidOffChain = await zkMerkle.verifyProofOffChain(
  proof, 
  publicSignals
)

// Export and deploy verifier contract
const verifierContract = await zkMerkle.exportVerifierContract()`
    },
    mina: {
      title: 'merkle.mina.ts',
      code: `import { ZkMerkle } from '@zkthings/merkle-mina'

// Initialize ZK Merkle Tree
const zkMerkle = new ZkMerkle()

// Add data and generate proof
const values = [🎋, 🎄, 🌳]

const { proof, publicSignals } = await zkMerkle.generateMerkleProof(
  values,
  '🌳'
)

// Verify off-chain
const isValidOffChain = await zkMerkle.verifyProofOffChain(
  proof, 
  publicSignals
)

//Verify On-chain 
const isValidOnChain = await zkMerkle.verifyProofOnChain(
  deployment.contract,
  proof,
  publicSignals
);`
    },
    starknet: {
      title: 'merkle.starknet.ts',
      code: `// Coming soon...

// StarkNet implementation will be available in the next release
// Join our Discord to stay updated!`
    }
  };

  return (
    <div style={{
      backgroundColor: "#000000",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
      padding: "120px 20px 40px"
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: "20px"
      }}>
        <h1 style={{
          fontSize: "4.5rem",
          fontWeight: "200",
          color: "#ffffff",
          margin: "0 0 10px 0",
          letterSpacing: "0.05em"
        }}>
          {siteConfig.title}
        </h1>
        <p style={{
          color: "#999",
          margin: "0 0 40px 0",
          fontSize: "1rem"
        }}>by zkThings Labs</p>
        
        <h2 style={{
          fontSize: "2rem",
          fontWeight: "300",
          color: "#f2f2f2",
          margin: "0 0 15px 0",
          lineHeight: "1.4"
        }}>
          Build ZK apps with ease and efficiency
        </h2>
        
        <div style={{
          fontSize: "1rem",
          color: "#999",
          marginBottom: "40px",
          lineHeight: "1.6"
        }}>
          An open-source SDK for zero-knowledge development
        </div>

        <div style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "40px"
        }}>
          {Object.keys(platformConfigs).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              style={{
                padding: "8px 16px",
                background: platform === p ? "rgba(255,255,255,0.1)" : "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                color: platform === p ? "#fff" : "#999",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: "0.9rem",
                letterSpacing: "0.05em"
              }}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        maxWidth: "850px",
        width: "100%",
        background: "#1c1c1c",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8)",
        border: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{
          background: "#2a2a2a",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.05)"
        }}>
          <div style={{ display: "flex", gap: "8px", flex: 1 }}>
            <div style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#ff5f57"
            }}></div>
            <div style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#febc2e"
            }}></div>
            <div style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#28c840"
            }}></div>
          </div>
          <div style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "13px",
            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
          }}>
            {platformConfigs[platform].title}
          </div>
        </div>

        <div style={{
          padding: "30px 35px",
          fontSize: "14px",
          lineHeight: "1.6",
          fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
          color: "#e4e4e4"
        }}>
          <pre style={{
            margin: 0,
            background: "transparent",
            overflow: "auto",
            maxHeight: "400px"
          }}>
            <code>
              {platformConfigs[platform].code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="zkSDK - The easiest way to build Zero Knowledge apps">
      <HomepageHeader />
    </Layout>
  );
}