Editor.registerWidget( 'editor-button', {
    is: 'editor-button',

    behaviors: [EditorUI.focusable, Polymer.IronButtonState],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
    },

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
