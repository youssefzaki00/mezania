import { useEffect } from "react";

function Calculation() {
  useEffect(() => {
    const progressbar: NodeListOf<SVGElement> =
      document.querySelectorAll(".progress-bar");

    progressbar.forEach((svg) => {
      const targetDegree: number = parseInt(
        svg.getAttribute("data-degree") || "0",
        10
      );

      // const percentage: number = targetDegree / 100;
      const circumference: number = 2 * Math.PI * 135; // 2 * π * radius (r=135)
      // const offset : number= circumference - circumference * percentage;

      const circle: SVGCircleElement | null =
        svg.querySelector<SVGCircleElement>("circle:nth-child(2)");
      if (circle) {
        circle.style.strokeDasharray = `${circumference}`;
        circle.style.strokeDashoffset = `${circumference}`;

        // Animate the progress bar
        const animate = (): void => {
          let progress: number = 0;
          const duration: number = 2000; // 2 seconds
          const stepTime: number = duration / targetDegree;
          const interval: NodeJS.Timeout = setInterval(() => {
            if (progress >= targetDegree) {
              clearInterval(interval);
            } else {
              progress += 1;
              const currentOffset: number =
                circumference - circumference * (progress / 100);
              circle.style.strokeDashoffset = `${currentOffset}`;
            }
          }, stepTime);
        };

        animate();

        const number: HTMLDivElement | null =
          document.querySelector<HTMLDivElement>(".text");

        if (number) {
          number.innerHTML = `${targetDegree}%`; // Set the percentage in the center
        }
      }
    });
  }, []);

  return (
    <section className="calculation">
      <h3>Calculation</h3>
      <div className="box__value">
        <p>income</p>
        <p>£2,700.00</p>
      </div>
      <div className="center">
        <div className="progress">
          <svg
            className="progress-bar"
            data-degree="60"
            width="300"
            height="300"
          >
            <circle className="progress-circle" cx="150" cy="150" r="135" />
            <circle className="progress-circle" cx="150" cy="150" r="135" />
          </svg>
          <div className="text">0</div>
          <h4>Spent</h4>
        </div>
      </div>
      <div className="boxes__values">
        <div className="box__value">
          <p>available</p>
          <p>£2,700.00</p>
        </div>
        <div className="box__value">
          <p>spent</p>
          <p>£700.00</p>
        </div>
      </div>
      <div className="box__value">
        <h4 className="Expenses__header h4-heading">Expenses</h4>
        <p>£2,700.00</p>
      </div>
      <div className="box__expenses">
        <div className="expense">
          <p className="expense__name">food</p>
          <p className="expense__value">£200</p>
        </div>
        <div className="expense">
          <p className="expense__name">phone</p>
          <p className="expense__value">£3000</p>
        </div>
        <div className="expense">
          <p className="expense__name">travel</p>
          <p className="expense__value">£500</p>
        </div>
        <div className="expense">
          <p className="expense__name">taxi</p>
          <p className="expense__value">£50</p>
        </div>
        <div className="expense">
          <p className="expense__name">T-shirt</p>
          <p className="expense__value">£800</p>
        </div>
      </div>
      <button className="button h4-heading" type="button">
        add expense
      </button>
    </section>
  );
}

export default Calculation;
