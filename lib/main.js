var normal = require('jStat').jStat.normal;

if(typeof Math.tanh != 'function'){
  Math.tanh = function tanh(x) {
    var y;
    return x === Infinity ? 1 : x === -Infinity ? -1 : (y = Math.exp(2 * x), (y - 1) / (y + 1));
  };
}

function Phi(x){
  return normal.cdf(x, 0, 1);
}

function Phi_inv(p){
  return normal.inv(p, 0, 1);
}

function r2z(r){
  return (1/2) * Math.log( (1+r) / (1-r) );
}

function zScore(r, r_0, n){
  return (r2z(r) - r2z(r_0)) * Math.sqrt(n-3);
}

function z2r(z){
  return Math.tanh(z);
}

function fisherTest(rho, n, alpha, alternative, rho_0){

  if(rho === undefined || n === undefined){
    throw new Error("First two parameters, rho and n, have to be supplied.");
  }

  if (!alternative){
    alternative = "two-sided";
  }

  if (!alpha){
    alpha = 0.05;
  }

  if (!rho_0){
    rho_0 = 0;
  }

  var z = zScore(rho, rho_0, n);
  var se = 1/(Math.sqrt(n-3));

  var o = {};
  if(alternative === "two-sided"){
    o.pvalue = 2 * Phi( - Math.abs(z) );

    var z_alpha_over_two = Phi_inv(1-alpha/2);
    o.CI = [
      Math.tanh(r2z(rho) - z_alpha_over_two * se ),
      Math.tanh(r2z(rho) + z_alpha_over_two * se )
    ];
  } else if (alternative === "greater"){

    o.pvalue =  Phi(-z);
    o.CI = [
      Math.tanh( - Infinity ),
      Math.tanh(r2z(rho) + Phi_inv(1-alpha) * se )
    ];

  } else if (alternative === "less"){
    o.pvalue = 1 - Phi(-z);
    o.CI = [
      Math.tanh( r2z(rho) - Phi_inv(1-alpha) * se  ),
      Math.tanh( Infinity )
    ];
  }

  return o;
}

module.exports = exports = {
  fisherTest: fisherTest,
  r2z       : r2z,
  z2r       : z2r,
  zScore    : zScore
};
