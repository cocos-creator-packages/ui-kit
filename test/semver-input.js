describe('<editor-semver>', function() {
    var semverEl;
    beforeEach(function ( done ) {
        fixture('widget', function ( el ) {
            semverEl = el;
            done();
        });
    });

    it('should be set value', function( done ) {
        semverEl.value = '1.0.0';
        expect(semverEl.majorVersion).to.be.eql('1');
        expect(semverEl.secondVersion).to.be.eql('0');
        expect(semverEl.revision).to.be.eql('0');
        expect(semverEl.getElementsByTagName('input')[0].value).to.be.eql('1');
        expect(semverEl.getElementsByTagName('input')[1].value).to.be.eql('0');
        expect(semverEl.getElementsByTagName('input')[2].value).to.be.eql('0');
        done();
    });

    it('should be set invalid', function( done ) {
        semverEl.value = '1.0.0';
        semverEl.value = '1.0x.0';
        expect(semverEl.majorVersion).to.be.eql('1');
        expect(semverEl.secondVersion).to.be.eql('0x');
        expect(semverEl.revision).to.be.eql('0');
        expect(semverEl.invalid).to.be.eql(true);
        done();
    });
});
