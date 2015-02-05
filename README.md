[![NPM version](https://badge.fury.io/js/fisher-transform.svg)](http://badge.fury.io/js/fisher-transform)
[![Build Status](https://travis-ci.org/Planeshifter/fisher-transform.svg)](https://travis-ci.org/Planeshifter/fisher-transform)

# Inference for Pearson correlation

## Installation & Usage

```
npm install fisher-transform
```

Require as follows:

```
var fisher = require('fisher-transform');
```

`fisher` exports the following functions:

## `fisherTest(rho, n, [alpha, alternative, rho_0]`)

The function parameters are:
- rho: the Pearon correlation for which inference should be carried out
- n: the number of sample observations
- alpha: the significance level of the test, default value is 0.05
- alternative: default value "two-sided", for one-sided tests options "greater" and "less" exist
- rho_0: the value of rho assumed under the null hypothesis, default value is 0

Specifically, the two-sided test is

H_0: rho = rho_0 vs. H_1: rho != rho_0

and the one-sided tests are

H_0: rho = rho_0 vs. H_1: rho >= rho_0

and

H_0: rho = rho_0 vs. H_1: rho <= rho_0

For the chosen test, its p-value is calculated. In addition, a 1-alpha confidence interval is constructed by inverting the test statistic. The function returns an object with with two keys: pvalue and CI. The former holds the pvalue, while the latter is an Array with two elements, the lower and upper bounds of the calculated confidence interval.

## `r2z(r)`

Applies the Fisher transformation to r to obtain z, where z = arctanh(r)

## `z2r(z)`
Applies the inverse Fisher transformation to z in order to recover r, where r = tanh(z)

## `zScore(r, r_0, n)`
Returns the Fisher z-score for Pearson correlation r under the null hypothesis that r = r_0. Approximately, the z-score follows a standard normal distribution.
