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
        this._stopUpdate = false;
        this._originPosition = '';
        this._node = null;

        if (this.mask && this.parentElement) {
            this.initLoader(this.parentElement);
        }
    },

    initLoader: function (node) {
        this._stopUpdate = false;
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
        this.$.animate.style.position = 'absolute';
        this.$.animate.style.left = '50%';
        this.$.animate.style.marginLeft = -this.$.animate.getBoundingClientRect().width / 2 - 5;
        this.$.animate.style.marginTop = this.getBoundingClientRect().height / 2 - this.$.animate.getBoundingClientRect().height / 2;
        node.appendChild(this);
        this._update();
    },

    _update: function () {
        window.requestAnimationFrame(function () {
            if (this._stopUpdate) {
                return;
            }
            this.$.animate.style.marginLeft = -this.$.animate.getBoundingClientRect().width / 2 - 5;
            this.$.animate.style.marginTop = this.getBoundingClientRect().height / 2 - this.$.animate.getBoundingClientRect().height / 2;
            this._update();
        }.bind(this));
    },

    clear: function () {
        this._stopUpdate = true;
        this._node.style.position = this._originPosition;
        this.remove();
    },
});
