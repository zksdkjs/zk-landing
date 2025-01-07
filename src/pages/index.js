import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  
  const operationConfigs = {
    membership: {
      title: 'Membership Proofs',
      implementations: {
        evm: {
          title: 'EVM',
          code: `import { ZkMerkle } from '@zkthings/proof-membership-evm'

// Initialize ZK Merkle Tree
const zkMerkle = new ZkMerkle()

// Add data and generate proof
const values = [🌳, 🌲, 🌴]

const { proof, publicSignals } = await zkMerkle.generateMerkleProof(
  values,
  '🌳'
)

// Verify off-chain 
const isValidOffChain = await zkMerkle.verifyProofOffChain(
  proof, 
  publicSignals
)

// Export and deploy verifier contract
const verifierContract = await zkMerkle.exportVerifierContract()`
        },
        mina: {
          title: 'Mina',
          code: `import { ZkMerkle } from '@zkthings/proof-membership-mina'

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

// Verify On-chain 
const isValidOnChain = await zkMerkle.verifyProofOnChain(
  deployment.contract,
  proof,
  publicSignals
)`
        },
        starknet: {
          title: 'StarkNet',
          code: `// Coming Soon! 🚀

// StarkNet implementation will support:
// - Native Cairo compatibility
// - Optimized for STARK proofs
// - Efficient state management
// 
// Join our GitHub to stay updated!`
        }
      }
    },
    comparison: {
      title: 'Comparison Operators',
      implementations: {
        evm: {
          title: 'EVM',
          code: `// Coming Soon! 🚀

// Comparison operators will support:
// - Greater than/less than
// - Range proofs
// - Equality checks
// 
// Join our GitHub to stay updated!`
        },
        mina: {
          title: 'Mina',
          code: `// Coming Soon! 🚀

// Mina comparison circuits coming soon...`
        },
        starknet: {
          title: 'StarkNet',
          code: `// Coming Soon! 🚀

// StarkNet comparison circuits coming soon...`
        }
      }
    },
    privateData: {
      title: 'Private Data Framework',
      implementations: {
        general: {
          title: 'General',
          code: `// Coming Soon! 🚀

// Private Data Framework will support:
// - Encrypted data storage
// - Selective disclosure
// - Zero-knowledge proofs
// 
// Join our GitHub to stay updated!`
        },
        EVM: {
          title: 'EVM',
          code: `// Coming Soon with EVM support! 🚀`
        },
        IPFS: {
          title: 'IPFS',
          code: `// Coming Soon with IPFS support! 🚀`
        },
        'MongoDB/SQL': {
          title: 'MongoDB/SQL',
          code: `// Coming Soon! 🚀`
        }
      }
    }
  };

  const [selectedOperation, setSelectedOperation] = useState('membership');
  const [selectedImplementation, setSelectedImplementation] = useState('evm');

  // Handle operation change
  const handleOperationChange = (op) => {
    setSelectedOperation(op);
    // Get first available implementation for new operation
    const firstImpl = Object.keys(operationConfigs[op].implementations)[0];
    setSelectedImplementation(firstImpl);
  };

  return (
    <div style={{
      backgroundColor: "#000",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "800px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "60px",
        alignItems: "center"
      }}>
        {/* Minimal Header */}
        <div style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}>
          <h1 style={{
            fontSize: "3.5rem",
            fontWeight: "300",
            color: "#fff",
            margin: 0,
            letterSpacing: "0.02em",
            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
          }}>
            {siteConfig.title}
          </h1>
          <div style={{
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "SF Mono, monospace",
            letterSpacing: "0.02em"
          }}>
   npm i @zkthings/build-privacy
          </div>
        </div>

        {/* Terminal Window with fixed height */}
        <div style={{
          width: "100%",
          height: "500px", // Fixed height
          background: "rgba(32, 32, 32, 0.95)",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column" // Enable flex layout
        }}>
          {/* Window Controls */}
          <div style={{
            padding: "12px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            gap: "6px",
            alignItems: "center",
            flexShrink: 0 // Prevent shrinking
          }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }}/>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#febc2e" }}/>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }}/>
          </div>

          {/* Content Area with flex layout */}
          <div style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            height: "100%", // Take remaining height
            overflow: "hidden" // Hide overflow
          }}>
            {/* Operation Tabs */}
            <div style={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              flexShrink: 0 // Prevent shrinking
            }}>
              {Object.keys(operationConfigs).map((op) => (
                <button
                  key={op}
                  onClick={() => handleOperationChange(op)}
                  style={{
                    padding: "6px 12px",
                    background: "transparent",
                    border: "none",
                    borderRadius: "6px",
                    color: selectedOperation === op ? "#fff" : "rgba(255,255,255,0.4)",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                    transition: "color 0.2s ease"
                  }}
                >
                  {operationConfigs[op].title}
                </button>
              ))}
            </div>

            {/* Implementation Pills */}
            <div style={{
              display: "flex",
              gap: "6px",
              justifyContent: "center",
              flexShrink: 0 // Prevent shrinking
            }}>
              {Object.keys(operationConfigs[selectedOperation].implementations).map((impl) => (
                <button
                  key={impl}
                  onClick={() => setSelectedImplementation(impl)}
                  style={{
                    padding: "4px 10px",
                    background: selectedImplementation === impl ? "rgba(255,255,255,0.1)" : "transparent",
                    border: "none",
                    borderRadius: "4px",
                    color: selectedImplementation === impl ? "#fff" : "rgba(255,255,255,0.4)",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontFamily: "SF Mono, monospace",
                    letterSpacing: "0.02em",
                    transition: "all 0.2s ease"
                  }}
                >
                  {impl.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Code Display with scrolling */}
            <pre style={{
              margin: 0,
              padding: "20px",
              background: "rgba(0,0,0,0.2)",
              borderRadius: "8px",
              overflow: "auto",
              fontSize: "13px",
              lineHeight: "1.5",
              fontFamily: "'SF Mono', Menlo, 'Fira Code', 'JetBrains Mono', monospace",
              color: "rgba(255,255,255,0.85)",
              flex: 1,
              minHeight: 0,
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale"
            }}>
              <code style={{
                fontSize: "0.9rem",
                fontFamily: "inherit",
                whiteSpace: "pre",
                wordSpacing: "normal",
                wordBreak: "normal",
                overflowWrap: "normal",
                tabSize: 2,
                hyphens: "none"
              }}>
                {operationConfigs[selectedOperation].implementations[selectedImplementation].code}
              </code>
            </pre>

          </div>
        </div>

        <div style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px"
            }}>
              <Link
                to="/docs/intro"
                style={{
                  padding: "12px 24px",
                  // background: "rgba(255,255,255,0.9)",
                  color: "white",
                  borderRadius: "8px",
                  fontSize: "0.95rem",
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  textDecoration: "none",
                  fontWeight: "500",
                  letterSpacing: "0.02em",
                  transition: "all 0.2s ease",
                  border: "none",
                  cursor: "pointer",
                  border: "1px solid white",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#fff";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255,255,255,0.9)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Get Started →
              </Link>
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
      description="Private Data Framework">
      <HomepageHeader />
    </Layout>
  );
}