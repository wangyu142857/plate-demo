import React, { useRef } from 'react';
import { cn } from '@udecode/cn';
import { Plate } from '@udecode/plate-common';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Editor } from '@/components/plate-ui/editor';
import { plugins } from '@/lib/plate/plate-plugins';
import { TooltipProvider } from '@/components/plate-ui/tooltip';
// import { CommentsPopover } from '@/components/plate-ui/comments-popover';
// import { CursorOverlay } from '@/components/plate-ui/cursor-overlay';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
// import { MentionCombobox } from '@/components/plate-ui/mention-combobox';

import { IEditorProps } from '@/type';
import '../index.css';

export function HiRichEditor(props: IEditorProps) {
  const containerRef = useRef(null);
  const { initialValue, onChange } = props;

  return (
    <TooltipProvider
      disableHoverableContent
      delayDuration={500}
      skipDelayDuration={0}
    >
      <DndProvider backend={HTML5Backend}>
        {/* <CommentsProvider users={commentsUsers} myUserId={myUserId}> */}
        <Plate plugins={plugins} initialValue={initialValue} onChange={(val) => {
          onChange && onChange(val)
        }}>
          <div
            ref={containerRef}
            className={cn(
              'relative',
              'border',
              // Block selection
              '[&_.slate-start-area-left]:!w-3 [&_.slate-start-area-right]:!w-3 [&_.slate-start-area-top]:!h-4'
            )}
          >
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor
              autoFocus
              focusRing={false}
              variant="ghost"
              size="md"
              className={cn(
                'px-8',
                // 'px-[96px]',
              )}
            />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>

            {/* <MentionCombobox items={MENTIONABLES} /> */}

            {/* <CommentsPopover /> */}

            {/* <CursorOverlay containerRef={containerRef} /> */}
          </div>
        </Plate>
        {/* </CommentsProvider> */}
      </DndProvider>
    </TooltipProvider>
  );
}
