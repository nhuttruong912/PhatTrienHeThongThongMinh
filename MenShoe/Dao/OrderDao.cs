using MenShoe.Areas.Admin.Models;
using MenShoe.EF;
using MenShoe.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MenShoe.Dao
{
    public class OrderDao
    {
        ShopBanGiayEntities db = new ShopBanGiayEntities();

        public long getLastID()
        {
            string query = "SELECT TOP 1 * FROM dbo.[ORDER] ORDER BY OrderID DESC";
            var od = db.Orders.SqlQuery(query).ToList().First();
            return ((Models.Order)od).OrderID;
        }

        public List<Int64> lstIdPruductSelling()
        {
            List<Int64> lst = new List<Int64>();
            string query = "Select distinct ProductID From OrderDetail " +
                "where EXISTS (Select top 10 ProductID, Count(ProductID) as Quanlity " +
                "From OrderDetail Group By ProductID " +
                "Order by Quanlity Desc)";
            lst = db.Database.SqlQuery<Int64>(query).ToList();
            
            return lst;
        }


        public List<double> lstAmount(List<Models.Order> lstOd)
        {
            List<double> lst = new List<double>();
            
            for(int i = 0; i < lstOd.Count(); i++)
            {
                List<Models.OrderDetail> lstOrderDetail = new List<Models.OrderDetail>();
                string OrderID = lstOd[i].OrderID.ToString();
                lstOrderDetail = db.OrderDetails.Where(o => o.OrderID.ToString() == OrderID).ToList();
                double amount = 0;
                for (int j = 0; j < lstOrderDetail.Count(); j++)
                {
                    amount += (double)(lstOrderDetail[j].Quantity * lstOrderDetail[j].Price);
                    
                }
                lst.Add(amount);
            }
            return lst;
        }

        public List<CartView> getListCartOrder(string ID)
        {
            if(ID != null)
            {
                string query = "SELECT dbo.Product.ProductID, dbo.Product.Name, dbo.Sizes.Number, dbo.Colors.NameColor, dbo.[Product].Image, dbo.Product.Price, dbo.OrderDetail.Quanlity " +
              "FROM Product INNER JOIN OrderDetail ON Product.ProductID = OrderDetail.ProductID " +
              "INNER JOIN dbo.[Order] ON dbo.[Order].OrderID = OrderDetail.OrderID " +
              "INNER JOIN Colors ON Colors.ColorID = OrderDetail.ColorID " +
              "INNER JOIN Sizes ON Sizes.SizeID = OrderDetail.SizeID " +
              "WHERE OrderDetail.OrderID = @OrderID";
                List<CartView> data = db.Database.SqlQuery<CartView>(query, new SqlParameter("OrderID", ID)).ToList();
                return data;
            }
            return null;
        }
    }
}