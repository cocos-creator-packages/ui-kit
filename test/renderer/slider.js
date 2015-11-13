'use strict';

const Async = require('async');

describe('<editor-slider>', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/slider.html', 'simple');

  it('can be focused', function( done ) {
    let sliderEL = Helper.targetEL;

    Helper.focus(sliderEL);
    expect(sliderEL.hasAttribute('focused')).to.be.eql(true);
    done();
  });

  it('can be blured', function( done ) {
    let sliderEL = Helper.targetEL;

    Helper.focus(sliderEL);
    expect(sliderEL.hasAttribute('focused')).to.be.eql(true);
    Helper.blur(sliderEL);
    expect(sliderEL.hasAttribute('focused')).to.be.eql(false);
    done();
  });

  it('should be disabled', function( done ) {
    let sliderEL = Helper.targetEL;

    sliderEL.disabled = true;
    expect(sliderEL.hasAttribute('disabled')).to.be.eql(true);
    expect(sliderEL.$.unitinput.disabled).to.be.eql(true);
    done();
  });

  it('should be set nofocus', function( done ) {
    let sliderEL = Helper.targetEL;

    sliderEL.setAttribute('nofocus','');
    expect(sliderEL.hasAttribute('nofocus')).to.be.eql(true);
    done();
  });

  it('should be show unit-input', function( done ) {
    let sliderEL = Helper.targetEL;

    sliderEL.setAttribute('input','');
    expect(window.getComputedStyle(sliderEL.$.unitinput).display).to.be.eql('flex');
    sliderEL.removeAttribute('input');
    expect(window.getComputedStyle(sliderEL.$.unitinput).display).to.be.eql('none');
    done();
  });

  it('can be set value', function( done ) {
    let sliderEL = Helper.targetEL;

    sliderEL.value = 20;
    expect(sliderEL.$.unitinput.value).to.be.eql(20);

    var width = sliderEL.$.track.getBoundingClientRect().width;
    var left = window.getComputedStyle(sliderEL.$.nubbin).left;
    left = Math.fround(parseFloat(left.substring(0,left.length-2))).toFixed(1);

    expect(left).to.be.eql(Math.fround(0.2 * width).toFixed(1));
    sliderEL.$.unitinput.value = 51;
    expect(sliderEL.value ).to.be.eql(51);
    done();
  });
});

describe('<editor-slider input>', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/slider.html', 'simple');

  it('can be click unit-input "up" & "down" btn', function( done ) {
    let sliderEL = Helper.targetEL;

    Async.series({
      increase: cb => {
        sliderEL.value = 50;
        Helper.click(sliderEL.$.unitinput.getElementsByClassName('btn')[0]);
        setTimeout(function () {
          expect(sliderEL.value).to.be.eql(51);
          cb(null,true);
        },10);
      },

      decrease: cb => {
        sliderEL.value = 50;
        Helper.click(sliderEL.$.unitinput.getElementsByClassName('btn')[1]);
        setTimeout(function () {
          expect(sliderEL.value).to.be.eql(49);
          cb(null,true);
        },10);
      }
    },() => {
      done();
    });
  });
});

describe('<editor-slider min="5" max="10" value="0">', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/slider.html', 'limit');

  it('can reset the initial value', function( done ) {
    let sliderEL = Helper.targetEL;

    expect(sliderEL.value).to.be.eql(5);
    done();
  });

  it('can limit the value if it less than min', function( done ) {
    let sliderEL = Helper.targetEL;

    sliderEL.value = 2;
    expect(sliderEL.value).to.be.eql(5);
    done();
  });

  it('can limit the value if it large than max', function( done ) {
    let sliderEL = Helper.targetEL;

    sliderEL.value = 20;
    expect(sliderEL.value).to.be.eql(10);
    done();
  });
});
