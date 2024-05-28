import { AiOutlineMenu } from "react-icons/ai";

export default function LowerHeader() {
  return (
    <div className="bg-[#232f3e] text-white pb-1">
      <ul className="flex list-none gap-[5px]">
        <li className="p-2 hover:border-[1px] hover:border-white hover:rounded-[3px] flex gap-0.5 items-center">
          <AiOutlineMenu />
          All
        </li>
        <li className="hidden sm:block p-2 hover:border-[1px] hover:border-white hover:rounded-[3px]">
          Today&apos;s Deals
        </li>
        <li className="hidden sm:block p-2 hover:border-[1px] hover:border-white hover:rounded-[3px]">
          Customer Service
        </li>
        <li className="hidden sm:block p-2 hover:border-[1px] hover:border-white hover:rounded-[3px]">
          Registry
        </li>
        <li className="hidden sm:block p-2 hover:border-[1px] hover:border-white hover:rounded-[3px]">
          Gift Cards
        </li>
        <li className="hidden sm:block p-2 hover:border-[1px] hover:border-white hover:rounded-[3px]">
          Sell
        </li>
      </ul>
    </div>
  );
}
