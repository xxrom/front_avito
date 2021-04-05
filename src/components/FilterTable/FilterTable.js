import React, {useMemo} from "react";
import {styled} from "linaria/react";
import {useTable, useFilters, useGlobalFilter, useSortBy} from "react-table";
import {
  GlobalFilter,
  fuzzyTextFilterFn,
  DefaultColumnFilter,
  MAX_ITEMS,
} from "./filters";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

// Let the table remove the filter if the string is empty
//fuzzyTextFilterFn.autoRemove = val => !val

// Our table component
function Table({columns, data, initialState}) {
  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];

          return rowValue !== "undefined"
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy
  );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, MAX_ITEMS);

  return (
    <table {...getTableProps()}>
      <thead>
        <tr>
          <th
            colSpan={visibleColumns.length}
            style={{
              textAlign: "left",
            }}
          >
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </th>
        </tr>

        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              const isSorted = column.id === 'createdtime';

              const headerProps = column.getHeaderProps(isSorted && column.getSortByToggleProps());

              return (
                <th
                  key={column.id}
                  {...headerProps}
                >
                  {column.render("Header")}

                  <div>{column.canFilter ? column.render("Filter") : null}</div>

                  {isSorted && <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {firstPageRows.map((row) => {
          prepareRow(row);

          return (
            <tr key={row.id} {...row.getRowProps()}>
              {row.cells.map((cell, cellIndex) => (
                <td key={`${row.id}cell:${cellIndex}`} {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export const FilterTableWrapper = ({columns = [], data = [], initialState = []}) => {
  return (
    <Styles>
      <Table columns={columns} data={data} initialState={initialState} />
    </Styles>
  );
};
