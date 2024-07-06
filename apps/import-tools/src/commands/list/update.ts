import type { Command } from "commander";
import { SharedOptions, registerSharedOptions } from "../../lib/core";

export enum ListUpdateMode {
    Add = 'add',
    Remove = 'remove'
}

export type ListUpdateOptions = SharedOptions & {
    mode: ListUpdateMode,
    slug: string
}

export async function registerCommand(program: Command) {
    registerSharedOptions(
        program.command('list:update')
        .description('Update a list in Byndr')
        .arguments('<sources...>'))
        .requiredOption('-m, --mode <add|remove>', 'Type of update to perform')
        .requiredOption('-s, --slug <slug>', 'Slug of the list to update')
        .action(action)
}

export async function action(sources: string[], options: ListUpdateOptions) {
    console.log(options)
    console.log('Updating list...')
}
