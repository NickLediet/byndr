import { Command } from "commander"
import * as commands from '../commands'

export type SharedOptions = {
    e2e: boolean,
    dryRun: boolean,
    env: string
}

export function registerSharedOptions(program: Command): Command {
    return program
        .option('--e2e', 'Run in end-to-end test mode (use test docker containers)')
        .option('-d, --dry-run', 'Perform a dry-run')
        .option('-e, --env <env>', 'Path to the environment file for overrides')
}

export async function bootstrap(program: Command) {
    // Register command modules
    Object.values(commands).forEach((command) => command?.registerCommand(program))
    program.parseAsync(process.argv)
}