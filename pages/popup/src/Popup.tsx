import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { cn, ErrorDisplay, LoadingSpinner } from '@extension/ui';
import { Switch } from '@extension/ui/dist/lib/components/Switch';
import { useEffect, useState } from 'react';

const Popup = () => {
  const { isLight } = useStorage(exampleThemeStorage);
  const [url, setUrl] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [texts, setTexts] = useState<string[]>([]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
      const currentTab = tabs[0];

      if (currentTab?.url) {
        setUrl(currentTab.url);

        const [result] = await chrome.scripting.executeScript({
          target: { tabId: currentTab.id! },
          func: () => {
            const images = Array.from(document.querySelectorAll('img'))
              .map(img => img.src)
              .filter(src => src.length > 0);
            const texts = Array.from(document.querySelectorAll('span'))
              .map(el => el.textContent?.trim())
              .filter(Boolean);
            return { images, texts };
          },
        });

        if (result?.result) {
          setImages(result.result.images);
          setTexts(result.result.texts as string[]);
        }
      }
    });
  }, []);

  return (
    <div className={cn('App', isLight ? 'bg-slate-50' : 'bg-gray-800')}>
      <div className="flex max-w-full flex-col gap-4 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-mono text-xl font-semibold text-black">Parser Extensions</h1>
        </div>

        <div className="flex items-center justify-between rounded-full bg-zinc-100 px-6 py-4 font-mono text-sm font-medium text-black">
          <span className="truncate">{url}</span>
          <Switch />
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <LoadingSpinner />), ErrorDisplay);
