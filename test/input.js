describe('<editor-input>', function() {
    var inputEl;
    beforeEach(function ( done ) {
        fixture('widget', function ( el ) {
            inputEl = el;
            done();
        });
    });

    it('should be disabled', function( done ) {
        inputEl.disabled = true;
        expect(inputEl.hasAttribute('disabled')).to.be.eql(true);
        done();
    });

    it('should be invalid', function( done ) {
        inputEl.invalid = true;
        expect(inputEl.hasAttribute('invalid')).to.be.eql(true);
        done();
    });

    it('should be focused', function( done ) {
        Tester.focus(inputEl);
        expect(inputEl.hasAttribute('focused')).to.be.eql(true);
        done();
    });

    it('should be blured', function( done ) {
        Tester.focus(inputEl);
        expect(inputEl.hasAttribute('focused')).to.be.eql(true);
        Tester.blur(inputEl);
        expect(inputEl.hasAttribute('focused')).to.be.eql(false);
        done();
    });

    it('should set el.$.input.value to el.value', function( done ) {
        inputEl.value = 'testValue';
        expect(inputEl.$.input.value).to.be.eql('testValue');
        done();
    });


    it('can cancel value', function( done ) {
        Tester.focus(inputEl);
        inputEl.inputValue = 'testValue';
        inputEl.cancel();
        expect(inputEl.value).to.be.eql('');
        done();
    });

    it('can confirm value', function( done ) {
        Tester.focus(inputEl);
        inputEl.inputValue = 'testValue';
        inputEl.confirm();
        expect(inputEl.value).to.be.eql('testValue');
        done();
    });

    it('should empty value after clear() called', function( done ) {
        inputEl.value = 'testValue';
        expect(inputEl.inputValue).to.be.eql('testValue');
        inputEl.clear();
        expect(inputEl.value).to.be.eql('');
        expect(inputEl.inputValue).to.be.eql('');
        done();
    });
});

describe('<editor-input value="{{foo}}">', function() {
    var scopeEL;
    beforeEach(function ( done ) {
        fixture('bind-to-object', function ( el ) {
            scopeEL = el;
            done();
        });
    });

    it('should bind value to foo', function() {
        scopeEL.foo = 'foo';
        expect(scopeEL.$.input.value).to.be.eql('foo');
    });

    it('should work binding value to undefined', function() {
        scopeEL.foo = undefined;
        expect(scopeEL.$.input.value).to.be.eql(undefined);
    });
});

describe('<editor-input value="foobar">', function() {
    var inputEl;
    beforeEach(function ( done ) {
        fixture('value', function ( el ) {
            inputEl = el;
            done();
        });
    });

    it('should initialize value to foobar', function( done ) {
        expect(inputEl.value).to.be.eql('foobar');
        expect(inputEl.inputValue).to.be.eql('foobar');
        expect(inputEl.$.input.value).to.be.eql('foobar');
        done();
    });
});

describe('<editor-input disabled>', function() {
    var inputEl;
    beforeEach(function ( done ) {
        fixture('disabled', function ( el ) {
            inputEl = el;
            done();
        });
    });

    it('should be disabled', function( done ) {
        expect(inputEl.disabled).to.be.eql(true);
        done();
    });
});


describe('<editor-input invalid>', function() {
    var inputEl;
    beforeEach(function ( done ) {
        fixture('invalid', function ( el ) {
            inputEl = el;
            done();
        });
    });

    it('should be invalid', function( done ) {
        expect(inputEl.invalid).to.be.eql(true);
        done();
    });
});
