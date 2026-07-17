// packages/tokens/scripts/generate-cn-groups.js
// AUTOGENERATES packages/ui/src/utilities/cn.tsx
// Run after any token change: node packages/tokens/scripts/generate-cn-groups.js
//
// Mirrors generate-css-vars.js: all the flattening/class-list logic lives
// in generators/cn.ts (generateCnUtility()), so it's unit-testable; this
// script only resolves the output path and writes the file.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { generateCnUtility } from '../src/generators/cn.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(__dirname, '../../../packages/ui/src/utilities/cn.tsx');

fs.writeFileSync(outPath, generateCnUtility(), 'utf8');
console.log(`✅ Generated ${outPath}`);
