'use strict';

Editor.polymerElement({
  properties: {
    value: {
      type: Number,
      value: 0,
      notify: true,
      observer: '_valueChanged'
    },
    state: {
      type: String,
      value: 'normal', // 'normal', 'failed' and 'succeed'
      reflectToAttribute: true,
    },
    _noAnimate: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
    },
  },

  reset () {
    this.state = 'normal';
    this._noAnimate = true;

    window.requestAnimationFrame(() => {
      this.value = 0.0;
      this.async(() => {
        this._noAnimate = false;
      },1);
    });
  },

  _valueChanged () {
    this.value = Editor.Math.clamp(this.value,0,1);
    if ( Editor.Math.clamp((this.value * 100).toFixed(2),0,100) >= 100 ) {
      this.state = 'succeed';
    }
    else {
      this.state = 'normal';
    }
    this.$.progress.style.width = Editor.Math.clamp(this.value * 100,0,100) + '%';
  },

  _valueText (value) {
    return parseFloat( Editor.Math.clamp((value * 100).toFixed(2),0,100));
  },
});
