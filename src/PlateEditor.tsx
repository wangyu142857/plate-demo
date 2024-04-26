import React from 'react';
import { Plate, PlateContent } from '@udecode/plate-common';
import { Editor } from '@/components/plate-ui/editor';
import { plugins } from '@/lib/plate/plate-plugins';

import initialValue from '@/mock/base'

export default function PlateEditor() {
  return (
    <Plate initialValue={initialValue} plugins={plugins} onChange={(newValue) => {
      // save newValue...
      console.log('PlateEditor  newValue:', newValue);
    }}
    >
      <Editor placeholder="Type..." />
    </Plate>
  );
}
