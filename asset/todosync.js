var TODOSync = {
	url : "http://128.199.76.9:8002/WooJaeWoo",
	init : function() {
		$(window).on("online", this.onofflineListener);
		$(window).on("offline", this.onofflineListener);
	},
	onofflineListener : function() {
		$("#header")[navigator.onLine?"removeClass":"addClass"]("offline");
		// 다음 코드와 같음
        // if (navigator.onLine) $("#header").removeClass("offline");
		// else $("#header").addClass("offline");

		if (navigator.onLine) {
			//서버로 Sync
		}
	},
	get : function(callback) {
		if (navigator.onLine) {
			$.ajax({
				url: this.url,
				method: "GET",
				success: function(result) {
	                $.each(result.reverse(), function(index, item) {
	                    callback(item.todo, item.id, item.completed);
	                });
				}
			});
		}
		else {
			//Local에 저장
		}
	},
	add : function(todo, callback) {
		if (navigator.onLine) {
			$.ajax({
				url: this.url,
				method: "PUT",
				data: {"todo": todo},
				success: function(result) {
					callback(result.insertId);
				}
			});
		}
		else {
			//Local에 저장
		}
	},
	completed : function(key, complete, callback) {
		if (navigator.onLine) {
			$.ajax({
				url: this.url + "/" + key,
				method: "POST",
				data: {"completed": complete},
				success: function(result) {
	                callback();
				}
			});
		}
		else {
			//Local에 저장
		}
	},
	remove : function(key, callback) {
		if (navigator.onLine) {
			$.ajax({
				url: this.url + "/" + key,
				method: "DELETE",
				success: function(result) {
	                callback();
				}
			});
		}
		else {
			//Local에 저장
		}
	}
};

