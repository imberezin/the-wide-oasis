import { useEffect, useRef } from "react";

export function useOutSideClick(handler, listtenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listtenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listtenCapturing);
    },
    [handler, listtenCapturing]
  );

  return ref;
}
