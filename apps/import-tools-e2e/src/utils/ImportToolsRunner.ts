import { exec } from  'promisify-child-process'

export class ImportToolsRunner {
  private cliPath: string

  constructor(cliPath: string) {
    this.cliPath = cliPath
  }

   async executeCommand(command: string) {
    return exec(`node ${this.cliPath} ${command}`)
  }
}
 