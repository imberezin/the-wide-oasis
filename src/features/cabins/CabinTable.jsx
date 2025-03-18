import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();
  // const cabins = data || [];

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;
  if (!cabins.length) return <Empty resourceName="Cabins"></Empty>;

  const filterValue = searchParams.get("discount") || "all";
  // console.log("filterValue = ", filterValue);
  // console.log("cabins = ", cabins);

  let filterCabins;
  if (filterValue === "all") {
    filterCabins = cabins;
  } else if (filterValue === "with-discount") {
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);
  } else {
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  filterCabins = filterCabins || {};

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [filed, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  // console.log("filed = ", filed);
  const sortCabins = filterCabins.sort(
    (a, b) => (a[filed] - b[filed]) * modifier
  );

  // console.log("filterCabins = ", filterCabins);
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
        {/* {cabins.length > 0 &&
        cabins.map((cabin) => <CabinRow cabin={cabin} key={cabin.id} />)} */}
      </Table>
    </Menus>
  );
}

export default CabinTable;
