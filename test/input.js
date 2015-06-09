Tester.checkLeaks(false);

describe('<editor-input>', function() {
    var inputEl;
    beforeEach(function ( done ) {
        fixture('widget', function ( el ) {
            inputEl = el;
            done();
        });
    });

    it('can be disabled', function( done ) {
        inputEl.disabled = true;
        expect(inputEl.hasAttribute('disabled')).to.be.eql(true);
        done();
    });

    it('can be set value', function( done ) {
        inputEl.value = 'testValue';
        expect(inputEl.$.input.value).to.be.eql('testValue');
        done();
    });

    it('can be bidding value', function( done ) {
        inputEl.value = 'testValue';
        expect(inputEl.$.input.bindValue).to.be.eql('testValue');
        done();
    });

    it('can be clear value', function( done ) {
        inputEl.value = 'testValue';
        expect(inputEl.$.input.bindValue).to.be.eql('testValue');
        inputEl.clear();
        expect(inputEl.value).to.be.eql('');
        expect(inputEl.$.input.bindValue).to.be.eql('');
        done();
    });

    it('test invalid', function( done ) {
        inputEl.invalid = true;
        expect(inputEl.hasAttribute('invalid')).to.be.eql(true);
        done();
    });

    it('can be focus', function( done ) {
        Tester.focus(inputEl);
        expect(inputEl.hasAttribute('focused')).to.be.eql(true);
        done();
    });

    it('can be blur', function( done ) {
        Tester.focus(inputEl);
        expect(inputEl.hasAttribute('focused')).to.be.eql(true);
        Tester.blur(inputEl);
        expect(inputEl.hasAttribute('focused')).to.be.eql(false);
        done();
    });

    it('can be confirm<press Enter>', function( done ) {
        Tester.focus(inputEl);
        inputEl.value = 'testValue';
        expect(inputEl.lastValue).to.be.eql('');
        Tester.keydown(inputEl.$.input,'enter');
        expect(inputEl.value).to.be.eql('testValue');
        done();
    });

    it('can be undo<press ESC>', function( done ) {
        Tester.focus(inputEl);
        inputEl.value = 'testValue';
        expect(inputEl.lastValue).to.be.eql('');
        Tester.keydown(inputEl.$.input,'esc');
        expect(inputEl.value).to.be.eql('');
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

    it('shoudl bind value to foo', function() {
        scopeEL.foo = 'foo';
        expect(scopeEL.$.input.value).to.be.eql('foo');
    });

    it('shoudl work when binding value to undefined', function() {
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

    it('should init value with foobar', function( done ) {
        expect(inputEl.value).to.be.eql('foobar');
        expect(inputEl.$.input.bindValue).to.be.eql('foobar');
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

    it('set element attribute disabled', function( done ) {
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

    it('set element attribute invalid', function( done ) {
        expect(inputEl.invalid).to.be.eql(true);
        done();
    });
});
