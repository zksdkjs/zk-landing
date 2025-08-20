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

  const zkthingsLibraries = [
    {
      name: 'proof-membership-evm',
      description: 'Prove set membership without revealing identity',
      npm: '@zkthings/proof-membership-evm',
      installs: packageDownloads['@zkthings/proof-membership-evm'] || 336
    },
    {
      name: 'range-proof-evm',
      description: 'Prove values in ranges without exact amounts',
      npm: '@zkthings/range-proof-evm',
      installs: packageDownloads['@zkthings/range-proof-evm'] || 151
    },
    {
      name: 'e2e-encryption-secp256k1',
      description: 'End-to-end encryption for EVM wallets',
      npm: '@zkthings/e2e-encryption-secp256k1',
      installs: packageDownloads['@zkthings/e2e-encryption-secp256k1'] || 259
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

      {/* Product Toggle */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "60px"
      }}>
        <div style={{
          display: "inline-flex",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "8px",
          padding: "4px"
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
              outline: "none"
            }}
          >
            zkSDKjs
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "0 20px 80px",
        minHeight: "60vh"
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
                Experimental Privacy Libraries
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
                Zero-knowledge proof libraries for EVM and Solana
              </p>
            </div>

            {/* Libraries List */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              marginBottom: "60px"
            }}>
              {zkthingsLibraries.map((lib, index) => (
                <div
                  key={lib.name}
                  onClick={() => setSelectedPackage(index)}
                  style={{
                    padding: "24px",
                    background: selectedPackage === index ? "rgba(255, 255, 255, 0.05)" : "transparent",
                    borderLeft: selectedPackage === index ? "2px solid #fff" : "2px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                  onMouseEnter={(e) => {
                    if (selectedPackage !== index) {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPackage !== index) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        margin: "0 0 4px 0"
                      }}>
                        {lib.name}
                      </h3>
                      <p style={{
                        fontSize: "14px",
                        color: "rgba(255, 255, 255, 0.5)",
                        margin: 0
                      }}>
                        {lib.description}
                      </p>
                    </div>
                    <div style={{
                      textAlign: "right"
                    }}>
                      <div style={{
                        fontSize: "12px",
                        color: "rgba(255, 255, 255, 0.4)",
                        marginBottom: "4px"
                      }}>
                        {lib.installs.toLocaleString()} installs
                      </div>
                      <code style={{
                        fontSize: "11px",
                        color: "rgba(255, 255, 255, 0.3)",
                        fontFamily: "SF Mono, monospace"
                      }}>
                        npm i {lib.npm}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
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
                Example
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
                    color: "rgba(255, 255, 255, 0.8)",
                    fontFamily: "SF Mono, monospace"
                  }}>
{`import { ZkMerkle } from '${zkthingsLibraries[selectedPackage].npm}';

const zkMerkle = new ZkMerkle();
const values = ['alice', 'bob', 'charlie'];

// Generate proof
const { proof, publicSignals } = await zkMerkle.generateMerkleProof(
  values,
  'alice'
);

// Verify off-chain
const isValid = await zkMerkle.verifyProofOffChain(proof, publicSignals);`}
                  </code>
                </pre>
              </div>
            </div>

            {/* CTA */}
            <div style={{
              textAlign: "center"
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
                fontSize: "32px",
                fontWeight: "300",
                margin: "0 0 16px 0"
              }}>
                Universal Privacy SDK
              </h2>
              <p style={{
                fontSize: "16px",
                color: "rgba(255, 255, 255, 0.5)",
                margin: "0 0 8px 0"
              }}>
                Coming Q2 2025
              </p>
              <p style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.4)"
              }}>
                7 autonomous AI agents building universal privacy for Web3
              </p>
            </div>

            {/* Live Status */}
            <div style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
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
                  color: "rgba(255, 255, 255, 0.8)"
                }}>
                  AI Agents Building Live 24/7
                </span>
              </div>
              <p style={{
                fontSize: "13px",
                color: "rgba(255, 255, 255, 0.5)",
                margin: 0,
                fontFamily: "SF Mono, monospace"
              }}>
                {agentTasks[agentAnimation]}
              </p>
            </div>

            {/* Vision */}
            <div style={{
              marginBottom: "40px"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: "400",
                margin: "0 0 16px 0"
              }}>
                One API for Every Blockchain
              </h3>
              <p style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.6)",
                lineHeight: "1.6",
                marginBottom: "24px"
              }}>
                Privacy protocols are complex and fragmented. Each blockchain has different implementations.
                Our AI agents continuously integrate every privacy protocol - Railgun, Aztec, Light Protocol,
                CoinJoin - into one simple API.
              </p>
              
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
                    color: "rgba(255, 255, 255, 0.8)",
                    fontFamily: "SF Mono, monospace"
                  }}>
{`import { zkSDK } from '@zksdkjs/core';

// Bitcoin privacy
await zkSDK.transfer({
  chain: "bitcoin",
  amount: "0.1 BTC",
  to: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  privacy: "maximum"
});

// Ethereum privacy  
await zkSDK.transfer({
  chain: "ethereum",
  amount: "1.0 ETH",
  to: "0x742d35Cc6634C0532925a3b844Bc9e79B7423094",
  privacy: "aztec"
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

            {/* Agents */}
            <div style={{
              marginBottom: "40px"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: "400",
                margin: "0 0 16px 0"
              }}>
                Powered by Goose
              </h3>
              <p style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.6)",
                lineHeight: "1.6"
              }}>
                7 specialized AI agents work autonomously using Goose to research, develop, test,
                and maintain the SDK. They integrate new protocols daily, write documentation,
                and ensure compatibility across all chains.
              </p>
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
                Learn More →
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
                GitHub
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