import { useState } from "react";

const Problem1n4 = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  const sum_to_n_a = function (n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  };

  const sum_to_n_b = function (n: number): number {
    let sum = 0;
    let i = 1;
    while (i <= n) {
      sum += i;
      i++;
    }
    return sum;
  };

  const sum_to_n_c = function (n: number): number {
    if (n <= 0) {
      return 0;
    }
    return (n * (n + 1)) / 2;
  };

  return (
    <div>
      <div>
        <h2>Problem 1</h2>
        <p>
          Write a function that returns the sum of all positive integers up to
          n.
        </p>
        <p>
          For example, sum_to_n(4) should return 10 because 1 + 2 + 3 + 4 = 10.
        </p>
      </div>
      <div>
        <h3>Solution 1</h3>
        <div>
          <input
            type="number"
            onChange={(e) => {
              setA(sum_to_n_a(parseInt(e.target.value)));
            }}
          />
          <p>Sum: {a}</p>
        </div>
      </div>
      <div>
        <h3>Solution 2</h3>
        <div>
          <input
            type="number"
            onChange={(e) => {
              setB(sum_to_n_b(parseInt(e.target.value)));
            }}
          />
          <p>Sum: {b}</p>
        </div>
      </div>
      <div>
        <h3>Solution 3</h3>
        <div>
          <input
            type="number"
            onChange={(e) => {
              setC(sum_to_n_c(parseInt(e.target.value)));
            }}
          />
          <p>Sum: {c}</p>
        </div>
      </div>
    </div>
  );
};

export default Problem1n4;
