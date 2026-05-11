'use client';

import { Button } from 'packages/ui/src/components/atoms/Button';
import { Input } from 'packages/ui/src/components/atoms/Input';
import { Spinner } from 'packages/ui/src/components/atoms/Spinner';

export default function Components() {
  return (
    <>
      <h2>Buttons</h2>
      <div>
        <Button variant="primary" size="md">
          Click me
        </Button>
        <Button variant="secondary" size="md">
          Click me
        </Button>
        <Button variant="ghost" size="md">
          Click me
        </Button>
        <Button variant="primary" size="sm">
          Click me
        </Button>
        <Button variant="secondary" size="sm">
          Click me
        </Button>
        <Button variant="ghost" size="sm">
          Click me
        </Button>
        <Button variant="primary" size="lg">
          Click me
        </Button>
        <Button variant="secondary" size="lg">
          Click me
        </Button>
        <Button variant="ghost" size="lg">
          Click me
        </Button>
      </div>

      <h2>Input</h2>
      <div>
        <Input></Input>
      </div>

      <h2>Spinner</h2>
      <div>
        <Spinner></Spinner>
      </div>
    </>
  );
}
