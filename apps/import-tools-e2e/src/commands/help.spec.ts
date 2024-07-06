import { ImportToolsRunner } from '../utils';
import { join } from 'path';

describe('`byndr --help` or `byndr help`', () => {
    let importToolsRunner: ImportToolsRunner|null = null

    beforeEach(() => {
        importToolsRunner = new ImportToolsRunner(
            join(process.cwd(), '../../dist/apps/import-tools')
        )
    })

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