import { ImportToolsRunner } from '../utils';

describe('`byndr list:show`', () => {
    let importToolsRunner: ImportToolsRunner|null = null

    beforeEach(() => {
        importToolsRunner = new ImportToolsRunner()
    })

    describe('when no lists exist', () => {
        it('shows a message that no lists exist', async () => {
            const { stdout } = await importToolsRunner.executeCommand('list:show')
            expect(stdout).toContain('No lists found')
        })
    })
  })