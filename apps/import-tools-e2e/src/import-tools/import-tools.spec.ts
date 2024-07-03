import { join } from 'path';
import { exec } from  'promisify-child-process'


class ImportToolsRunner {
  private cliPath: string

  constructor(cliPath: string) {
    this.cliPath = cliPath
  }

  async executeCommand(command: string) {
    return exec(`node ${this.cliPath} ${command}`)
  }
}


// console.log()
describe('CLI tests', () => {
  let importToolsRunner: ImportToolsRunner|null = null

  beforeEach(() => {
    // when running `nx test @byndr/import-tools-e2e` the process.cwd() is the THIS DIRECTORY
    const cliPath = join(process.cwd(), '../../dist/apps/import-tools')
    importToolsRunner = new ImportToolsRunner(cliPath)

    console.log(importToolsRunner)
  })

  it('should successfully run the CLI with no errors', async () => {
    try {
      const { stdout } = await importToolsRunner.executeCommand('--help')
      console.log(stdout)
      expect(stdout).toContain('Import tools for Byndr');
    } catch (error) {
      console.error(error);
      expect(true).toBe(false);
    }
  });

});
