'use client';

import { BeatLoader, BarLoader, ScaleLoader } from 'packages/ui/src';
export default function Components() {
  return (
    <>
      <h1>Components</h1>
      <h2>Atoms</h2>
      <h3>Spinners</h3>
      <p>BarLoader</p>
      <BarLoader size="md" variant="green" speed="normal" /> <br />
      <p>BeatLoader</p>
      <BeatLoader size="md" variant="gold" speed="normal" /> <br />
      <p>ScaleLoader</p>
      <ScaleLoader size="md" variant="muted" speed="normal" /> <br />
    </>
  );
}
