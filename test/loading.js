Tester.checkLeaks(false);

describe('<editor-loading>', function() {
    var loadingEl;
    beforeEach(function ( done ) {
        fixture('widget', function ( el ) {
            loadingEl = el;
            done();
        });
    });

    it('should be disabled', function( done ) {
        loadingEl.disabled = true;
        expect(loadingEl.hasAttribute('disabled')).to.be.eql(true);
        done();
    });
});
