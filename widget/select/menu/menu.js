Polymer({
    is: 'editor-select-menu',

    behaviors: [EditorUI.focusable, Polymer.IronMultiSelectableBehavior],

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
        },

        text: {
            type: String,
            value: '',
            notify: true,
        },
    },

    ready: function () {
        this.noNavigate = true;
        this._initFocusable(this);
    },

    _onMouseDown: function ( event ) {
        event.stopPropagation();
    },

    _onClick: function ( event ) {
        this.async(function () {
            this.confirm();
        }.bind(this), 1);
    },

    _onKeyDown: function (event) {
        var items;

        // up-arrow
        if (event.keyCode === 38) {
            event.preventDefault();
            event.stopPropagation();

            if ( !this.selectedItem ) {
                items = this.items;
                if ( items.length > 0 ) {
                    this.select(items[items.length-1].value);
                }
            }
            else {
                this.selectPrevious();
            }
        }
        // down-arrow
        else if (event.keyCode === 40) {
            event.preventDefault();
            event.stopPropagation();

            if ( !this.selectedItem ) {
                items = this.items;
                if ( items.length > 0 ) {
                    this.select(items[0].value);
                }
            }
            else {
                this.selectNext();
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
        if ( this.selectedItem && this.selectedItem.disabled ) {
            this.cancel();
            return;
        }

        this.value = this.selected;
        if (this.selectedItem.text;) {
            this.text = this.selectedItem.text;
        }
        else {
           this.text = this.selectedItem.innerText;
        }

        this.hidden = true;
        EditorUI.focusParent(this);
    },

    cancel: function () {
        this.select(this.value);
        this.hidden = true;
        EditorUI.focusParent(this);
    },
});
