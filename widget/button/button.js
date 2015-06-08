Editor.registerWidget( 'editor-button', {
    is: 'editor-button',

    behaviors: [EditorUI.focusable, Polymer.IronButtonState],

    properties: {
        noFocus: {
            type: Boolean,
            value: false,
            notify: true,
            reflectToAttribute: true,
        },
    },

    ready: function () {
        this.noNavigate = this.noFocus;
        this._initFocusable(this);
    },
});
