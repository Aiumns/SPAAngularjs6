using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.IO;
using System.Net;

public partial class Default4 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //if (!IsPostBack)
        //{
        //    Response.ContentType = "image/png";
        //    Response.WriteFile(Server.MapPath("~/userfiles/" + Request.QueryString["file"]));
        //    Response.Flush();
        //    Response.End();
        //}
        LoadData();
       
    }

    protected void Repeater1_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        if (e.CommandName == "Redirect")
        {
            Response.Redirect(e.CommandArgument.ToString());
        }

    }

    void LoadData()
    {
        string constr = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
        SqlConnection con = new SqlConnection(constr);
        SqlDataAdapter ad = new SqlDataAdapter("select * from tblFileUpload", con);
        DataSet ds = new DataSet();
        ad.Fill(ds);
        if(ds.Tables[0].Rows.Count>0)
        {
            gridview1.DataSource = ds;
            gridview1.DataBind();
        }       
    }

    protected void pdffle_Click(object sender, EventArgs e)
    {
        //LinkButton btn = (LinkButton)sender;
        //GridViewRow row = (GridViewRow)btn.NamingContainer;
        ////assuming you store the ID in a Hiddenield:
        //LinkButton lnkbtn = (LinkButton)row.FindControl("HiddenID");
        //int ID = int.Parse(lnkbtn.ID);

        int rowindex = ((GridViewRow)((sender as Control)).NamingContainer).RowIndex;
        string filelocation = gridview1.Rows[rowindex].Cells[3].Text;
        string FilePath = Server.MapPath(filelocation);
        WebClient user = new WebClient();

        Byte[] Filebuffer = user.DownloadData(FilePath);

        if(Filebuffer !=null)
        {
            Response.ContentType = "application/pdf";
            Response.AddHeader("content-length", Filebuffer.Length.ToString());
            Response.BinaryWrite(Filebuffer);
        }



    }

    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        string filename = Path.GetFileName(fuImage.PostedFile.FileName);
        string filelocation = System.IO.Path.Combine("userfiles/",filename);
        fuImage.SaveAs(Server.MapPath("~/userfiles/" + filename));
        //pdffle.Attributes.Add("src", filelocation);
        // fred.Attributes.Add("src", "http://www.jigzone.com/im/photo400300.gif");       

        string constr = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
        SqlConnection con = new SqlConnection(constr);
        con.Open();
        SqlCommand cmd = new SqlCommand("Insert into tblFileUpload (Title,Filelocation) Values(@Title,@Filelocation)", con);
        cmd.Parameters.AddWithValue("@Title", filename);
        cmd.Parameters.AddWithValue("@Filelocation", filelocation);
        cmd.ExecuteNonQuery();
        cmd.Dispose();
        con.Close();        
    }
    protected void btnBack_Click(object sender, EventArgs e)
    {

    }
    
}