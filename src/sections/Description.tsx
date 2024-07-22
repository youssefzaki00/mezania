import { useEffect, useState } from "react";
import useAuth from "./../hooks/useAuth";
import { Budget } from "../interface";
import useActiveBudget from "../hooks/useActiveBudget";
import useBudget from "./../hooks/useBudget";

function Description() {
  const { user } = useAuth();
  const { removeBudget } = useBudget();
  const { changeActiveBudget } = useActiveBudget();
  // const [isClose, setIsClose] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  // const toggleClass = (): void => {
  //   setIsClose(!isClose);
  // };
  useEffect(() => {
    if (
      user?.budgets?.length == 0 ||
      user?.budgets == undefined ||
      !user?.budgets
    ) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [user?.budgets]);
  const handleActiveBudget = (budget: Budget) => {
    changeActiveBudget(budget);
  };
  return (
    <section className="description">
      <div className="description__header">
        <h3>Budgets</h3>
      </div>
      <div className={`empty ${isEmpty ? "" : "close"}`}>
        <p className="empty__text">
          Looks like you haven&apos;t added any
          <span> budgets yet.</span>
        </p>
        <p className="empty__sub">
          No worries, just hit the <span> &apos;Add New budget&apos; </span>
          button to get started
        </p>
        <svg
          width="84"
          height="84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.5 77a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM70 77a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
            stroke="#FFFDE7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.5 3.5h14l9.38 46.865a7 7 0 007 5.635H67.9a7 7 0 007-5.635L80.5 21H21"
            stroke="#FFFDE7"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={`budgets ${isEmpty ? "close" : ""}`}>
        {user?.budgets?.map((budget: Budget) => (
          <div
            className="budget"
            key={budget?.id}
            onClick={() => handleActiveBudget(budget)}
          >
            <div className="budget__details">
              <svg
                width="54"
                height="54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="27" cy="27" r="27" fill="#51D289" />
                <g clipPath="url(#prefix__clip0_6_222)" fill="#1E1E1E">
                  <path d="M39.75 20.313v-3.23a2.842 2.842 0 00-2.833-2.833H17.083a2.833 2.833 0 00-2.833 2.833v19.834a2.833 2.833 0 002.833 2.833h19.834a2.842 2.842 0 002.833-2.833v-3.23c.836-.496 1.417-1.389 1.417-2.437v-8.5c0-1.048-.581-1.94-1.417-2.437zm-1.417 2.437v8.5h-9.916v-8.5h9.916zm-21.25 14.167V17.083h19.834v2.834h-8.5a2.842 2.842 0 00-2.834 2.833v8.5a2.842 2.842 0 002.834 2.833h8.5v2.834H17.083z" />
                  <path d="M32.667 29.125a2.125 2.125 0 100-4.25 2.125 2.125 0 000 4.25z" />
                </g>
                <defs>
                  <clipPath id="prefix__clip0_6_222">
                    <path
                      fill="#fff"
                      transform="translate(10 10)"
                      d="M0 0h34v34H0z"
                    />
                  </clipPath>
                </defs>
              </svg>
              <div className="budget__content">
                <h4 className="budget__title">{budget?.title}</h4>
                <p className="budget__date">
                  date:
                  <span> {budget?.date}</span>
                </p>
              </div>
            </div>
            <div className="budget__budget">
              <p className="budget__amount">
                budget: <span>£{budget?.amount?.toLocaleString()}</span>
              </p>
              <div className="budget__amount_calc">
                <p className="budget__amount_spent">
                  spent: <span>£{budget?.spent?.toLocaleString()}</span>
                </p>
                <p className="budget__amount_remaining">
                  remaining: <span>£{budget?.remaining?.toLocaleString()}</span>
                </p>
              </div>
            </div>
            <button
              className="remove__button"
              onClick={() => removeBudget(budget?.id)}
            >
              <svg
                width="29"
                height="28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#prefix__clip0_18_3821)">
                  <path
                    d="M16.973 12.215L14.5 14.688l-2.485-2.473-1.645 1.645 2.485 2.473-2.473 2.474 1.645 1.645 2.473-2.474 2.473 2.474 1.645-1.645-2.473-2.474 2.473-2.473-1.645-1.645zm1.61-7.548L17.417 3.5h-5.834l-1.166 1.167H6.333V7h16.334V4.667h-4.084zM7.5 22.167A2.34 2.34 0 009.833 24.5h9.334a2.34 2.34 0 002.333-2.333v-14h-14v14zM9.833 10.5h9.334v11.667H9.833V10.5z"
                    fill="#F44336"
                  />
                </g>
                <defs>
                  <clipPath id="prefix__clip0_18_3821">
                    <path
                      fill="#fff"
                      transform="translate(.5)"
                      d="M0 0h28v28H0z"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Description;
