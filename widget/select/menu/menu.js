Polymer({
    is: 'editor-select-menu',

    behaviors: [EditorUI.focusable],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
        'focused-changed': '_onFocusedChanged',
        'keydown': '_onKeyDown',
        'keyup': '_onKeyUp',
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
        this.selectedItem = null;
    },

    attached: function () {
        for (var i = 0; i < this.children.length; ++i) {
            this.children[i].addEventListener('selected',function (event) {
                this.owner.value = event.target.value;
                this.hide();
            }.bind(this));

            if (this.children[i].value === this.owner.value) {
                this.children[i].selected = true;
                this.selectedItem = this.children[i];
            }
        }

        for (var j = 0; j < this.children.length; ++j) {
            if (this.children[j].value === this.owner.value) {
                this.children[j].selected = true;
                this.selectedItem = this.children[j];
                return;
            }
        }

        if (!this.selectedItem && this.children.length > 0) {
            this.selectedItem = this.children[0];
            this.selectedItem.selected = true;
        }
    },

    _onKeyDown: function (event) {
        if (event.keyCode === 38) {
            if (this.selectedItem && this.selectedItem.previousElementSibling) {
                this.selectedItem.selected = false;
                this.selectedItem = this.selectedItem.previousElementSibling;
                this.selectedItem.selected = true;
            }
        }
        else if (event.keyCode === 40) {
            if (this.selectedItem && this.selectedItem.nextElementSibling) {
                this.selectedItem.selected = false;
                this.selectedItem = this.selectedItem.nextElementSibling;
                this.selectedItem.selected = true;
            }
        }
    },

    _onKeyUp: function (event) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.selectedItem._confirm();
            this.owner._showOrHideMenu(event);
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
