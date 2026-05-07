import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../backend/src/graphql/typeDefs.ts',
  documents: 'src/**/*.{ts,tsx}',
  generates: {
    'src/generated/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  }
};

export default config;
