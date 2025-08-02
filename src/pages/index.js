import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  
  const packages = [
    {
      id: 'evm-membership',
      title: 'Membership Proofs',
      subtitle: 'EVM Compatible • Prove Set Membership • Without Revealing Identity',
      npm: '@zkthings/proof-membership-evm',
      docUrl: '/docs/sdk-guides/Membership-Proofs-evm',
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
      id: 'range-proof',
      title: 'Range Proofs',
      subtitle: 'EVM Compatible • Prove Values in Ranges • Without Revealing Exact Amounts',
      npm: '@zkthings/range-proof-evm',
      docUrl: '/docs/sdk-guides/Range-Proofs-evm',
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
      id: 'e2e-encryption',
      title: 'E2E Encryption EVM',
      subtitle: 'EVM and secp256k1 Wallets Compatible • Private Messaging • Wallet-to-Wallet',
      npm: '@zkthings/e2e-encryption-secp256k1',
      docUrl: '/docs/sdk-guides/E2E-Encryption-secp256k1',
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
      id: 'ed25519-encryption',
      title: 'E2E Encryption Solona',
      subtitle: `Solona & StarkNet & ed25519 wallets  Compatible • Private Messaging • Wallet-to-Wallet`,
      npm: '@zkthings/e2e-encryption-ed25519',
      docUrl: '/docs/sdk-guides/E2E-Encryption-ed25519',
      code: `import { Ed25519E2E } from '@zkthings/e2e-encryption-ed25519';

// Initialize E2E encryption
const e2e = new Ed25519E2E();

// Encrypt data for recipient
const encrypted = await e2e.encryptFor(
  'Hello, World!',
  '0x1234...', // recipient address
  publicKey    // recipient's Ed25519 public key
);

// Decrypt data
const decrypted = await e2e.decrypt(encrypted, privateKey);
console.log(decrypted); // "Hello, World!"

// Works with any Ed25519-compatible wallet
// Solana, StarkNet, etc.`
    }
  ];

  const [selectedPackage, setSelectedPackage] = useState(0);
  const [totalDownloads, setTotalDownloads] = useState('...');
  const [packageDownloads, setPackageDownloads] = useState({});
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [packagesPerView, setPackagesPerView] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // Responsive packages per view
  useEffect(() => {
    const updatePackagesPerView = () => {
      if (window.innerWidth <= 768) {
        setPackagesPerView(1); // Mobile: 1 item
      } else if (window.innerWidth <= 1024) {
        setPackagesPerView(2); // Tablet: 2 items
      } else {
        setPackagesPerView(3); // Desktop: 3 items
      }
    };
    
    updatePackagesPerView();
    window.addEventListener('resize', updatePackagesPerView);
    return () => window.removeEventListener('resize', updatePackagesPerView);
  }, []);

  // Reset carousel when packagesPerView changes
  useEffect(() => {
    setCarouselIndex(0);
  }, [packagesPerView]);

  // Auto-advance carousel
  useEffect(() => {
    if (isHovered || packages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCarouselIndex(prev => {
        const maxIdx = packagesPerView === 1 ? packages.length - 1 : Math.max(0, packages.length - packagesPerView);
        return prev >= maxIdx ? 0 : prev + 1;
      });
    }, packagesPerView === 1 ? 4000 : 7000); // Mobile: 4s, Desktop: 7s
    
    return () => clearInterval(interval);
  }, [isHovered, packages.length, packagesPerView]);
  
  const maxIndex = packagesPerView === 1 
    ? packages.length - 1 
    : Math.max(0, packages.length - packagesPerView);
  
  const nextSlide = () => {
    setCarouselIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  };
  
  const prevSlide = () => {
    setCarouselIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  };

  // Touch/Swipe handlers
  const handleTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Mouse wheel handler for desktop
  const handleWheel = (e) => {
    if (packagesPerView === 1) return; // Only on desktop
    
    e.preventDefault();
    if (e.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

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
        
        // Store individual package downloads
        const packageStats = {};
        results.forEach(result => {
          packageStats[result.package] = result.downloads;
        });
        setPackageDownloads(packageStats);
        
        if (total > 0) {
          setTotalDownloads(total.toLocaleString());
        } else {
          setTotalDownloads('10,000+'); // Fallback if API fails
        }
      } catch (error) {
        setTotalDownloads('10,000+'); // Fallback
      }
    };

    fetchDownloads();
  }, []);

  // Inject download stats AND FORCE BLACK FOOTER
  useEffect(() => {
    // FORCE BLACK FOOTER WITH JAVASCRIPT
    const forceBlackFooter = () => {
      const footers = document.querySelectorAll('footer, .footer, [class*="footer"]');
      footers.forEach(footer => {
        footer.style.backgroundColor = '#000000';
        footer.style.background = '#000000';
        footer.style.backgroundImage = 'none';
      });
    };
    
    // Force immediately and on interval
    forceBlackFooter();
    const interval = setInterval(forceBlackFooter, 100);
    
    if (totalDownloads !== '...') {
      const footerCopyright = document.querySelector('.footer__copyright');
      if (footerCopyright) {
        footerCopyright.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <div style="font-family: var(--ifm-font-family-monospace); color: rgba(255, 255, 255, 0.8); font-size: 0.9rem;">
              📦 ${totalDownloads} total downloads
            </div>
            <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">
              Copyright © ${new Date().getFullYear()} zkThings labs. • Privacy-First Zero-Knowledge SDKs
            </div>
          </div>
        `;
      }
    }
    
    // Clean up interval
    return () => clearInterval(interval);
  }, [totalDownloads]);

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
       Privacy dev tools
          </div>
        </div>

        {/* Simple Carousel */}
        <div 
          style={{
            width: "100%",
            maxWidth: "1200px", 
            margin: "0 auto",
            position: "relative"
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          
          {/* Desktop: Show all cards in a grid */}
          {packagesPerView > 1 && (
            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${packagesPerView}, 1fr)`,
              gap: "24px",
              width: "100%",
              transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            }}>
              {packages.slice(carouselIndex, carouselIndex + packagesPerView).map((pkg, index) => {
                const originalIndex = carouselIndex + index;
                return (
                <div
                  key={pkg.id}
                  onClick={() => !pkg.inactive && setSelectedPackage(originalIndex)}
                  style={{
                    background: pkg.inactive 
                      ? "rgba(255, 255, 255, 0.02)"
                      : selectedPackage === originalIndex 
                        ? "rgba(255, 255, 255, 0.1)" 
                        : "rgba(255, 255, 255, 0.05)",
                    borderRadius: "16px",
                    padding: "32px",
                    cursor: pkg.inactive ? "not-allowed" : "pointer",
                    border: "1px solid",
                    borderColor: pkg.inactive
                      ? "rgba(255, 255, 255, 0.05)"
                      : selectedPackage === originalIndex 
                        ? "rgba(255, 255, 255, 0.3)" 
                        : "rgba(255, 255, 255, 0.1)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transform: "translateY(0px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    opacity: pkg.inactive ? 0.4 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!pkg.inactive && selectedPackage !== originalIndex) {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!pkg.inactive && selectedPackage !== originalIndex) {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.transform = "translateY(0px)";
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
              
              {/* Package Download Count & Guide Button */}
              {!pkg.inactive && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: ['@zkthings/proof-membership-evm', '@zkthings/range-proof-evm', '@zkthings/e2e-encryption-secp256k1', '@zkthings/e2e-encryption-ed25519', 'zkmerkle'].includes(pkg.npm) ? "space-between" : "flex-end",
                  marginTop: "4px"
                }}>
                  {/* Only show download stats for packages that exist on NPM */}
                  {['@zkthings/proof-membership-evm', '@zkthings/range-proof-evm', '@zkthings/e2e-encryption-secp256k1', '@zkthings/e2e-encryption-ed25519', 'zkmerkle'].includes(pkg.npm) && (
                    <div style={{
                      fontSize: "0.75rem",
                      color: "rgba(255, 255, 255, 0.5)",
                      fontFamily: "SF Mono, monospace",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}>
                      <span>📊</span>
                      <span>
                        {packageDownloads[pkg.npm] !== undefined
                          ? packageDownloads[pkg.npm] === 0 
                            ? 'NEW'
                            : `${packageDownloads[pkg.npm].toLocaleString()} installs`
                          : '... installs'}
                      </span>
                    </div>
                  )}
                  
                  <Link
                    to={pkg.docUrl}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "4px 8px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "4px",
                      color: "rgba(255, 255, 255, 0.7)",
                      textDecoration: "none",
                      fontSize: "0.7rem",
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "300",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span style={{ fontSize: "0.6rem" }}>📖</span>
                    <span>docs</span>
                  </Link>
                </div>
              )}
              
              <code style={{
                fontSize: "0.8rem",
                color: "rgba(255, 255, 255, 0.4)",
                fontFamily: "SF Mono, monospace",
                background: "rgba(0, 0, 0, 0.3)",
                padding: "4px 8px",
                borderRadius: "4px",
                width: "fit-content",
                marginTop: "8px"
              }}>
                npm i {pkg.npm}
                  </code>
                </div>
                );
              })}
            </div>
          )}

          {/* Mobile: Show one card at a time */}
          {packagesPerView === 1 && (
            <div style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              padding: "0 20px",
              transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            }}>
              <div
                key={packages[carouselIndex].id}
                onClick={() => !packages[carouselIndex].inactive && setSelectedPackage(carouselIndex)}
                style={{
                  background: packages[carouselIndex].inactive 
                    ? "rgba(255, 255, 255, 0.02)"
                    : selectedPackage === carouselIndex 
                      ? "rgba(255, 255, 255, 0.1)" 
                      : "rgba(255, 255, 255, 0.05)",
                  borderRadius: "16px",
                  padding: "32px",
                  cursor: packages[carouselIndex].inactive ? "not-allowed" : "pointer",
                  border: "1px solid",
                  borderColor: packages[carouselIndex].inactive
                    ? "rgba(255, 255, 255, 0.05)"
                    : selectedPackage === carouselIndex 
                      ? "rgba(255, 255, 255, 0.3)" 
                      : "rgba(255, 255, 255, 0.1)",
                  transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  transform: "translateY(0px) scale(1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  opacity: packages[carouselIndex].inactive ? 0.4 : 1,
                  maxWidth: "400px",
                  width: "100%"
                }}
              >
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: "400",
                  color: "#fff",
                  margin: 0,
                  fontFamily: "'Poppins', sans-serif"
                }}>
                  {packages[carouselIndex].title}
                </h3>
                <p style={{
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.6)",
                  margin: 0,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "300"
                }}>
                  {packages[carouselIndex].subtitle}
                </p>
                
                {!packages[carouselIndex].inactive && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: ['@zkthings/proof-membership-evm', '@zkthings/range-proof-evm', '@zkthings/e2e-encryption-secp256k1', '@zkthings/e2e-encryption-ed25519', 'zkmerkle'].includes(packages[carouselIndex].npm) ? "space-between" : "flex-end",
                    marginTop: "4px"
                  }}>
                    {['@zkthings/proof-membership-evm', '@zkthings/range-proof-evm', '@zkthings/e2e-encryption-secp256k1', '@zkthings/e2e-encryption-ed25519', 'zkmerkle'].includes(packages[carouselIndex].npm) && (
                      <div style={{
                        fontSize: "0.75rem",
                        color: "rgba(255, 255, 255, 0.5)",
                        fontFamily: "SF Mono, monospace",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}>
                        <span>📊</span>
                        <span>
                          {packageDownloads[packages[carouselIndex].npm] !== undefined
                            ? packageDownloads[packages[carouselIndex].npm] === 0 
                              ? 'NEW'
                              : `${packageDownloads[packages[carouselIndex].npm].toLocaleString()} installs`
                            : '... installs'}
                        </span>
                      </div>
                    )}
                    
                    <Link
                      to={packages[carouselIndex].docUrl}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "4px 8px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "4px",
                        color: "rgba(255, 255, 255, 0.7)",
                        textDecoration: "none",
                        fontSize: "0.7rem",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "300",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                        e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span style={{ fontSize: "0.6rem" }}>📖</span>
                      <span>docs</span>
                    </Link>
                  </div>
                )}
                
                <code style={{
                  fontSize: "0.8rem",
                  color: "rgba(255, 255, 255, 0.4)",
                  fontFamily: "SF Mono, monospace",
                  background: "rgba(0, 0, 0, 0.3)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  width: "fit-content",
                  marginTop: "8px"
                }}>
                  npm i {packages[carouselIndex].npm}
                </code>
              </div>
            </div>
          )}

          {/* Navigation Hints */}
          {(packages.length > packagesPerView || (packagesPerView === 1 && packages.length > 1)) && (
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px",
              marginTop: "24px"
            }}>
              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.4s ease",
                  opacity: "0.7"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.7";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                ←
              </button>

              {/* Dots */}
              <div style={{
                display: "flex",
                gap: "8px"
              }}>
                {(packagesPerView === 1 ? packages : Array.from({ length: maxIndex + 1 })).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      border: "none",
                      background: idx === carouselIndex 
                        ? "rgba(255, 255, 255, 0.9)" 
                        : "rgba(255, 255, 255, 0.3)",
                      cursor: "pointer",
                      transition: "all 0.4s ease"
                    }}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextSlide}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.4s ease",
                  opacity: "0.7"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.7";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                →
              </button>
            </div>
          )}
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
  return (
    <Layout
      description="Build privacy-first applications with zero-knowledge proofs">
      <HomepageHeader />
    </Layout>
  );
}