export default (editor, opts = {}) => {
  const options = {
    // The ID used to create tooltip block and component
    id: 'tooltip',

    // Label of the tooltip. Used for the block and component name
    labelTooltip: 'Tooltip',

    // Object to extend the default tooltip block, eg. { label: 'Tooltip', category: 'Extra', ... }.
    // Pass a falsy value to avoid adding the block
    blockTooltip: {},

    // Object to extend the default tooltip properties, eg. `{ name: 'Tooltip', droppable: false, ... }`
    propsTooltip: {},

    // A function which allows to extend default traits by receiving the original array and returning a new one
    extendTraits: traits => traits,

    // Tooltip attribute prefix
    attrTooltip: 'data-tooltip',

    // Tooltip class prefix
    classTooltip: 'tooltip-component',

    // Custom CSS styles, this will replace the default one
    style: '',

    // Additional CSS styles
    styleAdditional: '',

    // Make all tooltip relative classes private
    privateClasses: 1,

    // Indicate if the tooltip can be styled. You can also pass an array
    // of which proprties can be styled. Eg. `['color', 'background-color']`
    stylableTooltip: [
      'background-color',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'font-family',
      'font-size',
      'font-weight',
      'letter-spacing',
      'color',
      'line-height',
      'text-align',
      'border-radius',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-left-radius',
      'border-bottom-right-radius',
      'border',
      'border-width',
      'border-style',
      'border-color',
    ],

    // If true, force the tooltip to be shown
    showTooltipOnStyle: 1,
    ...opts
  };

  const {
    id,
    labelTooltip,
    propsTooltip,
    attrTooltip,
    classTooltip,
    style,
    styleAdditional,
    privateClasses,
    stylableTooltip,
    showTooltipOnStyle,
    blockTooltip,
    extendTraits,
  } = options;

  // Create block
  if (blockTooltip) {
    editor.BlockManager.add(id, {
      media: `<svg viewBox="0 0 24 24">
          <path d="M4 2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-4l-4 4-4-4H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m0 2v12h4.83L12 19.17 15.17 16H20V4H4z"></path>
        </svg>`,
      label: labelTooltip,
      category: 'Extra',
      select: true,
      content: { type: id },
      ...blockTooltip
    });
  }

  const classTooltipBody = `${classTooltip}__body`;
  const classTooltipEmpty = `${classTooltip}--empty`;
  const attrTooltipVis = `${attrTooltip}-visible`;
  const attrTooltipPos = `${attrTooltip}-pos`;
  const attrTooltipLen = `${attrTooltip}-length`;
  const traitIdStyleTooltip = 'style-tooltip';

  if (privateClasses) {
    editor.SelectorManager.getAll().add([
      { private: 1, name: classTooltip },
      { private: 1, name: classTooltipBody },
      { private: 1, name: classTooltipEmpty },
    ])
  }

  if (showTooltipOnStyle) {
    editor.on('styleManager:update:target', target => {
      const selected = editor.getSelected();

      if (selected) {
        const el = selected.getEl();

        if (selected.is(id) &&
            !selected.getTrait(attrTooltipVis).getTargetValue() &&
            target.getSelectors().getFullString().trim() == `.${classTooltipBody}`) {
              el.setAttribute(attrTooltipVis, 'true');

              editor.once('styleManager:update:target', () => {
                el.removeAttribute(attrTooltipVis);
              })
        }
      }
    })
  }

  // Create component
  editor.Components.addType(id, {
    isComponent: el => el.hasAttribute?.(attrTooltip),
    model: {
      defaults: {
        name: labelTooltip,
        classes: [classTooltip],
        attributes: { [attrTooltip]: labelTooltip },
        styles: (style || `
          .${classTooltip} {
            position: relative;
            display: inline-block;
            vertical-align: top;
          }

          .${classTooltipEmpty} {
            width: 50px;
            height: 50px;
          }

          .${classTooltipBody},
          [${attrTooltip}]::after {
            font-family: Helvetica, sans-serif;
            background: rgba(55, 61, 73, 0.95);
            border-radius: 3px;
            bottom: 100%;
            color: #fff;
            content: attr(${attrTooltip});
            display: block;
            font-size: 12px;
            left: 50%;
            line-height: normal;
            max-width: 32rem;
            opacity: 0;
            overflow: hidden;
            padding: 8px 16px;
            pointer-events: none;
            position: absolute;
            text-overflow: ellipsis;
            transform: translate(-50%, 0);
            transition: opacity 0.25s, transform 0.25s;
            white-space: nowrap;
            box-sizing: border-box;
            z-index: 10;
          }

          [${attrTooltipVis}=true]::after,
          [${attrTooltip}]:focus::after,
          [${attrTooltip}]:hover::after {
            opacity: 1;
            transform: translate(-50%, -0.5rem);
          }

          [${attrTooltipPos}=right]::after {
            bottom: 50%;
            left: 100%;
            transform: translate(0, 50%);
          }

          [${attrTooltipPos}=right]:focus::after,
          [${attrTooltipPos}=right]:hover::after,
          [${attrTooltipVis}=true][${attrTooltipPos}=right]::after {
            transform: translate(0.5rem, 50%);
          }

          [${attrTooltipPos}=bottom]::after {
            bottom: auto;
            top: 100%;
            transform: translate(-50%, 0);
          }

          [${attrTooltipPos}=bottom]:focus::after,
          [${attrTooltipPos}=bottom]:hover::after,
          [${attrTooltipVis}=true][${attrTooltipPos}=bottom]::after {
            transform: translate(-50%, 0.5rem);
          }

          [${attrTooltipPos}=left]::after {
            bottom: 50%;
            left: auto;
            right: 100%;
            transform: translate(0, 50%);
          }

          [${attrTooltipPos}=left]:focus::after,
          [${attrTooltipPos}=left]:hover::after,
          [${attrTooltipVis}=true][${attrTooltipPos}=left]::after {
            transform: translate(-0.5rem, 50%);
          }

          [${attrTooltipLen}=small]::after {
            white-space: normal;
            width: 80px;
          }

          [${attrTooltipLen}=medium]::after {
            white-space: normal;
            width: 150px;
          }

          [${attrTooltipLen}=large]::after {
            white-space: normal;
            width: 300px;
          }

          [${attrTooltipLen}=fit]::after {
            white-space: normal;
            width: 100%;
          }

          // IE 11 bugfix
          button[${attrTooltip}] {
            overflow: visible;
          }
        `) + styleAdditional,
        traits: extendTraits([
          {
            name: attrTooltip,
            label: 'Text',
          }, {
            name: attrTooltipPos,
            label: 'Position',
            type: 'select',
            options: [
              { value: 'top', name: 'Top' },
              { value: 'right', name: 'Right' },
              { value: 'bottom', name: 'Bottom' },
              { value: 'left', name: 'Left' },
            ]
          }, {
            name: attrTooltipLen,
            label: 'Length',
            type: 'select',
            options: [
              { value: '', name: 'One line' },
              { value: 'small', name: 'Small' },
              { value: 'medium', name: 'Medium' },
              { value: 'large', name: 'Large' },
              { value: 'fit', name: 'Fit' },
            ]
          }, {
            name: attrTooltipVis,
            label: 'Visible',
            type: 'checkbox',
            valueTrue: 'true',
          }, {
            name: traitIdStyleTooltip,
            labelButton: 'Style tooltip',
            type: 'button',
            full: true,
            command: (editor) => {
              const openSm = editor.Panels.getButton('views', 'open-sm');
              openSm && openSm.set('active', 1);
              const ruleTooltip = editor.Css.getRules(`.${classTooltipBody}`)[0];
              ruleTooltip.set({ stylable: stylableTooltip });
              editor.StyleManager.select(ruleTooltip);
            },
          },
        ]),
        ...propsTooltip,
      },

      init() {
        this.listenTo(this.components(), 'add remove', this.checkEmpty);
        this.checkEmpty();
      },

      checkEmpty() {
        const empty = !this.components().length;
        this[empty ? 'addClass' : 'removeClass'](`${classTooltipEmpty}`);
      }
    },
  });
};
