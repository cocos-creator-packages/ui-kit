Editor.registerWidget( 'editor-toolbar', {
    is: 'editor-toolbar',

    behaviors: [EditorUI.focusable, Polymer.IronButtonState],
    
    ready: function () {
        this.noNavigate = this.nofocus;
        this._initFocusable(this);
    },
});
