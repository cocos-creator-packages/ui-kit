describe('<editor-loader>', function() {
    var loaderEl;
    beforeEach(function ( done ) {
        fixture('widget', function ( el ) {
            loaderEl = el;
            done();
        });
    });

    it('should finish calling maskAt with one element', function( done ) {
        var div = document.createElement('div');
        loaderEl.maskAt(div);
        expect(div.getElementsByTagName('editor-loader').length).to.be.eql(1);
        done();
    });

    it('should have zero element after clear loader', function( done ) {
        var div = document.createElement('div');
        loaderEl.maskAt(div);
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
        loaderEl.maskAt.restore();
        done();
    });

    it('should set mask attribute', function( done ) {
        sinon.spy(loaderEl, 'maskAt');
        loaderEl.attached();
        assert( loaderEl.maskAt.calledOnce );
        done();
    });
});
