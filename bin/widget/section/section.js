'use strict';

Editor.polymerElement({
  behaviors: [Editor.UI.PolymerFocusable],

  listeners: {},

  properties: {
    text: {
      type: String,
      value: ''
    },

    folded: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
    },

    closeable: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
    },

    icon: {
      type: String,
      value: ''
    }
  },

  ready () {
    this._initFocusable(this.$.header);
  },

  _onFoldClick () {
    this.folded = !this.folded;
  },

  _foldClass ( folded ) {
    if (folded) {
      return 'fa fa-caret-right fold flex-none ';
    }

    return 'fa fa-caret-down fold flex-none';
  },

  _iconClass (icon) {
    if (icon) {
      return 'icon';
    }
    return 'hidden';
  },

  _onKeyDown (event) {
    if ( Polymer.dom(event).localTarget !== this ) {
      return;
    }

    // press 'enter' and 'space'
    if (event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault();
      event.stopPropagation();
      this.folded = !this.folded;
    }
    // press left
    else if (event.keyCode === 37) {
      event.preventDefault();
      event.stopPropagation();
      this.folded = true;
    }
    // press right
    else if (event.keyCode === 39) {
      event.preventDefault();
      event.stopPropagation();
      this.folded = false;
    }
  },

  _onCloseClick (event) {
    event.stopPropagation();
    this.fire('close');
  },
 });
