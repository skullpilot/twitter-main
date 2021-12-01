import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import styles from "./index.module.css";
import Header from "../../components/header";
import Card from "../../components/card";
import * as Axios from "axios";
import { API_ENDPOINT } from "../../config";
import { selectSession } from "../../lib/redux/slices/sessionSlice";

import ResumeReview from "./ResumeReview";

function OrderCard({ order, product, selected }) {
  return (
    <Card active={selected}>
      <div className="mb-10 font-bold">{product.name}</div>
      <div>Purchased At:</div>
      <div className="mb-4">{order.createdAt}</div>
      <div>Valid Till:</div>
      <div className="mb-4">{order.expireAt}</div>
      <div>Status:</div>
      <div className="mb-4">
        {order.matchId ? "Matched With Reviewer" : "Match Mentor"}
      </div>
    </Card>
  );
}

function MentorCard({ mentor, selected }) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <Card width="large" active={selected}>
      {showDetail && (
        <MentorModal mentor={mentor} close={() => setShowDetail(false)} />
      )}
      <img
        src="https://i.ibb.co/gTKL20X/svg-A3790815941471204.png"
        className="w-24 h-24 rounded-full mx-auto"
      ></img>
      <div className="text-center mt-5">{mentor.firstName}</div>
      <div className="text-center mb-10">{`${mentor.title} @ ${mentor.company}`}</div>
      <div className="mx-10">{mentor.description}</div>
      <div className="text-center mt-5">
        <div
          className={styles["button"]}
          onClick={(e) => {
            e.preventDefault();
            setShowDetail((prev) => !prev);
          }}
        >
          View More
        </div>
      </div>
    </Card>
  );
}

function MatchProfessionalsPanel({ order, token }) {
  const [mentors, setMentors] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const router = useRouter();

  useEffect(() => {
    Axios.get(`${API_ENDPOINT}/mentors`, {
      headers: { Authorization: token }
    }).then((response) => {
      setMentors(response.data);
    });
  }, []);

  const createMatch = async () => {
    if (!selectedMentor) {
      // TODO: show error text
      console.warn("mentor hasn't been selected");
      return;
    }

    await Axios.post(
      `${API_ENDPOINT}/match`,
      {
        order,
        mentorId: selectedMentor.id
      },
      {
        headers: { Authorization: token }
      }
    );

    router.reload();
  };

  return (
    <div className="mt-32 max-w-screen-lg mx-auto">
      <div className="text-center">
        <div className={styles["title"]}>Recommended Professionals</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-screen-lg mx-auto mt-12 gap-10 pb-20">
        {mentors &&
          mentors.map((mentor, index) => (
            <div key={index} onClick={() => setSelectedMentor(mentor)}>
              <MentorCard
                mentor={mentor}
                selected={selectedMentor && selectedMentor.id === mentor.id}
              />
            </div>
          ))}
      </div>

      <div className="text-center mt-24">
        <div className={styles["button"]} onClick={createMatch}>
          Send For Review
        </div>
      </div>
    </div>
  );
}

function MentorModal({ mentor, close }) {
  return (
    <>
      <div
        className="flex fixed inset-0 overflow-y-auto bg-background-gray opacity-90 w-full"
        onClick={() => close()}
      ></div>

      <div className="flex fixed inset-0 overflow-y-auto w-full pointer-events-none">
        <div className="mx-auto my-auto z-10 bg-white w-1/2 h-auto shadow-2xl rounded-xl pointer-events-auto relative">
          <div
            className="absolute top-5 right-5 text-black cursor-pointer"
            onClick={() => close()}
          >
            X
          </div>
          <div className="flex flex-col pt-8 pb-12">
            <img
              src="https://i.ibb.co/gTKL20X/svg-A3790815941471204.png"
              className="w-24 h-24 rounded-full mx-auto"
            ></img>
            <div className="mt-6 pb-4 border-gray-300 border-b text-center">
              <div className="text-lg text-black">{`${mentor.firstName} @ ${mentor.company}`}</div>
              <div className="text-base text-gray-500">{mentor.speciality}</div>
            </div>

            <div className="mt-4 text-start text-gray-600 px-16">
              <div>{`Education: ${mentor.education}`}</div>
              <div>{`Previous: ${mentor.previousCompanies}`}</div>
              <div>{`辅导经验：${mentor.mentorExperience}`}</div>
              <div>{`专业经验：${mentor.professionalExperience}`}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Orders({ token }) {
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    Axios.get(`${API_ENDPOINT}/orders`, {
      headers: { Authorization: token }
    }).then((response) => {
      setOrders(response.data);
    });

    Axios.get(`${API_ENDPOINT}/products`, {
      headers: { Authorization: token }
    }).then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <main className="bg-background-gray min-h-screen">
      <Header
        menulinks={[
          { href: "/", name: "Home" },
          { href: "/orders/", name: "Orders" },
          { href: "/profile/", name: "Profile" },
          { href: "/#", name: "Setting" }
        ]}
      />
      <div className="pt-32">
        <div className="text-center">
          <div className={styles["title"]}>My Orders</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 max-w-screen-lg mx-auto mt-12 gap-4 border-gray-300 border-b pb-20">
          {orders &&
            products &&
            orders.map((order, index) => (
              <div key={index} onClick={() => setSelectedOrder(order)}>
                <OrderCard
                  order={order}
                  product={products.find(
                    (product) => product.id === order.productId
                  )}
                  selected={selectedOrder && selectedOrder.id === order.id}
                />
              </div>
            ))}
        </div>
      </div>

      {selectedOrder && !selectedOrder.matchId && (
        <MatchProfessionalsPanel order={selectedOrder} token={token} />
      )}
      {selectedOrder && selectedOrder.matchId && (
        <ResumeReview
          orderId={selectedOrder.id}
          matchId={selectedOrder.matchId}
          token={token}
        />
      )}
      <div className="pb-32"></div>
    </main>
  );
}

export default function OrdersPage() {
  const { token } = useSelector(selectSession);
  const router = useRouter();

  if (typeof window !== "undefined" && !token) {
    router.push("/login/");
    return <div>Redirecting...</div>;
  }

  return <Orders token={token} />;
}
