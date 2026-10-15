# Qcrypt — Post-Quantum Cryptography (PQC) Migration Intelligence

> **Find Hidden Crypto Risks. Prepare for the Quantum Era.**  
> Qcrypt helps technology companies discover quantum-vulnerable cryptography across their code and dependencies, prioritize remediation by risk, and plan a structured migration toward post-quantum security.

---

## 🛡️ Core Value Proposition

- **Finds quantum-vulnerable crypto:** Deep AST source code analysis and package dependency graph inspection.
- **Ranks fixes by risk:** Prioritizes high-exposure Harvest-Now-Decrypt-Later (HNDL) vectors and external TLS ciphers over benign internal symmetric primitives.
- **Gives a NIST-aligned migration plan:** Direct mapping to finalized NIST FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), and FIPS 205 (SLH-DSA) standards.

---

## ⚡ The 4-Step Migration Intelligence Pipeline

1. **Discover:** Automated detection of cryptographic primitive calls, key sizes, curves, and parameters across Go, Rust, Java, Python, and TypeScript.
2. **Inventory (CBOM):** Machine-readable Cryptographic Bill of Materials generation conforming to the CycloneDX 1.6 and SPDX CBOM specifications.
3. **Prioritize:** Context-aware risk scoring that weighs algorithm fragility against public exposure and data longevity.
4. **Plan:** Staged transition roadmap with concrete hybrid recipes (e.g. `X25519MLKEM768`) to ensure continuous backward compatibility.

---

## 📐 Standards Grounding

Qcrypt aligns remediation guidance with official standards published by the **National Institute of Standards and Technology (NIST)**:
- **NIST FIPS 203:** Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM)
- **NIST FIPS 204:** Module-Lattice-Based Digital Signature Algorithm (ML-DSA)
- **NIST FIPS 205:** Stateless Hash-Based Digital Signature Algorithm (SLH-DSA)

*Disclaimer: Reference to NIST standards does not imply endorsement or certification by NIST.*

---

## 🚀 Live Demo & Development

### Local Setup

```bash
# Clone the repository
git clone https://github.com/alan01santhosh-cell/Qcrypt.git
cd Qcrypt

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

### Tech Stack
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + High-End Agency Architecture (Doppelrand double-bezel cards, custom cubic-bezier spring physics, Plus Jakarta Sans typography)
- **Icons:** Lucide React
- **Output:** Clean static bundle deployable to GitHub Pages, Cloudflare Pages, Vercel, or Netlify.

---

## 🔒 Confidentiality & Privacy

All cryptographic discovery occurs within your security boundary (via local CLI or air-gapped runners). Zero proprietary source code leaves your VPC.

For inquiries and pilot access: `contact@qcrypt.security`
