import { useSelector } from "react-redux";
import styles from "./index.module.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import FaqItem from "../../components/product/faqItem";
import { loadStripe } from "@stripe/stripe-js";
import * as Axios from "axios";
import { API_ENDPOINT } from "../../config";
import { selectSession } from "../../lib/redux/slices/sessionSlice";
import Loading from "../../components/loading";
import React, { useState } from "react";

const stripePromise = loadStripe("pk_test_YdqO9SYi7QT5r1wjMMAPLbGe");

function ProductCard({ name, price, features, productId, setShouldLoading }) {
  const handleClick = async (productId) => {
    setShouldLoading(true);
    try {
      const stripe = await stripePromise;

      const response = await Axios.post(
        `${API_ENDPOINT}/stripe-checkout-session`,
        {
          productId
        }
      );

      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id
      });
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        setShouldLoading(false);
      }
      setShouldLoading(false);
    } catch (e) {
      setShouldLoading(false);
    }
  };

  return (
    <div className="h-auto w-80 bg-white pt-6 flex-col flex ml-auto mr-auto shadow-md rounded-xl transform hover:scale-110 motion-reduce:transform-none ">
      <div className="text-center border-gray-300 border-b">
        <div className={styles["subtitle"]}>{name}</div>
      </div>
      <div className="text-center mt-6">
        <div className="text-5xl text-green-500 font-bold">${price}</div>
      </div>

      <div className="text-left mx-4 mt-16">
        <ul className="list-none text-gray-600 leading-7">
          {features.map((feature, index) => (
            <li key={index} className="flex flex-row">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 26 26"
                >
                  <circle cx="13" cy="13" r="13" fill="#d6facf" />
                  <path
                    d="M18.192 12.96v.02l-3.61.722 2.272 3.784-.015.008A.97.97 0 0 1 17 18a1 1 0 0 1-1 1 .985.985 0 0 1-.843-.494l-.014.01L13 14.943l-2.143 3.57-.014-.008A.985.985 0 0 1 10 19a1 1 0 0 1-1-1 .97.97 0 0 1 .157-.506l-.014-.008 2.27-3.784-3.61-.72v-.02A.986.986 0 0 1 7 12a1 1 0 0 1 1-1 .948.948 0 0 1 .192.04v-.02l3.8.76V8a1 1 0 0 1 2 0v3.78l3.8-.76v.02A.948.948 0 0 1 18 11a1 1 0 0 1 1 1 .986.986 0 0 1-.808.96z"
                    fill="#24b47e"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900">{feature}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center mt-6 mx-6">
        <div
          className={styles["purchase-button"]}
          onClick={() => handleClick(productId)}
        >
          Purchase Now
        </div>
      </div>
    </div>
  );
}

export default function Product() {
  const { token } = useSelector(selectSession);

  const [shouldLoading, setShouldLoading] = useState(false);
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
      <Loading show={shouldLoading} />
      <div className="pt-32">
        <div className="text-center">
          <div className={styles["title"]}>Product & Pricing</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 max-w-screen-lg mx-auto mt-12 gap-4">
          <div>
            <ProductCard
              name="Economy"
              price="69"
              productId="1"
              features={[
                "基于标准简历模版重塑简历",
                "定制化简历格式排版修改",
                "简历内容结构调整建议",
                "智能句式结构和语法检测与精修",
                "基于背景的职业发展建议",
                "求职面试准备电子书籍"
              ]}
              setShouldLoading={(val) => setShouldLoading(val)}
            />
          </div>

          <div>
            <ProductCard
              name="Basic"
              price="169"
              productId="2"
              features={[
                "AI 智能匹配相关专业方向导师",
                "两次专业导师简历修改",
                "职位申请专业建议",
                "求职面试准备专业建议",
                "基于标准简历模版重塑简历",
                "定制化简历格式排版修改",
                "简历内容结构调整建议",
                "智能句式结构和语法检测与精修",
                "基于背景的职业发展建议",
                "求职面试准备电子书籍"
              ]}
              setShouldLoading={(val) => setShouldLoading(val)}
            />
          </div>

          <div>
            <ProductCard
              name="Pro"
              price="299"
              productId="3"
              features={[
                "任意选择匹配专业方向导师",
                "不限次数的专业导师简历修改",
                "两周有效期，包含不限次数的专业咨询",
                "职位申请专业建议",
                "求职面试准备专业建议",
                "基于标准简历模版重塑简历",
                "定制化简历格式排版修改",
                "简历内容结构调整建议",
                "智能句式结构和语法检测与精修",
                "基于背景的职业发展建议",
                "求职面试准备电子书籍"
              ]}
              setShouldLoading={(val) => setShouldLoading(val)}
            />
          </div>

          <div>
            <ProductCard
              name="Pro"
              price="699"
              productId="3"
              features={[
                "任意选择匹配专业方向导师",
                "全程无忧，导师帮你创建简历",
                "四周有效期，包含不限次数的专业咨询",
                "职位申请专业建议",
                "求职面试准备专业建议",
                "基于背景的职业发展建议",
                "求职面试准备电子书籍"
              ]}
              setShouldLoading={(val) => setShouldLoading(val)}
            />
          </div>
        </div>
      </div>

      <div className={`${styles["frequent-qs-bg-color"]}`}>
        <div className={`${styles["faq-banner"]} `}>
          <svg className={`${styles["curve"]}`}>
            <polygon points="2560 0 2560 100 0 100"></polygon>
          </svg>
          <div className={`${styles["faq-container"]}`}>
            <h2 className={`${styles["title"]} ${styles["faq"]}`}>常见问题</h2>
            <FaqItem
              question="修改简历大概是什么样的流程呢？"
              answer="点击以上购买按钮并成功完成支付后，我们会在24小时内发送 Co Edit 的用户名和登录密码到您提供的email。您可以在我们的平台上完成匹配导师，上传简历，查看简历修改版本等。目前我们的平台只对付费用户开放，暂不对外注册开发。"
            />
            <FaqItem question="修改简历前我需要提取准备什么？" answer="To do" />
            <FaqItem
              question="如果我没有简历怎么办？我的简历没有什么内容？"
              answer="To do"
            />
            <FaqItem question="我该选择哪个修改简历的计划呢？" answer="To do" />
            <FaqItem question="如果我有多份简历需要修改？" answer="To do" />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
