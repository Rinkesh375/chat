import { ReactNode } from "react";

export interface ResponsiveDialogProps {
  title: string;
  description: string;
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
