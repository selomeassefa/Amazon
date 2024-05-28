import FadeLoader from "react-spinners/FadeLoader";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <FadeLoader color="#36d7b7" />
    </div>
  );
}
