/* eslint-disable no-unused-vars */
import { PAGE_SIZE } from "../utils/conteants";
import SortBy from "../ui/SortBy";
import { getToday } from "../utils/helpers";
import supabase, { supabaseUrl } from "./superbase";

export async function getBookings({ filter, sortBy, page }) {
  // console.log("getBookings", filter, sortBy);

  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );
  // let query = supabase
  //   .from("bookings")
  //   .select("*, cabins(name), guests(fullName,email)", { count: "exact" });

  if (filter && filter.value !== null) {
    console.log("filter = ", filter);
    query = query[filter.method || "eq"](filter.filed, filter.value);
  }

  if (sortBy.filed) {
    query = query.order(sortBy.filed, {
      ascending: sortBy.direction === "asc",
    });
  }

  const { data: predata, error: error1 } = await query;
  if (error1) {
    throw new Error(error1.message);
  }

  // let to;
  // const from = PAGE_SIZE * (page - 1);
  // if (page !== 0 && from < predata.length) {
  //   if (predata.length - (page - 1) * PAGE_SIZE > PAGE_SIZE) {
  //     to = from + PAGE_SIZE - 1;
  //   } else {
  //     to = from + predata.length - (page - 1) * PAGE_SIZE - 1;
  //   }
  //   query = query.range(from, to);
  // }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, count, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Booking could be loaded");
  }
  console.log("getBookings data = ", data);
  return { data, count };
}
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  console.log("updateBooking");
  console.log("id = ", id);
  console.log("obj = ", obj);

  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  console.log("deleteBooking id = ", id);
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
