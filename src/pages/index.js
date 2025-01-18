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
          code: `Community Call for Implementation! 

 We're looking for contributors to help integrate 
 ProofOfMembership SDK with StarkNet, enabling 
 zero-knowledge Merkle tree operations while maintaining 
 our developer-friendly API design.

 The implementation should mirror our current zkSDK:
 - Simple API for Merkle tree operations
 - Native Cairo compatibility
 - Optimized for STARK proofs
 - Efficient state management

 Want to contribute? Join us at:
 github.com/zkThings/ProofofMembership-starknet/issues
or DM x.com/zkthings_dev

 Help us bring ZK Merkle proofs to StarkNet! 🚀`
        },
        solana: {
          title: 'Solana',
          code: `Community Call for Implementation! 

We're looking for contributors to help integrate 
ProofOfMembership SDK with Solana, enabling 
zero-knowledge Merkle tree operations while maintaining 
our developer-friendly API design.

The implementation should mirror our current zkSDK:
- Simple API for Merkle tree operations
- Native Solana program compatibility
- Optimized proof generation
- Efficient state management

Want to contribute? Join us at:
github.com/zkThings/ProofofMembership-solana/issues

Help us bring ZK Merkle proofs to Solana! 🚀`
        }
      }
    },
    comparison: {
      title: 'Comparison Operators',
      implementations: {
        evm: {
          title: 'EVM',
          code: `Community Call for Implementation! 

We're building a Zero-Knowledge Comparison Operators SDK
that enables private numerical comparisons:

Features planned:
- Compare numbers privately (>, <, =)
- Prove ranges without revealing values
- Efficient circuit generation
- Simple developer experience

Want to contribute? Join us at:
https://github.com/zkThings/comparison-operators-evm/issues/1
or DM x.com/zkthings_dev

Help us build the future of private computations! 🚀`
        },
        mina: {
          title: 'Mina',
          code: `Community Call for Implementation! 

 We're building a Zero-Knowledge Comparison Operators SDK
 for Mina Protocol using o1js:

 Features planned:
 - Compare numbers privately (>, <, =)
 - Prove ranges without revealing values
 - Native o1js integration
 - Simple developer experience

 Want to contribute? Join us at:
 https://github.com/zkThings/comparison-operators-mina/issues/1

Help us build the future of private computations! 🚀`
        },
        starknet: {
          title: 'StarkNet',
          code: `Community Call for Implementation! 

We're building a Zero-Knowledge Comparison Operators SDK
for StarkNet using Cairo:

Features planned:
- Compare numbers privately (>, <, =)
- Prove ranges without revealing values
- Native Cairo integration
- Simple developer experience

Want to contribute? Join us at:
https://github.com/zkThings/comparison-operators-starknet/issues/1
or DM x.com/zkthings_dev

Help us build the future of private computations! 🚀`
        },
        solana: {
          title: 'Solana',
          code: `Community Call for Implementation! 

We're building a Zero-Knowledge Comparison Operators SDK
for Solana:

Features planned:
- Compare numbers privately (>, <, =)
- Prove ranges without revealing values
- Native Solana program integration
- Simple developer experience

Want to contribute? Join us at:
github.com/zkThings/comparison-operators-solana/issues/1

Help us build the future of private computations! 🚀`
        }
      }
    },
    privateData: {
      title: 'E2E Encryption',
      implementations: {
        general: {
          title: 'General',
          code: `Coming Soon! 🚀

 Private Data Framework will support:
 - Encrypted data storage
 - Selective disclosure
 - Zero-knowledge proofs
 
 Join our GitHub to stay updated!`
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
   build privacy
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
              flexDirection: "column",
              alignItems: "center",
              gap: "40px"
            }}>
              <Link
                to="/docs/intro"
                style={{
                  padding: "12px 24px",
                  color: "white",
                  borderRadius: "8px",
                  fontSize: "0.95rem",
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  textDecoration: "none",
                  fontWeight: "500",
                  letterSpacing: "0.02em",
                  transition: "all 0.2s ease",
                  border: "1px solid white",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#fff";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Get Started →
              </Link>

              {/* New Contribution Section */}
              <div style={{
                width: "100%",
                maxWidth: "600px",
                background: "rgba(32, 32, 32, 0.95)",
                borderRadius: "12px",
                padding: "40px",
                border: "1px solid rgba(255,255,255,0.1)"
              }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "32px",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "0.9rem",
                  fontFamily: "SF Mono, monospace"
                }}>
                  <div style={{ fontSize: "1.1rem", color: "white" }}> Contribute Now</div>
                  
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "60px",
                    width: "100%",
                    maxWidth: "500px"
                  }}>
                    <div>
                      <div style={{ color: "white", marginBottom: "16px" }}>Open Issues</div>
                      <div style={{ 
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        fontSize: "0.85rem"
                      }}>
                        <a href="https://github.com/zkThings/proof-membership-starknet/issues/1" style={{ color: "inherit", textDecoration: "none" }}>• StarkNet Membership</a>
                        <a href="https://github.com/zkThings/proof-membership-solana/issues/1" style={{ color: "inherit", textDecoration: "none" }}>• Solana Membership</a>
                        <a href="https://github.com/zkThings/comparison-operators-evm/issues/1" style={{ color: "inherit", textDecoration: "none" }}>• EVM Comparison</a>
                        <a href="https://github.com/zkThings/comparison-operators-mina/issues/1" style={{ color: "inherit", textDecoration: "none" }}>• Mina Comparison</a>
                        <a href="https://github.com/zkThings/comparison-operators-starknet/issues/1" style={{ color: "inherit", textDecoration: "none" }}>• StarkNet Comparison</a>
                        <a href="https://github.com/zkThings/comparison-operators-solana/issues/1" style={{ color: "inherit", textDecoration: "none" }}>• Solana Comparison</a>
                      </div>
                    </div>

                    <div>
                      <div style={{ color: "white", marginBottom: "16px" }}>Have Ideas?</div>
                      <div style={{ 
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        fontSize: "0.85rem"
                      }}>
                        <div>Want to contribute</div>
                        <div>something new?</div>
                        <div style={{ marginTop: "8px" }}>Contact us:</div>
                        <a href="https://x.com/zkthings_dev" style={{ color: "inherit", textDecoration: "none" }}>• Twitter →</a>
                        <a href="mailto:hello@zkthings.com" style={{ color: "inherit", textDecoration: "none" }}>• hello@zkthings.com</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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