'use strict';

describe('<editor-loader>', function() {
  let loaderEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/loader.html', 'simple', el => {
      loaderEL = el;
      document.body.appendChild(loaderEL);
      done();
    });
  });

  afterEach(function ( done ) {
    loaderEL.remove();
    done();
  });

  it('should finish calling maskAt with one element', function( done ) {
    let div = document.createElement('div');
    loaderEL.maskAt(div);
    expect(div.getElementsByTagName('editor-loader').length).to.be.eql(1);
    done();
  });

  it('should have zero element after clear loader', function( done ) {
    let div = document.createElement('div');
    loaderEL.maskAt(div);
    expect(div.getElementsByTagName('editor-loader').length).to.be.eql(1);
    loaderEL.clear();
    expect(div.getElementsByTagName('editor-loader').length).to.be.eql(0);
    done();
  });
});

describe('<editor-loader mask>', function() {
  let loaderEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/loader.html', 'mask', el => {
      loaderEL = el;
      document.body.appendChild(loaderEL);
      done();
    });
  });

  afterEach(function ( done ) {
    loaderEL.remove();
    done();
  });

  it('should set mask attribute', function( done ) {
    sinon.spy(loaderEL, 'maskAt');
    loaderEL.attached();
    assert( loaderEL.maskAt.calledOnce );
    done();
  });
});
