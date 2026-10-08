import { Bell } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ProfileMenu } from './ProfileMenu';

import { useAuthStore } from '@/presentation/store/auth.store';
// import { ThemeToggle } from '@/presentation/components/ThemeToggle';

// import { useAuthStore } from '@/auth/store/auth.store';

export const TopNav = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-background border-b h-full">
      <div className="font-medium text-sm hidden md:flex items-center space-x-1 truncate max-w-75">
        {/* <AppBreadcrumb /> */}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <Button
          variant="ghost"
          className="rounded-full transition-colors"
          size="icon-lg"
        >
          <Bell className="size-4 sm:size-5 text-neutral-600 dark:text-neutral-300" />
        </Button>

        {/* <ThemeToggle /> */}

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback className="uppercase">{`${user?.storeName.charAt(0)}${user?.storeName.charAt(1)}`}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                {user?.storeName}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-auto bg-background! border rounded-lg shadow-lg p-2"
          >
            <ProfileMenu user={user} onLogout={logout} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
