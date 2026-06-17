import { Command } from '@commander-js/extra-typings';
import type { Command as ReactNativeCliCommand } from '@react-native-community/cli-types';
import { omit } from 'es-toolkit';

import { Logo } from '../common/logo';
import type { CommandDefinition } from './types';
import { withErrorHandler } from './utils';

export function createCommand<T>(commandDefinition: CommandDefinition<T>): Command {
  const { name, description, helpText, options, action } = commandDefinition;
  const commandArguments = commandDefinition.arguments ?? [];
  const command = new Command(name).description(description);

  for (const argument of commandArguments) {
    const format = argument.required ? `<${argument.name}>` : `[${argument.name}]`;
    command.argument(format, argument.description);
  }

  if (options != null) {
    for (const option of options) {
      (option.required ? command.requiredOption.bind(command) : command.option.bind(command))(
        option.name,
        option.description ?? '',
        (value) => (option.parse != null ? option.parse(value) : value),
        option.default,
      );
    }
  }

  if (helpText != null) {
    command.addHelpText('after', `\n${helpText}`);
  }

  return command.action(
    withErrorHandler(async function (...args: unknown[]) {
      const commandOptions = args[commandArguments.length] ?? {};
      const actionArgs = { ...(commandOptions as object) } as Record<string, unknown>;

      commandArguments.forEach((argument, index) => {
        const value = args[index];
        if (value !== undefined) {
          actionArgs[argument.name] = value;
        }
      });

      await action.call({ platforms: ['android', 'ios'] }, actionArgs as T);
    }),
  );
}

export function createReactNativeCliCommand<T>(
  commandDefinition: CommandDefinition<T>,
): ReactNativeCliCommand {
  return {
    name: commandDefinition.name,
    description: commandDefinition.description,
    options: commandDefinition.options?.map((option) => omit(option, ['required'])),
    func: (_argv, cliConfig, args) => {
      Logo.printOnce();
      return commandDefinition.action.call(
        { platforms: Object.keys(cliConfig.platforms) },
        args as T,
      );
    },
  };
}

export * from './commands/start/setup-interactive-mode';
