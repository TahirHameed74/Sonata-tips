'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useUi } from '@/providers/UiProvider';
import Header from '@/components/Header';
import GlobalPlayer from '@/components/GlobalPlayer';
import CreatePost from '@/components/CreatePost';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import FeedProvider from '@/providers/FeedProvider';
import ProfileProvider from '@/providers/ProfileProvider';
import { useParams } from 'next/navigation';
import TipsList from '@/components/TipsList';

export default function FeedLayout({ children }: { children: ReactNode }) {
  const { menuOpen, setMenuOpen } = useUi();
  const { username, channelId } = useParams();
  const { user } = useNeynarProvider();

  return (
    <ProfileProvider>
      <FeedProvider>
        <TipsList />
        <div className="flex grow flex-col">
          <meta property="of:accepts:xmtp" content="2024-02-01" />
          <div className="flex grow">
            <nav className="md:hidden">
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetContent side="left">
                  <Sidebar />
                </SheetContent>
              </Sheet>
            </nav>

            <nav className="shadow-xl max-md:hidden">
              <Sidebar />
            </nav>

            <main className="flex grow flex-col">
              <Header />
              <div className="relative min-h-[600px] grow">
                <div
                  className="absolute left-0 top-0 size-full overflow-scroll pt-4"
                  id="feed-container"
                >
                  <div className="container mx-auto max-w-3xl space-y-6">
                    {user && !username && !channelId && <CreatePost />}
                    {children}
                  </div>
                </div>
              </div>
            </main>
          </div>

          <GlobalPlayer />
        </div>
      </FeedProvider>
    </ProfileProvider>
  );
}
