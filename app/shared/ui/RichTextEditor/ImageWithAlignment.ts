// extensions/ImageWithAlignment.ts
import { Image } from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/core';

export const ImageWithAlignment = Image.extend({
  name: 'image',

  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: 'center',
        renderHTML: attributes => {
          return {
            style: `display: block; margin: ${
              attributes.align === 'center'
                ? '0 auto'
                : attributes.align === 'right'
                ? '0 0 0 auto'
                : '0'
            };`,
          };
        },
        parseHTML: element => {
          const style = element.getAttribute('style') || '';
          if (style.includes('margin: 0 auto')) return 'center';
          if (style.includes('margin: 0 0 0 auto')) return 'right';
          if (style.includes('margin: 0')) return 'left';
          return 'center';
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
});
