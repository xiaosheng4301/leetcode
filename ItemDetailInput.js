//////////////////////////////////////////交通费用明细表/////////////////////////////////////////////////////
//////////////xiaosheng///////////////
var gatheringTrafficArray = new Array();
//添加空白一行
function addTrafficRow() {
    var index = gatheringTrafficArray.length;

    gatheringTrafficArray[index] = new jsTrafficGathering('', '', '', '', '', '', '', '');
    refreshTrafficData();
    copyTrafficDataFromPreRow(gatheringTrafficArray.length);
}
//添加一行的时候，复制上一行的数据
function copyTrafficDataFromPreRow(index) {
    if (index == 1)
        return;
    var sel_SrcObj = document.getElementById('TrafficTextBoxDate_' + (index - 2));
    var sel_TarObj = document.getElementById('TrafficTextBoxDate_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTrafficDate(index - 1);

    sel_SrcObj = document.getElementById('SelectTrafficCurrency_' + (index - 2));
    sel_TarObj = document.getElementById('SelectTrafficCurrency_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTrafficCurrency(index - 1);


    sel_SrcObj = document.getElementById('TrafficTextBoxFrom_' + (index - 2));
    sel_TarObj = document.getElementById('TrafficTextBoxFrom_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTrafficFrom(index - 1);

    sel_SrcObj = document.getElementById('TrafficTextBoxTo_' + (index - 2));
    sel_TarObj = document.getElementById('TrafficTextBoxTo_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTrafficTo(index - 1);

    sel_SrcObj = document.getElementById('TrafficTextBoxMil_' + (index - 2));
    sel_TarObj = document.getElementById('TrafficTextBoxMil_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTrafficMil(index - 1);

    sel_SrcObj = document.getElementById('TrafficTextBoxAmount_' + (index - 2));
    sel_TarObj = document.getElementById('TrafficTextBoxAmount_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTrafficAmount(index - 1);

    sel_SrcObj = document.getElementById('TrafficElcInvoice_' + (index - 2));
    sel_TarObj = document.getElementById('TrafficElcInvoice_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTrafficElcInvoice(index - 1);

    sel_SrcObj = document.getElementById('TrafficTextBoxPurpose_' + (index - 2));
    sel_TarObj = document.getElementById('TrafficTextBoxPurpose_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTrafficPurpose(index - 1);

}
//存储项目费用信息
function jsTrafficGathering(jdate, jFrom, jTo, jmil, jamount, jpurpose, jinvoice, jcurrency) {
    this.gt_Traffic_Date = jdate;
    this.gt_Traffic_Currency = jcurrency;
    this.gt_Traffic_From = jFrom;
    this.gt_Traffic_To = jTo;
    this.gt_Traffic_Mil = jmil;
    this.gt_Traffic_Amount = jamount;
    this.gt_Traffic_Elc_Invoice = jinvoice;
    this.gt_Traffic_Purpose = jpurpose;
}
//根据数组（gatheringTrafficArray）显示界面
function refreshTrafficData() {
    //删除原来的行
    var rowCount = TrafficTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        TrafficTable.deleteRow(1);
    }
    var MaxCells = TrafficTable.rows[0].cells.length;

    for (var i = 0; i < gatheringTrafficArray.length; i++) {
        var newRow = TrafficTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = i + 1;
                    cell.align = "center";
                    break;
                case 1: //交通费发生日期
                    var dateID = "TrafficTextBoxDate_" + i;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:90'  id=\"TrafficTextBoxDate_" + i + "\" value=\"" + gatheringTrafficArray[i].gt_Traffic_Date + "\" onblur='javascript:CheckDateFormat(this);setTrafficDate(" + i + ");' onfocus='javascript:setTrafficDate(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=TrafficTextBoxDate_" + i + "','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input   autocomplete='off' class='Wdate' autocomplete='off' style='width:100px' id='" + dateID + "' value='" + gatheringTrafficArray[i].gt_Traffic_Date + "' " +
                        " onblur=\"javascript:setTrafficDate(" + i + ");\" onfocus=\"javascript:setTrafficDate(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">";
                    break;
                case 2: //币种
                    cell.noWrap = true;
                    var currencyId = "SelectTrafficCurrency_" + i;
                    cell.innerHTML = "<select style=\"width:99%\" id=\"" + currencyId + "\" onchange=\"setTrafficCurrency(" + i + ");\">" + addCurrencyType() + "</select>";
                    selectOptions(document.getElementById(currencyId), gatheringTrafficArray[i].gt_Traffic_Currency);
                    setTrafficCurrency(i);
                    break;
                case 3: //起始地点
                    cell.noWrap = true;
                    cell.innerHTML = "<input maxlength='100' autocomplete='off' onblur='javascript:setTrafficFrom(" + i + ");' value=\"" + gatheringTrafficArray[i].gt_Traffic_From + "\" id='TrafficTextBoxFrom_" + i + "' style=\"width:100%\" >";
                    break;
                case 4: //到达地点
                    cell.noWrap = true;
                    cell.innerHTML = "<input maxlength='100' autocomplete='off' onblur='javascript:setTrafficTo(" + i + ");' value=\"" + gatheringTrafficArray[i].gt_Traffic_To + "\" id='TrafficTextBoxTo_" + i + "' style=\"width:100%\" >";
                    break;
                case 5: //里程
                    cell.noWrap = true;
                    cell.innerHTML = "<input maxlength='6' autocomplete='off'  onblur='javascript:setTrafficMil(" + i + ");' type='text' id='TrafficTextBoxMil_" + i + "' value=\"" + gatheringTrafficArray[i].gt_Traffic_Mil + "\"  style=\"width:100%\" onKeypress='javascript:OnlyNumber()'>";
                    break;
                case 6: //金额
                    cell.innerHTML = "<input maxlength='10' autocomplete='off'  onblur='javascript:setTrafficAmount(" + i + ");' type='text' id='TrafficTextBoxAmount_" + i + "' value='" + gatheringTrafficArray[i].gt_Traffic_Amount + "' style=\"width:100%\" onKeypress='javascript:OnlyNumber();calTrafficSum();'>";
                    break;
                case 7: //电子发票号
                    cell.innerHTML = "<input maxlength='10' autocomplete='off'  onblur='javascript:setTrafficElcInvoice(" + i + ");' type='text' id='TrafficElcInvoice_" + i + "' value='" + gatheringTrafficArray[i].gt_Traffic_Elc_Invoice + "' style=\"width:100%\" onKeypress='javascript:OnlyNumber();calTrafficSum();'>";
                    break;
                case 8: //Purpose
                    cell.innerHTML = "<TEXTAREA  rows='1'  autocomplete='off'  maxlength='200' onkeydown='checklength(this);' onblur='javascript:setTrafficPurpose(" + i + ");'  id='TrafficTextBoxPurpose_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "TrafficTextBoxPurpose_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringTrafficArray[i].gt_Traffic_Purpose;
                    }
                    break;
                case 9: //del
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteTrafficRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
    calTrafficSum();
}
function setTrafficDate(index) {
    var obj = document.getElementById("TrafficTextBoxDate_" + index);
    gatheringTrafficArray[index].gt_Traffic_Date = obj.value;
}
function selectOptions(obj, value) {
    for (var i = 0; i < obj.options.length; i++) {
        if (obj.options[i].value == value) {
            obj.options[i].selected = true;
        }
    }
}
function setTrafficCurrency(index) {
    var obj = document.getElementById("SelectTrafficCurrency_" + index);
    gatheringTrafficArray[index].gt_Traffic_Currency = obj.value;
}
function setTrafficFrom(index) {
    var obj = document.getElementById("TrafficTextBoxFrom_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的市内交通费-起始地点-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 100) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 100);
        alert("第" + no + "行的市内交通费-起始地点-至多只能录入100个字符。");
        gatheringTrafficArray[index].gt_Traffic_From = obj.value;
        return;
    }

    gatheringTrafficArray[index].gt_Traffic_From = obj.value;
}
function setTrafficTo(index) {
    var obj = document.getElementById("TrafficTextBoxTo_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的市内交通费-到达地点-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 100) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 100);
        alert("第" + no + "行的市内交通费-到达地点-至多只能录入100个字符。");
        gatheringTrafficArray[index].gt_Traffic_To = obj.value;
        return;
    }

    gatheringTrafficArray[index].gt_Traffic_To = obj.value;
}
function setTrafficMil(index) {
    var objMil = document.getElementById("TrafficTextBoxMil_" + index);
    //检查输入的是否是数字
    if (objMil.value != "") {
        if (!isMoneyValue(objMil.value)) {
            document.getElementById("TrafficTextBoxMil_" + index).value = '';
            alert('市内交通费用里程不正确，只能填写数值');
            //alert('fff');
            return;
        }
        else {
            gatheringTrafficArray[index].gt_Traffic_Mil = objMil.value;
        }
    }
}
//删除选定行
function deleteTrafficRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringTrafficArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringTrafficArray[i];
            j++;
        }
    }

    gatheringTrafficArray = tempArray;
    refreshTrafficData();
}
//计算付款合计
function calTrafficSum() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringTrafficArray.length; i++) {
        var amount = gatheringTrafficArray[i].gt_Traffic_Amount;

        amount = amount.replace(/\,/g, "");
        sumAmount += parseFloat(amount);
    }
    document.all.LabelSumTrafficAmount.innerText = formatCurrency(sumAmount);
}
function setTrafficAmount(index) {
    var obj = document.getElementById("TrafficTextBoxAmount_" + index);

    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        // alert('请填写第' + no + '行的市内交通费用金额');
        gatheringTrafficArray[index].gt_Traffic_Amount = 0;
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的市内交通费用金额不正确');
        obj.value = "";
        return;
    }
    obj.value = Math.round(obj.value * 100) / 100;

    gatheringTrafficArray[index].gt_Traffic_Amount = obj.value;

    calTrafficSum();
}
function setTrafficElcInvoice(index) {
    var obj = document.getElementById("TrafficElcInvoice_" + index);

    var no = index + 1;

    gatheringTrafficArray[index].gt_Traffic_Elc_Invoice = obj.value;
}
function setTrafficPurpose(index) {
    var obj = document.getElementById("TrafficTextBoxPurpose_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的市内交通费-工作事由-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 500) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 500);
        alert("第" + no + "行的市内交通费-工作事由-至多只能录入500个字符。");
        gatheringTrafficArray[index].gt_Traffic_Purpose = obj.value;
        return;
    }

    gatheringTrafficArray[index].gt_Traffic_Purpose = obj.value;
}
function trafficItemSubmit() {
    var trafficDateList = '';
    var trafficCurrencyList = '';
    var trafficFromList = '';
    var trafficToList = '';
    var trafficMilList = '';
    var trafficAmountList = '';
    var trafficElcInvoiceList = '';
    var trafficPurposeList = '';

    for (var i = 0; i < gatheringTrafficArray.length; i++) {
        var index = i + 1;

        if (gatheringTrafficArray[i].gt_Traffic_Date == '') {
            alert("交通费用明细第“" + index + "”行的日期不能为空");
            document.all["TrafficTextBoxDate_" + i].focus();
            return false;
        }

        if (gatheringTrafficArray[i].gt_Traffic_From == '') {
            alert("交通费用明细第“" + index + "”行的起始地点不能为空");
            document.all["TrafficTextBoxFrom_" + i].focus();
            return false;
        }
        else {
            if (gatheringTrafficArray[i].gt_Traffic_From.indexOf("~") != -1) {
                alert("交通费用明细第“" + index + "”行的起始地点包含“~”非法字符，请重新输入。");
                document.all["TrafficTextBoxFrom_" + i].focus();
                return false;
            }
            if (gatheringTrafficArray[i].gt_Traffic_From.length > 100) {
                alert("交通费用明细第“" + index + "”行的起始地点不能超过100个字符，请重新输入。");
                document.all["TrafficTextBoxFrom_" + i].focus();
                return false;
            }
        }

        if (gatheringTrafficArray[i].gt_Traffic_To == '') {
            alert("交通费用明细第“" + index + "”行的到达地点不能为空");
            document.all["TrafficTextBoxTo_" + i].focus();
            return false;
        }
        else {
            if (gatheringTrafficArray[i].gt_Traffic_To.indexOf("~") != -1) {
                alert("交通费用明细第“" + index + "”行的到达地点包含“~”非法字符，请重新输入。");
                document.all["TrafficTextBoxTo_" + i].focus();
                return false;
            }
            if (gatheringTrafficArray[i].gt_Traffic_From.length > 100) {
                alert('交通费用明细第“"+index+"”行的到达地点不能超过100个字符，请重新输入。');
                document.all["TrafficTextBoxTo_" + i].focus();
                return false;
            }
        }

        //里程可以不填写 20050721
        if (gatheringTrafficArray[i].gt_Traffic_Mil != '') {
            var obj = document.getElementById("TrafficTextBoxMil_" + i);
            //检查输入的是否是数字
            if (obj.value != "") {
                if (!isMoneyValue(obj.value)) {
                    alert("交通费用明细第“" + index + "”行的里程格式不正确");
                    obj.select();
                    return false;
                }
            }
        }

        if (gatheringTrafficArray[i].gt_Traffic_Amount == '') {
            alert("交通费用明细第“" + index + "”行的金额不能为空");
            //document.all["TrafficTextBoxAmount_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringTrafficArray[i].gt_Traffic_Amount)) {
                alert("交通费用明细第“" + index + "”行的金额不正确");
                //document.all["TrafficTextBoxAmount_" + i].focus();
                return false;
            }
            else {
                if (gatheringTrafficArray[i].gt_Traffic_Amount <= 0) {
                    alert("交通费用明细第“" + index + "”行的金额不能小于等于零");
                    // document.all["TrafficTextBoxAmount_" + i].focus();
                    return false;
                }
            }
        }

        if (gatheringTrafficArray[i].gt_Traffic_Purpose.length <= 0) {
            alert("交通费用明细第“" + index + "”行的目的不能为空");
            document.all["TrafficTextBoxPurpose_" + i].focus();
            return false;
        }

        if (gatheringTrafficArray[i].gt_Traffic_Purpose.length > 500) {
            alert("交通费用明细第“" + index + "”行的目的不能大于500个字符");
            document.all["TrafficTextBoxPurpose_" + i].focus();
            return false;
        }

        if (gatheringTrafficArray[i].gt_Traffic_Purpose.indexOf("~") != -1) {
            alert('费用明细第“' + index + '”行的付款用途字符“~”为非法字符，请重新输入。');
            document.all["TrafficTextBoxPurpose_" + i].focus();
            return false;
        }

        trafficDateList += '~' + gatheringTrafficArray[i].gt_Traffic_Date;

        trafficFromList += '~' + gatheringTrafficArray[i].gt_Traffic_From;

        trafficToList += '~' + gatheringTrafficArray[i].gt_Traffic_To;

        trafficMilList += '~' + gatheringTrafficArray[i].gt_Traffic_Mil;

        trafficAmountList += '~' + gatheringTrafficArray[i].gt_Traffic_Amount;

        trafficElcInvoiceList += '~' + gatheringTrafficArray[i].gt_Traffic_Elc_Invoice;

        trafficPurposeList += '~' + gatheringTrafficArray[i].gt_Traffic_Purpose;

        trafficCurrencyList += '~' + gatheringTrafficArray[i].gt_Traffic_Currency;
    }



    trafficDateList = trafficDateList.substr(1);
    trafficFromList = trafficFromList.substr(1);
    trafficToList = trafficToList.substr(1);
    trafficMilList = trafficMilList.substr(1);
    trafficAmountList = trafficAmountList.substr(1);
    trafficElcInvoiceList = trafficElcInvoiceList.substr(1);
    trafficPurposeList = trafficPurposeList.substr(1);
    trafficCurrencyList = trafficCurrencyList.substr(1);

    document.all.hiddenTrafficDate.value = trafficDateList;
    document.all.hiddenTrafficFrom.value = trafficFromList;
    document.all.hiddenTrafficTo.value = trafficToList;
    document.all.hiddenTrafficMil.value = trafficMilList;
    document.all.hiddenTrafficAmount.value = trafficAmountList;
    document.all.hiddenTrafficElcInvoice.value = trafficElcInvoiceList;
    document.all.hiddenTrafficPurpose.value = trafficPurposeList;
    document.all.hiddenTrafficCurrency.value = trafficCurrencyList;

}

////////////////////////////////////////加班餐费交通费用明细表///////////////////////////////////////

var gatheringWorkTrafficArray = new Array();
//添加空白一行
function addWorkTrafficRow() {
    var index = gatheringWorkTrafficArray.length;

    gatheringWorkTrafficArray[index] = new jsWorkTrafficGathering('', '', '', '', '', '');
    refreshWorkTrafficData();
    copyWorkTrafficDataFromPreRow(gatheringWorkTrafficArray.length);
}
//添加一行的时候，复制上一行的数据
function copyWorkTrafficDataFromPreRow(index) {
    if (index == 1)
        return;

    var sel_SrcObj = document.getElementById('WorkTrafficTextBoxDate_' + (index - 2));
    var sel_TarObj = document.getElementById('WorkTrafficTextBoxDate_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkTrafficDate(index - 1);

    sel_SrcObj = document.getElementById('WorkTrafficTextBoxFrom_' + (index - 2));
    sel_TarObj = document.getElementById('WorkTrafficTextBoxFrom_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkTrafficFrom(index - 1);

    sel_SrcObj = document.getElementById('WorkTrafficTextBoxTo_' + (index - 2));
    sel_TarObj = document.getElementById('WorkTrafficTextBoxTo_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkTrafficTo(index - 1);

    sel_SrcObj = document.getElementById('WorkTrafficTextBoxMil_' + (index - 2));
    sel_TarObj = document.getElementById('WorkTrafficTextBoxMil_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkTrafficMil(index - 1);

    sel_SrcObj = document.getElementById('WorkTrafficTextBoxAmount_' + (index - 2));
    sel_TarObj = document.getElementById('WorkTrafficTextBoxAmount_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkTrafficAmount(index - 1);

    sel_SrcObj = document.getElementById('WorkTrafficTextBoxPurpose_' + (index - 2));
    sel_TarObj = document.getElementById('WorkTrafficTextBoxPurpose_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkTrafficPurpose(index - 1);

}
//存储项目费用信息
function jsWorkTrafficGathering(jdate, jFrom, jTo, jmil, jamount, jpurpose) {
    this.gt_WorkTraffic_Date = jdate;
    this.gt_WorkTraffic_From = jFrom;
    this.gt_WorkTraffic_To = jTo;
    this.gt_WorkTraffic_Mil = jmil;
    this.gt_WorkTraffic_Amount = jamount;
    this.gt_WorkTraffic_Purpose = jpurpose;
}
//根据数组（gatheringWorkTrafficArray）显示界面
function refreshWorkTrafficData() {
    //删除原来的行
    var rowCount = WorkTrafficTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        WorkTrafficTable.deleteRow(1);
    }
    var MaxCells = WorkTrafficTable.rows[0].cells.length;
    for (var i = 0; i < gatheringWorkTrafficArray.length; i++) {
        var newRow = WorkTrafficTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = i + 1;
                    cell.align = "center";
                    break;
                case 1: //交通费发生日期
                    var dateID = "WorkTrafficTextBoxDate_" + i;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:90'  id=\"WorkTrafficTextBoxDate_" + i + "\" value=\"" + gatheringWorkTrafficArray[i].gt_WorkTraffic_Date + "\" onblur='javascript:CheckDateFormat(this);setWorkTrafficDate(" + i + ");' onfocus='javascript:setWorkTrafficDate(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=WorkTrafficTextBoxDate_" + i + "','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input class='Wdate'  autocomplete='off' style='width:90' id='" + dateID + "' value='" + gatheringWorkTrafficArray[i].gt_WorkTraffic_Date + "' " +
                        " onblur=\"javascript:setWorkTrafficDate(" + i + ");\" onfocus=\"javascript:setWorkTrafficDate(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">";
                    break;
                case 2: //起始地点
                    cell.noWrap = true;
                    cell.innerHTML = "<input maxlength='150' onblur='javascript:setWorkTrafficFrom(" + i + ");' value=\"" + gatheringWorkTrafficArray[i].gt_WorkTraffic_From + "\" id='WorkTrafficTextBoxFrom_" + i + "' style=\"width:100%\" >";
                    break;
                case 3: //到达地点
                    cell.noWrap = true;
                    cell.innerHTML = "<input maxlength='150' onblur='javascript:setWorkTrafficTo(" + i + ");' value=\"" + gatheringWorkTrafficArray[i].gt_WorkTraffic_To + "\" id='WorkTrafficTextBoxTo_" + i + "' style=\"width:100%\" >";
                    break;
                case 4: //里程
                    cell.noWrap = true;
                    cell.innerHTML = "<input maxlength='10' onblur='javascript:setWorkTrafficMil(" + i + ");' type='text' id='WorkTrafficTextBoxMil_" + i + "' value=\"" + gatheringWorkTrafficArray[i].gt_WorkTraffic_Mil + "\"  style=\"width:100%\" onKeypress='javascript:OnlyNumber()'>";
                    break;
                case 5: //金额
                    cell.innerHTML = "<input maxlength='20' onblur='javascript:setWorkTrafficAmount(" + i + ");' type='text' id='WorkTrafficTextBoxAmount_" + i + "' value='" + gatheringWorkTrafficArray[i].gt_WorkTraffic_Amount + "' style=\"width:100%\" onKeypress='javascript:OnlyNumber();calWorkTrafficSum();'>";
                    break;
                case 6: //Purpose
                    cell.innerHTML = "<TEXTAREA  rows='1' onblur='javascript:setWorkTrafficPurpose(" + i + ");'  id='WorkTrafficTextBoxPurpose_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "WorkTrafficTextBoxPurpose_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringWorkTrafficArray[i].gt_WorkTraffic_Purpose;
                    }
                    break;
                case 7: //del
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteWorkTrafficRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
    calWorkTrafficSum();
}
function setWorkTrafficDate(index) {
    var obj = document.getElementById("WorkTrafficTextBoxDate_" + index);
    gatheringWorkTrafficArray[index].gt_WorkTraffic_Date = obj.value;
}
function setWorkTrafficFrom(index) {
    var obj = document.getElementById("WorkTrafficTextBoxFrom_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的市内交通费-起始地点-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 100) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 100);
        alert("第" + no + "行的市内交通费-起始地点-至多只能录入100个字符。");
        gatheringWorkTrafficArray[index].gt_WorkTraffic_From = obj.value;
        return;
    }

    gatheringWorkTrafficArray[index].gt_WorkTraffic_From = obj.value;
}
function setWorkTrafficTo(index) {
    var obj = document.getElementById("WorkTrafficTextBoxTo_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的市内交通费-到达地点-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 100) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 100);
        alert("第" + no + "行的市内交通费-到达地点-至多只能录入100个字符。");
        gatheringWorkTrafficArray[index].gt_WorkTraffic_To = obj.value;
        return;
    }

    gatheringWorkTrafficArray[index].gt_WorkTraffic_To = obj.value;
}
function setWorkTrafficMil(index) {
    var objMil = document.getElementById("WorkTrafficTextBoxMil_" + index);
    //检查输入的是否是数字
    if (objMil.value != "") {
        if (!isMoneyValue(objMil.value)) {
            document.getElementById("WorkTrafficTextBoxMil_" + index).value = '';
            alert('市内交通费用里程不正确，只能填写数值');
            //alert('fff');
            return;
        }
        else {
            gatheringWorkTrafficArray[index].gt_WorkTraffic_Mil = objMil.value;
        }
    }
}
//删除选定行
function deleteWorkTrafficRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringWorkTrafficArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringWorkTrafficArray[i];
            j++;
        }
    }

    gatheringWorkTrafficArray = tempArray;
    refreshWorkTrafficData();
}
//计算付款合计
function calWorkTrafficSum() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringWorkTrafficArray.length; i++) {
        var amount = gatheringWorkTrafficArray[i].gt_WorkTraffic_Amount;

        amount = amount.replace(/\,/g, "");
        sumAmount += parseFloat(amount);
    }
    document.all.LabelSumWorkTrafficAmount.innerText = formatCurrency(sumAmount);
}
function setWorkTrafficAmount(index) {
    var obj = document.getElementById("WorkTrafficTextBoxAmount_" + index);

    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        alert('请填写第' + no + '行的市内交通费用金额');
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的市内交通费用金额不正确');
        return;
    }
    obj.value = Math.round(obj.value * 100) / 100;
    gatheringWorkTrafficArray[index].gt_WorkTraffic_Amount = obj.value;

    calWorkTrafficSum();
}
function setWorkTrafficPurpose(index) {
    var obj = document.getElementById("WorkTrafficTextBoxPurpose_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的市内交通费-目的-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 500) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 500);
        alert("第" + no + "行的市内交通费-目的-至多只能录入500个字符。");
        gatheringWorkTrafficArray[index].gt_WorkTraffic_Purpose = obj.value;
        return;
    }

    gatheringWorkTrafficArray[index].gt_WorkTraffic_Purpose = obj.value;
}
function WorkTrafficItemSubmit() {
    var WorkTrafficDateList = '';
    var WorkTrafficFromList = '';
    var WorkTrafficToList = '';
    var WorkTrafficMilList = '';
    var WorkTrafficAmountList = '';
    var WorkTrafficPurposeList = '';


    for (var i = 0; i < gatheringWorkTrafficArray.length; i++) {
        var index = i + 1;


        if (gatheringWorkTrafficArray[i].gt_WorkTraffic_Date == '') {
            alert("交通费用明细第“" + index + "”行的日期不能为空");
            document.all["WorkTrafficTextBoxDate_" + i].focus();
            return false;
        }

        if (gatheringWorkTrafficArray[i].gt_WorkTraffic_From == '') {
            alert("交通费用明细第“" + index + "”行的起始地点不能为空");
            document.all["WorkTrafficTextBoxFrom_" + i].focus();
            return false;
        }
        else {
            if (gatheringWorkTrafficArray[i].gt_WorkTraffic_From.indexOf("~") != -1) {
                alert('交通费用明细第“"+index+"”行的起始地点包含“~”非法字符，请重新输入。');
                document.all["WorkTrafficTextBoxFrom_" + i].focus();
                return false;
            }
            if (gatheringWorkTrafficArray[i].gt_WorkTraffic_From.length > 100) {
                alert('交通费用明细第“"+index+"”行的起始地点不能超过100个字符。');
                document.all["WorkTrafficTextBoxFrom_" + i].focus();
                return false;
            }
        }

        if (gatheringWorkTrafficArray[i].gt_WorkTraffic_To == '') {
            alert("交通费用明细第“" + index + "”行的到达地点不能为空");
            document.all["WorkTrafficTextBoxTo_" + i].focus();
            return false;
        }
        else {
            if (gatheringWorkTrafficArray[i].gt_WorkTraffic_To.indexOf("~") != -1) {
                alert("交通费用明细第“" + index + "”行的到达地点包含“~”非法字符，请重新输入。");
                document.all["WorkTrafficTextBoxTo_" + i].focus();
                return false;
            }
            if (gatheringWorkTrafficArray[i].gt_WorkTraffic_To.length > 100) {
                alert('交通费用明细第“"+index+"”行的到达地点不能超过100个字符。');
                document.all["WorkTrafficTextBoxTo_" + i].focus();
                return false;
            }
        }

        //里程可以不填写 20050721
        if (gatheringWorkTrafficArray[i].gt_WorkTraffic_Mil != '') {
            var obj = document.getElementById("WorkTrafficTextBoxMil_" + i);
            //检查输入的是否是数字
            if (obj.value != "") {
                if (!isMoneyValue(obj.value)) {
                    alert("交通费用明细第“" + index + "”行的里程格式不正确");
                    obj.select();
                    return false;
                }
            }
        }

        if (gatheringWorkTrafficArray[i].gt_WorkTraffic_Amount == '') {
            alert("交通费用明细第“" + index + "”行的金额不能为空");
            document.all["WorkTrafficTextBoxAmount_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringWorkTrafficArray[i].gt_WorkTraffic_Amount)) {
                alert("交通费用明细第“" + index + "”行的金额不正确");
                document.all["WorkTrafficTextBoxAmount_" + i].focus();
                return false;
            }
            else {
                if (gatheringWorkTrafficArray[i].gt_WorkTraffic_Amount <= 0) {
                    alert("交通费用明细第“" + index + "”行的金额不能小于等于零");
                    document.all["WorkTrafficTextBoxAmount_" + i].focus();
                    return false;
                }
            }
        }

        if (gatheringWorkTrafficArray[i].gt_WorkTraffic_Purpose.length <= 0) {
            alert("交通费用明细第“" + index + "”行的目的不能为空");
            document.all["WorkTrafficTextBoxPurpose_" + i].focus();
            return false;
        }

        if (gatheringWorkTrafficArray[i].gt_WorkTraffic_Purpose.length > 500) {
            alert("交通费用明细第“" + index + "”行的目的不能大于500个字符");
            document.all["WorkTrafficTextBoxPurpose_" + i].focus();
            return false;
        }

        if (gatheringWorkTrafficArray[i].gt_WorkTraffic_Purpose.indexOf("~") != -1) {
            alert('费用明细第“' + index + '”行的付款用途字符“~”为非法字符，请重新输入。');
            document.all["WorkTrafficTextBoxPurpose_" + i].focus();
            return false;
        }

        WorkTrafficDateList += '~' + gatheringWorkTrafficArray[i].gt_WorkTraffic_Date;

        WorkTrafficFromList += '~' + gatheringWorkTrafficArray[i].gt_WorkTraffic_From;

        WorkTrafficToList += '~' + gatheringWorkTrafficArray[i].gt_WorkTraffic_To;

        WorkTrafficMilList += '~' + gatheringWorkTrafficArray[i].gt_WorkTraffic_Mil;

        WorkTrafficAmountList += '~' + gatheringWorkTrafficArray[i].gt_WorkTraffic_Amount;

        WorkTrafficPurposeList += '~' + gatheringWorkTrafficArray[i].gt_WorkTraffic_Purpose;


    }



    WorkTrafficDateList = WorkTrafficDateList.substr(1);
    WorkTrafficFromList = WorkTrafficFromList.substr(1);
    WorkTrafficToList = WorkTrafficToList.substr(1);
    WorkTrafficMilList = WorkTrafficMilList.substr(1);
    WorkTrafficAmountList = WorkTrafficAmountList.substr(1);
    WorkTrafficPurposeList = WorkTrafficPurposeList.substr(1);

    document.all.hiddenWorkTrafficDate.value = WorkTrafficDateList;
    document.all.hiddenWorkTrafficFrom.value = WorkTrafficFromList;
    document.all.hiddenWorkTrafficTo.value = WorkTrafficToList;
    document.all.hiddenWorkTrafficMil.value = WorkTrafficMilList;
    document.all.hiddenWorkTrafficAmount.value = WorkTrafficAmountList;
    document.all.hiddenWorkTrafficPurpose.value = WorkTrafficPurposeList;



}

//////////////////////////////////////////劳务费用明细//////////////////////////////////////////////

var gatheringWorkArray = new Array();
//添加空白一行
function addWorkRow() {
    var index = gatheringWorkArray.length;
    if (index >= 1) {
        alert("劳务费用明细每张申请单只能填写一行，如果需要给多人付款，请拆单填写，如有疑问请联系财务部门");
        return;
    }
    var defaultCurrency = document.getElementById("HiddenDefaultCurrency").value;
    if (defaultCurrency == "") {
        defaultCurrency = "CNY";
    }

    gatheringWorkArray[index] = new jsWorkGathering('', '', '', '', '', '', '', '', '', '', defaultCurrency, '1');
    refreshWorkData();
    copyWorkDataFromPreRow(gatheringWorkArray.length);
}
//添加一行的时候，复制上一行的数据
function copyWorkDataFromPreRow(index) {
    if (index == 1)
        return;

    var sel_SrcObj = document.getElementById('WorkTextBoxName_' + (index - 2));
    var sel_TarObj = document.getElementById('WorkTextBoxName_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkName(index - 1);

    sel_SrcObj = document.getElementById('WorkTextBoxPurpose_' + (index - 2));
    sel_TarObj = document.getElementById('WorkTextBoxPurpose_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkPurpose(index - 1);

    sel_SrcObj = document.getElementById('WorkTextBoxPayeeIDCard_' + (index - 2));
    sel_TarObj = document.getElementById('WorkTextBoxPayeeIDCard_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkPayeeIDCard(index - 1);

    //开户行
    sel_SrcObj = document.getElementById('WorkTextBoxOpenBank_' + (index - 2));
    sel_TarObj = document.getElementById('WorkTextBoxOpenBank_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkOpenBank(index - 1);

    //户名
    sel_SrcObj = document.getElementById('WorkTextBoxBankAccount_' + (index - 2));
    sel_TarObj = document.getElementById('WorkTextBoxBankAccount_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkBankAccount(index - 1);

    //卡号
    sel_SrcObj = document.getElementById('WorkTextBoxBankCard_' + (index - 2));
    sel_TarObj = document.getElementById('WorkTextBoxBankCard_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkBankCard(index - 1);


    sel_SrcObj = document.getElementById('WorkTextBoxContactPhone_' + (index - 2));
    sel_TarObj = document.getElementById('WorkTextBoxContactPhone_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkContactPhone(index - 1);

    sel_SrcObj = document.getElementById('WorkTextBoxAmountTaxBefore_' + (index - 2));
    sel_TarObj = document.getElementById('WorkTextBoxAmountTaxBefore_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkAmountTaxBefore(index - 1);

    sel_SrcObj = document.getElementById('WorkTextBoxAmountTax_' + (index - 2));
    sel_TarObj = document.getElementById('WorkTextBoxAmountTax_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;


    sel_SrcObj = document.getElementById('WorkTextBoxAmountTaxAfter_' + (index - 2));
    sel_TarObj = document.getElementById('WorkTextBoxAmountTaxAfter_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkAmountTaxAfter(index - 1);

}
//存储项目费用信息
function jsWorkGathering(jName, jpurpose, jpayeeIDCard, jOpenBank, jBankAccount, jBankCard, jcontactPhone, jamountTaxBefore, jamountTax, jamountTaxAfter, jcurrency, jrate) {
    this.gt_Work_Name = jName;
    this.gt_Work_Purpose = jpurpose;
    this.gt_Work_ID_Card = jpayeeIDCard;
    this.gt_Open_Bank = jOpenBank;
    this.gt_Bank_Account = jBankAccount;
    this.gt_Bank_Card = jBankCard;
    this.gt_Work_Contact_Phone = jcontactPhone;
    this.gt_Work_Amount_Tax_Before = jamountTaxBefore;
    this.gt_Work_Amount_Tax = jamountTax;
    this.gt_Work_Amount_Tax_After = jamountTaxAfter;
    this.gt_Work_Currency = jcurrency;
    this.gt_Work_Rate = jrate;

}
//根据数组（gatheringWorkArray）显示界面
function refreshWorkData() {
    //删除原来的行
    var rowCount = WorkTable.rows.length;
    for (var i = 2; i < rowCount; i++) {
        // alert(i);
        WorkTable.deleteRow(2);
    }

    var MaxCells = 14; // WorkTable.rows[0].cells.length;

    for (var i = 0; i < gatheringWorkArray.length; i++) {
        var newRow = WorkTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = i + 1;
                    cell.align = "center";
                    break;
                case 1: //姓名
                    cell.noWrap = true;
                    cell.innerHTML = "<input maxlength='90' onblur='javascript:setWorkName(" + i + ");' value=\"" + gatheringWorkArray[i].gt_Work_Name + "\" id='WorkTextBoxName_" + i + "' style=\"width:100%\" >";
                    break;
                case 2: //事由
                    cell.innerHTML = "<TEXTAREA  rows='1' onblur='javascript:setWorkPurpose(" + i + ");'  id='WorkTextBoxPurpose_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "WorkTextBoxPurpose_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringWorkArray[i].gt_Work_Purpose;
                    }
                    break;
                case 3: //领款人身份证号码
                    cell.noWrap = true;
                    cell.innerHTML = "<input maxlength='120' onblur='javascript:setWorkPayeeIDCard(" + i + ");' value=\"" + gatheringWorkArray[i].gt_Work_ID_Card + "\" id='WorkTextBoxPayeeIDCard_" + i + "' style=\"width:100%\" >";
                    break;

                case 4: //开户行
                    cell.innerHTML = "<TEXTAREA  rows='1' onblur='javascript:setWorkOpenBank(" + i + ");'  id='WorkTextBoxOpenBank_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "WorkTextBoxOpenBank_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringWorkArray[i].gt_Open_Bank;
                    }
                    break;
                case 5: //户名
                    cell.noWrap = true;
                    cell.innerHTML = "<input maxlength='50' onblur='javascript:setWorkBankAccount(" + i + ");' value=\"" + gatheringWorkArray[i].gt_Bank_Account + "\" id='WorkTextBoxBankAccount_" + i + "' style=\"width:100%\" >";
                    break;

                case 6: //卡号
                    cell.noWrap = true;
                    cell.innerHTML = "<input maxlength='50' onblur='javascript:setWorkBankCard(" + i + ");' value=\"" + gatheringWorkArray[i].gt_Bank_Card + "\" id='WorkTextBoxBankCard_" + i + "' style=\"width:100%\" >";
                    break;

                case 7: //联系人电话
                    cell.noWrap = true;
                    cell.innerHTML = "<input maxlength='50' onblur='javascript:setWorkContactPhone(" + i + ");' value=\"" + gatheringWorkArray[i].gt_Work_Contact_Phone + "\" id='WorkTextBoxContactPhone_" + i + "' style=\"width:100%\" >";
                    break;
                case 8: //应付款税前
                    cell.innerHTML = "<input maxlength='20' onchange='javascript:setWorkAmountTaxBefore(" + i + ");' type='text' id='WorkTextBoxAmountTaxBefore_" + i + "' value='" + gatheringWorkArray[i].gt_Work_Amount_Tax_Before + "' style=\"width:100%\" onKeypress='javascript:calWorkTaxBeforeSum();'>";
                    break;
                case 9: //劳务税
                    cell.innerHTML = "<input maxlength='20'  type='text' id='WorkTextBoxAmountTax_" + i + "' value='" + gatheringWorkArray[i].gt_Work_Amount_Tax + "' style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;
                case 10: //应付款税后
                    cell.innerHTML = "<input maxlength='20' onchange='javascript:setWorkAmountTaxAfter(" + i + ");' type='text' id='WorkTextBoxAmountTaxAfter_" + i + "' value='" + gatheringWorkArray[i].gt_Work_Amount_Tax_After + "' style=\"width:100%\" onKeypress='javascript:calWorkTaxAfterSum();'>";
                    break;
                case 11: //币种
                    var strHTML = "<select style=\"width:98%\" id=\"SelectWorkCurrencyType_" + i + "\" onchange=\"setWorkCurrencyType(" + i + ");\">";
                    strHTML += addCurrencyType();
                    strHTML += "</select>";
                    cell.innerHTML = strHTML;

                    var noFinded = false;
                    for (var m = 0; m < document.all("SelectWorkCurrencyType_" + i).length; m++) {
                        if (gatheringWorkArray[i].gt_Work_Currency == '') {
                            document.all("SelectWorkCurrencyType_" + i).selectedIndex = 0;
                            gatheringWorkArray[i].gt_Work_Currency = document.all("SelectWorkCurrencyType_" + i).value;
                            noFinded = true;
                            break;
                        }
                        else {
                            if (document.all("SelectWorkCurrencyType_" + i).options[m].value == gatheringWorkArray[i].gt_Work_Currency) {
                                document.all("SelectWorkCurrencyType_" + i).selectedIndex = m;
                                gatheringWorkArray[i].gt_Work_Currency = document.all("SelectWorkCurrencyType_" + i).value;
                                noFinded = true;
                                break;
                            }
                        }
                    }

                    if (noFinded == false) {
                        document.all("SelectWorkCurrencyType_" + i).selectedIndex = 0;
                        gatheringWorkArray[i].gt_Work_Currency = document.all("SelectWorkCurrencyType_" + i).value;
                    }
                    break;
                case 12: //汇率
                    cell.innerHTML = "<input maxlength='15' type='text' onchange='javascript:setWorkRate(" + i + ");' id='WorkTextBoxRate_" + i + "' value='" + gatheringWorkArray[i].gt_Work_Rate + "' style=\"width:99%\">";
                    break;
                case 13: //del
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteWorkRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
    calWorkTaxBeforeSum();
    calWorkTaxAfterSum();
}
function setWorkName(index) {
    var obj = document.getElementById("WorkTextBoxName_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的劳务费-姓名-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 25) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 25);
        alert("第" + no + "行的劳务费-姓名-至多只能录入25个字符。");
        gatheringWorkArray[index].gt_Work_Name = obj.value;
        return;
    }

    gatheringWorkArray[index].gt_Work_Name = obj.value;
}
//改币种触发事件
function setWorkCurrencyType(index) {
    var obj = document.getElementById("SelectWorkCurrencyType_" + index);
    gatheringWorkArray[index].gt_Work_Currency = obj.value;
}
//改汇率触发事件
function setWorkRate(index) {
    var obj = document.getElementById("WorkTextBoxRate_" + index);
    //检查输入的是否是数字
    if (obj.value == "") {
        alert('请输入汇率');
        obj.value = gatheringWorkArray[index].gt_Work_Rate;
        obj.select();
        return;
    }
    if (!isRateValue(obj.value)) {
        alert('汇率格式不正确');
        obj.value = gatheringWorkArray[index].gt_Work_Rate;
        obj.select();
        return;
    }

    if (obj.value * 1 == 0) {
        alert('汇率不能为0');
        obj.value = gatheringWorkArray[index].gt_Work_Rate;
        obj.select();
        return;
    }
    obj.value = Math.round(obj.value * 100000000) / 100000000;
    gatheringWorkArray[index].gt_Work_Rate = obj.value;
}
function setWorkPurpose(index) {
    var obj = document.getElementById("WorkTextBoxPurpose_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的劳务费-事由-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 500) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 500);
        alert("第" + no + "行的劳务费-事由-至多只能录入500个字符。");
        gatheringWorkArray[index].gt_Work_Purpose = obj.value;
        return;
    }

    gatheringWorkArray[index].gt_Work_Purpose = obj.value;
}
function setWorkPayeeIDCard(index) {
    var obj = document.getElementById("WorkTextBoxPayeeIDCard_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的劳务费-领款人身份证号码-包含非法字符“~”，请重新输入。");
        return;
    }

    if (!CheckIDCardInputValid(obj.value)) {
        alert("第" + no + "行的劳务费-领款人身份证号码-只能输入数字与字母，请重新输入。");
        obj.value = "";
        obj.focus();
        return;
    }

    if (obj.value.length > 18) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 18);
        alert("第" + no + "行的劳务费-领款人身份证号码-至多只能录入18个字符。");
        gatheringWorkArray[index].gt_Work_ID_Card = obj.value;
        return;
    }
    gatheringWorkArray[index].gt_Work_ID_Card = obj.value;
}
function setWorkContactPhone(index) {
    var obj = document.getElementById("WorkTextBoxContactPhone_" + index);
    var no = index + 1;
    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的劳务费-联系电话-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 15) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 15);
        alert("第" + no + "行的劳务费-联系电话-至多只能录入15个字符。");
        gatheringWorkArray[index].gt_Work_Contact_Phone = obj.value;
        return;
    }

    gatheringWorkArray[index].gt_Work_Contact_Phone = obj.value;
}
//开户行
function setWorkOpenBank(index) {
    var obj = document.getElementById("WorkTextBoxOpenBank_" + index);
    var no = index + 1;
    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的劳务费-开户行-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 50) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 50);
        alert("第" + no + "行的劳务费-开户行-至多只能录入50个字符。");
        gatheringWorkArray[index].gt_Open_Bank = obj.value;
        return;
    }

    gatheringWorkArray[index].gt_Open_Bank = obj.value;
}
//户名
function setWorkBankAccount(index) {
    var obj = document.getElementById("WorkTextBoxBankAccount_" + index);
    var no = index + 1;
    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的劳务费-户名-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 15) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 15);
        alert("第" + no + "行的劳务费-户名-至多只能录入15个字符。");
        gatheringWorkArray[index].gt_Bank_Account = obj.value;
        return;
    }

    gatheringWorkArray[index].gt_Bank_Account = obj.value;
}
//卡号
function setWorkBankCard(index) {
    var obj = document.getElementById("WorkTextBoxBankCard_" + index);
    var no = index + 1;
    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的劳务费-卡号-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 20) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 20);
        alert("第" + no + "行的劳务费-卡号-至多只能录入20个字符。");
        gatheringWorkArray[index].gt_Bank_Card = obj.value;
        return;
    }

    gatheringWorkArray[index].gt_Bank_Card = obj.value;
}
function setWorkAmountTaxBefore(index) {
    var obj = document.getElementById("WorkTextBoxAmountTaxBefore_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        alert('请填写第' + no + '行的劳务费应付款(税前)金额');
        obj.value = gatheringWorkArray[index].gt_Work_Amount_Tax_Before;
        obj.focus();
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的劳务费应付款(税前)金额不正确');
        obj.value = gatheringWorkArray[index].gt_Work_Amount_Tax_Before;
        obj.focus();
        return;
    }
    if (parseFloat(obj.value) <= 0) {
        alert('第' + no + '行的劳务费应付款(税前)金额应该大于0');
        obj.value = gatheringWorkArray[index].gt_Work_Amount_Tax_Before;
        obj.focus();
        return;
    }

    obj.value = Math.round(obj.value * 100) / 100;

    obj.value = formatCurrencyNoComma(obj.value);

    gatheringWorkArray[index].gt_Work_Amount_Tax_Before = obj.value;

    var objTaxAfter = document.getElementById("WorkTextBoxAmountTaxAfter_" + index);
    var objTax = document.getElementById("WorkTextBoxAmountTax_" + index);

    /*20070413修改后
			
    4000元以下            应纳税额＝（税前金额－800元）×20％

    4000～2.5万             应纳税额＝税前金额×80％×20％或税前金额×16％

    2.5万～6.25万              应纳税额＝（税前金额×80％×30％）-2000

    6.25万以上               应纳税额＝（税前金额×80％×40％）-7000
    */
    if (obj.value <= 800) {
        objTax.value = formatCurrencyNoComma(0);
    }
    if (obj.value > 800 && obj.value <= 4000) {
        objTax.value = formatCurrencyNoComma((obj.value - 800) * 0.2);
    }
    else if (obj.value > 4000 && obj.value <= 25000) {
        objTax.value = formatCurrencyNoComma(obj.value * 0.16);
    }
    else if (obj.value > 25000 && obj.value <= 62500) {
        objTax.value = formatCurrencyNoComma((obj.value * 0.8 * 0.3 - 2000));
    }
    else if (obj.value > 62500) {
        objTax.value = formatCurrencyNoComma((obj.value * 0.8 * 0.4 - 7000));
    }

    objTaxAfter.value = formatCurrencyNoComma(obj.value - objTax.value);

    gatheringWorkArray[index].gt_Work_Amount_Tax = objTax.value;
    gatheringWorkArray[index].gt_Work_Amount_Tax_After = objTaxAfter.value;

    calWorkTaxBeforeSum();
    calWorkTaxAfterSum();
}
function setWorkAmountTaxAfter(index) {
    var obj = document.getElementById("WorkTextBoxAmountTaxAfter_" + index);
    //检查输入的是否是数字
    var no = index + 1;

    if (obj.value == "") {
        alert('请填写第' + no + '行的劳务费应付款(税后)金额');
        obj.value = gatheringWorkArray[index].gt_Work_Amount_Tax_After;
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的劳务费应付款(税后)金额不正确');
        obj.value = gatheringWorkArray[index].gt_Work_Amount_Tax_After;
        return;
    }

    obj.value = Math.round(obj.value * 100) / 100;

    gatheringWorkArray[index].gt_Work_Amount_Tax_After = obj.value;

    var objTaxBefore = document.getElementById("WorkTextBoxAmountTaxBefore_" + index);
    var objTax = document.getElementById("WorkTextBoxAmountTax_" + index);

    /*
    2007年4月13
    < 3360             税前劳务收入＝税后金额×1.25-200

    3360～21000            税前劳务收入＝税后金额÷84％

    21000～49500           税前劳务收入＝税后金额×1.3158-2631.58

    49500以上              税前劳务收入＝税后金额 × 1.4706-10294.12
            
    */
    if (obj.value <= 800) {
        objTaxBefore.value = formatCurrencyNoComma(obj.value);
    }
    if (obj.value > 800 && obj.value <= 3360) {
        objTaxBefore.value = formatCurrencyNoComma(obj.value * 1.25 - 200);
    }
    else if (obj.value > 3360 && obj.value <= 21000) {
        objTaxBefore.value = formatCurrencyNoComma(obj.value / 0.84);
    }
    else if (obj.value > 21000 && obj.value <= 49500) {
        objTaxBefore.value = formatCurrencyNoComma(obj.value * 1.3158 - 2631.58);
    }
    else if (obj.value > 49500) {
        objTaxBefore.value = formatCurrencyNoComma(obj.value * 1.4706 - 10294.12);
    }

    objTax.value = formatCurrencyNoComma(objTaxBefore.value - obj.value);

    gatheringWorkArray[index].gt_Work_Amount_Tax = objTax.value;
    gatheringWorkArray[index].gt_Work_Amount_Tax_Before = objTaxBefore.value;

    calWorkTaxAfterSum();
    calWorkTaxBeforeSum();
}
//删除选定行
function deleteWorkRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringWorkArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringWorkArray[i];
            j++;
        }
    }

    gatheringWorkArray = tempArray;
    refreshWorkData();
}
//计算付款合计
function calWorkTaxBeforeSum() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringWorkArray.length; i++) {
        var amount = gatheringWorkArray[i].gt_Work_Amount_Tax_Before;

        amount = amount.replace(/\,/g, "");
        sumAmount += parseFloat(amount);
    }
    document.all.LabelSumWorkAmountTaxBefore.innerText = formatCurrency(sumAmount);
}
function calWorkTaxAfterSum() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringWorkArray.length; i++) {
        var amount = gatheringWorkArray[i].gt_Work_Amount_Tax_After;

        amount = amount.replace(/\,/g, "");
        sumAmount += parseFloat(amount);
    }
    document.all.LabelSumWorkAmountTaxAfter.innerText = formatCurrency(sumAmount);
}
function workItemSubmit() {
    var workNameList = '';
    var workPuropseList = '';
    var workPayeeIDCardList = '';
    var workOpenBankList = '';
    var workBankAccountList = '';
    var workBankCardList = '';
    var workContactPhoneList = '';
    var workAmountTaxBeforeList = '';
    var workAmountTaxList = '';
    var workAmountTaxAfterList = '';
    var workCurrencyList = '';
    var workRateList = '';

    /*
    if(gatheringWorkArray.length <=0)
    {
    alert("请填写劳务费用明细");
    return false;
    }
    */
    for (var i = 0; i < gatheringWorkArray.length; i++) {
        var index = i + 1;

        if (gatheringWorkArray[i].gt_Work_Name == '') {
            alert("劳务费用明细第“" + index + "”行的姓名不能为空");
            document.all["WorkTextBoxName_" + i].focus();
            return false;
        }
        else {
            if (gatheringWorkArray[i].gt_Work_Name.indexOf("~") != -1) {
                alert('劳务费用明细第“"+index+"”行的姓名包含“~”非法字符，请重新输入。');
                document.all["WorkTextBoxName_" + i].focus();
                return false;
            }
        }

        if (gatheringWorkArray[i].gt_Work_Purpose.length <= 0) {
            alert("劳务费用明细第“" + index + "”行的事由不能为空");
            document.all["WorkTextBoxPurpose_" + i].focus();
            return false;
        }

        if (gatheringWorkArray[i].gt_Work_Purpose.length > 500) {
            alert("劳务费用明细第“" + index + "”行的事由不能大于500个字符");
            document.all["WorkTextBoxPurpose_" + i].focus();
            return false;
        }

        if (gatheringWorkArray[i].gt_Work_Purpose.indexOf("~") != -1) {
            alert("劳务费用明细第“'+index+'”行的事由包含“~”非法字符，请重新输入。");
            document.all["WorkTextBoxPurpose_" + i].focus();
            return false;
        }


        if (gatheringWorkArray[i].gt_Work_ID_Card == '') {
            alert("劳务费用明细第“" + index + "”行的领款人身份证号码不能为空");
            document.all["WorkTextBoxPayeeIDCard_" + i].focus();
            return false;
        }
        else {
            if (gatheringWorkArray[i].gt_Work_ID_Card.indexOf("~") != -1) {
                alert('劳务费用明细第“"+index+"”行领款人身份证号码包含“~”非法字符，请重新输入。');
                document.all["WorkTextBoxPayeeIDCard_" + i].focus();
                return false;
            }
        }

        //开户行
        if (gatheringWorkArray[i].gt_Open_Bank == '') {
            alert("劳务费用明细第“" + index + "”行的领款人开户行不能为空");
            document.all["WorkTextBoxOpenBank_" + i].focus();
            return false;
        }
        else {
            if (gatheringWorkArray[i].gt_Open_Bank.indexOf("~") != -1) {
                alert('劳务费用明细第“"+index+"”行领款人开户行包含“~”非法字符，请重新输入。');
                document.all["WorkTextBoxOpenBank_" + i].focus();
                return false;
            }
        }

        //户名
        if (gatheringWorkArray[i].gt_Bank_Account == '') {
            alert("劳务费用明细第“" + index + "”行的领款人户名不能为空");
            document.all["WorkTextBoxBankAccount_" + i].focus();
            return false;
        }
        else {
            if (gatheringWorkArray[i].gt_Bank_Account.indexOf("~") != -1) {
                alert('劳务费用明细第“"+index+"”行领款人户名包含“~”非法字符，请重新输入。');
                document.all["WorkTextBoxBankAccount_" + i].focus();
                return false;
            }
        }

        //卡号
        if (gatheringWorkArray[i].gt_Bank_Card == '') {
            alert("劳务费用明细第“" + index + "”行的领款人卡号不能为空");
            document.all["WorkTextBoxBankCard_" + i].focus();
            return false;
        }
        else {
            if (gatheringWorkArray[i].gt_Bank_Card.indexOf("~") != -1) {
                alert('劳务费用明细第“"+index+"”行领款人卡号包含“~”非法字符，请重新输入。');
                document.all["WorkTextBoxBankCard_" + i].focus();
                return false;
            }
        }

        if (gatheringWorkArray[i].gt_Work_Contact_Phone == '') {
            alert("劳务费用明细第“" + index + "”行的联系人电话不能为空");
            document.all["WorkTextBoxContactPhone_" + i].focus();
            return false;
        }
        else {
            if (gatheringWorkArray[i].gt_Work_Contact_Phone.indexOf("~") != -1) {
                alert("劳务费用明细第“" + index + "”行联系人电话包含“~”非法字符，请重新输入。");
                document.all["WorkTextBoxContactPhone_" + i].focus();
                return false;
            }
        }


        if (gatheringWorkArray[i].gt_Work_Amount_Tax_Before == '') {
            alert("劳务费用明细第“" + index + "”行的应付金额（税前）不能为空");
            document.all["WorkTextBoxAmountTaxBefore_" + i].focus();
            return false;
        }

        if (gatheringWorkArray[i].gt_Work_Amount_Tax_After == '') {
            alert("劳务费用明细第“" + index + "”行的应付金额（税后）不能为空");
            document.all["WorkTextBoxAmountTaxAfter_" + i].focus();
            return false;
        }

        if (gatheringWorkArray[i].gt_Work_Amount_Tax_Before - gatheringWorkArray[i].gt_Work_Amount_Tax_After < 0) {
            alert("劳务费用明细第“" + index + "”行的（应付金额）税后金额大于税前金额");
            document.all["WorkTextBoxAmountTaxAfter_" + i].focus();
            return false;
        }
        if (gatheringWorkArray[i].gt_Work_Rate == '') {
            alert("劳务费用明细第“" + index + "”行的汇率不能为空");
            document.getElementById("WorkTextBoxRate_" + i).focus();
            return false;
        }
        else {
            if (!isRateValue(gatheringWorkArray[i].gt_Work_Rate)) {
                alert("劳务费用明细第“" + index + "”行的汇率格式不正确");
                document.getElementById("WorkTextBoxRate_" + i).focus();
                return false;
            }
            else {
                if (gatheringWorkArray[i].gt_Work_Rate <= 0) {
                    alert("劳务费用明细第“" + index + "”行的汇率不能小于或等于0");
                    document.all["WorkTextBoxRate_" + i].focus();
                    return false;
                }
            }
        }
        workNameList += '~' + gatheringWorkArray[i].gt_Work_Name;

        workPuropseList += '~' + gatheringWorkArray[i].gt_Work_Purpose;

        workPayeeIDCardList += '~' + gatheringWorkArray[i].gt_Work_ID_Card;

        workOpenBankList += '~' + gatheringWorkArray[i].gt_Open_Bank;
        workBankAccountList += '~' + gatheringWorkArray[i].gt_Bank_Account;
        workBankCardList += '~' + gatheringWorkArray[i].gt_Bank_Card;

        workContactPhoneList += '~' + gatheringWorkArray[i].gt_Work_Contact_Phone;

        workAmountTaxBeforeList += '~' + gatheringWorkArray[i].gt_Work_Amount_Tax_Before;

        workAmountTaxAfterList += '~' + gatheringWorkArray[i].gt_Work_Amount_Tax_After;

        workAmountTaxList += '~' + gatheringWorkArray[i].gt_Work_Amount_Tax;

        workCurrencyList += '~' + gatheringWorkArray[i].gt_Work_Currency;

        workRateList += '~' + gatheringWorkArray[i].gt_Work_Rate;
    }


    workNameList = workNameList.substr(1);
    workPuropseList = workPuropseList.substr(1);
    workPayeeIDCardList = workPayeeIDCardList.substr(1);

    workOpenBankList = workOpenBankList.substr(1);
    workBankAccountList = workBankAccountList.substr(1);
    workBankCardList = workBankCardList.substr(1);

    workContactPhoneList = workContactPhoneList.substr(1);
    workAmountTaxBeforeList = workAmountTaxBeforeList.substr(1);
    workAmountTaxAfterList = workAmountTaxAfterList.substr(1);
    workAmountTaxList = workAmountTaxList.substr(1);
    workCurrencyList = workCurrencyList.substr(1);
    workRateList = workRateList.substr(1);

    document.all.hiddenWorkName.value = workNameList;
    document.all.hiddenWorkPurpose.value = workPuropseList;
    document.all.hiddenWorkIDCard.value = workPayeeIDCardList;
    document.all.hiddenWorkContactPhone.value = workContactPhoneList;
    document.all.hiddenWorkAmountTaxBefore.value = workAmountTaxBeforeList;
    document.all.hiddenWorkAmountTaxAfter.value = workAmountTaxAfterList;
    document.all.hiddenWorkAmountTax.value = workAmountTaxList;
    document.all.hiddenOpenBank.value = workOpenBankList;
    document.all.hiddenBankAccount.value = workBankAccountList;
    document.all.hiddenBankCard.value = workBankCardList;
    document.getElementById("hiddenWorkCurrency").value = workCurrencyList;
    document.getElementById("hiddenWorkRate").value = workRateList;

}

///////////////////////////////////////交际费/////////////////////////////////////////

var gatheringInterCourseArray = new Array();
//添加空白一行
function addInterCourseRow() {
    var index = gatheringInterCourseArray.length;
    gatheringInterCourseArray[index] = new jsInterCourseGathering('', '', '', '', '', '');
    refreshInterCourseData();
    copyInterCourseDataFromPreRow(gatheringInterCourseArray.length);
}
//添加一行的时候，复制上一行的数据
function copyInterCourseDataFromPreRow(index) {
    if (index == 1)
        return;

    var sel_SrcObj = document.getElementById('InterCourseTextBoxDate_' + (index - 2));
    var sel_TarObj = document.getElementById('InterCourseTextBoxDate_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setInterCourseDate(index - 1);


    //    sel_SrcObj = document.getElementById('InterCourseTextBoxCompanyName_' + (index - 2));
    //    sel_TarObj = document.getElementById('InterCourseTextBoxCompanyName_' + (index - 1));

    //    sel_TarObj.value = sel_SrcObj.value;
    //    setInterCourseCompanyName(index - 1);

    //    sel_SrcObj = document.getElementById('InterCourseTextBoxPeopleCount_' + (index - 2));
    //    sel_TarObj = document.getElementById('InterCourseTextBoxPeopleCount_' + (index - 1));

    //    sel_TarObj.value = sel_SrcObj.value;
    //    setInterCoursePeopleCount(index - 1);

    //    sel_SrcObj = document.getElementById('InterCourseTextBoxCustomerName_' + (index - 2));
    //    sel_TarObj = document.getElementById('InterCourseTextBoxCustomerName_' + (index - 1));

    //    sel_TarObj.value = sel_SrcObj.value;
    //    setInterCourseCustomerName(index - 1);

    sel_SrcObj = document.getElementById('InterCourseTextBoxAmountExplain_' + (index - 2));
    sel_TarObj = document.getElementById('InterCourseTextBoxAmountExplain_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setInterCourseAmountExplain(index - 1)

    sel_SrcObj = document.getElementById('InterCourseTextBoxAmount_' + (index - 2));
    sel_TarObj = document.getElementById('InterCourseTextBoxAmount_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setInterCourseAmount(index - 1);

    //    sel_SrcObj = document.getElementById('InterCourseTextBoxEscortPersons_' + (index - 2));
    //    sel_TarObj = document.getElementById('InterCourseTextBoxEscortPersons_' + (index - 1));

    //    sel_TarObj.value = sel_SrcObj.value;
    //    setInterCourseEscortPersons(index - 1);

}
//存储项目费用信息
function jsInterCourseGathering(jdate, jamountExplain, jamount, jpayment, jTaxNo, jTaxOffice) {
    debugger
    this.gt_InterCourse_Date = jdate; //招待日期
    //    this.gt_InterCourse_CompanyName = jcompanyName; //招待场所
    //    this.gt_InterCourse_PeopleCount = jpeopleCount; //人数
    //    this.gt_InterCourse_CustomerName = jcustomerName; //客户信息
    this.gt_InterCourse_AmountExplain = jamountExplain; //招待原因
    this.gt_InterCourse_Amount = jamount; //报销金额
    //    this.gt_InterCourse_EscortPersons = jescortPersons; //陪同人员
    //    this.gt_InterCourse_AvgAmount = javgAmount; //人均消费
    this.gt_InterCourse_Payment = jpayment; //付款记录
    this.gt_InterCourse_TaxNo = jTaxNo; //发票号
    //开票单位
    this.gt_InterCourse_TaxOffice = jTaxOffice;
}
//根据数组（gatheringInterCourseArray）显示界面
function refreshInterCourseData() {
    //删除原来的行
    var rowCount = InterCourseTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        InterCourseTable.deleteRow(1);
    }

    var MaxCells = InterCourseTable.rows[0].cells.length;
    for (var i = 0; i < gatheringInterCourseArray.length; i++) {
        var newRow = InterCourseTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {//序号	招待日期	客户信息	陪同人员	人数	人均消费	报销金额	招待场所	招待原因
                case 0:
                    cell.innerHTML = i + 1;
                    cell.align = "center";
                    break;
                case 1: //招待日期
                    var dateID = "InterCourseTextBoxDate_" + i;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:90'  id=\"InterCourseTextBoxDate_" + i + "\" value=\"" + gatheringInterCourseArray[i].gt_InterCourse_Date + "\" onblur='javascript:CheckDateFormat(this);setInterCourseDate(" + i + ");' onfocus='javascript:setInterCourseDate(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=InterCourseTextBoxDate_" + i + "','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input class='Wdate' autocomplete='off'  style='width:90' id='" + dateID + "' value='" + gatheringInterCourseArray[i].gt_InterCourse_Date + "' " +
                        " onblur=\"javascript:setInterCourseDate(" + i + ");\" onfocus=\"javascript:setInterCourseDate(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">"
                    break;
                /*case 2: //客户信息
                cell.noWrap = true;
                cell.innerHTML = "<input maxlength='50' onblur='javascript:setInterCourseCustomerName(" + i + ");' value=\"" + gatheringInterCourseArray[i].gt_InterCourse_CustomerName + "\" id='InterCourseTextBoxCustomerName_" + i + "' style=\"width:100%\" >";
                break;
                case 3: //陪同人员
                cell.noWrap = true;
                cell.innerHTML = "<input maxlength='100' onblur='javascript:setInterCourseEscortPersons(" + i + ");' value=\"" + gatheringInterCourseArray[i].gt_InterCourse_EscortPersons + "\" id='InterCourseTextBoxEscortPersons_" + i + "' style=\"width:100%\" >";
                break;
                case 4: //人数
                cell.noWrap = true;
                cell.innerHTML = "<input maxlength='10' onblur='javascript:setInterCoursePeopleCount(" + i + ");' value=\"" + gatheringInterCourseArray[i].gt_InterCourse_PeopleCount + "\" id='InterCourseTextBoxPeopleCount_" + i + "' style=\"width:100%\" onKeypress='javascript:OnlyNumber();'>";
                break;
                case 5: //人均消费
                cell.innerHTML = "<input maxlength='20'  type='text' id='InterCourseTextBoxAvgAmount_" + i + "' value='" + gatheringInterCourseArray[i].gt_InterCourse_AvgAmount + "' style=\"width:100%;;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                break;*/ 
                case 2: //报销金额
                    cell.innerHTML = "<input maxlength='20' autocomplete='off' onchange='javascript:setInterCourseAmount(" + i + ");' type='text' id='InterCourseTextBoxAmount_" + i + "' value='" + gatheringInterCourseArray[i].gt_InterCourse_Amount + "' style=\"width:100%\" onKeypress='javascript:OnlyNumber();calInterCourseSum();'>";
                    break;
                case 3: //发票号
                    cell.innerHTML = "<input maxlength='15' autocomplete='off' onchange='javascript:setInterCourseTaxNo(" + i + ");' type='text' id='InterCourseTextBoxTaxNo_" + i + "' value='" + gatheringInterCourseArray[i].gt_InterCourse_TaxNo + "' style=\"width:100%\">";
                    break;
                case 4: //开票单位名称
                    cell.innerHTML = "<input  autocomplete='off' onchange='javascript:setInterCourseTaxOffice(" + i + ");' type='text' id='InterCourseTextBoxTaxOffice_" + i + "' value='" + gatheringInterCourseArray[i].gt_InterCourse_TaxOffice + "' style=\"width:100%\">";
                    break;
                case 5: //招待原因
                    cell.innerHTML = "<TEXTAREA  rows='1' autocomplete='off' onblur='javascript:setInterCourseAmountExplain(" + i + ");'  id='InterCourseTextBoxAmountExplain_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "InterCourseTextBoxAmountExplain_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringInterCourseArray[i].gt_InterCourse_AmountExplain;
                    }
                    break;
                case 6: //付款记录-交际费
                    cell.innerHTML = "<input type='radio'  value='1' onclick='javascript:setInterCoursePayment(" + i + ");'  name='isPay_" + i + "'  id='InterCourseTextBoxisPayment_" + i + "' style=\"\" \>是<input  type='radio' value='0' onclick='javascript:setInterCoursePayment(" + i + ");'  name='isPay_" + i + "'  id='InterCourseTextBoxUnPayment_" + i + "' style=\"\" \>否";
                    if (gatheringInterCourseArray[i].gt_InterCourse_Payment == "1") {
                        document.getElementById("InterCourseTextBoxisPayment_" + i).checked = true;
                    }
                    else if (gatheringInterCourseArray[i].gt_InterCourse_Payment == "0") {
                        document.getElementById("InterCourseTextBoxUnPayment_" + i).checked = true;
                    }
                    break;
                case 7: //del
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteInterCourseRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
    calInterCourseSum();
}
function setInterCourseTaxNo(index) {
    var obj = document.getElementById("InterCourseTextBoxTaxNo_" + index);
    var no = index + 1;
    gatheringInterCourseArray[index].gt_InterCourse_TaxNo = '';
    if (!obj.value || obj.value == '') {
        alert('第' + no + '行的发票号不能为空');
        return;
    }
    gatheringInterCourseArray[index].gt_InterCourse_TaxNo = obj.value;
}
function setInterCourseTaxOffice(index) {
    var obj = document.getElementById("InterCourseTextBoxTaxOffice_" + index);
    var no = index + 1;
    gatheringInterCourseArray[index].gt_InterCourse_TaxOffice = '';

    gatheringInterCourseArray[index].gt_InterCourse_TaxOffice = obj.value;
}
function setInterCourseDate(index) {//招待日期
    var obj = document.getElementById("InterCourseTextBoxDate_" + index);
    gatheringInterCourseArray[index].gt_InterCourse_Date = obj.value;
}
function setInterCourseCompanyName(index) {//招待场所
    //    var obj = document.getElementById("InterCourseTextBoxCompanyName_" + index);
    //    var no = index + 1;

    //    if (obj.value.indexOf("~") != -1) {
    //        alert("第" + no + "行的交际费-招待场所-包含非法字符“~”，请重新输入。");
    //        return;
    //    }

    //    if (obj.value.length > 100) {
    //        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
    //        obj.value = obj.value.substring(0, 100);
    //        alert("第" + no + "行的交际费-招待场所-至多只能录入100个字符。");
    //        gatheringInterCourseArray[index].gt_InterCourse_CompanyName = obj.value;
    //        return;
    //    }

    //    gatheringInterCourseArray[index].gt_InterCourse_CompanyName = obj.value;
}
function setInterCourseEscortPersons(index) {//陪同人员
    //    var obj = document.getElementById("InterCourseTextBoxEscortPersons_" + index);
    //    var no = index + 1;

    //    if (obj.value.indexOf("~") != -1) {
    //        alert("第" + no + "行的交际费-陪同人员-包含非法字符“~”，请重新输入。");
    //        return;
    //    }

    //    if (obj.value.length > 100) {
    //        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
    //        obj.value = obj.value.substring(0, 100);
    //        alert("第" + no + "行的交际费-陪同人员-至多只能录入100个字符。");
    //        gatheringInterCourseArray[index].gt_InterCourse_EscortPersons = obj.value;
    //        return;
    //    }
    //    gatheringInterCourseArray[index].gt_InterCourse_EscortPersons = obj.value;
}
function setInterCoursePeopleCount(index) {//人数
    //    var obj = document.getElementById("InterCourseTextBoxPeopleCount_" + index);

    //    var no = index + 1;

    //    if (obj.value == "") {
    //        return;
    //    }

    //    if (IsInt(obj.value, "+", 0) == false) {
    //        alert('第' + no + '行的交际费-人数-应为整数');
    //        return;
    //    }

    //    gatheringInterCourseArray[index].gt_InterCourse_PeopleCount = obj.value;

    //    //算人均金额
    //    var objAmount = document.getElementById("InterCourseTextBoxAmount_" + index);
    //    if (objAmount.value != "") {
    //        if (!isMoneyValue(objAmount.value)) {
    //            alert('第' + no + '行的交际费-报销金额-格式不合法');
    //            return;
    //        }

    //        if (objAmount.value <= 0) {
    //            alert('第' + no + '行的交际费-报销金额-格式不合法');
    //            return;
    //        }

    //        objAmount.value = Math.round(objAmount.value * 100) / 100;

    //        //金额除以人数
    //        var objAvgAmount = document.getElementById("InterCourseTextBoxAvgAmount_" + index);

    //        var amount = objAmount.value;
    //        var persons = obj.value;
    //        objAvgAmount.value = formatCurrency(amount / persons);

    //        gatheringInterCourseArray[index].gt_InterCourse_AvgAmount = objAvgAmount.value;
    //    }
}
function setInterCourseCustomerName(index) {//客户信息
    //    var obj = document.getElementById("InterCourseTextBoxCustomerName_" + index);
    //    var no = index + 1;

    //    if (obj.value.indexOf("~") != -1) {
    //        alert("第" + no + "行的交际费-客户信息-包含非法字符“~”，请重新输入。");
    //        return;
    //    }

    //    if (obj.value.length > 50) {
    //        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
    //        obj.value = obj.value.substring(0, 50);
    //        alert("第" + no + "行的交际费-客户信息-至多只能录入50个字符。");
    //        gatheringInterCourseArray[index].gt_InterCourse_CustomerName = obj.value;
    //        return;
    //    }

    //    gatheringInterCourseArray[index].gt_InterCourse_CustomerName = obj.value;
}
function setInterCourseAmount(index) {//报销金额			
    var obj = document.getElementById("InterCourseTextBoxAmount_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        alert('第' + no + '行的交际费-报销金额-格式不合法');
        obj.value = gatheringInterCourseArray[index].gt_InterCourse_Amount;
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的交际费-报销金额-格式不合法');
        obj.value = gatheringInterCourseArray[index].gt_InterCourse_Amount;
        return;
    }

    if (obj.value <= 0) {
        alert('第' + no + '行的交际费-报销金额-格式不合法');
        obj.value = gatheringInterCourseArray[index].gt_InterCourse_Amount;
        return;
    }

    obj.value = Math.round(obj.value * 100) / 100;

    gatheringInterCourseArray[index].gt_InterCourse_Amount = obj.value;

    //算人均金额
    //    var objPeopleCount = document.getElementById("InterCourseTextBoxPeopleCount_" + index);
    //    if (objPeopleCount.value != "") {
    //        if (IsInt(objPeopleCount.value, "+", 0) == false) {
    //            alert('第' + no + '行的交际费-人数-应为整数');
    //            return;
    //        }

    //        if (objPeopleCount.value <= 0) {
    //            alert('第' + no + '行的交际费-人数-应该大于0');
    //            return;
    //        }

    //        //金额除以人数
    //        var objAvgAmount = document.getElementById("InterCourseTextBoxAvgAmount_" + index);
    //        var amount = parseFloat(obj.value);
    //        var persons = objPeopleCount.value;
    //        objAvgAmount.value = formatCurrency(amount / persons);

    //        gatheringInterCourseArray[index].gt_InterCourse_AvgAmount = objAvgAmount.value;
    //}

    calInterCourseSum();
}
function setInterCourseAmountExplain(index) {
    var obj = document.getElementById("InterCourseTextBoxAmountExplain_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的交际费-招待原因-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 500) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 500);
        alert("第" + no + "行的交际费-招待原因-至多只能录入500个字符。");
        gatheringInterCourseArray[index].gt_InterCourse_AmountExplain = obj.value;
        return;
    }

    gatheringInterCourseArray[index].gt_InterCourse_AmountExplain = obj.value;
}
function setInterCoursePayment(index) {
    var isPayment = document.getElementById("InterCourseTextBoxisPayment_" + index);
    var unPayment = document.getElementById("InterCourseTextBoxUnPayment_" + index);
    var no = index + 1;
    gatheringInterCourseArray[index].gt_InterCourse_Payment = isPayment.checked ? isPayment.value : (unPayment.checked ? unPayment.value : "-1");
}
//删除选定行
function deleteInterCourseRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringInterCourseArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringInterCourseArray[i];
            j++;
        }
    }

    gatheringInterCourseArray = tempArray;
    refreshInterCourseData();
}
//计算付款合计
function calInterCourseSum() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringInterCourseArray.length; i++) {
        var amount = gatheringInterCourseArray[i].gt_InterCourse_Amount;

        amount = amount.replace(/\,/g, "");
        sumAmount += parseFloat(amount);
    }
    document.all.LabelSumInterCourseAmount.innerText = formatCurrency(sumAmount);
}

function interCourseItemSubmit() {
    //20110810调整
    //招待日期	客户信息	陪同人员	人数	人均消费	报销金额	招待场所	招待原因
    var interCourseDateList = ''; //招待日期
    var interCourseCustomerNameList = ''; //客户信息
    var interCourseEscortPersonList = ''; //陪同人员
    var interCoursePeopleCountList = ''; //人数
    var interCourseAvgAmountList = ''; //人均消费
    var interCourseAmountList = ''; //报销金额
    var interCourseCompanyNameList = ''; //招待场所
    var interCourseAmountExplainList = ''; //招待原因
    var interCoursePaymentList = ''; //付款记录
    var interCourseTaxNoList = ''; //发票号
    var interCourseTaxOfficeList = ''; //开票单位
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;
    /*
    if(gatheringInterCourseArray.length <=0)
    {
    alert("请填写交际费用明细");
    return false;
    }
    */
    for (var i = 0; i < gatheringInterCourseArray.length; i++) {
        var index = i + 1;
        //招待日期
        if (gatheringInterCourseArray[i].gt_InterCourse_Date == '') {
            alert("交际费用明细第“" + index + "”行的招待日期不能为空");
            document.all["InterCourseTextBoxDate_" + i].focus();
            return false;
        }
        //客户信息
        //        if (gatheringInterCourseArray[i].gt_InterCourse_CustomerName.length <= 0) {
        //            alert("交际费用明细第“" + index + "”行的客户信息不能为空");
        //            document.all["InterCourseTextBoxCustomerName_" + i].focus();
        //            return false;
        //        }
        //        else {
        //            if (gatheringInterCourseArray[i].gt_InterCourse_CustomerName.indexOf('~') != -1) {
        //                alert("交际费用明细第“" + index + "”行的客户信息不能包含非法字符“~”");
        //                document.all["InterCourseTextBoxCustomerName_" + i].focus();
        //                return false;
        //            }
        //            if (gatheringInterCourseArray[i].gt_InterCourse_CustomerName.length > 50) {
        //                alert("交际费用明细第“" + index + "”行的客户信息不能超过50个字");
        //                document.all["InterCourseTextBoxCustomerName_" + i].focus();
        //                return false;
        //            }
        //        }
        //陪同人员
        //        if (gatheringInterCourseArray[i].gt_InterCourse_EscortPersons.length <= 0) {
        //            alert("交际费用明细第“" + index + "”行的陪同人员息不能为空");
        //            document.all["InterCourseTextBoxEscortPersons_" + i].focus();
        //            return false;
        //        }
        //        else {
        //            if (gatheringInterCourseArray[i].gt_InterCourse_EscortPersons.indexOf('~') != -1) {
        //                alert("交际费用明细第“" + index + "”行的陪同人员不能包含非法字符“~”");
        //                document.all["InterCourseTextBoxEscortPersons_" + i].focus();
        //                return false;
        //            }
        //            if (gatheringInterCourseArray[i].gt_InterCourse_EscortPersons.length > 50) {
        //                alert("交际费用明细第“" + index + "”行的陪同人员不能超过100个字");
        //                document.all["InterCourseTextBoxEscortPersons_" + i].focus();
        //                return false;
        //            }
        //        }
                //人数
        //        if (gatheringInterCourseArray[i].gt_InterCourse_PeopleCount == '') {
        //            alert("交际费用明细第“" + index + "”行的人数不能为空");
        //            document.all["InterCourseTextBoxPeopleCount_" + i].focus();
        //            return false;
        //        }
        //        else {
        //            if (gatheringInterCourseArray[i].gt_InterCourse_PeopleCount.indexOf(",") != -1
        //					|| gatheringInterCourseArray[i].gt_InterCourse_PeopleCount.indexOf(".") != -1) {
        //                alert('费用明细第“' + index + '”行的人数“,”“."为非法字符，请重新输入。');
        //                document.all["InterCourseTextBoxPeopleCount_" + i].focus();
        //                return false;
        //            }
        //        }

        //报销金额
        if (gatheringInterCourseArray[i].gt_InterCourse_Amount == '') {
            alert("交际费用明细第“" + index + "”行的报销金额不能为空");
            document.all["InterCourseTextBoxAmount_" + i].focus();
            return false;
        }
        if (gatheringInterCourseArray[i].gt_InterCourse_TaxNo == '') {
            alert("交际费用明细第“" + index + "”行的发票号不能为空");
            document.all["InterCourseTextBoxTaxNo_" + i].focus();
            return false;
        }
        if (document.all["hiddenPaymentType"].value == 'CASHCARD' && gatheringInterCourseArray[i].gt_InterCourse_Amount >= 3000 && (gatheringInterCourseArray[i].gt_InterCourse_Payment == "-1" || gatheringInterCourseArray[i].gt_InterCourse_Payment == "")) {
            alert("交际费明细第“" + index + "”行,由于您的单笔费用>=3000，需选择提供付款记录。如属特殊情况，请选择否，谢谢！");
            return false;
        }

        if (gatheringInterCourseArray[i].gt_InterCourse_Amount >= 3000 && gatheringInterCourseArray[i].gt_InterCourse_TaxOffice == '') {
            alert("交际费明细第“" + index + "”行,由于您的单笔费用>=3000，需填写开票单位名称！");
            document.all["InterCourseTextBoxTaxOffice_" + i].focus();
            return false;
        }

        //招待场所
        //        if (gatheringInterCourseArray[i].gt_InterCourse_CompanyName.length <= 0) {
        //            alert("交际费用明细第“" + index + "”行的招待场所不能为空");
        //            document.all["InterCourseTextBoxCompanyName_" + i].focus();
        //            return false;
        //        }
        //        else {
        //            if (gatheringInterCourseArray[i].gt_InterCourse_CompanyName.indexOf('~') != -1) {
        //                alert("交际费用明细第“" + index + "”行的招待场所不能包含非法字符“~”");
        //                document.all["InterCourseTextBoxCompanyName_" + i].focus();
        //                return false;
        //            }
        //            if (gatheringInterCourseArray[i].gt_InterCourse_CompanyName.length > 100) {
        //                alert("交际费用明细第“" + index + "”行的招待场所不能超过100个字");
        //                document.all["InterCourseTextBoxCompanyName_" + i].focus();
        //                return false;
        //            }
        //        }
        //招待原因
        if (gatheringInterCourseArray[i].gt_InterCourse_AmountExplain.length <= 0) {
            alert("交际费用明细第“" + index + "”行的招待原因不能为空");
            document.all["InterCourseTextBoxAmountExplain_" + i].focus();
            return false;
        }
        else {
            if (gatheringInterCourseArray[i].gt_InterCourse_AmountExplain.indexOf("~") != -1) {
                alert("交际费用明细第“'+index+'”行的招待原因包含“~”非法字符，请重新输入。");
                document.all["InterCourseTextBoxAmountExplain_" + i].focus();
                return false;
            }
            if (gatheringInterCourseArray[i].gt_InterCourse_AmountExplain.length > 500) {
                alert("交际费用明细第“" + index + "”行的招待原因不能大于500个字");
                document.all["InterCourseTextBoxAmountExplain_" + i].focus();
                return false;
            }
        }
        interCourseDateList += '~' + gatheringInterCourseArray[i].gt_InterCourse_Date;

        interCourseCompanyNameList += '~' + gatheringInterCourseArray[i].gt_InterCourse_CompanyName;

        interCoursePeopleCountList += '~' + gatheringInterCourseArray[i].gt_InterCourse_PeopleCount;

        interCourseCustomerNameList += '~' + gatheringInterCourseArray[i].gt_InterCourse_CustomerName;

        interCourseAmountExplainList += '~' + gatheringInterCourseArray[i].gt_InterCourse_AmountExplain;

        interCourseAmountList += '~' + gatheringInterCourseArray[i].gt_InterCourse_Amount;

        interCourseEscortPersonList += '~' + gatheringInterCourseArray[i].gt_InterCourse_EscortPersons;

        interCourseAvgAmountList += '~' + gatheringInterCourseArray[i].gt_InterCourse_AvgAmount;
        interCoursePaymentList += '~' + gatheringInterCourseArray[i].gt_InterCourse_Payment;
        interCourseTaxNoList += '~' + gatheringInterCourseArray[i].gt_InterCourse_TaxNo;
        interCourseTaxOfficeList += '~' + gatheringInterCourseArray[i].gt_InterCourse_TaxOffice;
    }

    interCourseDateList = interCourseDateList.substr(1);
    //interCourseCompanyNameList = interCourseCompanyNameList.substr(1);
    //interCoursePeopleCountList = interCoursePeopleCountList.substr(1);
    // interCourseCustomerNameList = interCourseCustomerNameList.substr(1);
    interCourseAmountExplainList = interCourseAmountExplainList.substr(1);
    interCourseAmountList = interCourseAmountList.substr(1);
    //interCourseEscortPersonList = interCourseEscortPersonList.substr(1);
    //interCourseAvgAmountList = interCourseAvgAmountList.substr(1);
    interCoursePaymentList = interCoursePaymentList.substr(1);
    interCourseTaxNoList = interCourseTaxNoList.substr(1);
    interCourseTaxOfficeList = interCourseTaxOfficeList.substr(1);
    document.all.hiddenInterCourseTaxNo.value = interCourseTaxNoList;
    document.all.hiddenInterCourseTaxOffice.value = interCourseTaxOfficeList;
    document.all.hiddenInterCourseDate.value = interCourseDateList;
    document.all.hiddenInterCourseCompanyName.value = interCourseCompanyNameList;
    document.all.hiddenInterCoursePeopleCount.value = interCoursePeopleCountList;
    document.all.hiddenInterCourseCustomerName.value = interCourseCustomerNameList;
    document.all.hiddenInterCourseAmountExplain.value = interCourseAmountExplainList;
    document.all.hiddenInterCourseAmount.value = interCourseAmountList;
    document.all.HiddenInterCourseEscortPersons.value = interCourseEscortPersonList;
    document.all.HiddenInterCourseAvgAmount.value = interCourseAvgAmountList;
    document.all.HiddenInterCoursePayment.value = interCoursePaymentList;

}

//////////////////////////////////办公费-工作餐费//////////////////////////////////////////

//办公费-工作餐费
var gatheringLunchArray = new Array();
//添加空白一行
function addLunchRow() {
    var index = gatheringLunchArray.length;

    gatheringLunchArray[index] = new jsLunchGathering('', '', '', '', '', '', '', '', '', '');
    refreshLunchData();
    copyLunchDataFromPreRow(gatheringLunchArray.length);
}
//添加一行的时候，复制上一行的数据
function copyLunchDataFromPreRow(index) {
    if (index == 1)
        return;
    var objIsCopy = document.getElementById('CheckBoxIsCopy_' + (index - 2));
    if (objIsCopy.checked == false)
        return;
    var sel_SrcObj = document.getElementById('LunchTextBoxDate_' + (index - 2));
    var sel_TarObj = document.getElementById('LunchTextBoxDate_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setLunchDate(index - 1);

    sel_SrcObj = document.getElementById('LunchTextBoxPersons_' + (index - 2));
    sel_TarObj = document.getElementById('LunchTextBoxPersons_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setLunchPersons(index - 1);

    sel_SrcObj = document.getElementById('LunchTextBoxOtherPersons_' + (index - 2));
    sel_TarObj = document.getElementById('LunchTextBoxOtherPersons_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setLunchOtherPersons(index - 1);
    //工号
    sel_SrcObj = document.getElementById('LunchTextBoxInsiderEmployeeNumber_' + (index - 2));
    sel_TarObj = document.getElementById('LunchTextBoxInsiderEmployeeNumber_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setLunchEmployeeNumber(index - 1);

    //人数
    sel_SrcObj = document.getElementById('LunchTextBoxDinnerAccount_' + (index - 2));
    sel_TarObj = document.getElementById('LunchTextBoxDinnerAccount_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setLunchDinnerAccount(index - 1);

    sel_SrcObj = document.getElementById('LunchTextBoxAmount_' + (index - 2));
    sel_TarObj = document.getElementById('LunchTextBoxAmount_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setLunchAmount(index - 1);

    sel_SrcObj = document.getElementById('LunchTextBoxRemarks_' + (index - 2));
    sel_TarObj = document.getElementById('LunchTextBoxRemarks_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setLunchRemarks(index - 1);


}
//存储项目费用信息
function jsLunchGathering(jdate, jpersons, jamount, jremarks, jspayment, jTaxNo, jOtherPerson, jDinnerAccount, jsInsiderEmployeeNumber, jIsCopy) {
    this.gt_Lunch_Date = jdate;
    this.gt_Lunch_Persons = jpersons;
    this.gt_Lunch_Amount = jamount;
    this.gt_Lunch_Remarks = jremarks;
    this.gt_Lunch_Payment = jspayment;
    this.gt_Lunch_TaxNo = jTaxNo;
    this.gt_Lunch_OtherPersons = jOtherPerson;
    this.gt_Lunch_Dinner_Account = jDinnerAccount;
    this.gt_Lunch_Insider_EmployeeNumber = jsInsiderEmployeeNumber;
    if (jIsCopy)
        this.gt_Lunch_IsCopy = jIsCopy;
    else
        this.gt_Lunch_IsCopy = 0;
}
//根据数组（gatheringInterCourseArray）显示界面
function refreshLunchData() {
    //删除原来的行
    var rowCount = LunchTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        LunchTable.deleteRow(1);
    }

    var MaxCells = LunchTable.rows[0].cells.length;
    for (var i = 0; i < gatheringLunchArray.length; i++) {
        var newRow = LunchTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = i + 1;
                    cell.align = "center";
                    break;
                case 1: //就餐日期
                    var dateID = "LunchTextBoxDate_" + i;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:90'  id=\"LunchTextBoxDate_" + i + "\" value=\"" + gatheringLunchArray[i].gt_Lunch_Date + "\" onblur='javascript:CheckDateFormat(this);setLunchDate(" + i + ");' onfocus='javascript:setLunchDate(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=LunchTextBoxDate_" + i + "','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input class='Wdate'  autocomplete='off' style='width:90' id='" + dateID + "' value='" + gatheringLunchArray[i].gt_Lunch_Date + "' " +
                        " onblur=\"javascript:setLunchDate(" + i + ");\" onfocus=\"javascript:setLunchDate(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">"
                    break;
                case 2: //就餐人员，员工
                    cell.width = 140;
                    cell.innerHTML = "<input maxlength='1000' type='hidden' id='LunchTextBoxInsiderEmployeeNumber_" + i + "' value='" + gatheringLunchArray[i].gt_Lunch_Insider_EmployeeNumber + "' style=\"height:40px\"><TEXTAREA  rows='2' MaxLength=1000  id='LunchTextBoxPersons_" + i + "' style=\"width:90%;\" readonly ></TEXTAREA>";
                    var objEmployeeNumberId = "LunchTextBoxInsiderEmployeeNumber_" + i;
                    var originalEmployeeNumber = "";
                    if (document.getElementById(objEmployeeNumberId)) {
                        originalEmployeeNumber = document.getElementById(objEmployeeNumberId).value;
                    }
                    var obj = "LunchTextBoxPersons_" + i;
                    cell.innerHTML += "<IMG id='imgQuery_" + i + "' onclick=\"QueryEmployeeInfo('" + objEmployeeNumberId + "','" + obj + "','LunchTextBoxDinnerAccount_" + i + "','" + i + "')\" style='CURSOR: hand;' src='../../images/searchicon_enabled.gif' align='absBottom'>";
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringLunchArray[i].gt_Lunch_Persons;
                    }

                    var objEmployeeNumber = document.getElementById(objEmployeeNumberId);
                    var objLastName = document.getElementById(obj);
                    var objImgId = "imgQuery_" + i;
                    var objImg = document.getElementById(objImgId);
                    objLastName.readOnly = true;
                    objImg.style.display = "inline";

                    break;
                case 3: //其他人员
                    cell.noWrap = true;
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=1000  onblur='javascript:setLunchOtherPersons(" + i + ");' id='LunchTextBoxOtherPersons_" + i + "' style=\"width:100%\" ></TEXTAREA>";
                    var obj = "LunchTextBoxOtherPersons_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringLunchArray[i].gt_Lunch_OtherPersons;
                    }
                    break;
                case 4: //用餐人数
                    cell.innerHTML = "<input style='width:60px' maxlength='10' autocomplete='off' type='text' id='LunchTextBoxDinnerAccount_" + i + "' value='" + gatheringLunchArray[i].gt_Lunch_Dinner_Account + "' onchange='javascript:setLunchDinnerAccount(" + i + ");' onKeypress='javascript:CheckNumeric();'>";
                    break;
                case 5: //金额
                    cell.innerHTML = "<input maxlength='20' autocomplete='off' onchange='javascript:setLunchAmount(" + i + ");' type='text' id='LunchTextBoxAmount_" + i + "' value='" + gatheringLunchArray[i].gt_Lunch_Amount + "' style=\"width:100%\" onKeypress='javascript:OnlyNumber();calLunchSum();'>";
                    break;
                case 6: //发票号
                    cell.innerHTML = "<input maxlength='15' autocomplete='off' onchange='javascript:setLunchTaxNo(" + i + ");' type='text' id='LunchTextBoxTaxNo_" + i + "' value='" + gatheringLunchArray[i].gt_Lunch_TaxNo + "' style=\"width:100%\">";
                    break;
                case 7: //备注
                    cell.innerHTML = "<TEXTAREA  rows='2' onblur='javascript:setLunchRemarks(" + i + ");'  id='LunchTextBoxRemarks_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "LunchTextBoxRemarks_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringLunchArray[i].gt_Lunch_Remarks;
                    }
                    break;
                case 8: //付款记录
                    cell.innerHTML = "<input type='radio'  value='1' onclick='javascript:setPayment(" + i + ");'  name='isPay_" + i + "'  id='LunchTextBoxisPayment_" + i + "' style=\"\" \>是<input  type='radio' value='0' onclick='javascript:setPayment(" + i + ");'  name='isPay_" + i + "'  id='LunchTextBoxUnPayment_" + i + "' style=\"\" \>否";
                    //                    var obj = "LunchTextBoxPayment_" + i;
                    //                    if (document.getElementById(obj)) {
                    //                        document.getElementById(obj).value = gatheringLunchArray[i].gt_Lunch_payment;
                    //                    }
                    if (gatheringLunchArray[i].gt_Lunch_Payment == "1") {
                        document.getElementById("LunchTextBoxisPayment_" + i).checked = true;
                    }
                    else if (gatheringLunchArray[i].gt_Lunch_Payment == "0") {
                        document.getElementById("LunchTextBoxUnPayment_" + i).checked = true;
                    }
                    break;
                case 9:
                    cell.width = 40;
                    if (gatheringLunchArray[i].gt_Lunch_IsCopy == "0" || gatheringLunchArray[i].gt_Lunch_IsCopy == "")
                        cell.innerHTML = "<input type='checkbox' id=\"CheckBoxIsCopy_" + i + "\" onclick='javascript:setLunchIsCopy(" + i + ")'>";
                    else
                        cell.innerHTML = "<input checked type='checkbox' id=\"CheckBoxIsCopy_" + i + "\" onclick='javascript:setLunchIsCopy(" + i + ")'>";
                    break;
                case 10: //del
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteLunchRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }
        }
    }
    calLunchSum();
}
function setLunchIsCopy(index) {//是否复制
    var obj = document.getElementById("CheckBoxIsCopy_" + index);
    if (obj.checked == true)
        gatheringLunchArray[index].gt_Lunch_IsCopy = "1";
    else
        gatheringLunchArray[index].gt_Lunch_IsCopy = "0";
}
function setLunchTaxNo(index) {
    var obj = document.getElementById("LunchTextBoxTaxNo_" + index);
    var no = index + 1;
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;
    gatheringLunchArray[index].gt_Lunch_TaxNo = ''
    if (!obj.value || obj.value == '') {
        alert('第' + no + '行的发票号不能为空');
        return;
    }
    gatheringLunchArray[index].gt_Lunch_TaxNo = obj.value;
}
function setLunchDate(index) {
    var obj = document.getElementById("LunchTextBoxDate_" + index);
    gatheringLunchArray[index].gt_Lunch_Date = obj.value;
}
function setLunchDinnerAccount(index) {

    var obj = document.getElementById("LunchTextBoxDinnerAccount_" + index);
    var no = index + 1;
    if (!IsInt(obj.value)) {
        alert('第' + no + '行的工作餐费费用明细-用餐人数-必须为整数');
        obj.value = gatheringLunchArray[index].gt_Lunch_Dinner_Account;
        return;
    }
    gatheringLunchArray[index].gt_Lunch_Dinner_Account = obj.value;

}
function setLunchPersons(index) {
    var obj = document.getElementById("LunchTextBoxPersons_" + index);
    var objEmployeeNumber = document.getElementById("LunchTextBoxInsiderEmployeeNumber_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的工作餐费-就餐人员-信息中包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 250) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        //obj.value = obj.value.substring(0, 300);
        alert("第" + no + "行的工作餐费-就餐人员-至多只能录入300个字符。");
        gatheringLunchArray[index].gt_Lunch_Persons = obj.value;
        return;
    }

    gatheringLunchArray[index].gt_Lunch_Persons = obj.value;
    gatheringLunchArray[index].gt_Lunch_Insider_EmployeeNumber = objEmployeeNumber.value;
}
function setLunchOtherPersons(index) {

    var obj = document.getElementById("LunchTextBoxOtherPersons_" + index);
    var no = index + 1;
    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的工作餐费-其他就餐人员-信息中包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 250) {
        alert("第" + no + "行的工作餐费-其他就餐人员-至多只能录入300个字符。");
        gatheringLunchArray[index].gt_Lunch_OtherPersons = obj.value;
        return;
    }

    gatheringLunchArray[index].gt_Lunch_OtherPersons = obj.value;
}
function setLunchEmployeeNumber(index) {
    var obj = document.getElementById("LunchTextBoxInsiderEmployeeNumber_" + index);
    var no = index + 1;

    gatheringLunchArray[index].gt_Lunch_Insider_EmployeeNumber = obj.value;

}
//删除选定行
function deleteLunchRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringLunchArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringLunchArray[i];
            j++;
        }
    }

    gatheringLunchArray = tempArray;
    refreshLunchData();
}
//计算付款合计
function calLunchSum() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringLunchArray.length; i++) {
        var amount = gatheringLunchArray[i].gt_Lunch_Amount;

        amount = amount.replace(/\,/g, "");
        sumAmount += parseFloat(amount);
    }
    document.all.LabelSumLunchAmount.innerText = formatCurrency(sumAmount);
}
function setLunchAmount(index) {
    var obj = document.getElementById("LunchTextBoxAmount_" + index);
    var no = index + 1;
    //检查输入的是否是数字
    if (obj.value == "") {
        alert('请填写第' + no + '行的工作餐费金额');
        obj.value = gatheringLunchArray[index].gt_Lunch_Amount;
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的工作餐费金额不正确');
        obj.value = gatheringLunchArray[index].gt_Lunch_Amount;
        return;
    }

    obj.value = Math.round(obj.value * 100) / 100;

    gatheringLunchArray[index].gt_Lunch_Amount = obj.value;

    calLunchSum();
}
function setLunchRemarks(index) {
    var obj = document.getElementById("LunchTextBoxRemarks_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的工作餐费-工作事由-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 400) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 400);
        alert("第" + no + "行的工作餐费-工作事由-至多只能录入400个字符。");
        gatheringLunchArray[index].gt_Lunch_Remarks = obj.value;
        return;
    }

    gatheringLunchArray[index].gt_Lunch_Remarks = obj.value;
}
function setPayment(index) {
    var isPayment = document.getElementById("LunchTextBoxisPayment_" + index);
    var unPayment = document.getElementById("LunchTextBoxUnPayment_" + index);
    var no = index + 1;
    gatheringLunchArray[index].gt_Lunch_Payment = isPayment.checked ? isPayment.value : (unPayment.checked ? unPayment.value : "-1");
}
function LunchItemSubmit() {
    var lunchDateList = '';
    var lunchPersonsList = '';
    var lunchAmountList = '';
    var lunchRemarksList = '';
    var lunchPaymentList = '';
    var lunchTaxNoList = '';
    var lunchOtherPersonsList = '';
    var lunchPersonsEmployeeNumberList = '';
    var lunchDinnerAccountList = '';
    //必填发票号
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;
    for (var i = 0; i < gatheringLunchArray.length; i++) {
        var index = i + 1;
        if (gatheringLunchArray[i].gt_Lunch_Date == '') {
            alert("工作餐费明细第“" + index + "”行的日期不能为空");
            document.all["LunchTextBoxDate_" + i].focus();
            return false;
        }

        if (gatheringLunchArray[i].gt_Lunch_Persons.length <= 0 && gatheringLunchArray[i].gt_Lunch_OtherPersons.length <= 0) {
            alert("工作餐费明细第“" + index + "”行的用餐人员和其他人员不能同时为空");
            document.all["LunchTextBoxPersons_" + i].focus();
            return false;
        }

        if (gatheringLunchArray[i].gt_Lunch_Persons.length > 300) {
            alert("工作餐费明细第“" + index + "”行的就餐人员信息不能大于300个字");
            document.all["LunchTextBoxPersons_" + i].focus();
            return false;
        }

        if (gatheringLunchArray[i].gt_Lunch_Persons.indexOf("~") != -1) {
            alert("工作餐费明细第“'+index+'”行的就餐人员信息包含“~”非法字符，请重新输入。");
            document.all["LunchTextBoxPersons_" + i].focus();
            return false;
        }
        if (gatheringLunchArray[i].gt_Lunch_OtherPersons.indexOf("~") != -1) {
            alert("工作餐费明细第“'+index+'”行的其他人员信息包含“~”非法字符，请重新输入。");
            document.all["LunchTextBoxOtherPersons_" + i].focus();
            return false;
        }
        if (gatheringLunchArray[i].gt_Lunch_Dinner_Account == '') {
            alert("工作餐费明细第“" + index + "”行的用餐人数不能为空");
            document.all["LunchTextBoxDinnerAccount_" + i].focus();
            return false;
        }
        var empcount = gatheringLunchArray[i].gt_Lunch_Insider_EmployeeNumber.split(",");
        if (empcount.length > 0 && gatheringLunchArray[i].gt_Lunch_OtherPersons.length <= 0 && empcount.length != gatheringLunchArray[i].gt_Lunch_Dinner_Account) {

            alert("工作餐费明细第“" + index + "”行的用餐人数在无其他人员就餐时应该与选择的本公司用餐人员个数相同");
            document.all["LunchTextBoxDinnerAccount_" + i].focus();
            return false;
        }
        if (empcount && empcount.length != 0) {
            if (gatheringLunchArray[i].gt_Lunch_Dinner_Account < empcount.length) {
                alert("工作餐费明细第“" + index + "”行的用餐人数应该大于选择的本公司用餐人员个数");
                document.all["LunchTextBoxDinnerAccount_" + i].focus();
                return false;
            }
        }
        if (companyID.indexOf("6") != 0 && gatheringLunchArray[i].gt_Lunch_Amount > parseFloat(gatheringLunchArray[i].gt_Lunch_Dinner_Account) * 80) {

            alert("工作餐费明细第“" + index + "”行的金额不能超过用餐人数*每人标准(80元/天)后的总额：" + parseFloat(gatheringLunchArray[i].gt_Lunch_Dinner_Account) * 80);
            document.all["LunchTextBoxAmount_" + i].focus();
            return false;
        }
        if (gatheringLunchArray[i].gt_Lunch_Amount == '') {
            alert("工作餐费明细第“" + index + "”行的金额不能为空");
            document.all["LunchTextBoxAmount_" + i].focus();
            return false;
        }
        if (document.all["hiddenPaymentType"].value == 'CASHCARD' && gatheringLunchArray[i].gt_Lunch_Amount >= 3000 && (gatheringLunchArray[i].gt_Lunch_Payment == "-1" || gatheringLunchArray[i].gt_Lunch_Payment == "")) {
            alert("工作餐费明细第“" + index + "”行,由于您的单笔费用>=3000，需选择提供付款记录。如属特殊情况，请选择否，谢谢！");
            return false;
        }
        if (gatheringLunchArray[i].gt_Lunch_Remarks.length > 400) {
            alert("工作餐费明细第“" + index + "”行的备注不能大于400个字符");
            document.all["LunchTextBoxRemarks_" + i].focus();
            return false;
        }

        if (gatheringLunchArray[i].gt_Lunch_Remarks.indexOf("~") != -1) {
            alert("工作餐费明细第“'+index+'”行的备注包含“~”非法字符，请重新输入。");
            document.all["LunchTextBoxRemarks_" + i].focus();
            return false;
        }
        if (gatheringLunchArray[i].gt_Lunch_TaxNo == '') {
            alert("工作餐费明细第“" + index + "”行的发票号不能为空");
            document.all["LunchTextBoxTaxNo_" + i].focus();
            return false;
        }

        lunchDateList += '~' + gatheringLunchArray[i].gt_Lunch_Date;

        lunchPersonsList += '~' + gatheringLunchArray[i].gt_Lunch_Persons;

        lunchAmountList += '~' + gatheringLunchArray[i].gt_Lunch_Amount;

        lunchRemarksList += '~' + gatheringLunchArray[i].gt_Lunch_Remarks;
        lunchPaymentList += '~' + gatheringLunchArray[i].gt_Lunch_Payment;
        lunchTaxNoList += '~' + gatheringLunchArray[i].gt_Lunch_TaxNo;
        lunchOtherPersonsList += '~' + gatheringLunchArray[i].gt_Lunch_OtherPersons;
        lunchPersonsEmployeeNumberList += '~' + gatheringLunchArray[i].gt_Lunch_Insider_EmployeeNumber;
        lunchDinnerAccountList += '~' + gatheringLunchArray[i].gt_Lunch_Dinner_Account;
    }

    lunchDateList = lunchDateList.substr(1);
    if (lunchPersonsList != '')
        lunchPersonsList = lunchPersonsList.substr(1);
    lunchAmountList = lunchAmountList.substr(1);
    lunchRemarksList = lunchRemarksList.substr(1);
    lunchPaymentList = lunchPaymentList.substr(1);
    lunchTaxNoList = lunchTaxNoList.substr(1);
    if (lunchOtherPersonsList != '')
        lunchOtherPersonsList = lunchOtherPersonsList.substr(1);
    if (lunchPersonsEmployeeNumberList != '')
        lunchPersonsEmployeeNumberList = lunchPersonsEmployeeNumberList.substr(1);
    lunchDinnerAccountList = lunchDinnerAccountList.substr(1);

    document.all.hiddenLunchTaxNo.value = lunchTaxNoList;
    document.all.hiddenLunchDate.value = lunchDateList;
    document.all.hiddenLunchPersons.value = lunchPersonsList;
    document.all.hiddenLunchAmount.value = lunchAmountList;
    document.all.hiddenLunchRemarks.value = lunchRemarksList;
    document.all.hiddenLunchPayment.value = lunchPaymentList;
    document.all.hiddenLunchOtherPersons.value = lunchOtherPersonsList;
    document.all.hiddenPersonsEmployeeNumber.value = lunchPersonsEmployeeNumberList;
    document.all.hiddenDinnerAccount.value = lunchDinnerAccountList;

}

/////////////////////////////////////////礼品费用明细表//////////////////////////////////////////////

var gatheringPresentArray = new Array();
//添加空白一行
function addPresentRow() {
    var index = gatheringPresentArray.length;

    var defaultCurrency = document.getElementById("HiddenDefaultCurrency").value;
    if (defaultCurrency == "") {
        defaultCurrency = "CNY";
    }
    gatheringPresentArray[index] = new jsPresentGathering('', '', '', '', '', '', '', '', '', defaultCurrency, '1', '', '', '');
    refreshPresentData();
    copyPresentDataFromPreRow(gatheringPresentArray.length);
}
//添加一行的时候，复制上一行的数据
function copyPresentDataFromPreRow(index) {
    if (index == 1)
        return;

    var sel_SrcObj = document.getElementById('PresentTextBoxDate_' + (index - 2));
    var sel_TarObj = document.getElementById('PresentTextBoxDate_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setPresentDate(index - 1);

    sel_SrcObj = document.getElementById('PresentTextBoxClient_' + (index - 2));
    sel_TarObj = document.getElementById('PresentTextBoxClient_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setPresentClient(index - 1);

    sel_SrcObj = document.getElementById('PresentTextBoxAccompany_' + (index - 2));
    sel_TarObj = document.getElementById('PresentTextBoxAccompany_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setPresentAccompany(index - 1);

    sel_SrcObj = document.getElementById('PresentTextBoxConsumePersons_' + (index - 2));
    sel_TarObj = document.getElementById('PresentTextBoxConsumePersons_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setPresentConsumePersons(index - 1);


    sel_SrcObj = document.getElementById('PresentTextBoxAmount_' + (index - 2));
    sel_TarObj = document.getElementById('PresentTextBoxAmount_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setPresentAmount(index - 1);


    sel_SrcObj = document.getElementById('PresentTextBoxPerAmount_' + (index - 2));
    sel_TarObj = document.getElementById('PresentTextBoxPerAmount_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;

    sel_SrcObj = document.getElementById('PresentTextBoxDescription_' + (index - 2));
    sel_TarObj = document.getElementById('PresentTextBoxDescription_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setPresentDescription(index - 1);

}
//存储礼品费用信息
function jsPresentGathering(jdate, jClient, jAccompany, jConsumePersons,
jAmount, jPerAmount, jdescription, jTaxAmount, jAfterTaxAmount, jCurrency, jRate, jpayment, jTaxNo, jTaxOffice) {
    this.gt_Present_Entertain_Date = jdate;
    this.gt_Present_Client = jClient;
    this.gt_Present_Accompany = jAccompany;
    this.gt_Present_ConsumePersons = jConsumePersons;
    this.gt_Present_Amount = jAmount; //税前金额
    this.gt_Present_PerAmount = jPerAmount;
    this.gt_Present_Description = jdescription;
    this.gt_Present_TaxAmount = jTaxAmount; //税金
    this.gt_Present_AfterTaxAmount = jAfterTaxAmount; //税后金额
    this.gt_Present_Currency = jCurrency; //币种
    this.gt_Present_Rate = jRate; //汇率
    this.gt_Present_Payment = jpayment; //付款记录
    this.gt_Present_TaxNo = jTaxNo; //发票号
    this.gt_Present_TaxOffice = jTaxOffice; //开票单位
}
//根据数组（gatheringPresentArray）显示界面
function refreshPresentData() {
    //删除原来的行
    var rowCount = PresentTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        PresentTable.deleteRow(1);
    }
    var MaxCells = PresentTable.rows[0].cells.length;

    for (var i = 0; i < gatheringPresentArray.length; i++) {
        var newRow = PresentTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = i + 1;
                    cell.align = "center";
                    break;
                case 1: //赠送日期
                    var dateID = "PresentTextBoxDate_" + i;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:90'  id=\"PresentTextBoxDate_" + i + "\" value=\"" + gatheringPresentArray[i].gt_Present_Entertain_Date + "\" onblur='javascript:CheckDateFormat(this);setPresentDate(" + i + ");' onfocus='javascript:setPresentDate(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=PresentTextBoxDate_" + i + "','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input class='Wdate' autocomplete='off' style='width:90' id='" + dateID + "' value='" + gatheringPresentArray[i].gt_Present_Entertain_Date + "' " +
                        " onblur=\"javascript:setPresentDate(" + i + ");\" onfocus=\"javascript:setPresentDate(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">";
                    break;
                case 2: //客户信息
                    cell.noWrap = true;
                    cell.innerHTML = "<TEXTAREA  rows='2'  autocomplete='off'  onblur='javascript:setPresentClient(" + i + ");'  id='PresentTextBoxClient_" + i + "' style=\"width:100\" ></TEXTAREA>";
                    var obj = "PresentTextBoxClient_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringPresentArray[i].gt_Present_Client;
                    }
                    break;
                case 3: //陪同人员
                    cell.noWrap = true;
                    cell.innerHTML = "<TEXTAREA  rows='2' onblur='javascript:setPresentAccompany(" + i + ");'  id='PresentTextBoxAccompany_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "PresentTextBoxAccompany_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringPresentArray[i].gt_Present_Accompany;
                    }
                    break;
                case 4: //人数
                    cell.noWrap = true;
                    cell.innerHTML = "<input  autocomplete='off'   maxlength='6' onchange='javascript:setPresentConsumePersons(" + i + ");' value=\"" + gatheringPresentArray[i].gt_Present_ConsumePersons + "\" id='PresentTextBoxConsumePersons_" + i + "' style=\"width:100%;height:40px\" onKeypress='javascript:OnlyNumber()'>";
                    break;
                case 5: //人均金额
                    cell.innerHTML = "<input maxlength='20' autocomplete='off'   type='text' id='PresentTextBoxPerAmount_" + i + "' value='" + gatheringPresentArray[i].gt_Present_PerAmount + "' style=\"width:100%;height:40px;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;
                case 6: //税前金额（发票金额）							
                    cell.innerHTML = "<input maxlength='20'  autocomplete='off' onchange='javascript:setPresentAmount(" + i + ");' type='text' id='PresentTextBoxAmount_" + i + "' value='" + gatheringPresentArray[i].gt_Present_Amount + "' style=\"width:100%;height:40px\" onKeypress='javascript:OnlyNumber();calPresentSum();'>";
                    break;
                case 7: //税金
                    cell.innerHTML = "<input maxlength='20' readonly='true' type='text' id='PresentTextBoxTaxAmount_" + i + "' value='" + gatheringPresentArray[i].gt_Present_TaxAmount + "' style=\"width:100%;height:40px;BACKGROUND-COLOR: #e6e6e6\">";
                    break;
                case 8: //发票号
                    cell.innerHTML = "<input maxlength='15'  autocomplete='off'  onchange='javascript:setPresentTaxNo(" + i + ");'  type='text' id='PresentTextBoxTaxNo_" + i + "' value='" + gatheringPresentArray[i].gt_Present_TaxNo + "' style=\"width:100%;height:40px;\">";
                    break;
                case 9: //开票单位名称
                    cell.innerHTML = "<input  autocomplete='off' onchange='javascript:setPresentTaxOffice(" + i + ");' type='text' id='PresentTextBoxTaxOffice_" + i + "' value='" + gatheringPresentArray[i].gt_Present_TaxOffice + "' style=\"width:100%\">";
                    break;
                case 10: //报销总额（税后金额）
                    cell.innerHTML = "<input maxlength='20' readonly='true' type='text' id='PresentTextBoxAfterTaxAmount_" + i + "' value='" + gatheringPresentArray[i].gt_Present_AfterTaxAmount + "' style=\"width:100%;height:40px;BACKGROUND-COLOR: #e6e6e6\">";
                    break;
                case 11: //币种
                    var strHTML = "<select style=\"width:98%\" id=\"SelectPresentCurrencyType_" + i + "\" onchange=\"setPresentCurrencyType(" + i + ");\">";
                    strHTML += addCurrencyType();
                    strHTML += "</select>";
                    cell.innerHTML = strHTML;

                    var noFinded = false;
                    for (var m = 0; m < document.all("SelectPresentCurrencyType_" + i).length; m++) {
                        if (gatheringPresentArray[i].gt_Present_Currency == '') {
                            document.all("SelectPresentCurrencyType_" + i).selectedIndex = 0;
                            gatheringPresentArray[i].gt_Present_Currency = document.all("SelectPresentCurrencyType_" + i).value;
                            noFinded = true;
                            break;
                        }
                        else {
                            if (document.all("SelectPresentCurrencyType_" + i).options[m].value == gatheringPresentArray[i].gt_Present_Currency) {
                                document.all("SelectPresentCurrencyType_" + i).selectedIndex = m;
                                gatheringPresentArray[i].gt_Present_Currency = document.all("SelectPresentCurrencyType_" + i).value;
                                noFinded = true;
                                break;
                            }
                        }
                    }

                    if (noFinded == false) {
                        document.all("SelectPresentCurrencyType_" + i).selectedIndex = 0;
                        gatheringPresentArray[i].gt_Present_Currency = document.all("SelectPresentCurrencyType_" + i).value;
                    }
                    break;
                case 12: //汇率
                    cell.innerHTML = "<input maxlength='15'  autocomplete='off' type='text' onblur='javascript:setPresentRate(" + i + ");' id='PresentTextBoxRate_" + i + "' value='" + gatheringPresentArray[i].gt_Present_Rate + "' style=\"width:99%\">";
                    break;
                case 13: //Description
                    cell.innerHTML = "<TEXTAREA  rows='2' onblur='javascript:setPresentDescription(" + i + ");'  id='PresentTextBoxDescription_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "PresentTextBoxDescription_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringPresentArray[i].gt_Present_Description;
                    }
                    break;
                case 14: //付款记录--礼品费
                    cell.innerHTML = "<input type='radio'  value='1' onclick='javascript:setPresentPayment(" + i + ");'  name='isPay_" + i + "'  id='PresentTextBoxisPayment_" + i + "' style=\"\" \>是<input  type='radio' value='0' onclick='javascript:setPresentPayment(" + i + ");'  name='isPay_" + i + "'  id='PresentTextBoxUnPayment_" + i + "' style=\"\" \>否";
                    if (gatheringPresentArray[i].gt_Present_Payment == "1") {
                        document.getElementById("PresentTextBoxisPayment_" + i).checked = true;
                    }
                    else if (gatheringPresentArray[i].gt_Present_Payment == "0") {
                        document.getElementById("PresentTextBoxUnPayment_" + i).checked = true;
                    }
                    break;
                case 15: //del
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deletePresentRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
    calPresentSum();
}
function setPresentTaxNo(index) {
    var obj = document.getElementById("PresentTextBoxTaxNo_" + index);
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;
    var no = index + 1;
    gatheringPresentArray[index].gt_Present_TaxNo = '';
    if (!obj.value || obj.value == '') {
        alert('第' + no + '行的发票号不能为空');
        return;
    }
    gatheringPresentArray[index].gt_Present_TaxNo = obj.value;
}
function setPresentDate(index) {
    var obj = document.getElementById("PresentTextBoxDate_" + index);
    gatheringPresentArray[index].gt_Present_Entertain_Date = obj.value;
}
//改币种触发事件
function setPresentCurrencyType(index) {
    var obj = document.getElementById("SelectPresentCurrencyType_" + index);
    gatheringPresentArray[index].gt_Present_Currency = obj.value;
}
//改汇率触发事件
function setPresentRate(index) {
    var obj = document.getElementById("PresentTextBoxRate_" + index);

    //检查输入的是否是数字
    if (obj.value == "") {
        alert('请输入汇率');
        obj.select();
        return;
    }
    if (!isRateValue(obj.value)) {
        alert('汇率格式不正确');
        obj.select();
        return;
    }

    if (obj.value * 1 == 0) {
        alert('汇率不能为0');
        obj.select();
        return;
    }
    obj.value = Math.round(obj.value * 100000000) / 100000000;
    gatheringPresentArray[index].gt_Present_Rate = obj.value;
}
function setPresentClient(index) {
    var obj = document.getElementById("PresentTextBoxClient_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的礼品费费用-客户信息-中包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 250) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 250);
        alert("第" + no + "行的礼品费费用-客户信息-至多只能录入250个字符。");
        gatheringPresentArray[index].gt_Present_Client = obj.value;
        return;
    }

    gatheringPresentArray[index].gt_Present_Client = obj.value;
}
function setPresentAccompany(index) {
    var obj = document.getElementById("PresentTextBoxAccompany_" + index);
    var no = index + 1;
    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的礼品费用-陪同人员信息-中包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 250) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 250);
        alert("第" + no + "行的礼品费用-陪同人员信息-至多只能录入250个字符。");
        gatheringPresentArray[index].gt_Present_Accompany = obj.value;
        return;
    }

    gatheringPresentArray[index].gt_Present_Accompany = obj.value;
}
function setPresentConsumePersons(index) {
    var obj = document.getElementById("PresentTextBoxConsumePersons_" + index);
    var no = index + 1;

    if (obj.value == "") {
        alert('第' + no + '行的礼品费用-总消费人数-不能为空');
        obj.value = gatheringPresentArray[index].gt_Present_ConsumePersons;
        return;
    }

    if (IsInt(obj.value, "+", 0) == false) {
        alert('第' + no + '行的礼品费用-总消费人数-应为整数');
        obj.value = gatheringPresentArray[index].gt_Present_ConsumePersons;
        return;
    }

    gatheringPresentArray[index].gt_Present_ConsumePersons = obj.value;

    //算人均金额
    var objAmount = document.getElementById("PresentTextBoxAmount_" + index);
    if (objAmount.value != "") {
        if (!isMoneyValue(objAmount.value)) {
            alert('第' + no + '行的礼品费用-消费金额-格式不合法');
            return;
        }

        if (objAmount.value <= 0) {
            alert('第' + no + '行的礼品费用-消费金额-格式不合法');
            return;
        }

        objAmount.value = Math.round(objAmount.value * 100) / 100;

        //发票金额除以消费人数
        var objPerAmount = document.getElementById("PresentTextBoxPerAmount_" + index);

        var amount = objAmount.value;
        var persons = obj.value;
        objPerAmount.value = formatCurrency(amount / persons);

        gatheringPresentArray[index].gt_Present_PerAmount = objPerAmount.value;
    }

}
function setPresentAmount(index) {
    var obj = document.getElementById("PresentTextBoxAmount_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        obj.value = gatheringPresentArray[index].gt_Present_Amount;
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的礼品费用-消费金额-格式不合法');
        obj.value = gatheringPresentArray[index].gt_Present_Amount;
        return;
    }

    if (obj.value <= 0) {
        alert('第' + no + '行的礼品费用-消费金额-格式不合法');
        obj.value = gatheringPresentArray[index].gt_Present_Amount;
        return;
    }

    obj.value = Math.round(obj.value * 100) / 100;

    gatheringPresentArray[index].gt_Present_Amount = obj.value;

    //added 20110804 by caojing
    var objTaxAmount = document.getElementById("PresentTextBoxTaxAmount_" + index); //税金
    var objAfterTaxAmount = document.getElementById("PresentTextBoxAfterTaxAmount_" + index); //税后金额
    //税金公式：发票金额(税前) x 20%
    if (document.getElementById("hiddenPresentIsTax").value == "1") {
        var taxAmount = parseFloat(obj.value) * 0.2;
        objTaxAmount.value = Math.round(taxAmount * 100) / 100;
        gatheringPresentArray[index].gt_Present_TaxAmount = objTaxAmount.value;
        gatheringPresentArray[index].gt_Present_AfterTaxAmount = Math.round((parseFloat(objTaxAmount.value) + parseFloat(obj.value)) * 100) / 100;
        objAfterTaxAmount.value = gatheringPresentArray[index].gt_Present_AfterTaxAmount;
    }
    else {
        objTaxAmount.value = "0";
        objAfterTaxAmount.value = obj.value;
        gatheringPresentArray[index].gt_Present_TaxAmount = objTaxAmount.value;
        gatheringPresentArray[index].gt_Present_AfterTaxAmount = obj.value;
    }

    //算人均金额
    var objConsumePersons = document.getElementById("PresentTextBoxConsumePersons_" + index);
    if (objConsumePersons.value != "") {
        if (IsInt(objConsumePersons.value, "+", 0) == false) {
            alert('第' + no + '行的礼品费用-总消费人员数-应为整数');
            //objConsumePersons.select();
            return;
        }

        if (objConsumePersons.value <= 0) {
            alert('第' + no + '行的礼品费用-总消费人员数-应为整数');
            //objConsumePersons.select();
            return;
        }

        //发票金额除以消费人数
        var objPerAmount = document.getElementById("PresentTextBoxPerAmount_" + index);
        var amount = parseFloat(obj.value);
        var persons = objConsumePersons.value;
        objPerAmount.value = formatCurrency(amount / persons);

        gatheringPresentArray[index].gt_Present_PerAmount = objPerAmount.value;
    }
    calPresentSum();
}
function setPresentTaxOffice(index) {
    var obj = document.getElementById("PresentTextBoxTaxOffice_" + index);
    var no = index + 1;
    gatheringPresentArray[index].gt_Present_TaxOffice = '';

    gatheringPresentArray[index].gt_Present_TaxOffice = obj.value;
}
//删除选定行
function deletePresentRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringPresentArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringPresentArray[i];
            j++;
        }
    }

    gatheringPresentArray = tempArray;
    refreshPresentData();
}
//计算付款合计
function calPresentSum() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringPresentArray.length; i++) {
        var amount = gatheringPresentArray[i].gt_Present_AfterTaxAmount; //按税后modified 20110804 gatheringPresentArray[i].gt_Present_Amount;

        //amount = amount.replace(/\,/g,"");;
        sumAmount += parseFloat(amount);
    }
    document.all.LabelSumPresentAmount.innerText = formatCurrency(sumAmount);
}
function setPresentPerAmount(index) {
    var obj = document.getElementById("PresentTextBoxPerAmount_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的礼品费用-人均金额-格式不合法');
        return;
    }

    gatheringPresentArray[index].gt_Present_PerAmount = obj.value;



    calPresentSum();
}
function setPresentPayment(index) {
    var isPayment = document.getElementById("PresentTextBoxisPayment_" + index);
    var unPayment = document.getElementById("PresentTextBoxUnPayment_" + index);
    var no = index + 1;
    gatheringPresentArray[index].gt_Present_Payment = isPayment.checked ? isPayment.value : (unPayment.checked ? unPayment.value : "-1");
}
function setPresentDescription(index) {
    var obj = document.getElementById("PresentTextBoxDescription_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的礼品费用-招待事项说明-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 250) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 250);
        alert("第" + no + "行的礼品费用-招待事项说明-至多只能录入250个字符。");
        gatheringPresentArray[index].gt_Present_Description = obj.value;
        return;
    }

    gatheringPresentArray[index].gt_Present_Description = obj.value;
}
function presentItemSubmit() {//礼品费
    var presentDateList = '';
    var presentClientList = '';
    var presentAccompanyList = '';
    var presentConsumePersonsList = '';
    var presentAmountList = '';
    var presentPerAmountList = '';
    var presentDescriptionList = '';
    var presentTaxAmountList = ''; //税金
    var presentAfterTaxAmountList = ''; //税后金额
    var presentCurrencyList = ''; //币种
    var presentRateList = ''; //汇率
    var presentPaymentList = ''; //付款记录 
    var presentTaxNoList = ''; //发票号 
    var presentTaxOfficeList = ''; //开票单位
    var isNeedTax = document.getElementById("hiddenPresentIsTax").value; //从申请单页面传过来的实际值
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;
    for (var i = 0; i < gatheringPresentArray.length; i++) {
        var index = i + 1;

        if (gatheringPresentArray[i].gt_Present_Entertain_Date == '') {
            alert("礼品费用明细第“" + index + "”行的赠送日期不能为空");
            document.all["PresentTextBoxDate_" + i].focus();
            return false;
        }

        if (gatheringPresentArray[i].gt_Present_Client == '') {
            alert("礼品费用明细第“" + index + "”行的客户信息不能为空");
            document.all["PresentTextBoxClient_" + i].focus();
            return false;
        }
        else {
            if (gatheringPresentArray[i].gt_Present_Client.indexOf("~") != -1) {
                alert('礼品费用明细第“"+index+"”行的客户信息包含“~”非法字符，请重新输入。');
                document.all["PresentTextBoxClient_" + i].focus();
                return false;
            }
        }

        if (gatheringPresentArray[i].gt_Present_Accompany == '') {
            alert("礼品费用明细第“" + index + "”行的陪同人员信息不能为空");
            document.all["PresentTextBoxAccompany_" + i].focus();
            return false;
        }
        else {
            if (gatheringPresentArray[i].gt_Present_Accompany.indexOf("~") != -1) {
                alert("礼品费用明细第“" + index + "”行的陪同人员信息包含“~”非法字符，请重新输入。");
                document.all["PresentTextBoxAccompany_" + i].focus();
                return false;
            }
        }

        if (gatheringPresentArray[i].gt_Present_ConsumePersons == '') {
            alert("礼品费用明细第“" + index + "”行的人数不能为空");
            document.all["PresentTextBoxConsumePersons_" + i].focus();
            return false;
        }
        else {
            if (gatheringPresentArray[i].gt_Present_ConsumePersons <= 0) {
                alert("礼品费用明细第“" + index + "”行的人数不能小于零");
                document.all["PresentTextBoxConsumePersons_" + i].focus();
                return false;
            }

        }
        if (gatheringPresentArray[i].gt_Present_Amount == '') {
            alert("礼品费用明细第“" + index + "”行的发票金额不能为空");
            document.all["PresentTextBoxAmount_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringPresentArray[i].gt_Present_Amount)) {
                alert("礼品费用明细第“" + index + "”行的发票金额不正确");
                document.all["PresentTextBoxAmount_" + i].focus();
                return false;
            }
            else {
                if (gatheringPresentArray[i].gt_Present_Amount <= 0) {
                    alert("礼品费用明细第“" + index + "”行的发票金额不能小于等于零");
                    document.all["PresentTextBoxAmount_" + i].focus();
                    return false;
                }
            }
        }
        if (document.all["hiddenPaymentType"].value == 'CASHCARD' && gatheringPresentArray[i].gt_Present_Amount >= 3000 && (gatheringPresentArray[i].gt_Present_Payment == "-1" || gatheringPresentArray[i].gt_Present_Payment == "")) {
            alert("礼品费明细第“" + index + "”行,由于您的单笔费用>=3000，需选择提供付款记录。如属特殊情况，请选择否，谢谢！");
            return false;
        }

        if (gatheringPresentArray[i].gt_Present_Amount >= 3000 && gatheringPresentArray[i].gt_Present_TaxOffice == '') {
            alert("礼品费明细第“" + index + "”行,由于您的单笔费用>=3000，需填写开票单位名称！");
            document.all["PresentTextBoxTaxOffice_" + i].focus();
            return false;
        }
        if (isNeedTax == "0") {//不计税
            if (parseFloat(gatheringPresentArray[i].gt_Present_Amount) != parseFloat(gatheringPresentArray[i].gt_Present_AfterTaxAmount) ||
						parseFloat(gatheringPresentArray[i].gt_Present_TaxAmount) != 0) {
                alert("礼品费用明细第“" + index + "”行的发票金额、税金、报销总额与现行规定不一致，请重新填写");
                document.all["PresentTextBoxAmount_" + i].focus();
                return false;
            }
        }
        else if (isNeedTax == "1") {//计税
            if (parseFloat(gatheringPresentArray[i].gt_Present_Amount) == parseFloat(gatheringPresentArray[i].gt_Present_AfterTaxAmount) ||
						parseFloat(gatheringPresentArray[i].gt_Present_TaxAmount) == 0) {
                alert("礼品费用明细第“" + index + "”行的发票金额、税金、报销金额与现行规定不一致，请重新填写");
                document.all["PresentTextBoxAmount_" + i].focus();
                return false;
            }
        }
        if (gatheringPresentArray[i].gt_Present_Rate == '') {
            alert("礼品费明细第“" + index + "”行的汇率不能为空");
            document.getElementById("PresentTextBoxRate_" + i).focus();
            return false;
        }
        else {
            if (!isRateValue(gatheringPresentArray[i].gt_Present_Rate)) {
                alert("礼品费明细第“" + index + "”行的汇率格式不正确");
                document.getElementById("PresentTextBoxRate_" + i).focus();
                return false;
            }
            else {
                if (gatheringPresentArray[i].gt_Present_Rate <= 0) {
                    alert("礼品费明细第“" + index + "”行的汇率不能小于或等于0");
                    document.all["PresentTextBoxRate_" + i].focus();
                    return false;
                }
            }
        }
        if (gatheringPresentArray[i].gt_Present_Description.length <= 0) {
            alert("礼品费用明细第“" + index + "”行的赠送原因不能为空");
            document.all["PresentTextBoxDescription_" + i].focus();
            return false;
        }

        if (gatheringPresentArray[i].gt_Present_Description.length > 150) {
            alert("礼品费用明细第“" + index + "”行的赠送原因不能大于150个字符");
            document.all["PresentTextBoxDescription_" + i].focus();
            return false;
        }

        if (gatheringPresentArray[i].gt_Present_Description.indexOf("~") != -1) {
            alert('礼品费用明细第“' + index + '”行的赠送原因字符“~”为非法字符，请重新输入。');
            document.all["PresentTextBoxDescription_" + i].focus();
            return false;
        }
        if (gatheringPresentArray[i].gt_Present_TaxNo == '') {
            alert("礼品费用明细第“" + index + "”行的发票号不能为空");
            document.all["PresentTextBoxTaxNo_" + i].focus();
            return false;
        }
        presentDateList += '~' + gatheringPresentArray[i].gt_Present_Entertain_Date;

        presentClientList += '~' + gatheringPresentArray[i].gt_Present_Client;

        presentAccompanyList += '~' + gatheringPresentArray[i].gt_Present_Accompany;

        presentConsumePersonsList += '~' + gatheringPresentArray[i].gt_Present_ConsumePersons;

        presentAmountList += '~' + gatheringPresentArray[i].gt_Present_Amount;

        presentPerAmountList += '~' + gatheringPresentArray[i].gt_Present_PerAmount;

        presentDescriptionList += '~' + gatheringPresentArray[i].gt_Present_Description;

        presentTaxAmountList += '~' + gatheringPresentArray[i].gt_Present_TaxAmount;

        presentAfterTaxAmountList += '~' + gatheringPresentArray[i].gt_Present_AfterTaxAmount;

        presentCurrencyList += '~' + gatheringPresentArray[i].gt_Present_Currency;

        presentRateList += '~' + gatheringPresentArray[i].gt_Present_Rate;
        presentPaymentList += '~' + gatheringPresentArray[i].gt_Present_Payment;
        presentTaxNoList += '~' + gatheringPresentArray[i].gt_Present_TaxNo;
        presentTaxOfficeList += '~' + gatheringPresentArray[i].gt_Present_TaxOffice;
    }

    presentDateList = presentDateList.substr(1);
    presentClientList = presentClientList.substr(1);
    presentAccompanyList = presentAccompanyList.substr(1);
    presentConsumePersonsList = presentConsumePersonsList.substr(1);
    presentAmountList = presentAmountList.substr(1);
    presentPerAmountList = presentPerAmountList.substr(1);
    presentDescriptionList = presentDescriptionList.substr(1);
    presentTaxAmountList = presentTaxAmountList.substr(1);
    presentAfterTaxAmountList = presentAfterTaxAmountList.substr(1);
    presentCurrencyList = presentCurrencyList.substr(1);
    presentRateList = presentRateList.substr(1);
    presentPaymentList = presentPaymentList.substr(1);
    presentTaxNoList = presentTaxNoList.substr(1);
    presentTaxOfficeList = presentTaxOfficeList.substr(1);

    document.all.HiddenPresentTaxNo.value = presentTaxNoList;
    document.all.HiddenPresentTaxOffice.value = presentTaxOfficeList;
    document.all.hiddenPresentEntertainDate.value = presentDateList;
    document.all.hiddenPresentClient.value = presentClientList;
    document.all.hiddenPresentAccompany.value = presentAccompanyList;
    document.all.hiddenPresentConsumePersons.value = presentConsumePersonsList;
    document.all.hiddenPresentAmount.value = presentAmountList;
    document.all.hiddenPresentPerAmount.value = presentPerAmountList;
    document.all.HiddenPresentDescription.value = presentDescriptionList;
    document.all.HiddenPresentTaxAmount.value = presentTaxAmountList;
    document.all.HiddenPresentAfterTaxAmount.value = presentAfterTaxAmountList;
    document.all.HiddenPresentCurrency.value = presentCurrencyList;
    document.all.HiddenPresentRate.value = presentRateList;
    document.all.HiddenPresentPayment.value = presentPaymentList;
}


/////////////////////////////////////////内部会议费明细表///////////////////////////////////////////

var gatheringInMeetingArray = new Array();
//添加空白一行
function addInMeetingRow() {
    var index = gatheringInMeetingArray.length;
    gatheringInMeetingArray[index] = new jsInMeetingGathering('', '', '', '', '', '', '', '');
    refreshInMeetingData();
    copyInMeetingDataFromPreRow(gatheringInMeetingArray.length);
}
//添加一行的时候，复制上一行的数据
function copyInMeetingDataFromPreRow(index) {
    if (index == 1)
        return;

    var sel_SrcObj = document.getElementById('InMeetingTextBoxDate_' + (index - 2));
    var sel_TarObj = document.getElementById('InMeetingTextBoxDate_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setInMeetingDate(index - 1);

    sel_SrcObj = document.getElementById('InMeetingTextBoxToDate_' + (index - 2));
    sel_TarObj = document.getElementById('InMeetingTextBoxToDate_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setInMeetingToDate(index - 1);

    sel_SrcObj = document.getElementById('InMeetingTextBoxPlace_' + (index - 2));
    sel_TarObj = document.getElementById('InMeetingTextBoxPlace_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setInMeetingPlace(index - 1);

    sel_SrcObj = document.getElementById('InMeetingTextBoxPerson_' + (index - 2));
    sel_TarObj = document.getElementById('InMeetingTextBoxPerson_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setInMeetingPerson(index - 1);

    sel_SrcObj = document.getElementById('InMeetingTextBoxTopic_' + (index - 2));
    sel_TarObj = document.getElementById('InMeetingTextBoxTopic_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setInMeetingTopic(index - 1);


    sel_SrcObj = document.getElementById('InMeetingTextBoxDescription_' + (index - 2));
    sel_TarObj = document.getElementById('InMeetingTextBoxDescription_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setInMeetingDescription(index - 1);

    sel_SrcObj = document.getElementById('InMeetingTextBoxAmount_' + (index - 2));
    sel_TarObj = document.getElementById('InMeetingTextBoxAmount_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setInMeetingAmount(index - 1);

}
//存储项目费用信息
function jsInMeetingGathering(jdate, jTodate, jPlace, jPerson, jTopic, jdescription, jAmount, jtaxNo) {
    this.gt_InMeeting_Entertain_Date = jdate;
    this.gt_InMeeting_Entertain_ToDate = jTodate;
    this.gt_InMeeting_Place = jPlace;
    this.gt_InMeeting_Person = jPerson;
    this.gt_InMeeting_Topic = jTopic;
    this.gt_InMeeting_Description = jdescription;
    this.gt_InMeeting_Amount = jAmount;
    this.gt_InMeeting_TaxNo = jtaxNo;
}
//根据数组（gatheringInMeetingArray）显示界面
function refreshInMeetingData() {
    //删除原来的行
    var rowCount = InMeetingTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        InMeetingTable.deleteRow(1);
    }
    var MaxCells = InMeetingTable.rows[0].cells.length;

    for (var i = 0; i < gatheringInMeetingArray.length; i++) {
        var newRow = InMeetingTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = i + 1;
                    cell.align = "center";
                    break;
                case 1: //日期
                    var dateID = "InMeetingTextBoxDate_" + i;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:90'  id=\"InMeetingTextBoxDate_" + i + "\" value=\"" + gatheringInMeetingArray[i].gt_InMeeting_Entertain_Date + "\" onblur='javascript:CheckDateFormat(this);setInMeetingDate(" + i + ");' onfocus='javascript:setInMeetingDate(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=InMeetingTextBoxDate_" + i + "','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input class='Wdate' autocomplete='off' style='width:90' id='" + dateID + "' value='" + gatheringInMeetingArray[i].gt_InMeeting_Entertain_Date + "' " +
                        " onblur=\"javascript:setInMeetingDate(" + i + ");\" onfocus=\"javascript:setInMeetingDate(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">";

                    break;
                case 2: //日期
                    var dateID = "InMeetingTextBoxToDate_" + i;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:90'  id=\"InMeetingTextBoxToDate_" + i + "\" value=\"" + gatheringInMeetingArray[i].gt_InMeeting_Entertain_ToDate + "\" onblur='javascript:CheckDateFormat(this);setInMeetingToDate(" + i + ");' onfocus='javascript:setInMeetingToDate(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=InMeetingTextBoxToDate_" + i + "','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input   autocomplete='off' class='Wdate' style='width:90' id='" + dateID + "' value='" + gatheringInMeetingArray[i].gt_InMeeting_Entertain_ToDate + "' " +
                        " onblur=\"javascript:setInMeetingDate(" + i + ");\" onfocus=\"javascript:setInMeetingToDate(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">";


                    break;
                case 3: //地点
                    cell.noWrap = true;
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=150 onblur='javascript:setInMeetingTopic(" + i + ");' value=\"" + gatheringInMeetingArray[i].gt_InMeeting_Topic + "\" id='InMeetingTextBoxTopic_" + i + "' style=\"width:100%;height:40px\" ></TEXTAREA>";
                    var obj = "InMeetingTextBoxTopic_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringInMeetingArray[i].gt_InMeeting_Topic;
                    }

                    break;

                case 4: //参会人员
                    cell.noWrap = true;
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=150 onblur='javascript:setInMeetingPlace(" + i + ");'  id='InMeetingTextBoxPlace_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "InMeetingTextBoxPlace_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringInMeetingArray[i].gt_InMeeting_Place;
                    }
                    break;

                case 5: //会议议题
                    cell.noWrap = true;
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=150 onblur='javascript:setInMeetingPerson(" + i + ");'  id='InMeetingTextBoxPerson_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "InMeetingTextBoxPerson_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringInMeetingArray[i].gt_InMeeting_Person;
                    }
                    break;
                case 6: //会议费用说明
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=150 onblur='javascript:setInMeetingDescription(" + i + ");'  id='InMeetingTextBoxDescription_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "InMeetingTextBoxDescription_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringInMeetingArray[i].gt_InMeeting_Description;
                    }
                    break;
                case 7: //金额
                    cell.innerHTML = "<input maxlength='10' onchange='javascript:setInMeetingAmount(" + i + ");' type='text' id='InMeetingTextBoxAmount_" + i + "' value='" + gatheringInMeetingArray[i].gt_InMeeting_Amount + "' style=\"width:100%;height:40px\" onKeypress='javascript:OnlyNumber();calInMeetingSum();'>";
                    break;
                case 8: //发票号
                    cell.innerHTML = "<input maxlength='15' onchange='javascript:setInMeetingTaxNo(" + i + ");'  type='text' id='InMeetingTextBoxTaxNo_" + i + "' value='" + gatheringInMeetingArray[i].gt_InMeeting_TaxNo + "' style=\"width:100%;height:40px\">";
                    break;
                case 9: //del
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteInMeetingRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
    calInMeetingSum();
}

function setInMeetingDate(index) {
    var obj = document.getElementById("InMeetingTextBoxDate_" + index);
    gatheringInMeetingArray[index].gt_InMeeting_Entertain_Date = obj.value;
}
function setInMeetingToDate(index) {
    var obj = document.getElementById("InMeetingTextBoxToDate_" + index);
    gatheringInMeetingArray[index].gt_InMeeting_Entertain_ToDate = obj.value;
}
function setInMeetingPlace(index) {
    var obj = document.getElementById("InMeetingTextBoxPlace_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的内部会议费用-地点-中包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 125) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的内部会议费用-参会人员-至多只能录入125个字符。");
        gatheringInMeetingArray[index].gt_InMeeting_Place = obj.value;
        return;
    }

    gatheringInMeetingArray[index].gt_InMeeting_Place = obj.value;
}
function setInMeetingPerson(index) {
    var obj = document.getElementById("InMeetingTextBoxPerson_" + index);
    var no = index + 1;
    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的内部会议费用-参会人员-中包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 125) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的内部会议费用-参会人员-至多只能录入125个字符。");
        gatheringInMeetingArray[index].gt_InMeeting_Person = obj.value;
        return;
    }

    gatheringInMeetingArray[index].gt_InMeeting_Person = obj.value;
}
function setInMeetingTopic(index) {
    var obj = document.getElementById("InMeetingTextBoxTopic_" + index);
    var no = index + 1;

    if (obj.value == "") {
        return;
    }

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的内部会议费用-会议议题-中包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 125) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的内部会议费用-会议议题-至多只能录入125个字符。");
        gatheringInMeetingArray[index].gt_InMeeting_Topic = obj.value;
        return;
    }

    gatheringInMeetingArray[index].gt_InMeeting_Topic = obj.value;

}
function setInMeetingTaxNo(index) {
    var obj = document.getElementById("InMeetingTextBoxTaxNo_" + index);
    var no = index + 1;
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;
    gatheringInMeetingArray[index].gt_InMeeting_TaxNo = '';
    if (!obj.value || obj.value == '') {
        alert('第' + no + '行的发票号不能为空');
        return;
    }
    gatheringInMeetingArray[index].gt_InMeeting_TaxNo = obj.value;
}
function setInMeetingAmount(index) {
    var obj = document.getElementById("InMeetingTextBoxAmount_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        obj.value = gatheringInMeetingArray[index].gt_InMeeting_Amount;
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的内部会议费用-金额-格式不合法');
        obj.value = gatheringInMeetingArray[index].gt_InMeeting_Amount;
        return;
    }

    if (obj.value <= 0) {
        alert('第' + no + '行的内部会议费用-金额-格式不合法');
        obj.value = gatheringInMeetingArray[index].gt_InMeeting_Amount;
        return;
    }
    obj.value = Math.round(obj.value * 100) / 100;
    gatheringInMeetingArray[index].gt_InMeeting_Amount = obj.value;

    calInMeetingSum();
}
function setInMeetingDescription(index) {
    var obj = document.getElementById("InMeetingTextBoxDescription_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的内部会议费用-会议费用说明-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 125) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的内部会议费用-会议费用说明-至多只能录入125个字符。");
        gatheringInMeetingArray[index].gt_InMeeting_Description = obj.value;
        return;
    }

    gatheringInMeetingArray[index].gt_InMeeting_Description = obj.value;
}
//删除选定行
function deleteInMeetingRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringInMeetingArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringInMeetingArray[i];
            j++;
        }
    }

    gatheringInMeetingArray = tempArray;
    refreshInMeetingData();
}
//计算付款合计
function calInMeetingSum() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringInMeetingArray.length; i++) {
        var amount = gatheringInMeetingArray[i].gt_InMeeting_Amount;

        amount = amount.replace(/\,/g, "");
        sumAmount += parseFloat(amount);
    }
    document.all.LabelSumInMeetingAmount.innerText = formatCurrency(sumAmount);
}

function InMeetingItemSubmit() {
    var InMeetingDateList = '';
    var InMeetingToDateList = '';
    var InMeetingPlaceList = '';
    var InMeetingPersonList = '';
    var InMeetingTopicList = '';
    var InMeetingDescriptionList = '';
    var InMeetingAmountList = '';
    var InMeetingTaxNoList = '';
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;
    for (var i = 0; i < gatheringInMeetingArray.length; i++) {
        var index = i + 1;

        if (gatheringInMeetingArray[i].gt_InMeeting_Entertain_Date == '') {
            alert("内部会议费用明细第“" + index + "”行的开始日期不能为空");
            document.all["InMeetingTextBoxDate_" + i].focus();
            return false;
        }

        if (gatheringInMeetingArray[i].gt_InMeeting_Entertain_ToDate == '') {
            alert("内部会议费用明细第“" + index + "”行的结束日期不能为空");
            document.all["InMeetingTextBoxToDate_" + i].focus();
            return false;
        }
        if (gatheringInMeetingArray[i].gt_InMeeting_Topic == '') {
            alert("内部会议费用明细第“" + index + "”行的会议议题不能为空");
            document.all["InMeetingTextBoxTopic_" + i].focus();
            return false;
        }
        else {
            if (gatheringInMeetingArray[i].gt_InMeeting_Topic.indexOf("~") != -1) {
                alert("内部会议费用明细第“" + index + "”行的会议议题包含“~”非法字符，请重新输入。");
                document.all["InMeetingTextBoxTopic_" + i].focus();
                return false;
            }
        }

        if (gatheringInMeetingArray[i].gt_InMeeting_Place == '') {
            alert("内部会议费用明细第“" + index + "”行的会议地点不能为空");
            document.all["InMeetingTextBoxPlace_" + i].focus();
            return false;
        }
        else {
            if (gatheringInMeetingArray[i].gt_InMeeting_Place.indexOf("~") != -1) {
                alert('内部会议费用明细第“"+index+"”行的会议地点包含“~”非法字符，请重新输入。');
                document.all["InMeetingTextBoxPlace_" + i].focus();
                return false;
            }
        }

        if (gatheringInMeetingArray[i].gt_InMeeting_Person == '') {
            alert("内部会议费用明细第“" + index + "”行的参会人员信息不能为空");
            document.all["InMeetingTextBoxPerson_" + i].focus();
            return false;
        }
        else {
            if (gatheringInMeetingArray[i].gt_InMeeting_Person.indexOf("~") != -1) {
                alert("内部会议费用明细第“" + index + "”行的参会人员信息包含“~”非法字符，请重新输入。");
                document.all["InMeetingTextBoxPerson_" + i].focus();
                return false;
            }
        }

        if (gatheringInMeetingArray[i].gt_InMeeting_Description.length <= 0) {
            alert("内部会议费用明细第“" + index + "”行的会议费用说明不能为空");
            document.all["InMeetingTextBoxDescription_" + i].focus();
            return false;
        }

        if (gatheringInMeetingArray[i].gt_InMeeting_Description.length > 150) {
            alert("内部会议费用明细第“" + index + "”行的会议费用说明不能大于150个字符");
            document.all["InMeetingTextBoxDescription_" + i].focus();
            return false;
        }

        if (gatheringInMeetingArray[i].gt_InMeeting_Description.indexOf("~") != -1) {
            alert('内部会议费用明细第“' + index + '”行的会议费用说明字符“~”为非法字符，请重新输入。');
            document.all["InMeetingTextBoxDescription_" + i].focus();
            return false;
        }

        if (gatheringInMeetingArray[i].gt_InMeeting_Amount == '') {
            alert("内部会议费用明细第“" + index + "”行的金额不能为空");
            document.all["InMeetingTextBoxAmount_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringInMeetingArray[i].gt_InMeeting_Amount)) {
                alert("内部会议费用明细第“" + index + "”行的金额不正确");
                document.all["InMeetingTextBoxAmount_" + i].focus();
                return false;
            }
            else {
                if (gatheringInMeetingArray[i].gt_InMeeting_Amount <= 0) {
                    alert("内部会议费用明细第“" + index + "”行的金额不能小于等于零");
                    document.all["InMeetingTextBoxAmount_" + i].focus();
                    return false;
                }
            }
            if (gatheringInMeetingArray[i].gt_InMeeting_TaxNo == '') {
                alert("内部会议费用明细第“" + index + "”行的发票号不能为空");
                document.all["InMeetingTextBoxTaxNo_" + i].focus();
                return false;
            }

        }

        InMeetingDateList += '~' + gatheringInMeetingArray[i].gt_InMeeting_Entertain_Date;

        InMeetingToDateList += '~' + gatheringInMeetingArray[i].gt_InMeeting_Entertain_ToDate;

        InMeetingPlaceList += '~' + gatheringInMeetingArray[i].gt_InMeeting_Place;

        InMeetingPersonList += '~' + gatheringInMeetingArray[i].gt_InMeeting_Person;

        InMeetingTopicList += '~' + gatheringInMeetingArray[i].gt_InMeeting_Topic;

        InMeetingAmountList += '~' + gatheringInMeetingArray[i].gt_InMeeting_Amount;

        InMeetingDescriptionList += '~' + gatheringInMeetingArray[i].gt_InMeeting_Description;
        InMeetingTaxNoList += '~' + gatheringInMeetingArray[i].gt_InMeeting_TaxNo;
    }

    InMeetingDateList = InMeetingDateList.substr(1);
    InMeetingToDateList = InMeetingToDateList.substr(1);
    InMeetingPlaceList = InMeetingPlaceList.substr(1);
    InMeetingPersonList = InMeetingPersonList.substr(1);
    InMeetingTopicList = InMeetingTopicList.substr(1);
    InMeetingAmountList = InMeetingAmountList.substr(1);
    InMeetingDescriptionList = InMeetingDescriptionList.substr(1);
    InMeetingTaxNoList = InMeetingTaxNoList.substr(1);
    document.all.hiddenInMeetingDate.value = InMeetingDateList;
    document.all.hiddenInMeetingToDate.value = InMeetingToDateList;
    document.all.hiddenInMeetingPlace.value = InMeetingPlaceList;
    document.all.hiddenInMeetingPerson.value = InMeetingPersonList;
    document.all.hiddenInMeetingTopic.value = InMeetingTopicList;
    document.all.hiddenInMeetingAmountDes.value = InMeetingDescriptionList;
    document.all.hiddenInMeetingAmount.value = InMeetingAmountList;
    document.all.hiddenInMeetingTaxNo.value = InMeetingTaxNoList;
}

/////////////////////////////////////////外部会议费////////////////////////////////////////////

var gatheringOutMeetingArray = new Array();
//添加空白一行
function addOutMeetingRow() {
    var index = gatheringOutMeetingArray.length;
    gatheringOutMeetingArray[index] = new jsOutMeetingGathering('', '', '', '', '', '', '', '', '');
    refreshOutMeetingData();
    copyOutMeetingDataFromPreRow(gatheringOutMeetingArray.length);
}
//添加一行的时候，复制上一行的数据
function copyOutMeetingDataFromPreRow(index) {
    if (index == 1)
        return;

    var sel_SrcObj = document.getElementById('OutMeetingTextBoxDate_' + (index - 2));
    var sel_TarObj = document.getElementById('OutMeetingTextBoxDate_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setOutMeetingDate(index - 1);

    sel_SrcObj = document.getElementById('OutMeetingTextBoxToDate_' + (index - 2));
    sel_TarObj = document.getElementById('OutMeetingTextBoxToDate_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setOutMeetingToDate(index - 1);

    sel_SrcObj = document.getElementById('OutMeetingTextBoxPlace_' + (index - 2));
    sel_TarObj = document.getElementById('OutMeetingTextBoxPlace_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setOutMeetingPlace(index - 1);

    sel_SrcObj = document.getElementById('OutMeetingTextBoxPersonIn_' + (index - 2));
    sel_TarObj = document.getElementById('OutMeetingTextBoxPersonIn_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setOutMeetingPersonIn(index - 1);

    sel_SrcObj = document.getElementById('OutMeetingTextBoxPersonOut_' + (index - 2));
    sel_TarObj = document.getElementById('OutMeetingTextBoxPersonOut_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setOutMeetingPersonOut(index - 1);

    sel_SrcObj = document.getElementById('OutMeetingTextBoxTopic_' + (index - 2));
    sel_TarObj = document.getElementById('OutMeetingTextBoxTopic_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setOutMeetingTopic(index - 1);


    sel_SrcObj = document.getElementById('OutMeetingTextBoxDescription_' + (index - 2));
    sel_TarObj = document.getElementById('OutMeetingTextBoxDescription_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setOutMeetingDescription(index - 1);

    sel_SrcObj = document.getElementById('OutMeetingTextBoxAmount_' + (index - 2));
    sel_TarObj = document.getElementById('OutMeetingTextBoxAmount_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setOutMeetingAmount(index - 1);

}
//存储项目费用信息
function jsOutMeetingGathering(jdate, jTodate, jPlace, jPersonIn, jPersonOut, jTopic, jdescription, jAmount, jtaxNo) {
    this.gt_OutMeeting_Entertain_Date = jdate;
    this.gt_OutMeeting_Entertain_ToDate = jTodate;
    this.gt_OutMeeting_Place = jPlace;
    this.gt_OutMeeting_PersonIn = jPersonIn;
    this.gt_OutMeeting_PersonOut = jPersonOut;
    this.gt_OutMeeting_Topic = jTopic;
    this.gt_OutMeeting_Description = jdescription;
    this.gt_OutMeeting_Amount = jAmount;
    this.gt_OutMeeting_TaxNo = jtaxNo;
}
//根据数组（gatheringOutMeetingArray）显示界面
function refreshOutMeetingData() {
    //删除原来的行
    var rowCount = OutMeetingTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        OutMeetingTable.deleteRow(1);
    }
    var MaxCells = OutMeetingTable.rows[0].cells.length;

    for (var i = 0; i < gatheringOutMeetingArray.length; i++) {
        var newRow = OutMeetingTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = i + 1;
                    cell.align = "center";
                    break;
                case 1: //日期
                    var dateID = "OutMeetingTextBoxDate_" + i;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:90'  id=\"OutMeetingTextBoxDate_" + i + "\" value=\"" + gatheringOutMeetingArray[i].gt_OutMeeting_Entertain_Date + "\" onblur='javascript:CheckDateFormat(this);setOutMeetingDate(" + i + ");' onfocus='javascript:setOutMeetingDate(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=OutMeetingTextBoxDate_" + i + "','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input class='Wdate' autocomplete='off'  style='width:90' id='" + dateID + "' value='" + gatheringOutMeetingArray[i].gt_OutMeeting_Entertain_Date + "' " +
                        " onblur=\"javascript:setOutMeetingDate(" + i + ");\" onfocus=\"javascript:setOutMeetingDate(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">";
                    break;
                case 2: //日期
                    var dateID = "OutMeetingTextBoxToDate_" + i;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:90'  id=\"OutMeetingTextBoxToDate_" + i + "\" value=\"" + gatheringOutMeetingArray[i].gt_OutMeeting_Entertain_ToDate + "\" onblur='javascript:CheckDateFormat(this);setOutMeetingToDate(" + i + ");' onfocus='javascript:setOutMeetingToDate(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=OutMeetingTextBoxToDate_" + i + "','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input   autocomplete='off' class='Wdate' style='width:90' id='" + dateID + "' value='" + gatheringOutMeetingArray[i].gt_OutMeeting_Entertain_ToDate + "' " +
                        " onblur=\"javascript:setOutMeetingToDate(" + i + ");\" onfocus=\"javascript:setOutMeetingToDate(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">"

                    break;
                case 3: //会议议题
                    cell.noWrap = true;
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=150 onblur='javascript:setOutMeetingTopic(" + i + ");' value=\"" + gatheringOutMeetingArray[i].gt_OutMeeting_Topic + "\" id='OutMeetingTextBoxTopic_" + i + "' style=\"width:100%;\" ></TEXTAREA>";
                    var obj = "OutMeetingTextBoxTopic_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringOutMeetingArray[i].gt_OutMeeting_Topic;
                    }

                    break;

                case 4: //内部参会人员
                    cell.noWrap = true;
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=150 onblur='javascript:setOutMeetingPlace(" + i + ");'  id='OutMeetingTextBoxPlace_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "OutMeetingTextBoxPlace_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringOutMeetingArray[i].gt_OutMeeting_Place;
                    }
                    break;

                case 5: //外部参会人员
                    cell.noWrap = true;
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=150 onblur='javascript:setOutMeetingPersonIn(" + i + ");'  id='OutMeetingTextBoxPersonIn_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "OutMeetingTextBoxPersonIn_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringOutMeetingArray[i].gt_OutMeeting_PersonIn;
                    }
                    break;

                case 6: //
                    cell.noWrap = true;
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=150 onblur='javascript:setOutMeetingPersonOut(" + i + ");'  id='OutMeetingTextBoxPersonOut_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "OutMeetingTextBoxPersonOut_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringOutMeetingArray[i].gt_OutMeeting_PersonOut;
                    }
                    break;
                case 7: //会议费用说明
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=150 onblur='javascript:setOutMeetingDescription(" + i + ");'  id='OutMeetingTextBoxDescription_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "OutMeetingTextBoxDescription_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringOutMeetingArray[i].gt_OutMeeting_Description;
                    }
                    break;
                case 8: //金额
                    cell.innerHTML = "<input maxlength='10' onchange='javascript:setOutMeetingAmount(" + i + ");' type='text' id='OutMeetingTextBoxAmount_" + i + "' value='" + gatheringOutMeetingArray[i].gt_OutMeeting_Amount + "' style=\"width:100%;\" onKeypress='javascript:OnlyNumber();calOutMeetingSum();'>";
                    break;
                case 9: //发票号
                    cell.innerHTML = "<input maxlength='15' onchange='javascript:setOutMeetingTaxNo(" + i + ");'  type='text' id='OutMeetingTextBoxTaxNo_" + i + "' value='" + gatheringOutMeetingArray[i].gt_OutMeeting_TaxNo + "' style=\"width:100%;\">";
                    break;
                case 10: //del
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteOutMeetingRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
    calOutMeetingSum();
}

function setOutMeetingDate(index) {
    var obj = document.getElementById("OutMeetingTextBoxDate_" + index);
    gatheringOutMeetingArray[index].gt_OutMeeting_Entertain_Date = obj.value;
}
function setOutMeetingToDate(index) {
    var obj = document.getElementById("OutMeetingTextBoxToDate_" + index);
    gatheringOutMeetingArray[index].gt_OutMeeting_Entertain_ToDate = obj.value;
}
function setOutMeetingTaxNo(index) {
    var obj = document.getElementById("OutMeetingTextBoxTaxNo_" + index);
    var no = index + 1;
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;
    gatheringOutMeetingArray[index].gt_OutMeeting_TaxNo = '';
    if (!obj.value || obj.value == '') {
        alert('第' + no + '行的发票号不能为空');
        obj.focus();
        return;
    }
    gatheringOutMeetingArray[index].gt_OutMeeting_TaxNo = obj.value;
}
function setOutMeetingPlace(index) {
    var obj = document.getElementById("OutMeetingTextBoxPlace_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的外部会议费用-地点-中包含非法字符“~”，请重新输入。");
        return;
    }
    if (obj.value.length > 125) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的外部会议费用-地点-至多只能录入125个字符。");
        gatheringOutMeetingArray[index].gt_OutMeeting_Place = obj.value;
        return;
    }

    gatheringOutMeetingArray[index].gt_OutMeeting_Place = obj.value;
}
function setOutMeetingPersonIn(index) {
    var obj = document.getElementById("OutMeetingTextBoxPersonIn_" + index);
    var no = index + 1;
    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的外部会议费用-参会公司内部人员-中包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 125) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的外部会议费用-参会公司内部人员-至多只能录入125个字符。");
        gatheringOutMeetingArray[index].gt_OutMeeting_PersonIn = obj.value;
        return;
    }

    gatheringOutMeetingArray[index].gt_OutMeeting_PersonIn = obj.value;
}
function setOutMeetingPersonOut(index) {
    var obj = document.getElementById("OutMeetingTextBoxPersonOut_" + index);
    var no = index + 1;
    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的外部会议费用-参会公司外部人员-中包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 125) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的外部会议费用-参会公司外部人员-至多只能录入125个字符。");
        gatheringOutMeetingArray[index].gt_OutMeeting_PersonOut = obj.value;
        return;
    }

    gatheringOutMeetingArray[index].gt_OutMeeting_PersonOut = obj.value;
}
function setOutMeetingTopic(index) {
    var obj = document.getElementById("OutMeetingTextBoxTopic_" + index);
    var no = index + 1;

    if (obj.value == "") {
        return;
    }

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的外部会议费用-会议议题-中包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 125) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的外部会议费用-会议议题-至多只能录入125个字符。");
        gatheringOutMeetingArray[index].gt_OutMeeting_Topic = obj.value;
        return;
    }

    gatheringOutMeetingArray[index].gt_OutMeeting_Topic = obj.value;

}
function setOutMeetingAmount(index) {
    var obj = document.getElementById("OutMeetingTextBoxAmount_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        alert('第' + no + '行的外部会议费用-金额不能为空');
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的外部会议费用-金额-格式不合法');
        obj.value = gatheringOutMeetingArray[index].gt_OutMeeting_Amount;
        return;
    }

    if (obj.value <= 0) {
        alert('第' + no + '行的外部会议费用-金额-格式不合法');
        obj.value = gatheringOutMeetingArray[index].gt_OutMeeting_Amount;
        return;
    }
    obj.value = Math.round(obj.value * 100) / 100;

    gatheringOutMeetingArray[index].gt_OutMeeting_Amount = obj.value;

    calOutMeetingSum();
}
function setOutMeetingDescription(index) {
    var obj = document.getElementById("OutMeetingTextBoxDescription_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的外部会议费用-会议费用说明-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 125) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的外部会议费用-会议费用说明-至多只能录入125个字符。");
        gatheringOutMeetingArray[index].gt_OutMeeting_Description = obj.value;
        return;
    }

    gatheringOutMeetingArray[index].gt_OutMeeting_Description = obj.value;
}

//删除选定行
function deleteOutMeetingRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringOutMeetingArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringOutMeetingArray[i];
            j++;
        }
    }

    gatheringOutMeetingArray = tempArray;
    refreshOutMeetingData();
}
//计算付款合计
function calOutMeetingSum() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringOutMeetingArray.length; i++) {
        var amount = gatheringOutMeetingArray[i].gt_OutMeeting_Amount;

        amount = amount.replace(/\,/g, "");
        sumAmount += parseFloat(amount);
    }
    document.all.LabelSumOutMeetingAmount.innerText = formatCurrency(sumAmount);
}

function OutMeetingItemSubmit() {
    var OutMeetingDateList = '';
    var OutMeetingToDateList = '';
    var OutMeetingPlaceList = '';
    var OutMeetingPersonInList = '';
    var OutMeetingPersonOutList = '';
    var OutMeetingTopicList = '';
    var OutMeetingDescriptionList = '';
    var OutMeetingAmountList = '';
    var OutMeetingTaxNoList = '';
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;
    for (var i = 0; i < gatheringOutMeetingArray.length; i++) {
        var index = i + 1;

        if (gatheringOutMeetingArray[i].gt_OutMeeting_Entertain_Date == '') {
            alert("外部会议费用明细第“" + index + "”行的开始日期不能为空");
            document.all["OutMeetingTextBoxDate_" + i].focus();
            return false;
        }

        if (gatheringOutMeetingArray[i].gt_OutMeeting_Entertain_ToDate == '') {
            alert("外部会议费用明细第“" + index + "”行的结束日期不能为空");
            document.all["OutMeetingTextBoxToDate_" + i].focus();
            return false;
        }
        if (gatheringOutMeetingArray[i].gt_OutMeeting_Topic == '') {
            alert("外部会议费用明细第“" + index + "”行的会议议题不能为空");
            document.all["OutMeetingTextBoxTopic_" + i].focus();
            return false;
        }
        else {
            if (gatheringOutMeetingArray[i].gt_OutMeeting_Topic.indexOf("~") != -1) {
                alert("外部会议费用明细第“" + index + "”行的会议议题包含“~”非法字符，请重新输入。");
                document.all["OutMeetingTextBoxPersonOut_" + i].focus();
                return false;
            }
        }
        if (gatheringOutMeetingArray[i].gt_OutMeeting_Place == '') {
            alert("外部会议费用明细第“" + index + "”行的会议地点不能为空");
            document.all["OutMeetingTextBoxPlace_" + i].focus();
            return false;
        }
        else {
            if (gatheringOutMeetingArray[i].gt_OutMeeting_Place.indexOf("~") != -1) {
                alert('外部会议费用明细第“"+index+"”行的会议地点包含“~”非法字符，请重新输入。');
                document.all["OutMeetingTextBoxPlace_" + i].focus();
                return false;
            }
        }

        if (gatheringOutMeetingArray[i].gt_OutMeeting_PersonIn == '') {
            alert("外部会议费用明细第“" + index + "”行的参会公司内部人员信息不能为空");
            document.all["OutMeetingTextBoxPersonIn_" + i].focus();
            return false;
        }
        else {
            if (gatheringOutMeetingArray[i].gt_OutMeeting_PersonIn.indexOf("~") != -1) {
                alert("外部会议费用明细第“" + index + "”行的参会公司内部人员包含“~”非法字符，请重新输入。");
                document.all["OutMeetingTextBoxPersonIn_" + i].focus();
                return false;
            }
        }

        if (gatheringOutMeetingArray[i].gt_OutMeeting_PersonOut == '') {
            alert("外部会议费用明细第“" + index + "”行的参会公司外部人员不能为空");
            document.all["OutMeetingTextBoxPersonOut_" + i].focus();
            return false;
        }
        else {
            if (gatheringOutMeetingArray[i].gt_OutMeeting_PersonOut.indexOf("~") != -1) {
                alert("外部会议费用明细第“" + index + "”行的参会公司外部人员包含“~”非法字符，请重新输入。");
                document.all["OutMeetingTextBoxPersonOut_" + i].focus();
                return false;
            }
        }

        if (gatheringOutMeetingArray[i].gt_OutMeeting_Description.length <= 0) {
            alert("外部会议费用明细第“" + index + "”行的会议费用说明不能为空");
            document.all["OutMeetingTextBoxDescription_" + i].focus();
            return false;
        }

        if (gatheringOutMeetingArray[i].gt_OutMeeting_Description.length > 125) {
            alert("外部会议费用明细第“" + index + "”行的会议费用说明不能大于125个字符");
            document.all["OutMeetingTextBoxDescription_" + i].focus();
            return false;
        }

        if (gatheringOutMeetingArray[i].gt_OutMeeting_Description.indexOf("~") != -1) {
            alert('外部会议费用明细第“' + index + '”行的会议费用说明字符“~”为非法字符，请重新输入。');
            document.all["OutMeetingTextBoxDescription_" + i].focus();
            return false;
        }

        if (gatheringOutMeetingArray[i].gt_OutMeeting_Amount == '') {
            alert("外部会议费用明细第“" + index + "”行的金额不能为空");
            document.all["OutMeetingTextBoxAmount_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringOutMeetingArray[i].gt_OutMeeting_Amount)) {
                alert("外部会议费用明细第“" + index + "”行的金额不正确");
                document.all["OutMeetingTextBoxAmount_" + i].focus();
                return false;
            }
            else {
                if (gatheringOutMeetingArray[i].gt_OutMeeting_Amount <= 0) {
                    alert("外部会议费用明细第“" + index + "”行的金额不能小于等于零");
                    document.all["OutMeetingTextBoxAmount_" + i].focus();
                    return false;
                }
            }
            if (gatheringOutMeetingArray[i].gt_OutMeeting_TaxNo == '') {
                alert("外部会议费用明细第“" + index + "”行的发票号不能为空");
                document.all["OutMeetingTextBoxTaxNo_" + i].focus();
                return false;
            }
        }


        OutMeetingDateList += '~' + gatheringOutMeetingArray[i].gt_OutMeeting_Entertain_Date;

        OutMeetingToDateList += '~' + gatheringOutMeetingArray[i].gt_OutMeeting_Entertain_ToDate;

        OutMeetingPlaceList += '~' + gatheringOutMeetingArray[i].gt_OutMeeting_Place;

        OutMeetingPersonInList += '~' + gatheringOutMeetingArray[i].gt_OutMeeting_PersonIn;

        OutMeetingPersonOutList += '~' + gatheringOutMeetingArray[i].gt_OutMeeting_PersonOut;

        OutMeetingTopicList += '~' + gatheringOutMeetingArray[i].gt_OutMeeting_Topic;

        OutMeetingAmountList += '~' + gatheringOutMeetingArray[i].gt_OutMeeting_Amount;

        OutMeetingDescriptionList += '~' + gatheringOutMeetingArray[i].gt_OutMeeting_Description;
        OutMeetingTaxNoList += '~' + gatheringOutMeetingArray[i].gt_OutMeeting_TaxNo;
    }

    OutMeetingDateList = OutMeetingDateList.substr(1);
    OutMeetingToDateList = OutMeetingToDateList.substr(1);
    OutMeetingPlaceList = OutMeetingPlaceList.substr(1);
    OutMeetingPersonInList = OutMeetingPersonInList.substr(1);
    OutMeetingPersonOutList = OutMeetingPersonOutList.substr(1);
    OutMeetingTopicList = OutMeetingTopicList.substr(1);
    OutMeetingAmountList = OutMeetingAmountList.substr(1);
    OutMeetingDescriptionList = OutMeetingDescriptionList.substr(1);
    OutMeetingTaxNoList = OutMeetingTaxNoList.substr(1);
    document.all.hiddenOutMeetingTaxNo.value = OutMeetingTaxNoList;
    document.all.hiddenOutMeetingDate.value = OutMeetingDateList;
    document.all.hiddenOutMeetingToDate.value = OutMeetingToDateList;
    document.all.hiddenOutMeetingPlace.value = OutMeetingPlaceList;
    document.all.hiddenOutMeetingPersonIn.value = OutMeetingPersonInList;
    document.all.hiddenOutMeetingPersonOut.value = OutMeetingPersonOutList;
    document.all.hiddenOutMeetingTopic.value = OutMeetingTopicList;
    document.all.hiddenOutMeetingAmountDes.value = OutMeetingDescriptionList;
    document.all.hiddenOutMeetingAmount.value = OutMeetingAmountList;
}


//////////////////////////////////////////////办公费-工作餐费/////////////////////////////////////////

var gatheringWorkMealArray = new Array();
//添加空白一行 20101221 chaidanlei 加班餐费合并工作餐报销，加班餐费用明细格式调整，增加费用明细数据
function addWorkMealRow() {
    var index = gatheringWorkMealArray.length;
    gatheringWorkMealArray[index] = new jsWorkMealGathering('', '', '', '0', '', '', '', '', '', '0');
    refreshWorkMealData();
    copyWorkMealDataFromPreRow(gatheringWorkMealArray.length);
}

//添加一行的时候，复制上一行的数据
function copyWorkMealDataFromPreRow(index) {
    if (index == 1)
        return;
    var objIsCopy = document.getElementById('CheckBoxIsCopy_' + (index - 2));
    if (objIsCopy.checked == false)
        return;

    //金额
    var sel_SrcObj = document.getElementById('WorkMealTextBoxAmount_' + (index - 2));
    var sel_TarObj = document.getElementById('WorkMealTextBoxAmount_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkMealAmount(index - 1);
    //用餐人数
    sel_SrcObj = document.getElementById('WorkMealTextBoxDinnerAccount_' + (index - 2));
    sel_TarObj = document.getElementById('WorkMealTextBoxDinnerAccount_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkMealDinnerAccount(index - 1);
    //用餐次数
    sel_SrcObj = document.getElementById('WorkMealTextBoxDinnerTimes_' + (index - 2));
    sel_TarObj = document.getElementById('WorkMealTextBoxDinnerTimes_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkMealDinnerTimes(index - 1);
    //是否有外部员工参与
    var objLastRadioYes = document.getElementById('radionEmployeeType1_' + (index - 2));
    var objLastRadioNo = document.getElementById('radionEmployeeType0_' + (index - 2));
    var objRadioYes = document.getElementById('radionEmployeeType1_' + (index - 1));
    var objRadioNo = document.getElementById('radionEmployeeType0_' + (index - 1));

    objRadioYes.checked = objLastRadioYes.checked;
    objRadioNo.checked = objLastRadioNo.checked;
    //用餐人员
    var objHiddenLastEmpNo = document.getElementById('WorkMealTextBoxInsiderEmployeeNumber_' + (index - 2));
    var objLastName = document.getElementById('WorkMealTextBoxInsiderLastName_' + (index - 2));
    var objHiddenEmpNo = document.getElementById('WorkMealTextBoxInsiderEmployeeNumber_' + (index - 1));
    var objName = document.getElementById('WorkMealTextBoxInsiderLastName_' + (index - 1));

    objHiddenEmpNo.value = objHiddenLastEmpNo.value;
    objName.value = objLastName.value;

    setWorkMealLastName(index - 1);
    //日期
    sel_SrcObj = document.getElementById('WorkMealTextBoxDate_' + (index - 2));
    sel_TarObj = document.getElementById('WorkMealTextBoxDate_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkMealDate(index - 1);
    //假日			
    sel_SrcObj = document.getElementById('WorkMealCheckBoxIsHoliday_' + (index - 2));
    sel_TarObj = document.getElementById('WorkMealCheckBoxIsHoliday_' + (index - 1));

    sel_TarObj.checked = sel_SrcObj.checked;
    SetIsHoliday(index - 1);
    //备注
    sel_SrcObj = document.getElementById('WorkMealTextBoxDescription_' + (index - 2));
    sel_TarObj = document.getElementById('WorkMealTextBoxDescription_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkMealDescription(index - 1);
    onEmployeeTypeChange(index - 1, 1);
}
//存储项目费用信息
//20101221 chaidanlei 加班餐费合并工作餐报销，加班餐费用明细格式调整，增加费用明细数据
function jsWorkMealGathering(jAmount, jDinnerAccount, jDinnerTimes, jIncludeOtherPerson, jInsiderEmployeeNumber, jLastName, jdate, jIsHoliday, jdescription, jIsCopy) {
    this.gt_WorkMeal_Amount = jAmount; //报销金额
    this.gt_WorkMeal_Dinner_Account = jDinnerAccount; //用餐人数
    this.gt_WorkMeal_Dinner_Times = jDinnerTimes; //用餐次数
    this.gt_WorkMeal_Insider_EmployeeNumber = jInsiderEmployeeNumber; //用餐人员员工编号
    this.gt_WorkMeal_LastName = jLastName; //用餐人员员工姓名
    this.gt_WorkMeal_Is_Include_Other_PersonInfo = jIncludeOtherPerson; //用餐人员是否包括非公司内部人员
    this.gt_WorkMeal_Date = jdate; //日期
    this.gt_WorkMeal_Is_Holiday = jIsHoliday; //是否为假日
    this.gt_WorkMeal_Description = jdescription; //备注
    this.gt_WorkMeal_IsCopy = jIsCopy; //是否复制
}
//根据数组（gatheringWorkMealArray）显示界面
//20101221 chaidanlei 加班餐费合并工作餐报销，加班餐费用明细格式调整，增加费用明细数据
function refreshWorkMealData() {


    //删除原来的行
    var rowCount = WorkMealTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        WorkMealTable.deleteRow(1);
    }
    var MaxCells = WorkMealTable.rows[0].cells.length;
    for (var i = 0; i < gatheringWorkMealArray.length; i++) {//alert(gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Times);
        var newRow = WorkMealTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = i + 1;
                    cell.align = "center";
                    break;
                case 1: //报销金额
                    cell.innerHTML = "<input maxlength='10' autocomplete='off' onchange='javascript:setWorkMealAmount(" + i + ");' type='text' id='WorkMealTextBoxAmount_" + i + "' value='" + gatheringWorkMealArray[i].gt_WorkMeal_Amount + "' style=\"width:100%;height:40px\" onKeypress='javascript:OnlyNumber();calWorkMealSum();'>";
                    break;
                case 2: //用餐人数
                    cell.innerHTML = "<input maxlength='10' autocomplete='off' type='text' id='WorkMealTextBoxDinnerAccount_" + i + "' value='" + gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Account + "' onchange='javascript:setWorkMealDinnerAccount(" + i + ");' onKeypress='javascript:CheckNumeric();calWorkMealDinnerAccountSum();' style=\"width:100%;height:40px\">";
                    var objId = "WorkMealTextBoxDinnerAccount_" + i;
                    var objText = "";
                    if (document.getElementById(objId)) {
                        objText = document.getElementById(objId);
                    }
                    if (Trim(gatheringWorkMealArray[i].gt_WorkMeal_Is_Include_Other_PersonInfo) == '1') {  //包括外部员工参与的工作餐，用餐人数不可录入
                        objText.value = '';
                        gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Account = '';
                        objText.readOnly = true;
                        objText.style.backgroundColor = "#d3d3d3";
                    }
                    else {
                        objText.readOnly = false;
                        objText.style.backgroundColor = "";
                    }
                    break;
                case 3: //用餐次数
                    cell.innerHTML = "<input maxlength='1' autocomplete='off' type='text' id='WorkMealTextBoxDinnerTimes_" + i + "' value='" + gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Times + "' readonly onblur='javascript:setWorkMealDinnerTimes(" + i + ");' onKeypress='javascript:CheckNumeric();calWorkMealDinnerTimesSum();' style=\"width:100%;height:40px\">";
                    var objId = "WorkMealTextBoxDinnerTimes_" + i;
                    var objText = "";
                    if (document.getElementById(objId)) {
                        objText = document.getElementById(objId);
                    }
                    if (Trim(gatheringWorkMealArray[i].gt_WorkMeal_Is_Include_Other_PersonInfo) == '1') {  //包括外部员工参与的工作餐，用餐次数不可录入
                        objText.style.backgroundColor = "#d3d3d3";
                        objText.value = ''; //用餐次数
                        gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Times = '';
                    }
                    else {
                        objText.style.backgroundColor = "";
                        objText.value = '1'; //用餐次数
                        gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Times = '1';
                    }
                    break;
                case 4: //用餐人员员工类型：公司内部员工或者公司外部员工
                    cell.width = 70;
                    if (Trim(gatheringWorkMealArray[i].gt_WorkMeal_Is_Include_Other_PersonInfo) == '' || Trim(gatheringWorkMealArray[i].gt_WorkMeal_Is_Include_Other_PersonInfo) == '0') {
                        cell.innerHTML = "<input type='radio' disabled='true' onclick='onEmployeeTypeChange(" + i + ",0);' name='radionEmployeeType_" + i + "' id='radionEmployeeType1_" + i + "'>是<input type='radio' checked disabled='true' onclick='onEmployeeTypeChange(" + i + ",0);' name='radionEmployeeType_" + i + "' id='radionEmployeeType0_" + i + "'>否";
                    }
                    else {
                        cell.innerHTML = "<input type='radio' disabled='true' onclick='onEmployeeTypeChange(" + i + ",0);' checked name='radionEmployeeType_" + i + "' id='radionEmployeeType1_" + i + "'>是<input type='radio' disabled='true' onclick='onEmployeeTypeChange(" + i + ",0);' name='radionEmployeeType_" + i + "' id='radionEmployeeType0_" + i + "'>否";
                    }
                    break;
                case 5: //用餐人员员工编号、员工姓名
                    cell.width = 140;
                    cell.innerHTML = "<input maxlength='1000' type='hidden' id='WorkMealTextBoxInsiderEmployeeNumber_" + i + "' value='" + gatheringWorkMealArray[i].gt_WorkMeal_Insider_EmployeeNumber + "' style=\"height:40px\"><TEXTAREA  rows='2' MaxLength=1000  id='WorkMealTextBoxInsiderLastName_" + i + "' style=\"width:80%;\" readonly ></TEXTAREA>";
                    var objEmployeeNumberId = "WorkMealTextBoxInsiderEmployeeNumber_" + i;
                    var originalEmployeeNumber = "";
                    if (document.getElementById(objEmployeeNumberId)) {
                        originalEmployeeNumber = document.getElementById(objEmployeeNumberId).value;
                    }
                    var obj = "WorkMealTextBoxInsiderLastName_" + i;
                    cell.innerHTML += "<IMG id='imgQuery_" + i + "' onclick=\"QueryEmployeeInfo('" + objEmployeeNumberId + "','" + obj + "','WorkMealTextBoxDinnerAccount_" + i + "','" + i + "')\" style='CURSOR: hand;' src='../../images/searchicon_enabled.gif' align='absBottom'>";
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringWorkMealArray[i].gt_WorkMeal_LastName;
                    }
                    var objEmployeeNumber = document.getElementById(objEmployeeNumberId);
                    var objLastName = document.getElementById(obj);
                    var objImgId = "imgQuery_" + i;
                    var objImg = document.getElementById(objImgId);
                    //包括外部员工参与的工作餐，用餐人员可填写
                    if (Trim(gatheringWorkMealArray[i].gt_WorkMeal_Is_Include_Other_PersonInfo) == '1') {
                        objEmployeeNumber.value = '';
                        gatheringWorkMealArray[i].gt_WorkMeal_Insider_EmployeeNumber = '';
                        objLastName.readOnly = false;
                        objImg.style.display = "none";
                    }
                    else {
                        objLastName.readOnly = true;
                        objImg.style.display = "inline";
                    }
                    break;
                case 6: //日期
                    var dateID = "WorkMealTextBoxDate_" + i;
                    cell.width = 100;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:75%'  id=\"WorkMealTextBoxDate_" + i + "\" value=\"" + gatheringWorkMealArray[i].gt_WorkMeal_Date + "\" onblur='javascript:CheckDateFormat(this);setWorkMealDate(" + i + ");' onfocus='javascript:setWorkMealDate(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=WorkMealTextBoxDate_" + i + "','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input class='Wdate' autocomplete='off' style='width:85%' id='" + dateID + "' value='" + gatheringWorkMealArray[i].gt_WorkMeal_Date + "' " +
                        " onblur=\"javascript:setWorkMealDate(" + i + ");\" onfocus=\"javascript:setWorkMealDate(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">";
                    break;
                case 7: //是否为假日
                    if (gatheringWorkMealArray[i].gt_WorkMeal_Is_Holiday == "1") {  //是假日
                        cell.innerHTML = "<input type='checkbox' disabled='true' checked id='WorkMealCheckBoxIsHoliday_" + i + "' onchange='SetIsHoliday(" + i + ")'>";
                    }
                    else {
                        cell.innerHTML = "<input type='checkbox'  disabled='true' id='WorkMealCheckBoxIsHoliday_" + i + "' onchange='SetIsHoliday(" + i + ")'>";
                    }
                    //                    var objId = "WorkMealCheckBoxIsHoliday_" + i;
                    //                    var objCheckBox = "";
                    //                    if (document.getElementById(objId)) {
                    //                        objCheckBox = document.getElementById(objId);
                    //                    }
                    //                    if (Trim(gatheringWorkMealArray[i].gt_WorkMeal_Is_Include_Other_PersonInfo) == '1') {  //包括外部员工参与的工作餐，是否为假日不可选
                    //                        objCheckBox.checked = false;
                    //                        objCheckBox.disabled = true;
                    //                        gatheringWorkMealArray[i].gt_WorkMeal_Is_Holiday = '';
                    //                    }
                    //                    else {
                    //                        objCheckBox.disabled = false;
                    //                    }
                    break;
                case 8: //备注
                    cell.width = 110;
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=125 onblur='javascript:setWorkMealDescription(" + i + ");'  id='WorkMealTextBoxDescription_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "WorkMealTextBoxDescription_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringWorkMealArray[i].gt_WorkMeal_Description;
                    }
                    break;
                case 9: //是否复制
                    cell.width = 40;
                    if (gatheringWorkMealArray[i].gt_WorkMeal_IsCopy == "0" || gatheringWorkMealArray[i].gt_WorkMeal_IsCopy == "")
                        cell.innerHTML = "<input type='checkbox' id=\"CheckBoxIsCopy_" + i + "\" onclick='javascript:setWorkMealIsCopy(" + i + ")'>";
                    else
                        cell.innerHTML = "<input checked type='checkbox' id=\"CheckBoxIsCopy_" + i + "\" onclick='javascript:setWorkMealIsCopy(" + i + ")'>";
                    break;
                case 10: //del
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteWorkMealRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
    calWorkMealSum(); //用餐金额合计
    calWorkMealDinnerAccountSum(); //用餐人数合计
    calWorkMealDinnerTimesSum(); //用餐次数合计
}
function setWorkMealIsCopy(index) {//是否复制
    var obj = document.getElementById("CheckBoxIsCopy_" + index);
    if (obj.checked == true)
        gatheringWorkMealArray[index].gt_WorkMeal_IsCopy = "1";
    else
        gatheringWorkMealArray[index].gt_WorkMeal_IsCopy = "0";
}
function setWorkMealDate(index) {
    var obj = document.getElementById("WorkMealTextBoxDate_" + index);
    gatheringWorkMealArray[index].gt_WorkMeal_Date = obj.value;

    $.ajax({
        //要用post方式     
        type: "Post",
        //方法所在页面和方法名     
        url: "ItemDetailInput.aspx/ChkDateIsHoliday",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + obj.value + "'}",
        success: function (data) {
            var objHoliday = document.getElementById("WorkMealCheckBoxIsHoliday_" + index);
            if (data.d == true) {
                objHoliday.checked = true;
                gatheringWorkMealArray[index].gt_WorkMeal_Is_Holiday = "1";
            }
            else {
                objHoliday.checked = false;
                gatheringWorkMealArray[index].gt_WorkMeal_Is_Holiday = "0";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            return false;
        }
    });
}
function setWorkMealCompany(index) {
    var obj = document.getElementById("WorkMealTextBoxCompany_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的误餐费费用明细-地点-中包含非法字符“~”，请重新输入。");
        return;
    }
    gatheringWorkMealArray[index].gt_WorkMeal_Company = obj.value;
}
function setWorkMealAmount(index) {
    var obj = document.getElementById("WorkMealTextBoxAmount_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        alert('第' + no + '行的误餐费费用明细-报销金额-不能为空');
        obj.value = gatheringWorkMealArray[index].gt_WorkMeal_Amount;
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的误餐费费用明细-报销金额-格式不合法');
        obj.value = gatheringWorkMealArray[index].gt_WorkMeal_Amount;
        return;
    }

    if (obj.value <= 0) {
        alert('第' + no + '行的误餐费费用明细-报销金额-格式不合法');
        obj.value = gatheringWorkMealArray[index].gt_WorkMeal_Amount;
        return;
    }
    obj.value = Math.round(obj.value * 100) / 100;
    gatheringWorkMealArray[index].gt_WorkMeal_Amount = obj.value;

    calWorkMealSum();
}
//删除选定行
function deleteWorkMealRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringWorkMealArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringWorkMealArray[i];
            j++;
        }
    }

    gatheringWorkMealArray = tempArray;
    refreshWorkMealData();
}
//计算付款合计
function calWorkMealSum() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringWorkMealArray.length; i++) {
        var amount = gatheringWorkMealArray[i].gt_WorkMeal_Amount;
        if (amount != '') {
            amount = amount.replace(/\,/g, "");
            sumAmount += parseFloat(amount);
        }
    }
    document.all.LabelSumWorkMealAmount.innerText = formatCurrency(sumAmount);
    //20101222 chaidanlei 在hidden中保存原始的报销金额合计
    document.all.hiddenSumWorkMealAmount.value = sumAmount;
}
//计算用餐人数合计
function setWorkMealDinnerAccount(index) {
    var obj = document.getElementById("WorkMealTextBoxDinnerAccount_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        alert('第' + no + '行的误餐费费用明细-用餐人数-不能为空');
        obj.value = gatheringWorkMealArray[index].gt_WorkMeal_Dinner_Account;
        return;
    }
    if (!IsInt(obj.value)) {
        alert('第' + no + '行的误餐费费用明细-用餐人数-必须为整数');
        obj.value = gatheringWorkMealArray[index].gt_WorkMeal_Dinner_Account;
        return;
    }
    if (obj.value <= 0) {
        alert('第' + no + '行的误餐费费用明细-用餐人数-必须为大于0的整数');
        obj.value = gatheringWorkMealArray[index].gt_WorkMeal_Dinner_Account;
        return;
    }
    gatheringWorkMealArray[index].gt_WorkMeal_Dinner_Account = obj.value;

    calWorkMealDinnerAccountSum();
}
//计算用餐次数
function setWorkMealDinnerTimes(index) {
    var obj = document.getElementById("WorkMealTextBoxDinnerTimes_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        return;
    }
    if (!IsInt(obj.value)) {
        alert('第' + no + '行的误餐费费用明细-用餐次数-必须为整数');
        return;
    }
    if (obj.value <= 0) {
        alert('第' + no + '行的误餐费费用明细-用餐次数-必须为大于0的整数');
        return;
    }
    gatheringWorkMealArray[index].gt_WorkMeal_Dinner_Times = obj.value;

    calWorkMealDinnerTimesSum();
}
//计算用餐人数合计
function calWorkMealDinnerAccountSum() {
    var sumAccount = 0;
    for (var i = 0; i < gatheringWorkMealArray.length; i++) {
        var account = gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Account;
        if (account != '') {
            sumAccount += parseInt(account);
        }
    }
    document.all.LabelDinnerAccount.innerText = sumAccount;
}
//计算用餐次数
function calWorkMealDinnerTimesSum() {
    var sumAccount = 0;
    for (var i = 0; i < gatheringWorkMealArray.length; i++) {
        var account = gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Times;
        if (account != '') {
            sumAccount += parseInt(account);
        }
    }
    document.all.LabelDinnerTimes.innerText = sumAccount;
}
//用餐人员姓名
function setWorkMealLastName(index) {
    var objEmployeeNumber = document.getElementById("WorkMealTextBoxInsiderEmployeeNumber_" + index);
    var obj = document.getElementById("WorkMealTextBoxInsiderLastName_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的误餐费费用明细-用餐人员信息-包含非法字符“~”，请重新输入。");
        return;
    }

    if (Trim(obj.value).length > 1000) {
        obj.value = obj.value.substring(0, 1000);
        alert("第" + no + "行的误餐费费用明细-用餐人员信息-最多只能录入1000个字符。");
        gatheringWorkMealArray[index].gt_WorkMeal_LastName = obj.value;
        return;
    }
    var objYes = document.getElementById("radionEmployeeType1_" + index);
    if (objYes.checked == true) {
        if (obj.value.indexOf("客户") != -1) {
            alert("第" + no + "行的用餐人员中如有客户参加，请在“交际费”科目中报销。");
            obj.value = "";
            return;
        }
    }
    //内部员工编号
    gatheringWorkMealArray[index].gt_WorkMeal_Insider_EmployeeNumber = objEmployeeNumber.value;
    //内部员工姓名
    gatheringWorkMealArray[index].gt_WorkMeal_LastName = obj.value;
}
//所选择的用餐人员类型改变：公司内部人员或者非公司内部人员
function onEmployeeTypeChange(index, status)//status:0点是否有外部人员按钮时使用，1copy时使用
{ //判断是否有外部员工参与
    var objYes = document.getElementById("radionEmployeeType1_" + index); //有外部员工参与
    var objNo = document.getElementById("radionEmployeeType0_" + index); //仅公司内部人员用餐

    var objDinnerAccount = document.getElementById("WorkMealTextBoxDinnerAccount_" + index); //用餐人数
    var objDinnerTimes = document.getElementById("WorkMealTextBoxDinnerTimes_" + index); //用餐次数
    var objInsiderEmployeeNumber = document.getElementById("WorkMealTextBoxInsiderEmployeeNumber_" + index); //用餐人员员工编号(公司内部人员)
    var objLastName = document.getElementById("WorkMealTextBoxInsiderLastName_" + index); //用餐人员姓名
    var objImgQuery = document.getElementById("imgQuery_" + index); //可选择用餐人员(内部员工的图片)
    var objIsHoliday = document.getElementById("WorkMealCheckBoxIsHoliday_" + index); //是否为假日

    if (objYes.checked) //有外部员工参与
    {  //用餐人数、用餐次数、假日列变灰，不检查超标			   

        objDinnerAccount.readOnly = true;
        objDinnerAccount.style.backgroundColor = "#d3d3d3";

        objDinnerTimes.readOnly = true;
        objDinnerTimes.style.backgroundColor = "#d3d3d3";

        objLastName.readOnly = false;
        objImgQuery.style.display = "none";

        //objIsHoliday.checked = false;
        //objIsHoliday.disabled = true;
        //有外部员工参与
        gatheringWorkMealArray[index].gt_WorkMeal_Is_Include_Other_PersonInfo = "1";
        if (status == 0) {
            objDinnerAccount.value = '';
            objDinnerTimes.value = '';
            objInsiderEmployeeNumber.value = '';
            objLastName.value = '';
            //用餐人数、用餐次数、是否为假日数据清空
            gatheringWorkMealArray[index].gt_WorkMeal_Dinner_Account = '';
            gatheringWorkMealArray[index].gt_WorkMeal_Dinner_Times = '';
            gatheringWorkMealArray[index].gt_WorkMeal_Is_Holiday = '';
        }
    }
    else if (objNo.checked) //仅公司内部人员用餐
    {
        objDinnerAccount.readOnly = false;
        objDinnerAccount.style.backgroundColor = "";

        objDinnerTimes.value = '1';
        gatheringWorkMealArray[index].gt_WorkMeal_Dinner_Times = '1'; //数组中的用餐次数
        objDinnerTimes.style.backgroundColor = "";

        objLastName.readOnly = true;
        objImgQuery.style.display = "inline";

        //objIsHoliday.disabled = false;

        //仅公司内部人员用餐
        gatheringWorkMealArray[index].gt_WorkMeal_Is_Include_Other_PersonInfo = "0";

        if (status == 0) {
            objDinnerAccount.value = '';
            objInsiderEmployeeNumber.value = '';
            objLastName.value = '';
        }
    }
    calWorkMealSum(); //用餐金额合计
    calWorkMealDinnerAccountSum(); //用餐人数合计
    calWorkMealDinnerTimesSum(); //用餐次数合计
}
//是否为假日
function SetIsHoliday(index) {
    var obj = document.getElementById("WorkMealCheckBoxIsHoliday_" + index);
    if (obj.checked) {
        gatheringWorkMealArray[index].gt_WorkMeal_Is_Holiday = "1";
    }
    else {
        gatheringWorkMealArray[index].gt_WorkMeal_Is_Holiday = "0";
    }
}
//判断备注信息
function setWorkMealDescription(index) {
    var obj = document.getElementById("WorkMealTextBoxDescription_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的误餐费费用明细-工作事由-包含非法字符“~”，请重新输入。");
        return;
    }

    if (Trim(obj.value).length > 125) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的误餐费费用明细-工作事由-最多只能录入125个字符。");
        gatheringWorkMealArray[index].gt_WorkMeal_Description = obj.value;
        return;
    }
    gatheringWorkMealArray[index].gt_WorkMeal_Description = obj.value;
}
//保存工作餐费用明细数据 WorkMealItemSubmit
function WorkMealItemSubmit() {
    var WorkMealAmountList = '';
    var WorkMealDinnerAccountList = '';
    var WorkMealDinnerTimesList = '';
    var WorkMealInsiderEmployeeNumber = '';
    var WorkMealLastName = '';
    var WorkMealIsIncludeOtherPerson = '';
    var WorkMealDateList = '';
    var WorkMealIsHolidayList = '';
    var WorkMealDescriptionList = '';

    //根据报销金额计算出的报销金额总和
    var hiddenSumWorkMealAmount = document.getElementById("hiddenSumWorkMealAmount");
    //根据用餐人数、用餐次数、是否为假日【非假日，报销标准为：30/人；假日，报销标准为：60/人】，计算工作餐费用总额存入hidden中
    var hiddenCalculateWorkMealAmount = document.getElementById("hiddenCalculateWorkMealAmount");
    hiddenCalculateWorkMealAmount.value = ''; //将hidden中的值清空

    var calculateFeeAmount = parseFloat('0');
    for (var i = 0; i < gatheringWorkMealArray.length; i++) {
        var index = i + 1;

        //报销金额
        if (Trim(gatheringWorkMealArray[i].gt_WorkMeal_Amount) == '') {
            alert("误餐费费用明细第“" + index + "”行的报销金额不能为空");
            document.all["WorkMealTextBoxAmount_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringWorkMealArray[i].gt_WorkMeal_Amount)) {
                alert("误餐费费用明细第“" + index + "”行的报销金额不正确");
                document.all["WorkMealTextBoxAmount_" + i].focus();
                return false;
            }
            else {
                if (gatheringWorkMealArray[i].gt_WorkMeal_Amount <= 0) {
                    alert("误餐费费用明细第“" + index + "”行的报销金额不能小于等于零");
                    document.all["WorkMealTextBoxAmount_" + i].focus();
                    return false;
                }
            }
        }
        //20101229 判断仅公司内部人员用餐时，检查用餐人数、用餐次数是否为空
        if (gatheringWorkMealArray[i].gt_WorkMeal_Is_Include_Other_PersonInfo == "0") {
            //用餐人数

            if (Trim(gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Account) == '') {
                alert("误餐费费用明细第“" + index + "”行的用餐人数不能为空");
                document.all["WorkMealTextBoxDinnerAccount_" + i].focus();
                return false;
            }
            //用餐次数
            if (Trim(gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Times) == '') {
                alert("误餐费费用明细第“" + index + "”行的用餐次数不能为空");
                document.all["WorkMealTextBoxDinnerTimes_" + i].focus();
                return false;
            }
        }
        //用餐人数
        if (Trim(gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Account) != '') {
            if (!IsInt(gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Account)) {
                alert('第' + index + '行的误餐费费用明细-用餐人数-必须为整数');
                document.all["WorkMealTextBoxDinnerAccount_" + i].focus();
                return;
            }
        }
        //用餐次数
        if (Trim(gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Times) != '') {
            if (!IsInt(gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Times)) {
                alert('第' + index + '行的误餐费费用明细-用餐次数-必须为整数');
                document.all["WorkMealTextBoxDinnerTimes_" + i].focus();
                return;
            }
        }
        //用餐人员员工编号、员工姓名
        //20101229 判断仅公司内部人员用餐时，检查录入的就餐人数必须和填写的用餐人数一致
        if (gatheringWorkMealArray[i].gt_WorkMeal_Is_Include_Other_PersonInfo == "0" && document.getElementById("hiddenExpenseCategoryID").value != document.getElementById("hiddenExpenseCategoryWorkLuntch").value) {
            if ((Trim(gatheringWorkMealArray[i].gt_WorkMeal_Insider_EmployeeNumber) == '' || Trim(gatheringWorkMealArray[i].gt_WorkMeal_LastName) == '') && document.getElementById("hiddenExpenseCategoryID").value != document.getElementById("hiddenExpenseCategoryWorkLuntch").value) {
                alert("误餐费费用明细第“" + index + "”行的用餐人员不能为空");
                document.all["WorkMealTextBoxInsiderLastName_" + i].focus();
                return false;
            }
        }
        else if (Trim(gatheringWorkMealArray[i].gt_WorkMeal_LastName) == '' && document.getElementById("hiddenExpenseCategoryID").value != document.getElementById("hiddenExpenseCategoryWorkLuntch").value) //非公司内部人员用餐，不检查员工编号信息
        {
            alert("误餐费费用明细第“" + index + "”行的用餐人员不能为空");
            document.all["WorkMealTextBoxInsiderLastName_" + i].focus();
            return false;
        }
        if (Trim(gatheringWorkMealArray[i].gt_WorkMeal_LastName) != '' && document.getElementById("hiddenExpenseCategoryID").value != document.getElementById("hiddenExpenseCategoryWorkLuntch").value) {
            if (gatheringWorkMealArray[i].gt_WorkMeal_LastName.indexOf("~") != -1) {
                alert("误餐费费用明细第“" + index + "”行的用餐人员信息包含“~”非法字符，请重新输入。");
                document.all["WorkMealTextBoxInsiderLastName_" + i].focus();
                return false;
            }
            if (Trim(gatheringWorkMealArray[i].gt_WorkMeal_LastName).length > 1000 && document.getElementById("hiddenExpenseCategoryID").value != document.getElementById("hiddenExpenseCategoryWorkLuntch").value) {
                alert("误餐费费用明细第“" + index + "”行的用餐人员信息不能大于1000个字符");
                document.all["WorkMealTextBoxInsiderLastName_" + i].focus();
                return false;
            }
        }
        //20101229 判断仅公司内部人员用餐时，检查录入的就餐人数必须和填写的用餐人数一致
        if (gatheringWorkMealArray[i].gt_WorkMeal_Is_Include_Other_PersonInfo == "0" && document.getElementById("hiddenExpenseCategoryID").value != document.getElementById("hiddenExpenseCategoryWorkLuntch").value) {  //20101227 chaidanlei 判断用餐人员：录入的公司外部人员为空时，则录入的就餐人数必须和填写的用餐人数一致
            var employeeCount = parseInt('0');
            var employeeInfo = Trim(gatheringWorkMealArray[i].gt_WorkMeal_Insider_EmployeeNumber).split(',');
            for (var k = 0; k < employeeInfo.length; k++) {
                if (employeeInfo[k] != '') {
                    employeeCount = employeeCount + 1;
                }
            }
            if (parseInt(gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Account) != employeeCount) {
                alert("误餐费费用明细第“" + index + "”行填写的用餐人数和所选择的用餐人员数据人数不一致，请检查数据！");
                document.all["WorkMealTextBoxInsiderLastName_" + i].focus();
                return false;
            }
        }
        if (Trim(gatheringWorkMealArray[i].gt_WorkMeal_Date) == '') {
            alert("误餐费费用明细第“" + index + "”行的日期不能为空");
            document.all["WorkMealTextBoxDate_" + i].focus();
            return false;
        }
        //备注
        if (Trim(gatheringWorkMealArray[i].gt_WorkMeal_Description).length <= 0) {
            alert("误餐费费用明细第“" + index + "”行的费用备注不能为空");
            document.all["WorkMealTextBoxDescription_" + i].focus();
            return false;
        }
        if (Trim(gatheringWorkMealArray[i].gt_WorkMeal_Description).length > 125) {
            alert("误餐费费用明细第“" + index + "”行的费用备注不能大于125个字符");
            document.all["WorkMealTextBoxDescription_" + i].focus();
            return false;
        }
        if (gatheringWorkMealArray[i].gt_WorkMeal_Description.indexOf("~") != -1) {
            alert('误餐费费用明细第“' + index + '”行的费用备注字符“~”为非法字符，请重新输入。');
            document.all["WorkMealTextBoxDescription_" + i].focus();
            return false;
        }
        //20101229 判断仅公司内部人员用餐时，检查工作餐费用是否超标，超标时不允许保存数据
        if (gatheringWorkMealArray[i].gt_WorkMeal_Is_Include_Other_PersonInfo == "0") {
            //20101224 chaidanlei 增加工作餐超标说明
            //判断该行明细是否超标
            var calculateFee = parseFloat('0');
            //计算费用明细数据
            if (gatheringWorkMealArray[i].gt_WorkMeal_Is_Holiday == "1") {  //假日报销标准为：60/人，即用餐人数*用餐次数*60
                calculateFee = parseFloat(gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Account) * parseFloat(gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Times) * 60;
            }
            else //非假日报销标准为：30/人，即用餐人数*用餐次数*30
            {
                calculateFee = parseFloat(gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Account) * parseFloat(gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Times) * 30;
            }
            //判断报销金额是否大于工作餐报销标准的计算金额，大于则超标--Singapore JV-19、AL-Malaysia-24、AL-Thailand-25不受限            
            if (companyID != "119" && companyID != "120" && companyID != "121") {
                if (parseFloat(gatheringWorkMealArray[i].gt_WorkMeal_Amount) > calculateFee) {
                    alert("误餐费费用明细第“" + index + "”行的费用超标，不允许保存，请检查数据！");
                    document.all["WorkMealTextBoxDescription_" + i].focus();
                    return false;
                }
            }
        }
        WorkMealAmountList += '~' + gatheringWorkMealArray[i].gt_WorkMeal_Amount;
        WorkMealDinnerAccountList += '~' + gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Account;
        WorkMealDinnerTimesList += '~' + gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Times;
        WorkMealInsiderEmployeeNumber += '~' + gatheringWorkMealArray[i].gt_WorkMeal_Insider_EmployeeNumber;
        WorkMealLastName += '~' + gatheringWorkMealArray[i].gt_WorkMeal_LastName;
        WorkMealIsIncludeOtherPerson += '~' + gatheringWorkMealArray[i].gt_WorkMeal_Is_Include_Other_PersonInfo;
        WorkMealDateList += '~' + gatheringWorkMealArray[i].gt_WorkMeal_Date;
        //是否为假日
        WorkMealIsHolidayList += '~' + gatheringWorkMealArray[i].gt_WorkMeal_Is_Holiday;
        WorkMealDescriptionList += '~' + gatheringWorkMealArray[i].gt_WorkMeal_Description;

        //计算费用明细数据
        /* 20101224 chaidanlei 注释，在明细页面录入超标说明
        if (gatheringWorkMealArray[i].gt_WorkMeal_Is_Holiday == "1")
        {  //假日报销标准为：60/人，即用餐人数*用餐次数*60
        var calculateFee = parseFloat(gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Account) * parseFloat(gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Times) * 60;
        calculateFeeAmount += calculateFee;
        }
        else //非假日报销标准为：30/人，即用餐人数*用餐次数*30
        {
        var calculateFee = parseFloat(gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Account) * parseFloat(gatheringWorkMealArray[i].gt_WorkMeal_Dinner_Times) * 30;
        calculateFeeAmount += calculateFee;
        }*/

    }
    //将计算出的报销金额合计存入hidden
    //hiddenCalculateWorkMealAmount.value = calculateFeeAmount;

    WorkMealAmountList = WorkMealAmountList.substr(1);
    WorkMealDinnerAccountList = WorkMealDinnerAccountList.substr(1);
    WorkMealDinnerTimesList = WorkMealDinnerTimesList.substr(1);
    WorkMealInsiderEmployeeNumber = WorkMealInsiderEmployeeNumber.substr(1);
    WorkMealLastName = WorkMealLastName.substr(1);
    WorkMealIsIncludeOtherPerson = WorkMealIsIncludeOtherPerson.substr(1);
    WorkMealDateList = WorkMealDateList.substr(1);
    WorkMealIsHolidayList = WorkMealIsHolidayList.substr(1);
    WorkMealDescriptionList = WorkMealDescriptionList.substr(1);

    //将数据存入hidden中
    document.all.hiddenWorkMealAmount.value = WorkMealAmountList;
    document.all.hiddenWorkMealDinnerAccount.value = WorkMealDinnerAccountList;
    document.all.hiddenWorkMealDinnerTimes.value = WorkMealDinnerTimesList;
    document.all.hiddenWorkMealInsiderEmployeeNumber.value = WorkMealInsiderEmployeeNumber;
    document.all.hiddenWorkMealInsiderLastName.value = WorkMealLastName;
    document.all.hiddenWorkMealIsIncludeOtherPerson.value = WorkMealIsIncludeOtherPerson;
    document.all.hiddenWorkMealDate.value = WorkMealDateList;
    document.all.hiddenWorkMealIsHolidayList.value = WorkMealIsHolidayList;
    document.all.hiddenWorkMealAmountDes.value = WorkMealDescriptionList;
}


//////////////////////////////////////////////办公费-其他费用////////////////////////////////////////////////

var gatheringWorkOtherArray = new Array();
//添加空白一行
function addWorkOtherRow() {
    var index = gatheringWorkOtherArray.length;
    gatheringWorkOtherArray[index] = new jsWorkOtherGathering('', '', '');
    refreshWorkOtherData();
    copyWorkOtherDataFromPreRow(gatheringWorkOtherArray.length);
}

//添加一行的时候，复制上一行的数据
function copyWorkOtherDataFromPreRow(index) {
    if (index == 1)
        return;

    var sel_SrcObj = document.getElementById('WorkOtherTextBoxDate_' + (index - 2));
    var sel_TarObj = document.getElementById('WorkOtherTextBoxDate_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkOtherDate(index - 1);

    /*sel_SrcObj = document.getElementById('WorkOtherTextBoxPlace_'+(index-2));
    sel_TarObj = document.getElementById('WorkOtherTextBoxPlace_'+(index-1));
			
    sel_TarObj.value = sel_SrcObj.value;
    setWorkOtherPlace(index-1);*/

    sel_SrcObj = document.getElementById('WorkOtherTextBoxDescription_' + (index - 2));
    sel_TarObj = document.getElementById('WorkOtherTextBoxDescription_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkOtherDescription(index - 1);

    sel_SrcObj = document.getElementById('WorkOtherTextBoxAmount_' + (index - 2));
    sel_TarObj = document.getElementById('WorkOtherTextBoxAmount_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setWorkOtherAmount(index - 1);

}

//存储项目费用信息
function jsWorkOtherGathering(jdate, jdescription, jAmount) {
    this.gt_WorkOther_Date = jdate;
    //this.gt_WorkOther_Place = jPlace;
    this.gt_WorkOther_Description = jdescription;
    this.gt_WorkOther_Amount = jAmount;
}

//根据数组（gatheringWorkOtherArray）显示界面
function refreshWorkOtherData() {
    //删除原来的行
    var rowCount = WorkOtherTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        WorkOtherTable.deleteRow(1);
    }
    var MaxCells = WorkOtherTable.rows[0].cells.length;

    for (var i = 0; i < gatheringWorkOtherArray.length; i++) {
        var newRow = WorkOtherTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = i + 1;
                    cell.align = "center";
                    break;
                case 1: //日期
                    var dateID = "WorkOtherTextBoxDate_" + i;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:90'  id=\"WorkOtherTextBoxDate_" + i + "\" value=\"" + gatheringWorkOtherArray[i].gt_WorkOther_Date + "\" onblur='javascript:CheckDateFormat(this);setWorkOtherDate(" + i + ");' onfocus='javascript:setWorkOtherDate(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=WorkOtherTextBoxDate_" + i + "','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input class='Wdate' autocomplete='off' style='width:90' id='" + dateID + "' value='" + gatheringWorkOtherArray[i].gt_WorkOther_Date + "' " +
                        " onblur=\"javascript:setWorkOtherDate(" + i + ");\" onfocus=\"javascript:setWorkOtherDate(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">";
                    break;
                /*
                case 2: //地点
                cell.noWrap = true;						
                cell.innerHTML="<TEXTAREA  rows='2' MaxLength=150 onblur='javascript:setWorkOtherPlace("+i+");'  id='WorkOtherTextBoxPlace_"+ i +"' style=\"width:99%\" ></TEXTAREA>";
                var obj = "WorkOtherTextBoxPlace_"+ i ;
                if(document.getElementById(obj))
                {
                document.getElementById(obj).value= gatheringWorkOtherArray[i].gt_WorkOther_Place ;
                }
                break;
                */ 
                case 2: //费用说明
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=200 onblur='javascript:setWorkOtherDescription(" + i + ");'  id='WorkOtherTextBoxDescription_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "WorkOtherTextBoxDescription_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringWorkOtherArray[i].gt_WorkOther_Description;
                    }
                    break;
                case 3: //金额
                    cell.innerHTML = "<input maxlength='10' onblur='javascript:setWorkOtherAmount(" + i + ");' type='text' id='WorkOtherTextBoxAmount_" + i + "' value='" + gatheringWorkOtherArray[i].gt_WorkOther_Amount + "' style=\"width:100%;height:40px\" onKeypress='javascript:OnlyNumber();calWorkOtherSum();'>";
                    break;
                case 4: //del
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteWorkOtherRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
    calWorkOtherSum();
}

function setWorkOtherDate(index) {
    var obj = document.getElementById("WorkOtherTextBoxDate_" + index);
    gatheringWorkOtherArray[index].gt_WorkOther_Date = obj.value;
}

function setWorkOtherPlace(index) {
    var obj = document.getElementById("WorkOtherTextBoxPlace_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的办公费-其他费用-地点-中包含非法字符“~”，请重新输入。");
        return;
    }
    gatheringWorkOtherArray[index].gt_WorkOther_Place = obj.value;
}

function setWorkOtherDescription(index) {
    var obj = document.getElementById("WorkOtherTextBoxDescription_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的办公费-其他费用-费用说明-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 125) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的办公费-其他费用-费用说明-至多只能录入125个字符。");
        gatheringWorkOtherArray[index].gt_WorkOther_Description = obj.value;
        return;
    }

    gatheringWorkOtherArray[index].gt_WorkOther_Description = obj.value;
}

function setWorkOtherAmount(index) {
    var obj = document.getElementById("WorkOtherTextBoxAmount_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的办公费-其他费用-金额-格式不合法');
        return;
    }

    if (obj.value <= 0) {
        alert('第' + no + '行的办公费-其他费用-金额-格式不合法');
        return;
    }
    obj.value = Math.round(obj.value * 100) / 100;
    gatheringWorkOtherArray[index].gt_WorkOther_Amount = obj.value;

    calWorkOtherSum();
}
//删除选定行
function deleteWorkOtherRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringWorkOtherArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringWorkOtherArray[i];
            j++;
        }
    }

    gatheringWorkOtherArray = tempArray;
    refreshWorkOtherData();
}
//计算付款合计
function calWorkOtherSum() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringWorkOtherArray.length; i++) {
        var amount = gatheringWorkOtherArray[i].gt_WorkOther_Amount;

        amount = amount.replace(/\,/g, "");
        sumAmount += parseFloat(amount);
    }
    document.all.LabelSumWorkOtherAmount.innerText = formatCurrency(sumAmount);
}

function WorkOtherItemSubmit() {
    var WorkOtherDateList = '';
    var WorkOtherPlaceList = '';
    var WorkOtherDescriptionList = '';
    var WorkOtherAmountList = '';

    for (var i = 0; i < gatheringWorkOtherArray.length; i++) {
        var index = i + 1;

        if (gatheringWorkOtherArray[i].gt_WorkOther_Date == '') {
            alert("办公费-其他费用明细第“" + index + "”行的招待日期不能为空");
            document.all["WorkOtherTextBoxDate_" + i].focus();
            return false;
        }
        /*
        if(gatheringWorkOtherArray[i].gt_WorkOther_Place == '')
        {
        alert("办公费-其他费用明细第“"+index+"”行的地点信息不能为空");
        document.all["WorkOtherTextBoxPlace_"+i].focus();
        return false;
        }
        else
        {
        if(gatheringWorkOtherArray[i].gt_WorkOther_Place.indexOf("~") != -1)
        {
        alert('办公费-其他费用明细第“"+index+"”行的地点信息包含“~”非法字符，请重新输入。');
        document.all["WorkOtherTextBoxPlace_"+i].focus();
        return false;
        }
        }
        */
        if (gatheringWorkOtherArray[i].gt_WorkOther_Amount == '') {
            alert("办公费-其他费用明细第“" + index + "”行的金额不能为空");
            document.all["WorkOtherTextBoxAmount_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringWorkOtherArray[i].gt_WorkOther_Amount)) {
                alert("办公费-其他费用明细第“" + index + "”行的金额不正确");
                document.all["WorkOtherTextBoxAmount_" + i].focus();
                return false;
            }
            else {
                if (gatheringWorkOtherArray[i].gt_WorkOther_Amount <= 0) {
                    alert("办公费-其他费用明细第“" + index + "”行的金额不能小于等于零");
                    document.all["WorkOtherTextBoxAmount_" + i].focus();
                    return false;
                }
            }
        }

        if (gatheringWorkOtherArray[i].gt_WorkOther_Description.length <= 0) {
            alert("办公费-其他费用明细第“" + index + "”行的费用说明不能为空");
            document.all["WorkOtherTextBoxDescription_" + i].focus();
            return false;
        }

        if (gatheringWorkOtherArray[i].gt_WorkOther_Description.length > 125) {
            alert("办公费-其他费用明细第“" + index + "”行的费用说明不能大于125个字符");
            document.all["WorkOtherTextBoxDescription_" + i].focus();
            return false;
        }

        if (gatheringWorkOtherArray[i].gt_WorkOther_Description.indexOf("~") != -1) {
            alert('办公费-其他费用明细第“' + index + '”行的费用说明字符“~”为非法字符，请重新输入。');
            document.all["WorkOtherTextBoxDescription_" + i].focus();
            return false;
        }

        WorkOtherDateList += '~' + gatheringWorkOtherArray[i].gt_WorkOther_Date;

        //WorkOtherPlaceList += '~'+ gatheringWorkOtherArray[i].gt_WorkOther_Place;

        WorkOtherAmountList += '~' + gatheringWorkOtherArray[i].gt_WorkOther_Amount;

        WorkOtherDescriptionList += '~' + gatheringWorkOtherArray[i].gt_WorkOther_Description;

    }

    WorkOtherDateList = WorkOtherDateList.substr(1);
    //WorkOtherPlaceList	= WorkOtherPlaceList.substr(1);
    WorkOtherAmountList = WorkOtherAmountList.substr(1);
    WorkOtherDescriptionList = WorkOtherDescriptionList.substr(1);

    document.all.hiddenWorkOtherDate.value = WorkOtherDateList;
    document.all.hiddenWorkOtherPlace.value = '' //WorkOtherPlaceList;
    document.all.hiddenWorkOtherAmountDes.value = WorkOtherDescriptionList;
    document.all.hiddenWorkOtherAmount.value = WorkOtherAmountList;

}

/////////////////////////////////////////////项目地房租费//////////////////////////////////////////////////////

var gatheringHouseRentArray = new Array();
//添加空白一行
function addHouseRentRow() {
    var index = gatheringHouseRentArray.length;
    //20101215 chaidanlei 修改租赁费-房屋租赁费 费用明细格式，增加是否按租期分摊列
    //2012515 wanghk 增加房东，最大入住人数，缴费性质，租赁性质，明细性质，合同编号
    gatheringHouseRentArray[index] = new addHouseRentRow2(index + 1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    refreshHouseRentData();
    copyHouseRentDataFromPreRow(gatheringHouseRentArray.length);
}
//20130529 mfj
function addHouseRentRow2() {

    var index = gatheringHouseRentArray.length;
    //20130524
    gatheringHouseRentArray[index] = new jsHouseRentGathering2(index + 1, '', '',
    '', '', '', '',
    '', '', '',
    '', '', '',
    '', '', '',
    '', '', ''
    , '', '');
    refreshHouseRentData2();
    copyHouseRentDataFromPreRow2(gatheringHouseRentArray.length);
}
//add 水电煤气物业费
function jsUtilitiesChargesGathering(jOrderNo, ContractId, ContractName, jCityID, jCity, jAddress, jContractStart, jContractEnd, jHouseOwner, jRent, jLargestNumberIn) {
    this.gt_UtilitiesCharges_OrderNo = jOrderNo;
    this.gt_UtilitiesCharges_HouseContractID = ContractId;
    this.gt_UtilitiesCharges_HouseContract = ContractName;
    this.gt_UtilitiesCharges_HouseCityID = jCityID;
    this.gt_UtilitiesCharges_City = jCity;
    this.gt_UtilitiesCharges_Address = jAddress;
    this.gt_UtilitiesCharges_ContractStart = jContractStart;
    this.gt_UtilitiesCharges_ContractEnd = jContractEnd;
    this.gt_UtilitiesCharges_MonthRent = jRent;

    // 房东，最大入住人数
    this.gt_UtilitiesCharges_HouseOwner = jHouseOwner;
    this.gt_UtilitiesCharges_LargestNumberIn = jLargestNumberIn;
}
var gatheringUtilitiesChargesArray = new Array();
function addUtilitiesChargesRow() {
    var index = gatheringUtilitiesChargesArray.length;
    //20180624
    gatheringUtilitiesChargesArray[index] = new jsUtilitiesChargesGathering(index + 1, '', '', '', '', '', '', '', '', '', '');
    refreshUtilitiesChargesData();
}
function UtilitiesChargesItemSubmit() {
    var UtilitiesChargesCityList = '';
    var UtilitiesChargesAddressList = '';
    var UtilitiesChargesContractStartList = '';
    var UtilitiesChargesContractEndList = '';
    var UtilitiesChargesMonthRentList = '';
    var UtilitiesChargesOrderNoList = '';
    var UtilitiesChargesHouseOwner = '';
    var UtilitiesChargesLargestNumberIn = '';
    //20130529增加合同编码 合同id
    var UtilitiesChargesContractId = '';
    var UtilitiesChargesContractCode = '';
    var UtilitiesChargesCityText = '';
    for (var i = 0; i < gatheringUtilitiesChargesArray.length; i++) {
        var index = i + 1;
        //省市
        if (Trim(gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_City).length <= 0) {
            alert("水电煤气物业费支付明细第“" + index + "”行的省市不能为空");
            document.all["UtilitiesChargesTextBoxHouseCity_" + i].focus();
            return false;
        }
        if (gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_City.indexOf("~") != -1 || gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_City.indexOf("|") != -1) {
            alert('水电煤气物业费支付明细第“' + index + '”行的省市字符“~”，“|”为非法字符，请重新输入。');
            document.all["UtilitiesChargesTextBoxHouseCity_" + i].focus();
            return false;
        }
        //房屋租住地址
        if (Trim(gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_Address).length <= 0) {
            alert("水电煤气物业费支付明细第“" + index + "”行的房屋租住地址不能为空");
            document.all["UtilitiesChargesTextBoxAddress_" + i].focus();
            return false;
        }
        if (gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_Address.indexOf("~") != -1 || gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_Address.indexOf("|") != -1) {
            alert('水电煤气物业费支付明细第“' + index + '”行的房屋租住地址字符“~”，“|”为非法字符，请重新输入。');
            document.all["UtilitiesChargesTextBoxAddress_" + i].focus();
            return false;
        }
        //合同开始日期
        if (gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_ContractStart == '') {
            alert("水电煤气物业费支付明细第“" + index + "”行的合同开始日期不能为空");
            document.all["UtilitiesChargesTextBoxContractStart_" + i].focus();
            return false;
        }
        //合同结束日期
        if (gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_ContractEnd == '') {
            alert("水电煤气物业费支付明细第“" + index + "”行的合同结束日期不能为空");
            document.all["UtilitiesChargesTextBoxContractEnd_" + i].focus();
            return false;
        }
        //月租金
        if (gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_MonthRent == '') {
            alert("水电煤气物业费支付明细第“" + index + "”行的月租金不能为空");
            document.all["UtilitiesChargesTextBoxMonthRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_MonthRent)) {
                alert("水电煤气物业费支付明细第“" + index + "”行的月租金不正确");
                document.all["UtilitiesChargesTextBoxMonthRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_MonthRent < 0) {
                    alert("水电煤气物业费支付明细第“" + index + "”行的月租金不能小于等于零");
                    document.all["UtilitiesChargesTextBoxMonthRent_" + i].focus();
                    return false;
                }
            }
        }
        //20120515 wanghk 增加列：房东 gt_UtilitiesCharges_HouseOwner
        if ((gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_HouseOwner).length <= 0) {
            alert("水电煤气物业费支付明细第“" + index + "”行的房东不能为空，请重新输入。");
            document.all["UtilitiesChargesTextBoxHouseOwner_" + i].focus();
            return false;
        }
        if (gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_HouseOwner.indexOf("~") != -1 || gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_HouseOwner.indexOf("|") != -1) {
            alert('水电煤气物业费支付明细第“' + index + '”行的房东字符“~”，“|”为非法字符，请重新输入。');
            document.all["UtilitiesChargesTextBoxHouseOwner_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：最大入住人数 gt_UtilitiesCharges_LargestNumberIn
        if ((gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_LargestNumberIn).length <= 0) {
            alert("水电煤气物业费支付明细第“" + index + "”行的最大入住人数不能为空，请重新输入。");
            document.all["UtilitiesChargesTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if (gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_LargestNumberIn.indexOf("~") != -1 || gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_LargestNumberIn.indexOf("|") != -1) {
            alert('水电煤气物业费支付明细第“' + index + '”行的最大入住人数字符“~”，“|”为非法字符，请重新输入。');
            document.all["UtilitiesChargesTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if ((gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_HouseContract).length <= 0) {
            alert("水电煤气物业费支付明细第“" + index + "”行的合同不能为空，请选择");
            document.all["UtilitiesChargesTextBoxHouseContract_" + i].focus();
            return false;
        }


        UtilitiesChargesCityList += '~' + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_HouseCityID;
        UtilitiesChargesAddressList += '~' + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_Address;
        UtilitiesChargesContractStartList += '~' + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_ContractStart;
        UtilitiesChargesContractEndList += '~' + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_ContractEnd;
        UtilitiesChargesMonthRentList += '~' + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_MonthRent;
        UtilitiesChargesOrderNoList += '~' + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_OrderNo;
        //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
        UtilitiesChargesHouseOwner += '~' + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_HouseOwner;
        UtilitiesChargesLargestNumberIn += '~' + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_LargestNumberIn;
        //20130529 mfj  增加列：合同Id 合同Code
        UtilitiesChargesContractId += '~' + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_HouseContractID;
        UtilitiesChargesContractCode += '~' + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_HouseContract;
        UtilitiesChargesCityText += '~' + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_City;
    }

    UtilitiesChargesCityList = UtilitiesChargesCityList.substr(1);
    UtilitiesChargesAddressList = UtilitiesChargesAddressList.substr(1);
    UtilitiesChargesContractStartList = UtilitiesChargesContractStartList.substr(1);
    UtilitiesChargesContractEndList = UtilitiesChargesContractEndList.substr(1);
    UtilitiesChargesMonthRentList = UtilitiesChargesMonthRentList.substr(1);
    UtilitiesChargesOrderNoList = UtilitiesChargesOrderNoList.substr(1);
    //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
    UtilitiesChargesHouseOwner = UtilitiesChargesHouseOwner.substr(1);
    UtilitiesChargesLargestNumberIn = UtilitiesChargesLargestNumberIn.substr(1);
    //20130529 mfj  增加列：合同Id 合同Code
    UtilitiesChargesContractId = UtilitiesChargesContractId.substr(1);
    UtilitiesChargesContractCode = UtilitiesChargesContractCode.substr(1);
    UtilitiesChargesCityText = UtilitiesChargesCityText.substr(1);

    document.all.hiddenUtilitiesChargesInfo.value =
														  UtilitiesChargesCityList + "|"
														+ UtilitiesChargesAddressList + "|"
														+ UtilitiesChargesContractStartList + "|"
														+ UtilitiesChargesContractEndList + "|"
                                                        + UtilitiesChargesHouseOwner + "|"
														+ UtilitiesChargesMonthRentList + "|"
                                                        + UtilitiesChargesLargestNumberIn + "|"
														+ UtilitiesChargesOrderNoList + "|"
                                                        + UtilitiesChargesContractId + "|"
                                                        + UtilitiesChargesContractCode + "|"
                                                        + UtilitiesChargesCityText;
}
//追加行
function refreshUtilitiesChargesData() {
    //删除原来的行
    var rowCount = UtilitiesChargesTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        UtilitiesChargesTable.deleteRow(1);
    }
    var MaxCells = UtilitiesChargesTable.rows[0].cells.length;

    for (var i = 0; i < gatheringUtilitiesChargesArray.length; i++) {
        var newRow = UtilitiesChargesTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_OrderNo;
                    cell.align = "center";
                    break;
                case 1: //选择合同号
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='UtilitiesChargesHouseContractID_" + i + "' value='" + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_HouseContractID + "' style=\"height:40px\"><input type='text' id='UtilitiesChargesTextBoxHouseContract_" + i + "' value='" + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_HouseContract + "' style=\"width:80%;\" readonly  >";

                    var objHiddenContractID = "UtilitiesChargesHouseContractID_" + i;
                    var objContractID = "UtilitiesChargesTextBoxHouseContract_" + i;
                    var objCityText = "UtilitiesChargesTextBoxHouseCity_" + i;
                    var objCityID = "UtilitiesChargesHouseCityID_" + i;
                    var objAddress = "UtilitiesChargesTextBoxAddress_" + i;
                    var objStartDate = "UtilitiesChargesTextBoxContractStart_" + i;
                    var objEndDate = "UtilitiesChargesTextBoxContractEnd_" + i;
                    var objOwner = "UtilitiesChargesTextBoxHouseOwner_" + i;
                    var objMonthlyRent = "UtilitiesChargesTextBoxMonthRent_" + i;
                    var objMaxNumber = "UtilitiesChargesTextBoxLargestNumberIn_" + i;

                    var obj = "UtilitiesChargesTextBoxHouseContract_" + i;
                    cell.innerHTML += "<IMG id='imgQuery_" + i + "' onclick=\"QueryContractInfo('" + objHiddenContractID + "','" + objContractID + "','" + objCityID + "','" + objCityText + "','" + objAddress + "','" + objStartDate + "','" + objEndDate + "','" + objOwner + "','" + objMonthlyRent + "','" + objMaxNumber + "','" + i + "','3')\" style='CURSOR: hand;' src='../../images/searchicon_enabled.gif' align='absBottom'>";
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_HouseContract;
                    }
                    break;
                case 2: //城市
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='UtilitiesChargesHouseCityID_" + i + "' value='" + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_HouseCityID + "' style=\"height:40px\"><input type='text' id='UtilitiesChargesTextBoxHouseCity_" + i + "' value='" + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_City + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;
                case 3: //房屋租住地址
                    cell.innerHTML = "<input type='text' id='UtilitiesChargesTextBoxAddress_" + i + "' value='" + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_Address + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 4: //合同开始日期
                    cell.innerHTML = "<input type='text' id='UtilitiesChargesTextBoxContractStart_" + i + "' value='" + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_ContractStart + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 5: //合同结束日期
                    cell.innerHTML = "<input type='text' id='UtilitiesChargesTextBoxContractEnd_" + i + "' value='" + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_ContractEnd + "' style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 6: //房东
                    cell.innerHTML = "<input type='text' id='UtilitiesChargesTextBoxHouseOwner_" + i + "' value='" + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_HouseOwner + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 7: //月租金
                    cell.innerHTML = "<input maxlength='10'   type='text'  id='UtilitiesChargesTextBoxMonthRent_" + i + "'  value='" + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_MonthRent + "'   style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 8: //最大入住人数
                    cell.innerHTML = "<input maxlength='10' type='text' id='UtilitiesChargesTextBoxLargestNumberIn_" + i + "' value='" + gatheringUtilitiesChargesArray[i].gt_UtilitiesCharges_LargestNumberIn + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;
                case 9: //删除
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteUtilitiesChargesRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
}
//删除选定行
function deleteUtilitiesChargesRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringUtilitiesChargesArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringUtilitiesChargesArray[i];
            tempArray[j].gt_UtilitiesCharges_OrderNo = j + 1;
            j++;
        }
    }

    gatheringUtilitiesChargesArray = tempArray;
    refreshUtilitiesChargesData();
}


//add 代垫房屋税金
function jsRantTaxGathering(jOrderNo, ContractId, ContractName, jCityID, jCity, jAddress, jContractStart, jContractEnd, jHouseOwner, jRent, jLargestNumberIn) {
    this.gt_RantTax_OrderNo = jOrderNo;
    this.gt_RantTax_HouseContractID = ContractId;
    this.gt_RantTax_HouseContract = ContractName;
    this.gt_RantTax_HouseCityID = jCityID;
    this.gt_RantTax_City = jCity;
    this.gt_RantTax_Address = jAddress;
    this.gt_RantTax_ContractStart = jContractStart;
    this.gt_RantTax_ContractEnd = jContractEnd;
    this.gt_RantTax_MonthRent = jRent;

    // 房东，最大入住人数
    this.gt_RantTax_HouseOwner = jHouseOwner;
    this.gt_RantTax_LargestNumberIn = jLargestNumberIn;
}
var gatheringRantTaxArray = new Array();
function addRantTaxRow() {
    var index = gatheringRantTaxArray.length;
    //20180624
    gatheringRantTaxArray[index] = new jsRantTaxGathering(index + 1, '', '', '', '', '', '', '', '', '', '');
    refreshRantTaxData();
}
function RantTaxItemSubmit() {
    var RantTaxCityList = '';
    var RantTaxAddressList = '';
    var RantTaxContractStartList = '';
    var RantTaxContractEndList = '';
    var RantTaxMonthRentList = '';
    var RantTaxOrderNoList = '';
    var RantTaxHouseOwner = '';
    var RantTaxLargestNumberIn = '';
    //20130529增加合同编码 合同id
    var RantTaxContractId = '';
    var RantTaxContractCode = '';
    var RantTaxCityText = '';


    for (var i = 0; i < gatheringRantTaxArray.length; i++) {
        var index = i + 1;
        //省市
        if (Trim(gatheringRantTaxArray[i].gt_RantTax_City).length <= 0) {
            alert("房租代垫税金支付明细第“" + index + "”行的省市不能为空");
            document.all["RantTaxTextBoxHouseCity_" + i].focus();
            return false;
        }
        if (gatheringRantTaxArray[i].gt_RantTax_City.indexOf("~") != -1 || gatheringRantTaxArray[i].gt_RantTax_City.indexOf("|") != -1) {
            alert('房租代垫税金支付明细第“' + index + '”行的省市字符“~”，“|”为非法字符，请重新输入。');
            document.all["RantTaxTextBoxHouseCity_" + i].focus();
            return false;
        }
        //房屋租住地址
        if (Trim(gatheringRantTaxArray[i].gt_RantTax_Address).length <= 0) {
            alert("房租代垫税金支付明细第“" + index + "”行的房屋租住地址不能为空");
            document.all["RantTaxTextBoxAddress_" + i].focus();
            return false;
        }
        if (gatheringRantTaxArray[i].gt_RantTax_Address.indexOf("~") != -1 || gatheringRantTaxArray[i].gt_RantTax_Address.indexOf("|") != -1) {
            alert('房租代垫税金支付明细第“' + index + '”行的房屋租住地址字符“~”，“|”为非法字符，请重新输入。');
            document.all["RantTaxTextBoxAddress_" + i].focus();
            return false;
        }
        //合同开始日期
        if (gatheringRantTaxArray[i].gt_RantTax_ContractStart == '') {
            alert("房租代垫税金支付明细第“" + index + "”行的合同开始日期不能为空");
            document.all["RantTaxTextBoxContractStart_" + i].focus();
            return false;
        }
        //合同结束日期
        if (gatheringRantTaxArray[i].gt_RantTax_ContractEnd == '') {
            alert("房租代垫税金支付明细第“" + index + "”行的合同结束日期不能为空");
            document.all["RantTaxTextBoxContractEnd_" + i].focus();
            return false;
        }
        //月租金
        if (gatheringRantTaxArray[i].gt_RantTax_MonthRent == '') {
            alert("房租代垫税金支付明细第“" + index + "”行的月租金不能为空");
            document.all["RantTaxTextBoxMonthRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringRantTaxArray[i].gt_RantTax_MonthRent)) {
                alert("房租代垫税金支付明细第“" + index + "”行的月租金不正确");
                document.all["RantTaxTextBoxMonthRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringRantTaxArray[i].gt_RantTax_MonthRent < 0) {
                    alert("房租代垫税金支付明细第“" + index + "”行的月租金不能小于等于零");
                    document.all["RantTaxTextBoxMonthRent_" + i].focus();
                    return false;
                }
            }
        }
        //20120515 wanghk 增加列：房东 gt_RantTax_HouseOwner
        if ((gatheringRantTaxArray[i].gt_RantTax_HouseOwner).length <= 0) {
            alert("房租代垫税金支付明细第“" + index + "”行的房东不能为空，请重新输入。");
            document.all["RantTaxTextBoxHouseOwner_" + i].focus();
            return false;
        }
        if (gatheringRantTaxArray[i].gt_RantTax_HouseOwner.indexOf("~") != -1 || gatheringRantTaxArray[i].gt_RantTax_HouseOwner.indexOf("|") != -1) {
            alert('房租代垫税金支付明细第“' + index + '”行的房东字符“~”，“|”为非法字符，请重新输入。');
            document.all["RantTaxTextBoxHouseOwner_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：最大入住人数 gt_RantTax_LargestNumberIn
        if ((gatheringRantTaxArray[i].gt_RantTax_LargestNumberIn).length <= 0) {
            alert("房租代垫税金支付明细第“" + index + "”行的最大入住人数不能为空，请重新输入。");
            document.all["RantTaxTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if (gatheringRantTaxArray[i].gt_RantTax_LargestNumberIn.indexOf("~") != -1 || gatheringRantTaxArray[i].gt_RantTax_LargestNumberIn.indexOf("|") != -1) {
            alert('房租代垫税金支付明细第“' + index + '”行的最大入住人数字符“~”，“|”为非法字符，请重新输入。');
            document.all["RantTaxTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if ((gatheringRantTaxArray[i].gt_RantTax_HouseContract).length <= 0) {
            alert("房租代垫税金支付明细第“" + index + "”行的合同不能为空，请选择");
            document.all["RantTaxTextBoxHouseContract_" + i].focus();
            return false;
        }


        RantTaxCityList += '~' + gatheringRantTaxArray[i].gt_RantTax_HouseCityID;
        RantTaxAddressList += '~' + gatheringRantTaxArray[i].gt_RantTax_Address;
        RantTaxContractStartList += '~' + gatheringRantTaxArray[i].gt_RantTax_ContractStart;
        RantTaxContractEndList += '~' + gatheringRantTaxArray[i].gt_RantTax_ContractEnd;
        RantTaxMonthRentList += '~' + gatheringRantTaxArray[i].gt_RantTax_MonthRent;
        RantTaxOrderNoList += '~' + gatheringRantTaxArray[i].gt_RantTax_OrderNo;
        //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
        RantTaxHouseOwner += '~' + gatheringRantTaxArray[i].gt_RantTax_HouseOwner;
        RantTaxLargestNumberIn += '~' + gatheringRantTaxArray[i].gt_RantTax_LargestNumberIn;
        //20130529 mfj  增加列：合同Id 合同Code
        RantTaxContractId += '~' + gatheringRantTaxArray[i].gt_RantTax_HouseContractID;
        RantTaxContractCode += '~' + gatheringRantTaxArray[i].gt_RantTax_HouseContract;
        RantTaxCityText += '~' + gatheringRantTaxArray[i].gt_RantTax_City;

    }

    RantTaxCityList = RantTaxCityList.substr(1);
    RantTaxAddressList = RantTaxAddressList.substr(1);
    RantTaxContractStartList = RantTaxContractStartList.substr(1);
    RantTaxContractEndList = RantTaxContractEndList.substr(1);
    RantTaxMonthRentList = RantTaxMonthRentList.substr(1);
    RantTaxOrderNoList = RantTaxOrderNoList.substr(1);
    //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
    RantTaxHouseOwner = RantTaxHouseOwner.substr(1);
    RantTaxLargestNumberIn = RantTaxLargestNumberIn.substr(1);
    //20130529 mfj  增加列：合同Id 合同Code
    RantTaxContractId = RantTaxContractId.substr(1);
    RantTaxContractCode = RantTaxContractCode.substr(1);
    RantTaxCityText = RantTaxCityText.substr(1);

    document.all.hiddenRantTaxInfo.value =
														  RantTaxCityList + "|"
														+ RantTaxAddressList + "|"
														+ RantTaxContractStartList + "|"
														+ RantTaxContractEndList + "|"
                                                        + RantTaxHouseOwner + "|"
														+ RantTaxMonthRentList + "|"
                                                        + RantTaxLargestNumberIn + "|"
														+ RantTaxOrderNoList + "|"
                                                        + RantTaxContractId + "|"
                                                        + RantTaxContractCode + "|"
                                                        + RantTaxCityText;
}
//追加行
function refreshRantTaxData() {
    //删除原来的行
    var rowCount = RantTaxTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        RantTaxTable.deleteRow(1);
    }
    var MaxCells = RantTaxTable.rows[0].cells.length;

    for (var i = 0; i < gatheringRantTaxArray.length; i++) {
        var newRow = RantTaxTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = gatheringRantTaxArray[i].gt_RantTax_OrderNo;
                    cell.align = "center";
                    break;
                case 1: //选择合同号
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='RantTaxHouseContractID_" + i + "' value='" + gatheringRantTaxArray[i].gt_RantTax_HouseContractID + "' style=\"height:40px\"><input type='text' id='RantTaxTextBoxHouseContract_" + i + "' value='" + gatheringRantTaxArray[i].gt_RantTax_HouseContract + "' style=\"width:80%;\" readonly  >";

                    var objHiddenContractID = "RantTaxHouseContractID_" + i;
                    var objContractID = "RantTaxTextBoxHouseContract_" + i;
                    var objCityText = "RantTaxTextBoxHouseCity_" + i;
                    var objCityID = "RantTaxHouseCityID_" + i;
                    var objAddress = "RantTaxTextBoxAddress_" + i;
                    var objStartDate = "RantTaxTextBoxContractStart_" + i;
                    var objEndDate = "RantTaxTextBoxContractEnd_" + i;
                    var objOwner = "RantTaxTextBoxHouseOwner_" + i;
                    var objMonthlyRent = "RantTaxTextBoxMonthRent_" + i;
                    var objMaxNumber = "RantTaxTextBoxLargestNumberIn_" + i;

                    var obj = "RantTaxTextBoxHouseContract_" + i;
                    cell.innerHTML += "<IMG id='imgQuery_" + i + "' onclick=\"QueryContractInfo('" + objHiddenContractID + "','" + objContractID + "','" + objCityID + "','" + objCityText + "','" + objAddress + "','" + objStartDate + "','" + objEndDate + "','" + objOwner + "','" + objMonthlyRent + "','" + objMaxNumber + "','" + i + "','2')\" style='CURSOR: hand;' src='../../images/searchicon_enabled.gif' align='absBottom'>";
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringRantTaxArray[i].gt_RantTax_HouseContract;
                    }
                    break;
                case 2: //城市
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='RantTaxHouseCityID_" + i + "' value='" + gatheringRantTaxArray[i].gt_RantTax_HouseCityID + "' style=\"height:40px\"><input type='text' id='RantTaxTextBoxHouseCity_" + i + "' value='" + gatheringRantTaxArray[i].gt_RantTax_City + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;
                case 3: //房屋租住地址
                    cell.innerHTML = "<input type='text' id='RantTaxTextBoxAddress_" + i + "' value='" + gatheringRantTaxArray[i].gt_RantTax_Address + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 4: //合同开始日期
                    cell.innerHTML = "<input type='text' id='RantTaxTextBoxContractStart_" + i + "' value='" + gatheringRantTaxArray[i].gt_RantTax_ContractStart + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 5: //合同结束日期
                    cell.innerHTML = "<input type='text' id='RantTaxTextBoxContractEnd_" + i + "' value='" + gatheringRantTaxArray[i].gt_RantTax_ContractEnd + "' style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 6: //房东
                    cell.innerHTML = "<input type='text' id='RantTaxTextBoxHouseOwner_" + i + "' value='" + gatheringRantTaxArray[i].gt_RantTax_HouseOwner + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 7: //月租金
                    cell.innerHTML = "<input maxlength='10'   type='text'  id='RantTaxTextBoxMonthRent_" + i + "'  value='" + gatheringRantTaxArray[i].gt_RantTax_MonthRent + "'   style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 8: //最大入住人数
                    cell.innerHTML = "<input maxlength='10' type='text' id='RantTaxTextBoxLargestNumberIn_" + i + "' value='" + gatheringRantTaxArray[i].gt_RantTax_LargestNumberIn + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;
                case 9: //删除
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteRantTaxRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
}
//删除选定行
function deleteRantTaxRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringRantTaxArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringRantTaxArray[i];
            tempArray[j].gt_RantTax_OrderNo = j + 1;
            j++;
        }
    }

    gatheringRantTaxArray = tempArray;
    refreshRantTaxData();
}


//add日常用品及生活维修
var gatheringMaintainArray = new Array();
function addMaintainRow() {
    var index = gatheringMaintainArray.length;
    //20130524
    gatheringMaintainArray[index] = new jsMaintainGathering(index + 1, '', '', '', '', '', '', '', '', '', '');
    refreshMaintainData();
}
//删除选定行
function deleteMaintainRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringMaintainArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringMaintainArray[i];
            tempArray[j].gt_Maintain_OrderNo = j + 1;
            j++;
        }
    }

    gatheringMaintainArray = tempArray;
    refreshMaintainData();
}
function MaintainItemSubmit() {
    var MaintainCityList = '';
    var MaintainAddressList = '';
    var MaintainContractStartList = '';
    var MaintainContractEndList = '';
    var MaintainMonthRentList = '';
    var MaintainOrderNoList = '';
    var MaintainHouseOwner = '';
    var MaintainLargestNumberIn = '';
    //20130529增加合同编码 合同id
    var MaintainContractId = '';
    var MaintainContractCode = '';
    var MaintainCityText = '';


    for (var i = 0; i < gatheringMaintainArray.length; i++) {
        var index = i + 1;
        //省市
        if (Trim(gatheringMaintainArray[i].gt_Maintain_City).length <= 0) {
            alert("日常用品及生活维修支付明细第“" + index + "”行的省市不能为空");
            document.all["MaintainTextBoxHouseCity_" + i].focus();
            return false;
        }
        if (gatheringMaintainArray[i].gt_Maintain_City.indexOf("~") != -1 || gatheringMaintainArray[i].gt_Maintain_City.indexOf("|") != -1) {
            alert('日常用品及生活维修支付明细第“' + index + '”行的省市字符“~”，“|”为非法字符，请重新输入。');
            document.all["MaintainTextBoxHouseCity_" + i].focus();
            return false;
        }
        //房屋租住地址
        if (Trim(gatheringMaintainArray[i].gt_Maintain_Address).length <= 0) {
            alert("日常用品及生活维修支付明细第“" + index + "”行的房屋租住地址不能为空");
            document.all["MaintainTextBoxAddress_" + i].focus();
            return false;
        }
        if (gatheringMaintainArray[i].gt_Maintain_Address.indexOf("~") != -1 || gatheringMaintainArray[i].gt_Maintain_Address.indexOf("|") != -1) {
            alert('日常用品及生活维修支付明细第“' + index + '”行的房屋租住地址字符“~”，“|”为非法字符，请重新输入。');
            document.all["MaintainTextBoxAddress_" + i].focus();
            return false;
        }
        //合同开始日期
        if (gatheringMaintainArray[i].gt_Maintain_ContractStart == '') {
            alert("日常用品及生活维修支付明细第“" + index + "”行的合同开始日期不能为空");
            document.all["MaintainTextBoxContractStart_" + i].focus();
            return false;
        }
        //合同结束日期
        if (gatheringMaintainArray[i].gt_Maintain_ContractEnd == '') {
            alert("日常用品及生活维修支付明细第“" + index + "”行的合同结束日期不能为空");
            document.all["MaintainTextBoxContractEnd_" + i].focus();
            return false;
        }
        //月租金
        if (gatheringMaintainArray[i].gt_Maintain_MonthRent == '') {
            alert("日常用品及生活维修支付明细第“" + index + "”行的月租金不能为空");
            document.all["MaintainTextBoxMonthRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringMaintainArray[i].gt_Maintain_MonthRent)) {
                alert("日常用品及生活维修支付明细第“" + index + "”行的月租金不正确");
                document.all["MaintainTextBoxMonthRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringMaintainArray[i].gt_Maintain_MonthRent < 0) {
                    alert("日常用品及生活维修支付明细第“" + index + "”行的月租金不能小于等于零");
                    document.all["MaintainTextBoxMonthRent_" + i].focus();
                    return false;
                }
            }
        }
        //20120515 wanghk 增加列：房东 gt_Maintain_HouseOwner
        if ((gatheringMaintainArray[i].gt_Maintain_HouseOwner).length <= 0) {
            alert("日常用品及生活维修支付明细第“" + index + "”行的房东不能为空，请重新输入。");
            document.all["MaintainTextBoxHouseOwner_" + i].focus();
            return false;
        }
        if (gatheringMaintainArray[i].gt_Maintain_HouseOwner.indexOf("~") != -1 || gatheringMaintainArray[i].gt_Maintain_HouseOwner.indexOf("|") != -1) {
            alert('日常用品及生活维修支付明细第“' + index + '”行的房东字符“~”，“|”为非法字符，请重新输入。');
            document.all["MaintainTextBoxHouseOwner_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：最大入住人数 gt_Maintain_LargestNumberIn
        if ((gatheringMaintainArray[i].gt_Maintain_LargestNumberIn).length <= 0) {
            alert("日常用品及生活维修支付明细第“" + index + "”行的最大入住人数不能为空，请重新输入。");
            document.all["MaintainTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if (gatheringMaintainArray[i].gt_Maintain_LargestNumberIn.indexOf("~") != -1 || gatheringMaintainArray[i].gt_Maintain_LargestNumberIn.indexOf("|") != -1) {
            alert('日常用品及生活维修支付明细第“' + index + '”行的最大入住人数字符“~”，“|”为非法字符，请重新输入。');
            document.all["MaintainTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if ((gatheringMaintainArray[i].gt_Maintain_HouseContract).length <= 0) {
            alert("日常用品及生活维修支付明细第“" + index + "”行的合同不能为空，请选择");
            document.all["MaintainTextBoxHouseContract_" + i].focus();
            return false;
        }


        MaintainCityList += '~' + gatheringMaintainArray[i].gt_Maintain_HouseCityID;
        MaintainAddressList += '~' + gatheringMaintainArray[i].gt_Maintain_Address;
        MaintainContractStartList += '~' + gatheringMaintainArray[i].gt_Maintain_ContractStart;
        MaintainContractEndList += '~' + gatheringMaintainArray[i].gt_Maintain_ContractEnd;
        MaintainMonthRentList += '~' + gatheringMaintainArray[i].gt_Maintain_MonthRent;
        MaintainOrderNoList += '~' + gatheringMaintainArray[i].gt_Maintain_OrderNo;
        //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
        MaintainHouseOwner += '~' + gatheringMaintainArray[i].gt_Maintain_HouseOwner;
        MaintainLargestNumberIn += '~' + gatheringMaintainArray[i].gt_Maintain_LargestNumberIn;
        //20130529 mfj  增加列：合同Id 合同Code
        MaintainContractId += '~' + gatheringMaintainArray[i].gt_Maintain_HouseContractID;
        MaintainContractCode += '~' + gatheringMaintainArray[i].gt_Maintain_HouseContract;
        MaintainCityText += '~' + gatheringMaintainArray[i].gt_Maintain_City;

    }

    MaintainCityList = MaintainCityList.substr(1);
    MaintainAddressList = MaintainAddressList.substr(1);
    MaintainContractStartList = MaintainContractStartList.substr(1);
    MaintainContractEndList = MaintainContractEndList.substr(1);
    MaintainMonthRentList = MaintainMonthRentList.substr(1);
    MaintainOrderNoList = MaintainOrderNoList.substr(1);
    //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
    MaintainHouseOwner = MaintainHouseOwner.substr(1);
    MaintainLargestNumberIn = MaintainLargestNumberIn.substr(1);
    //20130529 mfj  增加列：合同Id 合同Code
    MaintainContractId = MaintainContractId.substr(1);
    MaintainContractCode = MaintainContractCode.substr(1);
    MaintainCityText = MaintainCityText.substr(1);

    document.all.hiddenMaintainInfo.value =
														  MaintainCityList + "|"
														+ MaintainAddressList + "|"
														+ MaintainContractStartList + "|"
														+ MaintainContractEndList + "|"
                                                        + MaintainHouseOwner + "|"
														+ MaintainMonthRentList + "|"
                                                        + MaintainLargestNumberIn + "|"
														+ MaintainOrderNoList + "|"
                                                        + MaintainContractId + "|"
                                                        + MaintainContractCode + "|"
                                                        + MaintainCityText;
}
//追加行
function refreshMaintainData() {
    //删除原来的行
    var rowCount = MaintainTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        MaintainTable.deleteRow(1);
    }
    var MaxCells = MaintainTable.rows[0].cells.length;

    for (var i = 0; i < gatheringMaintainArray.length; i++) {
        var newRow = MaintainTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = gatheringMaintainArray[i].gt_Maintain_OrderNo;
                    cell.align = "center";
                    break;
                case 1: //选择合同号
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='MaintainHouseContractID_" + i + "' value='" + gatheringMaintainArray[i].gt_Maintain_HouseContractID + "' style=\"height:40px\"><input type='text' id='MaintainTextBoxHouseContract_" + i + "' value='" + gatheringMaintainArray[i].gt_Maintain_HouseContract + "' style=\"width:80%;\" readonly  >";

                    var objHiddenContractID = "MaintainHouseContractID_" + i;
                    var objContractID = "MaintainTextBoxHouseContract_" + i;
                    var objCityText = "MaintainTextBoxHouseCity_" + i;
                    var objCityID = "MaintainHouseCityID_" + i;
                    var objAddress = "MaintainTextBoxAddress_" + i;
                    var objStartDate = "MaintainTextBoxContractStart_" + i;
                    var objEndDate = "MaintainTextBoxContractEnd_" + i;
                    var objOwner = "MaintainTextBoxHouseOwner_" + i;
                    var objMonthlyRent = "MaintainTextBoxMonthRent_" + i;
                    var objMaxNumber = "MaintainTextBoxLargestNumberIn_" + i;

                    var obj = "MaintainTextBoxHouseContract_" + i;
                    cell.innerHTML += "<IMG id='imgQuery_" + i + "' onclick=\"QueryContractInfo('" + objHiddenContractID + "','" + objContractID + "','" + objCityID + "','" + objCityText + "','" + objAddress + "','" + objStartDate + "','" + objEndDate + "','" + objOwner + "','" + objMonthlyRent + "','" + objMaxNumber + "','" + i + "','1')\" style='CURSOR: hand;' src='../../images/searchicon_enabled.gif' align='absBottom'>";
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringMaintainArray[i].gt_Maintain_HouseContract;
                    }
                    break;
                case 2: //城市
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='MaintainHouseCityID_" + i + "' value='" + gatheringMaintainArray[i].gt_Maintain_HouseCityID + "' style=\"height:40px\"><input type='text' id='MaintainTextBoxHouseCity_" + i + "' value='" + gatheringMaintainArray[i].gt_Maintain_City + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;
                case 3: //房屋租住地址
                    cell.innerHTML = "<input type='text' id='MaintainTextBoxAddress_" + i + "' value='" + gatheringMaintainArray[i].gt_Maintain_Address + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 4: //合同开始日期
                    cell.innerHTML = "<input type='text' id='MaintainTextBoxContractStart_" + i + "' value='" + gatheringMaintainArray[i].gt_Maintain_ContractStart + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 5: //合同结束日期
                    cell.innerHTML = "<input type='text' id='MaintainTextBoxContractEnd_" + i + "' value='" + gatheringMaintainArray[i].gt_Maintain_ContractEnd + "' style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 6: //房东
                    cell.innerHTML = "<input type='text' id='MaintainTextBoxHouseOwner_" + i + "' value='" + gatheringMaintainArray[i].gt_Maintain_HouseOwner + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 7: //月租金
                    cell.innerHTML = "<input maxlength='10'   type='text'  id='MaintainTextBoxMonthRent_" + i + "'  value='" + gatheringMaintainArray[i].gt_Maintain_MonthRent + "'   style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 8: //最大入住人数
                    cell.innerHTML = "<input maxlength='10' type='text' id='MaintainTextBoxLargestNumberIn_" + i + "' value='" + gatheringMaintainArray[i].gt_Maintain_LargestNumberIn + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;
                case 9: //删除
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteMaintainRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
}
//存储租金费用信息 20101215 chaidanlei 付款金额和付款租期（起止日）交换位置
function jsHouseRentGathering(jOrderNo, jProjectTeam, jCity, jAddress, jContractStart, jContractEnd, jMonthRent, jHireStart, jHireEnd, jAllRent, jHouseOwner, jLargestNumberIn, jPayNature, jLeaseNature, jDetailNature, jContractNO) {
    this.gt_HouseRent_OrderNo = jOrderNo;
    this.gt_HouseRent_ProjectTeam = jProjectTeam;
    this.gt_HouseRent_City = jCity;
    this.gt_HouseRent_Address = jAddress;
    this.gt_HouseRent_ContractStart = jContractStart;
    this.gt_HouseRent_ContractEnd = jContractEnd;
    this.gt_HouseRent_MonthRent = jMonthRent;
    this.gt_HouseRent_HireStart = jHireStart;
    this.gt_HouseRent_HireEnd = jHireEnd;
    this.gt_HouseRent_AllRent = jAllRent; //付款金额和付款租期（起止日）交换位置
    // this.gt_HouseRent_IsShareByRentPeriod = jShareByRentPeriod; //增加列：是否按租期分摊

    //增加列 房东，最大入住人数，缴费性质，租赁性质，明细性质，合同编号
    this.gt_HouseRent_HouseOwner = jHouseOwner;
    this.gt_HouseRent_LargestNumberIn = jLargestNumberIn;
    this.gt_HouseRent_PayNature = jPayNature;

}
//20130529  mfj 
function jsHouseRentGathering2(
jOrderNo, jProjectTeam, ContractId, ContractName,
jCityID, jCity, jAddress, jContractStart,
jContractEnd, jMonthRent, jHireStart, jHireEnd,
 jAllRent, jHouseOwner,
jLargestNumberIn, jPayNature,
 jTaxNo, jLeaseNature) {
    this.gt_HouseRent_OrderNo = jOrderNo;
    this.gt_HouseRent_ProjectTeam = jProjectTeam;
    this.gt_HouseRent_HouseContractID = ContractId;
    this.gt_HouseRent_HouseContract = ContractName;
    this.gt_HouseRent_HouseCityID = jCityID;
    this.gt_HouseRent_City = jCity;
    this.gt_HouseRent_Address = jAddress;
    this.gt_HouseRent_ContractStart = jContractStart;
    this.gt_HouseRent_ContractEnd = jContractEnd;
    this.gt_HouseRent_MonthRent = jMonthRent;
    this.gt_HouseRent_HireStart = jHireStart;
    this.gt_HouseRent_HireEnd = jHireEnd;
    this.gt_HouseRent_AllRent = jAllRent; //付款金额和付款租期（起止日）交换位置
    //this.gt_HouseRent_IsShareByRentPeriod = jShareByRentPeriod; //增加列：是否按租期分摊

    //增加列 房东，最大入住人数，缴费性质，租赁性质，明细性质，合同编号
    this.gt_HouseRent_HouseOwner = jHouseOwner;
    this.gt_HouseRent_LargestNumberIn = jLargestNumberIn;
    this.gt_HouseRent_PayNature = jPayNature;
    this.gt_HouseRent_TaxNo = jTaxNo;
    //租赁性质
    this.gt_HouseRent_LeaseNature = jLeaseNature;
}
//日常用品及生活维修
function jsMaintainGathering(jOrderNo, ContractId, ContractName, jCityID, jCity, jAddress, jContractStart, jContractEnd, jHouseOwner, jRent, jLargestNumberIn) {
    this.gt_Maintain_OrderNo = jOrderNo;
    this.gt_Maintain_HouseContractID = ContractId;
    this.gt_Maintain_HouseContract = ContractName;
    this.gt_Maintain_HouseCityID = jCityID;
    this.gt_Maintain_City = jCity;
    this.gt_Maintain_Address = jAddress;
    this.gt_Maintain_ContractStart = jContractStart;
    this.gt_Maintain_ContractEnd = jContractEnd;
    this.gt_Maintain_MonthRent = jRent;

    // 房东，最大入住人数
    this.gt_Maintain_HouseOwner = jHouseOwner;
    this.gt_Maintain_LargestNumberIn = jLargestNumberIn;
}

//根据数组（gatheringHouseRentArray）显示界面
function refreshHouseRentData() {
    //删除原来的行
    var rowCount = HouseRentTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        HouseRentTable.deleteRow(1);
    }
    var MaxCells = HouseRentTable.rows[0].cells.length;

    for (var i = 0; i < gatheringHouseRentArray.length; i++) {
        var newRow = HouseRentTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = gatheringHouseRentArray[i].gt_HouseRent_OrderNo;
                    cell.align = "center";
                    break;
                case 1: //项目组
                    cell.noWrap = true;
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=100 onblur='javascript:setHouseRentProjectTeam(" + i + ");'  id='HouseRentTextBoxProjectTeam_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "HouseRentTextBoxProjectTeam_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringHouseRentArray[i].gt_HouseRent_ProjectTeam;
                    }
                    break;
                case 2: //省市，存的是guid，勿动
                    var cityVal = document.getElementById('hiddenCityVal').value;
                    //alert(cityVal)
                    var selectIsShare = "<select name='HouseRentTextBoxCity_" + i + "' id='HouseRentTextBoxCity_" + i + "' onblur='javascript:setHouseRentCity(" + i + ");' onchange='javascript:setHouseRentCity(" + i + ");' style=\"width:98%;\"><option value=''>请选择</option>";
                    if (gatheringHouseRentArray[i].gt_HouseRent_City != "") {
                        if (cityVal != "" && cityVal.split("~").length > 0) {
                            for (var n = 0; n < cityVal.split("~").length; n = n + 2) {
                                if (gatheringHouseRentArray[i].gt_HouseRent_City == cityVal.split("~")[n])
                                    selectIsShare += "<option value='" + cityVal.split("~")[n] + "' selected>" + cityVal.split("~")[n + 1] + "</option>";
                                else
                                    selectIsShare += "<option value='" + cityVal.split("~")[n] + "'>" + cityVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    else {
                        if (cityVal != "" && cityVal.split("~").length > 0) {
                            for (var n = 0; n < cityVal.split("~").length; n = n + 2) {
                                selectIsShare += "<option value='" + cityVal.split("~")[n] + "'>" + cityVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    selectIsShare += "</select>";
                    cell.innerHTML = selectIsShare;
                    break;
                //                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=100 onblur='javascript:setHouseRentCity(" + i + ");'  id='HouseRentTextBoxCity_" + i + "' style=\"width:99%\" ></TEXTAREA>";       
                //                    var obj = "HouseRentTextBoxCity_" + i;       
                //                    if (document.getElementById(obj)) {       
                //                        document.getElementById(obj).value = gatheringHouseRentArray[i].gt_HouseRent_City;       
                //                    }       
                //                    break;       
                case 3: //房屋租住地址
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=250 onblur='javascript:setHouseRentAddress(" + i + ");'  id='HouseRentTextBoxAddress_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "HouseRentTextBoxAddress_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringHouseRentArray[i].gt_HouseRent_Address;
                    }
                    break;
                case 4: //合同开始日期
                    var dateID = "HouseRentTextBoxContractStart_" + i;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:90'  id=\"HouseRentTextBoxContractStart_" + i + "\" value=\"" + gatheringHouseRentArray[i].gt_HouseRent_ContractStart + "\" onblur='javascript:CheckDateFormat(this);setHouseRentContractStart(" + i + ");' onfocus='javascript:setHouseRentContractStart(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=HouseRentTextBoxContractStart_" + i + "','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input class='Wdate' autocomplete='off' style='width:90' id='" + dateID + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_ContractStart + "' " +
                        " onblur=\"javascript:setHouseRentContractStart(" + i + ");\" onfocus=\"javascript:setHouseRentContractStart(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">"
                       ;
                    break;
                case 5: //合同结束日期
                    var dateID = "HouseRentTextBoxContractEnd_" + i;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:90'  id=\"HouseRentTextBoxContractEnd_" + i + "\" value=\"" + gatheringHouseRentArray[i].gt_HouseRent_ContractEnd + "\" onblur='javascript:CheckDateFormat(this);setHouseRentContractEnd(" + i + ");' onfocus='javascript:setHouseRentContractEnd(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=HouseRentTextBoxContractEnd_" + i + "','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input   autocomplete='off' class='Wdate' style='width:90' id='" + dateID + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_ContractEnd + "' " +
                        " onblur=\"javascript:setHouseRentContractEnd(" + i + ");\" onfocus=\"javascript:setHouseRentContractEnd(" + i + ");\" onclick=\" WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">"
                        ;
                    break;
                //房东       
                case 6: //房东
                    cell.innerHTML = "<input  onblur='javascript:setHouseRentHouseOwner(" + i + ");' type='text' id='HouseRentTextBoxHouseOwner_" + i + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_HouseOwner + "' style=\"width:100%;\" >";
                    break;

                case 7: //月租金
                    cell.innerHTML = "<input maxlength='10' onblur='javascript:setHouseRentMonthRent(" + i + ");' type='text' id='HouseRentTextBoxMonthRent_" + i + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_MonthRent + "' style=\"width:100%;\" onKeypress='javascript:OnlyNumber();'>";
                    break;

                case 8: //最大入住人数
                    cell.innerHTML = "<input maxlength='10' onblur='javascript:setHouseRentLargestNumberIn(" + i + ");' type='text' id='HouseRentTextBoxLargestNumberIn_" + i + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_LargestNumberIn + "' style=\"width:100%;\" onKeypress='javascript:OnlyNumber();'>";
                    break;
                //20101215 chaidanlei 付款金额和付款租期（起止日）交换位置        
                case 9: //租期开始日期
                    var dateID = "HouseRentTextBoxHireStart_" + i;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:90'  id=\"HouseRentTextBoxHireStart_" + i + "\" value=\"" + gatheringHouseRentArray[i].gt_HouseRent_HireStart + "\" onblur='javascript:CheckDateFormat(this);setHouseRentHireStart(" + i + ");' onfocus='javascript:setHouseRentHireStart(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=HouseRentTextBoxHireStart_" + i + "','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input class='Wdate' autocomplete='off'  style='width:90' id='" + dateID + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_HireStart + "' " +
                        " onblur=\"javascript:setHouseRentHireStart(" + i + ");\" onfocus=\"javascript:setHouseRentHireStart(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">"
                        ;
                    break;
                case 10: //租期结束日期
                    var dateID = "HouseRentTextBoxHireEnd_" + i;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:90'  id=\"HouseRentTextBoxHireEnd_" + i + "\" value=\"" + gatheringHouseRentArray[i].gt_HouseRent_HireEnd + "\" onblur='javascript:CheckDateFormat(this);setHouseRentHireEnd(" + i + ");' onfocus='javascript:setHouseRentHireEnd(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=HouseRentTextBoxHireEnd_" + i + "','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input   autocomplete='off' class='Wdate' style='width:90' id='" + dateID + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_HireEnd + "' " +
                        " onblur=\"javascript:setHouseRentHireEnd(" + i + ");\" onfocus=\"javascript:setHouseRentHireEnd(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">"
                        ;
                    break;
                case 11: //付款金额
                    cell.innerHTML = "<input maxlength='10' onblur='javascript:setHouseRentAllRent(" + i + ");' type='text' id='HouseRentTextBoxAllRent_" + i + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_AllRent + "' style=\"width:100%;\" onKeypress='javascript:OnlyNumber();calHouseRentSum();'>";
                    break;
                /* case 12: //是否按租期分摊
                var selectIsShare = "<select name='ShareByRentPeriod_" + i + "' id='ShareByRentPeriod_" + i + "' onblur='javascript:setHouseRentIsShareByRentPeriod(" + i + ");' onchange='javascript:setHouseRentIsShareByRentPeriod(" + i + ");' style=\"width:98%;\"><option value=''>请选择</option>";
                if (gatheringHouseRentArray[i].gt_HouseRent_IsShareByRentPeriod != "") {
                if (gatheringHouseRentArray[i].gt_HouseRent_IsShareByRentPeriod == "1") {
                selectIsShare += "<option value='1' selected>是</option>";
                selectIsShare += "<option value='0'>否</option>";
                }
                else {
                selectIsShare += "<option value='1'>是</option>";
                selectIsShare += "<option value='0' selected>否</option>";
                }
                }
                else {
                selectIsShare += "<option value='1'>是</option>";
                selectIsShare += "<option value='0'>否</option>";
                }
                selectIsShare += "</select>";
                cell.innerHTML = selectIsShare;
                //cell.innerHTML="<input maxlength='10' onblur='javascript:setHouseRentIsShareByRentPeriod("+i+");' type='text' id='ShareByRentPeriod_"+ i +"' value='"+ gatheringHouseRentArray[i].gt_HouseRent_IsShareByRentPeriod +"' style=\"width:100%;\">";
                break;*/ 
                case 12: //缴费性质
                    var payNatureVal = document.getElementById('hiddenPayNatureVal').value;
                    var selectIsShare = "<select name='PayNature_" + i + "' id='PayNature_" + i + "' onblur='javascript:setHouseRentPayNature(" + i + ");' onchange='javascript:setHouseRentPayNature(" + i + ");' style=\"width:98%;\"><option value=''>请选择</option>";
                    if (gatheringHouseRentArray[i].gt_HouseRent_PayNature != "") {
                        if (payNatureVal != "" && payNatureVal.split("~").length > 0) {
                            for (var n = 0; n < payNatureVal.split("~").length; n = n + 2) {
                                if (gatheringHouseRentArray[i].gt_HouseRent_PayNature == payNatureVal.split("~")[n])
                                    selectIsShare += "<option value='" + payNatureVal.split("~")[n] + "' selected>" + payNatureVal.split("~")[n + 1] + "</option>";
                                else
                                    selectIsShare += "<option value='" + payNatureVal.split("~")[n] + "'>" + payNatureVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    else {
                        if (payNatureVal != "" && payNatureVal.split("~").length > 0) {
                            for (var n = 0; n < payNatureVal.split("~").length; n = n + 2) {
                                selectIsShare += "<option value='" + payNatureVal.split("~")[n] + "'>" + payNatureVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    selectIsShare += "</select>";
                    cell.innerHTML = selectIsShare;
                    break;
                case 13: //租赁性质
                    var leaseNatureVal = document.getElementById('hiddenLeaseNatureVal').value;
                    var selectIsShare = "<select name='LeaseNature_" + i + "' id='LeaseNature_" + i + "' onblur='javascript:setHouseRentLeaseNature(" + i + ");' onchange='javascript:setHouseRentLeaseNature(" + i + ");' style=\"width:98%;\"><option value=''>请选择</option>";
                    if (gatheringHouseRentArray[i].gt_HouseRent_LeaseNature != "") {
                        if (leaseNatureVal != "" && leaseNatureVal.split("~").length > 0) {
                            for (var n = 0; n < leaseNatureVal.split("~").length; n = n + 2) {
                                if (gatheringHouseRentArray[i].gt_HouseRent_LeaseNature == leaseNatureVal.split("~")[n])
                                    selectIsShare += "<option value='" + leaseNatureVal.split("~")[n] + "' selected>" + leaseNatureVal.split("~")[n + 1] + "</option>";
                                else
                                    selectIsShare += "<option value='" + leaseNatureVal.split("~")[n] + "'>" + leaseNatureVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    else {
                        if (leaseNatureVal != "" && leaseNatureVal.split("~").length > 0) {
                            for (var n = 0; n < leaseNatureVal.split("~").length; n = n + 2) {
                                selectIsShare += "<option value='" + leaseNatureVal.split("~")[n] + "'>" + leaseNatureVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    selectIsShare += "</select>";
                    cell.innerHTML = selectIsShare;
                    break;
                case 14: //删除
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteHouseRentRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
    calHouseRentSum();

}
function setExpType(expType) {
    document.getElementById('hiddenExpType').value = expType;
} 
//////////////////////////////////////////20130524 mfj////////////////////////////////////////////////
function refreshHouseRentData2() {
    //删除原来的行
    var rowCount = HouseRentTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        HouseRentTable.deleteRow(1);
    }
    var MaxCells = HouseRentTable.rows[0].cells.length;

    for (var i = 0; i < gatheringHouseRentArray.length; i++) {
        var newRow = HouseRentTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = gatheringHouseRentArray[i].gt_HouseRent_OrderNo;
                    cell.align = "center";
                    break;
                case 1: //项目组
                    cell.noWrap = true;
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=100 onblur='javascript:setHouseRentProjectTeam(" + i + ");'  id='HouseRentTextBoxProjectTeam_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "HouseRentTextBoxProjectTeam_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringHouseRentArray[i].gt_HouseRent_ProjectTeam;
                    }
                    break;

                case 2: //选择合同号
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='HouseContractID_" + i + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_HouseContractID + "' style=\"height:40px\"><input type='text' id='HouseRentTextBoxHouseContract_" + i + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_HouseContract + "' style=\"width:80%;\" readonly  >";

                    var objHiddenContractID = "HouseContractID_" + i;
                    var objContractID = "HouseRentTextBoxHouseContract_" + i;
                    var objCityText = "HouseRentTextBoxHouseCity_" + i;
                    var objCityID = "HouseCityID_" + i;
                    var objAddress = "HouseRentTextBoxAddress_" + i;
                    var objStartDate = "HouseRentTextBoxContractStart_" + i;
                    var objEndDate = "HouseRentTextBoxContractEnd_" + i;
                    var objOwner = "HouseRentTextBoxHouseOwner_" + i;
                    var objMonthlyRent = "HouseRentTextBoxMonthRent_" + i;
                    var objMaxNumber = "HouseRentTextBoxLargestNumberIn_" + i;
                    var objHouseType = "PayNature_" + i;
                    var objLeaseNature = "LeaseNature_" + i;

                    var obj = "HouseRentTextBoxHouseContract_" + i;
                    cell.innerHTML += "<IMG id='imgQuery_" + i + "' onclick=\"QueryContractInfo('" + objHiddenContractID + "','" + objContractID + "','" + objCityID + "','" + objCityText + "','" + objAddress + "','" + objStartDate + "','" + objEndDate + "','" + objOwner + "','" + objMonthlyRent + "','" + objMaxNumber + "','" + i + "','','" + objHouseType + "','" + objLeaseNature + "')\" style='CURSOR: hand;' src='../../images/searchicon_enabled.gif' align='absBottom'>";
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringHouseRentArray[i].gt_HouseRent_HouseContract;
                    }
                    break;
                case 3: //城市
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='HouseCityID_" + i + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_HouseCityID + "' style=\"height:40px\"><input type='text' id='HouseRentTextBoxHouseCity_" + i + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_City + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;
                case 4: //房屋租住地址
                    cell.innerHTML = "<input type='text' id='HouseRentTextBoxAddress_" + i + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_Address + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 5: //合同开始日期
                    cell.innerHTML = "<input type='text' id='HouseRentTextBoxContractStart_" + i + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_ContractStart + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 6: //合同结束日期
                    cell.innerHTML = "<input type='text' id='HouseRentTextBoxContractEnd_" + i + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_ContractEnd + "' style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 7: //房东
                    cell.innerHTML = "<input type='text' id='HouseRentTextBoxHouseOwner_" + i + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_HouseOwner + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 8: //月租金
                    cell.innerHTML = "<input maxlength='10'   type='text'  id='HouseRentTextBoxMonthRent_" + i + "'  value='" + gatheringHouseRentArray[i].gt_HouseRent_MonthRent + "'   style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 9: //最大入住人数
                    cell.innerHTML = "<input maxlength='10' type='text' id='HouseRentTextBoxLargestNumberIn_" + i + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_LargestNumberIn + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 10: //租期开始日期
                    var dateID = "HouseRentTextBoxHireStart_" + i;
                    cell.noWrap = true;
                    cell.innerHTML = "<input class='Wdate' autocomplete='off' style='width:90' id='" + dateID + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_HireStart + "' " +
                        " onchange=\"javascript:checkHouseRentHireStart(" + i + ");setHouseRentHireStart(" + i + ");\" onfocus=\"javascript:setHouseRentHireStart(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">"
                        ;
                    break;
                case 11: //租期结束日期
                    var dateID = "HouseRentTextBoxHireEnd_" + i;
                    cell.noWrap = true;
                    cell.innerHTML = "<input   autocomplete='off' class='Wdate' style='width:90' id='" + dateID + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_HireEnd + "' " +
                        " onchange=\"javascript:checkHouseRentHireEnd(" + i + ");setHouseRentHireEnd(" + i + ");\" onfocus=\"javascript:setHouseRentHireEnd(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">"
                       ;
                    break;
                case 12: //付款金额
                    cell.innerHTML = "<input maxlength='10' onblur='javascript:setHouseRentAllRent(" + i + ");' type='text' id='HouseRentTextBoxAllRent_" + i + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_AllRent + "' style=\"width:100%;\" onKeypress='javascript:OnlyNumber();calHouseRentSum();'>";
                    break;
                case 13: //发票号
                    cell.innerHTML = "<input maxlength='15' onchange='javascript:setHouseRentTaxNo(" + i + ");' type='text' id='HouseRentTextBoxTaxNo_" + i + "' value='" + gatheringHouseRentArray[i].gt_HouseRent_TaxNo + "' style=\"width:100%\">";
                    break;
                case 14: //缴费性质                   
                    //cell.innerHTML = "<input name='PayNature_" + i + "' id='PayNature_" + i + "' maxlength='10' onblur='javascript:setHouseRentPayNature(" + i + ");' type='text' onchange='javascript:setHouseRentPayNature(" + i + ");' value='" + gatheringHouseRentArray[i].gt_HouseRent_PayNature + "' style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    var payNatureVal = document.getElementById('hiddenPayNatureVal').value;
                    var selectIsShare = "<select disabled='disabled' name='PayNature_" + i + "' id='PayNature_" + i + "' onblur='javascript:setHouseRentPayNature(" + i + ");' onchange='javascript:setHouseRentPayNature(" + i + ");' style=\"width:98%;\"><option value=''>请选择</option>";
                    if (gatheringHouseRentArray[i].gt_HouseRent_PayNature != "") {
                        if (payNatureVal != "" && payNatureVal.split("~").length > 0) {
                            for (var n = 0; n < payNatureVal.split("~").length; n = n + 2) {
                                if (gatheringHouseRentArray[i].gt_HouseRent_PayNature == payNatureVal.split("~")[n])
                                    selectIsShare += "<option value='" + payNatureVal.split("~")[n] + "' selected>" + payNatureVal.split("~")[n + 1] + "</option>";
                                else
                                    selectIsShare += "<option value='" + payNatureVal.split("~")[n] + "'>" + payNatureVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    else {
                        if (payNatureVal != "" && payNatureVal.split("~").length > 0) {
                            for (var n = 0; n < payNatureVal.split("~").length; n = n + 2) {
                                selectIsShare += "<option value='" + payNatureVal.split("~")[n] + "'>" + payNatureVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    selectIsShare += "</select>";
                    cell.innerHTML = selectIsShare;
                    break;
                case 15: //租赁性质
                    var leaseNatureVal = document.getElementById('hiddenLeaseNatureVal').value;

                    var leaseNatureVal = "1~经营租赁~2~租赁资产 ~";
                    var selectIsShare = "<select disabled='disabled' name='LeaseNature_" + i + "' id='LeaseNature_" + i + "' onblur='javascript:setHouseRentLeaseNature(" + i + ");' onchange='javascript:setHouseRentLeaseNature(" + i + ");' style=\"width:98%;\"><option value=''>请选择</option>";
                    if (gatheringHouseRentArray[i].gt_HouseRent_LeaseNature != "") {
                        if (leaseNatureVal != "" && leaseNatureVal.split("~").length > 0) {
                            for (var n = 0; n < leaseNatureVal.split("~").length; n = n + 2) {
                                if (gatheringHouseRentArray[i].gt_HouseRent_LeaseNature == leaseNatureVal.split("~")[n])
                                    selectIsShare += "<option value='" + leaseNatureVal.split("~")[n] + "' selected>" + leaseNatureVal.split("~")[n + 1] + "</option>";
                                else
                                    selectIsShare += "<option value='" + leaseNatureVal.split("~")[n] + "'>" + leaseNatureVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    else {
                        if (leaseNatureVal != "" && leaseNatureVal.split("~").length > 0) {
                            for (var n = 0; n < leaseNatureVal.split("~").length; n = n + 2) {
                                selectIsShare += "<option value='" + leaseNatureVal.split("~")[n] + "'>" + leaseNatureVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    selectIsShare += "</select>";
                    cell.innerHTML = selectIsShare;
                    break;
                case 16: //删除
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteHouseRentRow2(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
    calHouseRentSum2();
}
//添加一行的时候，复制上一行的数据
function copyHouseRentDataFromPreRow(index) {
    if (index == 1)
        return;

    var sel_SrcObj = document.getElementById('HouseRentTextBoxProjectTeam_' + (index - 2));
    var sel_TarObj = document.getElementById('HouseRentTextBoxProjectTeam_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentProjectTeam(index - 1);

    sel_SrcObj = document.getElementById('HouseRentTextBoxCity_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxCity_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentContract(index - 1);

    sel_SrcObj = document.getElementById('HouseRentTextBoxAddress_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxAddress_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentAddress(index - 1);

    sel_SrcObj = document.getElementById('HouseRentTextBoxContractStart_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxContractStart_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentContractStart(index - 1);

    sel_SrcObj = document.getElementById('HouseRentTextBoxContractEnd_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxContractEnd_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentContractEnd(index - 1);

    sel_SrcObj = document.getElementById('HouseRentTextBoxMonthRent_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxMonthRent_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentMonthRent(index - 1);


    //20101215 chaidanlei 付款金额和付款租期（起止日）交换位置
    sel_SrcObj = document.getElementById('HouseRentTextBoxHireStart_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxHireStart_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentHireStart(index - 1);

    sel_SrcObj = document.getElementById('HouseRentTextBoxHireEnd_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxHireEnd_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentHireEnd(index - 1);

    //付款金额
    sel_SrcObj = document.getElementById('HouseRentTextBoxAllRent_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxAllRent_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentAllRent(index - 1);

    //是否按租期分摊
    sel_SrcObj = document.getElementById('ShareByRentPeriod_' + (index - 2));
    sel_TarObj = document.getElementById('ShareByRentPeriod_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentIsShareByRentPeriod(index - 1);

    //20120515 wanghk 房东
    sel_SrcObj = document.getElementById('HouseRentTextBoxHouseOwner_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxHouseOwner_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentHouseOwner(index - 1);

    //20120515 wanghk 最大入住人数
    sel_SrcObj = document.getElementById('HouseRentTextBoxLargestNumberIn_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxLargestNumberIn_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentLargestNumberIn(index - 1);

    //20120515 wanghk 缴费性质
    sel_SrcObj = document.getElementById('PayNature_' + (index - 2));
    sel_TarObj = document.getElementById('PayNature_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentPayNature(index - 1);

    // 租赁性质
    sel_SrcObj = document.getElementById('LeaseNature_' + (index - 2));
    sel_TarObj = document.getElementById('LeaseNature_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentLeaseNature(index - 1);
}
function copyHouseRentDataFromPreRow2(index) {
    if (index == 1)
        return;

    var sel_SrcObj = document.getElementById('HouseRentTextBoxProjectTeam_' + (index - 2));
    var sel_TarObj = document.getElementById('HouseRentTextBoxProjectTeam_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentProjectTeam(index - 1);

    sel_SrcObj = document.getElementById('HouseContractID_' + (index - 2));
    sel_TarObj = document.getElementById('HouseContractID_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setContractId(index - 1);

    sel_SrcObj = document.getElementById('HouseRentTextBoxHouseContract_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxHouseContract_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setContractName(index - 1);


    sel_SrcObj = document.getElementById('HouseCityID_' + (index - 2));
    sel_TarObj = document.getElementById('HouseCityID_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;

    sel_SrcObj = document.getElementById('HouseRentTextBoxHouseCity_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxHouseCity_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentCity2(index - 1);


    sel_SrcObj = document.getElementById('HouseRentTextBoxAddress_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxAddress_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentAddress(index - 1);


    sel_SrcObj = document.getElementById('HouseRentTextBoxContractStart_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxContractStart_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentContractStart(index - 1);


    sel_SrcObj = document.getElementById('HouseRentTextBoxContractEnd_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxContractEnd_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentContractEnd(index - 1);


    sel_SrcObj = document.getElementById('HouseRentTextBoxMonthRent_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxMonthRent_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentMonthRent(index - 1);



    //20101215 chaidanlei 付款金额和付款租期（起止日）交换位置
    sel_SrcObj = document.getElementById('HouseRentTextBoxHireStart_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxHireStart_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentHireStart(index - 1);

    sel_SrcObj = document.getElementById('HouseRentTextBoxHireEnd_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxHireEnd_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentHireEnd(index - 1);

    sel_SrcObj = document.getElementById('HouseRentTextBoxHouseOwner_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxHouseOwner_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentHouseOwner(index - 1);

    //付款金额
    sel_SrcObj = document.getElementById('HouseRentTextBoxAllRent_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxAllRent_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentAllRent(index - 1);

    //是否按租期分摊
    //    sel_SrcObj = document.getElementById('ShareByRentPeriod_' + (index - 2));
    //    sel_TarObj = document.getElementById('ShareByRentPeriod_' + (index - 1));
    //    sel_TarObj.value = sel_SrcObj.value;
    //    setHouseRentIsShareByRentPeriod(index - 1);

    //20120515 wanghk 房东
    sel_SrcObj = document.getElementById('HouseRentTextBoxHouseOwner_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxHouseOwner_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentHouseOwner(index - 1);

    //20120515 wanghk 最大入住人数
    sel_SrcObj = document.getElementById('HouseRentTextBoxLargestNumberIn_' + (index - 2));
    sel_TarObj = document.getElementById('HouseRentTextBoxLargestNumberIn_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentLargestNumberIn(index - 1);

    //20120515 wanghk 缴费性质
    sel_SrcObj = document.getElementById('PayNature_' + (index - 2));
    sel_TarObj = document.getElementById('PayNature_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentPayNature(index - 1);

    //租赁性质
    sel_SrcObj = document.getElementById('LeaseNature_' + (index - 2));
    sel_TarObj = document.getElementById('LeaseNature_' + (index - 1));
    sel_TarObj.value = sel_SrcObj.value;
    setHouseRentLeaseNature(index - 1);
}
//项目组
function setHouseRentProjectTeam(index) {
    var obj = document.getElementById("HouseRentTextBoxProjectTeam_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1 || obj.value.indexOf("|") != -1) {
        alert("第" + no + "行的项目地房租支付明细-项目组-中包含非法字符“~”，“|”，请重新输入。");
        obj.value = gatheringHouseRentArray[index].gt_HouseRent_ProjectTeam;
        return;
    }
    if (obj.value.length > 125) {
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的项目地房租支付明细-项目组-至多只能录入125个字符。");
        gatheringHouseRentArray[index].gt_HouseRent_ProjectTeam = obj.value;
        return;
    }
    gatheringHouseRentArray[index].gt_HouseRent_ProjectTeam = obj.value;
}
function setHousingAgencyFeeProjectTeam(index) {
    var obj = document.getElementById("HousingAgencyFeeTextBoxProjectTeam_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1 || obj.value.indexOf("|") != -1) {
        alert("第" + no + "行的项目地房租支付明细-项目组-中包含非法字符“~”，“|”，请重新输入。");
        obj.value = gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_ProjectTeam;
        return;
    }
    if (obj.value.length > 125) {
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的项目地房租支付明细-项目组-至多只能录入125个字符。");
        gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_ProjectTeam = obj.value;
        return;
    }
    gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_ProjectTeam = obj.value;
}
//选择合同号设置各字段。生活维修
////////////////////////////////////////////////////////////20130524///////////////////////////////////////////合同号
function setContractId(index) {
    //日常用品及生活维修支付明细
    if (document.getElementById('hiddenExpType').value == '1') {
        var obj = document.getElementById("MaintainHouseContractID_" + index);
        gatheringMaintainArray[index].gt_Maintain_HouseContractID = obj.value;
        return;
    }
    //房租代垫税金
    if (document.getElementById('hiddenExpType').value == '2') {
        var obj = document.getElementById("RantTaxHouseContractID_" + index);
        gatheringRantTaxArray[index].gt_RantTax_HouseContractID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '3') {
        var obj = document.getElementById("UtilitiesChargesHouseContractID_" + index);
        gatheringUtilitiesChargesArray[index].gt_UtilitiesCharges_HouseContractID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '46') {
        var obj = document.getElementById("OfficeRentContractID_" + index);
        gatheringOfficeRentArray[index].gt_OfficeRent_HouseContractID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '47') {
        var obj = document.getElementById("OtherPublicChargesHouseContractID_" + index);
        gatheringOtherPublicChargesArray[index].gt_OtherPublicCharges_HouseContractID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '48') {
        var obj = document.getElementById("ElectricChargesHouseContractID_" + index);
        gatheringElectricChargesArray[index].gt_ElectricCharges_HouseContractID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '49') {
        var obj = document.getElementById("DailyWterUsageHouseContractID_" + index);
        gatheringDailyWterUsageArray[index].gt_DailyWterUsage_HouseContractID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '50') {
        var obj = document.getElementById("DrinkingWaterHouseContractID_" + index);
        gatheringDrinkingWaterArray[index].gt_DrinkingWater_HouseContractID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '51') {
        var obj = document.getElementById("PropertyFeeHouseContractID_" + index);
        gatheringPropertyFeeArray[index].gt_PropertyFee_HouseContractID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '52') {
        var obj = document.getElementById("GasFeeHouseContractID_" + index);
        gatheringGasFeeArray[index].gt_GasFee_HouseContractID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '53') {
        var obj = document.getElementById("OfficeCommodityConsumptionHouseContractID_" + index);
        gatheringOfficeCommodityConsumptionArray[index].gt_OfficeCommodityConsumption_HouseContractID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '54') {
        var obj = document.getElementById("HousingAgencyFeeContractID_" + index);
        gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_HouseContractID = obj.value;
        return;
    }
    var obj = document.getElementById("HouseContractID_" + index);
    gatheringHouseRentArray[index].gt_HouseRent_HouseContractID = obj.value;
}
function setContractName(index) {
    //日常用品及生活维修支付明细
    if (document.getElementById('hiddenExpType').value == '1') {
        var obj = document.getElementById("MaintainTextBoxHouseContract_" + index);
        gatheringMaintainArray[index].gt_Maintain_HouseContract = obj.value;
        return;
    }
    // 房屋代垫税金
    if (document.getElementById('hiddenExpType').value == '2') {
        var obj = document.getElementById("RantTaxTextBoxHouseContract_" + index);
        gatheringRantTaxArray[index].gt_RantTax_HouseContract = obj.value;
        return;
    }
    // 水电煤气物业费
    if (document.getElementById('hiddenExpType').value == '3') {
        var obj = document.getElementById("UtilitiesChargesTextBoxHouseContract_" + index);
        gatheringUtilitiesChargesArray[index].gt_UtilitiesCharges_HouseContract = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '46') {
        var obj = document.getElementById("OfficeRentTextBoxHouseContract_" + index);
        gatheringOfficeRentArray[index].gt_OfficeRent_HouseContract = obj.value;
        return;
    }
    // 办公场地费-其他公共费用
    if (document.getElementById('hiddenExpType').value == '47') {
        var obj = document.getElementById("OtherPublicChargesTextBoxHouseContract_" + index);
        gatheringOtherPublicChargesArray[index].gt_OtherPublicCharges_HouseContract = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '48') {
        var obj = document.getElementById("ElectricChargesTextBoxHouseContract_" + index);
        gatheringElectricChargesArray[index].gt_ElectricCharges_HouseContract = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '49') {
        var obj = document.getElementById("DailyWterUsageTextBoxHouseContract_" + index);
        gatheringDailyWterUsageArray[index].gt_DailyWterUsage_HouseContract = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '50') {
        var obj = document.getElementById("DrinkingWaterTextBoxHouseContract_" + index);
        gatheringDrinkingWaterArray[index].gt_DrinkingWater_HouseContract = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '51') {
        var obj = document.getElementById("PropertyFeeTextBoxHouseContract_" + index);
        gatheringPropertyFeeArray[index].gt_PropertyFee_HouseContract = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '52') {
        var obj = document.getElementById("GasFeeTextBoxHouseContract_" + index);
        gatheringGasFeeArray[index].gt_GasFee_HouseContract = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '53') {
        var obj = document.getElementById("OfficeCommodityConsumptionTextBoxHouseContract_" + index);
        gatheringOfficeCommodityConsumptionArray[index].gt_OfficeCommodityConsumption_HouseContract = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '54') {
        var obj = document.getElementById("HousingAgencyFeeTextBoxHouseContract_" + index);
        gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_HouseContract = obj.value;
        return;
    }
    var obj = document.getElementById("HouseRentTextBoxHouseContract_" + index);
    gatheringHouseRentArray[index].gt_HouseRent_HouseContract = obj.value;
}
//省市
function setHouseRentCity(index) {
    //日常用品及生活维修支付明细
    if (document.getElementById('hiddenExpType').value == '1') {
        var obj = document.getElementById("MaintainTextBoxHouseCity_" + index);
        gatheringMaintainArray[index].gt_Maintain_City = obj.value;
        return;
    }
    //房租代垫税金
    if (document.getElementById('hiddenExpType').value == '2') {
        var obj = document.getElementById("RantTaxTextBoxHouseCity_" + index);
        gatheringRantTaxArray[index].gt_RantTax_City = obj.value;
        return;
    }
    //水电煤气物业费
    if (document.getElementById('hiddenExpType').value == '3') {
        var obj = document.getElementById("UtilitiesChargesTextBoxHouseCity_" + index);
        gatheringUtilitiesChargesArray[index].gt_UtilitiesCharges_City = obj.value;
        return;
    }
    // 办公场地费-其他公共费用
    if (document.getElementById('hiddenExpType').value == '47') {
        var obj = document.getElementById("OtherPublicChargesTextBoxHouseCity_" + index);
        gatheringOtherPublicChargesArray[index].gt_OtherPublicCharges_City = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '48') {
        var obj = document.getElementById("ElectricChargesTextBoxHouseCity_" + index);
        gatheringElectricChargesArray[index].gt_ElectricCharges_City = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '49') {
        var obj = document.getElementById("DailyWterUsageTextBoxHouseCity_" + index);
        gatheringDailyWterUsageArray[index].gt_DailyWterUsage_City = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '50') {
        var obj = document.getElementById("DrinkingWaterTextBoxHouseCity_" + index);
        gatheringDrinkingWaterArray[index].gt_DrinkingWater_City = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '51') {
        var obj = document.getElementById("PropertyFeeTextBoxHouseCity_" + index);
        gatheringPropertyFeeArray[index].gt_PropertyFee_City = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '52') {
        var obj = document.getElementById("GasFeeTextBoxHouseCity_" + index);
        gatheringGasFeeArray[index].gt_GasFee_City = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '53') {
        var obj = document.getElementById("OfficeCommodityConsumptionTextBoxHouseCity_" + index);
        gatheringOfficeCommodityConsumptionArray[index].gt_OfficeCommodityConsumption_City = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '54') {
        var obj = document.getElementById("HousingAgencyFeeTextBoxCity_" + index);
        gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_City = obj.value;
        return;
    }
    var obj = document.getElementById("HouseRentTextBoxCity_" + index);
    gatheringHouseRentArray[index].gt_HouseRent_City = obj.value;
    //gatheringHouseRentArray[index].gt_HouseRent_City = obj.options[obj.selectedIndex].innerText;
}
function setHouseRentCity2(index) {

    //日常用品及生活维修支付明细
    if (document.getElementById('hiddenExpType').value == '1') {
        var obj1 = document.getElementById("MaintainTextBoxHouseCity_" + index);
        gatheringMaintainArray[index].gt_Maintain_City = obj1.value;

        var obj = document.getElementById("MaintainHouseCityID_" + index);
        gatheringMaintainArray[index].gt_Maintain_HouseCityID = obj.value;
        return;
    }
    //房屋代垫税金
    if (document.getElementById('hiddenExpType').value == '2') {
        var obj1 = document.getElementById("RantTaxTextBoxHouseCity_" + index);
        gatheringRantTaxArray[index].gt_RantTax_City = obj1.value;

        var obj = document.getElementById("RantTaxHouseCityID_" + index);
        gatheringRantTaxArray[index].gt_RantTax_HouseCityID = obj.value;
        return;
    }
    //水电煤气物业费
    if (document.getElementById('hiddenExpType').value == '3') {
        var obj1 = document.getElementById("UtilitiesChargesTextBoxHouseCity_" + index);
        gatheringUtilitiesChargesArray[index].gt_UtilitiesCharges_City = obj1.value;

        var obj = document.getElementById("UtilitiesChargesHouseCityID_" + index);
        gatheringUtilitiesChargesArray[index].gt_UtilitiesCharges_HouseCityID = obj.value;
        return;
    }
    // 办公场地费-其他公共费用
    if (document.getElementById('hiddenExpType').value == '47') {
        var obj1 = document.getElementById("OtherPublicChargesTextBoxHouseCity_" + index);
        gatheringOtherPublicChargesArray[index].gt_OtherPublicCharges_City = obj1.value;

        var obj = document.getElementById("OtherPublicChargesHouseCityID_" + index);
        gatheringOtherPublicChargesArray[index].gt_OtherPublicCharges_HouseCityID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '48') {
        var obj1 = document.getElementById("ElectricChargesTextBoxHouseCity_" + index);
        gatheringElectricChargesArray[index].gt_ElectricCharges_City = obj1.value;

        var obj = document.getElementById("ElectricChargesHouseCityID_" + index);
        gatheringElectricChargesArray[index].gt_ElectricCharges_HouseCityID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '49') {
        var obj1 = document.getElementById("DailyWterUsageTextBoxHouseCity_" + index);
        gatheringDailyWterUsageArray[index].gt_DailyWterUsage_City = obj1.value;

        var obj = document.getElementById("DailyWterUsageHouseCityID_" + index);
        gatheringDailyWterUsageArray[index].gt_DailyWterUsage_HouseCityID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '50') {
        var obj1 = document.getElementById("DrinkingWaterTextBoxHouseCity_" + index);
        gatheringDrinkingWaterArray[index].gt_DrinkingWater_City = obj1.value;

        var obj = document.getElementById("DrinkingWaterHouseCityID_" + index);
        gatheringDrinkingWaterArray[index].gt_DrinkingWater_HouseCityID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '51') {
        var obj1 = document.getElementById("PropertyFeeTextBoxHouseCity_" + index);
        gatheringPropertyFeeArray[index].gt_PropertyFee_City = obj1.value;

        var obj = document.getElementById("PropertyFeeHouseCityID_" + index);
        gatheringPropertyFeeArray[index].gt_PropertyFee_HouseCityID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '52') {
        var obj1 = document.getElementById("GasFeeTextBoxHouseCity_" + index);
        gatheringGasFeeArray[index].gt_GasFee_City = obj1.value;

        var obj = document.getElementById("GasFeeHouseCityID_" + index);
        gatheringGasFeeArray[index].gt_GasFee_HouseCityID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '53') {
        var obj1 = document.getElementById("OfficeCommodityConsumptionTextBoxHouseCity_" + index);
        gatheringOfficeCommodityConsumptionArray[index].gt_OfficeCommodityConsumption_City = obj1.value;

        var obj = document.getElementById("OfficeCommodityConsumptionHouseCityID_" + index);
        gatheringOfficeCommodityConsumptionArray[index].gt_OfficeCommodityConsumption_HouseCityID = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '54') {
        var objID = document.getElementById("HousingAgencyFeeCityID_" + index);
        gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_HouseCityID = objID.value;
        var obj = document.getElementById("HousingAgencyFeeTextBoxHouseCity_" + index);
        gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_City = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '46') {
        var objID = document.getElementById("OfficeRentCityID_" + index);
        gatheringOfficeRentArray[index].gt_OfficeRent_HouseCityID = objID.value;
        var obj = document.getElementById("OfficeRentTextBoxHouseCity_" + index);
        gatheringOfficeRentArray[index].gt_OfficeRent_City = obj.value;
        return;
    }
    var objID = document.getElementById("HouseCityID_" + index);
    gatheringHouseRentArray[index].gt_HouseRent_HouseCityID = objID.value;
    var obj = document.getElementById("HouseRentTextBoxHouseCity_" + index);
    gatheringHouseRentArray[index].gt_HouseRent_City = obj.value;
    //gatheringHouseRentArray[index].gt_HouseRent_City = obj.options[obj.selectedIndex].innerText;
}
//房屋租住地址
function setHouseRentAddress(index) {

    var no = index + 1;
    //日常用品及生活维修支付明细
    if (document.getElementById('hiddenExpType').value == '1') {
        var objMaintain = document.getElementById("MaintainTextBoxAddress_" + index);
        if (objMaintain.value.indexOf("~") != -1 || objMaintain.value.indexOf("|") != -1) {
            alert("第" + no + "行的日常用品及生活维修支付明细-房屋租住地址-中包含非法字符“~”，“|”，请重新输入。");
            objMaintain.value = gatheringMaintainArray[index].gt_Maintain_Address;
            return;
        }
        if (objMaintain.value.length > 250) {
            objMaintain.value = objMaintain.value.substring(0, 250);
            alert("第" + no + "行的日常用品及生活维修支付明细-房屋租住地址-至多只能录入250个字符。");
            gatheringMaintainArray[index].gt_Maintain_Address = objMaintain.value;
            return;
        }
        gatheringMaintainArray[index].gt_Maintain_Address = objMaintain.value;
        return;
    }
    //房租代垫税金
    if (document.getElementById('hiddenExpType').value == '2') {
        var objRantTax = document.getElementById("RantTaxTextBoxAddress_" + index);
        if (objRantTax.value.indexOf("~") != -1 || objRantTax.value.indexOf("|") != -1) {
            alert("第" + no + "行的房租代垫税金支付明细-房屋租住地址-中包含非法字符“~”，“|”，请重新输入。");
            objRantTax.value = gatheringRantTaxArray[index].gt_RantTax_Address;
            return;
        }
        if (objRantTax.value.length > 250) {
            objRantTax.value = objRantTax.value.substring(0, 250);
            alert("第" + no + "行的房租代垫税金支付明细-房屋租住地址-至多只能录入250个字符。");
            gatheringRantTaxArray[index].gt_RantTax_Address = objRantTax.value;
            return;
        }
        gatheringRantTaxArray[index].gt_RantTax_Address = objRantTax.value;
        return;
    }
    //水电煤气物业费
    if (document.getElementById('hiddenExpType').value == '3') {
        var objUtilitiesCharges = document.getElementById("UtilitiesChargesTextBoxAddress_" + index);
        if (objUtilitiesCharges.value.indexOf("~") != -1 || objUtilitiesCharges.value.indexOf("|") != -1) {
            alert("第" + no + "行的水电煤气物业费支付明细-房屋租住地址-中包含非法字符“~”，“|”，请重新输入。");
            objUtilitiesCharges.value = gatheringUtilitiesChargesArray[index].gt_UtilitiesCharges_Address;
            return;
        }
        if (objUtilitiesCharges.value.length > 250) {
            objUtilitiesCharges.value = objUtilitiesCharges.value.substring(0, 250);
            alert("第" + no + "行的水电煤气物业费支付明细-房屋租住地址-至多只能录入250个字符。");
            gatheringUtilitiesChargesArray[index].gt_UtilitiesCharges_Address = objUtilitiesCharges.value;
            return;
        }
        gatheringUtilitiesChargesArray[index].gt_UtilitiesCharges_Address = objUtilitiesCharges.value;
        return;
    }
    // 办公场地费-其他公共费用
    if (document.getElementById('hiddenExpType').value == '47') {
        var objOtherPublicCharges = document.getElementById("OtherPublicChargesTextBoxAddress_" + index);
        if (objOtherPublicCharges.value.indexOf("~") != -1 || objOtherPublicCharges.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地费-其他公共费用支付明细-房屋租住地址-中包含非法字符“~”，“|”，请重新输入。");
            objOtherPublicCharges.value = gatheringOtherPublicChargesArray[index].gt_OtherPublicCharges_Address;
            return;
        }
        if (objOtherPublicCharges.value.length > 250) {
            objOtherPublicCharges.value = objOtherPublicCharges.value.substring(0, 250);
            alert("第" + no + "行的办公场地费-其他公共费用支付明细-房屋租住地址-至多只能录入250个字符。");
            gatheringOtherPublicChargesArray[index].gt_OtherPublicCharges_Address = objOtherPublicCharges.value;
            return;
        }
        gatheringOtherPublicChargesArray[index].gt_OtherPublicCharges_Address = objOtherPublicCharges.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '48') {
        var objElectricCharges = document.getElementById("ElectricChargesTextBoxAddress_" + index);
        if (objElectricCharges.value.indexOf("~") != -1 || objElectricCharges.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地费-电费费用支付明细-房屋租住地址-中包含非法字符“~”，“|”，请重新输入。");
            objElectricCharges.value = gatheringElectricChargesArray[index].gt_ElectricCharges_Address;
            return;
        }
        if (objElectricCharges.value.length > 250) {
            objElectricCharges.value = objElectricCharges.value.substring(0, 250);
            alert("第" + no + "行的办公场地费-电费费用支付明细-房屋租住地址-至多只能录入250个字符。");
            gatheringElectricChargesArray[index].gt_ElectricCharges_Address = objElectricCharges.value;
            return;
        }
        gatheringElectricChargesArray[index].gt_ElectricCharges_Address = objElectricCharges.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '49') {
        var objDailyWterUsage = document.getElementById("DailyWterUsageTextBoxAddress_" + index);
        if (objDailyWterUsage.value.indexOf("~") != -1 || objDailyWterUsage.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地费-日常用水费用支付明细-房屋租住地址-中包含非法字符“~”，“|”，请重新输入。");
            objDailyWterUsage.value = gatheringDailyWterUsageArray[index].gt_DailyWterUsage_Address;
            return;
        }
        if (objDailyWterUsage.value.length > 250) {
            objDailyWterUsage.value = objDailyWterUsage.value.substring(0, 250);
            alert("第" + no + "行的办公场地费-日常用水费用支付明细-房屋租住地址-至多只能录入250个字符。");
            gatheringDailyWterUsageArray[index].gt_DailyWterUsage_Address = objDailyWterUsage.value;
            return;
        }
        gatheringDailyWterUsageArray[index].gt_DailyWterUsage_Address = objDailyWterUsage.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '50') {
        var objDrinkingWater = document.getElementById("DrinkingWaterTextBoxAddress_" + index);
        if (objDrinkingWater.value.indexOf("~") != -1 || objDrinkingWater.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地费-饮用水费用支付明细-房屋租住地址-中包含非法字符“~”，“|”，请重新输入。");
            objDrinkingWater.value = gatheringDrinkingWaterArray[index].gt_DrinkingWater_Address;
            return;
        }
        if (objDrinkingWater.value.length > 250) {
            objDrinkingWater.value = objDrinkingWater.value.substring(0, 250);
            alert("第" + no + "行的办公场地费-饮用水费用支付明细-房屋租住地址-至多只能录入250个字符。");
            gatheringDrinkingWaterArray[index].gt_DrinkingWater_Address = objDrinkingWater.value;
            return;
        }
        gatheringDrinkingWaterArray[index].gt_DrinkingWater_Address = objDrinkingWater.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '51') {
        var objPropertyFee = document.getElementById("PropertyFeeTextBoxAddress_" + index);
        if (objPropertyFee.value.indexOf("~") != -1 || objPropertyFee.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地费-物业费费用支付明细-房屋租住地址-中包含非法字符“~”，“|”，请重新输入。");
            objPropertyFee.value = gatheringPropertyFeeArray[index].gt_PropertyFee_Address;
            return;
        }
        if (objPropertyFee.value.length > 250) {
            objPropertyFee.value = objPropertyFee.value.substring(0, 250);
            alert("第" + no + "行的办公场地费-物业费费用支付明细-房屋租住地址-至多只能录入250个字符。");
            gatheringPropertyFeeArray[index].gt_PropertyFee_Address = objPropertyFee.value;
            return;
        }
        gatheringPropertyFeeArray[index].gt_PropertyFee_Address = objPropertyFee.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '52') {
        var objGasFee = document.getElementById("GasFeeTextBoxAddress_" + index);
        if (objGasFee.value.indexOf("~") != -1 || objGasFee.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地费-燃气费费用支付明细-房屋租住地址-中包含非法字符“~”，“|”，请重新输入。");
            objGasFee.value = gatheringGasFeeArray[index].gt_GasFee_Address;
            return;
        }
        if (objGasFee.value.length > 250) {
            objGasFee.value = objGasFee.value.substring(0, 250);
            alert("第" + no + "行的办公场地费-燃气费费用支付明细-房屋租住地址-至多只能录入250个字符。");
            gatheringGasFeeArray[index].gt_GasFee_Address = objGasFee.value;
            return;
        }
        gatheringGasFeeArray[index].gt_GasFee_Address = objGasFee.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '53') {
        var objOfficeCommodityConsumption = document.getElementById("OfficeCommodityConsumptionTextBoxAddress_" + index);
        if (objOfficeCommodityConsumption.value.indexOf("~") != -1 || objOfficeCommodityConsumption.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地费-日用品消耗费用支付明细-房屋租住地址-中包含非法字符“~”，“|”，请重新输入。");
            objOfficeCommodityConsumption.value = gatheringOfficeCommodityConsumptionArray[index].gt_OfficeCommodityConsumption_Address;
            return;
        }
        if (objOfficeCommodityConsumption.value.length > 250) {
            objOfficeCommodityConsumption.value = objOfficeCommodityConsumption.value.substring(0, 250);
            alert("第" + no + "行的办公场地费-日用品消耗费用支付明细-房屋租住地址-至多只能录入250个字符。");
            gatheringOfficeCommodityConsumptionArray[index].gt_OfficeCommodityConsumption_Address = objOfficeCommodityConsumption.value;
            return;
        }
        gatheringOfficeCommodityConsumptionArray[index].gt_OfficeCommodityConsumption_Address = objOfficeCommodityConsumption.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '54') {
        var obj = document.getElementById("HousingAgencyFeeTextBoxAddress_" + index);
        if (obj.value.indexOf("~") != -1 || obj.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地费-房屋中介费明细-房屋租住地址-中包含非法字符“~”，“|”，请重新输入。");
            obj.value = gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_Address;
            return;
        }
        if (obj.value.length > 250) {
            obj.value = obj.value.substring(0, 250);
            alert("第" + no + "行的办公场地费-房屋中介费支付明细-房屋租住地址-至多只能录入250个字符。");
            gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_Address = obj.value;
            return;
        }
        gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_Address = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '46') {
        var obj = document.getElementById("OfficeRentTextBoxAddress_" + index);
        if (obj.value.indexOf("~") != -1 || obj.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地公摊-办公用房租明细-房屋租住地址-中包含非法字符“~”，“|”，请重新输入。");
            obj.value = gatheringOfficeRentArray[index].gt_OfficeRent_Address;
            return;
        }
        if (obj.value.length > 250) {
            obj.value = obj.value.substring(0, 250);
            alert("第" + no + "行的办公场地公摊-办公用房租支付明细-房屋租住地址-至多只能录入250个字符。");
            gatheringOfficeRentArray[index].gt_OfficeRent_Address = obj.value;
            return;
        }
        gatheringOfficeRentArray[index].gt_OfficeRent_Address = obj.value;
        return;
    }
    var obj = document.getElementById("HouseRentTextBoxAddress_" + index);


    if (obj.value.indexOf("~") != -1 || obj.value.indexOf("|") != -1) {
        alert("第" + no + "行的项目地房租支付明细-房屋租住地址-中包含非法字符“~”，“|”，请重新输入。");
        obj.value = gatheringHouseRentArray[index].gt_HouseRent_Address;
        return;
    }
    if (obj.value.length > 250) {
        obj.value = obj.value.substring(0, 250);
        alert("第" + no + "行的项目地房租支付明细-房屋租住地址-至多只能录入250个字符。");
        gatheringHouseRentArray[index].gt_HouseRent_Address = obj.value;
        return;
    }
    gatheringHouseRentArray[index].gt_HouseRent_Address = obj.value;
}
//合同开始日期
function setHouseRentContractStart(index) {
    //日常用品及生活维修支付明细
    if (document.getElementById('hiddenExpType').value == '1') {
        var obj = document.getElementById("MaintainTextBoxContractStart_" + index);
        gatheringMaintainArray[index].gt_Maintain_ContractStart = obj.value;
        return;
    }
    //房租代垫税金
    if (document.getElementById('hiddenExpType').value == '2') {
        var obj = document.getElementById("RantTaxTextBoxContractStart_" + index);
        gatheringRantTaxArray[index].gt_RantTax_ContractStart = obj.value;
        return;
    }
    //水电煤气物业费
    if (document.getElementById('hiddenExpType').value == '3') {
        var obj = document.getElementById("UtilitiesChargesTextBoxContractStart_" + index);
        gatheringUtilitiesChargesArray[index].gt_UtilitiesCharges_ContractStart = obj.value;
        return;
    }
    //办公场地费-其他公共费用
    if (document.getElementById('hiddenExpType').value == '47') {
        var obj = document.getElementById("OtherPublicChargesTextBoxContractStart_" + index);
        gatheringOtherPublicChargesArray[index].gt_OtherPublicCharges_ContractStart = obj.value;
        return;
    }
    //办公场地费-电费
    if (document.getElementById('hiddenExpType').value == '48') {
        var obj = document.getElementById("ElectricChargesTextBoxContractStart_" + index);
        gatheringElectricChargesArray[index].gt_ElectricCharges_ContractStart = obj.value;
        return;
    }
    //办公场地费-日常用水
    if (document.getElementById('hiddenExpType').value == '49') {
        var obj = document.getElementById("DailyWterUsageTextBoxContractStart_" + index);
        gatheringDailyWterUsageArray[index].gt_DailyWterUsage_ContractStart = obj.value;
        return;
    }
    //办公场地费-饮用水
    if (document.getElementById('hiddenExpType').value == '50') {
        var obj = document.getElementById("DrinkingWaterTextBoxContractStart_" + index);
        gatheringDrinkingWaterArray[index].gt_DrinkingWater_ContractStart = obj.value;
        return;
    }
    //办公场地费-物业费
    if (document.getElementById('hiddenExpType').value == '51') {
        var obj = document.getElementById("PropertyFeeTextBoxContractStart_" + index);
        gatheringPropertyFeeArray[index].gt_PropertyFee_ContractStart = obj.value;
        return;
    }
    //办公场地费-燃气费
    if (document.getElementById('hiddenExpType').value == '52') {
        var obj = document.getElementById("GasFeeTextBoxContractStart_" + index);
        gatheringGasFeeArray[index].gt_GasFee_ContractStart = obj.value;
        return;
    }
    //办公场地费-日用品消耗
    if (document.getElementById('hiddenExpType').value == '53') {
        var obj = document.getElementById("OfficeCommodityConsumptionTextBoxContractStart_" + index);
        gatheringOfficeCommodityConsumptionArray[index].gt_OfficeCommodityConsumption_ContractStart = obj.value;
        return;
    }

    if (document.getElementById('hiddenExpType').value == '54') {
        var obj = document.getElementById("HousingAgencyFeeTextBoxContractStart_" + index);
        gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_ContractStart = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '46') {
        var obj = document.getElementById("OfficeRentTextBoxContractStart_" + index);
        gatheringOfficeRentArray[index].gt_OfficeRent_ContractStart = obj.value;
        return;
    }
    var obj = document.getElementById("HouseRentTextBoxContractStart_" + index);
    gatheringHouseRentArray[index].gt_HouseRent_ContractStart = obj.value;
}
//合同结束日期
function setHouseRentContractEnd(index) {
    //日常用品及生活维修支付明细
    if (document.getElementById('hiddenExpType').value == '1') {
        var obj = document.getElementById("MaintainTextBoxContractEnd_" + index);
        gatheringMaintainArray[index].gt_Maintain_ContractEnd = obj.value;
        return;
    }
    //房租代垫税金
    if (document.getElementById('hiddenExpType').value == '2') {
        var obj = document.getElementById("RantTaxTextBoxContractEnd_" + index);
        gatheringRantTaxArray[index].gt_RantTax_ContractEnd = obj.value;
        return;
    }
    //水电煤气物业费
    if (document.getElementById('hiddenExpType').value == '3') {
        var obj = document.getElementById("UtilitiesChargesTextBoxContractEnd_" + index);
        gatheringUtilitiesChargesArray[index].gt_UtilitiesCharges_ContractEnd = obj.value;
        return;
    }
    //办公场地费-其他公共费用
    if (document.getElementById('hiddenExpType').value == '47') {
        var obj = document.getElementById("OtherPublicChargesTextBoxContractEnd_" + index);
        gatheringOtherPublicChargesArray[index].gt_OtherPublicCharges_ContractEnd = obj.value;
        return;
    }
    //办公场地费-电费
    if (document.getElementById('hiddenExpType').value == '48') {
        var obj = document.getElementById("ElectricChargesTextBoxContractEnd_" + index);
        gatheringElectricChargesArray[index].gt_ElectricCharges_ContractEnd = obj.value;
        return;
    }
    //办公场地费-日常用水
    if (document.getElementById('hiddenExpType').value == '49') {
        var obj = document.getElementById("DailyWterUsageTextBoxContractEnd_" + index);
        gatheringDailyWterUsageArray[index].gt_DailyWterUsage_ContractEnd = obj.value;
        return;
    }
    //办公场地费-办公场地费-饮用水
    if (document.getElementById('hiddenExpType').value == '50') {
        var obj = document.getElementById("DrinkingWaterTextBoxContractEnd_" + index);
        gatheringDrinkingWaterArray[index].gt_DrinkingWater_ContractEnd = obj.value;
        return;
    }
    //办公场地费-办公场地费-物业费
    if (document.getElementById('hiddenExpType').value == '51') {
        var obj = document.getElementById("PropertyFeeTextBoxContractEnd_" + index);
        gatheringPropertyFeeArray[index].gt_PropertyFee_ContractEnd = obj.value;
        return;
    }
    //办公场地费-办公场地费-燃气费
    if (document.getElementById('hiddenExpType').value == '52') {
        var obj = document.getElementById("GasFeeTextBoxContractEnd_" + index);
        gatheringGasFeeArray[index].gt_GasFee_ContractEnd = obj.value;
        return;
    }
    //办公场地费-日用品消耗
    if (document.getElementById('hiddenExpType').value == '53') {
        var obj = document.getElementById("OfficeCommodityConsumptionTextBoxContractEnd_" + index);
        gatheringOfficeCommodityConsumptionArray[index].gt_OfficeCommodityConsumption_ContractEnd = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '54') {
        var obj = document.getElementById("HousingAgencyFeeTextBoxContractEnd_" + index);
        gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_ContractEnd = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '46') {
        var obj = document.getElementById("OfficeRentTextBoxContractEnd_" + index);
        gatheringOfficeRentArray[index].gt_OfficeRent_ContractEnd = obj.value;
        return;
    }
    var obj = document.getElementById("HouseRentTextBoxContractEnd_" + index);
    gatheringHouseRentArray[index].gt_HouseRent_ContractEnd = obj.value;
}
//月租金
function setHouseRentMonthRent(index) {

    var no = index + 1;
    //日常用品及生活维修支付明细
    if (document.getElementById('hiddenExpType').value == '1') {
        var objMaintain = document.getElementById("MaintainTextBoxMonthRent_" + index);
        //检查输入的是否是数字
        if (objMaintain.value == "") {
            return;
        }
        if (!isMoneyValue(objMaintain.value)) {
            alert('第' + no + '行的日常用品及生活维修支付明细-月租金-格式不合法');
            objMaintain.value = "";
            return;
        }

        if (objMaintain.value < 0) {

            alert('第' + no + '行的日常用品及生活维修支付明细-月租金-格式不合法');
            objMaintain.value = "";
            return;
        }
        objMaintain.value = Math.round(objMaintain.value * 100) / 100;
        gatheringMaintainArray[index].gt_Maintain_MonthRent = objMaintain.value;
        return;
    }

    //房租代垫税金
    if (document.getElementById('hiddenExpType').value == '2') {
        var objRantTax = document.getElementById("RantTaxTextBoxMonthRent_" + index);
        //检查输入的是否是数字
        if (objRantTax.value == "") {
            return;
        }
        if (!isMoneyValue(objRantTax.value)) {

            alert('第' + no + '行的房租代垫税金支付明细-月租金-格式不合法');
            objRantTax.value = "";
            return;
        }

        if (objRantTax.value < 0) {

            alert('第' + no + '行的房租代垫税金支付明细-月租金-格式不合法');
            objRantTax.value = "";
            return;
        }
        objRantTax.value = Math.round(objRantTax.value * 100) / 100;
        gatheringRantTaxArray[index].gt_RantTax_MonthRent = objRantTax.value;
        return;
    }
    //水电煤气物业费
    if (document.getElementById('hiddenExpType').value == '3') {
        var objUtilitiesCharges = document.getElementById("UtilitiesChargesTextBoxMonthRent_" + index);
        //检查输入的是否是数字
        if (objUtilitiesCharges.value == "") {
            return;
        }
        if (!isMoneyValue(objUtilitiesCharges.value)) {

            alert('第' + no + '行的水电煤气物业费支付明细-月租金-格式不合法');
            objUtilitiesCharges.value = "";
            return;
        }

        if (objUtilitiesCharges.value < 0) {

            alert('第' + no + '行的水电煤气物业费支付明细-月租金-格式不合法');
            objUtilitiesCharges.value = "";
            return;
        }

        objUtilitiesCharges.value = Math.round(objUtilitiesCharges.value * 100) / 100;
        gatheringUtilitiesChargesArray[index].gt_UtilitiesCharges_MonthRent = objUtilitiesCharges.value;
        return;
    }
    //办公场地费-其他公共费用
    if (document.getElementById('hiddenExpType').value == '47') {
        var objOtherPublicCharges = document.getElementById("OtherPublicChargesTextBoxMonthRent_" + index);
        //检查输入的是否是数字
        if (objOtherPublicCharges.value == "") {
            return;
        }
        if (!isMoneyValue(objOtherPublicCharges.value)) {

            alert('第' + no + '行的办公场地费-其他公共费用支付明细-月租金-格式不合法');
            objOtherPublicCharges.value = "";
            return;
        }

        if (objOtherPublicCharges.value < 0) {

            alert('第' + no + '行的办公场地费-其他公共费用支付明细-月租金-格式不合法');
            objOtherPublicCharges.value = "";
            return;
        }
        objOtherPublicCharges.value = Math.round(objOtherPublicCharges.value * 100) / 100;
        gatheringOtherPublicChargesArray[index].gt_OtherPublicCharges_MonthRent = objOtherPublicCharges.value;
        return;
        } 
        if (document.getElementById('hiddenExpType').value == '48') {
        var objElectricCharges = document.getElementById("ElectricChargesTextBoxMonthRent_" + index);
        //检查输入的是否是数字
        if (objElectricCharges.value == "") {
            return;
        }
        if (!isMoneyValue(objElectricCharges.value)) {

            alert('第' + no + '行的办公场地费-电费费用支付明细-月租金-格式不合法');
            objElectricCharges.value = "";
            return;
        }

        if (objElectricCharges.value < 0) {

            alert('第' + no + '行的办公场地费-电费费用支付明细-月租金-格式不合法');
            objElectricCharges.value = "";
            return;
        }
        objElectricCharges.value = Math.round(objElectricCharges.value * 100) / 100;
        gatheringElectricChargesArray[index].gt_ElectricCharges_MonthRent = objElectricCharges.value;
        return;
        }
        if (document.getElementById('hiddenExpType').value == '49') {
        var objDailyWterUsage = document.getElementById("DailyWterUsageTextBoxMonthRent_" + index);
        //检查输入的是否是数字
        if (objDailyWterUsage.value == "") {
            return;
        }
        if (!isMoneyValue(objDailyWterUsage.value)) {

            alert('第' + no + '行的办公场地费-日常用水费用支付明细-月租金-格式不合法');
            objDailyWterUsage.value = "";
            return;
        }

        if (objDailyWterUsage.value < 0) {

            alert('第' + no + '行的办公场地费-日常用水费用支付明细-月租金-格式不合法');
            objDailyWterUsage.value = "";
            return;
        }
        objDailyWterUsage.value = Math.round(objDailyWterUsage.value * 100) / 100;
        gatheringDailyWterUsageArray[index].gt_DailyWterUsage_MonthRent = objDailyWterUsage.value;
        return;
      }
        if (document.getElementById('hiddenExpType').value == '50') {
        var objDrinkingWater = document.getElementById("DrinkingWaterTextBoxMonthRent_" + index);
        //检查输入的是否是数字
        if (objDrinkingWater.value == "") {
            return;
        }
        if (!isMoneyValue(objDrinkingWater.value)) {

            alert('第' + no + '行的办公场地费-饮用水费用支付明细-月租金-格式不合法');
            objDrinkingWater.value = "";
            return;
        }

        if (objDrinkingWater.value < 0) {

            alert('第' + no + '行的办公场地费-饮用水费用支付明细-月租金-格式不合法');
            objDrinkingWater.value = "";
            return;
        }
        objDrinkingWater.value = Math.round(objDrinkingWater.value * 100) / 100;
        gatheringDrinkingWaterArray[index].gt_DrinkingWater_MonthRent = objDrinkingWater.value;
        return;
        }
        if (document.getElementById('hiddenExpType').value == '51') {
            var objPropertyFee = document.getElementById("PropertyFeeTextBoxMonthRent_" + index);
            //检查输入的是否是数字
            if (objPropertyFee.value == "") {
                return;
            }
            if (!isMoneyValue(objPropertyFee.value)) {

                alert('第' + no + '行的办公场地费-物业费费用支付明细-月租金-格式不合法');
                objPropertyFee.value = "";
                return;
            }

            if (objPropertyFee.value < 0) {

                alert('第' + no + '行的办公场地费-物业费费用支付明细-月租金-格式不合法');
                objPropertyFee.value = "";
                return;
            }
            objPropertyFee.value = Math.round(objPropertyFee.value * 100) / 100;
            gatheringPropertyFeeArray[index].gt_PropertyFee_MonthRent = objPropertyFee.value;
            return;
        }
        if (document.getElementById('hiddenExpType').value == '52') {
        var objGasFee = document.getElementById("GasFeeTextBoxMonthRent_" + index);
        //检查输入的是否是数字
        if (objGasFee.value == "") {
            return;
        }
        if (!isMoneyValue(objGasFee.value)) {

            alert('第' + no + '行的办公场地费-燃气费费用支付明细-月租金-格式不合法');
            objGasFee.value = "";
            return;
        }

        if (objGasFee.value < 0) {

            alert('第' + no + '行的办公场地费-燃气费费用支付明细-月租金-格式不合法');
            objGasFee.value = "";
            return;
        }
        objGasFee.value = Math.round(objGasFee.value * 100) / 100;
        gatheringGasFeeArray[index].gt_GasFee_MonthRent = objGasFee.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '53') {
        var objOfficeCommodityConsumption = document.getElementById("OfficeCommodityConsumptionTextBoxMonthRent_" + index);
        //检查输入的是否是数字
        if (objOfficeCommodityConsumption.value == "") {
            return;
        }
        if (!isMoneyValue(objOfficeCommodityConsumption.value)) {

            alert('第' + no + '行的办公场地费-日用品消耗费用支付明细-月租金-格式不合法');
            objOfficeCommodityConsumption.value = "";
            return;
        }

        if (objOfficeCommodityConsumption.value < 0) {

            alert('第' + no + '行的办公场地费-日用品消耗费用支付明细-月租金-格式不合法');
            objOfficeCommodityConsumption.value = "";
            return;
        }
        objOfficeCommodityConsumption.value = Math.round(objOfficeCommodityConsumption.value * 100) / 100;
        gatheringOfficeCommodityConsumptionArray[index].gt_OfficeCommodityConsumption_MonthRent = objOfficeCommodityConsumption.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '54') {
        var obj = document.getElementById("HousingAgencyFeeTextBoxMonthRent_" + index);
        //检查输入的是否是数字
        if (obj.value == "") {
            return;
        }
        if (!isMoneyValue(obj.value)) {

            alert('第' + no + '行的办公场地费-房屋中介费支付明细-月租金-格式不合法');
            obj.value = "";
            return;
        }

        if (obj.value < 0) {

            alert('第' + no + '行的办公场地费-房屋中介费支付明细-月租金-格式不合法');
            obj.value = "";
            return;
        }
        obj.value = Math.round(obj.value * 100) / 100;
        gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_MonthRent = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '46') {
        var obj = document.getElementById("OfficeRentTextBoxMonthRent_" + index);
        //检查输入的是否是数字
        if (obj.value == "") {
            return;
        }
        if (!isMoneyValue(obj.value)) {

            alert('第' + no + '行的办公场地公摊-办公用房租费支付明细-月租金-格式不合法');
            obj.value = "";
            return;
        }

        if (obj.value < 0) {

            alert('第' + no + '行的办公场地公摊-办公用房租费支付明细-月租金-格式不合法');
            obj.value = "";
            return;
        }
        obj.value = Math.round(obj.value * 100) / 100;
        gatheringOfficeRentArray[index].gt_OfficeRent_MonthRent = obj.value;
        return;
    }
    var obj = document.getElementById("HouseRentTextBoxMonthRent_" + index);
    //检查输入的是否是数字
    if (obj.value == "") {
        return;
    }
    if (!isMoneyValue(obj.value)) {

        alert('第' + no + '行的项目地房租支付明细-月租金-格式不合法');
        obj.value = "";
        return;
    }

    if (obj.value < 0) {

        alert('第' + no + '行的项目地房租支付明细-月租金-格式不合法');
        obj.value = "";
        return;
    }
    obj.value = Math.round(obj.value * 100) / 100;
    gatheringHouseRentArray[index].gt_HouseRent_MonthRent = obj.value;
    return;
}
function setHouseRentMonthRent2(index) {
    var obj = document.getElementById("HouseRentTextBoxMonthRent_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        return;
    }

    obj.value = Math.round(obj.value * 100) / 100;
    gatheringHouseRentArray[index].gt_HouseRent_MonthRent = obj.value;
    return;
}
//房租金额
function setHouseRentAllRent(index) {
    if (document.getElementById('hiddenExpType').value == '54')
{
setHousingAgencyFeeAllRent(index);
}else{
    var obj = document.getElementById("HouseRentTextBoxAllRent_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的项目地房租支付明细-付款金额-格式不合法');
        obj.value = "";
        return;
    }

    if (obj.value <= 0) {
        alert('第' + no + '行的项目地房租支付明细-付款金额-格式不合法');
        obj.value = "";
        return;
    }
    obj.value = Math.round(obj.value * 100) / 100;
    gatheringHouseRentArray[index].gt_HouseRent_AllRent = obj.value;

    calHouseRentSum();
    }
}
///add by:mfj  2013/07/05
function getYMD(text) {
    var index1, index2;
    index1 = text.indexOf("-");
    index2 = text.lastIndexOf("-");
    year = text.substring(0, index1);
    month = text.substring(index1 + 1, index2);
    day = text.substring(index2 + 1, text.length);
    return new Date(year, month - 1, day);
}
//房租开始日期
function checkHouseRentHireStart(index) {
   
        var contractStart = gatheringHouseRentArray[index].gt_HouseRent_ContractStart;
        if (contractStart == "") {
            alert("请先选择合同号");
            return false;
        }
        var obj = document.getElementById("HouseRentTextBoxHireStart_" + index);
        var contractend = gatheringHouseRentArray[index].gt_HouseRent_ContractEnd;

        var contractBeginDate = getYMD(contractStart);
        var houseRentHireBeginDate = getYMD(obj.value);
        var contractEndDate = getYMD(contractend);
        if (contractBeginDate - houseRentHireBeginDate > 0) {
            alert("此次付款租期开始日期不能小于合同开始日期");
            return false;
        }
        if (houseRentHireBeginDate - contractEndDate > 0) {
            alert("此次付款租期开始日期不能大于合同结束日期");
            return false;
        }
        var objend = document.getElementById("HouseRentTextBoxHireEnd_" + index);
        if (objend.value != "") {
            var houseRentHireEndDate = getYMD(objend.value);
            if (houseRentHireBeginDate - houseRentHireEndDate > 0) {
                alert("此次付款租期开始日期不能大于此次付款租期结束日期");
                return false;
            }
        }
    
}
function setHouseRentHireStart(index) {
    if (document.getElementById('hiddenExpType').value == '54') {
        setHousingAgencyFeeHireStart(index);
    }
    else {
        var obj = document.getElementById("HouseRentTextBoxHireStart_" + index);
        gatheringHouseRentArray[index].gt_HouseRent_HireStart = obj.value;
    }
}
//房租结束日期
function checkHouseRentHireEnd(index) {
    var contractend = gatheringHouseRentArray[index].gt_HouseRent_ContractEnd;
    if (contractend == "") {
        alert("请先选择合同号");
        return false;
    }
    var obj = document.getElementById("HouseRentTextBoxHireEnd_" + index);
    var contractStart = gatheringHouseRentArray[index].gt_HouseRent_ContractStart;
    var contractEndDate = getYMD(contractend);
    var houseRentHireEndDate = getYMD(obj.value);
    var contractBeginDate = getYMD(contractStart);
    if (houseRentHireEndDate - contractEndDate > 0) {
        alert("此次付款结束日期不能大于合同结束日期");
        return false;
    }

    if (contractBeginDate - houseRentHireEndDate > 0) {
        alert("此次付款结束日期不能小于合同开始日期");
        return false;
    }

    var objstart = document.getElementById("HouseRentTextBoxHireStart_" + index);
    if (objstart.value != "") {
        var houseRentHireStartDate = getYMD(objstart.value);
        if (houseRentHireStartDate - houseRentHireEndDate > 0) {
            alert("此次付款结束日期不能小于此次付款开始日期");
            return false;
        }
    }
}
function setHouseRentHireEnd(index) {
    if (document.getElementById('hiddenExpType').value == '54') {
        setHousingAgencyFeeHireEnd(index);
    }
    else {
        var obj = document.getElementById("HouseRentTextBoxHireEnd_" + index);
        gatheringHouseRentArray[index].gt_HouseRent_HireEnd = obj.value;
    }
}
//20101215 chaidanlei 增加是否按租期分摊
function setHouseRentIsShareByRentPeriod(index) {
    /*var obj = document.getElementById("ShareByRentPeriod_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1 || obj.value.indexOf("|") != -1) {
    alert("第" + no + "行的项目地房租支付明细-是否按租期分摊-中包含非法字符“~”，“|”，请重新输入。");
    obj.value = gatheringHouseRentArray[index].gt_HouseRent_IsShareByRentPeriod;
    return;
    }
    if (Trim(obj.value).length > 125) {
    obj.value = obj.value.substring(0, 125);
    alert("第" + no + "行的项目地房租支付明细-是否按租期分摊-最多只能录入125个字符。");
    gatheringHouseRentArray[index].gt_HouseRent_IsShareByRentPeriod = obj.value;
    return;
    }
    
    gatheringHouseRentArray[index].gt_HouseRent_IsShareByRentPeriod = obj.value;*/
}
//20120515 wanghk 增加房东
function setHouseRentHouseOwner(index) {
    var no = index + 1;
    //日常用品及生活维修支付明细
    if (document.getElementById('hiddenExpType').value == '1') {
        var objMaintain = document.getElementById("MaintainTextBoxHouseOwner_" + index);
        if (objMaintain.value.indexOf("~") != -1 || objMaintain.value.indexOf("|") != -1) {
            alert("第" + no + "行的日常用品及生活维修支付明细-房东-中包含非法字符“~”，“|”，请重新输入。");
            objMaintain.value = gatheringHouseRentArray[index].gt_Maintain_HouseOwner;
            return;
        }
        if (objMaintain.value.length > 150) {
            objMaintain.value = objMaintain.value.substring(0, 150);
            alert("第" + no + "行的日常用品及生活维修支付明细-房东-至多只能录入150个字符。");
            gatheringMaintainArray[index].gt_Maintain_HouseOwner = objMaintain.value;
            return;
        }

        gatheringMaintainArray[index].gt_Maintain_HouseOwner = objMaintain.value;
        return;
    }
    //房租代垫税金
    if (document.getElementById('hiddenExpType').value == '2') {
        var objRantTax = document.getElementById("RantTaxTextBoxHouseOwner_" + index);
        if (objRantTax.value.indexOf("~") != -1 || objRantTax.value.indexOf("|") != -1) {
            alert("第" + no + "行的房租代垫税金明细-房东-中包含非法字符“~”，“|”，请重新输入。");
            objRantTax.value = gatheringHouseRentArray[index].gt_RantTax_HouseOwner;
            return;
        }
        if (objRantTax.value.length > 150) {
            objRantTax.value = objRantTax.value.substring(0, 150);
            alert("第" + no + "行的房租代垫税金明细-房东-至多只能录入150个字符。");
            gatheringRantTaxArray[index].gt_RantTax_HouseOwner = objRantTax.value;
            return;
        }
        gatheringRantTaxArray[index].gt_RantTax_HouseOwner = objRantTax.value;
        return;
    }
    //水电煤气物业费
    if (document.getElementById('hiddenExpType').value == '3') {
        var objUtilitiesCharges = document.getElementById("UtilitiesChargesTextBoxHouseOwner_" + index);
        if (objUtilitiesCharges.value.indexOf("~") != -1 || objUtilitiesCharges.value.indexOf("|") != -1) {
            alert("第" + no + "行的水电煤气物业费明细-房东-中包含非法字符“~”，“|”，请重新输入。");
            objUtilitiesCharges.value = gatheringHouseRentArray[index].gt_UtilitiesCharges_HouseOwner;
            return;
        }
        if (objUtilitiesCharges.value.length > 150) {
            objUtilitiesCharges.value = objUtilitiesCharges.value.substring(0, 150);
            alert("第" + no + "行的水电煤气物业费明细-房东-至多只能录入150个字符。");
            gatheringUtilitiesChargesArray[index].gt_UtilitiesCharges_HouseOwner = objUtilitiesCharges.value;
            return;
        }
        gatheringUtilitiesChargesArray[index].gt_UtilitiesCharges_HouseOwner = objUtilitiesCharges.value;
        return;
    }
    //办公场地费-其他公共费用
    if (document.getElementById('hiddenExpType').value == '47') {
        var objOtherPublicCharges = document.getElementById("OtherPublicChargesTextBoxHouseOwner_" + index);
        if (objOtherPublicCharges.value.indexOf("~") != -1 || objOtherPublicCharges.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地费-其他公共费用明细-房东-中包含非法字符“~”，“|”，请重新输入。");
            objOtherPublicCharges.value = gatheringOtherPublicChargesArray[index].gt_OtherPublicCharges_HouseOwner;
            return;
        }
        if (objOtherPublicCharges.value.length > 150) {
            objOtherPublicCharges.value = objOtherPublicCharges.value.substring(0, 150);
            alert("第" + no + "行的办公场地费-其他公共费用明细-房东-至多只能录入150个字符。");
            gatheringOtherPublicChargesArray[index].gt_OtherPublicCharges_HouseOwner = objOtherPublicCharges.value;
            return;
        }
        gatheringOtherPublicChargesArray[index].gt_OtherPublicCharges_HouseOwner = objOtherPublicCharges.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '48') {
        var objElectricCharges = document.getElementById("ElectricChargesTextBoxHouseOwner_" + index);
        if (objElectricCharges.value.indexOf("~") != -1 || objElectricCharges.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地费-电费费用明细-房东-中包含非法字符“~”，“|”，请重新输入。");
            objElectricCharges.value = gatheringElectricChargesArray[index].gt_ElectricCharges_HouseOwner;
            return;
        }
        if (objElectricCharges.value.length > 150) {
            objElectricCharges.value = objElectricCharges.value.substring(0, 150);
            alert("第" + no + "行的办公场地费-电费费用明细-房东-至多只能录入150个字符。");
            gatheringElectricChargesArray[index].gt_ElectricCharges_HouseOwner = objElectricCharges.value;
            return;
        }
        gatheringElectricChargesArray[index].gt_ElectricCharges_HouseOwner = objElectricCharges.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '49') {
        var objDailyWterUsage = document.getElementById("DailyWterUsageTextBoxHouseOwner_" + index);
        if (objDailyWterUsage.value.indexOf("~") != -1 || objDailyWterUsage.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地费-日常用水费用明细-房东-中包含非法字符“~”，“|”，请重新输入。");
            objDailyWterUsage.value = gatheringDailyWterUsageArray[index].gt_DailyWterUsage_HouseOwner;
            return;
        }
        if (objDailyWterUsage.value.length > 150) {
            objDailyWterUsage.value = objDailyWterUsage.value.substring(0, 150);
            alert("第" + no + "行的办公场地费-日常用水费用明细-房东-至多只能录入150个字符。");
            gatheringDailyWterUsageArray[index].gt_DailyWterUsage_HouseOwner = objDailyWterUsage.value;
            return;
        }
        gatheringDailyWterUsageArray[index].gt_DailyWterUsage_HouseOwner = objDailyWterUsage.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '50') {
        var objDrinkingWater = document.getElementById("DrinkingWaterTextBoxHouseOwner_" + index);
        if (objDrinkingWater.value.indexOf("~") != -1 || objDrinkingWater.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地费-饮用水费用明细-房东-中包含非法字符“~”，“|”，请重新输入。");
            objDrinkingWater.value = gatheringDrinkingWaterArray[index].gt_DrinkingWater_HouseOwner;
            return;
        }
        if (objDrinkingWater.value.length > 150) {
            objDrinkingWater.value = objDrinkingWater.value.substring(0, 150);
            alert("第" + no + "行的办公场地费-饮用水费用明细-房东-至多只能录入150个字符。");
            gatheringDrinkingWaterArray[index].gt_DrinkingWater_HouseOwner = objDrinkingWater.value;
            return;
        }
        gatheringDrinkingWaterArray[index].gt_DrinkingWater_HouseOwner = objDrinkingWater.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '51') {
        var objPropertyFee = document.getElementById("PropertyFeeTextBoxHouseOwner_" + index);
        if (objPropertyFee.value.indexOf("~") != -1 || objPropertyFee.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地费-物业费费用明细-房东-中包含非法字符“~”，“|”，请重新输入。");
            objPropertyFee.value = gatheringPropertyFeeArray[index].gt_PropertyFee_HouseOwner;
            return;
        }
        if (objPropertyFee.value.length > 150) {
            objPropertyFee.value = objPropertyFee.value.substring(0, 150);
            alert("第" + no + "行的办公场地费-物业费费用明细-房东-至多只能录入150个字符。");
            gatheringPropertyFeeArray[index].gt_PropertyFee_HouseOwner = objPropertyFee.value;
            return;
        }
        gatheringPropertyFeeArray[index].gt_PropertyFee_HouseOwner = objPropertyFee.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '52') {
        var objGasFee = document.getElementById("GasFeeTextBoxHouseOwner_" + index);
        if (objGasFee.value.indexOf("~") != -1 || objGasFee.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地费-燃气费费用明细-房东-中包含非法字符“~”，“|”，请重新输入。");
            objGasFee.value = gatheringGasFeeArray[index].gt_GasFee_HouseOwner;
            return;
        }
        if (objGasFee.value.length > 150) {
            objGasFee.value = objGasFee.value.substring(0, 150);
            alert("第" + no + "行的办公场地费-燃气费费用明细-房东-至多只能录入150个字符。");
            gatheringGasFeeArray[index].gt_GasFee_HouseOwner = objGasFee.value;
            return;
        }
        gatheringGasFeeArray[index].gt_GasFee_HouseOwner = objGasFee.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '53') {
        var objOfficeCommodityConsumption = document.getElementById("OfficeCommodityConsumptionTextBoxHouseOwner_" + index);
        if (objOfficeCommodityConsumption.value.indexOf("~") != -1 || objOfficeCommodityConsumption.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地费-日用品消耗费用明细-房东-中包含非法字符“~”，“|”，请重新输入。");
            objOfficeCommodityConsumption.value = gatheringOfficeCommodityConsumptionArray[index].gt_OfficeCommodityConsumption_HouseOwner;
            return;
        }
        if (objOfficeCommodityConsumption.value.length > 150) {
            objOfficeCommodityConsumption.value = objOfficeCommodityConsumption.value.substring(0, 150);
            alert("第" + no + "行的办公场地费-日用品消耗费用明细-房东-至多只能录入150个字符。");
            gatheringOfficeCommodityConsumptionArray[index].gt_OfficeCommodityConsumption_HouseOwner = objOfficeCommodityConsumption.value;
            return;
        }
        gatheringOfficeCommodityConsumptionArray[index].gt_OfficeCommodityConsumption_HouseOwner = objOfficeCommodityConsumption.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '54') {
        var obj = document.getElementById("HousingAgencyFeeTextBoxHouseOwner_" + index);
        //alert(obj.value.length);
        if (obj.value.indexOf("~") != -1 || obj.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地费-房屋中介费明细-房东-中包含非法字符“~”，“|”，请重新输入。");
            obj.value = gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_HouseOwner;
            return;
        }
        if (obj.value.length > 150) {
            obj.value = obj.value.substring(0, 150);
            alert("第" + no + "行的办公场地费-房屋中介费支付明细-房东-至多只能录入150个字符。");
            gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_HouseOwner = obj.value;
            return;
        }
        gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_HouseOwner = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '46') {
        var obj = document.getElementById("OfficeRentTextBoxHouseOwner_" + index);
        //alert(obj.value.length);
        if (obj.value.indexOf("~") != -1 || obj.value.indexOf("|") != -1) {
            alert("第" + no + "行的办公场地公摊-办公用房租费明细-房东-中包含非法字符“~”，“|”，请重新输入。");
            obj.value = gatheringOfficeRentArray[index].gt_OfficeRent_HouseOwner;
            return;
        }
        if (obj.value.length > 150) {
            obj.value = obj.value.substring(0, 150);
            alert("第" + no + "行的办公场地公摊-办公用房租费支付明细-房东-至多只能录入150个字符。");
            gatheringOfficeRentArray[index].gt_OfficeRent_HouseOwner = obj.value;
            return;
        }
        gatheringOfficeRentArray[index].gt_OfficeRent_HouseOwner = obj.value;
        return;
    }

    var obj = document.getElementById("HouseRentTextBoxHouseOwner_" + index);
    //alert(obj.value.length);
    if (obj.value.indexOf("~") != -1 || obj.value.indexOf("|") != -1) {
        alert("第" + no + "行的项目地房租支付明细-房东-中包含非法字符“~”，“|”，请重新输入。");
        obj.value = gatheringHouseRentArray[index].gt_HouseRent_HouseOwner;
        return;
    }
    if (obj.value.length > 150) {
        obj.value = obj.value.substring(0, 150);
        alert("第" + no + "行的项目地房租支付明细-房东-至多只能录入150个字符。");
        gatheringHouseRentArray[index].gt_HouseRent_HouseOwner = obj.value;
        return;
    }
    gatheringHouseRentArray[index].gt_HouseRent_HouseOwner = obj.value;
}
//20120515 wanghk 最大入住人数
function setHouseRentLargestNumberIn(index) {
    var no = index + 1;
    //日常用品及生活维修支付明细
    if (document.getElementById('hiddenExpType').value == '1') {
        var objMaintain = document.getElementById("MaintainTextBoxLargestNumberIn_" + index);
        if (objMaintain.value == "") {
            return;
        }
        if (!isMoneyValue(objMaintain.value)) {
            alert('第' + no + '行的日常用品及生活维修支付明细-最大入住人数-格式不合法');
            objMaintain.value = "";
            return;
        }

        if (objMaintain.value <= 0) {
            alert('第' + no + '行的日常用品及生活维修支付明细-最大入住人数-格式不合法');
            objMaintain.value = "";
            return;
        }
        gatheringMaintainArray[index].gt_Maintain_LargestNumberIn = objMaintain.value;
        return;
    }
    //房租代垫税金
    if (document.getElementById('hiddenExpType').value == '2') {
        var objRantTax = document.getElementById("RantTaxTextBoxLargestNumberIn_" + index);
        if (objRantTax.value == "") {
            return;
        }
        if (!isMoneyValue(objRantTax.value)) {
            alert('第' + no + '行的房租代垫税金明细-最大入住人数-格式不合法');
            objRantTax.value = "";
            return;
        }

        if (objRantTax.value <= 0) {
            alert('第' + no + '行的房租代垫税金明细-最大入住人数-格式不合法');
            objRantTax.value = "";
            return;
        }
        gatheringRantTaxArray[index].gt_RantTax_LargestNumberIn = objRantTax.value;
        return;
    }
    //水电煤气物业费
    if (document.getElementById('hiddenExpType').value == '3') {
        var objUtilitiesCharges = document.getElementById("UtilitiesChargesTextBoxLargestNumberIn_" + index);
        if (objUtilitiesCharges.value == "") {
            return;
        }
        if (!isMoneyValue(objUtilitiesCharges.value)) {
            alert('第' + no + '行的水电煤气物业费明细-最大入住人数-格式不合法');
            objUtilitiesCharges.value = "";
            return;
        }

        if (objUtilitiesCharges.value <= 0) {
            alert('第' + no + '行的水电煤气物业费明细-最大入住人数-格式不合法');
            objUtilitiesCharges.value = "";
            return;
        }
        gatheringUtilitiesChargesArray[index].gt_UtilitiesCharges_LargestNumberIn = objUtilitiesCharges.value;
        return;
    }
    //办公场地费-其他公共费用
    if (document.getElementById('hiddenExpType').value == '47') {
        var objOtherPublicCharges = document.getElementById("OtherPublicChargesTextBoxLargestNumberIn_" + index);
        if (objOtherPublicCharges.value == "") {
            return;
        }
        if (!isMoneyValue(objOtherPublicCharges.value)) {
            alert('第' + no + '行的办公场地费-其他公共费用明细-最大入住人数-格式不合法');
            objOtherPublicCharges.value = "";
            return;
        }

        if (objOtherPublicCharges.value <= 0) {
            alert('第' + no + '行的办公场地费-其他公共费用明细-最大入住人数-格式不合法');
            objOtherPublicCharges.value = "";
            return;
        }
        gatheringOtherPublicChargesArray[index].gt_OtherPublicCharges_LargestNumberIn = objOtherPublicCharges.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '48') {
        var objElectricCharges = document.getElementById("ElectricChargesTextBoxLargestNumberIn_" + index);
        if (objElectricCharges.value == "") {
            return;
        }
        if (!isMoneyValue(objElectricCharges.value)) {
            alert('第' + no + '行的办公场地费-电费费用明细-最大入住人数-格式不合法');
            objElectricCharges.value = "";
            return;
        }

        if (objElectricCharges.value <= 0) {
            alert('第' + no + '行的办公场地费-电费费用明细-最大入住人数-格式不合法');
            objElectricCharges.value = "";
            return;
        }
        gatheringElectricChargesArray[index].gt_ElectricCharges_LargestNumberIn = objElectricCharges.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '49') {
        var objDailyWterUsage = document.getElementById("DailyWterUsageTextBoxLargestNumberIn_" + index);
        if (objDailyWterUsage.value == "") {
            return;
        }
        if (!isMoneyValue(objDailyWterUsage.value)) {
            alert('第' + no + '行的办公场地费-日常用水费用明细-最大入住人数-格式不合法');
            objDailyWterUsage.value = "";
            return;
        }

        if (objDailyWterUsage.value <= 0) {
            alert('第' + no + '行的办公场地费-日常用水费用明细-最大入住人数-格式不合法');
            objDailyWterUsage.value = "";
            return;
        }
        gatheringDailyWterUsageArray[index].gt_DailyWterUsage_LargestNumberIn = objDailyWterUsage.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '50') {
        var objDrinkingWater = document.getElementById("DrinkingWaterTextBoxLargestNumberIn_" + index);
        if (objDrinkingWater.value == "") {
            return;
        }
        if (!isMoneyValue(objDrinkingWater.value)) {
            alert('第' + no + '行的办公场地费-饮用水费用明细-最大入住人数-格式不合法');
            objDrinkingWater.value = "";
            return;
        }

        if (objDrinkingWater.value <= 0) {
            alert('第' + no + '行的办公场地费-饮用水费用明细-最大入住人数-格式不合法');
            objDrinkingWater.value = "";
            return;
        }
        gatheringDrinkingWaterArray[index].gt_DrinkingWater_LargestNumberIn = objDrinkingWater.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '51') {
        var objPropertyFee = document.getElementById("PropertyFeeTextBoxLargestNumberIn_" + index);
        if (objPropertyFee.value == "") {
            return;
        }
        if (!isMoneyValue(objPropertyFee.value)) {
            alert('第' + no + '行的办公场地费-物业费费用明细-最大入住人数-格式不合法');
            objPropertyFee.value = "";
            return;
        }

        if (objPropertyFee.value <= 0) {
            alert('第' + no + '行的办公场地费-物业费费用明细-最大入住人数-格式不合法');
            objPropertyFee.value = "";
            return;
        }
        gatheringPropertyFeeArray[index].gt_PropertyFee_LargestNumberIn = objPropertyFee.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '52') {
        var objGasFee = document.getElementById("GasFeeTextBoxLargestNumberIn_" + index);
        if (objGasFee.value == "") {
            return;
        }
        if (!isMoneyValue(objGasFee.value)) {
            alert('第' + no + '行的办公场地费-燃气费费用明细-最大入住人数-格式不合法');
            objGasFee.value = "";
            return;
        }

        if (objGasFee.value <= 0) {
            alert('第' + no + '行的办公场地费-燃气费费用明细-最大入住人数-格式不合法');
            objGasFee.value = "";
            return;
        }
        gatheringGasFeeArray[index].gt_GasFee_LargestNumberIn = objGasFee.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '53') {
        var objOfficeCommodityConsumption = document.getElementById("OfficeCommodityConsumptionTextBoxLargestNumberIn_" + index);
        if (objOfficeCommodityConsumption.value == "") {
            return;
        }
        if (!isMoneyValue(objOfficeCommodityConsumption.value)) {
            alert('第' + no + '行的办公场地费-日用品消耗费用明细-最大入住人数-格式不合法');
            objOfficeCommodityConsumption.value = "";
            return;
        }

        if (objOfficeCommodityConsumption.value <= 0) {
            alert('第' + no + '行的办公场地费-日用品消耗费用明细-最大入住人数-格式不合法');
            objOfficeCommodityConsumption.value = "";
            return;
        }
        gatheringOfficeCommodityConsumptionArray[index].gt_OfficeCommodityConsumption_LargestNumberIn = objOfficeCommodityConsumption.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '54') {
        var obj = document.getElementById("HousingAgencyFeeTextBoxLargestNumberIn_" + index);
        //检查输入的是否是数字
        if (obj.value == "") {
            return;
        }
        if (!isMoneyValue(obj.value)) {
            alert('第' + no + '行的办公场地费-房屋中介费支付明细-最大入住人数-格式不合法');
            obj.value = "";
            return;
        }

        if (obj.value <= 0) {
            alert('第' + no + '行的办公场地费-房屋中介费支付明细-最大入住人数-格式不合法');
            obj.value = "";
            return;
        }

        gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_LargestNumberIn = obj.value;
        return;
    }
    if (document.getElementById('hiddenExpType').value == '46') {
        var obj = document.getElementById("OfficeRentTextBoxLargestNumberIn_" + index);
        //检查输入的是否是数字
        if (obj.value == "") {
            return;
        }
        if (!isMoneyValue(obj.value)) {
            alert('第' + no + '行的办公场地公摊-办公用房租费支付明细-最大入住人数-格式不合法');
            obj.value = "";
            return;
        }

        if (obj.value <= 0) {
            alert('第' + no + '行的办公场地公摊-办公用房租费支付明细-最大入住人数-格式不合法');
            obj.value = "";
            return;
        }

        gatheringOfficeRentArray[index].gt_OfficeRent_LargestNumberIn = obj.value;
        return;
    }
    var obj = document.getElementById("HouseRentTextBoxLargestNumberIn_" + index);
    //检查输入的是否是数字
    if (obj.value == "") {
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的项目地房租支付明细-最大入住人数-格式不合法');
        obj.value = "";
        return;
    }

    if (obj.value <= 0) {
        alert('第' + no + '行的项目地房租支付明细-最大入住人数-格式不合法');
        obj.value = "";
        return;
    }

    gatheringHouseRentArray[index].gt_HouseRent_LargestNumberIn = obj.value;
}
//20120515 wanghk 缴费性质
function setHouseRentPayNature(index) {
    if (document.getElementById('hiddenExpType').value == '54') {
        setHousingAgencyFeePayNature(index);
    } else if (document.getElementById('hiddenExpType').value == '46') {
        setOfficeRentPayNature(index);
    } 
    
    else {
        var obj = document.getElementById("PayNature_" + index);
        gatheringHouseRentArray[index].gt_HouseRent_PayNature = obj.value;
    }

}
//租赁性质
function setHouseRentLeaseNature(index) {
    if (document.getElementById('hiddenExpType').value == '54') {
        setHousingAgencyFeeLeaseNature(index);
    } else if (document.getElementById('hiddenExpType').value == '46') {
        setOfficeRentLeaseNature(index);
    } else {
        var obj = document.getElementById("LeaseNature_" + index);
        if (obj.value == "" || obj.value == undefined || obj.value == null) {
            alert("项目地房租支付明细第“" + index + 1 + "”行的租赁性质不能为空，请选择");
            return;
        }
        gatheringHouseRentArray[index].gt_HouseRent_LeaseNature = obj.value;
    }
}
//删除选定行
function deleteHouseRentRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringHouseRentArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringHouseRentArray[i];
            tempArray[j].gt_HouseRent_OrderNo = j + 1;
            j++;
        }
    }

    gatheringHouseRentArray = tempArray;
    refreshHouseRentData();
}
function deleteHouseRentRow2(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringHouseRentArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringHouseRentArray[i];
            tempArray[j].gt_HouseRent_OrderNo = j + 1;
            j++;
        }
    }

    gatheringHouseRentArray = tempArray;
    refreshHouseRentData2();
}
//计算房租金额合计
function calHouseRentSum() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringHouseRentArray.length; i++) {
        var amount = gatheringHouseRentArray[i].gt_HouseRent_AllRent;

        amount = amount.replace(/\,/g, "");
        sumAmount += parseFloat(amount);
    }
    document.all.LabelSumHouseRentAmount.innerText = formatCurrency(sumAmount);
}
///20130529 mfj
function calHouseRentSum2() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringHouseRentArray.length; i++) {
        var amount = gatheringHouseRentArray[i].gt_HouseRent_AllRent;

        amount = amount.replace(/\,/g, "");
        sumAmount += parseFloat(amount);
    }
    document.all.LabelSumHouseRentAmount.innerText = formatCurrency(sumAmount);
}
function setHouseRentTaxNo(index) {
    var obj = document.getElementById("HouseRentTextBoxTaxNo_" + index);
    var no = index + 1;
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;
    gatheringHouseRentArray[index].gt_HouseRent_TaxNo = '';
    if (!obj.value || obj.value == '') {
        alert('第' + no + '行的发票号不能为空');
        return;
    }
    gatheringHouseRentArray[index].gt_HouseRent_TaxNo = obj.value;
}
function HouseRentItemSubmit() {
    var HouseRentProjectTeamList = '';
    var HouseRentCityList = '';
    var HouseRentAddressList = '';
    var HouseRentContractStartList = '';
    var HouseRentContractEndList = '';
    var HouseRentMonthRentList = '';
    var HouseRentAllRentList = '';
    var HouseRentHireStartList = '';
    var HouseRentHireEndList = '';
    var HouseRentOrderNoList = '';

    //20101215 chaidanlei 付款金额和付款租期（起止日）交换位置 增加列：是否按租期分摊
    var HouseRentShareByRentPeriod = '';
    //20120515 wanghk 增加房东，最大入住人数，缴费性质
    var HouseRentHouseOwner = '';
    var HouseRentLargestNumberIn = '';
    var HouseRentPayNature = '';
    //20130529增加合同编码 合同id 城市
    var HouseRentContractId = '';
    var HouseRentContractCode = '';
    //租赁性质
    var HouseRentLeaseNature = '';



    for (var i = 0; i < gatheringHouseRentArray.length; i++) {
        var index = i + 1;

        //项目组
        if (Trim(gatheringHouseRentArray[i].gt_HouseRent_ProjectTeam).length <= 0) {
            alert("项目地房租支付明细第“" + index + "”行的项目组不能为空");
            document.all["HouseRentTextBoxProjectTeam_" + i].focus();
            return false;
        }
        if (gatheringHouseRentArray[i].gt_HouseRent_ProjectTeam.indexOf("~") != -1 || gatheringHouseRentArray[i].gt_HouseRent_ProjectTeam.indexOf("|") != -1) {
            alert('项目地房租支付明细第“' + index + '”行的项目组字符“~”，“|”为非法字符，请重新输入。');
            document.all["HouseRentTextBoxProjectTeam_" + i].focus();
            return false;
        }
        //省市
        if (Trim(gatheringHouseRentArray[i].gt_HouseRent_City).length <= 0) {
            alert("项目地房租支付明细第“" + index + "”行的省市不能为空");
            document.all["HouseRentTextBoxCity_" + i].focus();
            return false;
        }
        if (gatheringHouseRentArray[i].gt_HouseRent_City.indexOf("~") != -1 || gatheringHouseRentArray[i].gt_HouseRent_City.indexOf("|") != -1) {
            alert('项目地房租支付明细第“' + index + '”行的省市字符“~”，“|”为非法字符，请重新输入。');
            document.all["HouseRentTextBoxCity_" + i].focus();
            return false;
        }
        //房屋租住地址
        if (Trim(gatheringHouseRentArray[i].gt_HouseRent_Address).length <= 0) {
            alert("项目地房租支付明细第“" + index + "”行的房屋租住地址不能为空");
            document.all["HouseRentTextBoxAddress_" + i].focus();
            return false;
        }
        if (gatheringHouseRentArray[i].gt_HouseRent_Address.indexOf("~") != -1 || gatheringHouseRentArray[i].gt_HouseRent_Address.indexOf("|") != -1) {
            alert('项目地房租支付明细第“' + index + '”行的房屋租住地址字符“~”，“|”为非法字符，请重新输入。');
            document.all["HouseRentTextBoxAddress_" + i].focus();
            return false;
        }
        //合同开始日期
        if (gatheringHouseRentArray[i].gt_HouseRent_ContractStart == '') {
            alert("项目地房租支付明细第“" + index + "”行的合同开始日期不能为空");
            document.all["HouseRentTextBoxContractStart_" + i].focus();
            return false;
        }
        //合同结束日期
        if (gatheringHouseRentArray[i].gt_HouseRent_ContractEnd == '') {
            alert("项目地房租支付明细第“" + index + "”行的合同结束日期不能为空");
            document.all["HouseRentTextBoxContractEnd_" + i].focus();
            return false;
        }
        //月租金
        if (gatheringHouseRentArray[i].gt_HouseRent_MonthRent == '') {
            alert("项目地房租支付明细第“" + index + "”行的月租金不能为空");
            document.all["HouseRentTextBoxMonthRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringHouseRentArray[i].gt_HouseRent_MonthRent)) {
                alert("项目地房租支付明细第“" + index + "”行的月租金不正确");
                document.all["HouseRentTextBoxMonthRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringHouseRentArray[i].gt_HouseRent_MonthRent <= 0) {
                    alert("项目地房租支付明细第“" + index + "”行的月租金不能小于等于零");
                    document.all["HouseRentTextBoxMonthRent_" + i].focus();
                    return false;
                }
            }
        }
        //房租开始日期
        if (gatheringHouseRentArray[i].gt_HouseRent_HireStart == '') {
            alert("项目地房租支付明细第“" + index + "”此次付款租期开始日不能为空");
            document.all["HouseRentTextBoxHireStart_" + i].focus();
            return false;
        }
        //房租结束日期
        if (gatheringHouseRentArray[i].gt_HouseRent_HireEnd == '') {
            alert("项目地房租支付明细第“" + index + "”行的此次付款租期结束日不能为空");
            document.all["HouseRentTextBoxHireEnd_" + i].focus();
            return false;
        }

        //房租金额
        if (gatheringHouseRentArray[i].gt_HouseRent_AllRent == '') {
            alert("项目地房租支付明细第“" + index + "”行的付款金额不能为空");
            document.all["HouseRentTextBoxAllRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringHouseRentArray[i].gt_HouseRent_AllRent)) {
                alert("项目地房租支付明细第“" + index + "”行的付款金额不正确");
                document.all["HouseRentTextBoxAllRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringHouseRentArray[i].gt_HouseRent_AllRent <= 0) {
                    alert("项目地房租支付明细第“" + index + "”行的付款金额不能小于等于零");
                    document.all["HouseRentTextBoxAllRent_" + i].focus();
                    return false;
                }
            }
        }
        //20101215 chaidanlei 增加列：是否按租期分摊 gt_HouseRent_IsShareByRentPeriod
        /* if ((gatheringHouseRentArray[i].gt_HouseRent_IsShareByRentPeriod).length <= 0) {
        alert("项目地房租支付明细第“" + index + "”行的是否按租期分摊不能为空，请选择");
        document.all["ShareByRentPeriod_" + i].focus();
        return false;
        }
        if (gatheringHouseRentArray[i].gt_HouseRent_IsShareByRentPeriod.indexOf("~") != -1 || gatheringHouseRentArray[i].gt_HouseRent_IsShareByRentPeriod.indexOf("|") != -1) {
        alert('项目地房租支付明细第“' + index + '”行的是否按租期分摊字符“~”，“|”为非法字符，请重新输入。');
        document.all["ShareByRentPeriod_" + i].focus();
        return false;
        }*/

        //20120515 wanghk 增加列：房东 gt_HouseRent_HouseOwner
        if ((gatheringHouseRentArray[i].gt_HouseRent_HouseOwner).length <= 0) {
            alert("项目地房租支付明细第“" + index + "”行的房东不能为空，请重新输入。");
            document.all["HouseRentTextBoxHouseOwner_" + i].focus();
            return false;
        }
        if (gatheringHouseRentArray[i].gt_HouseRent_HouseOwner.indexOf("~") != -1 || gatheringHouseRentArray[i].gt_HouseRent_HouseOwner.indexOf("|") != -1) {
            alert('项目地房租支付明细第“' + index + '”行的房东字符“~”，“|”为非法字符，请重新输入。');
            document.all["HouseRentTextBoxHouseOwner_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：最大入住人数 gt_HouseRent_LargestNumberIn
        if ((gatheringHouseRentArray[i].gt_HouseRent_LargestNumberIn).length <= 0) {
            alert("项目地房租支付明细第“" + index + "”行的最大入住人数不能为空，请重新输入。");
            document.all["HouseRentTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if (gatheringHouseRentArray[i].gt_HouseRent_LargestNumberIn.indexOf("~") != -1 || gatheringHouseRentArray[i].gt_HouseRent_LargestNumberIn.indexOf("|") != -1) {
            alert('项目地房租支付明细第“' + index + '”行的最大入住人数字符“~”，“|”为非法字符，请重新输入。');
            document.all["HouseRentTextBoxLargestNumberIn_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：缴费性质 gt_HouseRent_PayNature
        if ((gatheringHouseRentArray[i].gt_HouseRent_PayNature).length <= 0) {
            alert("项目地房租支付明细第“" + index + "”行的缴费性质不能为空，请选择");
            document.all["PayNature_" + i].focus();
            return false;
        }

        if ((gatheringHouseRentArray[i].gt_HouseRent_LeaseNature).length <= 0) {
            alert("项目地房租支付明细第“" + index + "”行的租赁性质不能为空，请选择");
            document.all["LeaseNature" + i].focus();
            return false;
        }

        HouseRentProjectTeamList += '~' + gatheringHouseRentArray[i].gt_HouseRent_ProjectTeam;
        HouseRentCityList += '~' + gatheringHouseRentArray[i].gt_HouseRent_City;
        HouseRentAddressList += '~' + gatheringHouseRentArray[i].gt_HouseRent_Address;
        HouseRentContractStartList += '~' + gatheringHouseRentArray[i].gt_HouseRent_ContractStart;
        HouseRentContractEndList += '~' + gatheringHouseRentArray[i].gt_HouseRent_ContractEnd;
        HouseRentMonthRentList += '~' + gatheringHouseRentArray[i].gt_HouseRent_MonthRent;
        HouseRentAllRentList += '~' + gatheringHouseRentArray[i].gt_HouseRent_AllRent;
        HouseRentHireStartList += '~' + gatheringHouseRentArray[i].gt_HouseRent_HireStart;
        HouseRentHireEndList += '~' + gatheringHouseRentArray[i].gt_HouseRent_HireEnd;
        HouseRentOrderNoList += '~' + gatheringHouseRentArray[i].gt_HouseRent_OrderNo;
        //20101215 chaidanlei 增加列：是否按租期分摊
        // HouseRentShareByRentPeriod += '~' + gatheringHouseRentArray[i].gt_HouseRent_IsShareByRentPeriod;
        //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
        HouseRentHouseOwner += '~' + gatheringHouseRentArray[i].gt_HouseRent_HouseOwner;
        HouseRentLargestNumberIn += '~' + gatheringHouseRentArray[i].gt_HouseRent_LargestNumberIn;
        HouseRentPayNature += '~' + gatheringHouseRentArray[i].gt_HouseRent_PayNature;
        //租赁性质
        HouseRentLeaseNature += '~' + gatheringHouseRentArray[i].gt_HouseRent_LeaseNature;

    }
    HouseRentProjectTeamList = HouseRentProjectTeamList.substr(1);
    HouseRentCityList = HouseRentCityList.substr(1);
    HouseRentAddressList = HouseRentAddressList.substr(1);
    HouseRentContractStartList = HouseRentContractStartList.substr(1);
    HouseRentContractEndList = HouseRentContractEndList.substr(1);
    HouseRentMonthRentList = HouseRentMonthRentList.substr(1);
    HouseRentAllRentList = HouseRentAllRentList.substr(1);
    HouseRentHireStartList = HouseRentHireStartList.substr(1);
    HouseRentHireEndList = HouseRentHireEndList.substr(1);
    HouseRentOrderNoList = HouseRentOrderNoList.substr(1);
    //20101215 chaidanlei 增加列：是否按租期分摊
    //HouseRentShareByRentPeriod = HouseRentShareByRentPeriod.substr(1);
    //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
    HouseRentHouseOwner = HouseRentHouseOwner.substr(1);
    HouseRentLargestNumberIn = HouseRentLargestNumberIn.substr(1);
    HouseRentPayNature = HouseRentPayNature.substr(1);
    //租赁性质
    HouseRentLeaseNature = HouseRentLeaseNature.substr(1);


    document.all.hiddenHouseRentInfo.value = HouseRentProjectTeamList + "|"
														+ HouseRentCityList + "|"
														+ HouseRentAddressList + "|"
														+ HouseRentContractStartList + "|"
														+ HouseRentContractEndList + "|"
                                                        + HouseRentHouseOwner + "|"
														+ HouseRentMonthRentList + "|"
                                                        + HouseRentLargestNumberIn + "|"
														+ HouseRentHireStartList + "|"
														+ HouseRentHireEndList + "|"
														+ HouseRentAllRentList + "|"
                                                        + HouseRentPayNature + "|"
														+ HouseRentOrderNoList + "|"
                                                        + HouseRentLeaseNature;
}
//20130529 mfj
function HouseRentItemSubmit2() {
    var HouseRentProjectTeamList = '';
    var HouseRentCityList = '';
    var HouseRentAddressList = '';
    var HouseRentContractStartList = '';
    var HouseRentContractEndList = '';
    var HouseRentMonthRentList = '';
    var HouseRentAllRentList = '';
    var HouseRentHireStartList = '';
    var HouseRentHireEndList = '';
    var HouseRentOrderNoList = '';
    var HouseRentTaxNoList = '';
    //20101215 chaidanlei 付款金额和付款租期（起止日）交换位置 增加列：是否按租期分摊
    var HouseRentShareByRentPeriod = '';
    //20120515 wanghk 增加房东，最大入住人数，缴费性质
    var HouseRentHouseOwner = '';
    var HouseRentLargestNumberIn = '';
    var HouseRentPayNature = '';
    //租赁性质
    var HouseRentLeaseNature = '';
    //20130529增加合同编码 合同id
    var HouseRentContractId = '';
    var HouseRentContractCode = '';
    var HouseRentCityText = '';
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;

    for (var i = 0; i < gatheringHouseRentArray.length; i++) {
        var index = i + 1;

        //项目组
        if (Trim(gatheringHouseRentArray[i].gt_HouseRent_ProjectTeam).length <= 0) {
            alert("项目地房租支付明细第“" + index + "”行的项目组不能为空");
            document.all["HouseRentTextBoxProjectTeam_" + i].focus();
            return false;
        }
        if (gatheringHouseRentArray[i].gt_HouseRent_ProjectTeam.indexOf("~") != -1 || gatheringHouseRentArray[i].gt_HouseRent_ProjectTeam.indexOf("|") != -1) {
            alert('项目地房租支付明细第“' + index + '”行的项目组字符“~”，“|”为非法字符，请重新输入。');
            document.all["HouseRentTextBoxProjectTeam_" + i].focus();
            return false;
        }
        //省市
        if (Trim(gatheringHouseRentArray[i].gt_HouseRent_City).length <= 0) {
            alert("项目地房租支付明细第“" + index + "”行的省市不能为空");
            document.all["HouseRentTextBoxHouseCity_" + i].focus();
            return false;
        }
        if (gatheringHouseRentArray[i].gt_HouseRent_City.indexOf("~") != -1 || gatheringHouseRentArray[i].gt_HouseRent_City.indexOf("|") != -1) {
            alert('项目地房租支付明细第“' + index + '”行的省市字符“~”，“|”为非法字符，请重新输入。');
            document.all["HouseRentTextBoxHouseCity_" + i].focus();
            return false;
        }
        //房屋租住地址
        if (Trim(gatheringHouseRentArray[i].gt_HouseRent_Address).length <= 0) {
            alert("项目地房租支付明细第“" + index + "”行的房屋租住地址不能为空");
            document.all["HouseRentTextBoxAddress_" + i].focus();
            return false;
        }
        if (gatheringHouseRentArray[i].gt_HouseRent_Address.indexOf("~") != -1 || gatheringHouseRentArray[i].gt_HouseRent_Address.indexOf("|") != -1) {
            alert('项目地房租支付明细第“' + index + '”行的房屋租住地址字符“~”，“|”为非法字符，请重新输入。');
            document.all["HouseRentTextBoxAddress_" + i].focus();
            return false;
        }
        //合同开始日期
        if (gatheringHouseRentArray[i].gt_HouseRent_ContractStart == '') {
            alert("项目地房租支付明细第“" + index + "”行的合同开始日期不能为空");
            document.all["HouseRentTextBoxContractStart_" + i].focus();
            return false;
        }
        //合同结束日期
        if (gatheringHouseRentArray[i].gt_HouseRent_ContractEnd == '') {
            alert("项目地房租支付明细第“" + index + "”行的合同结束日期不能为空");
            document.all["HouseRentTextBoxContractEnd_" + i].focus();
            return false;
        }
        if (gatheringHouseRentArray[i].gt_HouseRent_TaxNo == '' && document.getElementById("hiddenvoucherTypeID").value == "32310D48-1CD6-4044-82DD-BD92BABD74D5") {
            alert("项目地房租支付明细第“" + index + "”行的发票号不能为空");
            document.all["HouseRentTextBoxTaxNo_" + i].focus();
            return false;
        }
        //月租金
        if (gatheringHouseRentArray[i].gt_HouseRent_MonthRent == '') {
            alert("项目地房租支付明细第“" + index + "”行的月租金不能为空");
            document.all["HouseRentTextBoxMonthRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringHouseRentArray[i].gt_HouseRent_MonthRent)) {
                alert("项目地房租支付明细第“" + index + "”行的月租金不正确");
                document.all["HouseRentTextBoxMonthRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringHouseRentArray[i].gt_HouseRent_MonthRent < 0) {
                    alert("项目地房租支付明细第“" + index + "”行的月租金不能小于等于零");
                    document.all["HouseRentTextBoxMonthRent_" + i].focus();
                    return false;
                }
            }
        }
        //房租开始日期
        if (gatheringHouseRentArray[i].gt_HouseRent_HireStart == '') {
            alert("项目地房租支付明细第“" + index + "”行此次付款租期开始日不能为空");
            document.all["HouseRentTextBoxHireStart_" + i].focus();
            return false;
        }
        else {
            var contractStart = gatheringHouseRentArray[i].gt_HouseRent_ContractStart;
            var obj = gatheringHouseRentArray[i].gt_HouseRent_HireStart;
            var contractend = gatheringHouseRentArray[i].gt_HouseRent_ContractEnd;

            var contractBeginDate = getYMD(contractStart);
            var houseRentHireBeginDate = getYMD(obj);
            var contractEndDate = getYMD(contractend);
            if (contractBeginDate - houseRentHireBeginDate > 0) {
                alert("项目地房租支付明细第“" + index + "”行此次付款租期开始日期不能小于合同开始日期");
                return false;
            }
            if (houseRentHireBeginDate - contractEndDate > 0) {
                alert("项目地房租支付明细第“" + index + "”行此次付款租期开始日期不能大于合同结束日期");
                return false;
            }


            var objend = gatheringHouseRentArray[i].gt_HouseRent_HireEnd;
            if (objend != "") {
                var houseRentHireEndDate = getYMD(objend);
                if (houseRentHireBeginDate - houseRentHireEndDate > 0) {
                    alert("项目地房租支付明细第“" + index + "”行此次付款租期开始日期不能大于此次付款租期结束日期");
                    return false;
                }
            }
        }

        //房租结束日期
        if (gatheringHouseRentArray[i].gt_HouseRent_HireEnd == '') {
            alert("项目地房租支付明细第“" + index + "”行的此次付款租期结束日不能为空");
            document.all["HouseRentTextBoxHireEnd_" + i].focus();
            return false;
        }
        else {
            var contractend = gatheringHouseRentArray[i].gt_HouseRent_ContractEnd;
            var obj = gatheringHouseRentArray[i].gt_HouseRent_HireEnd;
            var contractStart = gatheringHouseRentArray[i].gt_HouseRent_ContractStart;

            var contractEndDate = getYMD(contractend);
            var houseRentHireEndDate = getYMD(obj);
            var contractBeginDate = getYMD(contractStart);
            if (houseRentHireEndDate - contractEndDate > 0) {
                alert("项目地房租支付明细第“" + index + "”行此次付款结束日期不能大于合同结束日期");
                return false;
            }
            if (contractBeginDate - houseRentHireEndDate > 0) {
                alert("项目地房租支付明细第“" + index + "”行此次付款结束日期不能小于合同开始日期");
                return false;
            }
            var objstart = gatheringHouseRentArray[i].gt_HouseRent_ContractStart;
            if (objstart != "") {
                var houseRentHireStartDate = getYMD(objstart);
                if (houseRentHireStartDate - houseRentHireEndDate > 0) {
                    alert("项目地房租支付明细第“" + index + "”行此次付款结束日期不能小于此次付款开始日期");
                    return false;
                }
            }
        }


        //房租金额
        if (gatheringHouseRentArray[i].gt_HouseRent_AllRent == '') {
            alert("项目地房租支付明细第“" + index + "”行的付款金额不能为空");
            document.all["HouseRentTextBoxAllRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringHouseRentArray[i].gt_HouseRent_AllRent)) {
                alert("项目地房租支付明细第“" + index + "”行的付款金额不正确");
                document.all["HouseRentTextBoxAllRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringHouseRentArray[i].gt_HouseRent_AllRent <= 0) {
                    alert("项目地房租支付明细第“" + index + "”行的付款金额不能小于等于零");
                    document.all["HouseRentTextBoxAllRent_" + i].focus();
                    return false;
                }
            }
        }
        //20101215 chaidanlei 增加列：是否按租期分摊 gt_HouseRent_IsShareByRentPeriod
        //if ((gatheringHouseRentArray[i].gt_HouseRent_IsShareByRentPeriod).length <= 0) {
        // alert("项目地房租支付明细第“" + index + "”行的是否按租期分摊不能为空，请选择");
        //document.all["ShareByRentPeriod_" + i].focus();
        //return false;
        // }
        // if (gatheringHouseRentArray[i].gt_HouseRent_IsShareByRentPeriod.indexOf("~") != -1 || gatheringHouseRentArray[i].gt_HouseRent_IsShareByRentPeriod.indexOf("|") != -1) {
        //alert('项目地房租支付明细第“' + index + '”行的是否按租期分摊字符“~”，“|”为非法字符，请重新输入。');
        //document.all["ShareByRentPeriod_" + i].focus();
        //return false;
        // }

        //20120515 wanghk 增加列：房东 gt_HouseRent_HouseOwner
        if ((gatheringHouseRentArray[i].gt_HouseRent_HouseOwner).length <= 0) {
            alert("项目地房租支付明细第“" + index + "”行的房东不能为空，请重新输入。");
            document.all["HouseRentTextBoxHouseOwner_" + i].focus();
            return false;
        }
        if (gatheringHouseRentArray[i].gt_HouseRent_HouseOwner.indexOf("~") != -1 || gatheringHouseRentArray[i].gt_HouseRent_HouseOwner.indexOf("|") != -1) {
            alert('项目地房租支付明细第“' + index + '”行的房东字符“~”，“|”为非法字符，请重新输入。');
            document.all["HouseRentTextBoxHouseOwner_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：最大入住人数 gt_HouseRent_LargestNumberIn
        if ((gatheringHouseRentArray[i].gt_HouseRent_LargestNumberIn).length <= 0) {
            alert("项目地房租支付明细第“" + index + "”行的最大入住人数不能为空，请重新输入。");
            document.all["HouseRentTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if (gatheringHouseRentArray[i].gt_HouseRent_LargestNumberIn.indexOf("~") != -1 || gatheringHouseRentArray[i].gt_HouseRent_LargestNumberIn.indexOf("|") != -1) {
            alert('项目地房租支付明细第“' + index + '”行的最大入住人数字符“~”，“|”为非法字符，请重新输入。');
            document.all["HouseRentTextBoxLargestNumberIn_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：缴费性质 gt_HouseRent_PayNature
        if ((gatheringHouseRentArray[i].gt_HouseRent_PayNature).length <= 0) {
            alert("项目地房租支付明细第“" + index + "”行的缴费性质不能为空，请选择");
            document.all["PayNature_" + i].focus();
            return false;
        }
        //20130529 mfj  增加列：合同Id 合同Code

        if ((gatheringHouseRentArray[i].gt_HouseRent_HouseContract).length <= 0) {
            alert("项目地房租支付明细第“" + index + "”行的合同不能为空，请选择");
            document.all["HouseRentTextBoxHouseContract_" + i].focus();
            return false;
        }

        if ((gatheringHouseRentArray[i].gt_HouseRent_LeaseNature).length <= 0) {
            alert("项目地房租支付明细第“" + index + "”行的租赁性质不能为空，请选择");
            document.all["LeaseNature_" + i].focus();
            return false;
        }

        HouseRentProjectTeamList += '~' + gatheringHouseRentArray[i].gt_HouseRent_ProjectTeam;
        HouseRentCityList += '~' + gatheringHouseRentArray[i].gt_HouseRent_HouseCityID;
        HouseRentAddressList += '~' + gatheringHouseRentArray[i].gt_HouseRent_Address;
        HouseRentContractStartList += '~' + gatheringHouseRentArray[i].gt_HouseRent_ContractStart;
        HouseRentContractEndList += '~' + gatheringHouseRentArray[i].gt_HouseRent_ContractEnd;
        HouseRentMonthRentList += '~' + gatheringHouseRentArray[i].gt_HouseRent_MonthRent;
        HouseRentAllRentList += '~' + gatheringHouseRentArray[i].gt_HouseRent_AllRent;
        HouseRentHireStartList += '~' + gatheringHouseRentArray[i].gt_HouseRent_HireStart;
        HouseRentHireEndList += '~' + gatheringHouseRentArray[i].gt_HouseRent_HireEnd;
        HouseRentOrderNoList += '~' + gatheringHouseRentArray[i].gt_HouseRent_OrderNo;
        //20101215 chaidanlei 增加列：是否按租期分摊
        //HouseRentShareByRentPeriod += '~' + gatheringHouseRentArray[i].gt_HouseRent_IsShareByRentPeriod;
        //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
        HouseRentHouseOwner += '~' + gatheringHouseRentArray[i].gt_HouseRent_HouseOwner;
        HouseRentLargestNumberIn += '~' + gatheringHouseRentArray[i].gt_HouseRent_LargestNumberIn;
        HouseRentPayNature += '~' + gatheringHouseRentArray[i].gt_HouseRent_PayNature;

        //20130529 mfj  增加列：合同Id 合同Code
        HouseRentContractId += '~' + gatheringHouseRentArray[i].gt_HouseRent_HouseContractID;
        HouseRentContractCode += '~' + gatheringHouseRentArray[i].gt_HouseRent_HouseContract;
        HouseRentCityText += '~' + gatheringHouseRentArray[i].gt_HouseRent_City;
        HouseRentTaxNoList += '~' + gatheringHouseRentArray[i].gt_HouseRent_TaxNo;
        //租赁性质
        HouseRentLeaseNature += '~' + gatheringHouseRentArray[i].gt_HouseRent_LeaseNature;
    }
    HouseRentProjectTeamList = HouseRentProjectTeamList.substr(1);
    HouseRentCityList = HouseRentCityList.substr(1);
    HouseRentAddressList = HouseRentAddressList.substr(1);
    HouseRentContractStartList = HouseRentContractStartList.substr(1);
    HouseRentContractEndList = HouseRentContractEndList.substr(1);
    HouseRentMonthRentList = HouseRentMonthRentList.substr(1);
    HouseRentAllRentList = HouseRentAllRentList.substr(1);
    HouseRentHireStartList = HouseRentHireStartList.substr(1);
    HouseRentHireEndList = HouseRentHireEndList.substr(1);
    HouseRentOrderNoList = HouseRentOrderNoList.substr(1);
    //20101215 chaidanlei 增加列：是否按租期分摊
    //HouseRentShareByRentPeriod = HouseRentShareByRentPeriod.substr(1);
    //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
    HouseRentHouseOwner = HouseRentHouseOwner.substr(1);
    HouseRentLargestNumberIn = HouseRentLargestNumberIn.substr(1);
    HouseRentPayNature = HouseRentPayNature.substr(1);
    //20130529 mfj  增加列：合同Id 合同Code
    HouseRentContractId = HouseRentContractId.substr(1);
    HouseRentContractCode = HouseRentContractCode.substr(1);
    HouseRentCityText = HouseRentCityText.substr(1);
    HouseRentTaxNoList = HouseRentTaxNoList.substr(1);
    //租赁性质
    HouseRentLeaseNature = HouseRentLeaseNature.substr(1);

    document.all.hiddenHouseRentInfo.value = HouseRentProjectTeamList + "|"
														+ HouseRentCityList + "|"
														+ HouseRentAddressList + "|"
														+ HouseRentContractStartList + "|"
														+ HouseRentContractEndList + "|"
                                                        + HouseRentHouseOwner + "|"
														+ HouseRentMonthRentList + "|"
                                                        + HouseRentLargestNumberIn + "|"
														+ HouseRentHireStartList + "|"
														+ HouseRentHireEndList + "|"
														+ HouseRentAllRentList + "|"
                                                        + HouseRentPayNature + "|"
														+ HouseRentOrderNoList + "|"
                                                        + HouseRentContractId + "|"
                                                        + HouseRentContractCode + "|"
                                                        + HouseRentCityText + "|"
                                                        + HouseRentTaxNoList + "|"
                                                        + HouseRentLeaseNature;
}

////////////////////////////////////////////其他应付款-工会经费////////////////////////////////////////////////////

var gatheringTradeUnionArray = new Array();
//添加空白一行
function addTradeUnionRow() {
    var index = gatheringTradeUnionArray.length;
    gatheringTradeUnionArray[index] = new jsTradeUnionGathering('', '', '', '', '', '', '0', '', '0');
    refreshTradeUnionData();
    copyTradeUnionDataFromPreRow(gatheringTradeUnionArray.length);
}
//添加一行的时候，复制上一行的数据
function copyTradeUnionDataFromPreRow(index) {
    if (index == 1)
        return;

    var sel_SrcObj = document.getElementById('TradeUnionTextBoxBeginDate_' + (index - 2));
    var sel_TarObj = document.getElementById('TradeUnionTextBoxBeginDate_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTradeUnionBeginDate(index - 1);

    sel_SrcObj = document.getElementById('TradeUnionTextBoxEndDate_' + (index - 2));
    sel_TarObj = document.getElementById('TradeUnionTextBoxEndDate_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTradeUnionEndDate(index - 1);

    sel_SrcObj = document.getElementById('TradeUnionTextBoxTitle_' + (index - 2));
    sel_TarObj = document.getElementById('TradeUnionTextBoxTitle_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTradeUnionTitle(index - 1);

    sel_SrcObj = document.getElementById('TradeUnionTextBoxPlace_' + (index - 2));
    sel_TarObj = document.getElementById('TradeUnionTextBoxPlace_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTradeUnionPlace(index - 1);

    sel_SrcObj = document.getElementById('TradeUnionTextBoxPerson_' + (index - 2));
    sel_TarObj = document.getElementById('TradeUnionTextBoxPerson_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTradeUnionPersons(index - 1);

    sel_SrcObj = document.getElementById('TradeUnionTextBoxDescription_' + (index - 2));
    sel_TarObj = document.getElementById('TradeUnionTextBoxDescription_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTradeUnionDescription(index - 1);

    sel_SrcObj = document.getElementById('TradeUnionTextBoxAmount_' + (index - 2));
    sel_TarObj = document.getElementById('TradeUnionTextBoxAmount_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTradeUnionAmount(index - 1);

    sel_SrcObj = document.getElementById('TradeUnionTextBoxExplanation_' + (index - 2));
    sel_TarObj = document.getElementById('TradeUnionTextBoxExplanation_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTradeUnionExplanation(index - 1);

    sel_SrcObj = document.getElementById('TradeUnionTextBoxActualAmount_' + (index - 2));
    sel_TarObj = document.getElementById('TradeUnionTextBoxActualAmount_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setTradeUnionActualAmount(index - 1);
    calTradeUnionSum();
}
//存储项目费用信息
function jsTradeUnionGathering(beginDate, endDate, eventTitle, eventPlace, eventPersons, description, amount, explanation, actualAmount) {
    this.gt_Begin_Date = beginDate;
    this.gt_End_Date = endDate;
    this.gt_Event_Title = eventTitle;
    this.gt_Event_Place = eventPlace;
    this.gt_Event_Persons = eventPersons;
    this.gt_Description = description;
    this.gt_Amount = amount;
    this.gt_Explanation = explanation;
    this.gt_Actual_Amount = actualAmount;
}
//根据数组（gatheringTradeUnionArray）显示界面
function refreshTradeUnionData() {
    //删除原来的行
    var rowCount = TradeUnionTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        TradeUnionTable.deleteRow(1);
    }
    var MaxCells = TradeUnionTable.rows[0].cells.length;

    for (var i = 0; i < gatheringTradeUnionArray.length; i++) {
        var newRow = TradeUnionTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = i + 1;
                    cell.align = "center";
                    break;
                case 1: //开始日期
                    var dateID = "TradeUnionTextBoxBeginDate_" + i;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:90'  id=\"TradeUnionTextBoxBeginDate_" + i + "\" value=\"" + gatheringTradeUnionArray[i].gt_Begin_Date +
                    //							"\" onblur='javascript:CheckDateFormat(this);setTradeUnionBeginDate(" + i + ");' onfocus='javascript:setTradeUnionBeginDate(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=TradeUnionTextBoxBeginDate_" + i +
                    //							"','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input class='Wdate' autocomplete='off'  style='width:90' id='" + dateID + "' value='" + gatheringTradeUnionArray[i].gt_Begin_Date + "' " +
                        " onblur=\"javascript:setTradeUnionBeginDate(" + i + ");\" onfocus=\"javascript:setTradeUnionBeginDate(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">"
                        ;
                    break;
                case 2: //结束日期
                    var dateID = "TradeUnionTextBoxEndDate_" + i;
                    cell.noWrap = true;
                    //                    cell.innerHTML = "<input style='width:90'  id=\"TradeUnionTextBoxEndDate_" + i + "\" value=\"" + gatheringTradeUnionArray[i].gt_End_Date +
                    //							"\" onblur='javascript:CheckDateFormat(this);setTradeUnionEndDate(" + i + ");' onfocus='javascript:setTradeUnionEndDate(" + i + ");'>" +
                    //							"<img align=absbottom style='CURSOR: hand;' border=0 src=\"../../Images/DatePicker.gif\" onclick=\"javascript:window.open('../../DatePicker/DatePicker.aspx?Sender=TradeUnionTextBoxEndDate_" + i +
                    //							"','t','width=260,height=260,top=200,left=270,Status=no,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no');\">";
                    cell.innerHTML = "<input   autocomplete='off' class='Wdate' style='width:90' id='" + dateID + "' value='" + gatheringTradeUnionArray[i].gt_End_Date + "' " +
                        " onblur=\"javascript:setTradeUnionEndDate(" + i + ");\" onfocus=\"javascript:setTradeUnionEndDate(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">"
                       ;
                    break;
                case 3: //活动主题
                    cell.noWrap = true;
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=125 onblur='javascript:setTradeUnionTitle(" + i + ");'  id='TradeUnionTextBoxTitle_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "TradeUnionTextBoxTitle_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringTradeUnionArray[i].gt_Event_Title;
                    }
                    break;
                case 4: //活动地点
                    cell.noWrap = true;
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=125 onblur='javascript:setTradeUnionPlace(" + i + ");'  id='TradeUnionTextBoxPlace_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "TradeUnionTextBoxPlace_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringTradeUnionArray[i].gt_Event_Place;
                    }
                    break;
                case 5: //参加人员/项目组
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=125 onblur='javascript:setTradeUnionPersons(" + i + ");'  id='TradeUnionTextBoxPerson_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "TradeUnionTextBoxPerson_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringTradeUnionArray[i].gt_Event_Persons;
                    }
                    break;
                case 6: //具体费用说明
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=125 onblur='javascript:setTradeUnionDescription(" + i + ");'  id='TradeUnionTextBoxDescription_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "TradeUnionTextBoxDescription_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringTradeUnionArray[i].gt_Description;
                    }
                    break;
                case 7: //预算金额
                    cell.innerHTML = "<input maxlength='10' onblur='javascript:setTradeUnionAmount(" + i + ");' type='text' id='TradeUnionTextBoxAmount_" + i + "' value='" +
							gatheringTradeUnionArray[i].gt_Amount + "' style=\"width:100%;height:40px\" onKeypress='javascript:OnlyNumber();'>";
                    break;
                case 8: //超预算费用解释
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=125 onblur='javascript:setTradeUnionExplanation(" + i + ");'  id='TradeUnionTextBoxExplanation_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "TradeUnionTextBoxExplanation_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringTradeUnionArray[i].gt_Explanation;
                    }
                    break;
                case 9: //实际金额
                    cell.innerHTML = "<input maxlength='10' onblur='javascript:setTradeUnionActualAmount(" + i + ");' type='text' id='TradeUnionTextBoxActualAmount_" + i + "' value='" +
							gatheringTradeUnionArray[i].gt_Actual_Amount + "' style=\"width:100%;height:40px\" onKeypress='javascript:OnlyNumber();calTradeUnionSum();'>";
                    break;
                case 10: //del
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteTradeUnionRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
    calTradeUnionSum();
}
function setTradeUnionBeginDate(index) {//开始日期
    var obj = document.getElementById("TradeUnionTextBoxBeginDate_" + index);
    gatheringTradeUnionArray[index].gt_Begin_Date = obj.value;
}
function setTradeUnionEndDate(index) {//结束日期
    var obj = document.getElementById("TradeUnionTextBoxEndDate_" + index);
    gatheringTradeUnionArray[index].gt_End_Date = obj.value;
}
function setTradeUnionTitle(index) {//活动主题
    var obj = document.getElementById("TradeUnionTextBoxTitle_" + index);
    var no = index + 1;

    if (Trim(obj.value) == "") {
        alert("第" + no + "行的应付款-工会经费-活动主题不能为空。");
        return;
    }
    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的应付款-工会经费-活动主题-中包含非法字符“~”，请重新输入。");
        return;
    }
    if (obj.value.indexOf("|") != -1) {
        alert("第" + no + "行的应付款-工会经费-活动主题-中包含非法字符“|”，请重新输入。");
        return;
    }
    if (obj.value.length > 125) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的应付款-工会经费-活动主题-至多只能录入125个字符。");
        gatheringTradeUnionArray[index].gt_Event_Title = obj.value;
        return;
    }
    gatheringTradeUnionArray[index].gt_Event_Title = obj.value;
}
function setTradeUnionPlace(index) {//活动地点
    var obj = document.getElementById("TradeUnionTextBoxPlace_" + index);
    var no = index + 1;

    if (Trim(obj.value) == "") {
        alert("第" + no + "行的应付款-工会经费-活动地点不能为空。");
        return;
    }
    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的应付款-工会经费-活动地点-中包含非法字符“~”，请重新输入。");
        return;
    }
    if (obj.value.indexOf("|") != -1) {
        alert("第" + no + "行的应付款-工会经费-活动地点-中包含非法字符“|”，请重新输入。");
        return;
    }
    if (obj.value.length > 125) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的应付款-工会经费-活动地点-至多只能录入125个字符。");
        gatheringTradeUnionArray[index].gt_Event_Place = obj.value;
        return;
    }
    gatheringTradeUnionArray[index].gt_Event_Place = obj.value;
}
function setTradeUnionPersons(index) {//参加人员/项目组
    var obj = document.getElementById("TradeUnionTextBoxPerson_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的应付款-工会经费-参加人员/项目组-中包含非法字符“~”，请重新输入。");
        return;
    }
    if (obj.value.indexOf("|") != -1) {
        alert("第" + no + "行的应付款-工会经费-参加人员/项目组-中包含非法字符“|”，请重新输入。");
        return;
    }
    if (obj.value.length > 125) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的应付款-工会经费-参加人员/项目组-至多只能录入125个字符。");
        gatheringTradeUnionArray[index].gt_Event_Persons = obj.value;
        return;
    }
    gatheringTradeUnionArray[index].gt_Event_Persons = obj.value;
}
function setTradeUnionDescription(index) {//具体费用说明
    var obj = document.getElementById("TradeUnionTextBoxDescription_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的应付款-工会经费-具体费用说明-中包含非法字符“~”，请重新输入。");
        return;
    }
    if (obj.value.indexOf("|") != -1) {
        alert("第" + no + "行的应付款-工会经费-具体费用说明-中包含非法字符“|”，请重新输入。");
        return;
    }
    if (obj.value.length > 125) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的应付款-工会经费-具体费用说明-至多只能录入125个字符。");
        gatheringTradeUnionArray[index].gt_Description = obj.value;
        return;
    }
    gatheringTradeUnionArray[index].gt_Description = obj.value;
}
function setTradeUnionAmount(index) {//预算金额
    var obj = document.getElementById("TradeUnionTextBoxAmount_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的应付款-工会经费-预算金额-格式不合法');
        return;
    }

    if (obj.value <= 0) {
        alert('第' + no + '行的应付款-工会经费-预算金额-格式不合法');
        return;
    }
    obj.value = Math.round(obj.value * 100) / 100;
    gatheringTradeUnionArray[index].gt_Amount = obj.value;
}
function setTradeUnionExplanation(index) {//超预算费用解释
    var obj = document.getElementById("TradeUnionTextBoxExplanation_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的应付款-工会经费-超预算费用解释-中包含非法字符“~”，请重新输入。");
        return;
    }
    if (obj.value.indexOf("|") != -1) {
        alert("第" + no + "行的应付款-工会经费-超预算费用解释-中包含非法字符“|”，请重新输入。");
        return;
    }
    if (obj.value.length > 125) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的应付款-工会经费-超预算费用解释-至多只能录入125个字符。");
        gatheringTradeUnionArray[index].gt_Explanation = obj.value;
        return;
    }
    gatheringTradeUnionArray[index].gt_Explanation = obj.value;
}
function setTradeUnionActualAmount(index) {//预算金额
    var obj = document.getElementById("TradeUnionTextBoxActualAmount_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的应付款-工会经费-预算金额-格式不合法');
        return;
    }

    if (obj.value <= 0) {
        alert('第' + no + '行的应付款-工会经费-预算金额-格式不合法');
        return;
    }
    obj.value = Math.round(obj.value * 100) / 100;
    gatheringTradeUnionArray[index].gt_Actual_Amount = obj.value;
    calTradeUnionSum();
}
//删除选定行
function deleteTradeUnionRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringTradeUnionArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringTradeUnionArray[i];
            j++;
        }
    }

    gatheringTradeUnionArray = tempArray;
    refreshTradeUnionData();
}
//计算付款合计
function calTradeUnionSum() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringTradeUnionArray.length; i++) {
        var amount = gatheringTradeUnionArray[i].gt_Actual_Amount;

        amount = amount.replace(/\,/g, "");
        sumAmount += parseFloat(amount);
    }
    document.all.LabelSumTradeUnionAmount.innerText = formatCurrency(sumAmount);
}
function TradeUnionItemSubmit() {//开始日期/结束日期/活动主题/活动地点/(参加人员/项目组)/具体费用说明/预算金额/超预算费用解释/实际费用金额
    var TradeUnionBeginDateList = '';
    var TradeUnionEndDateList = '';
    var TradeUnionEventTitleList = '';
    var TradeUnionEventPlaceList = '';
    var TradeUnionEventPersonstList = '';
    var TradeUnionDescriptionList = '';
    var TradeUnionAmontList = '';
    var TradeUnionExplanationList = '';
    var TradeUnionActualAmountList = '';

    for (var i = 0; i < gatheringTradeUnionArray.length; i++) {
        var index = i + 1;

        if (gatheringTradeUnionArray[i].gt_Begin_Date == '') {
            alert("其他应付款-工会经费费用明细第“" + index + "”行的开始日期不能为空");
            document.all["TradeUnionTextBoxBeginDate_" + i].focus();
            return false;
        }
        if (gatheringTradeUnionArray[i].gt_End_Date == '') {
            alert("其他应付款-工会经费费用明细第“" + index + "”行的结束日期不能为空");
            document.all["TradeUnionTextBoxEndDate_" + i].focus();
            return false;
        }
        //活动主题		
        if (gatheringTradeUnionArray[i].gt_Event_Title == '') {
            alert("其他应付款-工会经费费用明细第“" + index + "”行的活动主题信息不能为空");
            document.all["TradeUnionTextBoxTitle_" + i].focus();
            return false;
        }
        else {
            if (gatheringTradeUnionArray[i].gt_Event_Title.indexOf("~") != -1) {
                alert('其他应付款-工会经费费用明细第“"+index+"”行的活动主题信息包含“~”非法字符，请重新输入。');
                document.all["TradeUnionTextBoxTitle_" + i].focus();
                return false;
            }
            if (gatheringTradeUnionArray[i].gt_Event_Title.indexOf("|") != -1) {
                alert('其他应付款-工会经费费用明细第“"+index+"”行的活动主题信息包含“|”非法字符，请重新输入。');
                document.all["TradeUnionTextBoxTitle_" + i].focus();
                return false;
            }
            if (gatheringTradeUnionArray[i].gt_Event_Title.length > 125) {
                alert("其他应付款-工会经费费用明细第“" + index + "”行的活动主题信息不能大于125个字符");
                document.all["TradeUnionTextBoxTitle_" + i].focus();
                return false;
            }
        }
        //活动地点
        if (gatheringTradeUnionArray[i].gt_Event_Place == '') {
            alert("其他应付款-工会经费费用明细第“" + index + "”行的活动地点信息不能为空");
            document.all["TradeUnionTextBoxPlace_" + i].focus();
            return false;
        }
        else {
            if (gatheringTradeUnionArray[i].gt_Event_Place.indexOf("~") != -1) {
                alert('其他应付款-工会经费费用明细第“"+index+"”行的活动地点信息包含“~”非法字符，请重新输入。');
                document.all["TradeUnionTextBoxPlace_" + i].focus();
                return false;
            }
            if (gatheringTradeUnionArray[i].gt_Event_Place.indexOf("|") != -1) {
                alert('其他应付款-工会经费费用明细第“"+index+"”行的活动地点信息包含“|”非法字符，请重新输入。');
                document.all["TradeUnionTextBoxPlace_" + i].focus();
                return false;
            }
            if (gatheringTradeUnionArray[i].gt_Event_Place.length > 125) {
                alert("其他应付款-工会经费费用明细第“" + index + "”行的活动地点信息不能大于125个字符");
                document.all["TradeUnionTextBoxPlace_" + i].focus();
                return false;
            }
        }
        //参加人员/项目组
        if (gatheringTradeUnionArray[i].gt_Event_Persons == '') {
            alert("其他应付款-工会经费费用明细第“" + index + "”行的参加人员/项目组信息不能为空");
            document.all["TradeUnionTextBoxPerson_" + i].focus();
            return false;
        }
        else {
            if (gatheringTradeUnionArray[i].gt_Event_Persons.indexOf("~") != -1) {
                alert('其他应付款-工会经费费用明细第“"+index+"”行的参加人员/项目组信息包含“~”非法字符，请重新输入。');
                document.all["TradeUnionTextBoxPerson_" + i].focus();
                return false;
            }
            if (gatheringTradeUnionArray[i].gt_Event_Persons.indexOf("|") != -1) {
                alert('其他应付款-工会经费费用明细第“"+index+"”行的参加人员/项目组信息包含“|”非法字符，请重新输入。');
                document.all["TradeUnionTextBoxPerson_" + i].focus();
                return false;
            }
            if (gatheringTradeUnionArray[i].gt_Event_Persons.length > 125) {
                alert("其他应付款-工会经费费用明细第“" + index + "”行的参加人员/项目组信息不能大于125个字符");
                document.all["TradeUnionTextBoxPerson_" + i].focus();
                return false;
            }
        }
        //费用具体说明
        if (gatheringTradeUnionArray[i].gt_Description == '') {
            alert("其他应付款-工会经费费用明细第“" + index + "”行的费用具体说明不能为空");
            document.all["TradeUnionTextBoxDescription_" + i].focus();
            return false;
        }
        else {
            if (gatheringTradeUnionArray[i].gt_Description.indexOf("~") != -1) {
                alert("其他应付款-工会经费费用明细第“" + index + "”行的费用具体说明包含“~”非法字符，请重新输入。");
                document.all["TradeUnionTextBoxDescription_" + i].focus();
                return false;
            }
            if (gatheringTradeUnionArray[i].gt_Description.indexOf("|") != -1) {
                alert("其他应付款-工会经费费用明细第“" + index + "”行的费用具体说明包含“|”非法字符，请重新输入。");
                document.all["TradeUnionTextBoxDescription_" + i].focus();
                return false;
            }
            if (gatheringTradeUnionArray[i].gt_Description.length > 125) {
                alert("其他应付款-工会经费费用明细第“" + index + "”行的费用具体说明不能大于125个字符");
                document.all["TradeUnionTextBoxDescription_" + i].focus();
                return false;
            }
        }
        //预算金额				
        if (gatheringTradeUnionArray[i].gt_Amount == '') {
            alert("其他应付款-工会经费费用明细第“" + index + "”行的预算金额不能为空");
            document.all["TradeUnionTextBoxAmount_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringTradeUnionArray[i].gt_Amount)) {
                alert("其他应付款-工会经费费用明细第“" + index + "”行的预算金额不正确");
                document.all["TradeUnionTextBoxAmount_" + i].focus();
                return false;
            }
            else {
                if (gatheringTradeUnionArray[i].gt_Amount <= 0) {
                    alert("其他应付款-工会经费费用明细第“" + index + "”行的预算金额不能小于等于零");
                    document.all["TradeUnionTextBoxAmount_" + i].focus();
                    return false;
                }
            }
        }
        //超预算费用解释
        if (gatheringTradeUnionArray[i].gt_Explanation.indexOf("~") != -1) {
            alert("其他应付款-工会经费费用明细第“" + index + "”行的超预算费用解释包含“~”非法字符，请重新输入。");
            document.all["TradeUnionTextBoxExplanation_" + i].focus();
            return false;
        }
        if (gatheringTradeUnionArray[i].gt_Explanation.indexOf("|") != -1) {
            alert("其他应付款-工会经费费用明细第“" + index + "”行的超预算费用解释包含“|”非法字符，请重新输入。");
            document.all["TradeUnionTextBoxExplanation_" + i].focus();
            return false;
        }
        if (gatheringTradeUnionArray[i].gt_Explanation.length > 125) {
            alert("其他应付款-工会经费费用明细第“" + index + "”行的超预算费用解释不能大于125个字符");
            document.all["TradeUnionTextBoxExplanation_" + i].focus();
            return false;
        }
        //实际费用金额
        if (gatheringTradeUnionArray[i].gt_Actual_Amount == '') {
            alert("其他应付款-工会经费费用明细第“" + index + "”行的实际费用金额不能为空");
            document.all["TradeUnionTextBoxActualAmount_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringTradeUnionArray[i].gt_Actual_Amount)) {
                alert("其他应付款-工会经费费用明细第“" + index + "”行的实际费用金额不正确");
                document.all["TradeUnionTextBoxActualAmount_" + i].focus();
                return false;
            }
            else {
                if (gatheringTradeUnionArray[i].gt_Actual_Amount <= 0) {
                    alert("其他应付款-工会经费费用明细第“" + index + "”行的实际费用金额不能小于等于零");
                    document.all["TradeUnionTextBoxActualAmount_" + i].focus();
                    return false;
                }
            }
        }

        TradeUnionBeginDateList += '~' + gatheringTradeUnionArray[i].gt_Begin_Date;
        TradeUnionEndDateList += '~' + gatheringTradeUnionArray[i].gt_End_Date;
        TradeUnionEventTitleList += '~' + gatheringTradeUnionArray[i].gt_Event_Title;
        TradeUnionEventPlaceList += '~' + gatheringTradeUnionArray[i].gt_Event_Place;
        TradeUnionEventPersonstList += '~' + gatheringTradeUnionArray[i].gt_Event_Persons;
        TradeUnionDescriptionList += '~' + gatheringTradeUnionArray[i].gt_Description;
        TradeUnionAmontList += '~' + gatheringTradeUnionArray[i].gt_Amount;
        TradeUnionExplanationList += '~' + gatheringTradeUnionArray[i].gt_Explanation;
        TradeUnionActualAmountList += '~' + gatheringTradeUnionArray[i].gt_Actual_Amount;
    }

    TradeUnionBeginDateList = TradeUnionBeginDateList.substr(1);
    TradeUnionEndDateList = TradeUnionEndDateList.substr(1);
    TradeUnionEventTitleList = TradeUnionEventTitleList.substr(1);
    TradeUnionEventPlaceList = TradeUnionEventPlaceList.substr(1);
    TradeUnionEventPersonstList = TradeUnionEventPersonstList.substr(1);
    TradeUnionDescriptionList = TradeUnionDescriptionList.substr(1);
    TradeUnionAmontList = TradeUnionAmontList.substr(1);
    TradeUnionExplanationList = TradeUnionExplanationList.substr(1);
    TradeUnionActualAmountList = TradeUnionActualAmountList.substr(1);

    document.all.hiddenTradeUnion.value = TradeUnionBeginDateList + "|" +
												TradeUnionEndDateList + "|" +
												TradeUnionEventTitleList + "|" +
												TradeUnionEventPlaceList + "|" +
												TradeUnionEventPersonstList + "|" +
												TradeUnionDescriptionList + "|" +
												TradeUnionAmontList + "|" +
												TradeUnionExplanationList + "|" +
												TradeUnionActualAmountList;

}

function RefreshTraffic(applyDate, fromAddress, toAddress, mileAge, amount, purpose, jinvoice, jcurrency) {//导入市内交通费刷新
    var index = gatheringTrafficArray.length;
    gatheringTrafficArray[index] = new jsTrafficGathering(applyDate, fromAddress, toAddress, mileAge, amount, purpose, jinvoice, jcurrency);
    refreshTrafficData();
}
function RefreshMeal(jAmount, jDinnerAccount, jDinnerTimes, jIncludeOtherPerson, jInsiderEmployeeNumber, jLastName, jdate, jIsHoliday, jdescription) {
    var index = gatheringWorkMealArray.length;
    gatheringWorkMealArray[index] = new jsWorkMealGathering(jAmount, jDinnerAccount, jDinnerTimes, jIncludeOtherPerson, jInsiderEmployeeNumber, jLastName, jdate, jIsHoliday, jdescription, '0');
    refreshWorkMealData();
}
function RefreshLunch(jdate, jpersons, jamount, jremarks, jspayment, jTaxNo, jOtherPerson, jDinnerAccount, jsInsiderEmployeeNumber) {
    var index = gatheringLunchArray.length;
    gatheringLunchArray[index] = new jsLunchGathering(jdate, jpersons, jamount, jremarks, jspayment, jTaxNo, jOtherPerson, jDinnerAccount, jsInsiderEmployeeNumber)
    refreshLunchData();
}


//////////////////////////////////////////////办公费-办公用品/////////////////////////////////////////////
var gatheringOfficeSuppliesArray = new Array();
//添加空白一行
function addOfficeSuppliesRow() {
    var index = gatheringOfficeSuppliesArray.length;
    gatheringOfficeSuppliesArray[index] = new jsOfficeSuppliesGathering('', '', '0', '0', '', '', '', '', '');
    refreshOfficeSuppliesData();
    copyOfficeSuppliesDataFromPreRow(gatheringOfficeSuppliesArray.length);
}

//添加一行的时候，复制上一行的数据
function copyOfficeSuppliesDataFromPreRow(index) {
    if (index == 1)
        return;

    var sel_SrcObj = document.getElementById('OSTextBoxGoodsName_' + (index - 2));
    var sel_TarObj = document.getElementById('OSTextBoxGoodsName_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setOSGoodsName(index - 1);

    sel_SrcObj = document.getElementById('OSTextBoxGoodsSpecificationsUnit_' + (index - 2));
    sel_TarObj = document.getElementById('OSTextBoxGoodsSpecificationsUnit_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setOSGoodsSpecificationsUnit(index - 1);

    sel_SrcObj = document.getElementById('OSTextBoxGoodsPrice_' + (index - 2));
    sel_TarObj = document.getElementById('OSTextBoxGoodsPrice_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setOSGoodsPrice(index - 1);

    sel_SrcObj = document.getElementById('OSTextBoxGoodsQuantity_' + (index - 2));
    sel_TarObj = document.getElementById('OSTextBoxGoodsQuantity_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setOSGoodsQuantity(index - 1);

    sel_SrcObj = document.getElementById('OSTextBoxGoodsUse_' + (index - 2));
    sel_TarObj = document.getElementById('OSTextBoxGoodsUse_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setOSGoodsUse(index - 1);

    sel_SrcObj = document.getElementById('OSTextBoxGoodsSupplyUnit_' + (index - 2));
    sel_TarObj = document.getElementById('OSTextBoxGoodsSupplyUnit_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setOSGoodsSupplyUnit(index - 1);

    sel_SrcObj = document.getElementById('OSTextBoxGoodsRemarks_' + (index - 2));
    sel_TarObj = document.getElementById('OSTextBoxGoodsRemarks_' + (index - 1));

    sel_TarObj.value = sel_SrcObj.value;
    setOSGoodsRemarks(index - 1);

}

//存储项目费用信息
//LabelGoodsName	货品名称	办公费-办公用品
//LabelGoodsPrice	单价	办公费-办公用品
//LabelGoodsQuantity	数量	办公费-办公用品
//LabelGoodsRemarks	备注	办公费-办公用品
//LabelGoodsSpecificationsUnit	规格（单位）	办公费-办公用品
//LabelGoodsSupplyUnit	供货单位	办公费-办公用品
//LabelGoodsUse	用途	办公费-办公用品
//LabelGoodsAmount 金额

function jsOfficeSuppliesGathering(jGoodsName, jGoodsSpecificationsUnit, jGoodsPrice, jGoodsQuantity, jGoodsAmount, jGoodsUse, jGoodsSupplyUnit, jGoodsRemarks, jTaxNo) {
    this.gt_OS_GoodsName = jGoodsName;
    this.gt_OS_GoodsSpecificationsUnit = jGoodsSpecificationsUnit;
    this.gt_OS_GoodsPrice = jGoodsPrice;
    this.gt_OS_GoodsQuantity = jGoodsQuantity;
    this.gt_OS_GoodsAmount = jGoodsAmount;
    this.gt_OS_GoodsUse = jGoodsUse;
    this.gt_OS_GoodsSupplyUnit = jGoodsSupplyUnit;
    this.gt_OS_GoodsRemarks = jGoodsRemarks;
    this.gt_OS_TaxNo = jTaxNo;
}

//根据数组（gatheringOfficeSuppliesArray）显示界面
function refreshOfficeSuppliesData() {
    //删除原来的行
    var rowCount = OfficeSuppliesTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        OfficeSuppliesTable.deleteRow(1);
    }
    var MaxCells = OfficeSuppliesTable.rows[0].cells.length;

    for (var i = 0; i < gatheringOfficeSuppliesArray.length; i++) {
        var newRow = OfficeSuppliesTable.insertRow(-1);
        newRow.vAlign = "middle";

        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = i + 1;
                    cell.align = "center";
                    break;
                case 1: //货品名称
                    cell.innerHTML = "<input maxlength='100'  autocomplete='off'   onblur='javascript:setOSGoodsName(" + i + ");' type='text' id='OSTextBoxGoodsName_" + i + "' value='" + gatheringOfficeSuppliesArray[i].gt_OS_GoodsName + "' style=\"width:100%;height:40px;\" >";
                    break;
                case 2: //规格（单位）
                    cell.innerHTML = "<input maxlength='100'  autocomplete='off'   onblur='javascript:setOSGoodsSpecificationsUnit(" + i + ");' type='text' id='OSTextBoxGoodsSpecificationsUnit_" + i + "' value='" + gatheringOfficeSuppliesArray[i].gt_OS_GoodsSpecificationsUnit + "' style=\"width:100%;height:40px;\" >";
                    break;
                case 3: //单价
                    cell.innerHTML = "<input maxlength='10' autocomplete='off'  autocomplete='off'  onblur='javascript:setOSGoodsPrice(" + i + ");' type='text' id='OSTextBoxGoodsPrice_" + i + "' value='" + gatheringOfficeSuppliesArray[i].gt_OS_GoodsPrice + "' style=\"width:100%;height:40px;\">";
                    break;
                case 4: //数量
                    cell.innerHTML = "<input maxlength='4'  autocomplete='off'  style='width:100%;height:40px;' onblur='javascript:setOSGoodsQuantity(" + i + ");' type='text' id='OSTextBoxGoodsQuantity_" + i + "' value='" + gatheringOfficeSuppliesArray[i].gt_OS_GoodsQuantity + "'>";
                    break;
                case 5: //金额
                    cell.innerHTML = "<input autocomplete='off'  style='border:0px; text-align:center;background-color:LightGrey;color:Black;width:98%;height:40px;' readonly='true'  maxlength='4' type='text' id='OSTextBoxGoodsAmount_" + i + "' value='" + gatheringOfficeSuppliesArray[i].gt_OS_GoodsAmount + "'>";
                    cell.valign = 'center';
                    cell.align = 'center';
                    break;
                case 6: //发票号
                    cell.innerHTML = "<input maxlength='15' autocomplete='off'  onchange='javascript:setOSGoodsTaxNo(" + i + ");' type='text' id='OSTextBoxTaxNo_" + i + "' value='" + gatheringOfficeSuppliesArray[i].gt_OS_TaxNo + "' style=\"width:100%;height:40px;\">";
                    break;
                case 7: //用途
                    cell.innerHTML = "<TEXTAREA  rows='2' onblur='javascript:setOSGoodsUse(" + i + ");'  id='OSTextBoxGoodsUse_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "OSTextBoxGoodsUse_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringOfficeSuppliesArray[i].gt_OS_GoodsUse;
                    }
                    break;
                case 8: //供货单位
                    cell.innerHTML = "<input maxlength='100' autocomplete='off'   onblur='javascript:setOSGoodsSupplyUnit(" + i + ");' type='text' id='OSTextBoxGoodsSupplyUnit_" + i + "' value='" + gatheringOfficeSuppliesArray[i].gt_OS_GoodsSupplyUnit + "' style=\"width:100%;height:40px;\">";
                    break;
                case 9: //备注
                    cell.innerHTML = "<TEXTAREA  rows='2' onblur='javascript:setOSGoodsRemarks(" + i + ");'  id='OSTextBoxGoodsRemarks_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "OSTextBoxGoodsRemarks_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringOfficeSuppliesArray[i].gt_OS_GoodsRemarks;
                    }
                    break;
                case 10: //del
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteOfficeSuppliesRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
    calOfficeSuppliesSum();
}
function setOSGoodsTaxNo(index) {
    var obj = document.getElementById("OSTextBoxTaxNo_" + index);
    var no = index + 1;
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;
    gatheringOfficeSuppliesArray[index].gt_OS_TaxNo = '';
    if (!obj.value || obj.value == '') {
        alert('第' + no + '行的发票号不能为空');
        obj.value = gatheringOfficeSuppliesArray[index].gt_OS_TaxNo;
        return;
    }
    gatheringOfficeSuppliesArray[index].gt_OS_TaxNo = obj.value;
}
function setOSGoodsName(index) {
    var obj = document.getElementById("OSTextBoxGoodsName_" + index);
    var no = index + 1;
    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的办公费-办公用品-货品名称-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 50) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 50);
        alert("第" + no + "行的办公费-办公用品-货品名称-至多只能录入50个字符。");
        gatheringOfficeSuppliesArray[index].gt_OS_GoodsName = obj.value;
        return;
    }

    gatheringOfficeSuppliesArray[index].gt_OS_GoodsName = obj.value;
}
function setOSGoodsSpecificationsUnit(index) {
    var obj = document.getElementById("OSTextBoxGoodsSpecificationsUnit_" + index);
    var no = index + 1;
    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的办公费-办公用品-规格(单位)-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 50) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 50);
        alert("第" + no + "行的办公费-办公用品-规格(单位)-至多只能录入50个字符。");
        gatheringOfficeSuppliesArray[index].gt_OS_GoodsSpecificationsUnit = obj.value;
        return;
    }
    gatheringOfficeSuppliesArray[index].gt_OS_GoodsSpecificationsUnit = obj.value;
}
function setOSGoodsPrice(index) {
    var obj = document.getElementById("OSTextBoxGoodsPrice_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value != "") {
        if (!isMoneyValue(obj.value)) {
            alert('第' + no + '行的办公费-办公用品-单价-格式不合法');
            obj.value = 0;
        }
    }
    obj.value = Math.round(obj.value * 100) / 100;
    gatheringOfficeSuppliesArray[index].gt_OS_GoodsPrice = obj.value;

    calOfficeSuppliesTotal(index);
    calOfficeSuppliesSum();
}
function setOSGoodsQuantity(index) {
    var obj = document.getElementById("OSTextBoxGoodsQuantity_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value != "") {
        if (IsInt(obj.value, "+", 0) == false) {
            alert('第' + no + '行的办公费-办公用品-数量-应为整数');
            obj.value = 0;
        }
    }

    obj.value = Math.round(obj.value * 100) / 100;
    gatheringOfficeSuppliesArray[index].gt_OS_GoodsQuantity = obj.value;

    calOfficeSuppliesTotal(index);
    calOfficeSuppliesSum();
}
//计算单行合计
function calOfficeSuppliesTotal(index) {
    var sumAmount = parseFloat('0');
    var amountPrice = gatheringOfficeSuppliesArray[index].gt_OS_GoodsPrice;
    var amountQuantity = gatheringOfficeSuppliesArray[index].gt_OS_GoodsQuantity;

    //    if (Trim(amountPrice) != '' && Trim(amountQuantity) != '') {
    amountPrice = amountPrice.replace(/\,/g, "");
    amountQuantity = amountQuantity.replace(/\,/g, "");

    sumAmount = amountPrice * amountQuantity;

    //        //alert(sumAmount);
    //        if (String(sumAmount).length > 14) {
    //            alert("金额超长");
    //        }
    $("#OSTextBoxGoodsAmount_" + index).attr("readonly", "false");
    document.getElementById("OSTextBoxGoodsAmount_" + index).value = formatCurrency(sumAmount);
    gatheringOfficeSuppliesArray[index].gt_OS_GoodsAmount = formatCurrency(sumAmount);
    $("#OSTextBoxGoodsAmount_" + index).attr("readonly", "true");
    //    }
}
function setOSGoodsUse(index) {

    var obj = document.getElementById("OSTextBoxGoodsUse_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的办公费-办公用品-用途-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 80) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 80);
        alert("第" + no + "行的办公费-办公用品-用途-至多只能录入80个字符。");
        gatheringOfficeSuppliesArray[index].gt_OS_GoodsUse = obj.value;
        return;
    }

    gatheringOfficeSuppliesArray[index].gt_OS_GoodsUse = obj.value;
}
function setOSGoodsSupplyUnit(index) {
    var obj = document.getElementById("OSTextBoxGoodsSupplyUnit_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的办公费-办公用品-供货单位-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 80) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 80);
        alert("第" + no + "行的办公费-办公用品-供货单位-至多只能录入80个字符。");
        gatheringOfficeSuppliesArray[index].gt_OS_GoodsSupplyUnit = obj.value;
        return;
    }

    gatheringOfficeSuppliesArray[index].gt_OS_GoodsSupplyUnit = obj.value;
}
function setOSGoodsRemarks(index) {
    var obj = document.getElementById("OSTextBoxGoodsRemarks_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1) {
        alert("第" + no + "行的办公费-办公用品-备注-包含非法字符“~”，请重新输入。");
        return;
    }

    if (obj.value.length > 80) {
        //如果元素区字符数大于最大字符数，按照最大字符数截断；     
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的办公费-办公用品-备注-至多只能录入80个字符。");
        gatheringOfficeSuppliesArray[index].gt_OS_GoodsRemarks = obj.value;
        return;
    }

    gatheringOfficeSuppliesArray[index].gt_OS_GoodsRemarks = obj.value;
}
//计算付款合计
function calOfficeSuppliesSum() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringOfficeSuppliesArray.length; i++) {
        var amount = gatheringOfficeSuppliesArray[i].gt_OS_GoodsAmount;
        amount = amount.replace(/\,/g, "");
        //alert(amount);
        sumAmount += parseFloat(amount);
        //alert(sumAmount);

    }
    document.all.LabelSumOfficeSuppliesAmount.innerText = formatCurrency(sumAmount);
}


//删除选定行
function deleteOfficeSuppliesRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringOfficeSuppliesArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringOfficeSuppliesArray[i];
            j++;
        }
    }

    gatheringOfficeSuppliesArray = tempArray;
    refreshOfficeSuppliesData();
}
//货品名称	规格（单位）	单价	数量	金额	币种	用途		供货单位	备注
function OfficeSuppliesItemSubmit() {
    var OSGoodsNameList = '';
    var OSGoodsSpecificationsUnitList = '';
    var OSGoodsPriceList = '';
    var OSGoodsQuantityList = '';
    var OSGoodsUseList = '';
    var OSGoodsSupplyUnitList = '';
    var OSGoodsRemarksList = '';
    var OSGoodsTaxNoList = ''; //发票号
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;
    for (var i = 0; i < gatheringOfficeSuppliesArray.length; i++) {
        var index = i + 1;

        if (Trim(gatheringOfficeSuppliesArray[i].gt_OS_GoodsName) == '') {
            alert("办公费-办公用品明细第“" + index + "”行的货品名称不能为空");
            document.all["OSTextBoxGoodsName_" + i].focus();
            return false;
        }

        if (Trim(gatheringOfficeSuppliesArray[i].gt_OS_GoodsSpecificationsUnit) == '') {
            alert("办公费-办公用品明细第“" + index + "”行的规格（单位）不能为空");
            document.all["OSTextBoxGoodsSpecificationsUnit_" + i].focus();
            return false;
        }

        if (Trim(gatheringOfficeSuppliesArray[i].gt_OS_GoodsPrice) == '') {
            alert("办公费-办公用品明细第“" + index + "”行的单价不能为空");
            document.all["OSTextBoxGoodsPrice_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringOfficeSuppliesArray[i].gt_OS_GoodsPrice)) {
                alert("办公费-办公用品明细第“" + index + "”行的单价不正确");
                document.all["OSTextBoxGoodsPrice_" + i].focus();
                return false;
            }
            else {
                if (gatheringOfficeSuppliesArray[i].gt_OS_GoodsPrice <= 0) {
                    alert("办公费-办公用品明细第“" + index + "”行的单价不能小于等于零");
                    document.all["OSTextBoxGoodsPrice_" + i].focus();
                    return false;
                }
            }
        }

        if (Trim(gatheringOfficeSuppliesArray[i].gt_OS_GoodsQuantity) == '') {
            alert("办公费-办公用品明细第“" + index + "”行的数量不能为空");
            document.all["OSTextBoxGoodsQuantity_" + i].focus();
            return false;
        }
        else {
            //if (!isMoneyValue(gatheringOfficeSuppliesArray[i].gt_OS_GoodsQuantity)) {
            if (IsInt(gatheringOfficeSuppliesArray[i].gt_OS_GoodsQuantity, "+", 0) == false) {
                alert("办公费-办公用品明细第“" + index + "”行的数量不正确，应为整数");
                document.all["OSTextBoxGoodsQuantity_" + i].focus();
                return false;
            }
            else {
                if (gatheringOfficeSuppliesArray[i].gt_OS_GoodsQuantity <= 0) {
                    alert("办公费-办公用品明细第“" + index + "”行的数量不能小于等于零");
                    document.all["OSTextBoxGoodsQuantity_" + i].focus();
                    return false;
                }
            }
        }

        if (Trim(gatheringOfficeSuppliesArray[i].gt_OS_GoodsUse).length <= 0) {
            alert("办公费-办公用品明细第“" + index + "”行的用途不能为空");
            document.all["OSTextBoxGoodsUse_" + i].focus();
            return false;
        }

        if (Trim(gatheringOfficeSuppliesArray[i].gt_OS_GoodsUse).length > 80) {
            alert("办公费-办公用品明细第“" + index + "”行的用途不能大于80个字符");
            document.all["OSTextBoxGoodsUse_" + i].focus();
            return false;
        }

        if (gatheringOfficeSuppliesArray[i].gt_OS_GoodsUse.indexOf("~") != -1) {
            alert('办公费-办公用品明细第“' + index + '”行的用途字符“~”为非法字符，请重新输入。');
            document.all["OSTextBoxGoodsUse_" + i].focus();
            return false;
        }


        if (Trim(gatheringOfficeSuppliesArray[i].gt_OS_GoodsSupplyUnit).length <= 0) {
            alert("办公费-办公用品明细第“" + index + "”行的供货单位不能为空");
            document.all["OSTextBoxGoodsSupplyUnit_" + i].focus();
            return false;
        }

        if (gatheringOfficeSuppliesArray[i].gt_OS_GoodsRemarks.length > 80) {
            alert("办公费-办公用品明细第“" + index + "”行的备注不能大于80个字符");
            document.all["OSTextBoxGoodsRemarks_" + i].focus();
            return false;
        }

        if (gatheringOfficeSuppliesArray[i].gt_OS_GoodsRemarks.indexOf("~") != -1) {
            alert('办公费-办公用品明细第“' + index + '”行的备注字符“~”为非法字符，请重新输入。');
            document.all["OSTextBoxGoodsRemarks_" + i].focus();
            return false;
        }
        if (gatheringOfficeSuppliesArray[i].gt_OS_TaxNo == '') {
            alert("办公费-办公用品明细第“" + index + "”行的发票号不能为空");
            document.all["OSTextBoxTaxNo_" + i].focus();
            return false;
        }
        OSGoodsNameList += '~' + gatheringOfficeSuppliesArray[i].gt_OS_GoodsName;
        OSGoodsSpecificationsUnitList += '~' + gatheringOfficeSuppliesArray[i].gt_OS_GoodsSpecificationsUnit;
        OSGoodsPriceList += '~' + gatheringOfficeSuppliesArray[i].gt_OS_GoodsPrice;
        OSGoodsQuantityList += '~' + gatheringOfficeSuppliesArray[i].gt_OS_GoodsQuantity;
        OSGoodsUseList += '~' + gatheringOfficeSuppliesArray[i].gt_OS_GoodsUse;
        OSGoodsSupplyUnitList += '~' + gatheringOfficeSuppliesArray[i].gt_OS_GoodsSupplyUnit;
        OSGoodsRemarksList += '~' + gatheringOfficeSuppliesArray[i].gt_OS_GoodsRemarks;
        OSGoodsTaxNoList += '~' + gatheringOfficeSuppliesArray[i].gt_OS_TaxNo;
    }

    OSGoodsNameList = OSGoodsNameList.substr(1);
    OSGoodsSpecificationsUnitList = OSGoodsSpecificationsUnitList.substr(1);
    OSGoodsPriceList = OSGoodsPriceList.substr(1);
    OSGoodsQuantityList = OSGoodsQuantityList.substr(1);
    OSGoodsUseList = OSGoodsUseList.substr(1);
    OSGoodsSupplyUnitList = OSGoodsSupplyUnitList.substr(1);
    OSGoodsRemarksList = OSGoodsRemarksList.substr(1);
    OSGoodsTaxNoList = OSGoodsTaxNoList.substr(1);
    document.all.hiddenOfficeSupplies.value = OSGoodsNameList + "|" +
												OSGoodsSpecificationsUnitList + "|" +
												OSGoodsPriceList + "|" +
												OSGoodsQuantityList + "|" +
												OSGoodsUseList + "|" +
												OSGoodsSupplyUnitList + "|" +
                                                OSGoodsRemarksList + "|" +
												OSGoodsTaxNoList;


}



/////////////////////////////////////外部培训费/////////////////////////////////////
function GetStartTime() {
//前3个月
var date = new Date();
date.setMonth(date.getMonth()-2);
var year=date.getFullYear();
var month=date.getMonth()+1;
month =(month<10 ? "0"+month:month);
sDate = (year.toString() + '-' + month.toString()) + '-' + date.getDate(); 
return sDate; 
}
var gatheringExternalTrainingArray = new Array();
function jsExternalTrainingGathering(OrderNo, empNo, empName, TrainingName, TrainingSite, TrainingStart,
 TrainingEnd, TrainingAmount, TrainingRemarks, TrainingOk) {
    this.gt_ExternalTraining_OrderNo = OrderNo;
    this.gt_ExternalTraining_empNo = empNo;
    this.gt_ExternalTraining_empName = empName;
    this.gt_ExternalTraining_TrainingName = TrainingName;
    this.gt_ExternalTraining_TrainingSite = TrainingSite;
    this.gt_ExternalTraining_TrainingStart = TrainingStart;
    this.gt_ExternalTraining_TrainingEnd = TrainingEnd;
    this.gt_ExternalTraining_TrainingAmount = TrainingAmount;
    this.gt_ExternalTraining_TrainingRemarks = TrainingRemarks;
    this.gt_ExternalTraining_TrainingOk = TrainingOk;
}
//追加行
function refreshExternalTrainingData() {
    //删除原来的行
    var rowCount = externalTrainingTableID.rows.length;
    var MaxCells = externalTrainingTableID.rows[0].cells.length;

    for (var i = 0; i < gatheringExternalTrainingArray.length; i++) {
        var newRow = externalTrainingTableID.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = gatheringExternalTrainingArray[i].gt_ExternalTraining_OrderNo;
                    cell.align = "center";
                    break;
                case 1: //员工工号
                    cell.innerHTML = "<input maxlength='100' readonly style='background: lightgrey;'  id='ExternalTraining_empNo_" + i + "' value='" + gatheringExternalTrainingArray[i].gt_ExternalTraining_empNo + "'>";
                    break;
                case 2: //姓名
                    cell.innerHTML = "<input maxlength='100' readonly style='background: lightgrey;' id='ExternalTraining_empName_" + i + "' value='" + gatheringExternalTrainingArray[i].gt_ExternalTraining_empName + "'>";
                    break;
                case 3: //培训名称
                    cell.innerHTML = "<input type='text'  id='ExternalTraining_TrainingName_" + i + "' value='" + gatheringExternalTrainingArray[i].gt_ExternalTraining_TrainingName + "'  style=\"width:100%;\" >";
                    break;

                case 4: //培训开始时间
                    cell.innerHTML = "<input readonly class='Wdate' autocomplete='off'  style='width:90' id='ExternalTraining_TrainingStart_" + i + "' value='" + gatheringExternalTrainingArray[i].gt_ExternalTraining_TrainingStart + "' " +
                        " onclick=\"WdatePicker({firstDayOfWeek:1,minDate:'" + GetStartTime() + "',lang:'" + 'zh-cn' + "'})\">"
                        ; break;

                //                case 5: //培训结束日期       
                //                    cell.innerHTML = "<input  class='Wdate' autocomplete='off'  style='width:80;display:none' id='ExternalTraining_TrainingEnd_" + i + "' value='" + gatheringExternalTrainingArray[i].gt_ExternalTraining_TrainingEnd + "' " +       
                //                       " onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">"       
                //                        ; break;       


                case 5: //培训地点
                    cell.innerHTML = "<input type='text' id='ExternalTraining_TrainingSite_" + i + "' value='" + gatheringExternalTrainingArray[i].gt_ExternalTraining_TrainingSite + "'  style=\"width:100%;\">";
                    break;

                case 6: //培训金额
                    cell.innerHTML = "<input maxlength='10'   type='text'  id='ExternalTraining_TrainingAmount_" + i + "'  value='" + gatheringExternalTrainingArray[i].gt_ExternalTraining_TrainingAmount + "'   style=\"width:100%;\">";
                    break;

                case 7: //备注
                    cell.innerHTML = "<input maxlength='10' type='text' id='ExternalTraining_TrainingRemarks_" + i + "' value='" + gatheringExternalTrainingArray[i].gt_ExternalTraining_TrainingRemarks + "'  style=\"width:100%;\">";
                    break;
                case 8: //培训服务期协议“确认”
                    var strDeleteImg = "<input id='ExternalTraining_Trainingok_" + i + "'" + (gatheringExternalTrainingArray[i].gt_ExternalTraining_TrainingOk == '1' ? 'checked' : '') + " type='checkbox'  disabled  \><a onclick='javascript:OpenProtocol();' style='text-decoration:underline;visibility: visible;cursor:hand'>点击阅读</a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
}
function OpenProtocol() {
    ShowScrollResizeWindow("ProtocolContent.aspx", 800, 600);
}
function ExternalTrainingItemSubmit() {

    var empNo;
    var empName;
    var TrainingName;
    var TrainingSite;
    var TrainingStart;
    var TrainingEnd;
    var TrainingAmount;
    var TrainingRemarks;
    var TrainingOk;
    if ($("#ExternalTraining_empNo_0").val() != '') {
        empNo = $("#ExternalTraining_empNo_0").val();
    }
    if ($("#ExternalTraining_empName_0").val() != '') {
        empName = $("#ExternalTraining_empName_0").val();
    }
    if ($("#ExternalTraining_TrainingName_0").val() != '') {
        TrainingName = $("#ExternalTraining_TrainingName_0").val();
    }
    else {
        alert("培训名称不能为空");
        return false;
    }
    if ($("#ExternalTraining_TrainingStart_0").val() != '') {
        TrainingStart = $("#ExternalTraining_TrainingStart_0").val();
    }
    else {
        alert("培训开始时间不能为空");
        return false;
    }
    //        if ($("#ExternalTraining_TrainingEnd_0").val() != '') {
    //            TrainingEnd = $("#ExternalTraining_TrainingEnd_0").val();
    //        }
    //        else {
    //            alert("结束时间不能为空");
    //            return false;
    //        }
    if ($("#ExternalTraining_TrainingSite_0").val() != '') {
        TrainingSite = $("#ExternalTraining_TrainingSite_0").val();
    }
    else {
        alert("培训地点不能为空");
        return false;
    }

    var oDate1 = new Date($("#ExternalTraining_TrainingStart_0").val());
    var oDate2 = new Date(GetStartTime());
    //oDate2.setMonth(oDate2.getMonth() + 3)
    if (oDate1.getTime() <= oDate2.getTime()) {
        alert("开始日期不能早于提交报销申请日3个月");
        return false;
    }
    if ($("#ExternalTraining_TrainingAmount_0").val() != '' && isMoneyValue($("#ExternalTraining_TrainingAmount_0").val()) && parseFloat($("#ExternalTraining_TrainingAmount_0").val()) > 0) {
        TrainingAmount = $("#ExternalTraining_TrainingAmount_0").val();
    }
    else {
        alert("金额不是有效数字");
        $("#ExternalTraining_TrainingAmount_0").select();
        return false;
    }
    if (!$("#ExternalTraining_Trainingok_0").prop("checked")) {
        alert("请阅读协议后再提交");
        return false;
    }
    TrainingRemarks = $("#ExternalTraining_TrainingRemarks_0").val();
    document.all.hiddenExternalTraining.value = empNo + "|" +
												empName + "|" +
												TrainingName + "|" +
												TrainingSite + "|" +
												TrainingStart + "|" +
												TrainingEnd + "|" +
                                                TrainingAmount + "|" +
												TrainingRemarks + "|" +
                                                ($("#ExternalTraining_Trainingok_0").prop("checked") ? "1" : "0");


}

//=====办公场地费-其他公共费用
function jsOtherPublicChargesGathering(jOrderNo, ContractId, ContractName, jCityID, jCity, jAddress, jContractStart, jContractEnd, jHouseOwner, jRent, jLargestNumberIn) {
    this.gt_OtherPublicCharges_OrderNo = jOrderNo;
    this.gt_OtherPublicCharges_HouseContractID = ContractId;
    this.gt_OtherPublicCharges_HouseContract = ContractName;
    this.gt_OtherPublicCharges_HouseCityID = jCityID;
    this.gt_OtherPublicCharges_City = jCity;
    this.gt_OtherPublicCharges_Address = jAddress;
    this.gt_OtherPublicCharges_ContractStart = jContractStart;
    this.gt_OtherPublicCharges_ContractEnd = jContractEnd;
    this.gt_OtherPublicCharges_MonthRent = jRent;

    // 房东，最大入住人数
    this.gt_OtherPublicCharges_HouseOwner = jHouseOwner;
    this.gt_OtherPublicCharges_LargestNumberIn = jLargestNumberIn;
}
var gatheringOtherPublicChargesArray = new Array();
function addOtherPublicChargesRow() {
    var index = gatheringOtherPublicChargesArray.length;
    //20180624
    gatheringOtherPublicChargesArray[index] = new jsOtherPublicChargesGathering(index + 1, '', '', '', '', '', '', '', '', '', '');
    refreshOtherPublicChargesData();
}
function OtherPublicChargesItemSubmit() {
    var OtherPublicChargesCityList = '';
    var OtherPublicChargesAddressList = '';
    var OtherPublicChargesContractStartList = '';
    var OtherPublicChargesContractEndList = '';
    var OtherPublicChargesMonthRentList = '';
    var OtherPublicChargesOrderNoList = '';
    var OtherPublicChargesHouseOwner = '';
    var OtherPublicChargesLargestNumberIn = '';
    //20130529增加合同编码 合同id
    var OtherPublicChargesContractId = '';
    var OtherPublicChargesContractCode = '';
    var OtherPublicChargesCityText = '';
    for (var i = 0; i < gatheringOtherPublicChargesArray.length; i++) {
        var index = i + 1;
        //省市
        if (Trim(gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_City).length <= 0) {
            alert("费用支付明细第“" + index + "”行的省市不能为空");
            document.all["OtherPublicChargesTextBoxHouseCity_" + i].focus();
            return false;
        }
        if (gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_City.indexOf("~") != -1 || gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_City.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的省市字符“~”，“|”为非法字符，请重新输入。');
            document.all["OtherPublicChargesTextBoxHouseCity_" + i].focus();
            return false;
        }
        //房屋租住地址
        if (Trim(gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_Address).length <= 0) {
            alert("费用支付明细第“" + index + "”行的房屋租住地址不能为空");
            document.all["OtherPublicChargesTextBoxAddress_" + i].focus();
            return false;
        }
        if (gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_Address.indexOf("~") != -1 || gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_Address.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的房屋租住地址字符“~”，“|”为非法字符，请重新输入。');
            document.all["OtherPublicChargesTextBoxAddress_" + i].focus();
            return false;
        }
        //合同开始日期
        if (gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_ContractStart == '') {
            alert("费用支付明细第“" + index + "”行的合同开始日期不能为空");
            document.all["OtherPublicChargesTextBoxContractStart_" + i].focus();
            return false;
        }
        //合同结束日期
        if (gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_ContractEnd == '') {
            alert("费用支付明细第“" + index + "”行的合同结束日期不能为空");
            document.all["OtherPublicChargesTextBoxContractEnd_" + i].focus();
            return false;
        }
        //月租金
        if (gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_MonthRent == '') {
            alert("费用支付明细第“" + index + "”行的月租金不能为空");
            document.all["OtherPublicChargesTextBoxMonthRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_MonthRent)) {
                alert("费用支付明细第“" + index + "”行的月租金不正确");
                document.all["OtherPublicChargesTextBoxMonthRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_MonthRent < 0) {
                    alert("费用支付明细第“" + index + "”行的月租金不能小于等于零");
                    document.all["OtherPublicChargesTextBoxMonthRent_" + i].focus();
                    return false;
                }
            }
        }
        //20120515 wanghk 增加列：房东 gt_OtherPublicCharges_HouseOwner
        if ((gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_HouseOwner).length <= 0) {
            alert("费用支付明细第“" + index + "”行的房东不能为空，请重新输入。");
            document.all["OtherPublicChargesTextBoxHouseOwner_" + i].focus();
            return false;
        }
        if (gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_HouseOwner.indexOf("~") != -1 || gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_HouseOwner.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的房东字符“~”，“|”为非法字符，请重新输入。');
            document.all["OtherPublicChargesTextBoxHouseOwner_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：最大入住人数 gt_OtherPublicCharges_LargestNumberIn
        if ((gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_LargestNumberIn).length <= 0) {
            alert("费用支付明细第“" + index + "”行的最大入住人数不能为空，请重新输入。");
            document.all["OtherPublicChargesTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if (gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_LargestNumberIn.indexOf("~") != -1 || gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_LargestNumberIn.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的最大入住人数字符“~”，“|”为非法字符，请重新输入。');
            document.all["OtherPublicChargesTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if ((gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_HouseContract).length <= 0) {
            alert("费用支付明细第“" + index + "”行的合同不能为空，请选择");
            document.all["OtherPublicChargesTextBoxHouseContract_" + i].focus();
            return false;
        }


        OtherPublicChargesCityList += '~' + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_HouseCityID;
        OtherPublicChargesAddressList += '~' + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_Address;
        OtherPublicChargesContractStartList += '~' + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_ContractStart;
        OtherPublicChargesContractEndList += '~' + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_ContractEnd;
        OtherPublicChargesMonthRentList += '~' + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_MonthRent;
        OtherPublicChargesOrderNoList += '~' + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_OrderNo;
        //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
        OtherPublicChargesHouseOwner += '~' + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_HouseOwner;
        OtherPublicChargesLargestNumberIn += '~' + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_LargestNumberIn;
        //20130529 mfj  增加列：合同Id 合同Code
        OtherPublicChargesContractId += '~' + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_HouseContractID;
        OtherPublicChargesContractCode += '~' + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_HouseContract;
        OtherPublicChargesCityText += '~' + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_City;

    }

    OtherPublicChargesCityList = OtherPublicChargesCityList.substr(1);
    OtherPublicChargesAddressList = OtherPublicChargesAddressList.substr(1);
    OtherPublicChargesContractStartList = OtherPublicChargesContractStartList.substr(1);
    OtherPublicChargesContractEndList = OtherPublicChargesContractEndList.substr(1);
    OtherPublicChargesMonthRentList = OtherPublicChargesMonthRentList.substr(1);
    OtherPublicChargesOrderNoList = OtherPublicChargesOrderNoList.substr(1);
    //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
    OtherPublicChargesHouseOwner = OtherPublicChargesHouseOwner.substr(1);
    OtherPublicChargesLargestNumberIn = OtherPublicChargesLargestNumberIn.substr(1);
    //20130529 mfj  增加列：合同Id 合同Code
    OtherPublicChargesContractId = OtherPublicChargesContractId.substr(1);
    OtherPublicChargesContractCode = OtherPublicChargesContractCode.substr(1);
    OtherPublicChargesCityText = OtherPublicChargesCityText.substr(1);

    document.all.hiddenOtherPublicChargesInfo.value =
														  OtherPublicChargesCityList + "|"
														+ OtherPublicChargesAddressList + "|"
														+ OtherPublicChargesContractStartList + "|"
														+ OtherPublicChargesContractEndList + "|"
                                                        + OtherPublicChargesHouseOwner + "|"
														+ OtherPublicChargesMonthRentList + "|"
                                                        + OtherPublicChargesLargestNumberIn + "|"
														+ OtherPublicChargesOrderNoList + "|"
                                                        + OtherPublicChargesContractId + "|"
                                                        + OtherPublicChargesContractCode + "|"
                                                        + OtherPublicChargesCityText;
}
//追加行
function refreshOtherPublicChargesData() {
    //删除原来的行
    var rowCount = OtherPublicChargesTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        OtherPublicChargesTable.deleteRow(1);
    }
    var MaxCells = OtherPublicChargesTable.rows[0].cells.length;

    for (var i = 0; i < gatheringOtherPublicChargesArray.length; i++) {
        var newRow = OtherPublicChargesTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_OrderNo;
                    cell.align = "center";
                    break;
                case 1: //选择合同号
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='OtherPublicChargesHouseContractID_" + i + "' value='" + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_HouseContractID + "' style=\"height:40px\"><input type='text' id='OtherPublicChargesTextBoxHouseContract_" + i + "' value='" + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_HouseContract + "' style=\"width:80%;\" readonly  >";

                    var objHiddenContractID = "OtherPublicChargesHouseContractID_" + i;
                    var objContractID = "OtherPublicChargesTextBoxHouseContract_" + i;
                    var objCityText = "OtherPublicChargesTextBoxHouseCity_" + i;
                    var objCityID = "OtherPublicChargesHouseCityID_" + i;
                    var objAddress = "OtherPublicChargesTextBoxAddress_" + i;
                    var objStartDate = "OtherPublicChargesTextBoxContractStart_" + i;
                    var objEndDate = "OtherPublicChargesTextBoxContractEnd_" + i;
                    var objOwner = "OtherPublicChargesTextBoxHouseOwner_" + i;
                    var objMonthlyRent = "OtherPublicChargesTextBoxMonthRent_" + i;
                    var objMaxNumber = "OtherPublicChargesTextBoxLargestNumberIn_" + i;

                    var obj = "OtherPublicChargesTextBoxHouseContract_" + i;
                    cell.innerHTML += "<IMG id='imgQuery_" + i + "' onclick=\"QueryContractInfo('" + objHiddenContractID + "','" + objContractID + "','" + objCityID + "','" + objCityText + "','" + objAddress + "','" + objStartDate + "','" + objEndDate + "','" + objOwner + "','" + objMonthlyRent + "','" + objMaxNumber + "','" + i + "','47')\" style='CURSOR: hand;' src='../../images/searchicon_enabled.gif' align='absBottom'>";
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_HouseContract;
                    }
                    break;
                case 2: //城市
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='OtherPublicChargesHouseCityID_" + i + "' value='" + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_HouseCityID + "' style=\"height:40px\"><input type='text' id='OtherPublicChargesTextBoxHouseCity_" + i + "' value='" + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_City + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;
                case 3: //房屋租住地址
                    cell.innerHTML = "<input type='text' id='OtherPublicChargesTextBoxAddress_" + i + "' value='" + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_Address + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 4: //合同开始日期
                    cell.innerHTML = "<input type='text' id='OtherPublicChargesTextBoxContractStart_" + i + "' value='" + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_ContractStart + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 5: //合同结束日期
                    cell.innerHTML = "<input type='text' id='OtherPublicChargesTextBoxContractEnd_" + i + "' value='" + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_ContractEnd + "' style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 6: //房东
                    cell.innerHTML = "<input type='text' id='OtherPublicChargesTextBoxHouseOwner_" + i + "' value='" + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_HouseOwner + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 7: //月租金
                    cell.innerHTML = "<input maxlength='10'   type='text'  id='OtherPublicChargesTextBoxMonthRent_" + i + "'  value='" + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_MonthRent + "'   style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 8: //最大入住人数
                    cell.innerHTML = "<input maxlength='10' type='text' id='OtherPublicChargesTextBoxLargestNumberIn_" + i + "' value='" + gatheringOtherPublicChargesArray[i].gt_OtherPublicCharges_LargestNumberIn + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;
                case 9: //删除
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteOtherPublicChargesRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
}
//删除选定行
function deleteOtherPublicChargesRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringOtherPublicChargesArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringOtherPublicChargesArray[i];
            tempArray[j].gt_OtherPublicCharges_OrderNo = j + 1;
            j++;
        }
    }

    gatheringOtherPublicChargesArray = tempArray;
    refreshOtherPublicChargesData();
}
//办公场地费-日常用水
function jsDailyWterUsageGathering(jOrderNo, ContractId, ContractName, jCityID, jCity, jAddress, jContractStart, jContractEnd, jHouseOwner, jRent, jLargestNumberIn) {
    this.gt_DailyWterUsage_OrderNo = jOrderNo;
    this.gt_DailyWterUsage_HouseContractID = ContractId;
    this.gt_DailyWterUsage_HouseContract = ContractName;
    this.gt_DailyWterUsage_HouseCityID = jCityID;
    this.gt_DailyWterUsage_City = jCity;
    this.gt_DailyWterUsage_Address = jAddress;
    this.gt_DailyWterUsage_ContractStart = jContractStart;
    this.gt_DailyWterUsage_ContractEnd = jContractEnd;
    this.gt_DailyWterUsage_MonthRent = jRent;

    // 房东，最大入住人数
    this.gt_DailyWterUsage_HouseOwner = jHouseOwner;
    this.gt_DailyWterUsage_LargestNumberIn = jLargestNumberIn;
}
var gatheringDailyWterUsageArray = new Array();
function addDailyWterUsageRow() {
    var index = gatheringDailyWterUsageArray.length;
    //20180624
    gatheringDailyWterUsageArray[index] = new jsDailyWterUsageGathering(index + 1, '', '', '', '', '', '', '', '', '', '');
    refreshDailyWterUsageData();
}
function DailyWterUsageItemSubmit() {
    var DailyWterUsageCityList = '';
    var DailyWterUsageAddressList = '';
    var DailyWterUsageContractStartList = '';
    var DailyWterUsageContractEndList = '';
    var DailyWterUsageMonthRentList = '';
    var DailyWterUsageOrderNoList = '';
    var DailyWterUsageHouseOwner = '';
    var DailyWterUsageLargestNumberIn = '';
    //20130529增加合同编码 合同id
    var DailyWterUsageContractId = '';
    var DailyWterUsageContractCode = '';
    var DailyWterUsageCityText = '';
    for (var i = 0; i < gatheringDailyWterUsageArray.length; i++) {
        var index = i + 1;
        //省市
        if (Trim(gatheringDailyWterUsageArray[i].gt_DailyWterUsage_City).length <= 0) {
            alert("费用支付明细第“" + index + "”行的省市不能为空");
            document.all["DailyWterUsageTextBoxHouseCity_" + i].focus();
            return false;
        }
        if (gatheringDailyWterUsageArray[i].gt_DailyWterUsage_City.indexOf("~") != -1 || gatheringDailyWterUsageArray[i].gt_DailyWterUsage_City.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的省市字符“~”，“|”为非法字符，请重新输入。');
            document.all["DailyWterUsageTextBoxHouseCity_" + i].focus();
            return false;
        }
        //房屋租住地址
        if (Trim(gatheringDailyWterUsageArray[i].gt_DailyWterUsage_Address).length <= 0) {
            alert("费用支付明细第“" + index + "”行的房屋租住地址不能为空");
            document.all["DailyWterUsageTextBoxAddress_" + i].focus();
            return false;
        }
        if (gatheringDailyWterUsageArray[i].gt_DailyWterUsage_Address.indexOf("~") != -1 || gatheringDailyWterUsageArray[i].gt_DailyWterUsage_Address.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的房屋租住地址字符“~”，“|”为非法字符，请重新输入。');
            document.all["DailyWterUsageTextBoxAddress_" + i].focus();
            return false;
        }
        //合同开始日期
        if (gatheringDailyWterUsageArray[i].gt_DailyWterUsage_ContractStart == '') {
            alert("费用支付明细第“" + index + "”行的合同开始日期不能为空");
            document.all["DailyWterUsageTextBoxContractStart_" + i].focus();
            return false;
        }
        //合同结束日期
        if (gatheringDailyWterUsageArray[i].gt_DailyWterUsage_ContractEnd == '') {
            alert("费用支付明细第“" + index + "”行的合同结束日期不能为空");
            document.all["DailyWterUsageTextBoxContractEnd_" + i].focus();
            return false;
        }
        //月租金
        if (gatheringDailyWterUsageArray[i].gt_DailyWterUsage_MonthRent == '') {
            alert("费用支付明细第“" + index + "”行的月租金不能为空");
            document.all["DailyWterUsageTextBoxMonthRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringDailyWterUsageArray[i].gt_DailyWterUsage_MonthRent)) {
                alert("费用支付明细第“" + index + "”行的月租金不正确");
                document.all["DailyWterUsageTextBoxMonthRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringDailyWterUsageArray[i].gt_DailyWterUsage_MonthRent < 0) {
                    alert("费用支付明细第“" + index + "”行的月租金不能小于等于零");
                    document.all["DailyWterUsageTextBoxMonthRent_" + i].focus();
                    return false;
                }
            }
        }
        //20120515 wanghk 增加列：房东 gt_DailyWterUsage_HouseOwner
        if ((gatheringDailyWterUsageArray[i].gt_DailyWterUsage_HouseOwner).length <= 0) {
            alert("费用支付明细第“" + index + "”行的房东不能为空，请重新输入。");
            document.all["DailyWterUsageTextBoxHouseOwner_" + i].focus();
            return false;
        }
        if (gatheringDailyWterUsageArray[i].gt_DailyWterUsage_HouseOwner.indexOf("~") != -1 || gatheringDailyWterUsageArray[i].gt_DailyWterUsage_HouseOwner.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的房东字符“~”，“|”为非法字符，请重新输入。');
            document.all["DailyWterUsageTextBoxHouseOwner_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：最大入住人数 gt_DailyWterUsage_LargestNumberIn
        if ((gatheringDailyWterUsageArray[i].gt_DailyWterUsage_LargestNumberIn).length <= 0) {
            alert("费用支付明细第“" + index + "”行的最大入住人数不能为空，请重新输入。");
            document.all["DailyWterUsageTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if (gatheringDailyWterUsageArray[i].gt_DailyWterUsage_LargestNumberIn.indexOf("~") != -1 || gatheringDailyWterUsageArray[i].gt_DailyWterUsage_LargestNumberIn.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的最大入住人数字符“~”，“|”为非法字符，请重新输入。');
            document.all["DailyWterUsageTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if ((gatheringDailyWterUsageArray[i].gt_DailyWterUsage_HouseContract).length <= 0) {
            alert("费用支付明细第“" + index + "”行的合同不能为空，请选择");
            document.all["DailyWterUsageTextBoxHouseContract_" + i].focus();
            return false;
        }


        DailyWterUsageCityList += '~' + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_HouseCityID;
        DailyWterUsageAddressList += '~' + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_Address;
        DailyWterUsageContractStartList += '~' + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_ContractStart;
        DailyWterUsageContractEndList += '~' + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_ContractEnd;
        DailyWterUsageMonthRentList += '~' + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_MonthRent;
        DailyWterUsageOrderNoList += '~' + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_OrderNo;
        //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
        DailyWterUsageHouseOwner += '~' + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_HouseOwner;
        DailyWterUsageLargestNumberIn += '~' + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_LargestNumberIn;
        //20130529 mfj  增加列：合同Id 合同Code
        DailyWterUsageContractId += '~' + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_HouseContractID;
        DailyWterUsageContractCode += '~' + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_HouseContract;
        DailyWterUsageCityText += '~' + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_City;

    }

    DailyWterUsageCityList = DailyWterUsageCityList.substr(1);
    DailyWterUsageAddressList = DailyWterUsageAddressList.substr(1);
    DailyWterUsageContractStartList = DailyWterUsageContractStartList.substr(1);
    DailyWterUsageContractEndList = DailyWterUsageContractEndList.substr(1);
    DailyWterUsageMonthRentList = DailyWterUsageMonthRentList.substr(1);
    DailyWterUsageOrderNoList = DailyWterUsageOrderNoList.substr(1);
    //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
    DailyWterUsageHouseOwner = DailyWterUsageHouseOwner.substr(1);
    DailyWterUsageLargestNumberIn = DailyWterUsageLargestNumberIn.substr(1);
    //20130529 mfj  增加列：合同Id 合同Code
    DailyWterUsageContractId = DailyWterUsageContractId.substr(1);
    DailyWterUsageContractCode = DailyWterUsageContractCode.substr(1);
    DailyWterUsageCityText = DailyWterUsageCityText.substr(1);

    document.all.hiddenDailyWterUsageInfo.value =
														  DailyWterUsageCityList + "|"
														+ DailyWterUsageAddressList + "|"
														+ DailyWterUsageContractStartList + "|"
														+ DailyWterUsageContractEndList + "|"
                                                        + DailyWterUsageHouseOwner + "|"
														+ DailyWterUsageMonthRentList + "|"
                                                        + DailyWterUsageLargestNumberIn + "|"
														+ DailyWterUsageOrderNoList + "|"
                                                        + DailyWterUsageContractId + "|"
                                                        + DailyWterUsageContractCode + "|"
                                                        + DailyWterUsageCityText;
}
//追加行
function refreshDailyWterUsageData() {
    //删除原来的行
    var rowCount = DailyWterUsageTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        DailyWterUsageTable.deleteRow(1);
    }
    var MaxCells = DailyWterUsageTable.rows[0].cells.length;

    for (var i = 0; i < gatheringDailyWterUsageArray.length; i++) {
        var newRow = DailyWterUsageTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = gatheringDailyWterUsageArray[i].gt_DailyWterUsage_OrderNo;
                    cell.align = "center";
                    break;
                case 1: //选择合同号
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='DailyWterUsageHouseContractID_" + i + "' value='" + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_HouseContractID + "' style=\"height:40px\"><input type='text' id='DailyWterUsageTextBoxHouseContract_" + i + "' value='" + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_HouseContract + "' style=\"width:80%;\" readonly  >";

                    var objHiddenContractID = "DailyWterUsageHouseContractID_" + i;
                    var objContractID = "DailyWterUsageTextBoxHouseContract_" + i;
                    var objCityText = "DailyWterUsageTextBoxHouseCity_" + i;
                    var objCityID = "DailyWterUsageHouseCityID_" + i;
                    var objAddress = "DailyWterUsageTextBoxAddress_" + i;
                    var objStartDate = "DailyWterUsageTextBoxContractStart_" + i;
                    var objEndDate = "DailyWterUsageTextBoxContractEnd_" + i;
                    var objOwner = "DailyWterUsageTextBoxHouseOwner_" + i;
                    var objMonthlyRent = "DailyWterUsageTextBoxMonthRent_" + i;
                    var objMaxNumber = "DailyWterUsageTextBoxLargestNumberIn_" + i;

                    var obj = "DailyWterUsageTextBoxHouseContract_" + i;
                    cell.innerHTML += "<IMG id='imgQuery_" + i + "' onclick=\"QueryContractInfo('" + objHiddenContractID + "','" + objContractID + "','" + objCityID + "','" + objCityText + "','" + objAddress + "','" + objStartDate + "','" + objEndDate + "','" + objOwner + "','" + objMonthlyRent + "','" + objMaxNumber + "','" + i + "','49')\" style='CURSOR: hand;' src='../../images/searchicon_enabled.gif' align='absBottom'>";
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringDailyWterUsageArray[i].gt_DailyWterUsage_HouseContract;
                    }
                    break;
                case 2: //城市
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='DailyWterUsageHouseCityID_" + i + "' value='" + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_HouseCityID + "' style=\"height:40px\"><input type='text' id='DailyWterUsageTextBoxHouseCity_" + i + "' value='" + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_City + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;
                case 3: //房屋租住地址
                    cell.innerHTML = "<input type='text' id='DailyWterUsageTextBoxAddress_" + i + "' value='" + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_Address + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 4: //合同开始日期
                    cell.innerHTML = "<input type='text' id='DailyWterUsageTextBoxContractStart_" + i + "' value='" + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_ContractStart + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 5: //合同结束日期
                    cell.innerHTML = "<input type='text' id='DailyWterUsageTextBoxContractEnd_" + i + "' value='" + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_ContractEnd + "' style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 6: //房东
                    cell.innerHTML = "<input type='text' id='DailyWterUsageTextBoxHouseOwner_" + i + "' value='" + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_HouseOwner + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 7: //月租金
                    cell.innerHTML = "<input maxlength='10'   type='text'  id='DailyWterUsageTextBoxMonthRent_" + i + "'  value='" + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_MonthRent + "'   style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 8: //最大入住人数
                    cell.innerHTML = "<input maxlength='10' type='text' id='DailyWterUsageTextBoxLargestNumberIn_" + i + "' value='" + gatheringDailyWterUsageArray[i].gt_DailyWterUsage_LargestNumberIn + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;
                case 9: //删除
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteDailyWterUsageRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
}
//删除选定行
function deleteDailyWterUsageRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringDailyWterUsageArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringDailyWterUsageArray[i];
            tempArray[j].gt_DailyWterUsage_OrderNo = j + 1;
            j++;
        }
    }

    gatheringDailyWterUsageArray = tempArray;
    refreshDailyWterUsageData();
}
//办公场地费-燃气费
function jsGasFeeGathering(jOrderNo, ContractId, ContractName, jCityID, jCity, jAddress, jContractStart, jContractEnd, jHouseOwner, jRent, jLargestNumberIn) {
    this.gt_GasFee_OrderNo = jOrderNo;
    this.gt_GasFee_HouseContractID = ContractId;
    this.gt_GasFee_HouseContract = ContractName;
    this.gt_GasFee_HouseCityID = jCityID;
    this.gt_GasFee_City = jCity;
    this.gt_GasFee_Address = jAddress;
    this.gt_GasFee_ContractStart = jContractStart;
    this.gt_GasFee_ContractEnd = jContractEnd;
    this.gt_GasFee_MonthRent = jRent;

    // 房东，最大入住人数
    this.gt_GasFee_HouseOwner = jHouseOwner;
    this.gt_GasFee_LargestNumberIn = jLargestNumberIn;
}
var gatheringGasFeeArray = new Array();
function addGasFeeRow() {
    var index = gatheringGasFeeArray.length;
    //20180624
    gatheringGasFeeArray[index] = new jsGasFeeGathering(index + 1, '', '', '', '', '', '', '', '', '', '');
    refreshGasFeeData();
}
function GasFeeItemSubmit() {
    var GasFeeCityList = '';
    var GasFeeAddressList = '';
    var GasFeeContractStartList = '';
    var GasFeeContractEndList = '';
    var GasFeeMonthRentList = '';
    var GasFeeOrderNoList = '';
    var GasFeeHouseOwner = '';
    var GasFeeLargestNumberIn = '';
    //20130529增加合同编码 合同id
    var GasFeeContractId = '';
    var GasFeeContractCode = '';
    var GasFeeCityText = '';
    for (var i = 0; i < gatheringGasFeeArray.length; i++) {
        var index = i + 1;
        //省市
        if (Trim(gatheringGasFeeArray[i].gt_GasFee_City).length <= 0) {
            alert("费用支付明细第“" + index + "”行的省市不能为空");
            document.all["GasFeeTextBoxHouseCity_" + i].focus();
            return false;
        }
        if (gatheringGasFeeArray[i].gt_GasFee_City.indexOf("~") != -1 || gatheringGasFeeArray[i].gt_GasFee_City.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的省市字符“~”，“|”为非法字符，请重新输入。');
            document.all["GasFeeTextBoxHouseCity_" + i].focus();
            return false;
        }
        //房屋租住地址
        if (Trim(gatheringGasFeeArray[i].gt_GasFee_Address).length <= 0) {
            alert("费用支付明细第“" + index + "”行的房屋租住地址不能为空");
            document.all["GasFeeTextBoxAddress_" + i].focus();
            return false;
        }
        if (gatheringGasFeeArray[i].gt_GasFee_Address.indexOf("~") != -1 || gatheringGasFeeArray[i].gt_GasFee_Address.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的房屋租住地址字符“~”，“|”为非法字符，请重新输入。');
            document.all["GasFeeTextBoxAddress_" + i].focus();
            return false;
        }
        //合同开始日期
        if (gatheringGasFeeArray[i].gt_GasFee_ContractStart == '') {
            alert("费用支付明细第“" + index + "”行的合同开始日期不能为空");
            document.all["GasFeeTextBoxContractStart_" + i].focus();
            return false;
        }
        //合同结束日期
        if (gatheringGasFeeArray[i].gt_GasFee_ContractEnd == '') {
            alert("费用支付明细第“" + index + "”行的合同结束日期不能为空");
            document.all["GasFeeTextBoxContractEnd_" + i].focus();
            return false;
        }
        //月租金
        if (gatheringGasFeeArray[i].gt_GasFee_MonthRent == '') {
            alert("费用支付明细第“" + index + "”行的月租金不能为空");
            document.all["GasFeeTextBoxMonthRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringGasFeeArray[i].gt_GasFee_MonthRent)) {
                alert("费用支付明细第“" + index + "”行的月租金不正确");
                document.all["GasFeeTextBoxMonthRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringGasFeeArray[i].gt_GasFee_MonthRent < 0) {
                    alert("费用支付明细第“" + index + "”行的月租金不能小于等于零");
                    document.all["GasFeeTextBoxMonthRent_" + i].focus();
                    return false;
                }
            }
        }
        //20120515 wanghk 增加列：房东 gt_GasFee_HouseOwner
        if ((gatheringGasFeeArray[i].gt_GasFee_HouseOwner).length <= 0) {
            alert("费用支付明细第“" + index + "”行的房东不能为空，请重新输入。");
            document.all["GasFeeTextBoxHouseOwner_" + i].focus();
            return false;
        }
        if (gatheringGasFeeArray[i].gt_GasFee_HouseOwner.indexOf("~") != -1 || gatheringGasFeeArray[i].gt_GasFee_HouseOwner.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的房东字符“~”，“|”为非法字符，请重新输入。');
            document.all["GasFeeTextBoxHouseOwner_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：最大入住人数 gt_GasFee_LargestNumberIn
        if ((gatheringGasFeeArray[i].gt_GasFee_LargestNumberIn).length <= 0) {
            alert("费用支付明细第“" + index + "”行的最大入住人数不能为空，请重新输入。");
            document.all["GasFeeTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if (gatheringGasFeeArray[i].gt_GasFee_LargestNumberIn.indexOf("~") != -1 || gatheringGasFeeArray[i].gt_GasFee_LargestNumberIn.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的最大入住人数字符“~”，“|”为非法字符，请重新输入。');
            document.all["GasFeeTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if ((gatheringGasFeeArray[i].gt_GasFee_HouseContract).length <= 0) {
            alert("费用支付明细第“" + index + "”行的合同不能为空，请选择");
            document.all["GasFeeTextBoxHouseContract_" + i].focus();
            return false;
        }


        GasFeeCityList += '~' + gatheringGasFeeArray[i].gt_GasFee_HouseCityID;
        GasFeeAddressList += '~' + gatheringGasFeeArray[i].gt_GasFee_Address;
        GasFeeContractStartList += '~' + gatheringGasFeeArray[i].gt_GasFee_ContractStart;
        GasFeeContractEndList += '~' + gatheringGasFeeArray[i].gt_GasFee_ContractEnd;
        GasFeeMonthRentList += '~' + gatheringGasFeeArray[i].gt_GasFee_MonthRent;
        GasFeeOrderNoList += '~' + gatheringGasFeeArray[i].gt_GasFee_OrderNo;
        //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
        GasFeeHouseOwner += '~' + gatheringGasFeeArray[i].gt_GasFee_HouseOwner;
        GasFeeLargestNumberIn += '~' + gatheringGasFeeArray[i].gt_GasFee_LargestNumberIn;
        //20130529 mfj  增加列：合同Id 合同Code
        GasFeeContractId += '~' + gatheringGasFeeArray[i].gt_GasFee_HouseContractID;
        GasFeeContractCode += '~' + gatheringGasFeeArray[i].gt_GasFee_HouseContract;
        GasFeeCityText += '~' + gatheringGasFeeArray[i].gt_GasFee_City;

    }

    GasFeeCityList = GasFeeCityList.substr(1);
    GasFeeAddressList = GasFeeAddressList.substr(1);
    GasFeeContractStartList = GasFeeContractStartList.substr(1);
    GasFeeContractEndList = GasFeeContractEndList.substr(1);
    GasFeeMonthRentList = GasFeeMonthRentList.substr(1);
    GasFeeOrderNoList = GasFeeOrderNoList.substr(1);
    //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
    GasFeeHouseOwner = GasFeeHouseOwner.substr(1);
    GasFeeLargestNumberIn = GasFeeLargestNumberIn.substr(1);
    //20130529 mfj  增加列：合同Id 合同Code
    GasFeeContractId = GasFeeContractId.substr(1);
    GasFeeContractCode = GasFeeContractCode.substr(1);
    GasFeeCityText = GasFeeCityText.substr(1);

    document.all.hiddenGasFeeInfo.value =
														  GasFeeCityList + "|"
														+ GasFeeAddressList + "|"
														+ GasFeeContractStartList + "|"
														+ GasFeeContractEndList + "|"
                                                        + GasFeeHouseOwner + "|"
														+ GasFeeMonthRentList + "|"
                                                        + GasFeeLargestNumberIn + "|"
														+ GasFeeOrderNoList + "|"
                                                        + GasFeeContractId + "|"
                                                        + GasFeeContractCode + "|"
                                                        + GasFeeCityText;
}
//追加行
function refreshGasFeeData() {
    //删除原来的行
    var rowCount = GasFeeTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        GasFeeTable.deleteRow(1);
    }
    var MaxCells = GasFeeTable.rows[0].cells.length;

    for (var i = 0; i < gatheringGasFeeArray.length; i++) {
        var newRow = GasFeeTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = gatheringGasFeeArray[i].gt_GasFee_OrderNo;
                    cell.align = "center";
                    break;
                case 1: //选择合同号
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='GasFeeHouseContractID_" + i + "' value='" + gatheringGasFeeArray[i].gt_GasFee_HouseContractID + "' style=\"height:40px\"><input type='text' id='GasFeeTextBoxHouseContract_" + i + "' value='" + gatheringGasFeeArray[i].gt_GasFee_HouseContract + "' style=\"width:80%;\" readonly  >";

                    var objHiddenContractID = "GasFeeHouseContractID_" + i;
                    var objContractID = "GasFeeTextBoxHouseContract_" + i;
                    var objCityText = "GasFeeTextBoxHouseCity_" + i;
                    var objCityID = "GasFeeHouseCityID_" + i;
                    var objAddress = "GasFeeTextBoxAddress_" + i;
                    var objStartDate = "GasFeeTextBoxContractStart_" + i;
                    var objEndDate = "GasFeeTextBoxContractEnd_" + i;
                    var objOwner = "GasFeeTextBoxHouseOwner_" + i;
                    var objMonthlyRent = "GasFeeTextBoxMonthRent_" + i;
                    var objMaxNumber = "GasFeeTextBoxLargestNumberIn_" + i;

                    var obj = "GasFeeTextBoxHouseContract_" + i;
                    cell.innerHTML += "<IMG id='imgQuery_" + i + "' onclick=\"QueryContractInfo('" + objHiddenContractID + "','" + objContractID + "','" + objCityID + "','" + objCityText + "','" + objAddress + "','" + objStartDate + "','" + objEndDate + "','" + objOwner + "','" + objMonthlyRent + "','" + objMaxNumber + "','" + i + "','52')\" style='CURSOR: hand;' src='../../images/searchicon_enabled.gif' align='absBottom'>";
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringGasFeeArray[i].gt_GasFee_HouseContract;
                    }
                    break;
                case 2: //城市
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='GasFeeHouseCityID_" + i + "' value='" + gatheringGasFeeArray[i].gt_GasFee_HouseCityID + "' style=\"height:40px\"><input type='text' id='GasFeeTextBoxHouseCity_" + i + "' value='" + gatheringGasFeeArray[i].gt_GasFee_City + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;
                case 3: //房屋租住地址
                    cell.innerHTML = "<input type='text' id='GasFeeTextBoxAddress_" + i + "' value='" + gatheringGasFeeArray[i].gt_GasFee_Address + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 4: //合同开始日期
                    cell.innerHTML = "<input type='text' id='GasFeeTextBoxContractStart_" + i + "' value='" + gatheringGasFeeArray[i].gt_GasFee_ContractStart + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 5: //合同结束日期
                    cell.innerHTML = "<input type='text' id='GasFeeTextBoxContractEnd_" + i + "' value='" + gatheringGasFeeArray[i].gt_GasFee_ContractEnd + "' style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 6: //房东
                    cell.innerHTML = "<input type='text' id='GasFeeTextBoxHouseOwner_" + i + "' value='" + gatheringGasFeeArray[i].gt_GasFee_HouseOwner + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 7: //月租金
                    cell.innerHTML = "<input maxlength='10'   type='text'  id='GasFeeTextBoxMonthRent_" + i + "'  value='" + gatheringGasFeeArray[i].gt_GasFee_MonthRent + "'   style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 8: //最大入住人数
                    cell.innerHTML = "<input maxlength='10' type='text' id='GasFeeTextBoxLargestNumberIn_" + i + "' value='" + gatheringGasFeeArray[i].gt_GasFee_LargestNumberIn + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;
                case 9: //删除
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteGasFeeRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
}
//删除选定行
function deleteGasFeeRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringGasFeeArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringGasFeeArray[i];
            tempArray[j].gt_GasFee_OrderNo = j + 1;
            j++;
        }
    }

    gatheringGasFeeArray = tempArray;
    refreshGasFeeData();
}
//办公场地费-物业费
function jsPropertyFeeGathering(jOrderNo, ContractId, ContractName, jCityID, jCity, jAddress, jContractStart, jContractEnd, jHouseOwner, jRent, jLargestNumberIn) {
    this.gt_PropertyFee_OrderNo = jOrderNo;
    this.gt_PropertyFee_HouseContractID = ContractId;
    this.gt_PropertyFee_HouseContract = ContractName;
    this.gt_PropertyFee_HouseCityID = jCityID;
    this.gt_PropertyFee_City = jCity;
    this.gt_PropertyFee_Address = jAddress;
    this.gt_PropertyFee_ContractStart = jContractStart;
    this.gt_PropertyFee_ContractEnd = jContractEnd;
    this.gt_PropertyFee_MonthRent = jRent;

    // 房东，最大入住人数
    this.gt_PropertyFee_HouseOwner = jHouseOwner;
    this.gt_PropertyFee_LargestNumberIn = jLargestNumberIn;
}
var gatheringPropertyFeeArray = new Array();
function addPropertyFeeRow() {
    var index = gatheringPropertyFeeArray.length;
    //20180624
    gatheringPropertyFeeArray[index] = new jsPropertyFeeGathering(index + 1, '', '', '', '', '', '', '', '', '', '');
    refreshPropertyFeeData();
}
function PropertyFeeItemSubmit() {
    var PropertyFeeCityList = '';
    var PropertyFeeAddressList = '';
    var PropertyFeeContractStartList = '';
    var PropertyFeeContractEndList = '';
    var PropertyFeeMonthRentList = '';
    var PropertyFeeOrderNoList = '';
    var PropertyFeeHouseOwner = '';
    var PropertyFeeLargestNumberIn = '';
    //20130529增加合同编码 合同id
    var PropertyFeeContractId = '';
    var PropertyFeeContractCode = '';
    var PropertyFeeCityText = '';
    for (var i = 0; i < gatheringPropertyFeeArray.length; i++) {
        var index = i + 1;
        //省市
        if (Trim(gatheringPropertyFeeArray[i].gt_PropertyFee_City).length <= 0) {
            alert("费用支付明细第“" + index + "”行的省市不能为空");
            document.all["PropertyFeeTextBoxHouseCity_" + i].focus();
            return false;
        }
        if (gatheringPropertyFeeArray[i].gt_PropertyFee_City.indexOf("~") != -1 || gatheringPropertyFeeArray[i].gt_PropertyFee_City.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的省市字符“~”，“|”为非法字符，请重新输入。');
            document.all["PropertyFeeTextBoxHouseCity_" + i].focus();
            return false;
        }
        //房屋租住地址
        if (Trim(gatheringPropertyFeeArray[i].gt_PropertyFee_Address).length <= 0) {
            alert("费用支付明细第“" + index + "”行的房屋租住地址不能为空");
            document.all["PropertyFeeTextBoxAddress_" + i].focus();
            return false;
        }
        if (gatheringPropertyFeeArray[i].gt_PropertyFee_Address.indexOf("~") != -1 || gatheringPropertyFeeArray[i].gt_PropertyFee_Address.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的房屋租住地址字符“~”，“|”为非法字符，请重新输入。');
            document.all["PropertyFeeTextBoxAddress_" + i].focus();
            return false;
        }
        //合同开始日期
        if (gatheringPropertyFeeArray[i].gt_PropertyFee_ContractStart == '') {
            alert("费用支付明细第“" + index + "”行的合同开始日期不能为空");
            document.all["PropertyFeeTextBoxContractStart_" + i].focus();
            return false;
        }
        //合同结束日期
        if (gatheringPropertyFeeArray[i].gt_PropertyFee_ContractEnd == '') {
            alert("费用支付明细第“" + index + "”行的合同结束日期不能为空");
            document.all["PropertyFeeTextBoxContractEnd_" + i].focus();
            return false;
        }
        //月租金
        if (gatheringPropertyFeeArray[i].gt_PropertyFee_MonthRent == '') {
            alert("费用支付明细第“" + index + "”行的月租金不能为空");
            document.all["PropertyFeeTextBoxMonthRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringPropertyFeeArray[i].gt_PropertyFee_MonthRent)) {
                alert("费用支付明细第“" + index + "”行的月租金不正确");
                document.all["PropertyFeeTextBoxMonthRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringPropertyFeeArray[i].gt_PropertyFee_MonthRent < 0) {
                    alert("费用支付明细第“" + index + "”行的月租金不能小于等于零");
                    document.all["PropertyFeeTextBoxMonthRent_" + i].focus();
                    return false;
                }
            }
        }
        //20120515 wanghk 增加列：房东 gt_PropertyFee_HouseOwner
        if ((gatheringPropertyFeeArray[i].gt_PropertyFee_HouseOwner).length <= 0) {
            alert("费用支付明细第“" + index + "”行的房东不能为空，请重新输入。");
            document.all["PropertyFeeTextBoxHouseOwner_" + i].focus();
            return false;
        }
        if (gatheringPropertyFeeArray[i].gt_PropertyFee_HouseOwner.indexOf("~") != -1 || gatheringPropertyFeeArray[i].gt_PropertyFee_HouseOwner.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的房东字符“~”，“|”为非法字符，请重新输入。');
            document.all["PropertyFeeTextBoxHouseOwner_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：最大入住人数 gt_PropertyFee_LargestNumberIn
        if ((gatheringPropertyFeeArray[i].gt_PropertyFee_LargestNumberIn).length <= 0) {
            alert("费用支付明细第“" + index + "”行的最大入住人数不能为空，请重新输入。");
            document.all["PropertyFeeTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if (gatheringPropertyFeeArray[i].gt_PropertyFee_LargestNumberIn.indexOf("~") != -1 || gatheringPropertyFeeArray[i].gt_PropertyFee_LargestNumberIn.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的最大入住人数字符“~”，“|”为非法字符，请重新输入。');
            document.all["PropertyFeeTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if ((gatheringPropertyFeeArray[i].gt_PropertyFee_HouseContract).length <= 0) {
            alert("费用支付明细第“" + index + "”行的合同不能为空，请选择");
            document.all["PropertyFeeTextBoxHouseContract_" + i].focus();
            return false;
        }


        PropertyFeeCityList += '~' + gatheringPropertyFeeArray[i].gt_PropertyFee_HouseCityID;
        PropertyFeeAddressList += '~' + gatheringPropertyFeeArray[i].gt_PropertyFee_Address;
        PropertyFeeContractStartList += '~' + gatheringPropertyFeeArray[i].gt_PropertyFee_ContractStart;
        PropertyFeeContractEndList += '~' + gatheringPropertyFeeArray[i].gt_PropertyFee_ContractEnd;
        PropertyFeeMonthRentList += '~' + gatheringPropertyFeeArray[i].gt_PropertyFee_MonthRent;
        PropertyFeeOrderNoList += '~' + gatheringPropertyFeeArray[i].gt_PropertyFee_OrderNo;
        //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
        PropertyFeeHouseOwner += '~' + gatheringPropertyFeeArray[i].gt_PropertyFee_HouseOwner;
        PropertyFeeLargestNumberIn += '~' + gatheringPropertyFeeArray[i].gt_PropertyFee_LargestNumberIn;
        //20130529 mfj  增加列：合同Id 合同Code
        PropertyFeeContractId += '~' + gatheringPropertyFeeArray[i].gt_PropertyFee_HouseContractID;
        PropertyFeeContractCode += '~' + gatheringPropertyFeeArray[i].gt_PropertyFee_HouseContract;
        PropertyFeeCityText += '~' + gatheringPropertyFeeArray[i].gt_PropertyFee_City;

    }

    PropertyFeeCityList = PropertyFeeCityList.substr(1);
    PropertyFeeAddressList = PropertyFeeAddressList.substr(1);
    PropertyFeeContractStartList = PropertyFeeContractStartList.substr(1);
    PropertyFeeContractEndList = PropertyFeeContractEndList.substr(1);
    PropertyFeeMonthRentList = PropertyFeeMonthRentList.substr(1);
    PropertyFeeOrderNoList = PropertyFeeOrderNoList.substr(1);
    //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
    PropertyFeeHouseOwner = PropertyFeeHouseOwner.substr(1);
    PropertyFeeLargestNumberIn = PropertyFeeLargestNumberIn.substr(1);
    //20130529 mfj  增加列：合同Id 合同Code
    PropertyFeeContractId = PropertyFeeContractId.substr(1);
    PropertyFeeContractCode = PropertyFeeContractCode.substr(1);
    PropertyFeeCityText = PropertyFeeCityText.substr(1);

    document.all.hiddenPropertyFeeInfo.value =
														  PropertyFeeCityList + "|"
														+ PropertyFeeAddressList + "|"
														+ PropertyFeeContractStartList + "|"
														+ PropertyFeeContractEndList + "|"
                                                        + PropertyFeeHouseOwner + "|"
														+ PropertyFeeMonthRentList + "|"
                                                        + PropertyFeeLargestNumberIn + "|"
														+ PropertyFeeOrderNoList + "|"
                                                        + PropertyFeeContractId + "|"
                                                        + PropertyFeeContractCode + "|"
                                                        + PropertyFeeCityText;
}
//追加行
function refreshPropertyFeeData() {
    //删除原来的行
    var rowCount = PropertyFeeTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        PropertyFeeTable.deleteRow(1);
    }
    var MaxCells = PropertyFeeTable.rows[0].cells.length;

    for (var i = 0; i < gatheringPropertyFeeArray.length; i++) {
        var newRow = PropertyFeeTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = gatheringPropertyFeeArray[i].gt_PropertyFee_OrderNo;
                    cell.align = "center";
                    break;
                case 1: //选择合同号
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='PropertyFeeHouseContractID_" + i + "' value='" + gatheringPropertyFeeArray[i].gt_PropertyFee_HouseContractID + "' style=\"height:40px\"><input type='text' id='PropertyFeeTextBoxHouseContract_" + i + "' value='" + gatheringPropertyFeeArray[i].gt_PropertyFee_HouseContract + "' style=\"width:80%;\" readonly  >";

                    var objHiddenContractID = "PropertyFeeHouseContractID_" + i;
                    var objContractID = "PropertyFeeTextBoxHouseContract_" + i;
                    var objCityText = "PropertyFeeTextBoxHouseCity_" + i;
                    var objCityID = "PropertyFeeHouseCityID_" + i;
                    var objAddress = "PropertyFeeTextBoxAddress_" + i;
                    var objStartDate = "PropertyFeeTextBoxContractStart_" + i;
                    var objEndDate = "PropertyFeeTextBoxContractEnd_" + i;
                    var objOwner = "PropertyFeeTextBoxHouseOwner_" + i;
                    var objMonthlyRent = "PropertyFeeTextBoxMonthRent_" + i;
                    var objMaxNumber = "PropertyFeeTextBoxLargestNumberIn_" + i;

                    var obj = "PropertyFeeTextBoxHouseContract_" + i;
                    cell.innerHTML += "<IMG id='imgQuery_" + i + "' onclick=\"QueryContractInfo('" + objHiddenContractID + "','" + objContractID + "','" + objCityID + "','" + objCityText + "','" + objAddress + "','" + objStartDate + "','" + objEndDate + "','" + objOwner + "','" + objMonthlyRent + "','" + objMaxNumber + "','" + i + "','51')\" style='CURSOR: hand;' src='../../images/searchicon_enabled.gif' align='absBottom'>";
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringPropertyFeeArray[i].gt_PropertyFee_HouseContract;
                    }
                    break;
                case 2: //城市
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='PropertyFeeHouseCityID_" + i + "' value='" + gatheringPropertyFeeArray[i].gt_PropertyFee_HouseCityID + "' style=\"height:40px\"><input type='text' id='PropertyFeeTextBoxHouseCity_" + i + "' value='" + gatheringPropertyFeeArray[i].gt_PropertyFee_City + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;
                case 3: //房屋租住地址
                    cell.innerHTML = "<input type='text' id='PropertyFeeTextBoxAddress_" + i + "' value='" + gatheringPropertyFeeArray[i].gt_PropertyFee_Address + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 4: //合同开始日期
                    cell.innerHTML = "<input type='text' id='PropertyFeeTextBoxContractStart_" + i + "' value='" + gatheringPropertyFeeArray[i].gt_PropertyFee_ContractStart + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 5: //合同结束日期
                    cell.innerHTML = "<input type='text' id='PropertyFeeTextBoxContractEnd_" + i + "' value='" + gatheringPropertyFeeArray[i].gt_PropertyFee_ContractEnd + "' style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 6: //房东
                    cell.innerHTML = "<input type='text' id='PropertyFeeTextBoxHouseOwner_" + i + "' value='" + gatheringPropertyFeeArray[i].gt_PropertyFee_HouseOwner + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 7: //月租金
                    cell.innerHTML = "<input maxlength='10'   type='text'  id='PropertyFeeTextBoxMonthRent_" + i + "'  value='" + gatheringPropertyFeeArray[i].gt_PropertyFee_MonthRent + "'   style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 8: //最大入住人数
                    cell.innerHTML = "<input maxlength='10' type='text' id='PropertyFeeTextBoxLargestNumberIn_" + i + "' value='" + gatheringPropertyFeeArray[i].gt_PropertyFee_LargestNumberIn + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;
                case 9: //删除
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deletePropertyFeeRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
}
//删除选定行
function deletePropertyFeeRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringPropertyFeeArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringPropertyFeeArray[i];
            tempArray[j].gt_PropertyFee_OrderNo = j + 1;
            j++;
        }
    }

    gatheringPropertyFeeArray = tempArray;
    refreshPropertyFeeData();
}
//办公场地费-电费
function jsElectricChargesGathering(jOrderNo, ContractId, ContractName, jCityID, jCity, jAddress, jContractStart, jContractEnd, jHouseOwner, jRent, jLargestNumberIn) {
    this.gt_ElectricCharges_OrderNo = jOrderNo;
    this.gt_ElectricCharges_HouseContractID = ContractId;
    this.gt_ElectricCharges_HouseContract = ContractName;
    this.gt_ElectricCharges_HouseCityID = jCityID;
    this.gt_ElectricCharges_City = jCity;
    this.gt_ElectricCharges_Address = jAddress;
    this.gt_ElectricCharges_ContractStart = jContractStart;
    this.gt_ElectricCharges_ContractEnd = jContractEnd;
    this.gt_ElectricCharges_MonthRent = jRent;

    // 房东，最大入住人数
    this.gt_ElectricCharges_HouseOwner = jHouseOwner;
    this.gt_ElectricCharges_LargestNumberIn = jLargestNumberIn;
}
var gatheringElectricChargesArray = new Array();
function addElectricChargesRow() {
    var index = gatheringElectricChargesArray.length;
    //20180624
    gatheringElectricChargesArray[index] = new jsElectricChargesGathering(index + 1, '', '', '', '', '', '', '', '', '', '');
    refreshElectricChargesData();
}
function ElectricChargesItemSubmit() {
    var ElectricChargesCityList = '';
    var ElectricChargesAddressList = '';
    var ElectricChargesContractStartList = '';
    var ElectricChargesContractEndList = '';
    var ElectricChargesMonthRentList = '';
    var ElectricChargesOrderNoList = '';
    var ElectricChargesHouseOwner = '';
    var ElectricChargesLargestNumberIn = '';
    //20130529增加合同编码 合同id
    var ElectricChargesContractId = '';
    var ElectricChargesContractCode = '';
    var ElectricChargesCityText = '';
    for (var i = 0; i < gatheringElectricChargesArray.length; i++) {
        var index = i + 1;
        //省市
        if (Trim(gatheringElectricChargesArray[i].gt_ElectricCharges_City).length <= 0) {
            alert("费用支付明细第“" + index + "”行的省市不能为空");
            document.all["ElectricChargesTextBoxHouseCity_" + i].focus();
            return false;
        }
        if (gatheringElectricChargesArray[i].gt_ElectricCharges_City.indexOf("~") != -1 || gatheringElectricChargesArray[i].gt_ElectricCharges_City.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的省市字符“~”，“|”为非法字符，请重新输入。');
            document.all["ElectricChargesTextBoxHouseCity_" + i].focus();
            return false;
        }
        //房屋租住地址
        if (Trim(gatheringElectricChargesArray[i].gt_ElectricCharges_Address).length <= 0) {
            alert("费用支付明细第“" + index + "”行的房屋租住地址不能为空");
            document.all["ElectricChargesTextBoxAddress_" + i].focus();
            return false;
        }
        if (gatheringElectricChargesArray[i].gt_ElectricCharges_Address.indexOf("~") != -1 || gatheringElectricChargesArray[i].gt_ElectricCharges_Address.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的房屋租住地址字符“~”，“|”为非法字符，请重新输入。');
            document.all["ElectricChargesTextBoxAddress_" + i].focus();
            return false;
        }
        //合同开始日期
        if (gatheringElectricChargesArray[i].gt_ElectricCharges_ContractStart == '') {
            alert("费用支付明细第“" + index + "”行的合同开始日期不能为空");
            document.all["ElectricChargesTextBoxContractStart_" + i].focus();
            return false;
        }
        //合同结束日期
        if (gatheringElectricChargesArray[i].gt_ElectricCharges_ContractEnd == '') {
            alert("费用支付明细第“" + index + "”行的合同结束日期不能为空");
            document.all["ElectricChargesTextBoxContractEnd_" + i].focus();
            return false;
        }
        //月租金
        if (gatheringElectricChargesArray[i].gt_ElectricCharges_MonthRent == '') {
            alert("费用支付明细第“" + index + "”行的月租金不能为空");
            document.all["ElectricChargesTextBoxMonthRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringElectricChargesArray[i].gt_ElectricCharges_MonthRent)) {
                alert("费用支付明细第“" + index + "”行的月租金不正确");
                document.all["ElectricChargesTextBoxMonthRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringElectricChargesArray[i].gt_ElectricCharges_MonthRent < 0) {
                    alert("费用支付明细第“" + index + "”行的月租金不能小于等于零");
                    document.all["ElectricChargesTextBoxMonthRent_" + i].focus();
                    return false;
                }
            }
        }
        //20120515 wanghk 增加列：房东 gt_ElectricCharges_HouseOwner
        if ((gatheringElectricChargesArray[i].gt_ElectricCharges_HouseOwner).length <= 0) {
            alert("费用支付明细第“" + index + "”行的房东不能为空，请重新输入。");
            document.all["ElectricChargesTextBoxHouseOwner_" + i].focus();
            return false;
        }
        if (gatheringElectricChargesArray[i].gt_ElectricCharges_HouseOwner.indexOf("~") != -1 || gatheringElectricChargesArray[i].gt_ElectricCharges_HouseOwner.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的房东字符“~”，“|”为非法字符，请重新输入。');
            document.all["ElectricChargesTextBoxHouseOwner_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：最大入住人数 gt_ElectricCharges_LargestNumberIn
        if ((gatheringElectricChargesArray[i].gt_ElectricCharges_LargestNumberIn).length <= 0) {
            alert("费用支付明细第“" + index + "”行的最大入住人数不能为空，请重新输入。");
            document.all["ElectricChargesTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if (gatheringElectricChargesArray[i].gt_ElectricCharges_LargestNumberIn.indexOf("~") != -1 || gatheringElectricChargesArray[i].gt_ElectricCharges_LargestNumberIn.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的最大入住人数字符“~”，“|”为非法字符，请重新输入。');
            document.all["ElectricChargesTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if ((gatheringElectricChargesArray[i].gt_ElectricCharges_HouseContract).length <= 0) {
            alert("费用支付明细第“" + index + "”行的合同不能为空，请选择");
            document.all["ElectricChargesTextBoxHouseContract_" + i].focus();
            return false;
        }


        ElectricChargesCityList += '~' + gatheringElectricChargesArray[i].gt_ElectricCharges_HouseCityID;
        ElectricChargesAddressList += '~' + gatheringElectricChargesArray[i].gt_ElectricCharges_Address;
        ElectricChargesContractStartList += '~' + gatheringElectricChargesArray[i].gt_ElectricCharges_ContractStart;
        ElectricChargesContractEndList += '~' + gatheringElectricChargesArray[i].gt_ElectricCharges_ContractEnd;
        ElectricChargesMonthRentList += '~' + gatheringElectricChargesArray[i].gt_ElectricCharges_MonthRent;
        ElectricChargesOrderNoList += '~' + gatheringElectricChargesArray[i].gt_ElectricCharges_OrderNo;
        //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
        ElectricChargesHouseOwner += '~' + gatheringElectricChargesArray[i].gt_ElectricCharges_HouseOwner;
        ElectricChargesLargestNumberIn += '~' + gatheringElectricChargesArray[i].gt_ElectricCharges_LargestNumberIn;
        //20130529 mfj  增加列：合同Id 合同Code
        ElectricChargesContractId += '~' + gatheringElectricChargesArray[i].gt_ElectricCharges_HouseContractID;
        ElectricChargesContractCode += '~' + gatheringElectricChargesArray[i].gt_ElectricCharges_HouseContract;
        ElectricChargesCityText += '~' + gatheringElectricChargesArray[i].gt_ElectricCharges_City;

    }

    ElectricChargesCityList = ElectricChargesCityList.substr(1);
    ElectricChargesAddressList = ElectricChargesAddressList.substr(1);
    ElectricChargesContractStartList = ElectricChargesContractStartList.substr(1);
    ElectricChargesContractEndList = ElectricChargesContractEndList.substr(1);
    ElectricChargesMonthRentList = ElectricChargesMonthRentList.substr(1);
    ElectricChargesOrderNoList = ElectricChargesOrderNoList.substr(1);
    //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
    ElectricChargesHouseOwner = ElectricChargesHouseOwner.substr(1);
    ElectricChargesLargestNumberIn = ElectricChargesLargestNumberIn.substr(1);
    //20130529 mfj  增加列：合同Id 合同Code
    ElectricChargesContractId = ElectricChargesContractId.substr(1);
    ElectricChargesContractCode = ElectricChargesContractCode.substr(1);
    ElectricChargesCityText = ElectricChargesCityText.substr(1);

    document.all.hiddenElectricChargesInfo.value =
														  ElectricChargesCityList + "|"
														+ ElectricChargesAddressList + "|"
														+ ElectricChargesContractStartList + "|"
														+ ElectricChargesContractEndList + "|"
                                                        + ElectricChargesHouseOwner + "|"
														+ ElectricChargesMonthRentList + "|"
                                                        + ElectricChargesLargestNumberIn + "|"
														+ ElectricChargesOrderNoList + "|"
                                                        + ElectricChargesContractId + "|"
                                                        + ElectricChargesContractCode + "|"
                                                        + ElectricChargesCityText;
}
//追加行
function refreshElectricChargesData() {
    //删除原来的行
    var rowCount = ElectricChargesTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        ElectricChargesTable.deleteRow(1);
    }
    var MaxCells = ElectricChargesTable.rows[0].cells.length;

    for (var i = 0; i < gatheringElectricChargesArray.length; i++) {
        var newRow = ElectricChargesTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = gatheringElectricChargesArray[i].gt_ElectricCharges_OrderNo;
                    cell.align = "center";
                    break;
                case 1: //选择合同号
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='ElectricChargesHouseContractID_" + i + "' value='" + gatheringElectricChargesArray[i].gt_ElectricCharges_HouseContractID + "' style=\"height:40px\"><input type='text' id='ElectricChargesTextBoxHouseContract_" + i + "' value='" + gatheringElectricChargesArray[i].gt_ElectricCharges_HouseContract + "' style=\"width:80%;\" readonly  >";

                    var objHiddenContractID = "ElectricChargesHouseContractID_" + i;
                    var objContractID = "ElectricChargesTextBoxHouseContract_" + i;
                    var objCityText = "ElectricChargesTextBoxHouseCity_" + i;
                    var objCityID = "ElectricChargesHouseCityID_" + i;
                    var objAddress = "ElectricChargesTextBoxAddress_" + i;
                    var objStartDate = "ElectricChargesTextBoxContractStart_" + i;
                    var objEndDate = "ElectricChargesTextBoxContractEnd_" + i;
                    var objOwner = "ElectricChargesTextBoxHouseOwner_" + i;
                    var objMonthlyRent = "ElectricChargesTextBoxMonthRent_" + i;
                    var objMaxNumber = "ElectricChargesTextBoxLargestNumberIn_" + i;

                    var obj = "ElectricChargesTextBoxHouseContract_" + i;
                    cell.innerHTML += "<IMG id='imgQuery_" + i + "' onclick=\"QueryContractInfo('" + objHiddenContractID + "','" + objContractID + "','" + objCityID + "','" + objCityText + "','" + objAddress + "','" + objStartDate + "','" + objEndDate + "','" + objOwner + "','" + objMonthlyRent + "','" + objMaxNumber + "','" + i + "','48')\" style='CURSOR: hand;' src='../../images/searchicon_enabled.gif' align='absBottom'>";
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringElectricChargesArray[i].gt_ElectricCharges_HouseContract;
                    }
                    break;
                case 2: //城市
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='ElectricChargesHouseCityID_" + i + "' value='" + gatheringElectricChargesArray[i].gt_ElectricCharges_HouseCityID + "' style=\"height:40px\"><input type='text' id='ElectricChargesTextBoxHouseCity_" + i + "' value='" + gatheringElectricChargesArray[i].gt_ElectricCharges_City + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;
                case 3: //房屋租住地址
                    cell.innerHTML = "<input type='text' id='ElectricChargesTextBoxAddress_" + i + "' value='" + gatheringElectricChargesArray[i].gt_ElectricCharges_Address + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 4: //合同开始日期
                    cell.innerHTML = "<input type='text' id='ElectricChargesTextBoxContractStart_" + i + "' value='" + gatheringElectricChargesArray[i].gt_ElectricCharges_ContractStart + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 5: //合同结束日期
                    cell.innerHTML = "<input type='text' id='ElectricChargesTextBoxContractEnd_" + i + "' value='" + gatheringElectricChargesArray[i].gt_ElectricCharges_ContractEnd + "' style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 6: //房东
                    cell.innerHTML = "<input type='text' id='ElectricChargesTextBoxHouseOwner_" + i + "' value='" + gatheringElectricChargesArray[i].gt_ElectricCharges_HouseOwner + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 7: //月租金
                    cell.innerHTML = "<input maxlength='10'   type='text'  id='ElectricChargesTextBoxMonthRent_" + i + "'  value='" + gatheringElectricChargesArray[i].gt_ElectricCharges_MonthRent + "'   style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 8: //最大入住人数
                    cell.innerHTML = "<input maxlength='10' type='text' id='ElectricChargesTextBoxLargestNumberIn_" + i + "' value='" + gatheringElectricChargesArray[i].gt_ElectricCharges_LargestNumberIn + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;
                case 9: //删除
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteElectricChargesRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
}
//删除选定行
function deleteElectricChargesRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringElectricChargesArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringElectricChargesArray[i];
            tempArray[j].gt_ElectricCharges_OrderNo = j + 1;
            j++;
        }
    }

    gatheringElectricChargesArray = tempArray;
    refreshElectricChargesData();
}
//办公场地费-饮用水
function jsDrinkingWaterGathering(jOrderNo, ContractId, ContractName, jCityID, jCity, jAddress, jContractStart, jContractEnd, jHouseOwner, jRent, jLargestNumberIn) {
    this.gt_DrinkingWater_OrderNo = jOrderNo;
    this.gt_DrinkingWater_HouseContractID = ContractId;
    this.gt_DrinkingWater_HouseContract = ContractName;
    this.gt_DrinkingWater_HouseCityID = jCityID;
    this.gt_DrinkingWater_City = jCity;
    this.gt_DrinkingWater_Address = jAddress;
    this.gt_DrinkingWater_ContractStart = jContractStart;
    this.gt_DrinkingWater_ContractEnd = jContractEnd;
    this.gt_DrinkingWater_MonthRent = jRent;

    // 房东，最大入住人数
    this.gt_DrinkingWater_HouseOwner = jHouseOwner;
    this.gt_DrinkingWater_LargestNumberIn = jLargestNumberIn;
}
var gatheringDrinkingWaterArray = new Array();
function addDrinkingWaterRow() {
    var index = gatheringDrinkingWaterArray.length;
    //20180624
    gatheringDrinkingWaterArray[index] = new jsDrinkingWaterGathering(index + 1, '', '', '', '', '', '', '', '', '', '');
    refreshDrinkingWaterData();
}
function DrinkingWaterItemSubmit() {
    var DrinkingWaterCityList = '';
    var DrinkingWaterAddressList = '';
    var DrinkingWaterContractStartList = '';
    var DrinkingWaterContractEndList = '';
    var DrinkingWaterMonthRentList = '';
    var DrinkingWaterOrderNoList = '';
    var DrinkingWaterHouseOwner = '';
    var DrinkingWaterLargestNumberIn = '';
    //20130529增加合同编码 合同id
    var DrinkingWaterContractId = '';
    var DrinkingWaterContractCode = '';
    var DrinkingWaterCityText = '';
    for (var i = 0; i < gatheringDrinkingWaterArray.length; i++) {
        var index = i + 1;
        //省市
        if (Trim(gatheringDrinkingWaterArray[i].gt_DrinkingWater_City).length <= 0) {
            alert("费用支付明细第“" + index + "”行的省市不能为空");
            document.all["DrinkingWaterTextBoxHouseCity_" + i].focus();
            return false;
        }
        if (gatheringDrinkingWaterArray[i].gt_DrinkingWater_City.indexOf("~") != -1 || gatheringDrinkingWaterArray[i].gt_DrinkingWater_City.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的省市字符“~”，“|”为非法字符，请重新输入。');
            document.all["DrinkingWaterTextBoxHouseCity_" + i].focus();
            return false;
        }
        //房屋租住地址
        if (Trim(gatheringDrinkingWaterArray[i].gt_DrinkingWater_Address).length <= 0) {
            alert("费用支付明细第“" + index + "”行的房屋租住地址不能为空");
            document.all["DrinkingWaterTextBoxAddress_" + i].focus();
            return false;
        }
        if (gatheringDrinkingWaterArray[i].gt_DrinkingWater_Address.indexOf("~") != -1 || gatheringDrinkingWaterArray[i].gt_DrinkingWater_Address.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的房屋租住地址字符“~”，“|”为非法字符，请重新输入。');
            document.all["DrinkingWaterTextBoxAddress_" + i].focus();
            return false;
        }
        //合同开始日期
        if (gatheringDrinkingWaterArray[i].gt_DrinkingWater_ContractStart == '') {
            alert("费用支付明细第“" + index + "”行的合同开始日期不能为空");
            document.all["DrinkingWaterTextBoxContractStart_" + i].focus();
            return false;
        }
        //合同结束日期
        if (gatheringDrinkingWaterArray[i].gt_DrinkingWater_ContractEnd == '') {
            alert("费用支付明细第“" + index + "”行的合同结束日期不能为空");
            document.all["DrinkingWaterTextBoxContractEnd_" + i].focus();
            return false;
        }
        //月租金
        if (gatheringDrinkingWaterArray[i].gt_DrinkingWater_MonthRent == '') {
            alert("费用支付明细第“" + index + "”行的月租金不能为空");
            document.all["DrinkingWaterTextBoxMonthRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringDrinkingWaterArray[i].gt_DrinkingWater_MonthRent)) {
                alert("费用支付明细第“" + index + "”行的月租金不正确");
                document.all["DrinkingWaterTextBoxMonthRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringDrinkingWaterArray[i].gt_DrinkingWater_MonthRent < 0) {
                    alert("费用支付明细第“" + index + "”行的月租金不能小于等于零");
                    document.all["DrinkingWaterTextBoxMonthRent_" + i].focus();
                    return false;
                }
            }
        }
        //20120515 wanghk 增加列：房东 gt_DrinkingWater_HouseOwner
        if ((gatheringDrinkingWaterArray[i].gt_DrinkingWater_HouseOwner).length <= 0) {
            alert("费用支付明细第“" + index + "”行的房东不能为空，请重新输入。");
            document.all["DrinkingWaterTextBoxHouseOwner_" + i].focus();
            return false;
        }
        if (gatheringDrinkingWaterArray[i].gt_DrinkingWater_HouseOwner.indexOf("~") != -1 || gatheringDrinkingWaterArray[i].gt_DrinkingWater_HouseOwner.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的房东字符“~”，“|”为非法字符，请重新输入。');
            document.all["DrinkingWaterTextBoxHouseOwner_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：最大入住人数 gt_DrinkingWater_LargestNumberIn
        if ((gatheringDrinkingWaterArray[i].gt_DrinkingWater_LargestNumberIn).length <= 0) {
            alert("费用支付明细第“" + index + "”行的最大入住人数不能为空，请重新输入。");
            document.all["DrinkingWaterTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if (gatheringDrinkingWaterArray[i].gt_DrinkingWater_LargestNumberIn.indexOf("~") != -1 || gatheringDrinkingWaterArray[i].gt_DrinkingWater_LargestNumberIn.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的最大入住人数字符“~”，“|”为非法字符，请重新输入。');
            document.all["DrinkingWaterTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if ((gatheringDrinkingWaterArray[i].gt_DrinkingWater_HouseContract).length <= 0) {
            alert("费用支付明细第“" + index + "”行的合同不能为空，请选择");
            document.all["DrinkingWaterTextBoxHouseContract_" + i].focus();
            return false;
        }


        DrinkingWaterCityList += '~' + gatheringDrinkingWaterArray[i].gt_DrinkingWater_HouseCityID;
        DrinkingWaterAddressList += '~' + gatheringDrinkingWaterArray[i].gt_DrinkingWater_Address;
        DrinkingWaterContractStartList += '~' + gatheringDrinkingWaterArray[i].gt_DrinkingWater_ContractStart;
        DrinkingWaterContractEndList += '~' + gatheringDrinkingWaterArray[i].gt_DrinkingWater_ContractEnd;
        DrinkingWaterMonthRentList += '~' + gatheringDrinkingWaterArray[i].gt_DrinkingWater_MonthRent;
        DrinkingWaterOrderNoList += '~' + gatheringDrinkingWaterArray[i].gt_DrinkingWater_OrderNo;
        //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
        DrinkingWaterHouseOwner += '~' + gatheringDrinkingWaterArray[i].gt_DrinkingWater_HouseOwner;
        DrinkingWaterLargestNumberIn += '~' + gatheringDrinkingWaterArray[i].gt_DrinkingWater_LargestNumberIn;
        //20130529 mfj  增加列：合同Id 合同Code
        DrinkingWaterContractId += '~' + gatheringDrinkingWaterArray[i].gt_DrinkingWater_HouseContractID;
        DrinkingWaterContractCode += '~' + gatheringDrinkingWaterArray[i].gt_DrinkingWater_HouseContract;
        DrinkingWaterCityText += '~' + gatheringDrinkingWaterArray[i].gt_DrinkingWater_City;

    }

    DrinkingWaterCityList = DrinkingWaterCityList.substr(1);
    DrinkingWaterAddressList = DrinkingWaterAddressList.substr(1);
    DrinkingWaterContractStartList = DrinkingWaterContractStartList.substr(1);
    DrinkingWaterContractEndList = DrinkingWaterContractEndList.substr(1);
    DrinkingWaterMonthRentList = DrinkingWaterMonthRentList.substr(1);
    DrinkingWaterOrderNoList = DrinkingWaterOrderNoList.substr(1);
    //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
    DrinkingWaterHouseOwner = DrinkingWaterHouseOwner.substr(1);
    DrinkingWaterLargestNumberIn = DrinkingWaterLargestNumberIn.substr(1);
    //20130529 mfj  增加列：合同Id 合同Code
    DrinkingWaterContractId = DrinkingWaterContractId.substr(1);
    DrinkingWaterContractCode = DrinkingWaterContractCode.substr(1);
    DrinkingWaterCityText = DrinkingWaterCityText.substr(1);

    document.all.hiddenDrinkingWaterInfo.value =
														  DrinkingWaterCityList + "|"
														+ DrinkingWaterAddressList + "|"
														+ DrinkingWaterContractStartList + "|"
														+ DrinkingWaterContractEndList + "|"
                                                        + DrinkingWaterHouseOwner + "|"
														+ DrinkingWaterMonthRentList + "|"
                                                        + DrinkingWaterLargestNumberIn + "|"
														+ DrinkingWaterOrderNoList + "|"
                                                        + DrinkingWaterContractId + "|"
                                                        + DrinkingWaterContractCode + "|"
                                                        + DrinkingWaterCityText;
}
//追加行
function refreshDrinkingWaterData() {
    //删除原来的行
    var rowCount = DrinkingWaterTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        DrinkingWaterTable.deleteRow(1);
    }
    var MaxCells = DrinkingWaterTable.rows[0].cells.length;

    for (var i = 0; i < gatheringDrinkingWaterArray.length; i++) {
        var newRow = DrinkingWaterTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = gatheringDrinkingWaterArray[i].gt_DrinkingWater_OrderNo;
                    cell.align = "center";
                    break;
                case 1: //选择合同号
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='DrinkingWaterHouseContractID_" + i + "' value='" + gatheringDrinkingWaterArray[i].gt_DrinkingWater_HouseContractID + "' style=\"height:40px\"><input type='text' id='DrinkingWaterTextBoxHouseContract_" + i + "' value='" + gatheringDrinkingWaterArray[i].gt_DrinkingWater_HouseContract + "' style=\"width:80%;\" readonly  >";

                    var objHiddenContractID = "DrinkingWaterHouseContractID_" + i;
                    var objContractID = "DrinkingWaterTextBoxHouseContract_" + i;
                    var objCityText = "DrinkingWaterTextBoxHouseCity_" + i;
                    var objCityID = "DrinkingWaterHouseCityID_" + i;
                    var objAddress = "DrinkingWaterTextBoxAddress_" + i;
                    var objStartDate = "DrinkingWaterTextBoxContractStart_" + i;
                    var objEndDate = "DrinkingWaterTextBoxContractEnd_" + i;
                    var objOwner = "DrinkingWaterTextBoxHouseOwner_" + i;
                    var objMonthlyRent = "DrinkingWaterTextBoxMonthRent_" + i;
                    var objMaxNumber = "DrinkingWaterTextBoxLargestNumberIn_" + i;

                    var obj = "DrinkingWaterTextBoxHouseContract_" + i;
                    cell.innerHTML += "<IMG id='imgQuery_" + i + "' onclick=\"QueryContractInfo('" + objHiddenContractID + "','" + objContractID + "','" + objCityID + "','" + objCityText + "','" + objAddress + "','" + objStartDate + "','" + objEndDate + "','" + objOwner + "','" + objMonthlyRent + "','" + objMaxNumber + "','" + i + "','50')\" style='CURSOR: hand;' src='../../images/searchicon_enabled.gif' align='absBottom'>";
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringDrinkingWaterArray[i].gt_DrinkingWater_HouseContract;
                    }
                    break;
                case 2: //城市
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='DrinkingWaterHouseCityID_" + i + "' value='" + gatheringDrinkingWaterArray[i].gt_DrinkingWater_HouseCityID + "' style=\"height:40px\"><input type='text' id='DrinkingWaterTextBoxHouseCity_" + i + "' value='" + gatheringDrinkingWaterArray[i].gt_DrinkingWater_City + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;
                case 3: //房屋租住地址
                    cell.innerHTML = "<input type='text' id='DrinkingWaterTextBoxAddress_" + i + "' value='" + gatheringDrinkingWaterArray[i].gt_DrinkingWater_Address + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 4: //合同开始日期
                    cell.innerHTML = "<input type='text' id='DrinkingWaterTextBoxContractStart_" + i + "' value='" + gatheringDrinkingWaterArray[i].gt_DrinkingWater_ContractStart + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 5: //合同结束日期
                    cell.innerHTML = "<input type='text' id='DrinkingWaterTextBoxContractEnd_" + i + "' value='" + gatheringDrinkingWaterArray[i].gt_DrinkingWater_ContractEnd + "' style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 6: //房东
                    cell.innerHTML = "<input type='text' id='DrinkingWaterTextBoxHouseOwner_" + i + "' value='" + gatheringDrinkingWaterArray[i].gt_DrinkingWater_HouseOwner + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 7: //月租金
                    cell.innerHTML = "<input maxlength='10'   type='text'  id='DrinkingWaterTextBoxMonthRent_" + i + "'  value='" + gatheringDrinkingWaterArray[i].gt_DrinkingWater_MonthRent + "'   style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 8: //最大入住人数
                    cell.innerHTML = "<input maxlength='10' type='text' id='DrinkingWaterTextBoxLargestNumberIn_" + i + "' value='" + gatheringDrinkingWaterArray[i].gt_DrinkingWater_LargestNumberIn + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;
                case 9: //删除
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteDrinkingWaterRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
}
//删除选定行
function deleteDrinkingWaterRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringDrinkingWaterArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringDrinkingWaterArray[i];
            tempArray[j].gt_DrinkingWater_OrderNo = j + 1;
            j++;
        }
    }

    gatheringDrinkingWaterArray = tempArray;
    refreshDrinkingWaterData();
}
//日常消耗品
function jsOfficeCommodityConsumptionGathering(jOrderNo, ContractId, ContractName, jCityID, jCity, jAddress, jContractStart, jContractEnd, jHouseOwner, jRent, jLargestNumberIn) {
    this.gt_OfficeCommodityConsumption_OrderNo = jOrderNo;
    this.gt_OfficeCommodityConsumption_HouseContractID = ContractId;
    this.gt_OfficeCommodityConsumption_HouseContract = ContractName;
    this.gt_OfficeCommodityConsumption_HouseCityID = jCityID;
    this.gt_OfficeCommodityConsumption_City = jCity;
    this.gt_OfficeCommodityConsumption_Address = jAddress;
    this.gt_OfficeCommodityConsumption_ContractStart = jContractStart;
    this.gt_OfficeCommodityConsumption_ContractEnd = jContractEnd;
    this.gt_OfficeCommodityConsumption_MonthRent = jRent;

    // 房东，最大入住人数
    this.gt_OfficeCommodityConsumption_HouseOwner = jHouseOwner;
    this.gt_OfficeCommodityConsumption_LargestNumberIn = jLargestNumberIn;
}
var gatheringOfficeCommodityConsumptionArray = new Array();
function addOfficeCommodityConsumptionRow() {
    var index = gatheringOfficeCommodityConsumptionArray.length;
    //20180624
    gatheringOfficeCommodityConsumptionArray[index] = new jsOfficeCommodityConsumptionGathering(index + 1, '', '', '', '', '', '', '', '', '', '');
    refreshOfficeCommodityConsumptionData();
}
function OfficeCommodityConsumptionItemSubmit() {
    var OfficeCommodityConsumptionCityList = '';
    var OfficeCommodityConsumptionAddressList = '';
    var OfficeCommodityConsumptionContractStartList = '';
    var OfficeCommodityConsumptionContractEndList = '';
    var OfficeCommodityConsumptionMonthRentList = '';
    var OfficeCommodityConsumptionOrderNoList = '';
    var OfficeCommodityConsumptionHouseOwner = '';
    var OfficeCommodityConsumptionLargestNumberIn = '';
    //20130529增加合同编码 合同id
    var OfficeCommodityConsumptionContractId = '';
    var OfficeCommodityConsumptionContractCode = '';
    var OfficeCommodityConsumptionCityText = '';
    for (var i = 0; i < gatheringOfficeCommodityConsumptionArray.length; i++) {
        var index = i + 1;
        //省市
        if (Trim(gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_City).length <= 0) {
            alert("费用支付明细第“" + index + "”行的省市不能为空");
            document.all["OfficeCommodityConsumptionTextBoxHouseCity_" + i].focus();
            return false;
        }
        if (gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_City.indexOf("~") != -1 || gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_City.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的省市字符“~”，“|”为非法字符，请重新输入。');
            document.all["OfficeCommodityConsumptionTextBoxHouseCity_" + i].focus();
            return false;
        }
        //房屋租住地址
        if (Trim(gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_Address).length <= 0) {
            alert("费用支付明细第“" + index + "”行的房屋租住地址不能为空");
            document.all["OfficeCommodityConsumptionTextBoxAddress_" + i].focus();
            return false;
        }
        if (gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_Address.indexOf("~") != -1 || gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_Address.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的房屋租住地址字符“~”，“|”为非法字符，请重新输入。');
            document.all["OfficeCommodityConsumptionTextBoxAddress_" + i].focus();
            return false;
        }
        //合同开始日期
        if (gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_ContractStart == '') {
            alert("费用支付明细第“" + index + "”行的合同开始日期不能为空");
            document.all["OfficeCommodityConsumptionTextBoxContractStart_" + i].focus();
            return false;
        }
        //合同结束日期
        if (gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_ContractEnd == '') {
            alert("费用支付明细第“" + index + "”行的合同结束日期不能为空");
            document.all["OfficeCommodityConsumptionTextBoxContractEnd_" + i].focus();
            return false;
        }
        //月租金
        if (gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_MonthRent == '') {
            alert("费用支付明细第“" + index + "”行的月租金不能为空");
            document.all["OfficeCommodityConsumptionTextBoxMonthRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_MonthRent)) {
                alert("费用支付明细第“" + index + "”行的月租金不正确");
                document.all["OfficeCommodityConsumptionTextBoxMonthRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_MonthRent < 0) {
                    alert("费用支付明细第“" + index + "”行的月租金不能小于等于零");
                    document.all["OfficeCommodityConsumptionTextBoxMonthRent_" + i].focus();
                    return false;
                }
            }
        }
        //20120515 wanghk 增加列：房东 gt_OfficeCommodityConsumption_HouseOwner
        if ((gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_HouseOwner).length <= 0) {
            alert("费用支付明细第“" + index + "”行的房东不能为空，请重新输入。");
            document.all["OfficeCommodityConsumptionTextBoxHouseOwner_" + i].focus();
            return false;
        }
        if (gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_HouseOwner.indexOf("~") != -1 || gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_HouseOwner.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的房东字符“~”，“|”为非法字符，请重新输入。');
            document.all["OfficeCommodityConsumptionTextBoxHouseOwner_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：最大入住人数 gt_OfficeCommodityConsumption_LargestNumberIn
        if ((gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_LargestNumberIn).length <= 0) {
            alert("费用支付明细第“" + index + "”行的最大入住人数不能为空，请重新输入。");
            document.all["OfficeCommodityConsumptionTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if (gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_LargestNumberIn.indexOf("~") != -1 || gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_LargestNumberIn.indexOf("|") != -1) {
            alert('费用支付明细第“' + index + '”行的最大入住人数字符“~”，“|”为非法字符，请重新输入。');
            document.all["OfficeCommodityConsumptionTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if ((gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_HouseContract).length <= 0) {
            alert("费用支付明细第“" + index + "”行的合同不能为空，请选择");
            document.all["OfficeCommodityConsumptionTextBoxHouseContract_" + i].focus();
            return false;
        }


        OfficeCommodityConsumptionCityList += '~' + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_HouseCityID;
        OfficeCommodityConsumptionAddressList += '~' + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_Address;
        OfficeCommodityConsumptionContractStartList += '~' + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_ContractStart;
        OfficeCommodityConsumptionContractEndList += '~' + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_ContractEnd;
        OfficeCommodityConsumptionMonthRentList += '~' + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_MonthRent;
        OfficeCommodityConsumptionOrderNoList += '~' + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_OrderNo;
        //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
        OfficeCommodityConsumptionHouseOwner += '~' + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_HouseOwner;
        OfficeCommodityConsumptionLargestNumberIn += '~' + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_LargestNumberIn;
        //20130529 mfj  增加列：合同Id 合同Code
        OfficeCommodityConsumptionContractId += '~' + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_HouseContractID;
        OfficeCommodityConsumptionContractCode += '~' + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_HouseContract;
        OfficeCommodityConsumptionCityText += '~' + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_City;

    }

    OfficeCommodityConsumptionCityList = OfficeCommodityConsumptionCityList.substr(1);
    OfficeCommodityConsumptionAddressList = OfficeCommodityConsumptionAddressList.substr(1);
    OfficeCommodityConsumptionContractStartList = OfficeCommodityConsumptionContractStartList.substr(1);
    OfficeCommodityConsumptionContractEndList = OfficeCommodityConsumptionContractEndList.substr(1);
    OfficeCommodityConsumptionMonthRentList = OfficeCommodityConsumptionMonthRentList.substr(1);
    OfficeCommodityConsumptionOrderNoList = OfficeCommodityConsumptionOrderNoList.substr(1);
    //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
    OfficeCommodityConsumptionHouseOwner = OfficeCommodityConsumptionHouseOwner.substr(1);
    OfficeCommodityConsumptionLargestNumberIn = OfficeCommodityConsumptionLargestNumberIn.substr(1);
    //20130529 mfj  增加列：合同Id 合同Code
    OfficeCommodityConsumptionContractId = OfficeCommodityConsumptionContractId.substr(1);
    OfficeCommodityConsumptionContractCode = OfficeCommodityConsumptionContractCode.substr(1);
    OfficeCommodityConsumptionCityText = OfficeCommodityConsumptionCityText.substr(1);

    document.all.hiddenOfficeCommodityConsumptionInfo.value =
														  OfficeCommodityConsumptionCityList + "|"
														+ OfficeCommodityConsumptionAddressList + "|"
														+ OfficeCommodityConsumptionContractStartList + "|"
														+ OfficeCommodityConsumptionContractEndList + "|"
                                                        + OfficeCommodityConsumptionHouseOwner + "|"
														+ OfficeCommodityConsumptionMonthRentList + "|"
                                                        + OfficeCommodityConsumptionLargestNumberIn + "|"
														+ OfficeCommodityConsumptionOrderNoList + "|"
                                                        + OfficeCommodityConsumptionContractId + "|"
                                                        + OfficeCommodityConsumptionContractCode + "|"
                                                        + OfficeCommodityConsumptionCityText;
}
//追加行
function refreshOfficeCommodityConsumptionData() {
    //删除原来的行
    var rowCount = OfficeCommodityConsumptionTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        OfficeCommodityConsumptionTable.deleteRow(1);
    }
    var MaxCells = OfficeCommodityConsumptionTable.rows[0].cells.length;

    for (var i = 0; i < gatheringOfficeCommodityConsumptionArray.length; i++) {
        var newRow = OfficeCommodityConsumptionTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_OrderNo;
                    cell.align = "center";
                    break;
                case 1: //选择合同号
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='OfficeCommodityConsumptionHouseContractID_" + i + "' value='" + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_HouseContractID + "' style=\"height:40px\"><input type='text' id='OfficeCommodityConsumptionTextBoxHouseContract_" + i + "' value='" + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_HouseContract + "' style=\"width:80%;\" readonly  >";

                    var objHiddenContractID = "OfficeCommodityConsumptionHouseContractID_" + i;
                    var objContractID = "OfficeCommodityConsumptionTextBoxHouseContract_" + i;
                    var objCityText = "OfficeCommodityConsumptionTextBoxHouseCity_" + i;
                    var objCityID = "OfficeCommodityConsumptionHouseCityID_" + i;
                    var objAddress = "OfficeCommodityConsumptionTextBoxAddress_" + i;
                    var objStartDate = "OfficeCommodityConsumptionTextBoxContractStart_" + i;
                    var objEndDate = "OfficeCommodityConsumptionTextBoxContractEnd_" + i;
                    var objOwner = "OfficeCommodityConsumptionTextBoxHouseOwner_" + i;
                    var objMonthlyRent = "OfficeCommodityConsumptionTextBoxMonthRent_" + i;
                    var objMaxNumber = "OfficeCommodityConsumptionTextBoxLargestNumberIn_" + i;

                    var obj = "OfficeCommodityConsumptionTextBoxHouseContract_" + i;
                    cell.innerHTML += "<IMG id='imgQuery_" + i + "' onclick=\"QueryContractInfo('" + objHiddenContractID + "','" + objContractID + "','" + objCityID + "','" + objCityText + "','" + objAddress + "','" + objStartDate + "','" + objEndDate + "','" + objOwner + "','" + objMonthlyRent + "','" + objMaxNumber + "','" + i + "','53')\" style='CURSOR: hand;' src='../../images/searchicon_enabled.gif' align='absBottom'>";
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_HouseContract;
                    }
                    break;
                case 2: //城市
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='OfficeCommodityConsumptionHouseCityID_" + i + "' value='" + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_HouseCityID + "' style=\"height:40px\"><input type='text' id='OfficeCommodityConsumptionTextBoxHouseCity_" + i + "' value='" + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_City + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;
                case 3: //房屋租住地址
                    cell.innerHTML = "<input type='text' id='OfficeCommodityConsumptionTextBoxAddress_" + i + "' value='" + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_Address + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 4: //合同开始日期
                    cell.innerHTML = "<input type='text' id='OfficeCommodityConsumptionTextBoxContractStart_" + i + "' value='" + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_ContractStart + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 5: //合同结束日期
                    cell.innerHTML = "<input type='text' id='OfficeCommodityConsumptionTextBoxContractEnd_" + i + "' value='" + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_ContractEnd + "' style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 6: //房东
                    cell.innerHTML = "<input type='text' id='OfficeCommodityConsumptionTextBoxHouseOwner_" + i + "' value='" + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_HouseOwner + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 7: //月租金
                    cell.innerHTML = "<input maxlength='10'   type='text'  id='OfficeCommodityConsumptionTextBoxMonthRent_" + i + "'  value='" + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_MonthRent + "'   style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 8: //最大入住人数
                    cell.innerHTML = "<input maxlength='10' type='text' id='OfficeCommodityConsumptionTextBoxLargestNumberIn_" + i + "' value='" + gatheringOfficeCommodityConsumptionArray[i].gt_OfficeCommodityConsumption_LargestNumberIn + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;
                case 9: //删除
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteOfficeCommodityConsumptionRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
}
//删除选定行
function deleteOfficeCommodityConsumptionRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringOfficeCommodityConsumptionArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringOfficeCommodityConsumptionArray[i];
            tempArray[j].gt_OfficeCommodityConsumption_OrderNo = j + 1;
            j++;
        }
    }

    gatheringOfficeCommodityConsumptionArray = tempArray;
    refreshOfficeCommodityConsumptionData();
}
//--------------------
var gatheringHousingAgencyFeeArray = new Array();
function addHousingAgencyFeeRow() {

    var index = gatheringHousingAgencyFeeArray.length;
    //20130524
    gatheringHousingAgencyFeeArray[index] = new jsHousingAgencyFeeGathering(index + 1, '', '',
    '', '', '', '',
    '', '', '',
    '', '', '',
    '', '', '',
    '', '', ''
    , '', '');
    refreshHousingAgencyFee();
    copyHousingAgencyFeeDataFromPreRow(gatheringHousingAgencyFeeArray.length);
}
function refreshHousingAgencyFee() {
    //删除原来的行
    var rowCount = HousingAgencyFeeTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        HousingAgencyFeeTable.deleteRow(1);
    }
    var MaxCells = HousingAgencyFeeTable.rows[0].cells.length;

    for (var i = 0; i < gatheringHousingAgencyFeeArray.length; i++) {
        var newRow = HousingAgencyFeeTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_OrderNo;
                    cell.align = "center";
                    break;
                case 1: //项目组
                    cell.noWrap = true;
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=100 onblur='javascript:setHousingAgencyFeeProjectTeam(" + i + ");'  id='HousingAgencyFeeTextBoxProjectTeam_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "HousingAgencyFeeTextBoxProjectTeam_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_ProjectTeam;
                    }
                    break;

                case 2: //选择合同号
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='HousingAgencyFeeContractID_" + i + "' value='" + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HouseContractID + "' style=\"height:40px\"><input type='text' id='HousingAgencyFeeTextBoxHouseContract_" + i + "' value='" + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HouseContract + "' style=\"width:80%;\" readonly  >";

                    var objHiddenContractID = "HousingAgencyFeeContractID_" + i;
                    var objContractID = "HousingAgencyFeeTextBoxHouseContract_" + i;
                    var objCityText = "HousingAgencyFeeTextBoxHouseCity_" + i;
                    var objCityID = "HousingAgencyFeeCityID_" + i;
                    var objAddress = "HousingAgencyFeeTextBoxAddress_" + i;
                    var objStartDate = "HousingAgencyFeeTextBoxContractStart_" + i;
                    var objEndDate = "HousingAgencyFeeTextBoxContractEnd_" + i;
                    var objOwner = "HousingAgencyFeeTextBoxHouseOwner_" + i;
                    var objMonthlyRent = "HousingAgencyFeeTextBoxMonthRent_" + i;
                    var objMaxNumber = "HousingAgencyFeeTextBoxLargestNumberIn_" + i;
                    var objHouseType = "HousingAgencyFeePayNature_" + i;
                    var objLeaseNature = "HousingAgencyFeeLeaseNature_" + i;

                    var obj = "HousingAgencyFeeTextBoxHouseContract_" + i;
                    cell.innerHTML += "<IMG id='imgQuery_" + i + "' onclick=\"QueryContractInfo('" + objHiddenContractID + "','" + objContractID + "','" + objCityID + "','" + objCityText + "','" + objAddress + "','" + objStartDate + "','" + objEndDate + "','" + objOwner + "','" + objMonthlyRent + "','" + objMaxNumber + "','" + i + "','54','" + objHouseType + "','" + objLeaseNature + "')\" style='CURSOR: hand;' src='../../images/searchicon_enabled.gif' align='absBottom'>";
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HouseContract;
                    }
                    break;
                case 3: //城市
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='HousingAgencyFeeCityID_" + i + "' value='" + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HouseCityID + "' style=\"height:40px\"><input type='text' id='HousingAgencyFeeTextBoxHouseCity_" + i + "' value='" + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_City + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;
                case 4: //房屋租住地址
                    cell.innerHTML = "<input type='text' id='HousingAgencyFeeTextBoxAddress_" + i + "' value='" + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_Address + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 5: //合同开始日期
                    cell.innerHTML = "<input type='text' id='HousingAgencyFeeTextBoxContractStart_" + i + "' value='" + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_ContractStart + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 6: //合同结束日期
                    cell.innerHTML = "<input type='text' id='HousingAgencyFeeTextBoxContractEnd_" + i + "' value='" + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_ContractEnd + "' style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 7: //房东
                    cell.innerHTML = "<input type='text' id='HousingAgencyFeeTextBoxHouseOwner_" + i + "' value='" + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HouseOwner + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 8: //月租金
                    cell.innerHTML = "<input maxlength='10'   type='text'  id='HousingAgencyFeeTextBoxMonthRent_" + i + "'  value='" + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_MonthRent + "'   style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 9: //最大入住人数
                    cell.innerHTML = "<input maxlength='10' type='text' id='HousingAgencyFeeTextBoxLargestNumberIn_" + i + "' value='" + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_LargestNumberIn + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 10: //租期开始日期
                    var dateID = "HousingAgencyFeeTextBoxHireStart_" + i;
                    cell.noWrap = true;
                    cell.innerHTML = "<input class='Wdate' autocomplete='off' style='width:90' id='" + dateID + "' value='" + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HireStart + "' " +
                        " onchange=\"javascript:checkHousingAgencyFeeHireStart(" + i + ");setHousingAgencyFeeHireStart(" + i + ");\" onfocus=\"javascript:setHousingAgencyFeeHireStart(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">"
                        ;
                    break;
                case 11: //租期结束日期
                    var dateID = "HousingAgencyFeeTextBoxHireEnd_" + i;
                    cell.noWrap = true;
                    cell.innerHTML = "<input   autocomplete='off' class='Wdate' style='width:90' id='" + dateID + "' value='" + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HireEnd + "' " +
                        " onchange=\"javascript:checkHousingAgencyFeeHireEnd(" + i + ");setHousingAgencyFeeHireEnd(" + i + ");\" onfocus=\"javascript:setHousingAgencyFeeHireEnd(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">"
                       ;
                    break;
                case 12: //付款金额
                    cell.innerHTML = "<input maxlength='10' onblur='javascript:setHousingAgencyFeeAllRent(" + i + ");' type='text' id='HousingAgencyFeeTextBoxAllRent_" + i + "' value='" + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_AllRent + "' style=\"width:100%;\" onKeypress='javascript:OnlyNumber();calHousingAgencyFeeSum();'>";
                    break;
                case 13: //发票号
                    cell.innerHTML = "<input maxlength='15' onchange='javascript:setHousingAgencyFeeTaxNo(" + i + ");' type='text' id='HousingAgencyFeeTextBoxTaxNo_" + i + "' value='" + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_TaxNo + "' style=\"width:100%\">";
                    break;
                case 14: //缴费性质                   
                    var payNatureVal = document.getElementById('hiddenPayNatureVal').value;
                    var selectIsShare = "<select disabled='disabled' name='HousingAgencyFeePayNature_" + i + "' id='HousingAgencyFeePayNature_" + i + "' onblur='javascript:setHousingAgencyFeePayNature(" + i + ");' onchange='javascript:setHousingAgencyFeePayNature(" + i + ");' style=\"width:98%;\"><option value=''>请选择</option>";
                    if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_PayNature != "") {
                        if (payNatureVal != "" && payNatureVal.split("~").length > 0) {
                            for (var n = 0; n < payNatureVal.split("~").length; n = n + 2) {
                                if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_PayNature == payNatureVal.split("~")[n])
                                    selectIsShare += "<option value='" + payNatureVal.split("~")[n] + "' selected>" + payNatureVal.split("~")[n + 1] + "</option>";
                                else
                                    selectIsShare += "<option value='" + payNatureVal.split("~")[n] + "'>" + payNatureVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    else {
                        if (payNatureVal != "" && payNatureVal.split("~").length > 0) {
                            for (var n = 0; n < payNatureVal.split("~").length; n = n + 2) {
                                selectIsShare += "<option value='" + payNatureVal.split("~")[n] + "'>" + payNatureVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    selectIsShare += "</select>";
                    cell.innerHTML = selectIsShare;
                    break;
                case 15: //租赁性质
                    //var leaseNatureVal = document.getElementById('hiddenHousingAgencyFeeLeaseNatureVal').value;

                    var leaseNatureVal = "1~经营租赁~2~租赁资产";
                    var selectIsShare = "<select disabled='disabled' name='HousingAgencyFeeLeaseNature_" + i + "' id='HousingAgencyFeeLeaseNature_" + i + "' onblur='javascript:setHousingAgencyFeeLeaseNature(" + i + ");' onchange='javascript:setHousingAgencyFeeLeaseNature(" + i + ");' style=\"width:98%;\"><option value=''>请选择</option>";
                    if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_LeaseNature != "") {
                        if (leaseNatureVal != "" && leaseNatureVal.split("~").length > 0) {
                            for (var n = 0; n < leaseNatureVal.split("~").length; n = n + 2) {
                                if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_LeaseNature == leaseNatureVal.split("~")[n])
                                    selectIsShare += "<option value='" + leaseNatureVal.split("~")[n] + "' selected>" + leaseNatureVal.split("~")[n + 1] + "</option>";
                                else
                                    selectIsShare += "<option value='" + leaseNatureVal.split("~")[n] + "'>" + leaseNatureVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    else {
                        if (leaseNatureVal != "" && leaseNatureVal.split("~").length > 0) {
                            for (var n = 0; n < leaseNatureVal.split("~").length; n = n + 2) {
                                selectIsShare += "<option value='" + leaseNatureVal.split("~")[n] + "'>" + leaseNatureVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    selectIsShare += "</select>";
                    cell.innerHTML = selectIsShare;
                    break;
                case 16: //删除
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteHousingAgencyFeeRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
    calHousingAgencyFeeSum();
}
////添加一行的时候，复制上一行的数据
//function copyHousingAgencyFeeDataFromPreRow(index) {
//    if (index == 1)
//        return;

//    var sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxProjectTeam_' + (index - 2));
//    var sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxProjectTeam_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeProjectTeam(index - 1);

//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxCity_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxCity_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeContract(index - 1);

//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxAddress_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxAddress_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeAddress(index - 1);

//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxContractStart_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxContractStart_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeContractStart(index - 1);

//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxContractEnd_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxContractEnd_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeContractEnd(index - 1);

//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxMonthRent_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxMonthRent_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeMonthRent(index - 1);


//    //20101215 chaidanlei 付款金额和付款租期（起止日）交换位置
//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxHireStart_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxHireStart_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeHireStart(index - 1);

//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxHireEnd_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxHireEnd_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeHireEnd(index - 1);

//    //付款金额
//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxAllRent_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxAllRent_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeAllRent(index - 1);

//    //是否按租期分摊
//    sel_SrcObj = document.getElementById('ShareByRentPeriod_' + (index - 2));
//    sel_TarObj = document.getElementById('ShareByRentPeriod_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeIsShareByRentPeriod(index - 1);

//    //20120515 wanghk 房东
//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxHouseOwner_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxHouseOwner_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeHouseOwner(index - 1);

//    //20120515 wanghk 最大入住人数
//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxLargestNumberIn_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxLargestNumberIn_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeLargestNumberIn(index - 1);

//    //20120515 wanghk 缴费性质
//    sel_SrcObj = document.getElementById('PayNature_' + (index - 2));
//    sel_TarObj = document.getElementById('PayNature_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeePayNature(index - 1);

//    // 租赁性质
//    sel_SrcObj = document.getElementById('LeaseNature_' + (index - 2));
//    sel_TarObj = document.getElementById('LeaseNature_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeLeaseNature(index - 1);
//}
function copyHousingAgencyFeeDataFromPreRow(index) {
    if (index == 1)
        return;

//    var sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxProjectTeam_' + (index - 2));
//    var sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxProjectTeam_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeProjectTeam(index - 1);

////    sel_SrcObj = document.getElementById('HousingAgencyFeeContractID_' + (index - 2));
////    sel_TarObj = document.getElementById('HousingAgencyFeeContractID_' + (index - 1));
////    sel_TarObj.value = sel_SrcObj.value;
////    setContractId(index - 1);

////    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxHouseContract_' + (index - 2));
////    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxHouseContract_' + (index - 1));
////    sel_TarObj.value = sel_SrcObj.value;
////    setContractName(index - 1);


//    sel_SrcObj = document.getElementById('HousingAgencyFeeCityID_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeCityID_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;

//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxHouseCity_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxHouseCity_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeCity2(index - 1);


//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxAddress_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxAddress_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeAddress(index - 1);


//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxContractStart_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxContractStart_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeContractStart(index - 1);


//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxContractEnd_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxContractEnd_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeContractEnd(index - 1);


//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxMonthRent_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxMonthRent_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeMonthRent(index - 1);



//    //20101215 chaidanlei 付款金额和付款租期（起止日）交换位置
//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxHireStart_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxHireStart_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeHireStart(index - 1);

//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxHireEnd_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxHireEnd_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeHireEnd(index - 1);

//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxHouseOwner_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxHouseOwner_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeHouseOwner(index - 1);

//    //付款金额
//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxAllRent_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxAllRent_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeAllRent(index - 1);

//    //是否按租期分摊
//    //    sel_SrcObj = document.getElementById('ShareByRentPeriod_' + (index - 2));
//    //    sel_TarObj = document.getElementById('ShareByRentPeriod_' + (index - 1));
//    //    sel_TarObj.value = sel_SrcObj.value;
//    //    setHousingAgencyFeeIsShareByRentPeriod(index - 1);

//    //20120515 wanghk 房东
//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxHouseOwner_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxHouseOwner_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeHouseOwner(index - 1);

//    //20120515 wanghk 最大入住人数
//    sel_SrcObj = document.getElementById('HousingAgencyFeeTextBoxLargestNumberIn_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeTextBoxLargestNumberIn_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeLargestNumberIn(index - 1);

//    //20120515 wanghk 缴费性质
//    sel_SrcObj = document.getElementById('HousingAgencyFeePayNature_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeePayNature_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeePayNature(index - 1);

//    //租赁性质
//    sel_SrcObj = document.getElementById('HousingAgencyFeeLeaseNature_' + (index - 2));
//    sel_TarObj = document.getElementById('HousingAgencyFeeLeaseNature_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setHousingAgencyFeeLeaseNature(index - 1);
}
//项目组
function setHousingAgencyFeeProjectTeam(index) {
    var obj = document.getElementById("HousingAgencyFeeTextBoxProjectTeam_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1 || obj.value.indexOf("|") != -1) {
        alert("第" + no + "行的项目地房租支付明细-项目组-中包含非法字符“~”，“|”，请重新输入。");
        obj.value = gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_ProjectTeam;
        return;
    }
    if (obj.value.length > 125) {
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的项目地房租支付明细-项目组-至多只能录入125个字符。");
        gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_ProjectTeam = obj.value;
        return;
    }
    gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_ProjectTeam = obj.value;
}
function setHousingAgencyFeeHireStart(index) {
    var obj = document.getElementById("HousingAgencyFeeTextBoxHireStart_" + index);
    gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_HireStart = obj.value;
}
function checkHousingAgencyFeeHireStart(index) {
    var contractStart = gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_ContractStart;
    if (contractStart == "") {
        alert("请先选择合同号");
        return false;
    }
    var obj = document.getElementById("HousingAgencyFeeTextBoxHireStart_" + index);
    var contractend = gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_ContractEnd;

    var contractBeginDate = getYMD(contractStart);
    var HousingAgencyFeeHireBeginDate = getYMD(obj.value);
    var contractEndDate = getYMD(contractend);
    if (contractBeginDate - HousingAgencyFeeHireBeginDate > 0) {
        alert("此次付款租期开始日期不能小于合同开始日期");
        return false;
    }
    if (HousingAgencyFeeHireBeginDate - contractEndDate > 0) {
        alert("此次付款租期开始日期不能大于合同结束日期");
        return false;
    }
    var objend = document.getElementById("HousingAgencyFeeTextBoxHireEnd_" + index);
    if (objend.value != "") {
        var HousingAgencyFeeHireEndDate = getYMD(objend.value);
        if (HousingAgencyFeeHireBeginDate - HousingAgencyFeeHireEndDate > 0) {
            alert("此次付款租期开始日期不能大于此次付款租期结束日期");
            return false;
        }
    }
}
//房租结束日期
function checkHousingAgencyFeeHireEnd(index) {
    var contractend = gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_ContractEnd;
    if (contractend == "") {
        alert("请先选择合同号");
        return false;
    }
    var obj = document.getElementById("HousingAgencyFeeTextBoxHireEnd_" + index);
    var contractStart = gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_ContractStart;
    var contractEndDate = getYMD(contractend);
    var HousingAgencyFeeHireEndDate = getYMD(obj.value);
    var contractBeginDate = getYMD(contractStart);
    if (HousingAgencyFeeHireEndDate - contractEndDate > 0) {
        alert("此次付款结束日期不能大于合同结束日期");
        return false;
    }

    if (contractBeginDate - HousingAgencyFeeHireEndDate > 0) {
        alert("此次付款结束日期不能小于合同开始日期");
        return false;
    }

    var objstart = document.getElementById("HousingAgencyFeeTextBoxHireStart_" + index);
    if (objstart.value != "") {
        var HousingAgencyFeeHireStartDate = getYMD(objstart.value);
        if (HousingAgencyFeeHireStartDate - HousingAgencyFeeHireEndDate > 0) {
            alert("此次付款结束日期不能小于此次付款开始日期");
            return false;
        }
    }
}
function setHousingAgencyFeeHireEnd(index) {
    var obj = document.getElementById("HousingAgencyFeeTextBoxHireEnd_" + index);
    gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_HireEnd = obj.value;
}
//房租金额
function setHousingAgencyFeeAllRent(index) {
    var obj = document.getElementById("HousingAgencyFeeTextBoxAllRent_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的办公场地费-房屋中介费支付明细-付款金额-格式不合法');
        obj.value = "";
        return;
    }

    if (obj.value <= 0) {
        alert('第' + no + '行的办公场地费-房屋中介费支付明细-付款金额-格式不合法');
        obj.value = "";
        return;
    }
    obj.value = Math.round(obj.value * 100) / 100;
    gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_AllRent = obj.value;

    calHousingAgencyFeeSum();
}
function calHousingAgencyFeeSum() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringHousingAgencyFeeArray.length; i++) {
        var amount = gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_AllRent;

        amount = amount.replace(/\,/g, "");
        sumAmount += parseFloat(amount);
    }
    document.all.LabelSumHousingAgencyFeeAmount.innerText = formatCurrency(sumAmount);
}
function setHousingAgencyFeeTaxNo(index) {
    var obj = document.getElementById("HousingAgencyFeeTextBoxTaxNo_" + index);
    var no = index + 1;
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;
    gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_TaxNo = '';
    if (!obj.value || obj.value == '') {
        alert('第' + no + '行的发票号不能为空');
        return;
    }
    gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_TaxNo = obj.value;
}
function HousingAgencyFeeItemSubmit() {
    var HousingAgencyFeeProjectTeamList = '';
    var HousingAgencyFeeCityList = '';
    var HousingAgencyFeeAddressList = '';
    var HousingAgencyFeeContractStartList = '';
    var HousingAgencyFeeContractEndList = '';
    var HousingAgencyFeeMonthRentList = '';
    var HousingAgencyFeeAllRentList = '';
    var HousingAgencyFeeHireStartList = '';
    var HousingAgencyFeeHireEndList = '';
    var HousingAgencyFeeOrderNoList = '';
    var HousingAgencyFeeTaxNoList = '';
    //20101215 chaidanlei 付款金额和付款租期（起止日）交换位置 增加列：是否按租期分摊
    var HousingAgencyFeeShareByRentPeriod = '';
    //20120515 wanghk 增加房东，最大入住人数，缴费性质
    var HousingAgencyFeeHouseOwner = '';
    var HousingAgencyFeeLargestNumberIn = '';
    var HousingAgencyFeePayNature = '';
    //租赁性质
    var HousingAgencyFeeLeaseNature = '';
    //20130529增加合同编码 合同id
    var HousingAgencyFeeContractId = '';
    var HousingAgencyFeeContractCode = '';
    var HousingAgencyFeeCityText = '';
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;

    for (var i = 0; i < gatheringHousingAgencyFeeArray.length; i++) {
        var index = i + 1;

        //项目组
        if (Trim(gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_ProjectTeam).length <= 0) {
            alert("办公场地费-房屋中介费支付明细第“" + index + "”行的项目组不能为空");
            document.all["HousingAgencyFeeTextBoxProjectTeam_" + i].focus();
            return false;
        }
        if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_ProjectTeam.indexOf("~") != -1 || gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_ProjectTeam.indexOf("|") != -1) {
            alert('办公场地费-房屋中介费支付明细第“' + index + '”行的项目组字符“~”，“|”为非法字符，请重新输入。');
            document.all["HousingAgencyFeeTextBoxProjectTeam_" + i].focus();
            return false;
        }
        //省市
        if (Trim(gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_City).length <= 0) {
            alert("办公场地费-房屋中介费支付明细第“" + index + "”行的省市不能为空");
            document.all["HousingAgencyFeeTextBoxHouseCity_" + i].focus();
            return false;
        }
        if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_City.indexOf("~") != -1 || gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_City.indexOf("|") != -1) {
            alert('办公场地费-房屋中介费支付明细第“' + index + '”行的省市字符“~”，“|”为非法字符，请重新输入。');
            document.all["HousingAgencyFeeTextBoxHouseCity_" + i].focus();
            return false;
        }
        //房屋租住地址
        if (Trim(gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_Address).length <= 0) {
            alert("办公场地费-房屋中介费支付明细第“" + index + "”行的房屋租住地址不能为空");
            document.all["HousingAgencyFeeTextBoxAddress_" + i].focus();
            return false;
        }
        if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_Address.indexOf("~") != -1 || gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_Address.indexOf("|") != -1) {
            alert('办公场地费-房屋中介费支付明细第“' + index + '”行的房屋租住地址字符“~”，“|”为非法字符，请重新输入。');
            document.all["HousingAgencyFeeTextBoxAddress_" + i].focus();
            return false;
        }
        //合同开始日期
        if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_ContractStart == '') {
            alert("办公场地费-房屋中介费支付明细第“" + index + "”行的合同开始日期不能为空");
            document.all["HousingAgencyFeeTextBoxContractStart_" + i].focus();
            return false;
        }
        //合同结束日期
        if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_ContractEnd == '') {
            alert("办公场地费-房屋中介费支付明细第“" + index + "”行的合同结束日期不能为空");
            document.all["HousingAgencyFeeTextBoxContractEnd_" + i].focus();
            return false;
        }
        if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_TaxNo == '' && document.getElementById("hiddenvoucherTypeID").value=="32310D48-1CD6-4044-82DD-BD92BABD74D5") {
            alert("办公场地费-房屋中介费支付明细第“" + index + "”行的发票号不能为空");
            document.all["HousingAgencyFeeTextBoxTaxNo_" + i].focus();
            return false;
        }
        //月租金
        if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_MonthRent == '') {
            alert("办公场地费-房屋中介费支付明细第“" + index + "”行的月租金不能为空");
            document.all["HousingAgencyFeeTextBoxMonthRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_MonthRent)) {
                alert("办公场地费-房屋中介费支付明细第“" + index + "”行的月租金不正确");
                document.all["HousingAgencyFeeTextBoxMonthRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_MonthRent < 0) {
                    alert("办公场地费-房屋中介费支付明细第“" + index + "”行的月租金不能小于等于零");
                    document.all["HousingAgencyFeeTextBoxMonthRent_" + i].focus();
                    return false;
                }
            }
        }
        //房租开始日期
        if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HireStart == '') {
            alert("办公场地费-房屋中介费支付明细第“" + index + "”行此次付款租期开始日不能为空");
            document.all["HousingAgencyFeeTextBoxHireStart_" + i].focus();
            return false;
        }
        else {
            var contractStart = gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_ContractStart;
            var obj = gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HireStart;
            var contractend = gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_ContractEnd;

            var contractBeginDate = getYMD(contractStart);
            var HousingAgencyFeeHireBeginDate = getYMD(obj);
            var contractEndDate = getYMD(contractend);
            if (contractBeginDate - HousingAgencyFeeHireBeginDate > 0) {
                alert("办公场地费-房屋中介费支付明细第“" + index + "”行此次付款租期开始日期不能小于合同开始日期");
                return false;
            }
            if (HousingAgencyFeeHireBeginDate - contractEndDate > 0) {
                alert("办公场地费-房屋中介费支付明细第“" + index + "”行此次付款租期开始日期不能大于合同结束日期");
                return false;
            }


            var objend = gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HireEnd;
            if (objend != "") {
                var HousingAgencyFeeHireEndDate = getYMD(objend);
                if (HousingAgencyFeeHireBeginDate - HousingAgencyFeeHireEndDate > 0) {
                    alert("办公场地费-房屋中介费支付明细第“" + index + "”行此次付款租期开始日期不能大于此次付款租期结束日期");
                    return false;
                }
            }
        }

        //房租结束日期
        if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HireEnd == '') {
            alert("办公场地费-房屋中介费支付明细第“" + index + "”行的此次付款租期结束日不能为空");
            document.all["HousingAgencyFeeTextBoxHireEnd_" + i].focus();
            return false;
        }
        else {
            var contractend = gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_ContractEnd;
            var obj = gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HireEnd;
            var contractStart = gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_ContractStart;

            var contractEndDate = getYMD(contractend);
            var HousingAgencyFeeHireEndDate = getYMD(obj);
            var contractBeginDate = getYMD(contractStart);
            if (HousingAgencyFeeHireEndDate - contractEndDate > 0) {
                alert("办公场地费-房屋中介费支付明细第“" + index + "”行此次付款结束日期不能大于合同结束日期");
                return false;
            }
            if (contractBeginDate - HousingAgencyFeeHireEndDate > 0) {
                alert("办公场地费-房屋中介费支付明细第“" + index + "”行此次付款结束日期不能小于合同开始日期");
                return false;
            }
            var objstart = gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_ContractStart;
            if (objstart != "") {
                var HousingAgencyFeeHireStartDate = getYMD(objstart);
                if (HousingAgencyFeeHireStartDate - HousingAgencyFeeHireEndDate > 0) {
                    alert("办公场地费-房屋中介费支付明细第“" + index + "”行此次付款结束日期不能小于此次付款开始日期");
                    return false;
                }
            }
        }


        //房租金额
        if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_AllRent == '') {
            alert("办公场地费-房屋中介费支付明细第“" + index + "”行的付款金额不能为空");
            document.all["HousingAgencyFeeTextBoxAllRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_AllRent)) {
                alert("办公场地费-房屋中介费支付明细第“" + index + "”行的付款金额不正确");
                document.all["HousingAgencyFeeTextBoxAllRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_AllRent <= 0) {
                    alert("办公场地费-房屋中介费支付明细第“" + index + "”行的付款金额不能小于等于零");
                    document.all["HousingAgencyFeeTextBoxAllRent_" + i].focus();
                    return false;
                }
            }
        }
        //20101215 chaidanlei 增加列：是否按租期分摊 gt_HousingAgencyFee_IsShareByRentPeriod
        //if ((gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_IsShareByRentPeriod).length <= 0) {
        // alert("办公场地费-房屋中介费支付明细第“" + index + "”行的是否按租期分摊不能为空，请选择");
        //document.all["ShareByRentPeriod_" + i].focus();
        //return false;
        // }
        // if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_IsShareByRentPeriod.indexOf("~") != -1 || gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_IsShareByRentPeriod.indexOf("|") != -1) {
        //alert('办公场地费-房屋中介费支付明细第“' + index + '”行的是否按租期分摊字符“~”，“|”为非法字符，请重新输入。');
        //document.all["ShareByRentPeriod_" + i].focus();
        //return false;
        // }

        //20120515 wanghk 增加列：房东 gt_HousingAgencyFee_HouseOwner
        if ((gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HouseOwner).length <= 0) {
            alert("办公场地费-房屋中介费支付明细第“" + index + "”行的房东不能为空，请重新输入。");
            document.all["HousingAgencyFeeTextBoxHouseOwner_" + i].focus();
            return false;
        }
        if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HouseOwner.indexOf("~") != -1 || gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HouseOwner.indexOf("|") != -1) {
            alert('办公场地费-房屋中介费支付明细第“' + index + '”行的房东字符“~”，“|”为非法字符，请重新输入。');
            document.all["HousingAgencyFeeTextBoxHouseOwner_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：最大入住人数 gt_HousingAgencyFee_LargestNumberIn
        if ((gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_LargestNumberIn).length <= 0) {
            alert("办公场地费-房屋中介费支付明细第“" + index + "”行的最大入住人数不能为空，请重新输入。");
            document.all["HousingAgencyFeeTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if (gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_LargestNumberIn.indexOf("~") != -1 || gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_LargestNumberIn.indexOf("|") != -1) {
            alert('办公场地费-房屋中介费支付明细第“' + index + '”行的最大入住人数字符“~”，“|”为非法字符，请重新输入。');
            document.all["HousingAgencyFeeTextBoxLargestNumberIn_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：缴费性质 gt_HousingAgencyFee_PayNature
        if ((gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_PayNature).length <= 0) {
            alert("办公场地费-房屋中介费支付明细第“" + index + "”行的缴费性质不能为空，请选择");
            document.all["PayNature_" + i].focus();
            return false;
        }
        //20130529 mfj  增加列：合同Id 合同Code

        if ((gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HouseContract).length <= 0) {
            alert("办公场地费-房屋中介费支付明细第“" + index + "”行的合同不能为空，请选择");
            document.all["HousingAgencyFeeTextBoxHouseContract_" + i].focus();
            return false;
        }

        if ((gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_LeaseNature).length <= 0) {
            alert("办公场地费-房屋中介费支付明细第“" + index + "”行的租赁性质不能为空，请选择");
            document.all["LeaseNature_" + i].focus();
            return false;
        }

        HousingAgencyFeeProjectTeamList += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_ProjectTeam;
        HousingAgencyFeeCityList += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HouseCityID;
        HousingAgencyFeeAddressList += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_Address;
        HousingAgencyFeeContractStartList += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_ContractStart;
        HousingAgencyFeeContractEndList += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_ContractEnd;
        HousingAgencyFeeMonthRentList += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_MonthRent;
        HousingAgencyFeeAllRentList += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_AllRent;
        HousingAgencyFeeHireStartList += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HireStart;
        HousingAgencyFeeHireEndList += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HireEnd;
        HousingAgencyFeeOrderNoList += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_OrderNo;
        //20101215 chaidanlei 增加列：是否按租期分摊
        //HousingAgencyFeeShareByRentPeriod += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_IsShareByRentPeriod;
        //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
        HousingAgencyFeeHouseOwner += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HouseOwner;
        HousingAgencyFeeLargestNumberIn += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_LargestNumberIn;
        HousingAgencyFeePayNature += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_PayNature;

        //20130529 mfj  增加列：合同Id 合同Code
        HousingAgencyFeeContractId += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HouseContractID;
        HousingAgencyFeeContractCode += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_HouseContract;
        HousingAgencyFeeCityText += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_City;
        HousingAgencyFeeTaxNoList += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_TaxNo;
        //租赁性质
        HousingAgencyFeeLeaseNature += '~' + gatheringHousingAgencyFeeArray[i].gt_HousingAgencyFee_LeaseNature;
    }
    HousingAgencyFeeProjectTeamList = HousingAgencyFeeProjectTeamList.substr(1);
    HousingAgencyFeeCityList = HousingAgencyFeeCityList.substr(1);
    HousingAgencyFeeAddressList = HousingAgencyFeeAddressList.substr(1);
    HousingAgencyFeeContractStartList = HousingAgencyFeeContractStartList.substr(1);
    HousingAgencyFeeContractEndList = HousingAgencyFeeContractEndList.substr(1);
    HousingAgencyFeeMonthRentList = HousingAgencyFeeMonthRentList.substr(1);
    HousingAgencyFeeAllRentList = HousingAgencyFeeAllRentList.substr(1);
    HousingAgencyFeeHireStartList = HousingAgencyFeeHireStartList.substr(1);
    HousingAgencyFeeHireEndList = HousingAgencyFeeHireEndList.substr(1);
    HousingAgencyFeeOrderNoList = HousingAgencyFeeOrderNoList.substr(1);
    //20101215 chaidanlei 增加列：是否按租期分摊
    //HousingAgencyFeeShareByRentPeriod = HousingAgencyFeeShareByRentPeriod.substr(1);
    //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
    HousingAgencyFeeHouseOwner = HousingAgencyFeeHouseOwner.substr(1);
    HousingAgencyFeeLargestNumberIn = HousingAgencyFeeLargestNumberIn.substr(1);
    HousingAgencyFeePayNature = HousingAgencyFeePayNature.substr(1);
    //20130529 mfj  增加列：合同Id 合同Code
    HousingAgencyFeeContractId = HousingAgencyFeeContractId.substr(1);
    HousingAgencyFeeContractCode = HousingAgencyFeeContractCode.substr(1);
    HousingAgencyFeeCityText = HousingAgencyFeeCityText.substr(1);
    HousingAgencyFeeTaxNoList = HousingAgencyFeeTaxNoList.substr(1);
    //租赁性质
    HousingAgencyFeeLeaseNature = HousingAgencyFeeLeaseNature.substr(1);

    document.all.hiddenHousingAgencyFeeInfo.value = HousingAgencyFeeProjectTeamList + "|"
														+ HousingAgencyFeeCityList + "|"
														+ HousingAgencyFeeAddressList + "|"
														+ HousingAgencyFeeContractStartList + "|"
														+ HousingAgencyFeeContractEndList + "|"
                                                        + HousingAgencyFeeHouseOwner + "|"
														+ HousingAgencyFeeMonthRentList + "|"
                                                        + HousingAgencyFeeLargestNumberIn + "|"
														+ HousingAgencyFeeHireStartList + "|"
														+ HousingAgencyFeeHireEndList + "|"
														+ HousingAgencyFeeAllRentList + "|"
                                                        + HousingAgencyFeePayNature + "|"
														+ HousingAgencyFeeOrderNoList + "|"
                                                        + HousingAgencyFeeContractId + "|"
                                                        + HousingAgencyFeeContractCode + "|"
                                                        + HousingAgencyFeeCityText + "|"
                                                        + HousingAgencyFeeTaxNoList + "|"
                                                        + HousingAgencyFeeLeaseNature;
}
function setHousingAgencyFeePayNature(index) {
    var obj = document.getElementById("HousingAgencyFeePayNature_" + index);
    gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_PayNature = obj.value;
}
//租赁性质
function setHousingAgencyFeeLeaseNature(index) {
    var obj = document.getElementById("HousingAgencyFeeLeaseNature_" + index);
    if (obj.value == "" || obj.value == undefined || obj.value == null) {
        alert("办公场地费-房屋中介费支付明细第“" + index + 1 + "”行的租赁性质不能为空，请选择");
        return;
    }
    gatheringHousingAgencyFeeArray[index].gt_HousingAgencyFee_LeaseNature = obj.value;
}
//删除选定行
function deleteHousingAgencyFeeRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringHousingAgencyFeeArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringHousingAgencyFeeArray[i];
            tempArray[j].gt_HousingAgencyFee_OrderNo = j + 1;
            j++;
        }
    }

    gatheringHousingAgencyFeeArray = tempArray;
    refreshHousingAgencyFee();
}
function jsHousingAgencyFeeGathering(
jOrderNo, jProjectTeam, ContractId, ContractName,
jCityID, jCity, jAddress, jContractStart,
jContractEnd, jMonthRent, jHireStart, jHireEnd,
 jAllRent, jHouseOwner,
jLargestNumberIn, jPayNature,
 jTaxNo, jLeaseNature) {
    this.gt_HousingAgencyFee_OrderNo = jOrderNo;
    this.gt_HousingAgencyFee_ProjectTeam = jProjectTeam;
    this.gt_HousingAgencyFee_HouseContractID = ContractId;
    this.gt_HousingAgencyFee_HouseContract = ContractName;
    this.gt_HousingAgencyFee_HouseCityID = jCityID;
    this.gt_HousingAgencyFee_City = jCity;
    this.gt_HousingAgencyFee_Address = jAddress;
    this.gt_HousingAgencyFee_ContractStart = jContractStart;
    this.gt_HousingAgencyFee_ContractEnd = jContractEnd;
    this.gt_HousingAgencyFee_MonthRent = jMonthRent;
    this.gt_HousingAgencyFee_HireStart = jHireStart;
    this.gt_HousingAgencyFee_HireEnd = jHireEnd;
    this.gt_HousingAgencyFee_AllRent = jAllRent; //付款金额和付款租期（起止日）交换位置
    //this.gt_HousingAgencyFee_IsShareByRentPeriod = jShareByRentPeriod; //增加列：是否按租期分摊

    //增加列 房东，最大入住人数，缴费性质，租赁性质，明细性质，合同编号
    this.gt_HousingAgencyFee_HouseOwner = jHouseOwner;
    this.gt_HousingAgencyFee_LargestNumberIn = jLargestNumberIn;
    this.gt_HousingAgencyFee_PayNature = jPayNature;
    this.gt_HousingAgencyFee_TaxNo = jTaxNo;
    //租赁性质
    this.gt_HousingAgencyFee_LeaseNature = jLeaseNature;
}
//---------办公房公摊
var gatheringOfficeRentArray = new Array();
function addOfficeRentRow() {

    var index = gatheringOfficeRentArray.length;
    //20130524
    gatheringOfficeRentArray[index] = new jsOfficeRentGathering(index + 1, '', '',
    '', '', '', '',
    '', '', '',
    '', '', '',
    '', '', '',
    '', '', ''
    , '', '');
    refreshOfficeRent();
    copyOfficeRentDataFromPreRow(gatheringOfficeRentArray.length);
}
function refreshOfficeRent() {
    //删除原来的行
    var rowCount = OfficeRentTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        OfficeRentTable.deleteRow(1);
    }
    var MaxCells = OfficeRentTable.rows[0].cells.length;

    for (var i = 0; i < gatheringOfficeRentArray.length; i++) {
        var newRow = OfficeRentTable.insertRow(-1);
        newRow.vAlign = "middle";
        for (var j = 0; j < MaxCells; j++) {
            cell = newRow.insertCell(-1);
            cell.className = "OraTableCellText OraTableBorder0011";
            switch (j) {
                case 0:
                    cell.innerHTML = gatheringOfficeRentArray[i].gt_OfficeRent_OrderNo;
                    cell.align = "center";
                    break;
                case 1: //项目组
                    cell.noWrap = true;
                    cell.innerHTML = "<TEXTAREA  rows='2' MaxLength=100 onblur='javascript:setOfficeRentProjectTeam(" + i + ");'  id='OfficeRentTextBoxProjectTeam_" + i + "' style=\"width:99%\" ></TEXTAREA>";
                    var obj = "OfficeRentTextBoxProjectTeam_" + i;
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringOfficeRentArray[i].gt_OfficeRent_ProjectTeam;
                    }
                    break;

                case 2: //选择合同号
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='OfficeRentContractID_" + i + "' value='" + gatheringOfficeRentArray[i].gt_OfficeRent_HouseContractID + "' style=\"height:40px\"><input type='text' id='OfficeRentTextBoxHouseContract_" + i + "' value='" + gatheringOfficeRentArray[i].gt_OfficeRent_HouseContract + "' style=\"width:80%;\" readonly  >";

                    var objHiddenContractID = "OfficeRentContractID_" + i;
                    var objContractID = "OfficeRentTextBoxHouseContract_" + i;
                    var objCityText = "OfficeRentTextBoxHouseCity_" + i;
                    var objCityID = "OfficeRentCityID_" + i;
                    var objAddress = "OfficeRentTextBoxAddress_" + i;
                    var objStartDate = "OfficeRentTextBoxContractStart_" + i;
                    var objEndDate = "OfficeRentTextBoxContractEnd_" + i;
                    var objOwner = "OfficeRentTextBoxHouseOwner_" + i;
                    var objMonthlyRent = "OfficeRentTextBoxMonthRent_" + i;
                    var objMaxNumber = "OfficeRentTextBoxLargestNumberIn_" + i;
                    var objHouseType = "OfficeRentPayNature_" + i;
                    var objLeaseNature = "OfficeRentLeaseNature_" + i;

                    var obj = "OfficeRentTextBoxHouseContract_" + i;
                    cell.innerHTML += "<IMG id='imgQuery_" + i + "' onclick=\"QueryContractInfo('" + objHiddenContractID + "','" + objContractID + "','" + objCityID + "','" + objCityText + "','" + objAddress + "','" + objStartDate + "','" + objEndDate + "','" + objOwner + "','" + objMonthlyRent + "','" + objMaxNumber + "','" + i + "','46','" + objHouseType + "','" + objLeaseNature + "')\" style='CURSOR: hand;' src='../../images/searchicon_enabled.gif' align='absBottom'>";
                    if (document.getElementById(obj)) {
                        document.getElementById(obj).value = gatheringOfficeRentArray[i].gt_OfficeRent_HouseContract;
                    }
                    break;
                case 3: //城市
                    cell.innerHTML = "<input maxlength='100' type='hidden' id='OfficeRentCityID_" + i + "' value='" + gatheringOfficeRentArray[i].gt_OfficeRent_HouseCityID + "' style=\"height:40px\"><input type='text' id='OfficeRentTextBoxHouseCity_" + i + "' value='" + gatheringOfficeRentArray[i].gt_OfficeRent_City + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;
                case 4: //房屋租住地址
                    cell.innerHTML = "<input type='text' id='OfficeRentTextBoxAddress_" + i + "' value='" + gatheringOfficeRentArray[i].gt_OfficeRent_Address + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 5: //合同开始日期
                    cell.innerHTML = "<input type='text' id='OfficeRentTextBoxContractStart_" + i + "' value='" + gatheringOfficeRentArray[i].gt_OfficeRent_ContractStart + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 6: //合同结束日期
                    cell.innerHTML = "<input type='text' id='OfficeRentTextBoxContractEnd_" + i + "' value='" + gatheringOfficeRentArray[i].gt_OfficeRent_ContractEnd + "' style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 7: //房东
                    cell.innerHTML = "<input type='text' id='OfficeRentTextBoxHouseOwner_" + i + "' value='" + gatheringOfficeRentArray[i].gt_OfficeRent_HouseOwner + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6' >";
                    break;

                case 8: //月租金
                    cell.innerHTML = "<input maxlength='10'   type='text'  id='OfficeRentTextBoxMonthRent_" + i + "'  value='" + gatheringOfficeRentArray[i].gt_OfficeRent_MonthRent + "'   style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 9: //最大入住人数
                    cell.innerHTML = "<input maxlength='10' type='text' id='OfficeRentTextBoxLargestNumberIn_" + i + "' value='" + gatheringOfficeRentArray[i].gt_OfficeRent_LargestNumberIn + "'  style=\"width:100%;BACKGROUND-COLOR: #e6e6e6\" readonly bgcolor='#e6e6e6'>";
                    break;

                case 10: //租期开始日期
                    var dateID = "OfficeRentTextBoxHireStart_" + i;
                    cell.noWrap = true;
                    cell.innerHTML = "<input class='Wdate' autocomplete='off' style='width:90' id='" + dateID + "' value='" + gatheringOfficeRentArray[i].gt_OfficeRent_HireStart + "' " +
                        " onchange=\"javascript:checkOfficeRentHireStart(" + i + ");setOfficeRentHireStart(" + i + ");\" onfocus=\"javascript:setOfficeRentHireStart(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">"
                        ;
                    break;
                case 11: //租期结束日期
                    var dateID = "OfficeRentTextBoxHireEnd_" + i;
                    cell.noWrap = true;
                    cell.innerHTML = "<input   autocomplete='off' class='Wdate' style='width:90' id='" + dateID + "' value='" + gatheringOfficeRentArray[i].gt_OfficeRent_HireEnd + "' " +
                        " onchange=\"javascript:checkOfficeRentHireEnd(" + i + ");setOfficeRentHireEnd(" + i + ");\" onfocus=\"javascript:setOfficeRentHireEnd(" + i + ");\" onclick=\"WdatePicker({firstDayOfWeek:1,lang:'" + 'zh-cn' + "'})\">"
                       ;
                    break;
                case 12: //付款金额
                    cell.innerHTML = "<input maxlength='10' onblur='javascript:setOfficeRentAllRent(" + i + ");' type='text' id='OfficeRentTextBoxAllRent_" + i + "' value='" + gatheringOfficeRentArray[i].gt_OfficeRent_AllRent + "' style=\"width:100%;\" onKeypress='javascript:OnlyNumber();calOfficeRentSum();'>";
                    break;
                case 13: //发票号
                    cell.innerHTML = "<input maxlength='15' onchange='javascript:setOfficeRentTaxNo(" + i + ");' type='text' id='OfficeRentTextBoxTaxNo_" + i + "' value='" + gatheringOfficeRentArray[i].gt_OfficeRent_TaxNo + "' style=\"width:100%\">";
                    break;
                case 14: //缴费性质                   
                    var payNatureVal = document.getElementById('hiddenPayNatureVal').value;
                    var selectIsShare = "<select disabled='disabled' name='OfficeRentPayNature_" + i + "' id='OfficeRentPayNature_" + i + "' onblur='javascript:setOfficeRentPayNature(" + i + ");' onchange='javascript:setOfficeRentPayNature(" + i + ");' style=\"width:98%;\"><option value=''>请选择</option>";
                    if (gatheringOfficeRentArray[i].gt_OfficeRent_PayNature != "") {
                        if (payNatureVal != "" && payNatureVal.split("~").length > 0) {
                            for (var n = 0; n < payNatureVal.split("~").length; n = n + 2) {
                                if (gatheringOfficeRentArray[i].gt_OfficeRent_PayNature == payNatureVal.split("~")[n])
                                    selectIsShare += "<option value='" + payNatureVal.split("~")[n] + "' selected>" + payNatureVal.split("~")[n + 1] + "</option>";
                                else
                                    selectIsShare += "<option value='" + payNatureVal.split("~")[n] + "'>" + payNatureVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    else {
                        if (payNatureVal != "" && payNatureVal.split("~").length > 0) {
                            for (var n = 0; n < payNatureVal.split("~").length; n = n + 2) {
                                selectIsShare += "<option value='" + payNatureVal.split("~")[n] + "'>" + payNatureVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    selectIsShare += "</select>";
                    cell.innerHTML = selectIsShare;
                    break;
                case 15: //租赁性质
                    //var leaseNatureVal = document.getElementById('hiddenOfficeRentLeaseNatureVal').value;

                    var leaseNatureVal = "1~经营租赁~2~租赁资产";
                    var selectIsShare = "<select disabled='disabled' name='OfficeRentLeaseNature_" + i + "' id='OfficeRentLeaseNature_" + i + "' onblur='javascript:setOfficeRentLeaseNature(" + i + ");' onchange='javascript:setOfficeRentLeaseNature(" + i + ");' style=\"width:98%;\"><option value=''>请选择</option>";
                    if (gatheringOfficeRentArray[i].gt_OfficeRent_LeaseNature != "") {
                        if (leaseNatureVal != "" && leaseNatureVal.split("~").length > 0) {
                            for (var n = 0; n < leaseNatureVal.split("~").length; n = n + 2) {
                                if (gatheringOfficeRentArray[i].gt_OfficeRent_LeaseNature == leaseNatureVal.split("~")[n])
                                    selectIsShare += "<option value='" + leaseNatureVal.split("~")[n] + "' selected>" + leaseNatureVal.split("~")[n + 1] + "</option>";
                                else
                                    selectIsShare += "<option value='" + leaseNatureVal.split("~")[n] + "'>" + leaseNatureVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    else {
                        if (leaseNatureVal != "" && leaseNatureVal.split("~").length > 0) {
                            for (var n = 0; n < leaseNatureVal.split("~").length; n = n + 2) {
                                selectIsShare += "<option value='" + leaseNatureVal.split("~")[n] + "'>" + leaseNatureVal.split("~")[n + 1] + "</option>";
                            }
                        }
                    }
                    selectIsShare += "</select>";
                    cell.innerHTML = selectIsShare;
                    break;
                case 16: //删除
                    var strDeleteImg = '';
                    strDeleteImg = "<a href='#' onclick=\"javascript:deleteOfficeRentRow(" + i + ")\"><img src=\"../../Images/deleteicon_enabled.gif\" border=0></a>";
                    cell.innerHTML = strDeleteImg;
                    break;
            }

        }
    }
    calOfficeRentSum();
}

function copyOfficeRentDataFromPreRow(index) {
    if (index == 1)
        return;

//    var sel_SrcObj = document.getElementById('OfficeRentTextBoxProjectTeam_' + (index - 2));
//    var sel_TarObj = document.getElementById('OfficeRentTextBoxProjectTeam_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setOfficeRentProjectTeam(index - 1);

//    sel_SrcObj = document.getElementById('OfficeRentHouseContractID_' + (index - 2));
//    sel_TarObj = document.getElementById('OfficeRentHouseContractID_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setContractId(index - 1);

//    sel_SrcObj = document.getElementById('OfficeRentTextBoxHouseContract_' + (index - 2));
//    sel_TarObj = document.getElementById('OfficeRentTextBoxHouseContract_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setContractName(index - 1);


//    sel_SrcObj = document.getElementById('OfficeRentHouseCityID_' + (index - 2));
//    sel_TarObj = document.getElementById('OfficeRentHouseCityID_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;

//    sel_SrcObj = document.getElementById('OfficeRentTextBoxHouseCity_' + (index - 2));
//    sel_TarObj = document.getElementById('OfficeRentTextBoxHouseCity_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setOfficeRentCity2(index - 1);


//    sel_SrcObj = document.getElementById('OfficeRentTextBoxAddress_' + (index - 2));
//    sel_TarObj = document.getElementById('OfficeRentTextBoxAddress_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setOfficeRentAddress(index - 1);


//    sel_SrcObj = document.getElementById('OfficeRentTextBoxContractStart_' + (index - 2));
//    sel_TarObj = document.getElementById('OfficeRentTextBoxContractStart_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setOfficeRentContractStart(index - 1);


//    sel_SrcObj = document.getElementById('OfficeRentTextBoxContractEnd_' + (index - 2));
//    sel_TarObj = document.getElementById('OfficeRentTextBoxContractEnd_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setOfficeRentContractEnd(index - 1);


//    sel_SrcObj = document.getElementById('OfficeRentTextBoxMonthRent_' + (index - 2));
//    sel_TarObj = document.getElementById('OfficeRentTextBoxMonthRent_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setOfficeRentMonthRent(index - 1);



//    //20101215 chaidanlei 付款金额和付款租期（起止日）交换位置
//    sel_SrcObj = document.getElementById('OfficeRentTextBoxHireStart_' + (index - 2));
//    sel_TarObj = document.getElementById('OfficeRentTextBoxHireStart_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setOfficeRentHireStart(index - 1);

//    sel_SrcObj = document.getElementById('OfficeRentTextBoxHireEnd_' + (index - 2));
//    sel_TarObj = document.getElementById('OfficeRentTextBoxHireEnd_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setOfficeRentHireEnd(index - 1);

//    sel_SrcObj = document.getElementById('OfficeRentTextBoxHouseOwner_' + (index - 2));
//    sel_TarObj = document.getElementById('OfficeRentTextBoxHouseOwner_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setOfficeRentHouseOwner(index - 1);

//    //付款金额
//    sel_SrcObj = document.getElementById('OfficeRentTextBoxAllRent_' + (index - 2));
//    sel_TarObj = document.getElementById('OfficeRentTextBoxAllRent_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setOfficeRentAllRent(index - 1);

//    //是否按租期分摊
//    //    sel_SrcObj = document.getElementById('ShareByRentPeriod_' + (index - 2));
//    //    sel_TarObj = document.getElementById('ShareByRentPeriod_' + (index - 1));
//    //    sel_TarObj.value = sel_SrcObj.value;
//    //    setOfficeRentIsShareByRentPeriod(index - 1);

//    //20120515 wanghk 房东
//    sel_SrcObj = document.getElementById('OfficeRentTextBoxHouseOwner_' + (index - 2));
//    sel_TarObj = document.getElementById('OfficeRentTextBoxHouseOwner_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setOfficeRentHouseOwner(index - 1);

//    //20120515 wanghk 最大入住人数
//    sel_SrcObj = document.getElementById('OfficeRentTextBoxLargestNumberIn_' + (index - 2));
//    sel_TarObj = document.getElementById('OfficeRentTextBoxLargestNumberIn_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setOfficeRentLargestNumberIn(index - 1);

//    //20120515 wanghk 缴费性质
//    sel_SrcObj = document.getElementById('OfficeRentPayNature_' + (index - 2));
//    sel_TarObj = document.getElementById('OfficeRentPayNature_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setOfficeRentPayNature(index - 1);

//    //租赁性质
//    sel_SrcObj = document.getElementById('OfficeRentLeaseNature_' + (index - 2));
//    sel_TarObj = document.getElementById('OfficeRentLeaseNature_' + (index - 1));
//    sel_TarObj.value = sel_SrcObj.value;
//    setOfficeRentLeaseNature(index - 1);
}
//项目组
function setOfficeRentProjectTeam(index) {
    var obj = document.getElementById("OfficeRentTextBoxProjectTeam_" + index);
    var no = index + 1;

    if (obj.value.indexOf("~") != -1 || obj.value.indexOf("|") != -1) {
        alert("第" + no + "行的项目地房租支付明细-项目组-中包含非法字符“~”，“|”，请重新输入。");
        obj.value = gatheringOfficeRentArray[index].gt_OfficeRent_ProjectTeam;
        return;
    }
    if (obj.value.length > 125) {
        obj.value = obj.value.substring(0, 125);
        alert("第" + no + "行的项目地房租支付明细-项目组-至多只能录入125个字符。");
        gatheringOfficeRentArray[index].gt_OfficeRent_ProjectTeam = obj.value;
        return;
    }
    gatheringOfficeRentArray[index].gt_OfficeRent_ProjectTeam = obj.value;
}
function setOfficeRentHireStart(index) {
    var obj = document.getElementById("OfficeRentTextBoxHireStart_" + index);
    gatheringOfficeRentArray[index].gt_OfficeRent_HireStart = obj.value;
}
function checkOfficeRentHireStart(index) {
    var contractStart = gatheringOfficeRentArray[index].gt_OfficeRent_ContractStart;
    if (contractStart == "") {
        alert("请先选择合同号");
        return false;
    }
    var obj = document.getElementById("OfficeRentTextBoxHireStart_" + index);
    var contractend = gatheringOfficeRentArray[index].gt_OfficeRent_ContractEnd;

    var contractBeginDate = getYMD(contractStart);
    var OfficeRentHireBeginDate = getYMD(obj.value);
    var contractEndDate = getYMD(contractend);
    if (contractBeginDate - OfficeRentHireBeginDate > 0) {
        alert("此次付款租期开始日期不能小于合同开始日期");
        return false;
    }
    if (OfficeRentHireBeginDate - contractEndDate > 0) {
        alert("此次付款租期开始日期不能大于合同结束日期");
        return false;
    }
    var objend = document.getElementById("OfficeRentTextBoxHireEnd_" + index);
    if (objend.value != "") {
        var OfficeRentHireEndDate = getYMD(objend.value);
        if (OfficeRentHireBeginDate - OfficeRentHireEndDate > 0) {
            alert("此次付款租期开始日期不能大于此次付款租期结束日期");
            return false;
        }
    }
}
//房租结束日期
function checkOfficeRentHireEnd(index) {
    var contractend = gatheringOfficeRentArray[index].gt_OfficeRent_ContractEnd;
    if (contractend == "") {
        alert("请先选择合同号");
        return false;
    }
    var obj = document.getElementById("OfficeRentTextBoxHireEnd_" + index);
    var contractStart = gatheringOfficeRentArray[index].gt_OfficeRent_ContractStart;
    var contractEndDate = getYMD(contractend);
    var OfficeRentHireEndDate = getYMD(obj.value);
    var contractBeginDate = getYMD(contractStart);
    if (OfficeRentHireEndDate - contractEndDate > 0) {
        alert("此次付款结束日期不能大于合同结束日期");
        return false;
    }

    if (contractBeginDate - OfficeRentHireEndDate > 0) {
        alert("此次付款结束日期不能小于合同开始日期");
        return false;
    }

    var objstart = document.getElementById("OfficeRentTextBoxHireStart_" + index);
    if (objstart.value != "") {
        var OfficeRentHireStartDate = getYMD(objstart.value);
        if (OfficeRentHireStartDate - OfficeRentHireEndDate > 0) {
            alert("此次付款结束日期不能小于此次付款开始日期");
            return false;
        }
    }
}
function setOfficeRentHireEnd(index) {
    var obj = document.getElementById("OfficeRentTextBoxHireEnd_" + index);
    gatheringOfficeRentArray[index].gt_OfficeRent_HireEnd = obj.value;
}
//房租金额
function setOfficeRentAllRent(index) {
    var obj = document.getElementById("OfficeRentTextBoxAllRent_" + index);
    var no = index + 1;

    //检查输入的是否是数字
    if (obj.value == "") {
        return;
    }
    if (!isMoneyValue(obj.value)) {
        alert('第' + no + '行的办公场地公摊-办公用房租支付明细-付款金额-格式不合法');
        obj.value = "";
        return;
    }

    if (obj.value <= 0) {
        alert('第' + no + '行的办公场地公摊-办公用房租支付明细-付款金额-格式不合法');
        obj.value = "";
        return;
    }
    obj.value = Math.round(obj.value * 100) / 100;
    gatheringOfficeRentArray[index].gt_OfficeRent_AllRent = obj.value;

    calOfficeRentSum();
}
function calOfficeRentSum() {
    var sumAmount = parseFloat('0');
    for (var i = 0; i < gatheringOfficeRentArray.length; i++) {
        var amount = gatheringOfficeRentArray[i].gt_OfficeRent_AllRent;

        amount = amount.replace(/\,/g, "");
        sumAmount += parseFloat(amount);
    }
    document.all.LabelSumOfficeRentAmount.innerText = formatCurrency(sumAmount);
}
function setOfficeRentTaxNo(index) {
    var obj = document.getElementById("OfficeRentTextBoxTaxNo_" + index);
    var no = index + 1;
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;
    gatheringOfficeRentArray[index].gt_OfficeRent_TaxNo = '';
    if (!obj.value || obj.value == '') {
        alert('第' + no + '行的发票号不能为空');
        return;
    }
    gatheringOfficeRentArray[index].gt_OfficeRent_TaxNo = obj.value;
}
function OfficeRentItemSubmit() {
    var OfficeRentProjectTeamList = '';
    var OfficeRentCityList = '';
    var OfficeRentAddressList = '';
    var OfficeRentContractStartList = '';
    var OfficeRentContractEndList = '';
    var OfficeRentMonthRentList = '';
    var OfficeRentAllRentList = '';
    var OfficeRentHireStartList = '';
    var OfficeRentHireEndList = '';
    var OfficeRentOrderNoList = '';
    var OfficeRentTaxNoList = '';
    //20101215 chaidanlei 付款金额和付款租期（起止日）交换位置 增加列：是否按租期分摊
    var OfficeRentShareByRentPeriod = '';
    //20120515 wanghk 增加房东，最大入住人数，缴费性质
    var OfficeRentHouseOwner = '';
    var OfficeRentLargestNumberIn = '';
    var OfficeRentPayNature = '';
    //租赁性质
    var OfficeRentLeaseNature = '';
    //20130529增加合同编码 合同id
    var OfficeRentContractId = '';
    var OfficeRentContractCode = '';
    var OfficeRentCityText = '';
    var taxNumbReq = document.getElementById("hiddenIsTaxExp").value;

    for (var i = 0; i < gatheringOfficeRentArray.length; i++) {
        var index = i + 1;

        //项目组
        if (Trim(gatheringOfficeRentArray[i].gt_OfficeRent_ProjectTeam).length <= 0) {
            alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的项目组不能为空");
            document.all["OfficeRentTextBoxProjectTeam_" + i].focus();
            return false;
        }
        if (gatheringOfficeRentArray[i].gt_OfficeRent_ProjectTeam.indexOf("~") != -1 || gatheringOfficeRentArray[i].gt_OfficeRent_ProjectTeam.indexOf("|") != -1) {
            alert('办公场地公摊-办公用房租支付明细第“' + index + '”行的项目组字符“~”，“|”为非法字符，请重新输入。');
            document.all["OfficeRentTextBoxProjectTeam_" + i].focus();
            return false;
        }
        //省市
        if (Trim(gatheringOfficeRentArray[i].gt_OfficeRent_City).length <= 0) {
            alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的省市不能为空");
            document.all["OfficeRentTextBoxHouseCity_" + i].focus();
            return false;
        }
        if (gatheringOfficeRentArray[i].gt_OfficeRent_City.indexOf("~") != -1 || gatheringOfficeRentArray[i].gt_OfficeRent_City.indexOf("|") != -1) {
            alert('办公场地公摊-办公用房租支付明细第“' + index + '”行的省市字符“~”，“|”为非法字符，请重新输入。');
            document.all["OfficeRentTextBoxHouseCity_" + i].focus();
            return false;
        }
        //房屋租住地址
        if (Trim(gatheringOfficeRentArray[i].gt_OfficeRent_Address).length <= 0) {
            alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的房屋租住地址不能为空");
            document.all["OfficeRentTextBoxAddress_" + i].focus();
            return false;
        }
        if (gatheringOfficeRentArray[i].gt_OfficeRent_Address.indexOf("~") != -1 || gatheringOfficeRentArray[i].gt_OfficeRent_Address.indexOf("|") != -1) {
            alert('办公场地公摊-办公用房租支付明细第“' + index + '”行的房屋租住地址字符“~”，“|”为非法字符，请重新输入。');
            document.all["OfficeRentTextBoxAddress_" + i].focus();
            return false;
        }
        //合同开始日期
        if (gatheringOfficeRentArray[i].gt_OfficeRent_ContractStart == '') {
            alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的合同开始日期不能为空");
            document.all["OfficeRentTextBoxContractStart_" + i].focus();
            return false;
        }
        //合同结束日期
        if (gatheringOfficeRentArray[i].gt_OfficeRent_ContractEnd == '') {
            alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的合同结束日期不能为空");
            document.all["OfficeRentTextBoxContractEnd_" + i].focus();
            return false;
        }
        if (gatheringOfficeRentArray[i].gt_OfficeRent_TaxNo == '' && document.getElementById("hiddenvoucherTypeID").value == "32310D48-1CD6-4044-82DD-BD92BABD74D5") {
            alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的发票号不能为空");
            document.all["OfficeRentTextBoxTaxNo_" + i].focus();
            return false;
        }
        //月租金
        if (gatheringOfficeRentArray[i].gt_OfficeRent_MonthRent == '') {
            alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的月租金不能为空");
            document.all["OfficeRentTextBoxMonthRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringOfficeRentArray[i].gt_OfficeRent_MonthRent)) {
                alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的月租金不正确");
                document.all["OfficeRentTextBoxMonthRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringOfficeRentArray[i].gt_OfficeRent_MonthRent < 0) {
                    alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的月租金不能小于等于零");
                    document.all["OfficeRentTextBoxMonthRent_" + i].focus();
                    return false;
                }
            }
        }
        //房租开始日期
        if (gatheringOfficeRentArray[i].gt_OfficeRent_HireStart == '') {
            alert("办公场地公摊-办公用房租支付明细第“" + index + "”行此次付款租期开始日不能为空");
            document.all["OfficeRentTextBoxHireStart_" + i].focus();
            return false;
        }
        else {
            var contractStart = gatheringOfficeRentArray[i].gt_OfficeRent_ContractStart;
            var obj = gatheringOfficeRentArray[i].gt_OfficeRent_HireStart;
            var contractend = gatheringOfficeRentArray[i].gt_OfficeRent_ContractEnd;

            var contractBeginDate = getYMD(contractStart);
            var OfficeRentHireBeginDate = getYMD(obj);
            var contractEndDate = getYMD(contractend);
            if (contractBeginDate - OfficeRentHireBeginDate > 0) {
                alert("办公场地公摊-办公用房租支付明细第“" + index + "”行此次付款租期开始日期不能小于合同开始日期");
                return false;
            }
            if (OfficeRentHireBeginDate - contractEndDate > 0) {
                alert("办公场地公摊-办公用房租支付明细第“" + index + "”行此次付款租期开始日期不能大于合同结束日期");
                return false;
            }


            var objend = gatheringOfficeRentArray[i].gt_OfficeRent_HireEnd;
            if (objend != "") {
                var OfficeRentHireEndDate = getYMD(objend);
                if (OfficeRentHireBeginDate - OfficeRentHireEndDate > 0) {
                    alert("办公场地公摊-办公用房租支付明细第“" + index + "”行此次付款租期开始日期不能大于此次付款租期结束日期");
                    return false;
                }
            }
        }

        //房租结束日期
        if (gatheringOfficeRentArray[i].gt_OfficeRent_HireEnd == '') {
            alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的此次付款租期结束日不能为空");
            document.all["OfficeRentTextBoxHireEnd_" + i].focus();
            return false;
        }
        else {
            var contractend = gatheringOfficeRentArray[i].gt_OfficeRent_ContractEnd;
            var obj = gatheringOfficeRentArray[i].gt_OfficeRent_HireEnd;
            var contractStart = gatheringOfficeRentArray[i].gt_OfficeRent_ContractStart;

            var contractEndDate = getYMD(contractend);
            var OfficeRentHireEndDate = getYMD(obj);
            var contractBeginDate = getYMD(contractStart);
            if (OfficeRentHireEndDate - contractEndDate > 0) {
                alert("办公场地公摊-办公用房租支付明细第“" + index + "”行此次付款结束日期不能大于合同结束日期");
                return false;
            }
            if (contractBeginDate - OfficeRentHireEndDate > 0) {
                alert("办公场地公摊-办公用房租支付明细第“" + index + "”行此次付款结束日期不能小于合同开始日期");
                return false;
            }
            var objstart = gatheringOfficeRentArray[i].gt_OfficeRent_ContractStart;
            if (objstart != "") {
                var OfficeRentHireStartDate = getYMD(objstart);
                if (OfficeRentHireStartDate - OfficeRentHireEndDate > 0) {
                    alert("办公场地公摊-办公用房租支付明细第“" + index + "”行此次付款结束日期不能小于此次付款开始日期");
                    return false;
                }
            }
        }


        //房租金额
        if (gatheringOfficeRentArray[i].gt_OfficeRent_AllRent == '') {
            alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的付款金额不能为空");
            document.all["OfficeRentTextBoxAllRent_" + i].focus();
            return false;
        }
        else {
            if (!isMoneyValue(gatheringOfficeRentArray[i].gt_OfficeRent_AllRent)) {
                alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的付款金额不正确");
                document.all["OfficeRentTextBoxAllRent_" + i].focus();
                return false;
            }
            else {
                if (gatheringOfficeRentArray[i].gt_OfficeRent_AllRent <= 0) {
                    alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的付款金额不能小于等于零");
                    document.all["OfficeRentTextBoxAllRent_" + i].focus();
                    return false;
                }
            }
        }
        //20101215 chaidanlei 增加列：是否按租期分摊 gt_OfficeRent_IsShareByRentPeriod
        //if ((gatheringOfficeRentArray[i].gt_OfficeRent_IsShareByRentPeriod).length <= 0) {
        // alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的是否按租期分摊不能为空，请选择");
        //document.all["ShareByRentPeriod_" + i].focus();
        //return false;
        // }
        // if (gatheringOfficeRentArray[i].gt_OfficeRent_IsShareByRentPeriod.indexOf("~") != -1 || gatheringOfficeRentArray[i].gt_OfficeRent_IsShareByRentPeriod.indexOf("|") != -1) {
        //alert('办公场地公摊-办公用房租支付明细第“' + index + '”行的是否按租期分摊字符“~”，“|”为非法字符，请重新输入。');
        //document.all["ShareByRentPeriod_" + i].focus();
        //return false;
        // }

        //20120515 wanghk 增加列：房东 gt_OfficeRent_HouseOwner
        if ((gatheringOfficeRentArray[i].gt_OfficeRent_HouseOwner).length <= 0) {
            alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的房东不能为空，请重新输入。");
            document.all["OfficeRentTextBoxHouseOwner_" + i].focus();
            return false;
        }
        if (gatheringOfficeRentArray[i].gt_OfficeRent_HouseOwner.indexOf("~") != -1 || gatheringOfficeRentArray[i].gt_OfficeRent_HouseOwner.indexOf("|") != -1) {
            alert('办公场地公摊-办公用房租支付明细第“' + index + '”行的房东字符“~”，“|”为非法字符，请重新输入。');
            document.all["OfficeRentTextBoxHouseOwner_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：最大入住人数 gt_OfficeRent_LargestNumberIn
        if ((gatheringOfficeRentArray[i].gt_OfficeRent_LargestNumberIn).length <= 0) {
            alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的最大入住人数不能为空，请重新输入。");
            document.all["OfficeRentTextBoxLargestNumberIn_" + i].focus();
            return false;
        }
        if (gatheringOfficeRentArray[i].gt_OfficeRent_LargestNumberIn.indexOf("~") != -1 || gatheringOfficeRentArray[i].gt_OfficeRent_LargestNumberIn.indexOf("|") != -1) {
            alert('办公场地公摊-办公用房租支付明细第“' + index + '”行的最大入住人数字符“~”，“|”为非法字符，请重新输入。');
            document.all["OfficeRentTextBoxLargestNumberIn_" + i].focus();
            return false;
        }

        //20120515 wanghk 增加列：缴费性质 gt_OfficeRent_PayNature
        if ((gatheringOfficeRentArray[i].gt_OfficeRent_PayNature).length <= 0) {
            alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的缴费性质不能为空，请选择");
            document.all["PayNature_" + i].focus();
            return false;
        }
        //20130529 mfj  增加列：合同Id 合同Code

        if ((gatheringOfficeRentArray[i].gt_OfficeRent_HouseContract).length <= 0) {
            alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的合同不能为空，请选择");
            document.all["OfficeRentTextBoxHouseContract_" + i].focus();
            return false;
        }

        if ((gatheringOfficeRentArray[i].gt_OfficeRent_LeaseNature).length <= 0) {
            alert("办公场地公摊-办公用房租支付明细第“" + index + "”行的租赁性质不能为空，请选择");
            document.all["LeaseNature_" + i].focus();
            return false;
        }

        OfficeRentProjectTeamList += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_ProjectTeam;
        OfficeRentCityList += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_HouseCityID;
        OfficeRentAddressList += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_Address;
        OfficeRentContractStartList += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_ContractStart;
        OfficeRentContractEndList += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_ContractEnd;
        OfficeRentMonthRentList += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_MonthRent;
        OfficeRentAllRentList += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_AllRent;
        OfficeRentHireStartList += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_HireStart;
        OfficeRentHireEndList += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_HireEnd;
        OfficeRentOrderNoList += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_OrderNo;
        //20101215 chaidanlei 增加列：是否按租期分摊
        //OfficeRentShareByRentPeriod += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_IsShareByRentPeriod;
        //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
        OfficeRentHouseOwner += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_HouseOwner;
        OfficeRentLargestNumberIn += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_LargestNumberIn;
        OfficeRentPayNature += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_PayNature;

        //20130529 mfj  增加列：合同Id 合同Code
        OfficeRentContractId += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_HouseContractID;
        OfficeRentContractCode += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_HouseContract;
        OfficeRentCityText += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_City;
        OfficeRentTaxNoList += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_TaxNo;
        //租赁性质
        OfficeRentLeaseNature += '~' + gatheringOfficeRentArray[i].gt_OfficeRent_LeaseNature;
    }
    OfficeRentProjectTeamList = OfficeRentProjectTeamList.substr(1);
    OfficeRentCityList = OfficeRentCityList.substr(1);
    OfficeRentAddressList = OfficeRentAddressList.substr(1);
    OfficeRentContractStartList = OfficeRentContractStartList.substr(1);
    OfficeRentContractEndList = OfficeRentContractEndList.substr(1);
    OfficeRentMonthRentList = OfficeRentMonthRentList.substr(1);
    OfficeRentAllRentList = OfficeRentAllRentList.substr(1);
    OfficeRentHireStartList = OfficeRentHireStartList.substr(1);
    OfficeRentHireEndList = OfficeRentHireEndList.substr(1);
    OfficeRentOrderNoList = OfficeRentOrderNoList.substr(1);
    //20101215 chaidanlei 增加列：是否按租期分摊
    //OfficeRentShareByRentPeriod = OfficeRentShareByRentPeriod.substr(1);
    //20120515 wanghk 增加列：房东，最大入住人数，缴费性质
    OfficeRentHouseOwner = OfficeRentHouseOwner.substr(1);
    OfficeRentLargestNumberIn = OfficeRentLargestNumberIn.substr(1);
    OfficeRentPayNature = OfficeRentPayNature.substr(1);
    //20130529 mfj  增加列：合同Id 合同Code
    OfficeRentContractId = OfficeRentContractId.substr(1);
    OfficeRentContractCode = OfficeRentContractCode.substr(1);
    OfficeRentCityText = OfficeRentCityText.substr(1);
    OfficeRentTaxNoList = OfficeRentTaxNoList.substr(1);
    //租赁性质
    OfficeRentLeaseNature = OfficeRentLeaseNature.substr(1);

    document.all.hiddenOfficeRentInfo.value = OfficeRentProjectTeamList + "|"
														+ OfficeRentCityList + "|"
														+ OfficeRentAddressList + "|"
														+ OfficeRentContractStartList + "|"
														+ OfficeRentContractEndList + "|"
                                                        + OfficeRentHouseOwner + "|"
														+ OfficeRentMonthRentList + "|"
                                                        + OfficeRentLargestNumberIn + "|"
														+ OfficeRentHireStartList + "|"
														+ OfficeRentHireEndList + "|"
														+ OfficeRentAllRentList + "|"
                                                        + OfficeRentPayNature + "|"
														+ OfficeRentOrderNoList + "|"
                                                        + OfficeRentContractId + "|"
                                                        + OfficeRentContractCode + "|"
                                                        + OfficeRentCityText + "|"
                                                        + OfficeRentTaxNoList + "|"
                                                        + OfficeRentLeaseNature;
}
function setOfficeRentPayNature(index) {
    var obj = document.getElementById("OfficeRentPayNature_" + index);
    gatheringOfficeRentArray[index].gt_OfficeRent_PayNature = obj.value;
}
//租赁性质
function setOfficeRentLeaseNature(index) {
    var obj = document.getElementById("OfficeRentLeaseNature_" + index);
    if (obj.value == "" || obj.value == undefined || obj.value == null) {
        alert("办公场地公摊-办公用房租支付明细第“" + index + 1 + "”行的租赁性质不能为空，请选择");
        return;
    }
    gatheringOfficeRentArray[index].gt_OfficeRent_LeaseNature = obj.value;
}
//删除选定行
function deleteOfficeRentRow(rowIndex) {
    if (!confirm('确认删除？'))
        return;

    var tempArray = new Array();
    var j = 0;
    for (var i = 0; i < gatheringOfficeRentArray.length; i++) {
        if (i != rowIndex) {
            tempArray[j] = gatheringOfficeRentArray[i];
            tempArray[j].gt_OfficeRent_OrderNo = j + 1;
            j++;
        }
    }

    gatheringOfficeRentArray = tempArray;
    refreshOfficeRent();
}
function jsOfficeRentGathering(
jOrderNo, jProjectTeam, ContractId, ContractName,
jCityID, jCity, jAddress, jContractStart,
jContractEnd, jMonthRent, jHireStart, jHireEnd,
 jAllRent, jHouseOwner,
jLargestNumberIn, jPayNature,
 jTaxNo, jLeaseNature) {
    this.gt_OfficeRent_OrderNo = jOrderNo;
    this.gt_OfficeRent_ProjectTeam = jProjectTeam;
    this.gt_OfficeRent_HouseContractID = ContractId;
    this.gt_OfficeRent_HouseContract = ContractName;
    this.gt_OfficeRent_HouseCityID = jCityID;
    this.gt_OfficeRent_City = jCity;
    this.gt_OfficeRent_Address = jAddress;
    this.gt_OfficeRent_ContractStart = jContractStart;
    this.gt_OfficeRent_ContractEnd = jContractEnd;
    this.gt_OfficeRent_MonthRent = jMonthRent;
    this.gt_OfficeRent_HireStart = jHireStart;
    this.gt_OfficeRent_HireEnd = jHireEnd;
    this.gt_OfficeRent_AllRent = jAllRent; //付款金额和付款租期（起止日）交换位置
    //this.gt_OfficeRent_IsShareByRentPeriod = jShareByRentPeriod; //增加列：是否按租期分摊

    //增加列 房东，最大入住人数，缴费性质，租赁性质，明细性质，合同编号
    this.gt_OfficeRent_HouseOwner = jHouseOwner;
    this.gt_OfficeRent_LargestNumberIn = jLargestNumberIn;
    this.gt_OfficeRent_PayNature = jPayNature;
    this.gt_OfficeRent_TaxNo = jTaxNo;
    //租赁性质
    this.gt_OfficeRent_LeaseNature = jLeaseNature;
}
