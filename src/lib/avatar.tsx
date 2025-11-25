import {
  GeneratedAvatarProps,
  GeneratedAvatarVariant,
} from "@/types/generated-avatar";
import { botttsNeutral, initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export default function generatedAvatar({
  seed,
  variant,
}: GeneratedAvatarProps) {
  let avatar;

  if (variant === GeneratedAvatarVariant.BotttsNeutral) {
    avatar = createAvatar(botttsNeutral, {
      seed,
    });
  } else {
    avatar = createAvatar(initials, {
      seed,
      fontWeight: 500,
      fontSize: 42,
    });
  }

  return avatar.toDataUri();
}
