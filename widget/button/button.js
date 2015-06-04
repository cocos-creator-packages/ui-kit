Editor.registerWidget( 'editor-button', {
    is: 'editor-button',

    behaviors: [EditorUI.focusable],

    ready: function () {
        this._initFocusable(this);
    },
});
