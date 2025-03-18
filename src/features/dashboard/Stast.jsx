import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stast({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const checkins = confirmedStays.length;

  // num checkin nights / all avliable nigths

  const numCheckinNights = confirmedStays.reduce(
    (acc, curr) => acc + curr.numNights,
    0
  );

  //   const
  const occupations = numCheckinNights / (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Booking"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBriefcase />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineBanknotes />}
        value={checkins}
      />

      <Stat
        title="Occupncy rate"
        color="yellow"
        icon={<HiOutlineCalendarDays />}
        value={Math.round(occupations * 100) + "%"}
      />
    </>
  );
}

export default Stast;
