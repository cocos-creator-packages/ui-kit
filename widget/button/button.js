Editor.registerWidget( 'editor-button', {
    is: 'editor-button',

    behaviors: [EditorUI.focusable, Polymer.IronButtonState],

    ready: function () {
        this._initFocusable(this);
    },
});
