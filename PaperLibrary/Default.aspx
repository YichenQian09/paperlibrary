<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <style>
        .selectInput{position:absolute; margin-left:15px;padding-left:10px;width:130px;height:25px;left:1px;top:2px;border-bottom:0px;border-right:0px;border-left:0px;border-top:0px;}
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <select name="keywords" class="keyword">
            <option  id="key1" >关键词一</option>
            <option  id='key2'>关键词two</option>

        </select>

        <%--后台添加关键词--%>
        1<input type="checkbox" name="ckbox" value="1"/>
2<input type="checkbox" name="ckbox" onclick="return false" checked="checked"  value="666"/>
3<input type="checkbox" name="ckbox" value="3"/>
4<input type="checkbox" name="ckbox" value="4"/>
5<input type="checkbox" name="ckbox" value="5"/>
6<input type="checkbox" name="ckbox" value="6"/>
    </div>

        <input id="test111" value="ll"  type="text"/>
        <input type="button"  onclick="exexx()" />

    <asp:Button ID ="jj" runat ="server" Text ="test" OnClick ="jj_Click" />



        <script>
            function exexx() {
                var js = "<%=exeJS()%>";
                eval(js);
            }
        </script>
    </form>
 
</body>
</html>
