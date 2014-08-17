(function () {
  describe('addEventListener tests', function () {
    context('ignores safe patterns', function () {
      context(null, function () {
        var good = acorn.parse('var a = "addEventListener";', {locations: true});
        it(good, function () {
          chai.expect(ScanJS.scan(good, document.location.pathname)).to.be.empty;
        });
      });
      context(null, function () {
        var good = 'var addEventListener = "variable with name";';
        it(good, function () {
          chai.expect(ScanJS.scan(good, document.location.pathname)).to.be.empty;
        });
      });
    });
    context('detects dangerous patterns', function () {
      context(null, function () {
        var bad = 'var el = document.getElementById("outside");el.addEventListener("click", modifyText, false);';
        it(bad, function () {
          chai.expect(ScanJS.scan(bad, document.location.pathname)).not.to.be.empty;
        });
      });
      context(null, function () {
        var bad = 'addEventListener("click", errorPageEventHandler, true, false);';
        it(bad, function () {
          chai.expect(ScanJS.scan(bad, document.location.pathname)).not.to.be.empty;
        });
      });
      context(null, function () {
        var bad = 'tab.linkedBrowser.addEventListener("load", function (event) {console.log(1);});';
        it(bad, function () {
          chai.expect(ScanJS.scan(bad, document.location.pathname)).not.to.be.empty;
        });
      });
    });
  });
})();
