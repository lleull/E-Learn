import React, { useEffect, useState } from "react";

export const useApi = (props) => {
  const { fn, deps } = props;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    fn()
      .then(res => {
        if (!cancelled) {
          setData(res);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setRefresh(false);
          setError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
          setRefresh(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [refresh, ...deps]);

  return { data, loading, error, refresh, setRefresh, setData };
};
