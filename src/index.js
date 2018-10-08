import loadComponents from './components';
import loadBlocks from './blocks';

export default (editor, opts = {}) => {
  const options = { ...{
    // The ID used to create tooltip block and component
    id: 'tooltip',

    // Label of the tooltip block
    blockLabel: 'Tooltip',

    // Object to extend the default tooltip block, eg. { label: 'Tooltip', category: 'Extra', ... }.
    // Pass a falsy value to avoid adding the block
    blockTooltip: {},

    // Object to extend the default tooltip properties, eg. `{ name: 'Tooltip', droppable: false, ... }`
    propsTooltip: {},
  },  ...opts };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);

  // TODO Remove
  editor.on('load', () => editor.addComponents(`<div style="margin:100px; padding:25px;">Content loaded from the plugin</div>`, { at: 0 }))
};
