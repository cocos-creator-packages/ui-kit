'use strict';

Editor.registerElement({
  behaviors: [EditorUI.focusable],

  properties: {
    min: {
      type: Number,
      value: 0,
    },

    max: {
      type: Number,
      value: 100,
    },

    value: {
      type: Number,
      value: 50,
      notify: true,
      observer: '_valueChanged'
    },

    nofocus: {
      type: Boolean,
      value: false,
      notify: true,
      reflectToAttribute: true,
    },

    precision: {
      type: Number,
      value: 2,
    },
  },

  ready () {
    this.noNavigate = this.nofocus;
    this._initFocusable(this.$.focus);
  },

  _valueChanged () {
    this.value = Math.clamp( this.value, this.min, this.max );
    this.value = parseFloat(this.value.toFixed(this.precision));

    this.$.nubbin.style.left = (this.value - this.min)/(this.max - this.min) * 100 + '%';
  },

  _onKeyDown (event) {
    // left-arrow
    if ( event.keyCode === 37 ) {
      event.stopPropagation();
      event.preventDefault();

      this.value -= 1;
    }
    // right-arrow
    else if ( event.keyCode === 39 ) {
      event.stopPropagation();
      event.preventDefault();

      this.value += 1;
    }
  },

  _onKeyUp () {
    this.async(() => {
      this.fire('end-editing');
    },1);
  },

  _onMouseDown (event) {
    EditorUI.addDragGhost('ew-resize');
    var rect = this.$.track.getBoundingClientRect();
    var mouseDownX = rect.left;

    var updateMouseMove = event => {
      var offsetX = (event.clientX - mouseDownX)/this.$.track.clientWidth;

      offsetX = Math.max( Math.min( offsetX, 1.0 ), 0.0 );
      this.value = this.min + offsetX * (this.max - this.min);

      event.stopPropagation();
    };
    updateMouseMove(event);

    var mouseMoveHandle = updateMouseMove;
    var mouseUpHandle = () => {
      document.removeEventListener('mousemove', mouseMoveHandle);
      document.removeEventListener('mouseup', mouseUpHandle);
      EditorUI.removeDragGhost();

      this.async(() => {
        this.fire('end-editing');
      },1);
    };
    document.addEventListener ( 'mousemove', mouseMoveHandle );
    document.addEventListener ( 'mouseup', mouseUpHandle );
  },

  _toFixed (value, precision) {
    return parseFloat(value.toFixed(precision));
  },
});
