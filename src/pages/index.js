import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [activeProduct, setActiveProduct] = useState('zkthings');
  const [totalDownloads, setTotalDownloads] = useState('...');
  const [packageDownloads, setPackageDownloads] = useState({});
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [agentAnimation, setAgentAnimation] = useState(0);

  // Animate agent text
  useEffect(() => {
    if (activeProduct === 'zksdkjs') {
      const interval = setInterval(() => {
        setAgentAnimation(prev => (prev + 1) % 6);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeProduct]);

  // Fetch download stats from NPM
  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const packages = [
          '@zkthings/proof-membership-evm',
          '@zkthings/range-proof-evm',
          '@zkthings/e2e-encryption-secp256k1',
          '@zkthings/e2e-encryption-ed25519',
          'zkmerkle'
        ];
        
        const downloadPromises = packages.map(pkg => 
          fetch(`https://api.npmjs.org/downloads/range/2020-01-01:${new Date().toISOString().split('T')[0]}/${pkg}`)
            .then(res => res.json())
            .then(data => ({ 
              package: pkg, 
              downloads: data.downloads?.reduce((sum, day) => sum + day.downloads, 0) || 0 
            }))
            .catch(() => ({ package: pkg, downloads: 0 }))
        );
        
        const results = await Promise.all(downloadPromises);
        const total = results.reduce((sum, result) => sum + (result.downloads || 0), 0);
        
        const packageStats = {};
        results.forEach(result => {
          packageStats[result.package] = result.downloads;
        });
        setPackageDownloads(packageStats);
        
        if (total > 0) {
          setTotalDownloads(total.toLocaleString());
        } else {
          setTotalDownloads('1,276');
        }
      } catch (error) {
        setTotalDownloads('1,276');
      }
    };

    fetchDownloads();
    const interval = setInterval(fetchDownloads, 30000);
    return () => clearInterval(interval);
  }, []);

  // Force black footer and inject stats
  useEffect(() => {
    const forceBlackFooter = () => {
      const footers = document.querySelectorAll('footer, .footer, [class*="footer"]');
      footers.forEach(footer => {
        footer.style.backgroundColor = '#000000';
        footer.style.background = '#000000';
        footer.style.backgroundImage = 'none';
      });
    };
    
    forceBlackFooter();
    const interval = setInterval(forceBlackFooter, 100);
    
    if (totalDownloads !== '...') {
      const footerCopyright = document.querySelector('.footer__copyright');
      if (footerCopyright) {
        footerCopyright.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <div style="font-family: var(--ifm-font-family-monospace); color: rgba(255, 255, 255, 0.8); font-size: 0.9rem;">
              zkthings libraries: ${totalDownloads} downloads
            </div>
            <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">
              Copyright © ${new Date().getFullYear()} zkThings labs. • Powered by Goose
            </div>
          </div>
        `;
      }
    }
    
    return () => clearInterval(interval);
  }, [totalDownloads]);

  // All 5 libraries with full code examples
  const zkthingsLibraries = [
    {
      name: 'proof-membership-evm',
      description: 'Prove set membership without revealing identity',
      npm: '@zkthings/proof-membership-evm',
      installs: packageDownloads['@zkthings/proof-membership-evm'] || 336,
      code: `import { ZkMerkle, makeProof, verifyOffchain } from '@zkthings/proof-membership-evm';

// Initialize ZK Merkle Tree
const zkMerkle = new ZkMerkle()

// Add data and generate proof
const values = ['alice', 'bob', 'charlie']

const { proof, publicSignals } = await zkMerkle.generateMerkleProof(
  values,
  'alice'
)

// Verify off-chain 
const isValidOffChain = await zkMerkle.verifyProofOffChain(
  proof, 
  publicSignals
)

// Export and deploy verifier contract
const verifierContract = await zkMerkle.exportVerifierContract()`
    },
    {
      name: 'range-proof-evm',
      description: 'Prove values in ranges without exact amounts',
      npm: '@zkthings/range-proof-evm',
      installs: packageDownloads['@zkthings/range-proof-evm'] || 151,
      code: `import { RangeProof } from '@zkthings/range-proof-evm';

// Prove you're 18+ without revealing exact age
const rangeProof = new RangeProof();

const ageProof = await rangeProof.prove(
  25,   // Your actual age (SECRET!)
  18,   // Minimum age required (public)
  255   // Maximum possible age (public)
  // Auto-detects 8-bit circuit since max value is 255
);

// Verify the proof
const isValid = await rangeProof.verify(ageProof);
console.log('Valid adult:', isValid); // true

// Export Solidity Verifier
const verifierContract = await rangeProof.exportSolidityVerifier(ageProof);`
    },
    {
      name: 'e2e-encryption-secp256k1',
      description: 'End-to-end encryption for EVM wallets',
      npm: '@zkthings/e2e-encryption-secp256k1',
      installs: packageDownloads['@zkthings/e2e-encryption-secp256k1'] || 259,
      code: `const { Secp256k1E2E } = require('@zkthings/e2e-encryption-secp256k1');
const { Wallet } = require('ethers');

// Initialize E2E encryption
const e2e = new Secp256k1E2E();

// Create sample wallets
const alice = Wallet.createRandom();
const bob = Wallet.createRandom();

// Encrypt a message for Bob
const encrypted = await e2e.encryptFor(
  "Private message content",
  bob.address,
  Buffer.from(bob.publicKey.slice(2), 'hex')
);

// Bob decrypts the message
const decrypted = await e2e.decrypt({
  publicSignals: encrypted.publicSignals,
  privateKey: bob.privateKey
});

console.log(decrypted); // "Private message content"`
    },
    {
      name: 'e2e-encryption-ed25519',
      description: 'Private messaging for Solana & StarkNet wallets',
      npm: '@zkthings/e2e-encryption-ed25519',
      installs: packageDownloads['@zkthings/e2e-encryption-ed25519'] || 0,
      code: `import { Ed25519E2E } from '@zkthings/e2e-encryption-ed25519';

// Initialize E2E encryption for Ed25519 wallets
const e2e = new Ed25519E2E();

// Encrypt data for Solana wallet
const encrypted = await e2e.encryptFor(
  'Secret transaction details',
  'DQyrAcCrDXQ7NeoqGgDCZwBvkDDyF7piNC4bRoMvQSLE', // Solana address
  publicKey // Ed25519 public key
);

// Decrypt data with private key
const decrypted = await e2e.decrypt(encrypted, privateKey);
console.log(decrypted); // "Secret transaction details"

// Works with any Ed25519-compatible chain
// Solana, StarkNet, Cardano, etc.`
    },
    {
      name: 'zkmerkle',
      description: 'Simple zero-knowledge merkle tree proofs',
      npm: 'zkmerkle',
      installs: packageDownloads['zkmerkle'] || 530,
      code: `import { MerkleTree, generateProof, verifyProof } from 'zkmerkle';

// Create a merkle tree with private data
const privateData = [
  'user123',
  'user456', 
  'user789'
];

const tree = new MerkleTree(privateData);

// Generate proof for membership
const proof = generateProof(tree, 'user456');

// Verify without revealing the data
const isValid = verifyProof(
  proof,
  tree.getRoot(),
  'user456'
);

console.log('Membership verified:', isValid); // true

// Export for on-chain verification
const solidityProof = proof.toSolidity();`
    }
  ];

  const agentTasks = [
    "Integrating Bitcoin Lightning privacy layers",
    "Building Aztec Protocol for Ethereum",
    "Implementing Solana Light Protocol",
    "Testing privacy proofs on Polygon zkEVM",
    "Optimizing Bitcoin CoinJoin implementations",
    "Analyzing Railgun for cross-chain privacy"
  ];

  return (
    <div style={{
      background: '#000',
      minHeight: "100vh",
      color: "#fff",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif"
    }}>
      {/* Ultra Minimal Header */}
      <div style={{
        padding: "60px 20px 40px",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "48px",
          fontWeight: "300",
          margin: "0 0 8px 0",
          letterSpacing: "-1px"
        }}>
          {siteConfig.title}
        </h1>
        <p style={{
          fontSize: "16px",
          color: "rgba(255, 255, 255, 0.4)",
          margin: 0
        }}>
          Privacy dev tools
        </p>
      </div>

      {/* Product Toggle with Better UI */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "60px",
        gap: "20px"
      }}>
        <div style={{
          display: "inline-flex",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "8px",
          padding: "4px",
          position: "relative"
        }}>
          <button
            onClick={() => setActiveProduct('zkthings')}
            style={{
              padding: "10px 24px",
              background: activeProduct === 'zkthings' ? "#fff" : "transparent",
              color: activeProduct === 'zkthings' ? "#000" : "rgba(255, 255, 255, 0.6)",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
              outline: "none"
            }}
          >
            zkthings
          </button>
          <button
            onClick={() => setActiveProduct('zksdkjs')}
            style={{
              padding: "10px 24px",
              background: activeProduct === 'zksdkjs' ? "#fff" : "transparent",
              color: activeProduct === 'zksdkjs' ? "#000" : "rgba(255, 255, 255, 0.6)",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
              outline: "none",
              position: "relative"
            }}
          >
            zkSDKjs
            {activeProduct !== 'zksdkjs' && (
              <span style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                background: "#4ade80",
                color: "#000",
                fontSize: "10px",
                padding: "2px 6px",
                borderRadius: "10px",
                fontWeight: "600"
              }}>
                NEW
              </span>
            )}
          </button>
        </div>
        
        {/* Add description under toggle for zkSDKjs */}
        {activeProduct !== 'zksdkjs' && (
          <p style={{
            fontSize: "13px",
            color: "rgba(255, 255, 255, 0.4)",
            margin: 0,
            textAlign: "center"
          }}>
            zkSDKjs - AI agents building universal privacy SDK for all blockchains
          </p>
        )}
      </div>

      {/* Content Area */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 20px 80px"
      }}>
        {/* zkthings Content */}
        {activeProduct === 'zkthings' && (
          <div style={{
            animation: "fadeIn 0.3s ease"
          }}>
            <div style={{
              textAlign: "center",
              marginBottom: "60px"
            }}>
              <h2 style={{
                fontSize: "32px",
                fontWeight: "300",
                margin: "0 0 16px 0"
              }}>
                Zero-Knowledge Proof Libraries
              </h2>
              <p style={{
                fontSize: "16px",
                color: "rgba(255, 255, 255, 0.5)",
                margin: "0 0 8px 0"
              }}>
                Available now • {totalDownloads} downloads
              </p>
              <p style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.4)"
              }}>
                Privacy primitives for EVM, Solana, and StarkNet
              </p>
            </div>

            {/* Two Column Layout */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr",
              gap: "40px",
              alignItems: "start"
            }}>
              {/* Libraries List - Scrollable */}
              <div>
                <div style={{
                  fontSize: "12px",
                  color: "rgba(255, 255, 255, 0.4)",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}>
                  Libraries • Click to view example
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  maxHeight: "500px",
                  overflowY: "auto",
                  paddingRight: "8px"
                }}>
                  {zkthingsLibraries.map((lib, index) => (
                    <div
                      key={lib.name}
                      onClick={() => setSelectedPackage(index)}
                      style={{
                        padding: "16px",
                        background: selectedPackage === index 
                          ? "rgba(255, 255, 255, 0.08)" 
                          : "rgba(255, 255, 255, 0.03)",
                        border: "1px solid",
                        borderColor: selectedPackage === index 
                          ? "rgba(255, 255, 255, 0.3)" 
                          : "rgba(255, 255, 255, 0.1)",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                      }}
                      onMouseEnter={(e) => {
                        if (selectedPackage !== index) {
                          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedPackage !== index) {
                          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                        }
                      }}
                    >
                      <h3 style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        margin: "0 0 4px 0",
                        color: selectedPackage === index ? "#fff" : "rgba(255, 255, 255, 0.9)"
                      }}>
                        {lib.name}
                      </h3>
                      <p style={{
                        fontSize: "12px",
                        color: "rgba(255, 255, 255, 0.5)",
                        margin: "0 0 8px 0"
                      }}>
                        {lib.description}
                      </p>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}>
                        <code style={{
                          fontSize: "10px",
                          color: "rgba(255, 255, 255, 0.3)",
                          fontFamily: "SF Mono, monospace"
                        }}>
                          {lib.npm}
                        </code>
                        <span style={{
                          fontSize: "11px",
                          color: "rgba(255, 255, 255, 0.4)"
                        }}>
                          {lib.installs.toLocaleString()} installs
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Example - Shows selected library */}
              <div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px"
                }}>
                  <div style={{
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    {zkthingsLibraries[selectedPackage].name} Example
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(zkthingsLibraries[selectedPackage].code)}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "4px",
                      padding: "4px 12px",
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: "11px",
                      cursor: "pointer",
                      fontFamily: "SF Mono, monospace",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
                      e.target.style.color = "rgba(255, 255, 255, 0.8)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                      e.target.style.color = "rgba(255, 255, 255, 0.6)";
                    }}
                  >
                    Copy
                  </button>
                </div>
                <div style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  padding: "24px",
                  overflow: "auto",
                  maxHeight: "450px"
                }}>
                  <pre style={{ margin: 0 }}>
                    <code style={{
                      fontSize: "12px",
                      lineHeight: "1.6",
                      color: "rgba(255, 255, 255, 0.9)",
                      fontFamily: "SF Mono, monospace"
                    }}>
                      {zkthingsLibraries[selectedPackage].code}
                    </code>
                  </pre>
                </div>
                
                {/* Install command */}
                <div style={{
                  marginTop: "16px",
                  padding: "12px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "6px"
                }}>
                  <code style={{
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontFamily: "SF Mono, monospace"
                  }}>
                    npm install {zkthingsLibraries[selectedPackage].npm}
                  </code>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{
              textAlign: "center",
              marginTop: "60px"
            }}>
              <Link
                to="/docs/intro"
                style={{
                  display: "inline-block",
                  padding: "12px 32px",
                  background: "#fff",
                  color: "#000",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  textDecoration: "none",
                  transition: "transform 0.15s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Get Started →
              </Link>
            </div>
          </div>
        )}

        {/* zkSDKjs Content */}
        {activeProduct === 'zksdkjs' && (
          <div style={{
            animation: "fadeIn 0.3s ease"
          }}>
            <div style={{
              textAlign: "center",
              marginBottom: "60px"
            }}>
              <h2 style={{
                fontSize: "36px",
                fontWeight: "300",
                margin: "0 0 16px 0"
              }}>
                One SDK for Privacy Everywhere
              </h2>
              <p style={{
                fontSize: "18px",
                color: "rgba(255, 255, 255, 0.7)",
                margin: "0 0 12px 0",
                lineHeight: "1.5"
              }}>
                7 AI agents building the universal privacy SDK for Bitcoin, Ethereum, Solana, and every blockchain
              </p>
              <p style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.4)"
              }}>
                Coming Q2 2025 • Powered by Goose
              </p>
            </div>

            {/* Live Status */}
            <div style={{
              background: "rgba(74, 222, 128, 0.05)",
              border: "1px solid rgba(74, 222, 128, 0.2)",
              borderRadius: "8px",
              padding: "24px",
              marginBottom: "40px"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px"
              }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  animation: "pulse 2s infinite"
                }} />
                <span style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: "500"
                }}>
                  AI Agents Building Live 24/7
                </span>
              </div>
              <p style={{
                fontSize: "13px",
                color: "rgba(255, 255, 255, 0.6)",
                margin: 0,
                fontFamily: "SF Mono, monospace"
              }}>
                {agentTasks[agentAnimation]}
              </p>
            </div>

            {/* The Problem & Solution */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "32px",
              marginBottom: "40px"
            }}>
              <div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  margin: "0 0 12px 0",
                  color: "rgba(255, 100, 100, 0.9)"
                }}>
                  The Problem
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: "1.6"
                }}>
                  Every blockchain has different privacy protocols. Developers need to learn Railgun for Ethereum, 
                  CoinJoin for Bitcoin, Light Protocol for Solana. Weeks of integration for each chain.
                </p>
              </div>
              <div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  margin: "0 0 12px 0",
                  color: "rgba(100, 255, 100, 0.9)"
                }}>
                  The Solution
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: "1.6"
                }}>
                  One simple API that works everywhere. Our AI agents continuously integrate every privacy protocol
                  across every blockchain. You write once, deploy everywhere with privacy.
                </p>
              </div>
            </div>

            {/* Code Example */}
            <div style={{
              marginBottom: "40px"
            }}>
              <div style={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.4)",
                marginBottom: "16px",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}>
                Universal Privacy API
              </div>
              <div style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                padding: "24px",
                overflow: "auto"
              }}>
                <pre style={{ margin: 0 }}>
                  <code style={{
                    fontSize: "13px",
                    lineHeight: "1.6",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "SF Mono, monospace"
                  }}>
{`import { zkSDK } from '@zksdkjs/core';

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

// Cross-chain privacy bridge
await zkSDK.bridge({
  from: "bitcoin",
  to: "ethereum",
  amount: "1.0 BTC",
  privacy: true
});`}
                  </code>
                </pre>
              </div>
            </div>

            {/* AI Agents */}
            <div style={{
              marginBottom: "40px"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: "400",
                margin: "0 0 16px 0"
              }}>
                Autonomous Development with Goose
              </h3>
              <p style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.6)",
                lineHeight: "1.6",
                marginBottom: "20px"
              }}>
                7 specialized AI agents work 24/7 using Goose to research, develop, test, and maintain the SDK.
                They analyze new privacy protocols daily, write integration code, create documentation, and ensure
                compatibility across all chains. No human bottlenecks, just continuous improvement.
              </p>
              
              {/* Agent Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px"
              }}>
                {[
                  { name: "Research Agent", task: "Analyzes new privacy protocols" },
                  { name: "Developer Agent", task: "Writes integration code" },
                  { name: "Tester Agent", task: "Ensures compatibility" },
                  { name: "Security Agent", task: "Audits implementations" },
                  { name: "Docs Agent", task: "Creates documentation" },
                  { name: "DevOps Agent", task: "Manages deployments" },
                  { name: "Chief Agent", task: "Coordinates all agents" }
                ].slice(0, 6).map((agent, i) => (
                  <div key={i} style={{
                    padding: "12px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "6px"
                  }}>
                    <div style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "rgba(255, 255, 255, 0.8)",
                      marginBottom: "4px"
                    }}>
                      {agent.name}
                    </div>
                    <div style={{
                      fontSize: "11px",
                      color: "rgba(255, 255, 255, 0.5)"
                    }}>
                      {agent.task}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center"
            }}>
              <Link
                to="/docs/zkSDK-Mission"
                style={{
                  display: "inline-block",
                  padding: "12px 32px",
                  background: "#4ade80",
                  color: "#000",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  textDecoration: "none",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.background = "#5be88a";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.background = "#4ade80";
                }}
              >
                Learn About the Mission →
              </Link>
              <a
                href="https://github.com/zkthings/zkSDKjs"
                style={{
                  display: "inline-block",
                  padding: "12px 32px",
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  textDecoration: "none",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Watch Progress on GitHub
              </a>
            </div>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(74, 222, 128, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0);
          }
        }
        
        /* Custom scrollbar for libraries list */
        div::-webkit-scrollbar {
          width: 6px;
        }
        
        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        
        div::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      description="Build privacy-first applications with zero-knowledge proofs">
      <HomepageHeader />
    </Layout>
  );
}