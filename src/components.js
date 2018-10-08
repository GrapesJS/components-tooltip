export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const cssc = editor.CssComposer;
  const { id, labelTooltip, propsTooltip, attrTooltip, classTooltip } = opts;
  const attrTooltipVis = `${attrTooltip}-visible`;
  const attrTooltipPos = `${attrTooltip}-pos`;
  const attrTooltipLen = `${attrTooltip}-length`;

  const createCssStyles = () => {
    let css = `
      .${classTooltip},
      [${attrTooltip}] {
        position: relative;
        cursor: pointer;
        width: 50px;
        height: 50px;
      }

      .${classTooltip}__body,
      [${attrTooltip}]::after {
        font-family: Helvetica, sans-serif;
        background: rgba(55, 61, 73, 0.9);
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
        padding: 0.6rem 1rem;
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
    `;
    const added = cssc.getAll().add(css);
    console.log('Added', added);
  }

  dc.addType(id, {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        name: labelTooltip,
        classes: [classTooltip],
        attributes: {
          [attrTooltip]: labelTooltip,
        },
        traits: [
          {
            name: attrTooltip,
            label: 'Text',
          }, {
            name: `${attrTooltipPos}`,
            label: 'Position',
            type: 'select',
            options: [
              'top',
              'right',
              'bottom',
              'left',
            ]
          }, {
            name: `${attrTooltipLen}`,
            label: 'Lenght',
            type: 'select',
            options: [
              { value: '', name: 'One line' },
              { value: 'small', name: 'Small' },
              { value: 'medium', name: 'Medium' },
              { value: 'large', name: 'Large' },
              { value: 'fit', name: 'Fit' },
            ]
          }, {
            name: `${attrTooltipVis}`,
            label: 'Visible',
            type: 'checkbox',
          }
        ],
        ...propsTooltip,
      },

      init() {
        !cssc.getClassRule(classTooltip) && createCssStyles();
      },
    }, {
      isComponent(el) {
        if (el.hasAttribute && el.hasAttribute(attrTooltip)) {
          return { type: id };
        }
      }
    }),
    view: defaultView,
  });
}
