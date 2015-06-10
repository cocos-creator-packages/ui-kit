Editor.registerWidget( 'editor-input', {
    is: 'editor-input',

    behaviors: [EditorUI.focusable,Polymer.IronValidatableBehavior],

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
            observer: '_inputValueChanged'
        },

        value: {
            type: String,
            notify: true,
            value: '',
            observer: '_valueChanged'
        }

    },

    ready: function () {
        this._initFocusable(this.$.input);
    },

    _inputValueChanged: function () {
        this.fire('input-changed');
    },

    _valueChanged: function () {
        this.inputValue = this.value;
        this.fire('changed');
    },

    clear: function () {
        this.value = '';
        this.inputValue = '';
    },

    confirm: function () {
        this.value = this.inputValue;
    },

    cancel: function() {
        this.inputValue = this.value;
    },

    _onKeyDown: function (event) {
        if (event.keyCode === 13) {
            if (this.value !== this.inputValue) {
                this.confirm();
                this.setBlur();
            }else {
                this.setBlur();
            }
        }
        else if (event.keyCode === 27) {
            this.cancel();
            this.setBlur();
        }
    },

    _onFocus: function ( event ) {
        this._setFocused(true);
        this.value = this.inputValue;
    },

   _onBlur: function ( event ) {
       this._setFocused(false);
       this.confirm();
   },

});
