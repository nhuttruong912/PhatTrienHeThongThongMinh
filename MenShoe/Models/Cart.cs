using MenShoe.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MenShoe.Models
{
    public class Cart
    {
        ShopBanGiayEntities db = new ShopBanGiayEntities();

        public string m_Id_Product { get; set; }
        public string m_Name { get; set; }
        public string m_Size { get; set; }
        public string m_Color { get; set; }
        public string m_Image { get; set; }
        public double m_Price { get; set; }
        public int m_Quanlity { get; set; }

        public double m_Total
        {
            get { return m_Quanlity * m_Price; }
        }

        public Cart(string productID, string size, string color)
        {
            m_Id_Product = productID;
            Product prd = db.Products.Single(p => p.ProductID.ToString() == productID);
            m_Name = prd.Name;
            m_Size = size;
            m_Color = color;
            m_Image = prd.Image;
            m_Price = double.Parse(prd.Price.ToString());
            m_Quanlity = 1;
        }
    }
}