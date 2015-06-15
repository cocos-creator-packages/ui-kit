Polymer({
    is: 'editor-unit-input',

    behaviors: [EditorUI.focusable, Polymer.IronValidatableBehavior],

    listeners: {
        'keyup': '_onKeyUp',
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
            observer: 'valueChanged',
        },

        _inputValue: {
            type: String,
            notify: true,
            value: '0',
        },

        inputValue: {
            type: Number,
            notify: true,
            value: 0,
            observer: 'inputValueChanged',
        },

        step: {
            type: Number,
            notify: true,
            value: 1,
        },

        min: {
            type: Number,
            notify: true,
            value: null,
        },

        max: {
            type: Number,
            notify: true,
            value: null,
        }
    },

    created: function () {
        this.lastTrueValue = 0;
    },

    ready: function () {
        this._initFocusable(this.$.input);
        this._updateMinMax();
    },

    attached: function () {
        this.value = this.inputValue = this._convert(this._inputValue);
    },

    _updateMinMax: function () {
        this._min = (this.min!==null) ? parseFloat(this.min) : -Number.MAX_VALUE;
        this._max = (this.max!==null) ? parseFloat(this.max) : Number.MAX_VALUE;
    },

    inputValueChanged: function () {
        this._inputValue = this.inputValue.toString();
        this.fire('input-changed');
    },

    valueChanged: function () {
        this.value = this._convert(this.value);
        this._inputValue = this._convert(this.value).toString();
    },

    confirm: function () {
        this.value = this._convert(this._inputValue);
        this.inputValue = this._convert(this._inputValue);
        this._inputValue = this.value.toString();
    },

    cancel: function() {
        this._inputValue = this.value.toString();
    },

    _onKeyDown: function (event) {
        // keydown 'enter'
        if (event.keyCode === 13) {
            if (this.value !== this._inputValue) {
                this.confirm();
            }
            this.setBlur();
            EditorUI.focusParent(this);
        }
        // keydown 'esc'
        else if (event.keyCode === 27) {
            this.cancel();
            this.setBlur();
            EditorUI.focusParent(this);
        }
        // keydown 'up'
        else if (event.keyCode === 38) {
            event.preventDefault();
            this._stepUp();
        }
        // keydown 'down'
        else if (event.keyCode === 40) {
            event.preventDefault();
            this._stepDown();
        }
    },

    _onKeyUp: function (event) {
        if (event.keyCode === 38 || event.keyCode === 40) {
            this.confirm();
            this.fire('changed');
        }
    },

    _stepUp: function () {
        if (this._nullToFloat(this._inputValue) + this.step >= this._max) {
            this._inputValue = this._max;
        }
        else {
            this._inputValue = this._nullToFloat(this._inputValue) + this.step;
        }
    },

    _stepDown: function () {
        if (this._nullToFloat(this._inputValue) - this.step <= this._min) {
            this._inputValue = this._min;
        }else {
            this._inputValue = this._nullToFloat(this._inputValue) - this.step;
        }
    },

    _increase: function (event) {
        this.timeoutID = setTimeout( function () {
            this.holdingID = setInterval( function () {
                this._stepUp();
            }.bind(this), 50);
        }.bind(this), 500 );
    },

    _decrease: function (event) {
        this.timeoutID = setTimeout( function () {
            this.holdingID = setInterval( function () {
                this._stepDown();
            }.bind(this), 50);
        }.bind(this), 500 );
    },

    _stopRoll: function () {
        clearInterval(this.holdingID);
        this.holdingID = null;

        clearTimeout(this.timeoutID);
        this.timeoutID = null;

        setTimeout(function() {
            this.confirm();
            this.fire('changed');
        }.bind(this), 1);
    },

    _convert: function ( val ) {
        if (val === '' || isNaN(val)) {
            return this.lastTrueValue;
        }
        val = parseFloat(parseFloat(val));
        if ( isNaN(val) )
            val = 0;
        if (this._min && this._max) {
            val = Math.min( Math.max( val, this._min ), this._max );
        }
        this.lastTrueValue = val;
        return val;
    },

    _nullToFloat: function (val) {
        if (!val) {
            return 0;
        }
        if ( isNaN(val) )
            return 0;
        return parseFloat(val);
    },

    _onBindValueChanged: function () {
        if (this.inputValue === this._convert(this._inputValue)) {
            this.fire('input-changed');
            return;
        }
        this.inputValue = this._convert(this._inputValue);
    },

    _onChange: function () {
        this.confirm();
        this.fire('changed');
    },

});
