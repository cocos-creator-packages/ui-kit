'use strict';

const Async = require('async');

describe('<editor-unit-input>', function() {
  let unitInputEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/unit-input.html', 'simple', el => {
      unitInputEL = el;
      document.body.appendChild(unitInputEL);
      done();
    });
  });

  afterEach(function ( done ) {
    unitInputEL.remove();
    done();
  });

  it('should be disabled', function( done ) {
    unitInputEL.disabled = true;
    expect(unitInputEL.hasAttribute('disabled')).to.be.eql(true);
    done();
  });

  it('should be invalid', function( done ) {
    unitInputEL.invalid = true;
    expect(unitInputEL.hasAttribute('invalid')).to.be.eql(true);
    done();
  });

  it('should be focused', function( done ) {
    Helper.focus(unitInputEL);
    expect(unitInputEL.hasAttribute('focused')).to.be.eql(true);
    done();
  });

  it('should be blur', function( done ) {
    Helper.focus(unitInputEL);
    expect(unitInputEL.hasAttribute('focused')).to.be.eql(true);
    Helper.blur(unitInputEL);
    expect(unitInputEL.hasAttribute('focused')).to.be.eql(false);
    done();
  });

  it('should set el.$.input.value through el.value', function( done ) {
    unitInputEL.value = 123;
    expect(unitInputEL.inputValue).to.be.eql(123);
    done();
  });


  it('can be cancel value', function( done ) {
    Helper.focus(unitInputEL);
    unitInputEL.inputValue = 123;
    unitInputEL.cancel();
    expect(unitInputEL.value).to.be.eql(0);
    done();
  });

  it('can be confirm value', function( done ) {
    Helper.focus(unitInputEL);
    unitInputEL.inputValue = 123;
    unitInputEL.confirm();
    expect(unitInputEL.value).to.be.eql(123);
    done();
  });

  it('can be invoked by press "up" and "down"', function( done ) {
    unitInputEL.value = 123;
    Helper.keydown(unitInputEL.$.input,'up');
    unitInputEL.confirm();
    expect(unitInputEL.inputValue).to.be.eql(124);
    Helper.keydown(unitInputEL.$.input,'down');
    unitInputEL.confirm();
    expect(unitInputEL.inputValue).to.be.eql(123);
    done();
  });

  it('can be click "up" & "down" btn', function( done ) {
    unitInputEL.value = 123;
    Helper.click(unitInputEL.getElementsByClassName('btn')[0]);
    unitInputEL.confirm();
    expect(unitInputEL.inputValue).to.be.eql(124);
    Helper.click(unitInputEL.getElementsByClassName('btn')[1]);
    unitInputEL.confirm();
    expect(unitInputEL.inputValue).to.be.eql(123);
    done();
  });

  it('should be focused after click increase or decrease button', function( done ) {
    Helper.focus(unitInputEL.getElementsByClassName('btn')[0]);
    Helper.click(unitInputEL.getElementsByClassName('btn')[0],0,0,0);
    Helper.click(unitInputEL.getElementsByClassName('btn')[0],0,0,0);
    Helper.click(unitInputEL.getElementsByClassName('btn')[1],0,0,0);
    setTimeout(function () {
      expect(unitInputEL.hasAttribute('focused')).to.be.eql(true);
      done();
    },10);
  });

  it('it should change the value after click increase or decrease button', function( done ) {
    Helper.click(unitInputEL.getElementsByClassName('btn')[0],0,0,0);
    Helper.click(unitInputEL.getElementsByClassName('btn')[0],0,0,0);
    Helper.click(unitInputEL.getElementsByClassName('btn')[1],0,0,0);
    setTimeout(function () {
      expect(unitInputEL.value).to.be.eql(1);
      done();
    },10);
  });

  it('the input should show "0" after click decrease button', function( done ) {
    unitInputEL.value = 1;
    Helper.click(unitInputEL.getElementsByClassName('btn')[1],0,0,0);
    setTimeout(function () {
      expect(unitInputEL.$.input.bindValue).to.be.eql('0');
      done();
    },10);
  });

  it('the input should show "0" after click increase button', function( done ) {
    unitInputEL.value = -1;
    Helper.click(unitInputEL.getElementsByClassName('btn')[0],0,0,0);
    setTimeout(function () {
      expect(unitInputEL.$.input.bindValue).to.be.eql('0');
      done();
    },10);
  });

  it('should not change the value after _stepUp or _stepDown invoked', function( done ) {
    unitInputEL.value = 123;
    unitInputEL._stepUp();
    expect(unitInputEL.value).to.be.eql(123);
    unitInputEL._stepDown();
    expect(unitInputEL.value).to.be.eql(123);
    done();
  });

  it('should be focused for unitInputEL-input when increase or decrease button focused.',function ( done ) {
    Async.series({
      increase: cb => {
        Helper.focus(unitInputEL.getElementsByClassName('btn')[0]);
        expect(unitInputEL.focused).to.be.eql(true);
        Helper.blur(unitInputEL.getElementsByClassName('btn')[0]);

        setTimeout(() => {
          expect(unitInputEL.focused).to.be.eql(false);
          cb(null,true);
        },10);
      },
      decrease: cb => {
        Helper.focus(unitInputEL.getElementsByClassName('btn')[1]);
        expect(unitInputEL.focused).to.be.eql(true);
        Helper.blur(unitInputEL.getElementsByClassName('btn')[1]);

        setTimeout(() => {
          expect(unitInputEL.focused).to.be.eql(false);
          cb(null,true);
        },10);
      },
      input: cb => {
        Helper.focus(unitInputEL.$.input);
        expect(unitInputEL.focused).to.be.eql(true);
        Helper.blur(unitInputEL.$.input);

        setTimeout(() => {
          expect(unitInputEL.focused).to.be.eql(false);
          cb(null,true);
        },10);
      },
    }, done );
  });

});


describe('<editor-unit-input value="{{foo}}">', function() {
  let unitInputEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/unit-input.html', 'bind', el => {
      unitInputEL = el;
      document.body.appendChild(unitInputEL);
      done();
    });
  });

  afterEach(function ( done ) {
    unitInputEL.remove();
    done();
  });


  it('shoudl bind value to foo', function() {
    unitInputEL.foo = 1;
    expect(unitInputEL.$.input.value).to.be.eql(1);
    expect(unitInputEL.$.input.inputValue).to.be.eql(1);
    expect(unitInputEL.$.input.$.input.value).to.be.eql('1');
  });

  it('shoudl work when binding value to undefined', function() {
    unitInputEL.foo = undefined;
    expect(unitInputEL.$.input.value).to.be.eql(0);
  });
});

describe('<editor-unit-input value="1">', function() {
  let unitInputEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/unit-input.html', 'value', el => {
      unitInputEL = el;
      document.body.appendChild(unitInputEL);
      done();
    });
  });

  afterEach(function ( done ) {
    unitInputEL.remove();
    done();
  });

  it('should init value with number 1', function( done ) {
    expect(unitInputEL.value).to.be.eql(1);
    expect(unitInputEL.inputValue).to.be.eql(1);
    expect(unitInputEL.$.input.value).to.be.eql('1');
    done();
  });
});


describe('<editor-unit-input disabled>', function() {
  let unitInputEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/unit-input.html', 'disabled', el => {
      unitInputEL = el;
      document.body.appendChild(unitInputEL);
      done();
    });
  });

  afterEach(function ( done ) {
    unitInputEL.remove();
    done();
  });

  it('should be disabled', function( done ) {
    expect(unitInputEL.disabled).to.be.eql(true);
    done();
  });
});


describe('<editor-unit-input invalid>', function() {
  let unitInputEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/unit-input.html', 'invalid', el => {
      unitInputEL = el;
      document.body.appendChild(unitInputEL);
      done();
    });
  });

  afterEach(function ( done ) {
    unitInputEL.remove();
    done();
  });

  it('should be invalid', function( done ) {
    expect(unitInputEL.invalid).to.be.eql(true);
    done();
  });
});

describe('<editor-unit-input min="5" max="10" value="0">', function() {
  let unitInputEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/unit-input.html', 'limit', el => {
      unitInputEL = el;
      document.body.appendChild(unitInputEL);
      done();
    });
  });

  afterEach(function ( done ) {
    unitInputEL.remove();
    done();
  });

  it('can reset the initial value', function( done ) {
    expect(unitInputEL.value).to.be.eql(5);
    done();
  });

  it('can limit the value if it less than min', function( done ) {
    unitInputEL.value = 2;
    expect(unitInputEL.value).to.be.eql(5);
    done();
  });

  it('can limit the value if it large than max', function( done ) {
    unitInputEL.value = 20;
    expect(unitInputEL.value).to.be.eql(10);
    done();
  });
});

describe('<editor-unit-input precision>', function() {
  let unitInputEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/unit-input.html', 'precision', el => {
      unitInputEL = el;
      document.body.appendChild(unitInputEL);
      done();
    });
  });

  afterEach(function ( done ) {
    unitInputEL.remove();
    done();
  });

  it('should be invalid', function( done ) {
    unitInputEL.$.input.bindValue = '14.12';
    unitInputEL.inputValue = 14.123456;
    expect(unitInputEL.inputValue).to.be.eql(14.123456);
    expect(unitInputEL.$.input.bindValue).to.be.eql('14.12');
    done();
  });
});
