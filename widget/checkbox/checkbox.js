Editor.registerWidget( 'editor-checkbox', {
    is: 'editor-checkbox',

    behaviors: [EditorUI.focusable,Polymer.IronButtonState],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
        'click': '_onClick',
    },

    properties: {
        checked: {
            type: Boolean,
            value: false,
            notify: true,
            reflectToAttribute: true,
        },

        nofocus: {
            type: Boolean,
            value: false,
            notify: true,
            reflectToAttribute: true,
        },

        readOnly: {
            type: Boolean,
            value: false
        },
    },

    ready: function () {
        this.noNavigate = this.nofocus;
        this._initFocusable(this);
    },

    _onClick: function (event) {
        if (this.readOnly) {
            return;
        }
        this.checked = !this.checked;
    },
});
