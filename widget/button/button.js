Editor.registerWidget( 'editor-button', {
    is: 'editor-button',

    behaviors: [EditorUI.focusable],

    ready: function () {
        this._initFocusable(this);
        this.addEventListener('keyup',function(event) {
            if (event.keyCode === 32 || event.keyCode === 13) {
                this.click();
            }
        })
    },
});
