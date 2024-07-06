import { ImportToolsRunner } from '../utils';
import { join } from 'path';

describe('`byndr list:show`', () => {
    let importToolsRunner: ImportToolsRunner|null = null

    beforeEach(() => {
        importToolsRunner = new ImportToolsRunner(
            join(process.cwd(), '../../dist/apps/import-tools')
        )
    })

    describe('when no lists exist', () => {
        it('shows a message that no lists exist', async () => {
            const { stdout } = await importToolsRunner.executeCommand('list:show')
            expect(stdout).toContain('No lists found')
        })
    })
  })