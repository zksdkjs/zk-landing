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
        <p style={{
          fontSize: "1.5rem",
          fontWeight: "300",
          color: "#f2f2f2",
          margin: "0 0 30px 0",
          opacity: "0.9"
        }}>
          Build ZK apps with ease and efficiency
        </p>
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
            letterSpacing: "0.05em"
          }}
        >
          Get Started
        </Link>
      </div>

      <div style={{
        maxWidth: "800px",
        width: "100%",
        background: "#1E1E1E",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
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
        <pre style={{
          margin: 0,
          padding: "30px",
          fontSize: "0.9rem",
          lineHeight: "1.5",
          overflow: "auto"
        }}>
          <code style={{ color: "#f8f8f2" }}>
{`import { ZkMerkle } from 'zkmerkle';

// Create a new ZK Merkle Tree
const zkMerkle = new ZkMerkle();

const myData = ['apple', 'banana', 'orange'];
const depth = Math.ceil(Math.log2(myData.length));

// Generate a proof
const { proof, publicSignals, root } = 
  await zkMerkle.generateMerkleProof(
    'apple',
    myData
  );

// Verify the proof
const isValid = await zkMerkle.verifyProof(
  proof, 
  publicSignals, 
  depth
);

console.log(\`Verification: \${isValid ? '✅' : '❌'}\`);`}
          </code>
        </pre>
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
