import fs from 'node:fs';
import path from 'node:path';

export interface SkillsCommandOptions {
  command?: string;
  name?: string;
}

export async function action(options: SkillsCommandOptions): Promise<void> {
  switch (options.command) {
    case undefined:
    case 'list':
      printSkillList();
      return;
    case 'get':
      if (options.name == null) {
        throw new Error('Skill name is required');
      }
      printSkill(options.name);
      return;
    default:
      throw new Error(`Unknown skills command: ${options.command}`);
  }
}

export function getSkillsDirectory(): string {
  return path.resolve(import.meta.dirname, '..', '..', '..', '..', 'skills');
}

export function listSkillNames(skillsDir: string) {
  if (!fs.existsSync(skillsDir)) {
    throw new Error(`Rollipop skills directory not found: ${skillsDir}`);
  }

  return fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name.slice(0, -'.md'.length))
    .sort();
}

export function getSkillMarkdown(name: string, skillsDir: string) {
  const skillName = normalizeSkillName(name);
  const skillPath = path.resolve(skillsDir, `${skillName}.md`);
  const root = path.resolve(skillsDir);

  if (!skillPath.startsWith(`${root}${path.sep}`)) {
    throw new Error(`Invalid skill name: ${name}`);
  }

  if (!fs.existsSync(skillPath)) {
    const available = listSkillNames(skillsDir);
    const suffix = available.length > 0 ? ` Available skills: ${available.join(', ')}` : '';
    throw new Error(`Skill not found: ${skillName}.${suffix}`);
  }

  return fs.readFileSync(skillPath, 'utf8');
}

export function printSkillList(skillsDir = getSkillsDirectory()) {
  console.log('Available skills:');
  console.log(
    listSkillNames(skillsDir)
      .map((name) => `  ${name}`)
      .join('\n'),
  );
}

export function printSkill(name: string, skillsDir = getSkillsDirectory()) {
  console.log(getSkillMarkdown(name, skillsDir));
}

function normalizeSkillName(name: string) {
  const skillName = name.endsWith('.md') ? name.slice(0, -'.md'.length) : name;

  if (!/^[a-z0-9-]+$/.test(skillName)) {
    throw new Error(`Invalid skill name: ${name}`);
  }

  return skillName;
}
