import type { DevServerContext } from '../types';
import type { McpToolContext } from './tools';
import { AppLogDiagnostics } from './tools/app-log-diagnostics';
import { BuildDiagnostics } from './tools/build-diagnostics';
import { ClientDiagnostics } from './tools/client-diagnostics';

export function createMcpToolContext(context: DevServerContext): McpToolContext {
  return {
    context,
    appLogDiagnostics: new AppLogDiagnostics(context),
    buildDiagnostics: new BuildDiagnostics(context),
    clientDiagnostics: new ClientDiagnostics(context),
  };
}
