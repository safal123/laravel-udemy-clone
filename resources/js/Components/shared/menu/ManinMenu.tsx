
import {Layout, User} from 'lucide-react';
import MainMenuItem from "@/Components/shared/menu/MenuItem";

interface MainMenuProps {
  className?: string;
}

export default function MainMenu({ className }: MainMenuProps) {
  return (
    <div className={className}>
      <MainMenuItem
        text="Dashboard"
        link="dashboard"
        icon={<Layout size={20} />}
      />
      <MainMenuItem
        text="Profile"
        link={`profile.edit`}
        icon={<User size={20} />}
      />
    </div>
  );
}
