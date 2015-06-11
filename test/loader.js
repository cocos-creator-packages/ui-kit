Tester.checkLeaks(false);

describe('<editor-loader>', function() {
    var loaderEl;
    beforeEach(function ( done ) {
        fixture('widget', function ( el ) {
            loaderEl = el;
            done();
        });
    });

    it('should be disabled', function( done ) {
        loaderEl.disabled = true;
        expect(loaderEl.hasAttribute('disabled')).to.be.eql(true);
        done();
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
});
