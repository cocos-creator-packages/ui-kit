Editor.registerWidget( 'editor-loader', {
    is: 'editor-loader',

    properties: {
        text: {
            type: String,
            notify: true,
            value: '',
        },

        mask: {
            type: Boolean,
            notify: true,
            value: false,
            reflectToAttribute: true,
        }
    },

    ready: function () {
        this._originPosition = '';
        this._node = null;

        if (this.mask && this.parentElement) {
            this.initLoader(this.parentElement);
        }
    },

    initLoader: function (node) {
        this.mask = true;
        this._node = node;

        this.stopLoading = false;
        this._originPosition = window.getComputedStyle(node)['position'];

        if (this._originPosition !== 'absolute' && this._originPosition !== 'relative' && this._originPosition !== 'fixed') {
            this._node.style.position = 'relative';
        }

        this.style.background = 'rgba(0,0,0,.5)';
        this.style.position = 'absolute';
        this.style.left = 0;
        this.style.top = 0;
        this.style.right = 0;
        this.style.bottom = 0;
        node.appendChild(this);
    },

    clear: function () {
        this._node.style.position = this._originPosition;
        this.remove();
    },
});
