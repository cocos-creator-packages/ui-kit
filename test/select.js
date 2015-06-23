Tester.checkLeaks(false);

describe('<editor-loader mask>', function() {
    var loaderEl;
    beforeEach(function ( done ) {
        fixture('mask', function ( el ) {
            loaderEl = el;
            done();
        });
    });
    afterEach(function ( done ) {
        loaderEl.initLoader.restore();
        done();
    });

    it('should be set mask', function( done ) {
        sinon.spy(loaderEl, 'initLoader');
        loaderEl.ready();
        assert( loaderEl.initLoader.calledOnce );
        done();
    });
});
