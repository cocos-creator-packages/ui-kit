Editor.registerWidget( 'editor-progress', {
    is: 'editor-progress',

    properties: {
        value: {
            type: Number,
            value: 0,
            notify: true,
            observer: '_valueChanged'
        },
        state: {
            type: String,
            value: 'normal', // 'normal', 'failed' and 'succeed'
            reflectToAttribute: true,
        },
        _noAnimate: {
            type: Boolean,
            value: false,
        },
    },

    reset: function () {
        this.state = 'normal';
        this._noAnimate = true;
        this.value = 0.0;
    },

    _succeed: function () {
        this._noAnimate = true;
        this.value = 1.0;
    },

    _valueChanged: function () {
        this.value = Math.clamp(this.value,0,1);
        if ( Math.clamp((this.value * 100).toFixed(2),0,100) >= 100 ) {
            this.state = 'succeed';
        }
        else {
            this.state = 'normal';
        }
    },

    _progressStyle: function (value) {
        var style = 'width:' + Math.clamp(value * 100,0,100) + '%;';

        if (!this._noAnimate) {
            style = style + ' transition-duration: 300ms;transition: width .2s ease,background-color .2s ease;';
        }
        this._noAnimate = false;
        return style;
    },

    _valueText: function (value) {
        return parseFloat( Math.clamp((value * 100).toFixed(2),0,100));
    },
});
