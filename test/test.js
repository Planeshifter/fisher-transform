var chai = require('chai');
var expect = chai.expect;

var fisher = require("../lib/main.js").fisherTest;
var zScore = require("../lib/main.js").r2z;

var s = "function calculates CI and pvalue for Pearson correlation rho";
describe(s, function(){
  it("throws when first two arguments are not supplied", function(){
    expect(function(){
      fisher();
    }).to.throw(Error);
  });
  it("returns object with two keys, CI and pvalue", function(){
    var ret = fisher(0.8, 100);
    expect(ret).to.include.keys(['CI','pvalue']);
  });
  it("pvalue is in range [0,1]", function(){
    var pvalue = fisher(0.8, 100).pvalue;
    expect(pvalue).to.be.within(0,1);
  });
  it("correctly calculates pvalue for negative rho (two-sided)", function(){
    var pvalue = fisher(-0.2, 100).pvalue;
    expect(pvalue).to.be.closeTo(0.046, 0.01);
  });
  it("correctly calculates pvalue for positive rho (two-sided)", function(){
    var pvalue = fisher(0.2, 100).pvalue;
    expect(pvalue).to.be.closeTo(0.046, 0.01);
  });
  it("correctly calculates pvalue for positive rho (greater)", function(){
    var pvalue = fisher(0.2, 100, 0.05, "greater").pvalue;
    expect(pvalue).to.be.closeTo(0.0232, 0.01);
  });
  it("correctly calculates pvalue for negative rho (greater)", function(){
    var pvalue = fisher(-0.2, 100, 0.05, "greater").pvalue;
    expect(pvalue).to.be.closeTo(0.976, 0.01);
  });
  it("correctly calculates pvalue for positive rho (less)", function(){
    var pvalue = fisher(0.2, 100, 0.05, "less").pvalue;
    expect(pvalue).to.be.closeTo(0.976, 0.01);
  });
  it("correctly calculates pvalue for negative rho (less)", function(){
    var pvalue = fisher(-0.2, 100, 0.05, "less").pvalue;
    expect(pvalue).to.be.closeTo(0.023, 0.01);
  });
});
