import React, { Component, Fragment } from 'react';
import {
  arrayOf,
  func,
  number,
  string,
  oneOf,
  oneOfType,
  object,
  bool,
} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

@withStyles(() => ({
  tableWrapper: {
    overflowX: 'auto',
  },
}))
/**
 * A table to display a set of data elements.
 */
export default class DataTable extends Component {
  static propTypes = {
    /**
     * The number of columns the table contains.
     * */
    columnsSize: number,
    /**
     * A function to execute for each row to render in the table.
     * Will be passed a datum from the table data. The function
     * should return the JSX necessary to render the given row.
     */
    renderRow: func.isRequired,
    /**
     * A function to execute when a column header is clicked.
     * Will receive a single argument which is the column name.
     * This can be used to handle sorting.
     */
    onHeaderClick: func,
    /**
     * A header name to sort on.
     */
    sortByHeader: string,
    /**
     * The sorting direction.
     */
    sortDirection: oneOf(['desc', 'asc']),
    /**
     * A list of header names to use on the table starting from the left.
     */
    headers: arrayOf(string),
    /**
     * A list of objects or strings to display. Each element in
     * the list is represented by a row and each element represents a column.
     */
    items: arrayOf(oneOfType([object, string])).isRequired,
    /**
     * A message to display when there is no items to display.
     */
    noItemsMessage: string,
    /**
     * If true, the table will be paginated.
     */
    paginate: bool,
    /**
     * The number of rows per page.
     * Relevant if `paginate` is set to `true`.
     */
    rowsPerPage: number,
  };

  static defaultProps = {
    columnsSize: null,
    headers: null,
    onHeaderClick: null,
    sortByHeader: null,
    sortDirection: 'desc',
    noItemsMessage: 'No items for this page.',
    paginate: false,
    rowsPerPage: 5,
  };

  state = {
    page: 0,
  };

  handleHeaderClick = ({ target }) => {
    const { onHeaderClick } = this.props;

    if (onHeaderClick) {
      onHeaderClick(target.id);
    }
  };

  handlePageChange = (event, page) => {
    this.setState({ page });
  };

  render() {
    const {
      classes,
      items,
      columnsSize,
      renderRow,
      headers,
      sortByHeader,
      sortDirection,
      noItemsMessage,
      rowsPerPage,
      paginate,
      onHeaderClick,
      ...props
    } = this.props;
    const colSpan = columnsSize || (headers && headers.length) || 0;
    const { page } = this.state;

    return (
      <Fragment>
        <div className={classes.tableWrapper}>
          <Table {...props}>
            {headers && (
              <TableHead>
                <TableRow>
                  {headers.map(header => (
                    <TableCell key={`table-header-${header}`}>
                      <TableSortLabel
                        id={header}
                        active={header === sortByHeader}
                        direction={sortDirection || 'desc'}
                        onClick={this.handleHeaderClick}>
                        {header}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={colSpan}>
                    <em>{noItemsMessage}</em>
                  </TableCell>
                </TableRow>
              ) : (
                items
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(renderRow)
              )}
            </TableBody>
          </Table>
        </div>
        {paginate && (
          <TablePagination
            labelDisplayedRows={() => ''}
            component="div"
            count={items.length}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[rowsPerPage]}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handlePageChange}
          />
        )}
      </Fragment>
    );
  }
}
