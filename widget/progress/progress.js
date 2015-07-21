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
            reflectToAttribute: true,
        },
    },

    reset: function () {
        this.state = 'normal';
        this._noAnimate = true;

        requestAnimationFrame(function () {
            this.value = 0.0;
            this.async(function(){
                this._noAnimate = false;
            },1);
        }.bind(this));
    },

    _valueChanged: function () {
        this.value = Math.clamp(this.value,0,1);
        if ( Math.clamp((this.value * 100).toFixed(2),0,100) >= 100 ) {
            this.state = 'succeed';
        }
        else {
            this.state = 'normal';
        }
        this.$.progress.style.width = Math.clamp(this.value * 100,0,100) + '%';
    },

    _valueText: function (value) {
        return parseFloat( Math.clamp((value * 100).toFixed(2),0,100));
    },
});
