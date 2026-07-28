import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarBadge, AvatarFallback } from '@/components/ui/avatar';

interface Props {
  fullName: string;
  email: string;
  onLogout: () => void;
}

export const ProfileMenu = ({ fullName, email, onLogout }: Props) => {
  return (
    <>
      <DropdownMenuItem>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>
              {fullName?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
          <div>
            <p className="text-sm font-medium">{fullName}</p>
            <p className="text-xs text-muted-foreground">{email}</p>
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
