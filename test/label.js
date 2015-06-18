describe('<editor-label>', function() {
    var labelEl;
    beforeEach(function ( done ) {
        fixture('widget', function ( el ) {
            labelEl = el;
            done();
        });
    });

    it('can be disabled', function( done ) {
        labelEl.disabled = true;
        expect(labelEl.hasAttribute('disabled')).to.be.eql(true);
        done();
    });
});
