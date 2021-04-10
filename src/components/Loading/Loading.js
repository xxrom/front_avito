import React from "react";
import { styled } from "linaria/react";
import { Cube } from "./Cube";

export const Loading = ({ type = "default", size = "10vmin" }) => (
  <Body>
    {type === "cube" && <Cube size={size} />}
    {type === "default" && <LoadingSpinner />}
  </Body>
);
//<LoadingSpinner />

const Body = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: 100vh;
  overflow: auto;
  width: 100vw;

  justify-content: center;
  align-items: center;
  background: #ffffff77;
`;

const LoadingSpinner = styled.div`
  pointer-events: none;
  width: 10vw;
  height: 10vw;
  border: 3vw solid transparent;
  border-color: #eee;
  border-top-color: #3e67ec;
  border-bottom-color: transparent;
  border-right-color: blue;
  border-radius: 50%;
  animation: loadingspin 1s linear infinite;

  @keyframes loadingspin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
