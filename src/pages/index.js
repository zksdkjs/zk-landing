import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div style={{
      backgroundColor: "#000000",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: "20px"
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: "60px"
      }}>
        <h1 style={{
          fontSize: "5rem",
          fontWeight: "200",
          color: "#ffffff",
          margin: "0 0 20px 0",
          letterSpacing: "0.05em"
        }}>
          {siteConfig.title}
        </h1>
        <div style={{
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "300",
            color: "#f2f2f2",
            margin: "0 0 15px 0",
            lineHeight: "1.4"
          }}>
            Build ZK apps with ease and efficiency
          </h2>
          <div style={{
            fontSize: "1.2rem",
            fontWeight: "300",
            color: "#f2f2f2",
            opacity: "0.7",
            marginBottom: "40px",
            lineHeight: "1.6"
          }}>
            An open-source SDK for zero-knowledge development
          </div>
        </div>
        <Link
          className="button button--primary button--lg"
          to="/docs/intro"
          style={{
            backgroundColor: "transparent",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.6)",
            borderRadius: "4px",
            padding: "12px 24px",
            textDecoration: "none",
            fontSize: "1rem",
            letterSpacing: "0.05em",
            transition: "all 0.2s ease"
          }}
        >
          Get Started
        </Link>
      </div>

      <div className="terminal-window" style={{
        maxWidth: "800px",
        width: "100%",
        background: "#1E1E1E !important",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{
          background: "#2D2D2D",
          padding: "12px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}>
          <div style={{
            display: "flex",
            gap: "6px"
          }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#FF5F56" }}></div>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#FFBD2E" }}></div>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#27C93F" }}></div>
          </div>
        </div>
        <div className="terminal-content" style={{
          margin: 0,
          padding: "30px",
          fontSize: "0.9rem",
          lineHeight: "1.5",
          overflow: "auto",
          backgroundColor: "#1E1E1E !important",
          color: "#f8f8f2 !important",
          fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
        }}>
          <pre style={{
            margin: 0,
            color: "inherit",
            background: "transparent"
          }}>
            <code style={{
              color: "#f8f8f2 !important",
              background: "transparent !important"
            }}>{`import { ZkMerkle } from 'zkmerkle';

// Create a new ZK Merkle Tree
const zkMerkle = new ZkMerkle();

// Add some data to your tree
const myData = ['apple', 'banana', 'orange', 'grape', 'mango'];

// Calculate tree depth
const depth = Math.ceil(Math.log2(myData.length));

// Generate a proof
const { proof, publicSignals, root } = 
  await zkMerkle.generateMerkleProof('apple', myData);

// Verify the proof
const isValid = await zkMerkle.verifyProof(
  proof, 
  publicSignals, 
  depth
);

console.log(\`Verification: \${isValid ? '✅' : '❌'}\`);`}</code>
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
      description="zkSDK - The easiest way to build Zero Knowledge apps.">
      <HomepageHeader />
    </Layout>
  );
}