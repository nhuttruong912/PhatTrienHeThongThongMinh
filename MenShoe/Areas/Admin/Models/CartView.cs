using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MenShoe.Areas.Admin.Models
{
    public class CartView
    {
        public long ProductID { get; set; }
        public string  Name { get; set; }
        public int Number { get; set; }
        public string NameColor { get; set; }
        public string Image { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public double Total
        {
            get { return Quantity * (double)Price; }
        }

    }
}