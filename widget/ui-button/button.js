'use strict';

(() => {

    // 各种颜色的皮肤
    const Style = {
        default: 'packages://ui-kit/widget/ui-button/default.css',
        black: 'packages://ui-kit/widget/ui-button/black.css',
        yellow: 'packages://ui-kit/widget/ui-button/yellow.css',
        green: 'packages://ui-kit/widget/ui-button/green.css',
        blue: 'packages://ui-kit/widget/ui-button/blue.css',
        orange: 'packages://ui-kit/widget/ui-button/orange.css',
        purple: 'packages://ui-kit/widget/ui-button/purple.css',
        red: 'packages://ui-kit/widget/ui-button/red.css',
        gray: 'packages://ui-kit/widget/ui-button/gray.css'
    };

    // 样式预加载
    EditorUI.loadStylesheets(Object.keys(Style).map((name) => {
        return Style[name];
    }));

    var sizes = ['mini', 'small', 'normal', 'large', 'big'];

    // 监听器处理函数
    // 设置了一个监听 ui-button 元素属性值更改的监听器，用于捕获 class 修改事件
    var obHandle = function ( mrs ) {
        mrs.forEach((mr) => {
            if (mr.attributeName == 'class') {
                let colorExists = Object.keys(Style).some((color) => {
                    var index = Array.prototype.indexOf.call(mr.target.classList, color);
                    if (index !== -1) {
                        mr.target.color = color;
                        return true;
                    }
                });
                if (!colorExists) {
                    mr.target.color = 'default';
                }
                let sizeExists = sizes.some((size) => {
                    var index = Array.prototype.indexOf.call(mr.target.classList, size);
                    if (index !== -1) {
                        mr.target.size = size;
                        return true;
                    }
                });
                if (!sizeExists) {
                    mr.target.size = 'normal';
                }
            }
        });
    };
    const Observer = new MutationObserver(obHandle);

    /**
     * UIButton
     */
    class Button extends window.HTMLElement {

        createdCallback () {

            var root =this.root = this.createShadowRoot();

            // style
            root.appendChild(EditorUI.createStyleElement(Style.default));

            this.content = document.createElement('div');
            this.content.classList.add('btn');
            this.content.appendChild(document.createElement('content'));
            this.content.setAttribute('tabindex', '1');
            root.appendChild(this.content);

            this.tabindex = 1;

            Observer.observe(this, { 'attributes': true });

            this._disabled = false;
            this._nofocus = false;

            this._color = '';
            this._size = '';

            this.initAttribute();
            this.initEvent();
        }

        initAttribute () {
            obHandle([{
                attributeName: 'class',
                target: this
            }]);

            this.disabled = this.getAttribute('disabled') !== null;
            this.nofocus = this.getAttribute('nofocus') !== null;

        }

        // 绑定事件
        initEvent () {
            this.content.addEventListener('mousedown', () => {
                if (!this.disabled)
                    this.content.classList.add('pressed');
            });
            this.content.addEventListener('mouseup', () => {
                this.content.classList.remove('pressed');
            });
            this.content.addEventListener('focus', () => {
                this.content.classList.add('focused');
            });
            this.content.addEventListener('blur', () => {
                this.content.classList.remove('pressed');
                this.content.classList.remove('focused');
            });
        }

        // _onEndEditing

        get disabled () {
            return this._disabled;
        }

        set disabled ( bol ) {
            this._disabled = bol;
            if (bol) {
                this.content.classList.add('disabled');
            } else {
                this.content.classList.remove('disabled');
            }
        }

        get nofocus () {
            return this._nofocus;
        }
        set nofocus ( bol ) {
            this._nofocus = bol;
            if (bol) {
                this.content.classList.add('nofocus');
            } else {
                this.content.classList.remove('nofocus');
            }
        }

        // mini | small | normal | large | big
        get size () {
            return this._size;
        }
        set size ( str ) {
            this._size = str;
            var classList = this.content.classList;
            classList.remove('mini');
            classList.remove('small');
            classList.remove('normal');
            classList.remove('large');
            classList.remove('big');
            classList.add(str);
        }

        // name phone relations dinner hotel traffic
        get color () {
            return this._color;
        }
        set color ( str ) {
            this._color = str;
            if (!Style[str]) return;

            let colorStyle = this.root.getElementById('colorStyle');
            if (colorStyle) {
                this.root.removeChild(colorStyle);
            }
            colorStyle = EditorUI.createStyleElement(Style[str]);
            colorStyle.id = 'colorStyle';
            this.root.appendChild(colorStyle);

        }

    }

    document.registerElement('ui-button', Button);

})();