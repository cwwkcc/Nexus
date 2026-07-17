import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { generateCssVariables } from '../src/generators/css.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const webPath = path.resolve(__dirname, '../../../apps/web/src/app/tokens.css');
const adminPath = path.resolve(__dirname, '../../../apps/admin/src/app/tokens.css');

const css = generateCssVariables();
fs.writeFileSync(webPath, css, 'utf8');
fs.writeFileSync(adminPath, css, 'utf8');
console.log(`✅ Generated ${webPath}`);
console.log(`✅ Generated ${adminPath}`);
