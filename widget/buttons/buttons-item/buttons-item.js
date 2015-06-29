Polymer({
    is: 'editor-buttons-item',

    behaviors: [EditorUI.focusable, Polymer.IronButtonState],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
    },

    properties: {
        selected: {
            type: Boolean,
            value: false,
            notify: true,
            reflectToAttribute: true,
        },
    },

    ready: function () {
        this.noNavigate = this.nofocus;
        this._initFocusable(this);
    },
});
