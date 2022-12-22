import {
  BitFieldResolvable,
  Client,
  ClientOptions,
  GatewayIntentsString,
} from 'discord.js';

enum DiscordGatewayIntentsString {
  DiscordClientAllIntents = 3276799,
}

interface DiscordClientOptions extends Omit<ClientOptions, 'intents'> {
  intents:
    | BitFieldResolvable<GatewayIntentsString, number>
    | BitFieldResolvable<keyof typeof DiscordGatewayIntentsString, number>;
}

export class DiscordClient extends Client {
  constructor(options: DiscordClientOptions) {
    if (options.intents !== 'DiscordClientAllIntents') {
      super(options as ClientOptions);
    }

    super({
      ...options,
      intents: DiscordGatewayIntentsString['DiscordClientAllIntents'],
    });
  }
}
