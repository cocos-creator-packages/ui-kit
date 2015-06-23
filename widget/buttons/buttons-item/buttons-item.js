Editor.registerWidget( 'editor-buttons-item', {
    is: 'editor-buttons-item',

    behaviors: [EditorUI.focusable, Polymer.IronButtonState],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
        'click': '_onClick'
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

    _onClick: function () {
        this.selected = !this.selected;
    }
});
