import { GitHubIcon } from '@/components/icons/github';
import cn from 'classnames';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import Link from 'next/link';

export function SidebarFooter() {
  return (
    <Link
      href="https://github.com/rollipop-dev/rollipop"
      target="_blank"
      className={cn(buttonVariants({ size: 'icon', color: 'ghost' }))}
      aria-label="GitHub"
    >
      <GitHubIcon fill="currentColor" />
    </Link>
  );
}
