export default function Footer() {
  const footbarNav = [
    {
      displayName: "Account",
      children: [
        {
          displayName: "Profile",
          url: "./"
        },
        {
          displayName: "Setting",
          url: "./"
        },
        {
          displayName: "Billing",
          url: "./"
        },
        {
          displayName: "Notifications",
          url: "./"
        }
      ]
    },
    {
      displayName: "About",
      children: [
        {
          displayName: "Services",
          url: "./"
        },
        {
          displayName: "Pricing",
          url: "./"
        },
        {
          displayName: "Contact",
          url: "./"
        },
        {
          displayName: "Careers",
          url: "./"
        }
      ]
    },
    {
      displayName: "Company",
      children: [
        {
          displayName: "Community",
          url: "./"
        },
        {
          displayName: "Help center",
          url: "./"
        },
        {
          displayName: "Support",
          url: "./"
        }
      ]
    }
  ];
  return (
    <div>
      <svg height="100" width="100%" className="fill-current text-dark">
        <polygon points="2560 0 2560 100 0 100"></polygon>
      </svg>
      <div className="bg-dark text-gray-100 item-center  mt-0 text-sm">
        <div className="container grid md:grid-cols-2 max-w-screen-lg mx-auto gap-4 md:gap-8 pt-16 md:pt-20 md:px-8 px-4 md:px-0 ">
          <div>
            <div className="text-2xl">Brilliant solutions for your ideas</div>
            <div className="py-5 text-lg opacity-50">
              Build modern looking websites fast and easy using Quick.
            </div>
          </div>
          <div className="md:p-2 md:m-4 md:ml-20 lg:flex lg:justify-end text-base">
            <div className="md:flex md:justify-end">
              <button className="bg-gray-100  rounded  text-black py-3 px-6 mb-5 lg:mr-4 ">
                Documentation
              </button>
            </div>
            <div className="md:flex md:justify-end">
              <button className="bg-primary  text-gray-50 py-3 px-6 rounded  p-1 mb-5 p-20 ">
                Purchase now
              </button>
            </div>
          </div>
        </div>
        <div className="container grid md:grid-cols-2 max-w-screen-lg mx-auto gap-4 md:gap-8 pt-10 md:pt-20 md:px-8 px-4">
          <div className="py-10">
            <img src="/assets/footer/light.svg"></img>
            <div className="py-5  md:pr-36 text-gray-500 ">
              Webpixels attempts to bring the best development experience to
              designers and developers by offering the tools needed for having a
              quick and solid start in most web projects.
            </div>
          </div>
          <div className="item-top py-10">
            <div className="grid grid-cols-2 md:grid-cols-3 text-left ">
              {footbarNav.map((items, ind) => {
                return (
                  <div className="mb-10" key={ind}>
                    <div className="mb-3"> {items.displayName}</div>
                    {items.children.map((item, ind) => {
                      return (
                        <div key={ind} className="py-1 text-footer-gray">
                          <a href={item.url}> {item.displayName} </a>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" pt-5 text-footer-gray  md:text-left text-center">
            © 2021 Collaborate Edit Inc. All rights reserved
          </div>
          <div className="md:flex md:justify-end text-center  text-footer-gray md:pt-5 mb-5">
            <div className="px-5 inline-block">Terms</div>
            <div className="px-5 inline-block">Privacy</div>
            <div className="px-5 inline-block">Cookies</div>
          </div>
        </div>
      </div>
    </div>
  );
}
