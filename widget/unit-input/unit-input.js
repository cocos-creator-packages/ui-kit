Polymer({
    is: 'editor-unit-input',

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
            value: -Number.MAX_VALUE,
        },

        max: {
            type: Number,
            notify: true,
            value: Number.MAX_VALUE,
        }
    },

    created: function () {
        this._lastValidValue = 0;
        this._inited = false;
    },

    ready: function () {
        this._initFocusable(this.$.input);

        this.value = this._convert(this.value);
        this.inputValue = this.value;
        this.$.input.bindValue = this.value.toString();
        this._inited = true;
    },

    inputValueChanged: function () {
        this.$.input.bindValue = this.inputValue.toString();
    },

    valueChanged: function () {
        this.value = this._convert(this.value);
        this.inputValue = this.value;
        this.$.input.bindValue = this._convert(this.value).toString();
    },

    confirm: function () {
        this.value = this._convert(this.$.input.bindValue);
        this.inputValue = this._convert(this.$.input.bindValue);
        this.$.input.bindValue = this.value.toString();
    },

    cancel: function() {
        this.$.input.bindValue = this.value.toString();
    },

    _onKeyDown: function (event) {
        // keydown 'enter'
        if (event.keyCode === 13) {
            this.confirm();
            this.setBlur();
            EditorUI.focusParent(this);
        }
        // keydown 'esc'
        else if (event.keyCode === 27) {
            this.cancel();
            this.setBlur();
            EditorUI.focusParent(this);
        }
    },

    _onInputKeyDown: function (event) {
        // keydown 'up'
        if (event.keyCode === 38) {
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
        if (this._nullToFloat(this.$.input.bindValue) + this.step >= this.max) {
            this.$.input.bindValue = this.max.toString();
        }
        else {
            this.$.input.bindValue = (this._nullToFloat(this.$.input.bindValue) + this.step).toString();
        }
    },

    _stepDown: function () {
        if (this._nullToFloat(this.$.input.bindValue) - this.step <= this.min) {
            this.$.input.bindValue = this.min.toString();
        }
        else {
            this.$.input.bindValue = (this._nullToFloat(this.$.input.bindValue) - this.step).toString();
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
        }.bind(this), 1);
    },

    _convert: function ( val ) {
        if (val === '' || isNaN(val)) {
            return this._lastValidValue;
        }
        val = parseFloat(parseFloat(val));
        if ( isNaN(val) )
            val = 0;
        if (this.min && this.max) {
            val = Math.min( Math.max( val, this.min ), this.max );
        }
        this._lastValidValue = val;
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
        if ( !this._inited )
            return;

        if (this.inputValue === this._convert(this.$.input.bindValue)) {
            return;
        }
        this.inputValue = this._convert(this.$.input.bindValue);
    },

    _onFocusedChanged: function (event) {
        if ( !this._inited )
            return;

        if ( event.detail.value ) {
            this.value = this.inputValue;
        } else {
            this.confirm();
        }
    },
});
