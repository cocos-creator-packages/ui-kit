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

        readonly: {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
        },
    },

    ready: function () {
        this.noNavigate = this.nofocus;
        this._initFocusable(this);
    },

    _onClick: function (event) {
        this.checked = !this.checked;
    },
});
