import { DocsNavBar } from '@/components/navbar';
import { SidebarStyles } from '@/components/sidebar';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { SidebarFooter } from '../components/SidebarFooter';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        component: <DocsNavBar />,
      }}
      sidebar={{
        collapsible: false,
        className: 'bg-fd-background [&>div:first-child]:!p-0',
        footer: <SidebarFooter />,
      }}
      containerProps={{
        className: 'h-dvh overflow-y-auto',
        style: {
          '--fd-docs-row-1': '56px',
        } as React.CSSProperties,
      }}
      searchToggle={{ enabled: false }}
      themeSwitch={{ mode: 'light-dark' }}
    >
      <SidebarStyles />
      {children}
    </DocsLayout>
  );
}
