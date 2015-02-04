var normal = require('jStat').jStat.normal;

function Phi(x){
  return normal.cdf(x, 0, 1);
}

function Phi_inv(p){
  return normal.inv(p, 0, 1);
}

function F(r){
  return (1/2) * Math.log( (1+r) / (1-r) );
}

function zScore(r, r_0, n){
  return (F(r) - F(r_0)) * Math.sqrt(n-3);
}

function fisherTest(rho, n, alpha, alternative, rho_0){

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
    o.pvalue = 2 * Phi(-z);

    var z_alpha_over_two = Phi_inv(1-alpha/2);
    o.CI = [
      Math.tanh(F(rho) - z_alpha_over_two * se ),
      Math.tanh(F(rho) + z_alpha_over_two * se )
    ];
  } else if (alternative === "greater"){

    o.pvalue =  1 - Phi(-z);
    o.CI = [
      Math.tanh( - Infinity ),
      Math.tanh(F(rho) + Phi_inv(1-alpha) * se )
    ];

  } else if (alternative === "less"){
    o.pvalue = Phi(-z);
    o.CI = [
      Math.tanh( F(rho) - Phi_inv(1-alpha) * se  ),
      Math.tanh( Infinity )
    ];
  }

  return o;
}

module.exports = exports = fisherTest;
