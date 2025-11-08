export enum GeneratedAvatarVariant {
  BotttsNeutral = "botttsNeutral",
  Initials = "initials",
}

export interface GeneratedAvatarProps {
  className?: string;
  seed: string;
  variant: GeneratedAvatarVariant;
}
