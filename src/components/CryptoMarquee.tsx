import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CryptoMarquee: React.FC = () => {
  const transitions = [
    { from: 'RSA-4096', to: 'ML-KEM-1024', std: 'NIST FIPS 203', kind: 'Key Encapsulation' },
    { from: 'ECDSA P-384', to: 'ML-DSA-87', std: 'NIST FIPS 204', kind: 'Digital Signature' },
    { from: 'Ed25519', to: 'SLH-DSA-SHAKE-256f', std: 'NIST FIPS 205', kind: 'Stateless Hash Sig' },
    { from: 'ECDH X25519', to: 'X25519MLKEM768', std: 'IETF RFC Hybrid', kind: 'TLS 1.3 Key Exchange' },
    { from: 'RSA-2048', to: 'ML-KEM-768', std: 'NIST FIPS 203', kind: 'Module-Lattice KEM' },
    { from: 'AES-128', to: 'AES-256', std: 'Grover Defense', kind: 'Symmetric Cipher' },
    { from: 'Static SBOM', to: 'CycloneDX 1.6 CBOM', std: 'Crypto BOM', kind: 'Cryptographic Lineage' },
  ];

  return (
    <div
      role="region"
      aria-label="Cryptographic protocol migration transitions"
      className="relative w-full overflow-hidden py-4 border-y border-white/[0.08] bg-[#030611]/80 backdrop-blur-md"
    >
      {/* Left/Right Vignette gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#02040a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#02040a] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
        {[...transitions, ...transitions].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 mx-4 px-4 py-2 rounded-xl bg-white/[0.025] border border-white/[0.08] text-xs font-mono group hover:border-cyan-400/40 hover:bg-white/[0.05] transition-colors"
          >
            <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
              <span className="size-1.5 rounded-full bg-rose-500 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
              {item.from}
            </span>
            <ArrowRight className="size-3 text-cyan-400" aria-hidden="true" />
            <span className="text-cyan-300 font-bold">{item.to}</span>
            <span className="h-3 w-px bg-white/10 mx-1" />
            <span className="text-[10px] text-slate-400 font-sans tracking-wide">{item.std}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
              {item.kind}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
