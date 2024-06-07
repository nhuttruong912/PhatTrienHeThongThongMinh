using MenShoe.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList.Mvc;
using PagedList;

namespace MenShoe.Controllers
{
    public class ProductCategoryController : Controller
    {
        MenShoeEntities db = new MenShoeEntities();
        // GET: ProductCategory
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ProductCategory(int? page, string ProductCategoryID)
        {
            if(string.IsNullOrEmpty(ProductCategoryID))
            {
                return RedirectToAction("Error","Error");
            }
            int pageSize = 18;
            int pageNumber = page ?? 1;
            ViewBag.ProductCategories = db.ProductCategories.ToList();
            ViewBag.Categories = db.Categories.Take(5).ToList();
            ProductCategory pC = db.ProductCategories.SingleOrDefault(p => p.ProductCategoryID.ToString() == ProductCategoryID);
            if(pC == null)
            {
                return RedirectToAction("Error","Error");
            }
            PagedList.IPagedList<Product> lstProduct = db.Products.Where(p=>p.ProductCategoryID.ToString() == ProductCategoryID).OrderBy(p=>p.Price).ToPagedList(pageNumber,pageSize);
            if(lstProduct.Count() ==0)
            {
                return RedirectToAction("EmptyProductCategory");
            }

            ViewBag.ProductCategoryName = pC.Name;
            return View(lstProduct);
        }


        public  ViewResult ListProductCategory()
        {
            List<ProductCategory> lstProductCategory = db.ProductCategories.ToList();
            return View(lstProductCategory);
        }
        
        public ViewResult EmptyProductCategory()
        {

            ViewBag.ProductCategories = db.ProductCategories.ToList();
            ViewBag.Categories = db.Categories.Take(5).ToList();
            return View();
        }
    }
}