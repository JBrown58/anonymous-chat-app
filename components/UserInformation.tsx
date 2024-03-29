import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useContext } from 'react';
import { ConnectionContext } from './ConnectionContext';
import Spinner from './ui/spinner';

const UserInformation = ({ otherUserId }) => {
  const { setTheme } = useTheme();
  const isConnected = useContext(ConnectionContext)

  return (
    <div className="p-[24px] border-b-[1px] ">
      <div className="flex justify-between">
        <div className="flex gap-[16px]">
          <div>
            {isConnected ? (
              <Avatar>
                <AvatarImage />
                <AvatarFallback id="avatar">
                  {isConnected ? otherUserId.slice(0, 2).toUpperCase() : ''}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Spinner />
            )}
          </div>
          <div className="flex-col ">
            <p className="font-metropolis  font-semibold leading-[125%]" id="user-id">
              {isConnected ? otherUserId : 'Searching for users'}
            </p>
            <div className="flex gap-[8px] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
              >
                <circle cx="5" cy="5.5" r="5" fill={isConnected ? '#68D391' : '#FF0000'} />
              </svg>
              <p className="text-[12px] font-semibold leading-[125%] opacity-[0.6]" id="status">
                {isConnected ? 'Connected' : 'Disconnected'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
