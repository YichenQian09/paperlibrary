using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        int year = 2016;
        DateTime date = new DateTime(year,1,1);
        //Response.Write(date.ToShortDateString());
        int[]  async ={ 1,2,3};
        async.Contains(1);
        string[] bb = { "d" };

        //去除重复元素
        string[] aaa = { "a", "b", "b" };
        string[] bbb=aaa.Distinct().ToArray();
        List<string> hhh = aaa.Distinct().ToList();

        foreach (string s in hhh)
        {
            //Response.Write(s);
        }
    }

    protected void jj_Click(object sender, EventArgs e)
    {
        var aa = Request.Form["ckbox"];
        string a = @"<script src='https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js'></script>";
        Response.Write("456".Substring(1));


    }

    public string exeJS()
    {
        return "$('#test111').val('ssss');";
    }
}