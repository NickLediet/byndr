import { beforeEach } from 'node:test';
import { join } from 'path';
import { exec } from  'promisify-child-process'


// class ImportToolsRunner {
//   constructor(private cliPath: string) {}

//   async executeCommand(command: string) {
//     console.log('Running command:', command, ' from path:', this.cliPath)
//     return await exec(`node ${this.cliPath} ${command}`)
//   }
// }

// console.log()
describe('CLI tests', () => {
  // let importToolsRunner: ImportToolsRunner|null = null

  // beforeEach(() => {
  //   // when running `nx test @byndr/import-tools-e2e` the process.cwd() is the THIS DIRECTORY
  //   importToolsRunner = new ImportToolsRunner(
      // join(process.cwd(), '../../dist/apps/import-tools')
  //   )
  // })

  it('should successfully run the CLI with no errors', async () => {
    try {
      // const { stdout } = await importToolsRunner.executeCommand('--help')
      const cliPath = join(process.cwd(), '../../dist/apps/import-tools')
      const { stdout } = await exec(`node ${cliPath} --help`)
      console.log(stdout)
      expect(stdout).toContain('Import tools for Byndr');
    } catch (error) {
      console.error(error);
      expect(true).toBe(false);
    }
  });

});
