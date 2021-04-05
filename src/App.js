import React, {useMemo, useState, useEffect} from "react";
import {hot} from "react-hot-loader/root";

import {FilterTableWrapper} from "./components/FilterTable";
import {
  //SliderColumnFilter,
  //GlobalFilter,
  //fuzzyTextFilterFn,
  //SelectColumnFilter,
  //filterGreaterThan,
  //DefaultColumnFilter,
  NumberRangeColumnFilter,
} from "./components/FilterTable/filters";
import {uniqData} from "./uniqData";

const addTextBefore = ({data, key, addBefore}) => {
  const newData = data.map((item) => ({
    ...item,
    [key]: `${addBefore}${item[key]}`,
  }));

  return newData;
};
const formLinks = (data) => {
  // Form correct link
  const expandedData = addTextBefore({
    data,
    key: "link",
    addBefore: "http://avito.ru",
  });

  return expandedData;
};

const App = () => {
  const [data, setData] = useState(uniqData); // []

  useEffect(() => {
    fetch("http://192.168.1.61:3010/card")
      .then((res) => res.json())
      .then((result) => {
        const seen = {};
        const rawData = result.data;
        const uniqData = rawData.reduce((accumulator, item) => {
          const {card_id} = item;

          if (!seen[card_id]) {
            seen[card_id] = true;
            accumulator.push(item);
          }

          return accumulator;
        }, []);

        const unique = formLinks(uniqData);
        console.warn(`unique size ${unique.length}`);

        setData(unique || []);
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
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
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
        Header: "Link",
        accessor: "link",
        //filter: "fuzzyText",
        Cell: ({value}) => <a href={value}>LINK</a>,
      },
      {
        Header: "Time",
        accessor: "createdtime",
        sortType: "basic",
        desc: true
      },
      {
        Header: "Geo",
        accessor: "geo",
        filter: "fuzzyText",
      },
      {
        Header: "CardID",
        accessor: "card_id",
        // Use our custom `fuzzyText` filter on this column
        filter: "fuzzyText",
      },
    ],
    []
  );
  const initialState = useMemo(() => ({
    sortBy: [
      {
        id: 'createdtime',
        desc: true
      }
    ],
    filters: [
      {
        id: 'price',
        value: [15000, 35000]
      },
      {
        id: 'title',
        value: '1070'
      }
    ]
  }), []);

  return <FilterTableWrapper columns={columns} data={data} initialState={initialState} />;
};

export default hot(App);
