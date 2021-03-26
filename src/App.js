import React, {useState, useEffect} from "react";
import {styled} from "linaria/react";
import {hot} from "react-hot-loader/root";

import {Example} from "./components/BigTable/BigTable";
import {FilterTable, FilterTableWrapper} from "./components/FilterTable";
import {
  SliderColumnFilter,
  GlobalFilter,
  fuzzyTextFilterFn,
  SelectColumnFilter,
  filterGreaterThan,
  DefaultColumnFilter,
  NumberRangeColumnFilter,
} from "./components/FilterTable/filters";

const App = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3010/card")
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        setData(result.data || []);
      });
  }, []);

  /*
    id: 1325
    card_id: 2124488356
    price: 25000

    title: "GTX 1060 6 GB gigabyte"

    geo: "Москва"

    link: "/moskva/tovary_dlya_kompyutera/gtx_1060_6_gb_gigabyte_2124488356?slocation=107620"

    
    - timeago: "1 минуту назад"
    - createdtime: "1616680167682"
   */
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        columns: [
          {
            Header: "ID",
            accessor: "id",
          },
          {
            Header: "CardID",
            accessor: "card_id",
            // Use our custom `fuzzyText` filter on this column
            filter: "fuzzyText",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Price",
            accessor: "price",
            Filter: NumberRangeColumnFilter,
            filter: "between",
          },
          {
            Header: "Title",
            accessor: "title",
            filter: "fuzzyText",
          },
          {
            Header: "Geo",
            accessor: "geo",
            filter: "fuzzyText",
          },
          {
            Header: "Link",
            accessor: "link",
            filter: "fuzzyText",
          },
        ],
      },
    ],
    []
  );

  return (
    <div>
      <H1>Hello World!</H1>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>add</button>
      <Example />
      <FilterTableWrapper columns={columns} data={data} />
      <FilterTable />
    </div>
  );
};

const H1 = styled.h1`
  color: red;
`;

export default hot(App);
