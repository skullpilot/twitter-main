import { useSelector } from "react-redux";
import Header from "../components/header";
import Footer from "../components/footer";
import { selectSession } from "../lib/redux/slices/sessionSlice";

function DescriptionCard({ title, description, imgSrc, bgColor }) {
  return (
    <div
      className={`shadow-2xl flex flex-col mx-auto rounded-xl w-full px-8 pb-8 md:pb-16 ${bgColor}`}
    >
      <img alt="Image placeholder" src={imgSrc} className="h-48 mt-8" />
      <div className="font-bold text-xl mt-8">{title}</div>
      <div className="mt-2 text-gray-500 opacity-6">{description}</div>
    </div>
  );
}

export default function Home() {
  const { token } = useSelector(selectSession);

  const menulinks = token
    ? [
      { href: "/", name: "Home" },
      { href: "/product/", name: "Product" },
      { href: "/blog/", name: "Blog" },
      { href: "/orders", name: "Dashboard" }
    ]
    : [
      { href: "/", name: "Home" },
      { href: "/product/", name: "Product" },
      { href: "/blog/", name: "Blog" },
      { href: "/login", name: "Login" }
    ];

  return (
    <main className="bg-background-gray">
      <Header menulinks={menulinks} />
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-screen-lg mx-auto pt-20 md:pt-32">
        <div className="flex flex-col pl-8 pr-8 md:pl-0 md:pr-12 items-center justify-center text-center md:text-left">
          <div className="flex md:hidden mb-8">
            <img
              alt="Image placeholder"
              src="./assets/home/desktop.svg"
              className="h-88"
            />
          </div>
          <div className="text-2xl md:text-5xl font-bold">
            Collaborate to build a{" "}
            <span className="text-primary">job-worthy resume</span>
          </div>
          <div className="text-sm md:text-lg text-gray-500 mt-6">
            Only 2% of resumes make it past the first round. Be in the top 2%
          </div>
          <div className="flex flex-row mt-2 md:mt-4 justify-center md:justify-start w-full">
            <div className="flex bg-primary hover:bg-primary-gray h-10 px-10 m:h-12 m:px-12 rounded-lg text-white items-center justify-center font-bold cursor-pointer">
              <div>Join Us</div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex">
          <img
            alt="Image placeholder"
            src="./assets/home/desktop.svg"
            className="h-88"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-screen-lg mx-auto md:gap-8 pt-20 px-8 md:px-0">
        <div className="flex flex-col text-left md:text-right">
          <div className="text-danger text-2xl md:text-5xl">200+</div>
          <p className="text-base">
            Connect you with experienced professional and collaborte building
            high quality resume with less time and money spent.
          </p>
        </div>
        <div className="font-bold text-2xl md:text-5xl">
          Professional Resume Reviews in 2020
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 max-w-screen-lg mx-auto gap-4 md:gap-8 pt-10 md:pt-20 px-8 md:px-0">
        <div>
          <DescriptionCard
            title="提升求职背景"
            description="精准定位求职者的目标行业与岗位，提供专业的背景提升方案"
            imgSrc="./assets/home/business-woman-working.svg"
            bgColor="bg-card-pink"
          />
        </div>
        <div className="md:mt-10">
          <DescriptionCard
            title="匹配资深导师"
            description="基于用户背景和需求，AI引擎推送资深导师来供求职者选择和匹配"
            imgSrc="./assets/home/collaboration.svg"
            bgColor="bg-card-green"
          />
        </div>
        <div className="md:mt-20">
          <DescriptionCard
            title="助你求职加速"
            description="专属行业内推网络和独家招聘信息渠道，让你早一步拿到面试"
            imgSrc="./assets/home/big-launch.svg"
            bgColor="bg-card-yellow"
          />
        </div>
      </div>
      <div className="md:grid  md:grid-cols-2 max-w-screen-lg  flex flex-col-reverse mx-auto gap-4 md:gap-8 pt-10 md:pt-20 px-8 md:px-0">
        <div>
          <img src="/assets/home/illustration-2.svg"></img>
        </div>
        <div className="md:ml-auto md::pl-12">
          <div className="text-2xl mt-4 font-semibold leading-loose">
            We deliver the high quality end results you need
          </div>
          <div className="text-gray-500 my-4 leading-loose">
            With Quick you get components and examples, including tons of
            variables that will help you customize this theme with ease.
          </div>
          <div>
            <ul>
              <li className="flex  mt-4 ">
                <div className="rounded-full h-8 w-8 bg-blue-200 p-2"></div>
                <span className="ml-3">Perfect for modern startups</span>
              </li>
              <li className="flex  mt-4 mr-3">
                <div className="rounded-full h-8 w-8  bg-yellow-200 p-2"></div>
                <span className="ml-3">
                  Built with customization and ease-of-use at its core
                </span>
              </li>
              <li className="flex mt-4 mr-3">
                <div className="rounded-full h-8 w-8  justify-center bg-green-200 p-2"></div>
                <span className="ml-3">
                  Quality design and thoughfully crafted code
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-40"></div>
      <Footer />
    </main>
  );
}
