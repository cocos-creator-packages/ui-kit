Editor.registerWidget( 'editor-input', {
    is: 'editor-input',

    behaviors: [EditorUI.focusable,Polymer.IronValidatableBehavior],

    properties: {
        placeholder: {
            type: String,
            notify: true,
            value: ''
        },
        value: {
            type: String,
            notify: true,
            value: '',
            observer: 'valueChanged'
        }
    },

    ready: function () {
        this._initFocusable(this.$.inputArea);
    },

    valueChanged: function () {
        // TODO
    },
});
