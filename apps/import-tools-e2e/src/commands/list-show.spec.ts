import { ImportToolsRunner } from '../utils';
import { lists } from '@byndr/db-schema';
import { faker } from '@faker-js/faker'

describe('`byndr list:show`', () => {
    let importToolsRunner: ImportToolsRunner|null = null

    beforeEach(async () => {
        importToolsRunner = new ImportToolsRunner()
        await importToolsRunner.executeDatabaseQuery(async (db) => {
            await db.delete(lists).execute()
        })
    })

    describe('when no lists exist', () => {
        it('shows a message that no lists exist', async () => {
            const { stdout } = await importToolsRunner.executeCommand('list:show')
            expect(stdout).toContain('No lists found')
        })
    })

    it('displays a list after being created', async () => {
        const slug = faker.lorem.slug()
        const name = faker.lorem.words(3)
        const includeInCollection = true

        await importToolsRunner.executeDatabaseQuery(async (db) => {
            await db.insert(lists).values({ 
                slug, name, includeInCollection
            }).execute()
        })

        const { stdout } = await importToolsRunner.executeCommand('list:show')
        expect(stdout).toContain(slug)
        expect(stdout).toContain(name)
    })
  })