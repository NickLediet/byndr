import { Command } from "commander"
import * as commands from '../commands'

export type SharedOptions = {
    e2e: boolean,
    dryRun: boolean,
    env: string
}

export function registerSharedOptions(program: Command): Command {
    program
        .option('--e2e', 'Run in end-to-end test mode (use test docker containers)')
        .option('-d, --dry-run', 'Perform a dry-run')
        .option('--env <env>', 'Path to the environment file for overrides')

    return program
}

export async function bootstrap(program: Command) {
    // Register shared options
    registerSharedOptions(program)
    // Register command modules
    Object.values(commands).forEach((command) => command?.registerCommand(program))
    program.parse()
}