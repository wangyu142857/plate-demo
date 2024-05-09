import React, { useRef, useEffect } from 'react';
import { cn } from '@udecode/cn';
import {
  withHOC,
  Plate,
  PlateController,
  usePlateActions,
  useReplaceEditor,
  Value,
} from '@udecode/plate-common';
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

export const PlateEditor = withHOC(PlateController, (props: IEditorProps) => {
  const containerRef = useRef(null);
  const { value, id, initialValue, onChange, ...rest } = props;
  const innerValueRef = useRef<Value | null>(null);
  const setValue = usePlateActions(id).value();
  const replaceEditor = useReplaceEditor();
  useEffect(() => {
    if (
      value &&
      JSON.stringify(value) !== JSON.stringify(innerValueRef.current)
    ) {
      replaceEditor();
      setValue(value);
    }
  }, [value]);

  return (
    <TooltipProvider
      disableHoverableContent
      delayDuration={500}
      skipDelayDuration={0}
    >
      <DndProvider backend={HTML5Backend}>
        {/* <CommentsProvider users={commentsUsers} myUserId={myUserId}> */}
        <Plate
          plugins={plugins}
          initialValue={initialValue}
          onChange={(val) => {
            if (JSON.stringify(value) === JSON.stringify(val)) {
              return;
            }
            innerValueRef.current = val;
            onChange && onChange(val);
          }}
        >
          <div
            ref={containerRef}
            className={cn(
              'relative',
              'border',
              // Block selection
              '[&_.slate-start-area-left]:!w-3 [&_.slate-start-area-right]:!w-3 [&_.slate-start-area-top]:!h-4'
            )}
          >
            {!rest?.readOnly ? (
              <div
                className={`${rest?.disabledToolbar ? 'toolbar-readOnly' : ''}`}
              >
                <FixedToolbar className="fixed-toolbar">
                  <FixedToolbarButtons />
                </FixedToolbar>
              </div>
            ) : null}

            <Editor
              autoFocus
              focusRing={false}
              variant="ghost"
              size="md"
              {...rest}
            />
            {!rest?.readOnly ? (
              <FloatingToolbar className="float-toolbar">
                <FloatingToolbarButtons />
              </FloatingToolbar>
            ) : null}

            {/* <MentionCombobox items={MENTIONABLES} /> */}

            {/* <CommentsPopover /> */}

            {/* <CursorOverlay containerRef={containerRef} /> */}
          </div>
        </Plate>
        {/* </CommentsProvider> */}
      </DndProvider>
    </TooltipProvider>
  );
});
