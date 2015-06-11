Tester.checkLeaks(false);

describe('<editor-loader>', function() {
    var loaderEl;
    beforeEach(function ( done ) {
        fixture('widget', function ( el ) {
            loaderEl = el;
            done();
        });
    });

    it('should be initLoader', function( done ) {
        var div = document.createElement('div');
        loaderEl.initLoader(div);
        expect(div.getElementsByTagName('editor-loader').length).to.be.eql(1);
        done();
    });

    it('should be clear loader', function( done ) {
        var div = document.createElement('div');
        loaderEl.initLoader(div);
        expect(div.getElementsByTagName('editor-loader').length).to.be.eql(1);
        loaderEl.clear();
        expect(div.getElementsByTagName('editor-loader').length).to.be.eql(0);
        done();
    });

    it('should be set mask', function( done ) {
        loaderEl.mask = true;
        expect(loaderEl.hasAttribute('mask')).to.be.eql(true);
        sinon.spy(loaderEl,'initLoader');
        loaderEl.ready();
        assert( loaderEl.initLoader.calledOnce );
        loaderEl.mask = false;
        expect(loaderEl.hasAttribute('mask')).to.be.eql(false);
        done();
    });

    it('should be set attribute mask', function( done ) {
        loaderEl.setAttribute('mask','');
        sinon.spy(loaderEl,'initLoader');
        loaderEl.ready();
        assert( loaderEl.initLoader.calledOnce );
        done();
    });
});
