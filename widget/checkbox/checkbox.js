Editor.registerWidget( 'editor-checkbox', {
    is: 'editor-checkbox',

    behaviors: [EditorUI.focusable,Polymer.IronButtonState],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
        'click': '_onClick'
    },

    properties: {
        value: {
            type: Boolean,
            value: false,
            notify: true,
            observer: '_onChanged'
        },

        checked: {
            type: Boolean,
            value: false,
            notify: true,
            readOnly: true,
            reflectToAttribute: true,
        },

        nofocus: {
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

    _onChanged: function () {
        this._setChecked(this.value);
    },

    _onClick: function (event) {
        this.value = !this.value;
    },
});
