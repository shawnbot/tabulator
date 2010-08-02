/*
 * vim:et sts=4 sw=4 cindent:
 * $Id$
 */

builder = function(p) {
  var columns = undefined,
      rows = undefined,
      parent = p;

  function el(name) {
    return $(document.createElement(name));
  }

  function getColumns(rows) {
    var cols = [];
    for (var i = 0; i < rows.length; i++) {
      for (var c in rows[i]) {
        if (cols.indexOf(c) == -1) {
          cols.push(c);
        }
      }
    }
    return cols;
  }

  function makeRow(cells, element) {
    var tr = el('tr');
    cells.forEach(function(cell) {
      var td = el(element).text(cell);
      tr.append(td);
    });
    return tr;
  }

  var b = {};

  b.columns = function(cols) {
    if (arguments.length) {
      columns = cols;
      return this;
    } else {
      if (columns == undefined && rows instanceof Array) {
        columns = getColumns(rows);
      }
      return columns;
    }
  };

  b.rows = function(data) {
    if (arguments.length) {
      rows = data;
      return this;
    } else {
      return rows;
    }
  };

  b.parent = function(p) {
    if (arguments.length) {
      parent = p;
      return this;
    } else {
      return parent;
    }
  };

  b.render = function() {
    var table = el('table'),
        head = el('thead'),
        body = el('tbody'),
        cols = this.columns(),
        rows = this.rows();
    table.append(head).append(body);

    if (cols && cols.length > 0) {
      head.append(makeRow(cols, 'th'));

      if (rows && rows.length > 0) {
        rows.forEach(function(row) {
          var cells = cols.map(function(col) { return row[col]; });
          body.append(makeRow(cells, 'td'));
        });
      }
    }
    if (parent) {
      $(parent).append(table);
    }
    return table;
  };

  return b;
};
