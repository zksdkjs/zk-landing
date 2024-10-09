import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container" style={{ marginTop: "20vh", marginBottom: "20vh", textAlign: "center" }}>
        <h1 className="hero__title" style={{ fontSize: "4rem", fontWeight: "100", color: "#ffffff" }}>
          {siteConfig.title}
        </h1>
        <p className="hero__subtitle" style={{ fontSize: "1.5rem", fontWeight: "300", color: "#f2f2f2" }}>
          Build ZK apps with ease and efficiency
        </p>
        <div className={styles.buttons} style={{ marginTop: '5vh' }}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro"
            style={{ backgroundColor: "black", color: "#ffffff", border: "2px solid #ffffff" }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({ title, description }) {
  return (
    <div style={{
      flex: 1, padding: "20px", textAlign: "center",
      backgroundColor: "#1a1a1a", color: "#ffffff",
      borderRadius: "8px", margin: "10px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)"
    }}>
      <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>{title}</h3>
      <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>{description}</p>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", margin: "10vh 0",
      padding: "0 5vw", backgroundColor: "white"
    }}>
      <Feature
        title="ZeTo"
        description="Run and manage ZeTo, the zero knowledge token"
      />
      <Feature
        title="zkMerkle"
        description="Create a zero-knowledge proof from any object or array"
      />
      <Feature
        title="TBA"
        description="More cool things are cooking 👀"
      />
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
      <main >
      </main>
    </Layout>
  );
}
