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
describe('byndr', () => {
  let importToolsRunner: ImportToolsRunner|null = null

  beforeEach(() => {
    // when running `nx test @byndr/import-tools-e2e` the process.cwd() is the THIS DIRECTORY
    const cliPath = join(process.cwd(), '../../dist/apps/import-tools')
    importToolsRunner = new ImportToolsRunner(cliPath)
  })
  describe('`byndr --help` or `byndr help`', () => {
    it('matches the help-text snapshot', async () => {
      try {
        const { stdout: flagStdout } = await importToolsRunner.executeCommand('--help')
        const { stdout: commandStdout } = await importToolsRunner.executeCommand('help')
        expect(flagStdout).toMatchSnapshot()
        expect(commandStdout).toMatchSnapshot()
        expect (flagStdout).toEqual(commandStdout)
      } catch (error) {
        console.error(error);
        expect(true).toBe(false);
      }
    })
  })
});
