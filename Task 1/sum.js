function sum_to_n(n) {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

function sum_to_n(n) {
  let sum = 0;
  let i = 1;

  while (i <= n) {
    sum += i;
    i++;
  }

  return sum;
}

function sum_to_n(n) {
  if (n <= 1) {
    return n;
  }

  return n + sum_to_n(n - 1);
}

function sum_to_n(n) {
  return (n * (n + 1)) / 2;
}

function sum_to_n(n) {
  return (
    Array
      .from({ length: n }, (_, i) => i + 1)
      .reduce((acc, curr) => acc + curr, 0)
  );
}
