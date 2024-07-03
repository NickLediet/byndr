import { execSync } from 'child_process';
import { join } from 'path';

describe('CLI tests', () => {
  it('should successfully run the CLI with no errors', () => {
    try {
      // when running `nx test @byndr/import-tools-e2e` the process.cwd() is the THIS DIRECTORY
      const cliPath = join(process.cwd(), '../../dist/apps/import-tools');
      const output = execSync(`node ${cliPath} --help`).toString();
      expect(output).toContain('Import tools for Byndr');
    } catch (error) {
      console.error(error);
      expect(true).toBe(false);
    }
  });
});
