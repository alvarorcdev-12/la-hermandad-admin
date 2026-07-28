import { NavLink, useLocation } from 'react-router';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface SubItem {
  to: string;
  children: string;
}

interface Props {
  to: string;
  children: string;
  Icon: LucideIcon;

  onNavigation?: () => void;
  subItems?: SubItem[];
}

export const NavItem = ({ to, Icon, children, onNavigation, subItems }: Props) => {
  const location = useLocation();

  const isParentActive =
    to === '/admin'
      ? location.pathname === '/admin'
      : location.pathname === to || location.pathname.startsWith(to + '/');

  const isAnySubItemActive = subItems?.some(
    (item) => location.pathname === item.to || location.pathname.startsWith(item.to + '/'),
  );

  const isOpen = isParentActive || !!isAnySubItemActive;

  return (
    <div className="flex flex-col gap-1">
      <NavLink
        to={to}
        end
        onClick={onNavigation}
        className={({ isActive }) =>
          cn(
            'flex items-center px-3 py-2 text-sm rounded-md transition-colors text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-muted',
            isActive ? 'bg-muted text-neutral-900 dark:text-white font-medium' : '',
          )
        }
      >
        <Icon className="size-4 mr-3 shrink-0" />
        {children}
      </NavLink>

      {subItems && isOpen && (
        <div className="flex flex-col gap-1 mt-0.5">
          {subItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigation}
              className={({ isActive }) =>
                cn(
                  'flex items-center pl-10 pr-3 py-1.5 text-sm rounded-md transition-colors text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-muted/50',
                  isActive
                    ? 'text-neutral-900 dark:text-white font-medium bg-muted/40'
                    : '',
                )
              }
            >
              {item.children}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

