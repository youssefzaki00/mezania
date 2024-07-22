export const animation = (percent: number) => {
  const progressbar: NodeListOf<SVGElement> =
    document.querySelectorAll(".progress-bar");

  progressbar.forEach((svg) => {
    const targetDegree: number = percent;

    const circumference: number = 2 * Math.PI * 135; // 2 * π * radius (r=135)

    const circle: SVGCircleElement | null = svg.querySelector<SVGCircleElement>(
      "circle:nth-child(2)"
    );
    if (circle) {
      circle.style.strokeDasharray = `${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;

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
};
