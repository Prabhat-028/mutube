const Button = ({ name }) => {
  return (
    <button
      type="button"
      className="flex-shrink-0 px-5 py-2 m-2 bg-gray-100 rounded-xl whitespace-nowrap hover:bg-slate-200 focus:bg-slate-700 focus:text-white"
    >
      {name}
    </button>
  );
};
export default Button;