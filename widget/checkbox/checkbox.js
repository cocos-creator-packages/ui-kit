Editor.registerWidget( 'editor-checkbox', {
    is: 'editor-checkbox',

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
        'click': '_onClick',
        'keydown': '_onKeyDown'
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
            reflectToAttribute: true,
        }
    },

    behaviors: [EditorUI.focusable],

    ready: function () {
        this._initFocusable(this);
    },

    _onChanged: function () {
        this.checked = this.value;
        this.fire('changed');
    },

    _onClick: function (event) {
        this.value = !this.value;
    },

    _onKeyDown: function (event) {
        // keypress 'space'
        if (event.keyCode === 32) {
            this.value = !this.value;
        }
    },
});
