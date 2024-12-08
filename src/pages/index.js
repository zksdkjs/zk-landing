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
          fontSize: "4rem",
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
            fontSize: "1.75rem",
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
        </div>
        <Link
          className="button button--primary button--lg"
          to="/docs/intro"
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "8px",
            padding: "12px 28px",
            textDecoration: "none",
            fontSize: "1rem",
            letterSpacing: "0.05em",
            transition: "all 0.2s ease",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)"
          }}
        >
          Get Started
        </Link>
      </div>

      <div style={{
        maxWidth: "800px",
        width: "100%",
        background: "linear-gradient(145deg, #1A1A1A, #111111)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)"
      }}>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderBottom: "1px solid rgba(255,255,255,0.05)"
        }}>
          <div style={{ 
            width: "12px", 
            height: "12px", 
            borderRadius: "50%", 
            backgroundColor: "#ff5f57",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.05)",
            transition: "all 0.2s ease"
          }}></div>
          <div style={{ 
            width: "12px", 
            height: "12px", 
            borderRadius: "50%", 
            backgroundColor: "#febc2e",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.05)",
            transition: "all 0.2s ease"
          }}></div>
          <div style={{ 
            width: "12px", 
            height: "12px", 
            borderRadius: "50%", 
            backgroundColor: "#28c840",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.05)",
            transition: "all 0.2s ease"
          }}></div>
        </div>
        <div style={{
          padding: "35px",
          fontSize: "0.95rem",
          lineHeight: "1.6",
          fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
          color: "#e4e4e4",
          background: "transparent",
          position: "relative"
        }}>
          <pre style={{ 
            margin: 0, 
            background: "transparent",
            overflow: "auto",
            maxHeight: "500px"
          }}>
            <code style={{ 
              color: "#e4e4e4",
              textShadow: "0 0 1px rgba(255,255,255,0.1)"
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