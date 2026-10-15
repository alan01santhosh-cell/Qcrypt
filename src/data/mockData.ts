export interface CbomItem {
  id: string;
  assetName: string;
  category: 'Key Exchange' | 'Digital Signature' | 'Symmetric Encryption' | 'Hashing' | 'TLS Configuration';
  algorithm: string;
  keySize: string;
  quantumVulnerable: boolean;
  riskScore: 'Critical' | 'High' | 'Medium' | 'Low' | 'Quantum-Ready';
  location: string;
  dependency: string;
  nistReplacement: string;
  recommendedAction: string;
}

export const MOCK_CBOM_ITEMS: CbomItem[] = [
  {
    id: 'CRY-101',
    assetName: 'API Gateway Session Token Signer',
    category: 'Digital Signature',
    algorithm: 'RSA-PKCS1v15',
    keySize: '2048-bit',
    quantumVulnerable: true,
    riskScore: 'Critical',
    location: 'services/auth/jwt_provider.go:142',
    dependency: 'golang.org/x/crypto (transitive)',
    nistReplacement: 'NIST FIPS 204 (ML-DSA-65)',
    recommendedAction: 'Transition to hybrid ML-DSA + ECDSA token verification pipeline.'
  },
  {
    id: 'CRY-102',
    assetName: 'Internal Microservice RPC Channel',
    category: 'Key Exchange',
    algorithm: 'ECDH (secp256r1)',
    keySize: '256-bit',
    quantumVulnerable: true,
    riskScore: 'Critical',
    location: 'config/tls/cluster_mesh.yaml:28',
    dependency: 'Envoy Gateway v1.28.0',
    nistReplacement: 'NIST FIPS 203 (ML-KEM-768)',
    recommendedAction: 'Enable X25519MLKEM768 hybrid key exchange in TLS 1.3 listener.'
  },
  {
    id: 'CRY-103',
    assetName: 'Customer Long-Term Record Vault',
    category: 'Key Exchange',
    algorithm: 'Diffie-Hellman Ephemeral (DHE)',
    keySize: '2048-bit',
    quantumVulnerable: true,
    riskScore: 'High',
    location: 'storage/vault/encryption_wrapper.py:89',
    dependency: 'cryptography==41.0.4',
    nistReplacement: 'NIST FIPS 203 (ML-KEM-1024)',
    recommendedAction: 'Harvest-Now-Decrypt-Later risk: wrap envelope keys with ML-KEM.'
  },
  {
    id: 'CRY-104',
    assetName: 'Code Signing CI/CD Certificate',
    category: 'Digital Signature',
    algorithm: 'ECDSA (prime256v1)',
    keySize: '256-bit',
    quantumVulnerable: true,
    riskScore: 'High',
    location: '.github/workflows/release_sign.yml:45',
    dependency: 'cosign v2.2.1',
    nistReplacement: 'NIST FIPS 205 (SLH-DSA-128s) or ML-DSA-44',
    recommendedAction: 'Plan dual-signature verification for next major artifact release.'
  },
  {
    id: 'CRY-105',
    assetName: 'Database at-Rest Column Encryption',
    category: 'Symmetric Encryption',
    algorithm: 'AES-GCM',
    keySize: '256-bit',
    quantumVulnerable: false,
    riskScore: 'Quantum-Ready',
    location: 'models/customer_pii.ts:54',
    dependency: 'WebCrypto / Node.js native',
    nistReplacement: 'Already Post-Quantum Resistant (Grover-proof keylength)',
    recommendedAction: 'Retain AES-256; verify nonce uniqueness and periodic rotation.'
  },
  {
    id: 'CRY-106',
    assetName: 'Legacy TLS 1.2 Handshake Ciphersuite',
    category: 'TLS Configuration',
    algorithm: 'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256',
    keySize: 'Multiple',
    quantumVulnerable: true,
    riskScore: 'Medium',
    location: 'deploy/k8s/ingress-nginx-values.yaml:112',
    dependency: 'ingress-nginx v4.8',
    nistReplacement: 'Enforce TLS 1.3 with Hybrid PQC Groups',
    recommendedAction: 'Deprecate RSA key-exchange fallback; mandate TLS 1.3.'
  },
  {
    id: 'CRY-107',
    assetName: 'Integrity Checksum Hash Pipeline',
    category: 'Hashing',
    algorithm: 'SHA-384',
    keySize: '384-bit',
    quantumVulnerable: false,
    riskScore: 'Quantum-Ready',
    location: 'pkg/ledger/audit_chain.rs:188',
    dependency: 'sha2 crate v0.10',
    nistReplacement: 'Quantum collision resistant (SHAKE / SHA-3 compliant)',
    recommendedAction: 'Standard compliant; continue monitoring NIST guidance.'
  },
  {
    id: 'CRY-108',
    assetName: 'Staging Environment Hybrid KEM Probe',
    category: 'Key Exchange',
    algorithm: 'ML-KEM-768 (Kyber draft)',
    keySize: 'Level 3',
    quantumVulnerable: false,
    riskScore: 'Quantum-Ready',
    location: 'experimental/pqc_bench/client.cc:63',
    dependency: 'liboqs v0.10.1',
    nistReplacement: 'Validated against finalized NIST FIPS 203',
    recommendedAction: 'Ready to promote to pilot partner tier.'
  }
];

export const MOCK_TELEMETRY_FEED = [
  { time: '18:14:02', service: 'auth-gateway', target: 'jwt_provider.go', finding: 'RSA-2048 keypair identified', status: 'Vulnerable' },
  { time: '18:14:05', service: 'cluster-mesh', target: 'envoy-proxy:443', finding: 'ECDH secp256r1 active', status: 'HNDL Risk' },
  { time: '18:14:09', service: 'payment-core', target: 'vault/kms_client.py', finding: 'AES-256-GCM symmetric', status: 'PQC Safe' },
  { time: '18:14:13', service: 'ci-pipeline', target: 'sign_artifact.sh', finding: 'ECDSA SHA-256 cert', status: 'Vulnerable' },
  { time: '18:14:18', service: 'data-ledger', target: 'ledger/audit_chain.rs', finding: 'SHA-384 Merkle hash', status: 'PQC Safe' },
];

export const NIST_STANDARDS_DATA = [
  {
    standard: 'NIST FIPS 203',
    algorithm: 'ML-KEM',
    fullName: 'Module-Lattice-Based Key-Encapsulation Mechanism',
    primaryUse: 'General Encryption & Secure Key Exchange',
    replaces: 'Diffie-Hellman, ECDH, RSA Key Encapsulation',
    status: 'Finalized Standard (Aug 2024)',
    qcryptAlignment: 'Automated code-level discovery of asymmetric key exchanges and roadmap mapping to ML-KEM-512, ML-KEM-768, and ML-KEM-1024.'
  },
  {
    standard: 'NIST FIPS 204',
    algorithm: 'ML-DSA',
    fullName: 'Module-Lattice-Based Digital Signature Algorithm',
    primaryUse: 'Digital Signatures, Authentication, & Identity',
    replaces: 'RSA-PSS, RSA-PKCS1, DSA, ECDSA, Ed25519',
    status: 'Finalized Standard (Aug 2024)',
    qcryptAlignment: 'Scans JWT signers, PKI roots, and TLS certificates; highlights signature size implications and hybrid transition stages.'
  },
  {
    standard: 'NIST FIPS 205',
    algorithm: 'SLH-DSA',
    fullName: 'Stateless Hash-Based Digital Signature Algorithm',
    primaryUse: 'Backup Digital Signatures & High-Assurance Code Signing',
    replaces: 'Specialized Long-Life Signatures & Firmware Signing',
    status: 'Finalized Standard (Aug 2024)',
    qcryptAlignment: 'Identifies supply-chain signing assets and advises on hash-based alternative paths when lattice math diversity is required.'
  }
];
