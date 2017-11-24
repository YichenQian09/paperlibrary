using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Manager_keywordList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        string keywordvalu = txtKeyword.Text.Trim();
        if (keywordvalu.Equals(string.Empty))
            Response.Write(JSHelper.alert("关键词不能为空，请重新输入！"));
        else
        {
            try
            {
                using (var db = new PaperDbEntities())
                {
                    KeyWords tmp = db.KeyWords.SingleOrDefault(a => a.Name == keywordvalu);
                    if (tmp == null)
                    {
                        KeyWords keyword = new KeyWords();
                        keyword.Name = keywordvalu;
                        db.KeyWords.Add(keyword);
                        db.SaveChanges();
                        Response.Write(JSHelper.alert("添加成功!", "keywordList.aspx"));

                    }
                    else
                    {
                        Response.Write(JSHelper.alert("关键词重复，请检查！"));
                    }

                }

            }
            catch (Exception ex)
            {
                //ex.Message;
                Response.Write(JSHelper.alert("添加失败，请重新尝试!"));
            }
        }
    }
}