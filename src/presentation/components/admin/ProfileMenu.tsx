import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarBadge, AvatarFallback } from '@/components/ui/avatar';

import type { User } from '@/domain/entities/user.entity';

interface Props {
  user: User | null;
  onLogout: () => void;
}

export const ProfileMenu = ({ user, onLogout }: Props) => {
  return (
    <>
      <DropdownMenuItem>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>{user?.initials ?? ''}</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user?.name ?? ''}</p>
            <p className="text-xs text-muted-foreground">{user?.email ?? ''}</p>
          </div>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <UserIcon />
        Perfil
      </DropdownMenuItem>
      <DropdownMenuItem>
        <SettingsIcon />
        Configuración
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        variant="destructive"
        onClick={onLogout}
        className="cursor-pointer"
      >
        <LogOutIcon />
        Cerrar Sesión
      </DropdownMenuItem>
    </>
  );
};
