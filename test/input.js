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
});
