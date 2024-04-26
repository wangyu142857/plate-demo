import React from 'react';
import { cn, withRef } from '@udecode/cn';
import { PlateElement, withHOC } from '@udecode/plate-common';
import {
  ELEMENT_MEDIA_EMBED,
  parseTwitterUrl,
  parseVideoUrl,
  useMediaState,
} from '@udecode/plate-media';
import { ResizableProvider, useResizableStore } from '@udecode/plate-resizable';
// import LiteYouTubeEmbed from 'react-lite-youtube-embed';
// import { Tweet } from 'react-tweet';

import { Caption, CaptionTextarea } from './caption';
import { MediaPopover } from './media-popover';
import {
  mediaResizeHandleVariants,
  Resizable,
  ResizeHandle,
} from './resizable';

export const MediaEmbedElement = withHOC(
  ResizableProvider,
  withRef<typeof PlateElement>(({ className, children, ...props }, ref) => {
    const {
      align = 'center',
      focused,
      selected,
      embed,
      isTweet,
      isVideo,
    } = useMediaState({
      urlParsers: [parseTwitterUrl, parseVideoUrl],
    });
    const width = useResizableStore().get.width();
    const provider = embed?.provider;

    return (
      <MediaPopover pluginKey={ELEMENT_MEDIA_EMBED}>
        <PlateElement
          ref={ref}
          className={cn('relative py-2.5', className)}
          {...props}
        >
          <figure className="group relative m-0 w-full" contentEditable={false}>
            <Resizable
              align={align}
              options={{
                align,
                maxWidth: isTweet ? 550 : '100%',
                minWidth: isTweet ? 300 : 100,
              }}
            >
              <ResizeHandle
                options={{ direction: 'left' }}
                className={mediaResizeHandleVariants({ direction: 'left' })}
              />

              {isVideo ? (
                <div
                  className={cn(
                    provider === 'vimeo' && 'pb-[75%]',
                    provider === 'youku' && 'pb-[56.25%]',
                    provider === 'dailymotion' && 'pb-[56.0417%]',
                    provider === 'coub' && 'pb-[51.25%]'
                  )}
                >
                  <iframe
                    className={cn(
                      'absolute left-0 top-0 size-full rounded-sm',
                      isVideo && 'border-0',
                      focused && selected && 'ring-2 ring-ring ring-offset-2'
                    )}
                    src={embed!.url}
                    title="embed"
                    allowFullScreen
                  />
                </div>
              ) : null}

              <ResizeHandle
                options={{ direction: 'right' }}
                className={mediaResizeHandleVariants({ direction: 'right' })}
              />
            </Resizable>

            <Caption align={align} style={{ width }}>
              <CaptionTextarea placeholder="Write a caption..." />
            </Caption>
          </figure>

          {children}
        </PlateElement>
      </MediaPopover>
    );
  })
);
