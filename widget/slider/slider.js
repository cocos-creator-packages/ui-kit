Editor.registerWidget( 'editor-slider', {
    is: 'editor-slider',

    behaviors: [EditorUI.focusable],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur'
    },

    properties: {
        min: {
            type: Number,
            value: 0,
            observer: '_updateMinMax'
        },

        max: {
            type: Number,
            value: 100,
            observer: '_updateMinMax'
        },

        value: {
            type: Number,
            value: 0,
            notify: true,
            observer: '_updateValue'
        },

        type: {
            type: String,
            value: 'float',
            observer: '_updateValue'
        },

        percent: {
            type: Number,
            value: 0
        },

        disabled: {
            type: Boolean,
            value: false,
            observer: '_disabledChanged'
        },
    },

    ready: function () {
        this.noNavigate = this.nofocus;
        this._initFocusable(this);
        this._updateMinMax();
    },

    _updateValue: function () {
        this.value = Math.clamp(this.value,this.min,this.max);
        if (this.type === 'int') {
            this.value = parseInt(this.value);
        }
        else {
            this.value = parseFloat(parseFloat(this.value).toFixed(3));
        }
        this.$.unitinput.inputValue = this.value;
        this.$.plan.style.left = this.value/this.max * 100 + "%";
    },

    _updateMinMax: function () {
        switch ( this.type ) {
            case 'int':
                this._min = (this.min!==null) ? parseInt(this.min) : Number.NEGATIVE_INFINITY;
                this._max = (this.max!==null) ? parseInt(this.max) : Number.POSITIVE_INFINITY;
                break;

            case 'float':
                this._min = (this.min!==null) ? parseFloat(this.min) : -Number.MAX_VALUE;
                this._max = (this.max!==null) ? parseFloat(this.max) : Number.MAX_VALUE;
                break;
        }
        this.$.unitinput.min = this._min;
        this.$.unitinput.max = this._max;
    },

    mousedownAction: function (event) {
        EditorUI.addDragGhost("pointer");
        var rect = this.$.base.getBoundingClientRect();
        var mouseDownX = rect.left;

        var updateMouseMove = function (event) {
            this.percent= (event.clientX - mouseDownX)/this.$.base.clientWidth;

            this.percent = Math.max( Math.min( this.percent, 1.0 ), 0.0 );
            if (this.type === 'int') {
                this.percent = (Math.round(this.percent * this._max) / this._max);
            }
            this.value = this.percent * this._max;
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

    _disabledChanged: function () {
        this.$.unitinput.disabled = this.disabled;
    },
});
