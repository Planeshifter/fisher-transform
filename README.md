[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Dependencies][dependencies-image]][dependencies-url]

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
- rho: the Pearson correlation for which inference should be carried out
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

## Unit Tests

Run tests via the command `npm test`

---
## License

[MIT license](http://opensource.org/licenses/MIT).

[npm-image]: https://badge.fury.io/js/fisher-transform.svg
[npm-url]: http://badge.fury.io/js/fisher-transform

[travis-image]: https://travis-ci.org/Planeshifter/fisher-transform.svg
[travis-url]: https://travis-ci.org/Planeshifter/fisher-transform

[coveralls-image]: https://img.shields.io/coveralls/Planeshifter/fisher-transform/master.svg
[coveralls-url]: https://coveralls.io/r/Planeshifter/fisher-transform?branch=master

[dependencies-image]: http://img.shields.io/david/Planeshifter/fisher-transform.svg
[dependencies-url]: https://david-dm.org/Planeshifter/fisher-transform
