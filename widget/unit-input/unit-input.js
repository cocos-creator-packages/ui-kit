Editor.registerWidget( 'editor-unit-input', {
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

    created: function () {
        this._lastValidValue = 0;
        this._inited = false;
    },

    ready: function () {
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

    _inputValueChanged: function () {
        this.$.input.bindValue = this.inputValue.toString();
    },

    _valueChanged: function () {
        this.value = this._convert(this.value);
        if (this.min !== undefined && this.max !== undefined) {
            this.value = Math.clamp(this._convert(this.value),this.min,this.max);
        }
        this.inputValue = this.value;
        this.$.input.bindValue = this._convert(this.value).toString();
    },

    confirm: function () {
        this.value = this._convert(this.$.input.bindValue);
        this.inputValue = this._convert(this.$.input.bindValue);
        this.$.input.bindValue = this.value.toString();
        this.fire('confirm', null, {bubbles: false} );
    },

    cancel: function() {
        this.$.input.bindValue = this.value.toString();
        this.fire('cancel', null, {bubbles: false} );
    },

    _onKeyDown: function (event) {
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

    _onInputKeyDown: function (event) {

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

    _onIncreaseClick: function ( event ) {
        event.stopPropagation();
        // event.preventDefault();

        this._stepUp();
    },

    _onDecreaseClick: function ( event ) {
        event.stopPropagation();
        // event.preventDefault();

        this._stepDown();
    },

    _stepUp: function () {
        if (this._nullToFloat(this.$.input.bindValue) + this.step >= this.max) {
            this.$.input.bindValue = this.max.toString();
        }
        else {
            this.$.input.bindValue = (this._nullToFloat(this.$.input.bindValue) + this.step).toFixed(this.precision);
        }
    },

    _stepDown: function () {
        if (this._nullToFloat(this.$.input.bindValue) - this.step <= this.min) {
            this.$.input.bindValue = this.min.toString();
        }
        else {
            this.$.input.bindValue = (this._nullToFloat(this.$.input.bindValue) - this.step).toFixed(this.precision);
        }
    },

    _onIncrease: function (event) {
        event.stopPropagation();
        event.preventDefault();

        this.setFocus();

        this._timeoutID = setTimeout( function () {
            this._holdingID = setInterval( function () {
                this._stepUp();
            }.bind(this), 50);
        }.bind(this), 500 );
    },

    _onDecrease: function (event) {
        event.stopPropagation();
        event.preventDefault();

        this.setFocus();

        this._timeoutID = setTimeout( function () {
            this._holdingID = setInterval( function () {
                this._stepDown();
            }.bind(this), 50);
        }.bind(this), 500 );
    },

    _onStopRoll: function ( event ) {
        event.stopPropagation();

        clearInterval(this._holdingID);
        this._holdingID = null;

        clearTimeout(this._timeoutID);
        this._timeoutID = null;

        setTimeout(function() {
            this.confirm();
        }.bind(this), 1);
    },

    _onHintMounseDown: function ( event ) {
        event.preventDefault();
        event.stopPropagation();

        this.setFocus();
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
        val = parseFloat(val.toFixed(this.precision));
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
