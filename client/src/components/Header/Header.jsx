import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider";
import { useContext } from "react";
import { auth } from "../../utility/firebase";

export default function Header() {
  const [{ basket, user }] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

  return (
    <section className="sticky top-0 z-50">
      <section>
        <div className="flex flex-col h-auto bg-[#1a1a1a] sm:flex-row gap-2.5 items-center text-white sm:h-[70px]">
          <div className="flex items-center justify-center max-w-[250px]">
            <Link
              to="/"
              className="hover:border-[1px] hover:border-white hover:rounded-[3px]"
            >
              <img
                className="w-4/5 pt-[5px] ml-5 align-middle"
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="Amazon Logo"
              />
            </Link>
            <div className="flex justify-center items-center gap-[3px] font-bold p-[5px] hover:border-[1px] hover:border-white hover:rounded-[3px]">
              <span className="">
                <SlLocationPin color="green" />
              </span>
              <div className="">
                <p className="text-[10px]">Delivered to</p>
                <span className="">USA</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center rounded-[10px] overflow-hidden w-full flex-1 focus-within:border-[#eba1ad] focus-within:border-2">
            <select
              className="p-2.5 font-bold outline-1 outline-white border-none text-black h-[46px]"
              name=""
              id=""
            >
              <option value="">All</option>
            </select>
            <input
              className="p-2.5 font-bold outline-1 outline-white border-[1px] border-white w-full -mr-[2px] text-black h-[46px] "
              type="text"
              placeholder="search product"
            />
            <BsSearch
              size={40}
              className="p-1.5 bg-[#febd69] text-[#1a1a1a] hover:bg-[#d49544] h-[46px]  cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-center max-w-[450px] gap-2.5">
            <Link
              to=""
              className="hidden text-decoration-none text-white w-[100px] sm:flex p-2.5 hover:border-[1px] hover:border-white hover:rounded-[3px]"
            >
              <img
                className="w-2/5"
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt=""
              />
              <section className="bg-[#1a1a1a] text-white">
                <option value="">EN</option>
              </section>
            </Link>

            <Link
              to={!user && "/auth"}
              className="text-decoration-none text-white hover:border-[1px] hover:border-white hover:rounded-[3px]"
            >
              <div>
                {user ? (
                  <>
                    <p className="">Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p className="text-[10px]">Hello, Sign In</p>
                    <span className="">Account & Lists</span>
                  </>
                )}
              </div>
            </Link>

            <Link
              to="/orders"
              className="text-decoration-none text-white hover:border-[1px] hover:border-white hover:rounded-[3px]"
            >
              <p className="text-[10px]">returns</p>
              <span className="">& Orders</span>
            </Link>

            <Link
              to="/cart"
              className="text-decoration-none text-white relative hover:border-[1px] hover:border-white hover:rounded-[3px]"
            >
              <BiCart size={35} />
              <span className="absolute font-bold -top-1.5 left-3 text-[14px] bg-[#1a1a1a] text-orange-500 w-[15px] text-center rounded-full">
                {totalItem}
              </span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}
