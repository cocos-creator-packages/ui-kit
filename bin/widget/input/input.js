'use strict';

Editor.polymerElement({
  behaviors: [Editor.UI.PolymerFocusable, Polymer.IronValidatableBehavior],

  listeners: {
    'focused-changed': '_onFocusedChanged',
  },

  properties: {
    placeholder: {
      type: String,
      notify: true,
      value: ''
    },

    invalid: {
      type: Boolean,
      value: false
    },

    inputValue: {
      type: String,
      notify: true,
      value: '',
    },

    value: {
      type: String,
      notify: true,
      value: '',
      observer: '_valueChanged'
    },

    readonly: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
    },

    cancelable: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    type: {
      type: String,
      value: 'text'
    }
  },

  ready () {
    this._initFocusable(this.$.input);
  },

  _valueChanged () {
    this.inputValue = this.value;
  },

  clear () {
    this.value = '';
    this.inputValue = '';
    this.confirm();
  },

  confirm ( pressEnter ) {
    this.value = this.inputValue;
    this.fire('confirm', {
      confirmByEnter: pressEnter,
    }, {
      bubbles: false
    });

    this.async(() => {
      this.fire('end-editing');
    },1);
  },

  cancel() {
    this.inputValue = this.value;
    this.fire('cancel', null, {bubbles: false} );

    this.async(() => {
      this.fire('end-editing', {cancel: true});
    },1);
  },

  select ( start, end ) {
    if ( typeof start === 'number' && typeof end === 'number' ) {
      this.$.input.setSelectionRange( start, end );
    }
    else {
      this.$.input.select();
    }
  },

  _onKeyDown (event) {
    // keydown 'enter'
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();

      this.confirm(true);
      this.setBlur();
      Editor.UI._focusParent(this);
    }
    // keydown 'esc'
    else if (event.keyCode === 27) {
      event.preventDefault();
      event.stopPropagation();

      this.cancel();
      this.setBlur();
      Editor.UI._focusParent(this);
    }
  },

  _onFocusedChanged ( event ) {
    this._lastFocused = event.detail.value;

    setTimeout(() => {
      if ( !this._lastFocused ) {
        this.confirm();
      }
    },1);
  },

  _checkCancelable (inputValue) {
    return this.cancelable && inputValue;
  },

  _onClear ( event ) {
    event.preventDefault();
    event.stopPropagation();
    this.fire('clear', null, {bubbles: false} );
    this.inputValue = '';
    this.confirm();
  }

});
