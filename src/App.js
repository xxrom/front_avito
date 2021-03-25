import React, { useState } from "react";
import { styled } from "linaria/react";
import { hot } from "react-hot-loader/root";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <H1>Hello World!</H1>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  );
};

const H1 = styled.h1`
  color: red;
`;

export default hot(App);
