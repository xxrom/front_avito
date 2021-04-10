import React from "react";
import { css } from "linaria";

export const Cube = ({ size = "10vmin" }) => (
  <div style={{ "--size": size }} className={cubeCss}>
    <div className="cube">
      <div className="sides">
        <div className="top" />
        <div className="right" />
        <div className="bottom" />
        <div className="left" />
        <div className="front" />
        <div className="back" />
      </div>
    </div>
  </div>
);

const cubeCss = css`
  color: black;

  --size: 10vmin;
  --border-width-fraction: 80;
  --border-radius-fraction: 12;
  --timing: ease;
  --duration: 4s;
  --delay: 400ms;

  --f: rotateY(0deg);
  --b: rotateY(-180deg);
  --l: rotateY(-90deg);
  --bt: rotateX(-90deg);
  --r: rotateY(90deg);
  --t: rotateX(90deg);
  --z1: translateZ(calc(1.38 * var(--size)));
  --z2: translateZ(calc(var(--size) / 1.8));
  --z0: translateZ(calc(1.5 * var(--size)));

  * {
    box-sizing: border-box;
  }

  & {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    height: var(--size);
    padding-left: var(--size);
    margin: 0 calc(1.3 * var(--size));
  }

  .cube {
    transform: translate(-50%, -50%);
  }

  .cube,
  .cube * {
    position: absolute;
    width: var(--size);
    height: var(--size);
  }

  .sides {
    animation: rotate var(--duration) 0.8s var(--timing) infinite;
    transform-style: preserve-3d;
    transform: rotateX(-37.5deg) rotateY(45deg);

    & * {
      border: calc(var(--size) / var(--border-width-fraction)) solid;
      border-color: var(color);
      border-radius: calc(var(--size) / var(--border-radius-fraction));
      background: #00000088;
      transform-origin: 50% 50%;
      animation-fill-mode: forwards;
    }
  }

  .right {
    animation: right var(--duration) var(--delay) var(--timing) infinite;
  }
  .bottom {
    animation: bottom var(--duration) 0ms var(--timing) infinite;
  }
  .left {
    animation: left var(--duration) var(--delay) var(--timing) infinite;
  }
  .front {
    animation: front var(--duration) var(--delay) var(--timing) infinite;
  }
  .back {
    animation: back var(--duration) var(--delay) var(--timing) infinite;
  }
  .top {
    animation: top var(--duration) 0ms var(--timing) infinite;
  }

  @keyframes back {
    0% {
      transform: var(--b) var(--z1);
    }
    20% {
      transform: var(--b) var(--z2);
    }
    70% {
      transform: var(--b) var(--z2);
    }
    90% {
      transform: var(--b) var(--z1);
    }
    100% {
      transform: var(--b) var(--z1);
    }
  }

  @keyframes front {
    0% {
      transform: var(--f) var(--z1);
    }
    20% {
      transform: var(--f) var(--z2);
    }
    70% {
      transform: var(--f) var(--z2);
    }
    90% {
      transform: var(--f) var(--z1);
    }
    100% {
      transform: var(--f) var(--z1);
    }
  }

  @keyframes left {
    0% {
      transform: var(--l) var(--z1);
    }
    20% {
      transform: var(--l) var(--z2);
    }
    70% {
      transform: var(--l) var(--z2);
    }
    90% {
      transform: var(--l) var(--z1);
    }
    100% {
      transform: var(--l) var(--z1);
    }
  }

  @keyframes bottom {
    0% {
      transform: var(--bt) var(--z0);
    }
    20% {
      transform: var(--bt) var(--z2);
    }
    70% {
      transform: var(--bt) var(--z2);
    }
    90% {
      transform: var(--bt) var(--z0);
    }
    100% {
      transform: var(--bt) var(--z0);
    }
  }

  @keyframes right {
    0% {
      transform: var(--r) var(--z1);
    }
    20% {
      transform: var(--r) var(--z2);
    }
    70% {
      transform: var(--r) var(--z2);
    }
    90% {
      transform: var(--r) var(--z1);
    }
    100% {
      transform: var(--r) var(--z1);
    }
  }

  @keyframes top {
    0% {
      transform: var(--t) var(--z0);
    }
    20% {
      transform: var(--t) var(--z2);
    }
    70% {
      transform: var(--t) var(--z2);
    }
    90% {
      transform: var(--t) var(--z0);
    }
    100% {
      transform: var(--t) var(--z0);
    }
  }

  @keyframes rotate {
    0% {
      transform: rotateX(-37.5deg) rotateY(45deg);
    }
    50% {
      transform: rotateX(-37.5deg) rotateY(405deg);
    }
    100% {
      transform: rotateX(-37.5deg) rotateY(405deg);
    }
  }
`;
