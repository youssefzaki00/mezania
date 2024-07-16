import React, { useState } from "react";
import chevronDown from "../assets/icons/chevron-down.svg";
import closeIcon from "../assets/icons/icon-close.svg";
import cart from "../assets/home/cart.svg";
import savings from "../assets/icons/savings.svg";

function Description() {
  const [isClose, setIsClose] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const toggleClass = (): void => {
    setIsClose(!isClose);
  };
  // const budgets = [
  //   {
  //     name: "month1",
  //     amount: 1800,
  //     expenses: [
  //       { name: "park", amount: 400 },
  //       { name: "food", amount: 100 },
  //       { name: "bike", amount: 300 },
  //     ],
  //   },
  //   {
  //     name: "month2",
  //     amount: 1800,
  //     expenses: [
  //       { name: "park", amount: 400 },
  //       { name: "food", amount: 100 },
  //       { name: "bike", amount: 300 },
  //     ],
  //   },
  //   {
  //     name: "month3",
  //     amount: 1800,
  //     expenses: [
  //       { name: "park", amount: 400 },
  //       { name: "food", amount: 100 },
  //       { name: "bike", amount: 300 },
  //     ],
  //   },
  // ];
  return (
    <section className="description">
      <div className="description__header">
        <h3>Budgets</h3>
        <div className="filter">
          <p className="filter__text">filter expenses</p>
          <button
            className="filter__button"
            type="button"
            onClick={toggleClass}
          >
            <p className="filter__type">All</p>
            <img
              className={`${isClose ? "closeIcon" : ""}`}
              src={chevronDown}
              alt={`${isClose ? "chevron Down" : "chevron Down"}`}
            />
          </button>
          <ul className={`filter__list ${isClose ? "" : "close"}`}>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
      </div>
      <div className={`empty ${isEmpty ? "" : "close"}`}>
        <p className="empty__text">
          Looks like you haven&apos;t added any
          <span> expenses yet.</span>
        </p>
        <p className="empty__sub">
          No worries, just hit the <span> &apos;Add New budget&apos; </span>
          button to get started
        </p>
        <img src={cart} alt="chevron down" />
      </div>
      <div className={`expenses ${isEmpty ? "close" : ""}`}>
        {/* <div className="expense">
          <div className="expense__details">
            <img src={savings} alt="savings" />
            <div className="expense__content">
              <h4 className="expense__title">savings</h4>
              <p className="expense__date">
                date:
                <span> January, 12-2023</span>
              </p>
            </div>
          </div>
          <div className="expense__budget">
            <p className="expense__amount">budget: £125,00</p>
            <div className="expense__amount_calc">
              <p className="expense__amount_spent">spent: £125,00</p>
              <p className="expense__amount_remaining">remaining: £125,00</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default Description;
