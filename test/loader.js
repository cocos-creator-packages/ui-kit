describe('<editor-loader>', function() {
    var loaderEl;
    beforeEach(function ( done ) {
        fixture('widget', function ( el ) {
            loaderEl = el;
            done();
        });
    });

    it('should finish calling initLoader with one element', function( done ) {
        var div = document.createElement('div');
        loaderEl.initLoader(div);
        expect(div.getElementsByTagName('editor-loader').length).to.be.eql(1);
        done();
    });

    it('should have zero element after clear loader', function( done ) {
        var div = document.createElement('div');
        loaderEl.initLoader(div);
        expect(div.getElementsByTagName('editor-loader').length).to.be.eql(1);
        loaderEl.clear();
        expect(div.getElementsByTagName('editor-loader').length).to.be.eql(0);
        done();
    });

});

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

    it('should set mask attribute', function( done ) {
        sinon.spy(loaderEl, 'initLoader');
        loaderEl.ready();
        assert( loaderEl.initLoader.calledOnce );
        done();
    });
});
