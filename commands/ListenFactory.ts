import { BaseCommand } from '@adonisjs/core/build/standalone'
import FactoryListener from "App/Services/FactoryListener";

export default class ListenFactory extends BaseCommand {
  public static commandName = 'listen:factory'
  public static description = 'Listen to PairCreated events on the factory'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,
  }

  public async run() {
    const listener = new FactoryListener()
    await listener.listen()
  }
}
