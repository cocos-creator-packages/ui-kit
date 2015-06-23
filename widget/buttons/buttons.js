Editor.registerWidget( 'editor-buttons', {
    is: 'editor-buttons',

    behaviors: [EditorUI.focusable, Polymer.IronButtonState],

    ready: function () {
        this.noNavigate = this.nofocus;
        this._initFocusable(this);
    },
});
