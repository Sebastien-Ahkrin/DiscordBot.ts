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

enum DiscordGatewayIntentsString {
  DiscordClientAllIntents = 3276799,
}

interface DiscordClientOptions extends Omit<ClientOptions, 'intents'> {
  intents:
    | BitFieldResolvable<GatewayIntentsString, number>
    | BitFieldResolvable<keyof typeof DiscordGatewayIntentsString, number>;
}

type CommandAction = (interaction: ChatInputCommandInteraction) => void;

export class DiscordClient extends Client {
  private commands: Collection<
    ApplicationCommandDataResolvable,
    CommandAction
  > = new Collection();

  constructor(options: DiscordClientOptions) {
    if (options.intents !== 'DiscordClientAllIntents') {
      super(options as ClientOptions);
    }

    super({
      ...options,
      intents: DiscordGatewayIntentsString['DiscordClientAllIntents'],
    });

    this.on(Events.InteractionCreate, this.handleCommands);
    this.on(Events.ClientReady, this.registerCommands);
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

  public handleCommands(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;
    const { commandName } = interaction;

    const command = this.commands.find(
      (_, key: any) => key.name === commandName,
    );

    command?.(interaction);
  }
}
