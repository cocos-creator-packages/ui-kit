Editor.registerWidget( 'editor-progress', {
    is: 'editor-progress',

    properties: {
        value: {
            type: Number,
            value: 0,
            observer: '_valueChanged'
        },
        succeed: {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
        },
    },

    _valueChanged: function () {
        this.value = Math.clamp(this.value,0,1);
        if (this.value >=1) {
            this.succeed = true;
        }
        else {
            this.succeed = false;
        }
    },

    _progressStyle: function (value) {
        return 'width:' + Math.clamp(value * 100,0,100) + '%;';
    },

    _value: function (value) {
        return parseFloat( Math.clamp((value * 100).toFixed(2),0,100));
    },
});
