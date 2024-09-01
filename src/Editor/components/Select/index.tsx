import { FC, forwardRef, ReactNode } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDownIcon, LucideIcon } from 'lucide-react';

export interface SelectProps {
  children: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Select: FC<SelectProps> = ({ children, value, onValueChange }) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger className="flex items-center justify-between h-8 min-w-28 px-2 text-sm rounded-md text-gray-800 transition-colors hover:bg-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon asChild>
          <ChevronDownIcon size={16} className="text-gray-600" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className="min-w-32 p-1 bg-white rounded-md border shadow-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
        >
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export interface SelectItemProps extends SelectPrimitive.SelectItemProps {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const SelectItem = forwardRef<any, SelectItemProps>(
  ({ value, label, icon: Icon, ...props }, ref) => {
    return (
      <SelectPrimitive.Item
        ref={ref}
        value={value}
        className="flex items-center gap-x-1.5 px-3 py-1.5 mb-0.5 last:mb-0 rounded-md text-sm text-gray-800 transition-colors cursor-pointer hover:bg-gray-100 focus:outline-none data-[state=checked]:bg-blue-50"
        {...props}
      >
        <Icon size={16} className="text-gray-600" />
        <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    );
  },
);

export const SelectSeparator = () => (
  <SelectPrimitive.Separator className="h-px mx-1 my-1.5 bg-gray-100" />
);
