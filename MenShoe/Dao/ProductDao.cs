using MenShoe.EF;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MenShoe.Dao
{
    public class ProductDao
    {
        MenShoeEntities db = new MenShoeEntities();
        public List<Product> lstBestSelling(List<Int64> lst)
        {
            List<Product> lstProduct = new List<Product>();
            for(int i = 0; i< lst.Count(); i++)
            {
                string id = lst[i].ToString();
                var pr = db.Products.FirstOrDefault(p=>p.ProductID.ToString() == id);
                lstProduct.Add(pr);
            }
            return lstProduct;
        }

        public long getMaxIdProduct()
        {
            long id = db.Products.OrderByDescending(p => p.ProductID).First().ProductID;
            return id;
        }
    }
}