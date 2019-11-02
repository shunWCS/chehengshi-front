var fs=require("fs");

function copyFile(srcFile,destFile){
	var sub = destFile.indexOf('.js');
	var replace = destFile.substring(0,sub);
	fs.readFile(__dirname + '/'+srcFile, 'utf-8', function (err, data) {
	 	if (err) {
	 		console.log("读取失败");
	 		console.log(err)
	 	}else{
	 		var newData = data.replace(/PLACEHODER/g,replace)
	 		writeFile(newData,destFile)
	      	return newData;
	 	}
	});
}

function writeFile(data,destFile){
	fs.writeFile(__dirname  + '/'+ destFile ,data,'utf8',function(err){
		if(err){
	    	  throw err;
	    }else{
	      	console.log("文件已保存");  
	    }
	});
}
var srcFile = 'Service.js';
var files = [
	'Browse.js',
	'File.js',
	'FileType.js',
	'Order.js',
	'Swiper.js',
	'Sku.js',
	'IntegralFlow.js',
	'Journalism.js',
	'Manufacturer.js',
	'MembershipPackage.js',
	'Product.js',
	'ProductType.js',
	'ProductParameter.js',
	'User.js',
	'Video.js',
	'VideoType.js',
];

files.forEach(function(item,index,arr){
	copyFile(srcFile,item);
})

//copyFile(srcFile,'TeacherService.js');