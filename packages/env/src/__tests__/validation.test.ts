// packages/env/src/__tests__/validation.test.ts

import assert from 'node:assert/strict';
import test from 'node:test';

import { z } from 'zod';

import { parseEnv } from '../validation.js';

test('parseEnv returns parsed data on success', () => {
  const schema = z.object({ FOO: z.string() });
  const result = parseEnv(schema, { FOO: 'bar' }, 'shared');
  assert.deepEqual(result, { FOO: 'bar' });
});

test('parseEnv throws a formatted error for the failing field', () => {
  const schema = z.object({ FOO: z.string().min(1, 'FOO is required') });

  assert.throws(
    () => parseEnv(schema, { FOO: '' }, 'server'),
    (err: unknown) => {
      assert.ok(err instanceof Error);
      assert.match(err.message, /Invalid server environment variables/);
      assert.match(err.message, /FOO: FOO is required/);
      assert.match(err.message, /Check your \.env file against \.env\.example\./);
      return true;
    },
  );
});

test('parseEnv lists every failing field, not just the first', () => {
  const schema = z.object({
    FOO: z.string().min(1, 'FOO is required'),
    BAR: z.string().url('BAR must be a valid URL'),
  });

  assert.throws(
    () => parseEnv(schema, { FOO: '', BAR: 'not-a-url' }, 'client'),
    (err: unknown) => {
      assert.ok(err instanceof Error);
      assert.match(err.message, /FOO: FOO is required/);
      assert.match(err.message, /BAR: BAR must be a valid URL/);
      return true;
    },
  );
});

test('parseEnv labels the error with the schema it came from', () => {
  const schema = z.object({ FOO: z.string().min(1, 'FOO is required') });
  assert.throws(() => parseEnv(schema, { FOO: '' }, 'client'), /Invalid client environment variables/);
});
