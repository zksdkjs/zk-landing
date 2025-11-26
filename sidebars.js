/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',

    // Privacy Oracle - Main Product
    {
      type: 'category',
      label: 'Privacy Oracle',
      collapsed: false,
      items: [
        'privacy-oracle',
      ],
    },

    // zkthings - Legacy Libraries
    {
      type: 'category',
      label: 'zkthings (Libraries)',
      collapsed: true,
      items: [
        'zkthings/intro',
        'zkthings/Membership-Proofs-evm',
        'zkthings/Range-Proofs-evm',
        'zkthings/E2E-Encryption-secp256k1',
        'zkthings/E2E-Encryption-ed25519',
        'zkthings/Membership-Proofs-mina',
      ],
    },

    // General
    'Open_Source_Open_for_All',
    'Contact',
  ],
};

export default sidebars;
