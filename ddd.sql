USE [Testdb]
GO
/****** Object:  Table [dbo].[tblFileUpload]    Script Date: 12/31/2018 12:31:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblFileUpload](
	[Sno] [int] IDENTITY(1,1) NOT NULL,
	[Title] [text] NULL,
	[FileLocation] [text] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[tblFileUpload] ON 

INSERT [dbo].[tblFileUpload] ([Sno], [Title], [FileLocation]) VALUES (12, N'Lic_stmnt.pdf', N'userfiles/122333938255Lic_stmnt.pdf')
INSERT [dbo].[tblFileUpload] ([Sno], [Title], [FileLocation]) VALUES (13, N'Lic_stmnt.pdf', N'userfiles/Lic_stmnt.pdf')
SET IDENTITY_INSERT [dbo].[tblFileUpload] OFF
