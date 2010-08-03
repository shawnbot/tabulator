Tabulator is a JavaScript library for reading data from (and writing it to)
HTML tables. It uses [jQuery](http://jquery.com/) to find headers and cells
in structured tables, and can turn those into arrays of either arrays or
objects with keys corresponding to the column headers. The following table, for
instance:

<table id="people">
  <thead>
    <tr><th>Name</th><th>Occupation</th></tr>
  </thead>
  <tbody>
    <tr><td>Joe</td><td>Plumber</td></tr>
    <tr><td>Rosie</td><td>Riveter</td></tr>
  </tbody>
</table>

can be read into a list of objects with one line of JavaScript:

<script type="text/javascript">
var people = tabulator('#people').objects();
</script>
