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
            notify: true,
            value: false
        },
        value: {
            type: String,
            notify: true,
            value: '',
            observer: 'valueChanged'
        }
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
});
