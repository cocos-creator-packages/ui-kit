Editor.registerWidget( 'editor-select-panel', {
    is: 'editor-select-panel',

    behaviors: [EditorUI.focusable],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
        'focused-changed': '_onFocusedChanged'
    },

    properties: {
        owner: {
            type: Object,
            value: null
        },
    },

    ready: function () {
        this.noNavigate = this.nofocus;
        this._initFocusable(this);
    },

    _onFocusedChanged: function (event) {
        if ( event.detail.value ) {
            if (this.owner) {
                this.owner.focuschild = true;
            }
        }
        else {
            this.hide();
        }
    },

    hide: function () {
        if (this.owner) {
            this.owner.focuschild = false;
            this.owner._panel = null;
            this.owner.setFocus();
        }
        this.remove();
    },
});
