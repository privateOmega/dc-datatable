import { BaseMixin } from 'dc';
import { DataTable as SimpleDataTable } from 'simple-datatables';

import { getParentElement } from './helper';

export class Datatable extends BaseMixin {
  constructor(parent, chartGroup) {
    super();

    this._size = Infinity;
    this._columns = [];
    this._beginSlice = 0;
    this._endSlice = undefined;
    this._enableSort = false;
    this._enableSearch = false;
    this._enablePaging = true;
    this._enableScrolling = false;
    this._enablePagingSizeChange = false;
    this._enableHeader = true;
    this._enableAutoWidth = false;

    this._mandatoryAttributes(['dimension']);

    this._parentElement = getParentElement(parent);

    this.anchor(parent, chartGroup);
  }

  _doRender() {
    let child = this._parentElement.lastElementChild;
    while (child) {
      this._parentElement.removeChild(child);
      child = this._parentElement.lastElementChild;
    }

    const table = document.createElement('table');
    this._parentElement.appendChild(table);

    const datatable = new SimpleDataTable(table, this.getTableOptions());

    return this;
  }

  _doRedraw() {
    return this._doRender();
  }

  getTableOptions() {
    const data = this.dimension().top(Infinity);

    let transformedData = {
      headings: Object.keys(data[0]),
      data: [],
    };

    for (let i = 0; i < data.length; i++) {
      transformedData.data[i] = [];
      for (let p in data[i]) {
        if (data[i].hasOwnProperty(p)) {
          transformedData.data[i].push(data[i][p]);
        }
      }
    }

    return {
      data: transformedData,
      fixedColumns: !this._enableAutoWidth,
      header: this._enableHeader,
      paging: this._enablePaging,
      perPage: this._size,
      perPageSelect: this._enablePagingSizeChange ? [5, 10, 15, 20, 25] : false,
      searchable: this._enableSearch,
      sortable: this._enableSort,
    };
  }

  size(size) {
    if (!arguments.length) {
      return this._size;
    }
    this._size = size;
    return this;
  }

  columns(columns) {
    if (!arguments.length) {
      return this._columns;
    }
    this._columns = columns;
    return this;
  }

  beginSlice(beginSlice) {
    if (!arguments.length) {
      return this._beginSlice;
    }
    this._beginSlice = beginSlice;
    return this;
  }

  endSlice(endSlice) {
    if (!arguments.length) {
      return this._endSlice;
    }
    this._endSlice = endSlice;
    return this;
  }

  enableSort(enable) {
    if (!arguments.length) {
      return this._enableSort;
    }
    this._enableSort = enable;
    return this;
  }

  enableSearch(enable) {
    if (!arguments.length) {
      return this._enableSearch;
    }
    this._enableSearch = enable;
    return this;
  }

  enablePaging(enable) {
    if (!arguments.length) {
      return this._enablePaging;
    }
    this._enablePaging = enable;
    return this;
  }

  enableScrolling(enable) {
    if (!arguments.length) {
      return this._enableScrolling;
    }
    this._enableScrolling = enable;
    return this._doRedraw();
  }

  enablePagingSizeChange(enable) {
    if (!arguments.length) {
      return this._enablePagingSizeChange;
    }
    this._enablePagingSizeChange = enable;
    return this;
  }

  enableHeader(enable) {
    if (!arguments.length) {
      return this._enableHeader;
    }
    this._enableHeader = enable;
    return this;
  }

  enableAutoWidth(enable) {
    if (!arguments.length) {
      return this._enableAutoWidth;
    }
    this._enableAutoWidth = enable;
    return this;
  }
}
