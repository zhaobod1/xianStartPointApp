
/*获取当前时间 格式为 2015-10-16 15:25*/
function getCurrentDate()
{
	var dateVal = new Date();
	var dateTmp = dateVal.getFullYear()+"-"+(dateVal.getMonth()+1)+"-"+dateVal.getDate()+" "+dateVal.getHours()+":"+dateVal.getMinutes();
	return dateTmp;
}

/*特殊字符转换*/
function textdecode1(str) {
    str = str.replace(/&amp;/gi, '&');
    str = str.replace(/&lt;/gi, '<');
    str = str.replace(/&gt;/gi, '>');
    str = str.replace(/&nbsp;/gi, ' ');
    str = str.replace(/''/gi, '"');
    str = str.replace(/<brbr>/gi, '<br />');
    	str = str.replace(/"/g, "''");
	str = str.replace(/'/g, '"');
    return str;
}

/*特殊字符转换*/
function textdecode2(str) {
    str = str.replace(/&amp;/gi, '&');
    str = str.replace(/&lt;/gi, '<');
    str = str.replace(/&gt;/gi, '>');
    str = str.replace(/&nbsp;/gi, ' ');
    str = str.replace(/''/gi, '"');
    str = str.replace(/<brbr>/gi, '');
    	str = str.replace(/"/g, "''");
	str = str.replace(/'/g, '"');
    return str;
}