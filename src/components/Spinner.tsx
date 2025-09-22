// const Spinner = () => {
//   return (
//     <div className="flex justify-center items-center h-full py-8">
//       <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//     </div>
//   );
// };

// export default Spinner;


const Spinner = () => (
  <div className="flex justify-center items-center py-8">
    <svg
      className="animate-spin h-10 w-10 text-indigo-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Loading"
      role="status"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  </div>
);

export default Spinner;
