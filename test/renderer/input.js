'use strict';

describe('<editor-input>', function() {
  let inputEL;
  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/input.html', 'simple', el => {
      inputEL = el;
      document.body.appendChild(inputEL);
      done();
    });
  });

  afterEach(function ( done ) {
    inputEL.remove();
    done();
  });

  it('should be disabled', function( done ) {
    inputEL.disabled = true;
    expect(inputEL.hasAttribute('disabled')).to.be.eql(true);
    done();
  });

  it('should be invalid', function( done ) {
    inputEL.invalid = true;
    expect(inputEL.hasAttribute('invalid')).to.be.eql(true);
    done();
  });

  it('should be focused', function( done ) {
    Helper.focus(inputEL);
    expect(inputEL.hasAttribute('focused')).to.be.eql(true);
    done();
  });

  it('should be blured', function( done ) {
    Helper.focus(inputEL);
    expect(inputEL.hasAttribute('focused')).to.be.eql(true);
    Helper.blur(inputEL);
    expect(inputEL.hasAttribute('focused')).to.be.eql(false);
    done();
  });

  it('should set el.$.input.value to el.value', function( done ) {
    inputEL.value = 'testValue';
    expect(inputEL.$.input.value).to.be.eql('testValue');
    done();
  });

  it('can cancel value', function( done ) {
    Helper.focus(inputEL);
    inputEL.inputValue = 'testValue';
    inputEL.cancel();
    expect(inputEL.value).to.be.eql('');
    done();
  });

  it('can confirm value', function( done ) {
    Helper.focus(inputEL);
    inputEL.inputValue = 'testValue';
    inputEL.confirm();
    expect(inputEL.value).to.be.eql('testValue');
    done();
  });

  it('should empty value after clear() called', function( done ) {
    inputEL.value = 'testValue';
    expect(inputEL.inputValue).to.be.eql('testValue');
    inputEL.clear();
    expect(inputEL.value).to.be.eql('');
    expect(inputEL.inputValue).to.be.eql('');
    done();
  });
});

describe('<editor-input value="{{foo}}">', function() {
  let inputEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/input.html', 'bind', el => {
      inputEL = el;
      document.body.appendChild(inputEL);
      done();
    });
  });

  afterEach(function ( done ) {
    inputEL.remove();
    done();
  });

  it('should bind value to foo', function() {
    inputEL.foo = 'foo';
    expect(inputEL.$.input.value).to.be.eql('foo');
  });

  it('should work binding value to undefined', function() {
    inputEL.foo = undefined;
    expect(inputEL.$.input.value).to.be.eql(undefined);
  });
});

describe('<editor-input value="foobar">', function() {
  let inputEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/input.html', 'value', el => {
      inputEL = el;
      document.body.appendChild(inputEL);
      done();
    });
  });

  afterEach(function ( done ) {
    inputEL.remove();
    done();
  });

  it('should initialize value to foobar', function( done ) {
    expect(inputEL.value).to.be.eql('foobar');
    expect(inputEL.inputValue).to.be.eql('foobar');
    expect(inputEL.$.input.value).to.be.eql('foobar');
    done();
  });
});

describe('<editor-input disabled>', function() {
  let inputEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/input.html', 'disabled', el => {
      inputEL = el;
      document.body.appendChild(inputEL);
      done();
    });
  });

  afterEach(function ( done ) {
    inputEL.remove();
    done();
  });

  it('should be disabled', function( done ) {
    expect(inputEL.disabled).to.be.eql(true);
    done();
  });
});


describe('<editor-input invalid>', function() {
  let inputEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/input.html', 'invalid', el => {
      inputEL = el;
      document.body.appendChild(inputEL);
      done();
    });
  });

  afterEach(function ( done ) {
    inputEL.remove();
    done();
  });

  it('should be invalid', function( done ) {
    expect(inputEL.invalid).to.be.eql(true);
    done();
  });
});
