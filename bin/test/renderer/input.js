'use strict';

describe('<editor-input>', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/input.html', 'simple');

  it('should be disabled', function( done ) {
    let inputEL = Helper.targetEL;

    inputEL.disabled = true;
    expect(inputEL.hasAttribute('disabled')).to.be.eql(true);
    done();
  });

  it('should be invalid', function( done ) {
    let inputEL = Helper.targetEL;

    inputEL.invalid = true;
    expect(inputEL.hasAttribute('invalid')).to.be.eql(true);
    done();
  });

  it('should be focused', function( done ) {
    let inputEL = Helper.targetEL;

    Helper.focus(inputEL);
    expect(inputEL.hasAttribute('focused')).to.be.eql(true);
    done();
  });

  it('should be blured', function( done ) {
    let inputEL = Helper.targetEL;

    Helper.focus(inputEL);
    expect(inputEL.hasAttribute('focused')).to.be.eql(true);
    Helper.blur(inputEL);
    expect(inputEL.hasAttribute('focused')).to.be.eql(false);
    done();
  });

  it('should set el.$.input.value to el.value', function( done ) {
    let inputEL = Helper.targetEL;

    inputEL.value = 'testValue';
    expect(inputEL.$.input.value).to.be.eql('testValue');
    done();
  });

  it('can cancel value', function( done ) {
    let inputEL = Helper.targetEL;

    Helper.focus(inputEL);
    inputEL.inputValue = 'testValue';
    inputEL.cancel();
    expect(inputEL.value).to.be.eql('');
    done();
  });

  it('can confirm value', function( done ) {
    let inputEL = Helper.targetEL;

    Helper.focus(inputEL);
    inputEL.inputValue = 'testValue';
    inputEL.confirm();
    expect(inputEL.value).to.be.eql('testValue');
    done();
  });

  it('should empty value after clear() called', function( done ) {
    let inputEL = Helper.targetEL;

    inputEL.value = 'testValue';
    expect(inputEL.inputValue).to.be.eql('testValue');
    inputEL.clear();
    expect(inputEL.value).to.be.eql('');
    expect(inputEL.inputValue).to.be.eql('');
    done();
  });
});

describe('<editor-input value="{{foo}}">', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/input.html', 'bind');

  it('should bind value to foo', function() {
    let inputEL = Helper.targetEL;

    inputEL.foo = 'foo';
    expect(inputEL.$.input.value).to.be.eql('foo');
  });

  it('should work binding value to undefined', function() {
    let inputEL = Helper.targetEL;

    inputEL.foo = undefined;
    expect(inputEL.$.input.value).to.be.eql(undefined);
  });
});

describe('<editor-input value="foobar">', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/input.html', 'value');

  it('should initialize value to foobar', function( done ) {
    let inputEL = Helper.targetEL;

    expect(inputEL.value).to.be.eql('foobar');
    expect(inputEL.inputValue).to.be.eql('foobar');
    expect(inputEL.$.input.value).to.be.eql('foobar');
    done();
  });
});

describe('<editor-input disabled>', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/input.html', 'disabled');

  it('should be disabled', function( done ) {
    let inputEL = Helper.targetEL;

    expect(inputEL.disabled).to.be.eql(true);
    done();
  });
});


describe('<editor-input invalid>', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/input.html', 'invalid');

  it('should be invalid', function( done ) {
    let inputEL = Helper.targetEL;

    expect(inputEL.invalid).to.be.eql(true);
    done();
  });
});
