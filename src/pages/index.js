import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  
  const packages = [
    {
      id: 'evm-membership',
      title: 'EVM zkSDK',
      subtitle: 'Zero-Knowledge Membership Proofs',
      npm: '@zkthings/proof-membership-evm',
      code: `import { ZkMerkle } from '@zkthings/proof-membership-evm'

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
      id: 'mina-membership',
      title: 'Mina zkSDK',
      subtitle: 'Zero-Knowledge Membership Proofs',
      npm: '@zkthings/proof-membership-mina',
      code: `import { ZkMerkle } from '@zkthings/proof-membership-mina'

// Initialize ZK Merkle Tree
const zkMerkle = new ZkMerkle()

// Add data and generate proof
const values = ['user1', 'user2', 'user3']

const { proof, publicSignals } = await zkMerkle.generateMerkleProof(
  values,
  'user1'
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
    {
      id: 'e2e-encryption',
      title: 'E2E Encryption',
      subtitle: 'End-to-End Encryption for secp256k1',
      npm: '@zkthings/e2e-encryption-secp256k1',
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
    }
  ];

  const [selectedPackage, setSelectedPackage] = useState(0);

  return (
    <div style={{
      background: 'linear-gradient(to bottom, #0a0a0a, #1a1a1a)',
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px"
    }}>
      <div style={{
        maxWidth: "1200px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "80px",
        alignItems: "center"
      }}>
        {/* Header */}
        <div style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          <h1 style={{
            fontSize: "4rem",
            fontWeight: "200",
            color: "#fff",
            margin: 0,
            letterSpacing: "-0.02em",
            fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif"
          }}>
            {siteConfig.title}
          </h1>
          <div style={{
            fontSize: "1.2rem",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "300"
          }}>
            Build privacy-first applications with zero-knowledge proofs
          </div>
        </div>

        {/* Package Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          width: "100%"
        }}>
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(index)}
              style={{
                background: selectedPackage === index 
                  ? "rgba(255, 255, 255, 0.1)" 
                  : "rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                padding: "32px",
                cursor: "pointer",
                border: "1px solid",
                borderColor: selectedPackage === index 
                  ? "rgba(255, 255, 255, 0.3)" 
                  : "rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
              onMouseEnter={(e) => {
                if (selectedPackage !== index) {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPackage !== index) {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }
              }}
            >
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "400",
                color: "#fff",
                margin: 0,
                fontFamily: "'Poppins', sans-serif"
              }}>
                {pkg.title}
              </h3>
              <p style={{
                fontSize: "0.9rem",
                color: "rgba(255, 255, 255, 0.6)",
                margin: 0,
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "300"
              }}>
                {pkg.subtitle}
              </p>
              <code style={{
                fontSize: "0.8rem",
                color: "rgba(255, 255, 255, 0.4)",
                fontFamily: "SF Mono, monospace",
                background: "rgba(0, 0, 0, 0.3)",
                padding: "4px 8px",
                borderRadius: "4px",
                width: "fit-content"
              }}>
                npm i {pkg.npm}
              </code>
            </div>
          ))}
        </div>

        {/* Code Display */}
        <div style={{
          width: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          {/* Tab Header */}
          <div style={{
            background: "rgba(0, 0, 0, 0.3)",
            padding: "16px 24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "0.9rem",
              fontFamily: "SF Mono, monospace"
            }}>
              {packages[selectedPackage].title} Example
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(packages[selectedPackage].code)}
              style={{
                background: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "6px",
                padding: "4px 12px",
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.8rem",
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
          
          {/* Code Content */}
          <pre style={{
            margin: 0,
            padding: "32px",
            overflow: "auto",
            maxHeight: "500px"
          }}>
            <code style={{
              fontSize: "0.95rem",
              lineHeight: "1.6",
              fontFamily: "SF Mono, monospace",
              color: "rgba(255, 255, 255, 0.9)",
              whiteSpace: "pre",
              display: "block"
            }}>
              {packages[selectedPackage].code}
            </code>
          </pre>
        </div>

        {/* CTA Buttons */}
        <div style={{
          display: "flex",
          gap: "24px",
          alignItems: "center"
        }}>
          <Link
            to="/docs/intro"
            style={{
              padding: "14px 32px",
              background: "#fff",
              color: "#000",
              borderRadius: "8px",
              fontSize: "1rem",
              fontFamily: "'Poppins', sans-serif",
              textDecoration: "none",
              fontWeight: "500",
              transition: "transform 0.2s ease",
              display: "inline-block"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
            }}
          >
            Get Started →
          </Link>
          
          <a
            href="https://github.com/zkthings"
            style={{
              padding: "14px 32px",
              background: "transparent",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "8px",
              fontSize: "1rem",
              fontFamily: "'Poppins', sans-serif",
              textDecoration: "none",
              fontWeight: "500",
              transition: "all 0.2s ease",
              display: "inline-block"
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            View on GitHub
          </a>
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
      description="Build privacy-first applications with zero-knowledge proofs">
      <HomepageHeader />
    </Layout>
  );
}