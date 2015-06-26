var Async = require('async');

describe('<editor-slider>', function() {
    var sliderEl;
    beforeEach(function ( done ) {
        fixture('widget', function ( el ) {
            sliderEl = el;
            done();
        });
    });

    it('can be focused', function( done ) {
        Tester.focus(sliderEl);
        expect(sliderEl.hasAttribute('focused')).to.be.eql(true);
        done();
    });

    it('can be blured', function( done ) {
        Tester.focus(sliderEl);
        expect(sliderEl.hasAttribute('focused')).to.be.eql(true);
        Tester.blur(sliderEl);
        expect(sliderEl.hasAttribute('focused')).to.be.eql(false);
        done();
    });

    it('should be disabled', function( done ) {
        sliderEl.disabled = true;
        expect(sliderEl.hasAttribute('disabled')).to.be.eql(true);
        expect(sliderEl.$.unitinput.disabled).to.be.eql(true);
        done();
    });

    it('should be set nofocus', function( done ) {
        sliderEl.setAttribute('nofocus','');
        expect(sliderEl.hasAttribute('nofocus')).to.be.eql(true);
        done();
    });

    it('should be show unit-input', function( done ) {
        sliderEl.setAttribute('input','');
        expect(getComputedStyle(sliderEl.$.unitinput).display).to.be.eql('flex');
        sliderEl.removeAttribute('input');
        expect(getComputedStyle(sliderEl.$.unitinput).display).to.be.eql('none');
        done();
    });

    it('can be set value', function( done ) {
        sliderEl.value = 50;
        expect(sliderEl.$.unitinput.value).to.be.eql(50);

        var width = sliderEl.$.track.getBoundingClientRect().width;
        expect(getComputedStyle(sliderEl.$.nubbin).left).to.be.eql(width/2 + 'px');
        sliderEl.$.unitinput.value = 51;
        expect(sliderEl.value ).to.be.eql(51);
        done();
    });
});

describe('<editor-slider input>', function() {
    var sliderEl;
    beforeEach(function ( done ) {
        fixture('unit-input', function ( el ) {
            sliderEl = el;
            done();
        });
    });

    it('can be click unit-input "up" & "down" btn', function( done ) {
        Async.series({
            increase: function (cb) {
                sliderEl.value = 50;
                Tester.click(sliderEl.$.unitinput.getElementsByClassName('btn')[0]);
                setTimeout(function () {
                    expect(sliderEl.value).to.be.eql(51);
                    cb(null,true);
                },10);
            },
            decrease: function (cb) {
                sliderEl.value = 50;
                Tester.click(sliderEl.$.unitinput.getElementsByClassName('btn')[1]);
                setTimeout(function () {
                    expect(sliderEl.value).to.be.eql(49);
                    cb(null,true);
                },10);
            }
        },function (err,result) {
            done();
        });
    });
});

describe('<editor-slider min="5" max="10" value="0">', function() {
    var sliderEl;
    beforeEach(function ( done ) {
        fixture('limit', function ( el ) {
            sliderEl = el;
            done();
        });
    });

    it('can reset the initial value', function( done ) {
        expect(sliderEl.value).to.be.eql(5);
        done();
    });

    it('can limit the value if it less than min', function( done ) {
        sliderEl.value = 2;
        expect(sliderEl.value).to.be.eql(5);
        done();
    });

    it('can limit the value if it large than max', function( done ) {
        sliderEl.value = 20;
        expect(sliderEl.value).to.be.eql(10);
        done();
    });
});
