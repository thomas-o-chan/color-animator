# Color Animator

Simple color interpolation library for transitioning between colors when animating.

## Installation

To install run

```
npm install color-animator
```

## Usage

To interpolate between 2 colours, call the interpolator

```
import interpolate from 'color-animator';

// get the color half way between the start and end color
const myColor = interpolate(startColor, endColor, 0.5);
```

This can be used inside your own animation loop to update a color along a transition

## Motivation

While there are many utilities for interpolating between colors for static displays, there are very few for transitioning between colors while animating. Moving through color space in this scenario requires a different strategy, as there are various issues not encountered with static transitions.

This library aims to minimise the 'strobe' effect of animations, where transitions appear to flash between different colors while moving through the transition.
