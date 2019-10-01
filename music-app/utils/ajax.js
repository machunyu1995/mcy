exports.http = function({url,method,data,success}) {
	uni.request({
		url, //仅为示例，并非真实接口地址。
		data,
		method,
		header: {
			'custom-header': 'hello' //自定义请求头信息
		},
		success: (res) => {
			success(res)
		}
	})
}
