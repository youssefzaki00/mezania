function BudgetComponent({
  handleActiveBudget,
  removeBudget,
  budget,
  activeBudget,
}) {
  return (
    <div
      className={`budget ${activeBudget?.id == budget?.id ? "active" : ""}`}
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
          budget: <span>£{budget?.amount?.toLocaleString() || 0}</span>
        </p>
        <div className="budget__amount_calc">
          <p className="budget__amount_spent">
            spent: <span>£{budget?.spent?.toLocaleString() || 0}</span>
          </p>
          <p className="budget__amount_remaining">
            remaining: <span>£{budget?.remaining?.toLocaleString() || 0}</span>
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
              <path fill="#fff" transform="translate(.5)" d="M0 0h28v28H0z" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
}
export default BudgetComponent;
