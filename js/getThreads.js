$(document).ready(function() {
    $('#example').DataTable( {
		fixedHeader: true,
		ajax: "threads.js",
        columns: [
            { data: "DMC" },
            { data: "Name" },
            { data: "Color" },
			{ data: "Red"}
        ],
		"columnDefs": [ {
			"targets": 2,
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).css('color', '#' + cellData),
				$(td).css('background-color', '#' + cellData)
			}
		} ]
    } );
} );