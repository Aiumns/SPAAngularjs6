<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default4.aspx.cs" Inherits="Default4" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>  
</head>
<body>
    <form id="form1" runat="server">
    <div>       
        <table>          
            <tr>
                <td>
                    Photo/Image
                </td>
                <td>
                    <asp:FileUpload ID="fuImage" runat="server" accept=".png,.PNG,.PDF,.pdf,.jpeg,.JPEG,.jpg,.JPG" ></asp:FileUpload>   
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Button ID="btnSubmit" runat="server" Text="Submit" OnClick="btnSubmit_Click" />
                </td>
                <td>
                      <asp:GridView ID="gridview1" runat="server">
                           <Columns>
                                <asp:TemplateField>
                                            <ItemTemplate>
                                                  <asp:LinkButton ID="pdffle"  runat="server" Text='<%#Eval("Title") %>' OnClick="pdffle_Click" ></asp:LinkButton><br/>
                                            </ItemTemplate>     
                                </asp:TemplateField>
                           </Columns>
                      </asp:GridView>
                      <asp:Repeater Visible="false" ID="Repeater1" runat="server">   <%--OnItemCommand="Repeater1_ItemCommand"--%>
                        <ItemTemplate>
                            
                            <asp:LinkButton ID="LinkButton1" Visible="false" runat ="server" Text='<%#Eval("Title") %>' CommandName="Redirect" CommandArgument='<%#Eval("Filelocation") %>'></asp:LinkButton><br/>
                        </ItemTemplate>
                    </asp:Repeater>                   
                    <asp:Button ID="btnBack" Visible="false" runat="server" Text="View File" onclick="btnBack_Click" />                        
                </td>
            </tr>
        </table>

        <iframe runat="server" id="fred" style="border:1px solid #666CCC" visible="false" title="PDF in an i-Frame" frameborder="1" scrolling="auto" height="1100" width="850" ></iframe>

<%--        <object data="http://www.jigzone.com/im/photo400300.gif" type="application/pdf">
              <embed src="http://www.jigzone.com/im/photo400300.gif" type="application/pdf" />
        </object>--%>

<%--        <iframe id="iFrame" width="500"></iframe>
        <input type="button" value="Load" onclick="setIframeSRC('iFrame', 'file://C:\\Users\\JITENDRA\\Desktop\\msdn.pdf');" />--%>
    
        <%-- <iframe src = "DisplayPage.aspx?file=air-waybill.jpg" height = "200px" width = "200px"></iframe>--%>
         <iframe src = "DisplayPage.aspx?file=360Logo.JPG"  style=" display:none;border:1px solid #666CCC" visible="false" title="PDF in an i-Frame" frameborder="1" scrolling="auto" height="1100" width="850"></iframe>
         <%--<object data="your_url_to_pdf" type="application/pdf">
            <embed src="your_url_to_pdf" type="application/pdf" />
         </object>--%>
    </div>
    </form>
</body>
</html>