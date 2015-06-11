Editor.registerWidget( 'editor-input', {
    is: 'editor-input',

    behaviors: [EditorUI.focusable, Polymer.IronValidatableBehavior],

    listeners: {
        'focused-changed': '_onFocusedChanged'
    },

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
        // keydown 'enter'
        if (event.keyCode === 13) {
            if (this.value !== this.inputValue) {
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
    },

    _onFocusedChanged: function ( event ) {
        if ( event.detail.value ) {
            this.value = this.inputValue;
        }
        else {
            this.confirm();
        }
    },

});
