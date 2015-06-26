Editor.registerWidget( 'editor-select-menu', {
    is: 'editor-select-menu',

    behaviors: [EditorUI.focusable],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
        'keydown': '_onKeyDown',
        'mousedown': '_onMouseDown',
        'click': '_onClick',
    },

    properties: {
        value: {
            type: String,
            value: '',
            notify: true,
        }
    },

    ready: function () {
        this.noNavigate = true;
        this._initFocusable(this);
    },

    _onMouseDown: function ( event ) {
        event.stopPropagation();
    },

    _onClick: function ( event ) {
        this.confirm();
    },

    _onKeyDown: function (event) {
        var items;

        // up-arrow
        if (event.keyCode === 38) {
            event.preventDefault();
            event.stopPropagation();

            if ( !this.$.selector.selectedItem ) {
                items = this.$.selector.items;
                if ( items.length > 0 ) {
                    this.$.selector.select(items[items.length-1].value);
                }
            }
            else {
                this.$.selector.selectPrevious();
            }
        }
        // down-arrow
        else if (event.keyCode === 40) {
            event.preventDefault();
            event.stopPropagation();

            if ( !this.$.selector.selectedItem ) {
                items = this.$.selector.items;
                if ( items.length > 0 ) {
                    this.$.selector.select(items[0].value);
                }
            }
            else {
                this.$.selector.selectNext();
            }
        }
        // space, enter
        else if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            event.stopPropagation();

            this.confirm();
        }
        // esc
        else if (event.keyCode === 27) {
            event.preventDefault();
            event.stopPropagation();

            this.cancel();
        }
    },

    confirm: function () {
        if ( this.$.selector.selectedItem.disabled ) {
            this.cancel();
            return;
        }

        this.value = this.$.selector.selected;
        this.hidden = true;
        EditorUI.focusParent(this);
    },

    cancel: function () {
        this.$.selector.select(this.value);
        this.hidden = true;
        EditorUI.focusParent(this);
    },
});
