import React, {useMemo, useState} from "react";
import {matchSorter} from "match-sorter";
// eslint-disable-next-line no-unused-vars
import _ignore from "regenerator-runtime";
import {useAsyncDebounce} from "react-table";

export const MAX_ITEMS = 100;

// Define a default UI for filtering
export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || "");
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
}

// Define a default UI for filtering
export function DefaultColumnFilter({
  column: {filterValue = '', preFilteredRows, setFilter},
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue}
      onChange={(e) => {
        e.target.value && setFilter(e.target.value); // Set undefined to remove the filter entirely
      }}
      style={{width: "70px"}}
      placeholder={`...${count}`}
    />
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  column: {filterValue, setFilter, preFilteredRows, id},
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });

    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || "");
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
export function SliderColumnFilter({
  column: {filterValue, setFilter, preFilteredRows, id},
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });

    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, MAX_ITEMS));
        }}
      />
      <button onClick={() => setFilter("")}>Off</button>
    </>
  );
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
export function NumberRangeColumnFilter({
  column: {filterValue = [], preFilteredRows, setFilter, id},
}) {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });

    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div>
      <input
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [val ? parseInt(val, 10) : 0, old[1]]);
        }}
        placeholder={`${min} <`}
        style={{
          width: "70px",
        }}
      />
      <input
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : 0]);
        }}
        placeholder={`< ${max}`}
        style={{
          width: "70px",
        }}
      />
    </div>
  );
}

export function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, {keys: [(row) => row.values[id]]});
}
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Define a custom filter filter function!
export function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];

    return rowValue >= filterValue;
  });
}
// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";
