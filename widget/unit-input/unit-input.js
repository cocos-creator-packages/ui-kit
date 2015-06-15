Polymer({
    is: 'editor-unit-input',

    behaviors: [EditorUI.focusable, Polymer.IronValidatableBehavior],

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
        if (this.$.input.bindValue === '') {
            this.$.input.bindValue = '0';
        }
    },

    attached: function () {
        this.value = this.inputValue = this._convert(this.$.input.bindValue);
    },

    _updateMinMax: function () {
        this._min = (this.min!==null) ? parseFloat(this.min) : -Number.MAX_VALUE;
        this._max = (this.max!==null) ? parseFloat(this.max) : Number.MAX_VALUE;
    },

    inputValueChanged: function () {
        this.$.input.bindValue = this.inputValue.toString();
        this.fire('input-changed');
    },

    valueChanged: function () {
        this.value = this._convert(this.value);
        this.$.input.bindValue = this._convert(this.value).toString();
    },

    confirm: function () {
        this.value = this._convert(this.$.input.bindValue);
        this.inputValue = this._convert(this.$.input.bindValue);
        this.$.input.bindValue = this.value.toString();
    },

    cancel: function() {
        this.$.input.bindValue = this.value.toString();
        this.fire('changed');
    },

    _onKeyDown: function (event) {
        // keydown 'enter'
        if (event.keyCode === 13) {
            if (this.value !== this.$.input.bindValue) {
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

    _stepUp: function () {
        if (this._nullToFloat(this.$.input.bindValue) + this.step >= this._max) {
            this.$.input.bindValue = this._max;
        }
        else {
            this.$.input.bindValue = this._nullToFloat(this.$.input.bindValue) + this.step;
        }
    },

    _stepDown: function () {
        if (this._nullToFloat(this.$.input.bindValue) - this.step <= this._min) {
            this.$.input.bindValue = this._min;
        }
        else {
            this.$.input.bindValue = this._nullToFloat(this.$.input.bindValue) - this.step;
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
        if (this.value === this._convert(this.$.input.bindValue)) {
            this.fire('input-changed');
            return;
        }
        this.inputValue = this._convert(this.$.input.bindValue);
    },

    _onChange: function () {
        this.confirm();
        this.fire('changed');
    },
});
