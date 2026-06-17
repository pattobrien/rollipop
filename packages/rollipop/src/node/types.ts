export interface CommandDefinition<Options> {
  name: string;
  description: string;
  helpText?: string;
  arguments?: CommandArgumentDefinition[];
  options?: CommandOptionDefinition[];
  action: CommandAction<Options>;
}

export interface CommandAction<Options> {
  (this: CommandContext, options: Options): Promise<void>;
}

export interface CommandOptionDefinition<T = any> {
  name: string;
  description: string;
  required?: boolean;
  default?: T;
  parse?: (value: string) => T;
}

export interface CommandArgumentDefinition {
  name: string;
  description?: string;
  required?: boolean;
}

export interface CommandContext {
  platforms: string[];
}
