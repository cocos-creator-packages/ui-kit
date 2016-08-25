'use strict';

describe('<editor-loader>', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/loader.html', 'simple');

  it('should finish calling maskAt with one element', function( done ) {
    let loaderEL = Helper.targetEL;

    let div = document.createElement('div');
    loaderEL.maskAt(div);
    expect(div.getElementsByTagName('editor-loader').length).to.be.eql(1);
    done();
  });

  it('should have zero element after clear loader', function( done ) {
    let loaderEL = Helper.targetEL;

    let div = document.createElement('div');
    loaderEL.maskAt(div);
    expect(div.getElementsByTagName('editor-loader').length).to.be.eql(1);
    loaderEL.clear();
    expect(div.getElementsByTagName('editor-loader').length).to.be.eql(0);
    done();
  });
});

describe('<editor-loader mask>', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/loader.html', 'mask');

  it('should set mask attribute', function( done ) {
    let loaderEL = Helper.targetEL;

    sinon.spy(loaderEL, 'maskAt');
    loaderEL.attached();
    assert( loaderEL.maskAt.calledOnce );
    done();
  });
});
