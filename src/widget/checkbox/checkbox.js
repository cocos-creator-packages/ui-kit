'use strict';

Editor.polymerElement({
  behaviors: [Editor.UI.PolymerFocusable,Polymer.IronButtonState],

  listeners: {
    'focus': '_onFocus',
    'blur': '_onBlur',
    'click': '_onClick',
  },

  properties: {
    checked: {
      type: Boolean,
      value: false,
      notify: true,
      reflectToAttribute: true,
    },

    nofocus: {
      type: Boolean,
      value: false,
      notify: true,
      reflectToAttribute: true,
    },

    readonly: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
    },
  },

  ready () {
    this.noNavigate = this.nofocus;
    this._initFocusable(this);
  },

  _onClick ( event ) {
    event.stopPropagation();

    this.checked = !this.checked;
    this.async(() => {
      this.fire('end-editing');
    },1);
  },
});
