using MenShoe.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MenShoe.Controllers
{
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        MenShoeEntities db = new MenShoeEntities();

        public ActionResult DetailProduct(string m_ProductID)
        {
            List<Product_Size> lstProductSize = db.Product_Size.Where(p => p.ProductID.ToString() == m_ProductID).ToList();

            //Check product quanlity
            if (lstProductSize.Count() == 0)
            {
                return RedirectToAction("Error", "Error");
            }
            //get list category and product category
            ViewBag.ProductCategories = db.ProductCategories.ToList();
            ViewBag.Categories = db.Categories.Take(5).ToList();
            Product prd = db.Products.SingleOrDefault(p => p.ProductID.ToString() == m_ProductID);

            //get list image and size, color
            List<ProductImage> lstProductImage = db.ProductImages.Where(p => p.ProductID.ToString() == m_ProductID).ToList();
            Product_Color ProductColor = db.Product_Color.FirstOrDefault(p => p.ProductID.ToString() == m_ProductID);
            ViewBag.lstProductSize = lstProductSize;
            ViewBag.lstProductImage = lstProductImage;
            ViewBag.ProductColor = ProductColor;

            if (prd == null)
            {
                return RedirectToAction("Error","Error");
            }
            // return PartialView("../Product/View_ccdatvoday?m_ProductID=" + m_ProductID + "&sizes=" + iSize + "");
            return View(prd);
        }

        public PartialViewResult HotProductPartial()
        {
            List<Product> lstProduct = db.Products.Take(3).ToList();
            return PartialView(lstProduct);
        }
        
    }
}