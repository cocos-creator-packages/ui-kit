Editor.registerWidget( 'editor-loader', {
    is: 'editor-loader',

    properties: {
        text: {
            type: String,
            notify: true,
            value: '',
        },
    },

    ready: function () {
        this._originPosition = '';
        this._node = null;
    },

    attached: function () {
        var parentEL = this.parentElement;
        if (this.hasAttribute('mask') && parentEL) {
            this.maskAt(parentEL);
        }
    },

    maskAt: function ( parentEL ) {
        this.setAttribute('mask','');
        this._node = parentEL;

        this._originPosition = window.getComputedStyle(parentEL).position;

        if (this._originPosition !== 'absolute' && this._originPosition !== 'relative' && this._originPosition !== 'fixed') {
            this._node.style.position = 'relative';
        }

        this.style.background = 'rgba(0,0,0,0.3)';
        this.style.position = 'absolute';
        this.style.left = 0;
        this.style.top = 0;
        this.style.right = 0;
        this.style.bottom = 0;

        if ( this.parentElement !== parentEL ) {
            Polymer.dom(parentEL).appendChild(this);
        }
    },

    clear: function () {
        if ( this._node ) {
            this._node.style.position = this._originPosition;
        }
        Polymer.dom(Polymer.dom(this).parentNode).removeChild(this);
    },
});
