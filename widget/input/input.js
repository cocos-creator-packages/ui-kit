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
            observer: '_ValueChanged'
        }

    },

    ready: function () {
        this._initFocusable(this.$.input);
    },

    _inputValueChanged: function () {
        this.fire('input-changed');
    },

    _ValueChanged: function () {
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

    restore: function() {
        this.inputValue = this.value;
    },

    _onKeyDown: function (event) {
        if (event.keyCode === 13) {
            if (this.value !== this.inputValue) {
                this.confirm();
                this.setBlur(true);
            }else {
                this.setBlur(false);
            }
        }
        else if (event.keyCode === 27) {
            this.restore();
            this.setBlur(true);
        }
    },

    _onFocus: function ( event ) {
        this._setFocused(true);
        this.value = this.inputValue;
    },

   _onBlur: function ( event,notify) {
       this._setFocused(false);
       this.confirm();
       if (notify) {
           this.fire('changed');
       }
   },

});
