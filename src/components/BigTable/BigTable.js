import React from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";

const styles = (theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      flip: false,
      paddingRight: theme.direction === "rtl" ? "0 !important" : "undefined",
    },
  },
  tableRow: {
    cursor: "pointer",
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: "initial",
  },
});

const FastTable = (props = {}) => {
  const {
    classes,
    columns,
    rowHeight = 48,
    headerHeight = 48,
    ...tableProps
  } = props;

  const getRowClassName = ({ index }) => {
    const { classes, onRowClick } = props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick !== null,
    });
  };

  const cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick === null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex !== null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  const headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          height={height}
          width={width}
          rowHeight={rowHeight}
          gridStyle={{
            direction: "inherit",
          }}
          headerHeight={headerHeight}
          className={classes.table}
          {...tableProps}
          rowClassName={getRowClassName}
        >
          {columns.map(({ dataKey, ...other }, index) => {
            return (
              <Column
                key={dataKey}
                headerRenderer={(headerProps) =>
                  headerRenderer({
                    ...headerProps,
                    columnIndex: index,
                  })
                }
                className={classes.flexContainer}
                cellRenderer={cellRenderer}
                dataKey={dataKey}
                {...other}
              />
            );
          })}
        </Table>
      )}
    </AutoSizer>
  );
};

export const BigTable = withStyles(styles)(FastTable);

export const Example = () => {
  const sample = [
    ["Frozen yoghurt", 159, 6.0, 24, 4.0],
    ["Ice cream sandwich", 237, 9.0, 37, 4.3],
    ["Eclair", 262, 16.0, 24, 6.0],
    ["Cupcake", 305, 3.7, 67, 4.3],
    ["Gingerbread", 356, 16.0, 49, 3.9],
  ];

  function createData(id, dessert, calories, fat, carbs, protein) {
    return { id, dessert, calories, fat, carbs, protein };
  }

  const rows = [];

  for (let i = 0; i < 20000; i += 1) {
    const randomSelection = sample[Math.floor(Math.random() * sample.length)];
    rows.push(createData(i, ...randomSelection));
  }

  return (
    <Paper style={{ height: 400, width: "100%" }}>
      <BigTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 200,
            label: "Dessert",
            dataKey: "dessert",
          },
          {
            width: 120,
            label: "Calories\u00A0(g)",
            dataKey: "calories",
            numeric: true,
          },
          {
            width: 120,
            label: "Fat\u00A0(g)",
            dataKey: "fat",
            numeric: true,
          },
          {
            width: 120,
            label: "Carbs\u00A0(g)",
            dataKey: "carbs",
            numeric: true,
          },
          {
            width: 120,
            label: "Protein\u00A0(g)",
            dataKey: "protein",
            numeric: true,
          },
        ]}
      />
    </Paper>
  );
};
