USE [master]
GO
/****** Object:  Database [MenShoe]    Script Date: 04/11/2023 14:25:25 ******/
CREATE DATABASE [MenShoe]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MenShoe', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\MenShoe.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'MenShoe_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\MenShoe_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [MenShoe] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MenShoe].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MenShoe] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MenShoe] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MenShoe] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MenShoe] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MenShoe] SET ARITHABORT OFF 
GO
ALTER DATABASE [MenShoe] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MenShoe] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MenShoe] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MenShoe] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MenShoe] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MenShoe] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MenShoe] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MenShoe] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MenShoe] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MenShoe] SET  DISABLE_BROKER 
GO
ALTER DATABASE [MenShoe] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MenShoe] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MenShoe] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MenShoe] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MenShoe] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MenShoe] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MenShoe] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MenShoe] SET RECOVERY FULL 
GO
ALTER DATABASE [MenShoe] SET  MULTI_USER 
GO
ALTER DATABASE [MenShoe] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MenShoe] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MenShoe] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MenShoe] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MenShoe] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [MenShoe] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'MenShoe', N'ON'
GO
ALTER DATABASE [MenShoe] SET QUERY_STORE = OFF
GO
USE [MenShoe]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 04/11/2023 14:25:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[CategoryID] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
	[MetaTitle] [varchar](250) NULL,
	[SeoTitle] [nvarchar](250) NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [varchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[MetaKeywords] [nvarchar](250) NULL,
	[MetaDescriptions] [nchar](250) NULL,
 CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED 
(
	[CategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Colors]    Script Date: 04/11/2023 14:25:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Colors](
	[ColorID] [bigint] IDENTITY(1,1) NOT NULL,
	[NameColor] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [varchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
 CONSTRAINT [PK_Colors] PRIMARY KEY CLUSTERED 
(
	[ColorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customers]    Script Date: 04/11/2023 14:25:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers](
	[CustomerID] [bigint] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](30) NULL,
	[Password] [nvarchar](50) NULL,
	[Name] [nvarchar](50) NULL,
	[Email] [nvarchar](50) NULL,
	[Address] [nvarchar](250) NULL,
	[Mobile] [nvarchar](11) NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [varchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_Customers] PRIMARY KEY CLUSTERED 
(
	[CustomerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDetails]    Script Date: 04/11/2023 14:25:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetails](
	[ProductID] [bigint] NOT NULL,
	[OrderID] [bigint] NOT NULL,
	[ColorID] [bigint] NOT NULL,
	[SizeID] [bigint] NOT NULL,
	[Quanlity] [int] NULL,
	[Price] [decimal](18, 0) NULL,
 CONSTRAINT [PK_OrderDetails] PRIMARY KEY CLUSTERED 
(
	[ProductID] ASC,
	[OrderID] ASC,
	[ColorID] ASC,
	[SizeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 04/11/2023 14:25:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderID] [bigint] IDENTITY(1,1) NOT NULL,
	[CreatedDate] [datetime] NULL,
	[CustomerID] [bigint] NULL,
	[ShipName] [nvarchar](50) NULL,
	[ShipMobile] [varchar](50) NULL,
	[ShipAdress] [nvarchar](50) NULL,
	[ShipEmail] [nvarchar](50) NULL,
	[Status] [int] NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 04/11/2023 14:25:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[ProductID] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
	[MetaTitle] [nvarchar](250) NULL,
	[Price] [decimal](18, 0) NULL,
	[PromotionPrice] [decimal](18, 0) NULL,
	[Detail] [varchar](max) NULL,
	[Quantity] [int] NULL,
	[CategoryID] [bigint] NULL,
	[ProductCategoryID] [bigint] NULL,
	[Warranty] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [varchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[New] [bit] NULL,
	[Image] [nvarchar](250) NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[ProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Color]    Script Date: 04/11/2023 14:25:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Color](
	[ProductColorID] [bigint] IDENTITY(1,1) NOT NULL,
	[ColorID] [bigint] NULL,
	[ProductID] [bigint] NULL,
 CONSTRAINT [PK_Product_Color] PRIMARY KEY CLUSTERED 
(
	[ProductColorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Size]    Script Date: 04/11/2023 14:25:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Size](
	[ProductSizeID] [bigint] IDENTITY(1,1) NOT NULL,
	[ProductID] [bigint] NULL,
	[SizeID] [bigint] NULL,
 CONSTRAINT [PK_Product_Size] PRIMARY KEY CLUSTERED 
(
	[ProductSizeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductCategory]    Script Date: 04/11/2023 14:25:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductCategory](
	[ProductCategoryID] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
	[MetaTitle] [varchar](250) NULL,
	[SeoTitle] [nvarchar](250) NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [varchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[MetaKeywords] [nvarchar](250) NULL,
	[MetaDescriptions] [nchar](250) NULL,
 CONSTRAINT [PK_ProductCategories] PRIMARY KEY CLUSTERED 
(
	[ProductCategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductImages]    Script Date: 04/11/2023 14:25:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductImages](
	[ProductImageID] [bigint] IDENTITY(1,1) NOT NULL,
	[ImageDetail] [nvarchar](250) NULL,
	[ProductID] [bigint] NULL,
 CONSTRAINT [PK_ProductImages] PRIMARY KEY CLUSTERED 
(
	[ProductImageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sizes]    Script Date: 04/11/2023 14:25:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sizes](
	[SizeID] [bigint] IDENTITY(1,1) NOT NULL,
	[Number] [int] NULL,
	[Details] [varchar](max) NULL,
 CONSTRAINT [PK_Sizes] PRIMARY KEY CLUSTERED 
(
	[SizeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 04/11/2023 14:25:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[UserName] [nvarchar](50) NULL,
	[Password] [nvarchar](100) NULL,
	[Email] [nvarchar](250) NULL,
	[Address] [nvarchar](max) NULL,
	[Mobile] [nvarchar](11) NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [varchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_FK_Product_Category]    Script Date: 04/11/2023 14:25:25 ******/
CREATE NONCLUSTERED INDEX [IX_FK_Product_Category] ON [dbo].[Product]
(
	[CategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_FK_Product_ProductCategory]    Script Date: 04/11/2023 14:25:25 ******/
CREATE NONCLUSTERED INDEX [IX_FK_Product_ProductCategory] ON [dbo].[Product]
(
	[ProductCategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_FK_Product_Color_Colors]    Script Date: 04/11/2023 14:25:25 ******/
CREATE NONCLUSTERED INDEX [IX_FK_Product_Color_Colors] ON [dbo].[Product_Color]
(
	[ColorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_FK_Product_Size_Sizes]    Script Date: 04/11/2023 14:25:25 ******/
CREATE NONCLUSTERED INDEX [IX_FK_Product_Size_Sizes] ON [dbo].[Product_Size]
(
	[SizeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetails_Colors] FOREIGN KEY([ColorID])
REFERENCES [dbo].[Colors] ([ColorID])
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [FK_OrderDetails_Colors]
GO
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetails_Orders] FOREIGN KEY([OrderID])
REFERENCES [dbo].[Orders] ([OrderID])
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [FK_OrderDetails_Orders]
GO
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetails_Product] FOREIGN KEY([ProductID])
REFERENCES [dbo].[Product] ([ProductID])
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [FK_OrderDetails_Product]
GO
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetails_Sizes] FOREIGN KEY([SizeID])
REFERENCES [dbo].[Sizes] ([SizeID])
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [FK_OrderDetails_Sizes]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Customers] FOREIGN KEY([CustomerID])
REFERENCES [dbo].[Customers] ([CustomerID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Customers]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Category] FOREIGN KEY([CategoryID])
REFERENCES [dbo].[Category] ([CategoryID])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Category]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_ProductCategory] FOREIGN KEY([ProductCategoryID])
REFERENCES [dbo].[ProductCategory] ([ProductCategoryID])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_ProductCategory]
GO
ALTER TABLE [dbo].[Product_Color]  WITH CHECK ADD  CONSTRAINT [FK_Product_Color_Colors] FOREIGN KEY([ColorID])
REFERENCES [dbo].[Colors] ([ColorID])
GO
ALTER TABLE [dbo].[Product_Color] CHECK CONSTRAINT [FK_Product_Color_Colors]
GO
ALTER TABLE [dbo].[Product_Color]  WITH CHECK ADD  CONSTRAINT [FK_Product_Color_Product] FOREIGN KEY([ProductID])
REFERENCES [dbo].[Product] ([ProductID])
GO
ALTER TABLE [dbo].[Product_Color] CHECK CONSTRAINT [FK_Product_Color_Product]
GO
ALTER TABLE [dbo].[Product_Size]  WITH CHECK ADD  CONSTRAINT [FK_Product_Size_Product] FOREIGN KEY([ProductID])
REFERENCES [dbo].[Product] ([ProductID])
GO
ALTER TABLE [dbo].[Product_Size] CHECK CONSTRAINT [FK_Product_Size_Product]
GO
ALTER TABLE [dbo].[Product_Size]  WITH CHECK ADD  CONSTRAINT [FK_Product_Size_Sizes] FOREIGN KEY([SizeID])
REFERENCES [dbo].[Sizes] ([SizeID])
GO
ALTER TABLE [dbo].[Product_Size] CHECK CONSTRAINT [FK_Product_Size_Sizes]
GO
ALTER TABLE [dbo].[ProductImages]  WITH CHECK ADD  CONSTRAINT [FK_ProductImages_Product] FOREIGN KEY([ProductID])
REFERENCES [dbo].[Product] ([ProductID])
GO
ALTER TABLE [dbo].[ProductImages] CHECK CONSTRAINT [FK_ProductImages_Product]
GO
USE [master]
GO
ALTER DATABASE [MenShoe] SET  READ_WRITE 
GO
