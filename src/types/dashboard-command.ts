import { Dispatch, SetStateAction } from "react";

export interface DashboardCommandProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
