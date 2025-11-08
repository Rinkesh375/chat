import { CommandDialog, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DashboardCommandProps } from "@/types/dashboard-command";


export default function DashboardCommand({
  open,
  setOpen,
}: DashboardCommandProps) {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
      placeholder="Find a meeting or agent"
      />
      <CommandList>
        <CommandItem>
            Test
        </CommandItem>
      </CommandList>
    </CommandDialog>
  );
}
