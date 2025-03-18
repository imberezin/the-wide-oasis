import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/conteants";

export function useBookings() {
  console.log("useBookings");
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const filter =
    (!filterValue || filterValue) === "all"
      ? null
      : { filed: "status", value: filterValue, method: "eq" };
  // console.log("filterValue", filterValue);
  const sortByRow = searchParams.get("sortBy") || "startDate-asc";
  const [filed, direction] = sortByRow.split("-");
  const sortBy = { filed, direction };

  const page = Number(searchParams.get("page")) || 1;

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryFn: () => getBookings({ filter, sortBy, page }),
    queryKey: ["bookings", filter, sortBy, page],
  });

  //Pre fetching page+1
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      queryKey: ["bookings", filter, sortBy, page + 1],
    });
  }

  //Pre fetching page-1
  if (page > 1) {
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      queryKey: ["bookings", filter, sortBy, page - 1],
    });
  }

  return { isLoading, bookings, error, count };
}

// const cabins = data || [];
// https://tanstack.com/query/v4/docs/framework/react/guides/infinite-queries - for scroll
