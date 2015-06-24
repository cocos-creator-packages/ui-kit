Editor.registerWidget( 'editor-select-menu', {
    is: 'editor-select-menu',

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
            this.children[i].addEventListener('selected',function (event) {
                this.owner.value = event.target.value;
                this.hide();
            }.bind(this));

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
            this.owner._menu = null;
            EditorUI.removeHitGhost();
            this.owner.setFocus();
        }
    },
});
