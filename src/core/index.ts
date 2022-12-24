import {
  ApplicationCommandDataResolvable,
  BitFieldResolvable,
  Client,
  ClientOptions,
  GatewayIntentsString,
  Events,
  Interaction,
  Collection,
  ChatInputCommandInteraction,
} from 'discord.js';
import { ClientLog, ClientLogConfig, LogLevel } from './logs';

enum DiscordGatewayIntentsString {
  DiscordClientAllIntents = 3276799,
}

interface DiscordClientOptions extends Omit<ClientOptions, 'intents'> {
  intents:
    | BitFieldResolvable<GatewayIntentsString, number>
    | BitFieldResolvable<keyof typeof DiscordGatewayIntentsString, number>;
}

type CommandAction = (
  interaction: ChatInputCommandInteraction,
  options: ChatInputCommandInteraction['options'],
) => void;

interface CompleteCommand {
  command: ApplicationCommandDataResolvable;
  execute: CommandAction;
}

export class DiscordClient extends Client {
  private logs: ClientLog | null = null;
  private commands: Collection<
    ApplicationCommandDataResolvable,
    CommandAction
  > = new Collection();

  constructor(options: DiscordClientOptions, logConfig?: ClientLogConfig) {
    if (options.intents !== 'DiscordClientAllIntents') {
      super(options as ClientOptions);
    }

    super({
      ...options,
      intents: DiscordGatewayIntentsString['DiscordClientAllIntents'],
    });

    this.on(Events.InteractionCreate, this.handleCommands);
    this.on(Events.ClientReady, this.registerCommands);

    if (logConfig) {
      this.config(logConfig);
    }
  }

  /**
   * Register each commands to discord
   */
  private registerCommands() {
    for (const [command] of this.commands) {
      this.application?.commands.create(command);
    }
  }

  public addCommand(
    command: ApplicationCommandDataResolvable,
    callback: CommandAction,
  ) {
    this.commands.set(command, callback);
  }

  public addCommands(commands: Array<CompleteCommand>) {
    for (const { command, execute } of commands) {
      this.addCommand(command, execute);
    }
  }

  public handleCommands(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;
    const { commandName } = interaction;

    const command = this.commands.find(
      (_, key: any) => key.name === commandName,
    );

    command?.(interaction, interaction.options);
  }

  public async config(config: ClientLogConfig) {
    this.logs = new ClientLog(config);
    await this.logs.setup();
  }

  public async log(message: string, level: LogLevel = LogLevel.INFO) {
    this.logs?.log(message, level);
  }
}
