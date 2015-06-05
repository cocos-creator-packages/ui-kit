Editor.registerWidget( 'editor-input', {
    is: 'editor-input',

    behaviors: [EditorUI.focusable],

    properties: {
        placeholder: {
            type: String,
            notify: true,
            value: ''
        }
    },

    ready: function () {
        this._initFocusable(this.$.inputArea);
    },
});
