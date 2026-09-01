import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/app/providers/theme-context';
import { Button } from '@/components/ui/Button';

const options = [
  { value: 'light', label: 'Light theme', icon: Sun },
  { value: 'dark', label: 'Dark theme', icon: Moon },
  { value: 'system', label: 'System theme', icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex items-center gap-1 rounded-md border border-slate-300 p-1 dark:border-slate-700"
      role="group"
      aria-label="Color theme"
    >
      {options.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          variant={theme === value ? 'primary' : 'ghost'}
          size="sm"
          className="min-h-0 px-2 py-1"
          aria-label={label}
          aria-pressed={theme === value}
          onClick={() => setTheme(value)}
        >
          <Icon className="size-4" aria-hidden="true" />
        </Button>
      ))}
    </div>
  );
}
