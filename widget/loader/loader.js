Editor.registerElement({
    properties: {
        text: {
            type: String,
            notify: true,
            value: '',
        },

        maskColor: {
            type: String,
            notify: true,
            value: 'rgba(0,0,0,0.3)',
        },
    },

    ready: function () {
    },

    attached: function () {
        if ( this.hasAttribute('mask') ) {
            this.maskAt(Polymer.dom(this).parentNode);
        }
    },

    maskAt: function ( parentEL ) {
        this.setAttribute('mask','');

        this.style.background = this.maskColor;
        this.style.position = 'absolute';
        this.style.left = 0;
        this.style.top = 0;
        this.style.right = 0;
        this.style.bottom = 0;

        if ( Polymer.dom(this).parentNode !== parentEL ) {
            Polymer.dom(parentEL).appendChild(this);
        }
    },

    clear: function () {
        Polymer.dom(Polymer.dom(this).parentNode).removeChild(this);
    },
});
