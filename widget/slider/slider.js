Editor.registerWidget( 'editor-slider', {
    is: 'editor-slider',

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
    },

    ready: function () {
        this.noNavigate = this.nofocus;
        this._initFocusable(this.$.focus);
    },

    _valueChanged: function () {
        this.value = Math.clamp( this.value, this.min, this.max );
        this.value = parseFloat(parseFloat(this.value).toFixed(2));

        this.$.nubbin.style.left = (this.value-this.min)/(this.max-this.min) * 100 + '%';
    },

    _onKeyDown: function ( event ) {
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

    _onMouseDown: function (event) {
        EditorUI.addDragGhost('pointer');

        var rect = this.$.track.getBoundingClientRect();
        var mouseDownX = rect.left;

        var updateMouseMove = function (event) {
            var offsetX = (event.clientX - mouseDownX)/this.$.track.clientWidth;

            offsetX = Math.max( Math.min( offsetX, 1.0 ), 0.0 );
            this.value = this.min + offsetX * (this.max - this.min);

            event.stopPropagation();
        };
        updateMouseMove.call(this,event);

        var mouseMoveHandle = updateMouseMove.bind(this);
        var mouseUpHandle = (function(event) {
            document.removeEventListener('mousemove', mouseMoveHandle);
            document.removeEventListener('mouseup', mouseUpHandle);
            EditorUI.removeDragGhost();
        }).bind(this);
        document.addEventListener ( 'mousemove', mouseMoveHandle );
        document.addEventListener ( 'mouseup', mouseUpHandle );
    },
});
