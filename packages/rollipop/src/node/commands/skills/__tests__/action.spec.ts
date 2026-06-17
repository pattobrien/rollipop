import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test';

import { getSkillMarkdown, listSkillNames, printSkill, printSkillList } from '../action';

describe('skills command action', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rollipop-skills-'));
    fs.writeFileSync(path.join(tmpDir, 'debugging.md'), '# Debugging\n');
    fs.writeFileSync(path.join(tmpDir, 'core.md'), '# Core\n');
    fs.writeFileSync(path.join(tmpDir, 'notes.txt'), 'ignored\n');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('lists markdown skills by name', () => {
    expect(listSkillNames(tmpDir)).toEqual(['core', 'debugging']);
  });

  it('reads a named skill', () => {
    expect(getSkillMarkdown('core', tmpDir)).toBe('# Core\n');
    expect(getSkillMarkdown('core.md', tmpDir)).toBe('# Core\n');
  });

  it('rejects invalid skill names', () => {
    expect(() => getSkillMarkdown('../core', tmpDir)).toThrow('Invalid skill name');
  });

  it('prints skill list and content', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});

    printSkillList(tmpDir);
    printSkill('debugging', tmpDir);

    expect(log).toHaveBeenNthCalledWith(1, 'core\ndebugging');
    expect(log).toHaveBeenNthCalledWith(2, '# Debugging\n');
  });
});
