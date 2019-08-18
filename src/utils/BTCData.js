export const mergeOuts = ({ x }) => {
  const {
    inputs,
    out,
  } = x;
  const prevOuts = inputs.map(input => ({...input.prev_out, prev: true}));
  return prevOuts.concat(out);
}
