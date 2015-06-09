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
});
