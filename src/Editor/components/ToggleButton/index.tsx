import { forwardRef } from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

export interface ToggleButtonProps extends TogglePrimitive.ToggleProps {
  icon: LucideIcon;
}

const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({ icon: Icon, pressed, ...props }, ref) => {
    return (
      <TogglePrimitive.Root
        ref={ref}
        {...props}
        className={clsx(
          'inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors',
          pressed ? 'bg-blue-50' : 'hover:bg-gray-100',
        )}
        pressed={pressed}
      >
        <Icon size={16} className="text-gray-800" />
      </TogglePrimitive.Root>
    );
  },
);

export default ToggleButton;
