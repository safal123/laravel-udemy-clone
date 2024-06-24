import {Avatar, AvatarImage} from "@/Components/ui/avatar";
import {AvatarFallback} from "@radix-ui/react-avatar";

type UserAvatarProps = {
  src: string,
  alt?: string,
  fallback: string
}

export function UserAvatar({src, alt, fallback}: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={src || 'https://github.com/shadcn.png'} alt={alt || 'user-avatar'}/>
      <AvatarFallback>
        {fallback}
      </AvatarFallback>
    </Avatar>
  )
}
