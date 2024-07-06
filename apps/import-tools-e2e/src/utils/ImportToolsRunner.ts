import { exec } from  'promisify-child-process'

export class ImportToolsRunner {
  private cliPath: string

  constructor(cliPath: string) {
    this.cliPath = cliPath
  }

   async executeCommand(command: string) {
    const { stdout } = await exec(`pwd`)
    console.log(stdout)
    return exec(`${this.cliPath} ${command} --env ../../.env.test`)
  }
}
 