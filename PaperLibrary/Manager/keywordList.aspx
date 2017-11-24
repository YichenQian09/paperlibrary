<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/manager.master" AutoEventWireup="true" CodeFile="keywordList.aspx.cs" Inherits="Manager_keywordList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
      <h1>管理关键字</h1>
    <p>
     添加关键字：<asp:TextBox ID="txtKeyword" runat ="server" MaxLength="20" ></asp:TextBox>
     <asp:Button ID="btnSubmit" runat ="server" Text="添加" OnClick="btnSubmit_Click" />
    </p>
    <div>
        显示关键词列表,可以删除
       
    </div>

</asp:Content>

