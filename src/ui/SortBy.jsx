import { useSearchParams } from "react-router-dom";
import Select from "./Select";
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  const page = searchParams.get("page");

  function handelChange(e) {
    // console.log("E", e.target.value);
    if (page) searchParams.set("page", 1);
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      onChange={(e) => handelChange(e)}
      value={sortBy}
      type="white"
    ></Select>
  );
}

export default SortBy;
