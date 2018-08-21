$(document).ready(function() {
	$('#register-btn').click(function() {
		$('#registeration').slideToggle(500);
	});

	$('#update-btn').click(function() {
		$('#update').slideToggle(500);
	});

	$('#getallbutton').click(function() {
		$.ajax({
			url: '/users',
			type: 'GET',
			contentType: "application/json",
			success: function(response) {
				var tbody = $('#userDetails');

				tbody.html("");

				response.data.forEach(function(user) {
					tbody.append("<tr>\
						<td class='id'>"+user._id +"</td>\
				<td>"+user.name +"</td>\
				<td>"+user.address +"</td>\
				<td>"+user.password +"</td>\
				<td><button class=\"deletebutton\">Delete</button></td>\
			</tr>")
				})
			}
		});
	});

	$('#new-user').submit(function(event) {
		event.preventDefault();

		var Uname = $("#namefield");
		var Uaddress = $("#addressfield");
		var Upassword = $("#passwordfield");

		var user = {
			name: Uname.val(),
			address: Uaddress.val(),
			password: Upassword.val()
		};

		$.ajax({
			url: '/users',
			type: 'POST',
			contentType: "application/json",
			data: JSON.stringify(user),
			success: function(response) {
				console.log(response);
				$("#namefield").val('');
				$("#addressfield").val('');
				$("#passwordfield").val('');
				$('#getallbutton').click();
			}
		});
	});

	$('#data-table').on('click', '.deletebutton',function(e) {
		var rowElement = $(e.target).closest('tr');
		var id = rowElement.find('.id').html();

		$.ajax({
			url: '/users/' + id,
			type: 'DELETE',
			contentType : "application/json",
			success: function(response) {
				console.log(response);
				$('#getallbutton').click();
			}
		});
	});

	$('#update-user').submit(function(event) {
		event.preventDefault();

		var UId = $("#idfield-update");

		var Uname = $("#namefield-update");
		var Uaddress = $("#addressfield-update");
		var Upassword = $("#passwordfield-update");

		var user = {
			name: Uname.val(),
			address: Uaddress.val(),
			password: Upassword.val()
		};

		$.ajax({
			url: '/users/'+UId.val(),
			type: 'PUT',
			contentType : "application/json",
			data: JSON.stringify(user),
			success: function(response) {
				console.log(response);
				$("#idfield-update").val('');
				$("#namefield-update").val('');
				$("#addressfield-update").val('');
				$("#passwordfield-update").val('');
				$('#getallbutton').click();
			}
		});
	});
});