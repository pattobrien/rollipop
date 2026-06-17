import type { CommandDefinition } from '../../types';
import { action, type SkillsCommandOptions } from './action';

export const command: CommandDefinition<SkillsCommandOptions> = {
  name: 'skills',
  description: 'List or print bundled Rollipop skills.',
  arguments: [
    {
      name: 'command',
      description: '"list" or "get"',
    },
    {
      name: 'name',
      description: 'Skill name for "get"',
    },
  ],
  action,
};
