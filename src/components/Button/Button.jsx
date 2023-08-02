export const Button = ({ text, handleclick }) => {
  return (
    <button type="button" onClick={handleclick}>
      {text}
    </button>
  );
};
