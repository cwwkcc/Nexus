import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// NOTE: the old version of this script imported from '../src/tokens/index.js',
// which doesn't exist and never has — the package root is src/index.ts, not
// src/tokens/index.ts. This script wasn't wired into package.json's scripts
// either, so it's likely never been run successfully. Fixed both here.
import { generateCssVariables } from '../src/generators/css.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const webPath = path.resolve(__dirname, '../../../apps/web/src/app/tokens.css');
const adminPath = path.resolve(__dirname, '../../../apps/admin/src/app/tokens.css');

const css = generateCssVariables();
fs.writeFileSync(webPath, css, 'utf8');
fs.writeFileSync(adminPath, css, 'utf8');
console.log(`✅ Generated ${webPath}`);
console.log(`✅ Generated ${adminPath}`);
