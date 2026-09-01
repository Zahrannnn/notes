#!/usr/bin/env node
// Feature scaffolder: `npm run feature -- <name>` (or `npm run feature` for an
// interactive prompt). Creates the standard feature module skeleton under
// src/features/<name>/ and refuses names that already exist.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const featuresDir = resolve(__dirname, '../src/features');

const FOLDERS = ['api', 'components', 'constants', 'hooks', 'utils', 'validations'];

function logUsage() {
  console.log('Usage: npm run feature -- <feature-name>');
  console.log('Names must be kebab-case, e.g. customer-accounts');
}

async function promptName() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    return (await rl.question('Feature name (kebab-case): ')).trim();
  } finally {
    rl.close();
  }
}

function scaffold(name) {
  const featureDir = resolve(featuresDir, name);

  if (existsSync(featureDir)) {
    console.error(`Refusing to overwrite existing feature: src/features/${name}`);
    process.exit(1);
  }

  for (const folder of [...FOLDERS, 'store']) {
    mkdirSync(resolve(featureDir, folder), { recursive: true });
    writeFileSync(resolve(featureDir, folder, '.gitkeep'), '');
  }

  const pascalName = name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  writeFileSync(
    resolve(featureDir, 'types.ts'),
    `// Feature-local types. Cross-feature reuse goes through src/types.\n`,
  );

  writeFileSync(
    resolve(featureDir, 'index.ts'),
    `// Public API of the ${name} feature. Import this feature only through here.\nexport const ${pascalName}_FEATURE_NAME = '${name}';\n`,
  );

  writeFileSync(
    resolve(featureDir, 'README.md'),
    `# ${pascalName} Feature\n\nDescribe the domain behavior owned by this feature.\n\nSkeleton:\n\n- \`api/\` endpoint functions and adapters\n- \`components/\` presentational UI\n- \`constants/\` feature constants\n- \`hooks/\` TanStack Query hooks and orchestration\n- \`store/\` feature-local Redux state (only if truly needed)\n- \`utils/\` feature-local utilities\n- \`validations/\` Zod schemas\n- \`types.ts\` feature-local types\n- \`index.ts\` public exports\n\nRemove folders you do not need once real files replace the \`.gitkeep\` placeholders.\n`,
  );

  console.log(`Created src/features/${name}`);
  console.log('Next steps:');
  console.log(`  1. Add route constant in src/app/router/routes.ts and wire it in router.tsx`);
  console.log(`  2. Add the API module in api/ and Query hooks in hooks/`);
  console.log(`  3. Replace .gitkeep placeholders as folders gain real files`);
}

const arg = process.argv[2]?.trim();

if (!arg) {
  if (process.stdin.isTTY) {
    const name = await promptName();
    if (!name) {
      logUsage();
      process.exit(1);
    }
    scaffold(name);
  } else {
    logUsage();
    process.exit(1);
  }
} else {
  scaffold(arg);
}
