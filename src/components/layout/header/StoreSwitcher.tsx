"use client";
// Hookx / Packages
import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { onOpen } from "@/redux/modal/storeModalSlice";

// Components
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

// Icons
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";

// Types
import { StoreSwitcherProps } from "@/types/props";

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  // Redux
  const dispatch = useAppDispatch();

  //   Routes
  const params = useParams();
  const router = useRouter();

  // States

  const formattedItems = items.map(item => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    item => item.value == params.storeId
  );

  //   popover state
  const [popOpen, setPopOpen] = useState(false);

  const onStoreSelect = (store: { value: string; label: string }) => {
    setPopOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={popOpen} onOpenChange={setPopOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          role="combobox"
          aria-expanded={popOpen}
          aria-label="Select a store"
          className={cn(
            "w-[200px] justify-between line-clamp-1 px-1 sm:px-3",
            className
          )}
        >
          <StoreIcon className="me-2 h-4 w-4" />
          <span className="line-clamp-1"> {currentStore?.label}</span>
          <ChevronsUpDown className="ms-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map(store => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm cursor-pointer"
                >
                  <StoreIcon className="me-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ms-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setPopOpen(false);
                  dispatch(onOpen());
                }}
              >
                <PlusCircle className="me-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
