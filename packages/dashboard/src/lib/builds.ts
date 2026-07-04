import type { Build } from '../types/dashboard';

export function getLogCounts(build: Build) {
  return build.messages;
}

export function shortId(id: string) {
  return id.slice(0, 10);
}
