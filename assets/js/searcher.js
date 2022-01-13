let config = JSON.parse("{}");

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) { return pair[1]; }
	}
	return (undefined);
}

initList.push(function () {
	$.ajax({
		url: ".\\blogs\\config.json",
		dataType: "json",
		type: "GET",
		success: function (json) {
			LogMsg("Get json successful!")
			config = json;
			var stxt = decodeURIComponent(getQueryVariable("s"));
			if (stxt != undefined && stxt != "" && stxt != null) {
				$('#search-text').html(`${stxt}`)
			}
			else {
				window.history.back(-1);
				return;
			}
			let result = [];
			for (let i = 0; i < config.config.blogs.length; i++) {
				const element = config.config.blogs[i];
				const flag1 = element.name.toLowerCase().indexOf(getQueryVariable("s").toLowerCase()) != -1;
				const flag2 = element.tag.toLowerCase().indexOf(getQueryVariable("s").toLowerCase()) != -1;
				if (flag1 || flag2) {
					result.push(element);
				}
			}
			if (result.length == 0) {

			}
			result.forEach(item => {
				//Get time
				let timestamp = Date.parse(new Date());
				//Get SHA256
				let right_hash = CryptoJS.SHA256().toString();
				//Get CRC32
				let right_token = (CRC32.str(right_hash));
				let right_code = (CRC32.str(`${timestamp}-*-${item.name}`));
				//Get url
				let article_url = `.\\viewer.html?name=${item.name}&token=${right_token}&code=${right_code}&time=${timestamp}`;
				$("#articles").append(`<article id="post-23"
								class="article-type-list post-23 post type-post status-publish format-standard hentry category-uncategorized">
								<div class="type-list-left">
									<div class="type-list-avatar">
										<a href="#">
											<img alt=""
												src="./assets/imgs/user.png"
												class="avatar avatar-48 photo" height="48" width="48" loading="lazy">
										</a>
									</div>
								</div>
								<div class="type-list-right">
									<div class="type-list-date">${item.time}</div>
									<div class="type-list-right-inner ">
										<h2 class="type-list-title">
											<a href="${article_url}"
												rel="bookmark">${item.title}</a>
										</h2>
										<div class="type-list-excerpt">
											<p>${item.description}</p>
										</div>
										<a class="type-list-more"
											href="${article_url}">进一步了解</a>
									</div>
									<ul class="type-list-meta">
										<li><i class="far fa-folder"></i> <a
												href="./search.html?s=${item.tag}"
												rel="category tag">${item.tag}</a></li>
									</ul>
								</div>
							</article>`)
			});
		}
	});
})

function searchBlog(name) {

}