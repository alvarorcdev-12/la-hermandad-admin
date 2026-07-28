import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full transition-colors"
    >
      <Sun className="size-5 text-neutral-600 dark:text-neutral-300 transition-all dark:hidden" />
      <Moon className="size-5 text-neutral-600 dark:text-neutral-300 transition-all hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
