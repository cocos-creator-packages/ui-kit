'use strict';

Editor.registerElement({

  behaviors: [EditorUI.focusable, Polymer.IronValidatableBehavior],

  listeners: {
    'keydown': '_onKeyDown',
    'focused-changed': '_onFocusedChanged'
  },

  properties: {
    invalid: {
      type: Boolean,
      value: false
    },

    value: {
      type: Number,
      notify: true,
      value: 0,
      observer: '_valueChanged',
    },

    inputValue: {
      type: Number,
      notify: true,
      value: 0,
      observer: '_inputValueChanged',
    },

    step: {
      type: Number,
      notify: true,
      value: 1,
    },

    min: {
      type: Number,
      notify: true,
      value: -Number.MAX_VALUE,
    },

    max: {
      type: Number,
      notify: true,
      value: Number.MAX_VALUE,
    },

    hint: {
      type: String,
      value: '',
    },

    precision: {
      type: Number,
      value: 2,
    },

    readonly: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
    },
  },

  created () {
    this._lastValidValue = 0;
    this._inited = false;
  },

  ready () {
    this._initFocusable(this.$.input);

    this.value = this._convert(this.value);
    this.inputValue = this.value;
    this.$.input.bindValue = this.value.toString();

    if (!this.hint) {
      this.$.hint.hidden = true;
    }
    else {
      this.$.hint.hidden = false;
    }

    this._inited = true;
  },

  _inputValueChanged () {
    this.$.input.bindValue = this._convert(this.inputValue).toString();
  },

  _valueChanged () {
    this.value = this._convert(this.value);
    if (this.min !== undefined && this.max !== undefined) {
      this.value = Math.clamp(this._convert(this.value),this.min,this.max);
    }
    this.inputValue = this.value;
    this.$.input.bindValue = this._convert(this.value).toString();
  },

  confirm () {
    this.value = this._convert(this.$.input.bindValue);
    this.inputValue = this.value;
    this.$.input.bindValue = this.value.toString();
    this.fire('confirm', null, {bubbles: false} );

    this.async(() => {
      this.fire('end-editing');
    },1);
  },

  cancel() {
    this.$.input.bindValue = this.value.toString();
    this.fire('cancel', null, {bubbles: false} );

    this.async(() => {
      this.fire('end-editing', {cancel: true});
    },1);
  },

  _onKeyDown (event) {
    // keydown 'enter'
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();

      this.confirm();
      this.setBlur();
      EditorUI.focusParent(this);
    }
    // keydown 'esc'
    else if (event.keyCode === 27) {
      event.preventDefault();
      event.stopPropagation();

      this.cancel();
      this.setBlur();
      EditorUI.focusParent(this);
    }
  },

  _onInputKeyDown (event) {

    // keydown 'up'
    if (event.keyCode === 38) {
      event.preventDefault();
      if (this.readonly) {
        return;
      }
      this._stepUp();
    }
    // keydown 'down'
    else if (event.keyCode === 40) {
      event.preventDefault();
      if (this.readonly) {
        return;
      }
      this._stepDown();
    }
  },

  _onIncreaseClick ( event ) {
    event.stopPropagation();
    // event.preventDefault();

    this._stepUp();
  },

  _onDecreaseClick ( event ) {
    event.stopPropagation();
    // event.preventDefault();

    this._stepDown();
  },

  _stepUp () {
    if (this._nullToFloat(this.$.input.bindValue) + this.step >= this.max) {
      this.$.input.bindValue = this.max.toString();
    } else {
      this.$.input.bindValue = (this._nullToFloat(this.$.input.bindValue) + this.step).toFixed(this.precision);
    }
  },

  _stepDown () {
    if (this._nullToFloat(this.$.input.bindValue) - this.step <= this.min) {
      this.$.input.bindValue = this.min.toString();
    } else {
      this.$.input.bindValue = (this._nullToFloat(this.$.input.bindValue) - this.step).toFixed(this.precision);
    }
  },

  _onIncrease (event) {
    event.stopPropagation();
    event.preventDefault();

    this.setFocus();

    this._timeoutID = setTimeout(() => {
      this._holdingID = setInterval(() => {
        this._stepUp();
      }, 50);
    }, 500);
  },

  _onDecrease: function (event) {
    event.stopPropagation();
    event.preventDefault();

    this.setFocus();

    this._timeoutID = setTimeout(() => {
      this._holdingID = setInterval(() => {
        this._stepDown();
      }, 50);
    }, 500);
  },

  _onStopRoll ( event ) {
    event.stopPropagation();

    clearInterval(this._holdingID);
    this._holdingID = null;

    clearTimeout(this._timeoutID);
    this._timeoutID = null;

    setTimeout(() => {
      this.confirm();
    }, 1);
  },

  _onHintMounseDown: function ( event ) {
    event.preventDefault();
    event.stopPropagation();

    var lastValue = this.inputValue;
    EditorUI.startDrag('ew-resize', event, (event, dx, dy, offsetx, offsety) => {
      this.inputValue = Math.clamp(lastValue + offsetx * this.step,this.min,this.max);
    }, () => {
      this.confirm();
    });
    this.setFocus();
  },

  _convert ( val, noFixedPrecision ) {
    if (val === '' || isNaN(val)) {
      return this._lastValidValue;
    }
    val = parseFloat(parseFloat(val));
    if ( isNaN(val) )
      val = 0;
    if (this.min && this.max) {
      val = Math.min( Math.max( val, this.min ), this.max );
    }

    if ( noFixedPrecision ) {
      val = parseFloat(val);
    }
    else {
      val = parseFloat(val.toFixed(this.precision));
    }
    this._lastValidValue = val;

    return val;
  },

  _nullToFloat (val) {
    if (!val) {
      return 0;
    }

    if ( isNaN(val) ) {
      return 0;
    }

    return parseFloat(val);
  },

  _onBindValueChanged () {
    if ( !this._inited ) {
      return;
    }

    this.inputValue = this._convert(this.$.input.bindValue,true);
  },

  _onFocusedChanged (event) {
    if ( !this._inited ) {
      return;
    }

    if ( event.detail.value ) {
      this.value = this.inputValue;
    } else {
      this.confirm();
    }
  },
});
