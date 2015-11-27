'use strict';

Editor.registerElement({
  behaviors: [EditorUI.focusable,Polymer.IronMultiSelectableBehavior],

  created () {
    this.selectedAttribute = 'selected';
  },

  ready () {
    this.noNavigate = this.nofocus;
    this._initFocusable(this);
  },

  attached () {
    var _minWidth = 0;
    Polymer.dom(this).children.forEach(item => {
      _minWidth += item.getBoundingClientRect().width;
    });
    this.style.minWidth = _minWidth + 2 + 'px';
  },

  _selectionChange () {
    if (this.multi) {
      this.fire('multi-selected-changed');
    }
  },
});
