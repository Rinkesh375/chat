import type { LoadingStateProps as EmptyStateProps } from "@/types/loading-state";
import Image from "next/image";

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col  items-center justify-center">
      <Image src={"/empty.svg"} alt="Empty" width={240} height={240} />
      <div className="flex flex-col gap-y-6 text-center max-w-md mx-auto">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
