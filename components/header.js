import Link from "next/link";
import { useState } from "react";

function MenuLink(props) {
  return (
    <div className="my-2 mx-4 no-underline font-medium text-gray-700 hover:text-gray-900 text-base">
      <Link href={props.href || ""}>{props.children}</Link>
    </div>
  );
}

export default function Header({ menulinks }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="py-4 z-20 right-0 left-0 top-0 fixed transition-all ease-in-out box-border">
      <div className="opacity-100 bg-background-gray bg-opacity-100 inset-0 absolute box-border" />
      <div className="max-w-screen-lg flex items-center mx-auto box-border justify-between">
        <div className="cursor-pointer box-border h-5 pl-4 text-gray-900 text-lg z-10">
          Co Edit
        </div>
        <div className="hidden md:flex">
          <div className="opacity-100 z-10 shadow-none flex flex-row p-0 static items-center inset-x-0 top-0 box-border ">
            {menulinks.map((menulink, index) => (
              <MenuLink href={menulink.href} key={index}>
                {menulink.name}
              </MenuLink>
            ))}
          </div>
        </div>

        <div
          className="flex pr-4 z-10 md:hidden"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <svg
            className="w-6 text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={showMenu ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"}
            />
          </svg>
        </div>
      </div>

      <div className="flex md:hidden">
        <div
          className={
            "fixed top-0 flex flex-col pt-16 h-auto w-full text-left bg-background-gray transition duration-500 linear delay-0 transform " +
            (showMenu
              ? "translate-y-0 shadow-2xl opacity-1"
              : "-translate-y-full opacity-0")
          }
        >
          {menulinks.map((menulink,id) => (
            <MenuLink key={id} href={menulink.href}>{menulink.name}</MenuLink>
          ))}
        </div>
      </div>
    </header>
  );
}
