Editor.registerWidget( 'editor-select-panel', {
    is: 'editor-select-panel',

    behaviors: [EditorUI.focusable],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
        'focused-changed': '_onFocusedChanged',
    },

    properties: {
        owner: {
            type: Object,
            value: null
        },

        select: {
            type: String,
            value: '',
        }
    },

    ready: function () {
        this.noNavigate = this.nofocus;
        this._initFocusable(this);
    },

    attached: function () {
        for (var i = 0; i < this.children.length; ++i) {
            if (this.children[i].value === this.owner.value) {
                this.children[i].selected = true;
            }
        }
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
        this.remove();
        if (this.owner) {
            this.owner.focuschild = false;
            this.owner._panel = null;
            EditorUI.removeHitGhost();
            this.owner.setFocus();
        }
    },
});
