/*
 * vim:et sts=2 sw=2 cindent:
 */

var tabulator = function(table) {
  var t = $(table),
      cols = t.find('thead tr:last-child th'),
      rows = t.find('tbody tr'),
      cellSelector = 'td',
      cellText = function(j, cell) { return $(cell).text(); },
      ops = {};

  var tab = {};
  tab.columns = function(c) {
    if (arguments.length) {
      if (c instanceof String) {
        // cols is a selector indicating where to find columnar header cells
        cols = t.find(c);
      } else if (c instanceof Array) {
        // cols is a list of column names
        cols = c;
      } else {
        // cols is a function map
        // cols = [];
        ops = {};
        if (c) {
          for (var col in c) {
            cols.push(col);
            ops[c] = c[col];
          }
        }
      }
      return this;
    } else {
      if (cols.get instanceof Function) {
        return cols.map(function(i, th) { return $(th).text(); }).get();
      } else if (cols instanceof Array) {
        return cols;
      }
    }
  };

  tab.rows = function(selector) {
    if (arguments.length) {
      rows = t.find(selector);
      return this;
    } else {
      return rows.get();
    }
  };

  tab.filter = function(f) {
    if (arguments.length) {
      rows = rows.filter(f);
      return this;
    } else {
      // XXX: ?
    }
  };

  tab.slice = function(start, end) {
    rows = rows.slice(start, end);
    return this;
  };

  tab.cell = function(selector) {
    if (arguments.length) {
      cellSelector = selector;
      return this;
    } else {
      return cellSelector;
    }
  };

  tab.column = function(name, f) {
    if (f == undefined) {
      delete ops[name];
    } else if (f === false) {
      ops[name] = false;
    } else {
      ops[name] = (f instanceof Function) ? f : ops['*'];
    }
    return this;
  };

  tab.data = function() {
    var c = this.columns();
    var r = this.rows();
    return r.map(function(tr, i) {
      var cells = $(tr).children(cellSelector).map(cellText).get();
      if (c && c.length) {
        var row = {};
        c.forEach(function(col, j) {
          if (col != undefined && ops[col] !== false) {
            var f = ops[col] || ops['*'];
            row[col] = f ? f.call(null, cells[j], col) : cells[j];
          }
        });
        return row;
      } else {
        return cells;
      }
    });
  };

  tab.values = function(col) {
    return this.data().map(function(obj) { return obj[col]; });
  };

  return tab;
};

identity = function(v) { return v; }

intOrZero = function(v) {
  var n = parseInt(v);
  return isNaN(n) ? 0 : n;
};

intOrString = function(v) {
  var n = parseInt(v);
  return isNaN(n) ? String(v) : n;
};

floatOrZero = function(v) {
  var n = parseFloat(v);
  return isNaN(n) ? 0 : n;
};

floatOrString = function(v) {
  var n = parseFloat(v);
  return isNaN(n) ? String(v) : n;
};

getter = function(prop) {
  return function(d) { return d[prop]; };
};

sortBy = function(prop, reverse) {
  var g = getter(prop);
  return function(a, b) {
    var aa = g(reverse ? b : a),
        bb = g(reverse ? a : b);
    return (aa > bb) ? 1 : (aa < bb) ? -1 : 0;
  };
};
