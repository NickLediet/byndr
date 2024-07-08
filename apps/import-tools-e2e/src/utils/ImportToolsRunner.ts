import { exec } from  'promisify-child-process'
import { join } from 'path';

export class ImportToolsRunner {
  private cliPath: string

  constructor() {
    this.cliPath = join(process.cwd(), '../../dist/apps/import-tools/main.js')
  }

   async executeCommand(command: string) {
    return exec(`node ${this.cliPath} ${command} --env ../../.env.test`)
  }
}
 