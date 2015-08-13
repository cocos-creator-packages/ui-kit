Editor.registerWidget( 'editor-section', {
    is: 'editor-section',

    behaviors: [EditorUI.focusable],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
        'keydown': '_onKeyDown'
    },

    properties: {
        text: {
            type: String,
            value: ''
        },

        folded: {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
        },

        closeable: {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
        },

        icon: {
            type: String,
            value: ''
        }
    },

    ready: function () {
        this._initFocusable(this);
    },

    _onFoldClick: function () {
        this.folded = !this.folded;
    },

    _foldClass: function ( folded ) {
        if (folded) {
            return 'fa fa-caret-right fold flex-none ';
        }

        return 'fa fa-caret-down fold flex-none';
    },

    _iconClass: function (icon) {
        if (this.icon) {
            return 'icon';
        }
        return 'hidden';
    },

    _onKeyDown: function (event) {
        if ( Polymer.dom(event).localTarget !== this )
            return;

        // press 'enter' and 'space'
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            event.stopPropagation();
            this.folded = !this.folded;
        }
        // press left
        else if (event.keyCode === 37) {
            event.preventDefault();
            event.stopPropagation();
            this.folded = true;
        }
        // press right
        else if (event.keyCode === 39) {
            event.preventDefault();
            event.stopPropagation();
            this.folded = false;
        }
    },

    _onCloseClick: function (event) {
        event.stopPropagation();
        this.fire('close');
    },
 });
