import React, {useState, useEffect} from "react";
import {styled} from "linaria/react";
import {hot} from "react-hot-loader/root";

import {Example} from "./components/BigTable/BigTable";
import {FilterTable, FilterTableWrapper} from "./components/FilterTable";
import {SliderColumnFilter, GlobalFilter, fuzzyTextFilterFn, SelectColumnFilter, filterGreaterThan, DefaultColumnFilter, NumberRangeColumnFilter} from './components/FilterTable/filters';

const App = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/cards').then((result) => {
      console.log('result', result);
    })

  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
            // Use our custom `fuzzyText` filter on this column
            filter: 'fuzzyText',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
            Filter: SliderColumnFilter,
            filter: 'equals',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
            Filter: NumberRangeColumnFilter,
            filter: 'between',
          },
          {
            Header: 'Status',
            accessor: 'status',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
            Filter: SliderColumnFilter,
            filter: filterGreaterThan,
          },
        ],
      },
    ],
    []
  )

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
