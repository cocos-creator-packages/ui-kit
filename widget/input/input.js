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

        value: {
            type: String,
            notify: true,
            value: '',
            observer: 'valueChanged'
        },
    },

    ready: function () {
        this._initFocusable(this.$.input);
    },

    valueChanged: function () {
        this.$.input.bindValue = this.value;
    },

    clear: function () {
        this.value = '';
    },

    _keyDownAction: function (event) {
        console.log(event);
        if (event.which === 13) {
            this.lastValue = this.value;
            this.setBlur();
        }
        else if (event.which === 27) {
            this.value = this.lastValue;
            this.setBlur();
        }
    },

    _onFocus: function ( event ) {
        this._setFocused(true);
        this.lastValue = this.value;
    },

   _onBlur: function ( event ) {
       this._setFocused(false);
   },

});
