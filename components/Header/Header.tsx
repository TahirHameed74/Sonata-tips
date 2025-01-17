'use client';
import ClaimAirdropButton from '@/components/ClaimAirdropButton/ClaimAirdropButton';
import SignInButton from '@/components/SignInButton';
import Tabs from '@/components/Tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CHANNELS, tabs } from '@/lib/consts';
import { cn } from '@/lib/utils';
import { useFeedProvider } from '@/providers/FeedProvider';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useTipProvider } from '@/providers/TipProvider';
import { useUi } from '@/providers/UiProvider';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useParams } from 'next/navigation';
import Profile from '../Profile';
import { Separator } from '../ui/separator';
import HomeButton from './HomeButton';
import UserMenu from './UserMenu';
import ChannelDetails from '../ChannelDetails';
import { useMemo } from 'react';

const Header = () => {
  const { user, loading: userLoading } = useNeynarProvider();
  const { feedType } = useFeedProvider();
  const { menuOpen, setMenuOpen } = useUi();
  const { airdropBalance } = useTipProvider();
  const { username, hash, channelId } = useParams();
  const channelImage = useMemo(() => CHANNELS.find(({ value }) => value === channelId)?.icon ?? '', [channelId]);

  return (
    <header>
      <div
        style={channelId ? { backgroundImage: `url("${channelImage}")`, boxShadow: 'inset 0 0 0 1000px #141a1eb2' } : undefined}
        className={channelId ? 'h-[10.75rem] bg-cover bg-center bg-no-repeat pt-12' : 'pt-2 md:pt-6'}>
        <div className='container flex items-center justify-between md:justify-end'>
          <Button variant="link" className={cn("p-0 text-5xl md:hidden", channelId && 'text-white')}>
            <HamburgerMenuIcon onClick={() => setMenuOpen(!menuOpen)} className="size-6" />
          </Button>
          {(username || channelId) && <HomeButton className={cn('mr-auto max-md:hidden', channelId && 'text-white')} />}
          {userLoading ? (
            <Skeleton className="size-9 rounded-full" />
          ) : user ? (
            <div className="flex items-center gap-2">
              {airdropBalance > 0 && <ClaimAirdropButton />}
              <UserMenu />
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
      <div className='container'>
        {channelId && <ChannelDetails image={channelImage} channelId={channelId as string} />}
        {username && !hash && <Profile />}
        {feedType && (
          <Tabs tabs={tabs} className={!(username || channelId) ? 'justify-center' : ''} />
        )}
        <Separator className="-mt-px bg-grey-light" />
      </div>
    </header>
  );
};

export default Header;
